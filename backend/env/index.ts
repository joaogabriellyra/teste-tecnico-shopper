import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GOOGLE_API_KEY: z.string(),
  PORT: z.coerce.number(),
})

export const env = envSchema.parse(process.env)