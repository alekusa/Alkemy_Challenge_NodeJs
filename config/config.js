import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const NEW_INSTALL = process.env.NEW_INSTALL || 'false'
export const cloud_name = process.env.cloud_name
export const api_key = process.env.api_key
export const api_secret = process.env.api_secret
export const tokenenv = process.env.token || 'palabraSecreta'
