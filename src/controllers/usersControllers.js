import db from "../database/databaseConfig.js"

export async function getUserData (request, response) {
    const userInformation = response.locals.user

    try {
        const usersShortenedUrls = await db.query(`SELECT * FROM urls WHERE "userId" = $1;`, [userInformation.rows[0].id])
        console.log(usersShortenedUrls)

        response.status(200).send( "body" )

    } catch (error) { response.status(500).send(error.message) }
}

// id.user, name.user FROM users
// SELECT users.id, users.name, urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM users

// visitCount.user created in this object by summing visitCount's of each shortUrl FROM urls
// SELECT "userId" SUM "visitCount" FROM urls GROUP BY "userId";
// 

// shortenedUrls aggregate FROM urls
//

// id.shortUrl, shortUrl, url, visitCount FROM urls
// JOIN urls ON users.id = urls.userId;