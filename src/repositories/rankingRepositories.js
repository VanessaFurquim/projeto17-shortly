import db from "../database/databaseConfig.js"

export async function rankingDataRepository () {
    return db.query(`
    SELECT users.id, users.name,
        COUNT (urls.url) AS "linksCount",
        SUM ("visitCount") AS "visitCount"
        FROM users
        JOIN urls
            ON urls."userId" = users.id
        GROUP BY users.id, users.name
        ORDER BY SUM ("visitCount") DESC
        LIMIT 10;
    `)
}