export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 8080;

export const db = {
    name: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_USER_PWD || '',
};

export const corsUrl = process.env.CORS_URL || '*';

export const tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '30'),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '120'),
    issuer: process.env.TOKEN_ISSUER || 'localhost',
    audience: process.env.TOKEN_AUDIENCE || 'localhost',
};

export const logDirectory = process.env.LOG_DIR;