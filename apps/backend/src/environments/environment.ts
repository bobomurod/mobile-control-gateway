export const environment = {
  production: false,
  APP_PORT: process.env.APP_PORT || 3000,
  databaseConfig: {
    USER: process.env.DATABASE_USER || 'nest',
    PASSWORD: process.env.DATABASE_PASSWORD || 'nest',
    HOST: process.env.DATABASE_HOST || 'bclaster0.z7cx1.mongodb.net',
    PORT: process.env.DATABASE_PORT || '27017',
    NAME: process.env.DATABASE_NAME || 'users',
    OPTION: process.env.DATABASE_OPTION || 'retryWrites=true&w=majority'
  },
  authenticationConfig: {
    SECRET: process.env.SECRET || 'secret',
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '300',
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '259200'
  }
};
