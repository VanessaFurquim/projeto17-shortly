import db from "../database/databaseConfig.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp (request, response) {
    const { name, email, password, confirmPassword } = request.body

    if (password !== confirmPassword) return response.status(422).send( {message: "Password and confirmPassword must match."} )

    try {
        const isEmailRegistered = await db.query(`SELECT email FROM users WHERE email = $1;`, [email])
        if (isEmailRegistered.rowCount !== 0) return response.status(409).send( { message: "This email is already registered to an account!" } )

        const hash = bcrypt.hashSync(password, 12)

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hash])
        
        response.sendStatus(201)

    } catch (error) { response.status(500).send(error.message) }
}

export async function signIn (request, response) {
    const { email, password } = request.body

    try {
        const isEmailRegistered = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if (isEmailRegistered.rowCount === 0) return response.status(401).send( { message: "This email address is not registered to any account!" } )

        const isPasswordCorrect = bcrypt.compareSync(password, isEmailRegistered.rows[0].password)
        if (!isPasswordCorrect) return response.status(401).send( { message: "Invalid password!" } )

        const token = uuid()
        await db.query(`INSERT INTO "authenticationSessions" (token, "userId") VALUES ($1, $2)`, [token, isEmailRegistered.rows[0].id])

        response.status(200).send( { token: `${token}` } )
    
    } catch (error) { response.status(500).send(error.message) }
}