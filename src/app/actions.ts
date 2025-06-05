
"use server";

import { z } from "zod";

// Zod messages remain in one language (e.g., PT) or become keys if needed.
// For this example, keeping them simple.
const contactFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."), // Key: "validation.name.minChar"
  email: z.string().email("Endereço de email inválido."), // Key: "validation.email.invalid"
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."), // Key: "validation.message.minChar"
});

export type ContactFormState = {
  messageKey: string; // Now a key for client-side translation
  status: "success" | "error" | "idle";
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      messageKey: "validation.failed",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // In a real app, you would send an email or save to a database here.
  console.log("Contact form submitted:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Example of successful submission:
  return {
    messageKey: "contact.success",
    status: "success",
  };

  // Example of a server-side error during submission (uncomment to test):
  // return {
  //   messageKey: "contact.error.generic",
  //   status: "error",
  // };
}
