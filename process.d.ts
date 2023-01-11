declare namespace NodeJS {
  export interface ProcessEnv {
    SALT_ROUNDS: strings
    HASH_SECRET: string
    COOKIE_NAME: string
    JWT_SECRET: string
  }
}
