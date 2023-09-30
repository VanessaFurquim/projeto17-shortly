import db from "../database/databaseConfig.js"

export async function validateAuthentication (request, response, next) {
    const { authorization } = request.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) return response.status(404).send( { message: "You need to send a token of authentication." } )

    try {
        const session = await db.query(`SELECT token, "userId" FROM "authenticationSessions" WHERE token = $1;`, [token])
        if (session.rowCount === 0) return response.status(401).send( { message: "Access not granted." } )

        const userInformation = await db.query(`SELECT * FROM users WHERE id = $1`, [session.rows[0].userId])

        // console.log(userInformation)
        response.locals.token = token
        response.locals = userInformation

        next()

    } catch (error) { response.status(500).send(error.message) }
}