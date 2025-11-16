import 'nullstack'
declare module 'nullstack' {
  export interface BaseNullstackClientContext {
    /** enabled on server operations */
    loading: boolean
  }
  export interface NullstackSecrets {
    /** Stripe secret_key */
    stripe: string
  }
}
