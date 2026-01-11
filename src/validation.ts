import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters');

export const emailSchema = z
  .email('Invalid email address')
  .min(1, 'Email is required');

export const subjectSchema = z
  .string()
  .min(1, 'Subject is required')
  .min(5, 'Subject must be at least 5 characters');

export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters');

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
