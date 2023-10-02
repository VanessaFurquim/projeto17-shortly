import db from "../database/databaseConfig.js"

export async function isUrlExistentRepository ( { url } ) {
    return db.query(`SELECT url FROM urls WHERE url = $1;`, [url])
}

export async function addNewUrlRepository ( { url, shortUrl, userId } ) {
    return db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId])
}

export async function isShortUrlExistentByIdRepository (id) {
    return db.query(`SELECT url, "shortUrl", "userId" FROM urls WHERE id = $1`, [id])
}

export async function isShortUrlExistentByShortUrlRepository (shortUrl) {
    return db.query(`SELECT url, "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl])
}

export async function addVisitCountToUrlRepository (shortUrl) {
    return db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`, [shortUrl])
}

export async function deleteUrlRepository (shortUrlId) {
    return db.query(`DELETE FROM urls WHERE id = $1;`, [shortUrlId])
}