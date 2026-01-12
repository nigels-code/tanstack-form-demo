import { useForm } from '@tanstack/react-form';
import { validateForm, submitForm } from './api';
import { defaultContactFormData, type ContactFormData } from './validation';

export function ContactForm() {
  const form = useForm({
    defaultValues: defaultContactFormData,
    onSubmit: async ({ value }) => {
      const validationResponse = await validateForm(value);

      if (!validationResponse.success) {
        for (const [field, message] of Object.entries(validationResponse.errors)) {
          form.setFieldMeta(field as keyof ContactFormData, (prev) => ({
            ...prev,
            errorMap: { onSubmit: message },
          }));
        }
        return;
      }

      await submitForm(validationResponse.data);
      alert('Message sent successfully!');
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full max-w-4xl p-8 bg-gray-300 rounded-lg shadow-lg"
      noValidate
    >
      <form.Field name="name">
        {(field) => (
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="block mt-2 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="block mt-2 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="subject">
        {(field) => (
          <div className="mb-5">
            <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="block mt-2 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => (
          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded resize-y focus:outline-none focus:border-indigo-500"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="block mt-2 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
