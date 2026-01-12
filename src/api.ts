import { contactFormSchema, type ContactFormData } from './validation';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function validateForm(
  data: unknown
): Promise<{ success: true; data: ContactFormData } | { success: false; errors: Partial<Record<keyof ContactFormData, string>> }> {
  await delay(500);

  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

export async function submitForm(data: ContactFormData): Promise<void> {
  console.log('Form submitted:', data);
}
