import db from "../database/databaseConfig.js"
import { nanoid } from 'nanoid/non-secure'

export async function shorteningUrl (request, response) {
    const { url } = request.body
    const userId = response.locals.user.rows[0].id

    const shortUrl = nanoid()

    try {
        const isUrlExistent = await db.query(`SELECT url FROM urls WHERE url = $1;`, [url])
        if (isUrlExistent.rowCount !== 0) return response.status(400).send( {message: "This URL has already inserted in the database."})

        const insertRequestData = await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId])

        response.status(201).send( { id: (insertRequestData.rows[0].id), shortUrl } )

    } catch (error) { response.status(500).send(error.message) }
}

export async function getUrlById (request, response) {
    const { id } = request.params

    try {
        const isShortUrlExistent = await db.query(`SELECT url, "shortUrl" FROM urls WHERE id = $1`, [id])
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        response.status(200).send( {
            id,
            shortUrl: isShortUrlExistent.rows[0].shortUrl,
            url: isShortUrlExistent.rows[0].url
        } )

    } catch (error) { response.status(500).send(error.message) }
}

export async function openUrl (request, response) {
    const { shortUrl } = request.params

    try {
        const isShortUrlExistent = await db.query(`SELECT url, "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl])
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`, [shortUrl])

        response.redirect(isShortUrlExistent.rows[0].url)

    } catch (error) { response.status(500).send(error.message) }
}

export async function deleteUrl (request, response) {
    const shortUrlId = request.params.id
    const userId = response.locals.user.rows[0].id

    try {
        const isShortUrlExistent = await db.query(`SELECT * FROM urls WHERE id = $1`, [shortUrlId])
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        if (isShortUrlExistent.rows[0].id !== userId) return response.status(401).send( {message: "You are not authorized to perform the solicited action."})
        
        await db.query(`DELETE FROM urls WHERE id = $1;`, [shortUrlId])

        response.sendStatus(204)

    } catch (error) { response.status(500).send(error.message) }
}