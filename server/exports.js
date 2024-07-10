import DotEnv from "dotenv"


export let {
            CLIENT_URL,
            PORT,
            NODE_ENV,
            REDIS_URL,
            MONGODB_URL,
            DATABASE_NAME_MONGODB,
            CLOUD_NAME,
            CLOUD_API_KEY,
            CLOUD_API_SECRET,
            JWT_SECRET,
            LOCAL_PATH_UPLOAD_FILES
            } = DotEnv.config().parsed

         