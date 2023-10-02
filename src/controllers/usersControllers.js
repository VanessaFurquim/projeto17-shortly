import db from "../database/databaseConfig.js"

export async function getUserData (request, response) {
    const userInformation = response.locals.user

    try {
        const usersShortenedUrlsData = await db.query(`
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

        const usersShortenedUrlsObject = {
            id: usersShortenedUrlsData.rows[0].userId,
            name: usersShortenedUrlsData.rows[0].name,
            visitCount: usersShortenedUrlsData.rows[0].totalVisitCount,
            shortenedUrls: usersShortenedUrlsData.rows.map(url => {
                return {
                    id: url.id,
                    shortUrl: url.shortUrl,
                    url: url.url,
                    visitCount: url.urlVisitCount
                }
            })
        }

        response.status(200).send(usersShortenedUrlsObject)

    } catch (error) { response.status(500).send(error.message) }
}