import { usersShortenedUrlsDataRepository } from "../repositories/usersRepositories.js"

export async function getUserData (request, response) {
    const userInformation = response.locals.user

    try {
        const usersShortenedUrlsData = await usersShortenedUrlsDataRepository(userInformation)

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