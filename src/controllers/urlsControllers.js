import db from "../database/databaseConfig.js"
import { nanoid } from 'nanoid/non-secure'

export async function shorteningUrl (request, response) {
    const { url } = request.body
    const userId = response.locals.rows[0].id

    const shortUrl = nanoid()

    let insertRequestData

    try {
        insertRequestData = await db.query(`INSERT INTO urls ("originalUrl", "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId])

    } catch (error) { response.status(500).send(error.message) }

    response.status(201).send( { id: (insertRequestData.rows[0].id), shortUrl } )
}

export async function getUrlById (request, response) {
    const { id } = request.params

    try {
        const isShortUrlExistent = await db.query(`SELECT "originalUrl", "shortUrl" FROM urls WHERE id = $1`, [id])
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        response.status(200).send( {
            id,
            shortUrl: isShortUrlExistent.rows[0].shortUrl,
            url: isShortUrlExistent.rows[0].originalUrl
        } )

    } catch (error) { response.status(500).send(error.message) }
}