import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.join((process.cwd(), ".env")) })

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    salt_round: process.env.SALT_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_secret_expireIn: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_secret_expireIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
}