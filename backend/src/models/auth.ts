interface DevProcess {
    env: Env
}

interface Env {
    ACCESS_TOKEN_SECRET: string,
    REFRESH_TOKEN_SECRET: string
}

export interface User {
    name: string
}

export const devProcess: DevProcess = {
    env: {
        ACCESS_TOKEN_SECRET: 'dev_access_token_secret',
        REFRESH_TOKEN_SECRET: 'dev_refresh_token_secret'
    }
};