
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    NEXT_STRIPE_PUBLIC_KEY: string
    STRIPE_SECRET_KEY: string
    STRIPE_SIGNING_SECRET: string
  }
}