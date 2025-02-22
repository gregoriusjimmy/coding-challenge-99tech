import { z } from 'zod'

export const createResourceSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
    description: z.string().optional(),
  }),
}
export type TCreateResourceSchema = z.infer<typeof createResourceSchema.body>

export const updateResourceSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters').optional(),
    description: z.string().optional(),
  }),
}
export type TUpdateResourceSchema = z.infer<typeof updateResourceSchema.body>

export const getResourcesSchema = {
  query: z.object({
    name: z.string().optional(),
  }),
}

export type TGetResourcesSchema = z.infer<typeof getResourcesSchema.query>
