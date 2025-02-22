import dotenv from 'dotenv'
import path from 'path'
import { z } from 'zod'
import { EENV } from '../constants/types.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })

// Define the schema using Zod
const envVarsSchema = z.object({
  NODE_ENV: z.enum([EENV.PRODUCTION, EENV.DEVELOPMENT]).default(EENV.DEVELOPMENT),
  PORT: z.number().default(3001),
})

// Parse and validate environment variables
const result = envVarsSchema.safeParse(process.env)

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`)
}

// Extract validated values
const envVars = result.data

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
}
