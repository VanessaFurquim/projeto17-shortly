import db from "../database/databaseConfig.js"

export async function validateAuthentication (request, response, next) {
    const { authorization } = request.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) return response.status(404).send( {message: "You need to send a token of authentication."} ) 

    try {
        const session = db.query(`SELECT * FROM sessions WHERE token = ${token}`)
        if (!session) return response.status(401).send( {message: "Access not granted."} )

        const userInformation = db.query(`SELECT * FROM users WHERE id = ${session.userId}`)

        response.locals.token = token
        response.locals.userInformation = userInformation

        next()

    } catch (error) { response.status(500).send(error.message) }
}