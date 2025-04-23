import { z } from 'zod';

const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export { apiResponseSchema };
