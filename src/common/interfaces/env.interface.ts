export interface IEnv {
    NODE_ENV: string;
    APP_HOST: string;
    PORT: number;
    ADMIN_URL: string;
  
    DATABASE_CONNECTION: string;
    DATABASE_HOST_WRITE_CLUSTER: string;
    DATABASE_HOST_READ_CLUSTER: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_SYNCHRONIZE: boolean;
    DATABASE_LOGGING: boolean;
  
    MONGO_DB_URL: string;
    MONGO_DB_HOST: string;
    MONGO_DB_PORT: number;
    MONGO_DB_USER: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_NAME: string;
  
    LOG_LEVEL: string;
    LOG_PATH: string;
  
    GCP_PROJECT_ID: string;
    GCP_CREDENTIALS_PATH: string;
  
    AWS_S3_BUCKET: string;
    AWS_S3_ACCESS_KEY_ID: string;
    AWS_S3_SECRET_ACCESS_KEY: string;
  
    QUEUE_REDIS_HOST: string;
    QUEUE_REDIS_PORT: number;
    QUEUE_REDIS_USERNAME: string;
    QUEUE_REDIS_PASSWORD: string;
  
    CACHE_REDIS_HOST: string;
    CACHE_REDIS_PORT: number;
    CACHE_REDIS_USERNAME: string;
    CACHE_REDIS_PASSWORD: string;
  
    SLACK_WEBHOOK_URL: string;
  
    JWT_SECRET: string;
  
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
  
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_VERIFICATION_SERVICE_SID: string;
  
    PUBNUB_PUBLISH_KEY: string;
    PUBNUB_SUBSCRIBE_KEY: string;
    PUBNUB_BCEL_ONE_BANK_SUBSCRIBE_KEY: string;
    PUBNUB_SECRET_KEY: string;
    PUBNUB_UUID: string;
    BECL_ONE_MCID: string;
    BCEL_ONE_MCC: number;
    BCEL_ONE_SUBSCRIBE_KEY: string;
}  