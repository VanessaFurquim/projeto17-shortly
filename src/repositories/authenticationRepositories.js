import db from "../database/databaseConfig.js"
import bcrypt from "bcrypt"

export async function isEmailRegisteredRepository ( { email } ) {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
}

export async function addNewUserRepository ( { name, email, password } ) {
    const hash = bcrypt.hashSync(password, 12)

    return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hash])
}

export async function authenticateSessionRepository (token, id) {
    return db.query(`INSERT INTO "authenticationSessions" (token, "userId") VALUES ($1, $2)`, [token, id])
}