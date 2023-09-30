import db from "../database/databaseConfig.js"
import { nanoid } from 'nanoid/non-secure'

export async function shortenUrl (request, response) {
    const { url } = request.body
    const userId = response.locals.rows[0].id

    const shortUrl = nanoid()

    try {
        const x = await db.query(`INSERT INTO urls ("originalUrl", "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, userId])

    } catch (error) { response.status(500).send(error.message) }

    response.status(201).send(shortUrl)
}