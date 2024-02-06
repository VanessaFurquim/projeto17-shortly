import { nanoid } from 'nanoid/non-secure'
import { addNewUrlRepository, addVisitCountToUrlRepository, deleteUrlRepository, isShortUrlExistentByIdRepository, isShortUrlExistentByShortUrlRepository, isUrlExistentRepository } from "../repositories/urlsRepositories.js"

export async function shorteningUrl (request, response) {
    const { url } = request.body
    const userId = response.locals.user.rows[0].id

    const shortUrl = nanoid()

    try {
        const isUrlExistent = await isUrlExistentRepository( { url } )
        if (isUrlExistent.rowCount !== 0) return response.status(400).send( {message: "This URL has already inserted in the database."})

        const insertUrlRequestData = await addNewUrlRepository( { url, shortUrl, userId } )

        response.status(201).send( { id: (insertUrlRequestData.rows[0].id), shortUrl } )

    } catch (error) { response.status(500).send(error.message) }
}

export async function getUrlById (request, response) {
    const { id } = request.params

    try {
        const isShortUrlExistent = await isShortUrlExistentByIdRepository(id)
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
        const isShortUrlExistent = await isShortUrlExistentByShortUrlRepository(shortUrl)
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        await addVisitCountToUrlRepository(shortUrl)

        response.redirect(isShortUrlExistent.rows[0].url)

    } catch (error) { response.status(500).send(error.message) }
}

export async function deleteUrl (request, response) {
    const shortUrlId = request.params.id
    const userId = response.locals.user.rows[0].id

    try {
        const isShortUrlExistent = await isShortUrlExistentByIdRepository (shortUrlId)
        if (isShortUrlExistent.rowCount === 0) return response.status(404).send( {message: "The shortURL you are trying to access does not exist."})

        if (isShortUrlExistent.rows[0].userId !== userId) return response.status(401).send( {message: "You are not authorized to perform the solicited action."})
        
        await deleteUrlRepository(shortUrlId)

        response.sendStatus(204)

    } catch (error) { response.status(500).send(error.message) }
}