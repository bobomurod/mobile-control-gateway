export const environment = {
  production: false,
  APP_PORT: process.env.APP_PORT || 3000,
  databaseConfig: {
    USER: process.env.DATABASE_USER || '',
    PASSWORD: process.env.DATABASE_PASSWORD || '',
    HOST: process.env.DATABASE_HOST || '',
    PORT: process.env.DATABASE_PORT || '',
    NAME: process.env.DATABASE_NAME || '',
    OPTION: process.env.DATABASE_OPTION || ''
  },
  authenticationConfig: {
    SECRET: process.env.SECRET || 'secret',
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '300',
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '259200'
  }
};
