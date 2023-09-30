import db from "../database/databaseConfig.js"

export async function shortenUrl (request, response) {
    const { url } = request.body

    response.status(201).send(console.log("body"))
}