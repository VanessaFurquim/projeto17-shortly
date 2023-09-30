import db from "../database/databaseConfig.js"

export async function validateAuthentication (request, response, next) {
    const { authorization } = request.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) return response.status(404).send( { message: "You need to send a token of authentication." } )

    try {
        const session = await db.query(`SELECT token FROM "authenticationSessions" WHERE token = $1;`, [token])
        console.log(token)
        console.log(session.rows[0].token)
        if (session.rowCount === 0) return response.status(401).send( { message: "Access not granted." } )

    //     const userInformation = db.query(`SELECT * FROM users WHERE id = ${session.userId}`)

    //     response.locals.token = token
    //     response.locals.userInformation = userInformation

        next()

    } catch (error) { response.status(500).send(error.message) }
}