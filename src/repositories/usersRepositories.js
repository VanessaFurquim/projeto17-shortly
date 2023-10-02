import db from "../database/databaseConfig.js"

export async function usersShortenedUrlsDataRepository (userInformation) {
    return db.query(`
    SELECT
        "userData".name, "userData"."totalVisitCount",
        urls.id, urls."shortUrl", urls.url, urls."userId",
        urls."visitCount" AS "urlVisitCount"
        FROM urls
        JOIN
        (
            SELECT users.id, users.name,
                SUM ("visitCount") AS "totalVisitCount"
                FROM users
                JOIN urls
                ON urls."userId" = users.id
                GROUP BY users.id, users.name
        ) AS "userData"
        ON urls."userId" = "userData".id
        WHERE urls."userId" = $1;
    `, [userInformation.rows[0].id])
}