declare namespace NodeJS {
  export interface ProcessEnv {
    SALT_ROUNDS: number
    HASH_SECRET: string
  }
}
