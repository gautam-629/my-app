const dotenv=require('dotenv');
dotenv.config();

export const{
    APP_PORT,
    DB_URL,
    DEBUG_MODE,
    REFRESH_JWT_SECRET,
    ACCESS_JWT_TOKEN
}=process.env;