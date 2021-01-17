export const environment = {
  production: false,
  APP_PORT: process.env.APP_PORT || 3000,
  databaseConfig: {
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    NAME: process.env.DATABASE_NAME,
    OPTION: process.env.DATABASE_OPTION
  },
  authenticationConfig: {
    SECRET: process.env.SECRET,
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL
  }
};
