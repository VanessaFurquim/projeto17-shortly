import db from "../database/databaseConfig.js"

export async function getRanking (request, response) {

    try {
        const rankingData = await db.query(`
            SELECT users.id, users.name,
	            COUNT (urls.url) AS "linksCount",
	            SUM ("visitCount") AS "visitCount"
	            FROM users
	            JOIN urls
	                ON urls."userId" = users.id
	            GROUP BY users.id, users.name
                ORDER BY SUM ("visitCount") DESC;
            `)
            console.log(rankingData.rows)
        
        response.status(200).send(rankingData.rows)

    } catch (error) { response.status(500).send(error.message) }
}