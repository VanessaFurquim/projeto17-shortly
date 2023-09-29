import joi from "joi"

export const registerUserSchema = joi.object( {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required()
} )

export const signInUserSchema = joi.object( {
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
} )