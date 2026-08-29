import {z} from 'zod';

export const eventTypes = ['corporate', 'wedding', 'conference', 'private', 'breakfast', 'lunch', 'cake'] as const;
export const budgetRanges = ['under-500', '500-1000', '1000-2500', '2500-5000', 'over-5000'] as const;
export const serviceStyles = ['delivery', 'pickup', 'full-service'] as const;
export const dietaryOptions = ['vegan', 'gluten-free', 'lactose-free', 'nut-free', 'halal'] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  eventDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  eventType: z.enum(eventTypes),
  guests: z.coerce.number().int().min(1).max(5000),
  budget: z.enum(budgetRanges),
  serviceStyle: z.enum(serviceStyles),
  dietary: z.array(z.enum(dietaryOptions)).default([]),
  message: z.string().trim().max(2000).default(''),
  consent: z.boolean().refine((value) => value),
  website: z.string().max(0).optional(),
  locale: z.enum(['et', 'ru', 'en'])
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
