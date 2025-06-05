
"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Endereço de email inválido."),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

export type ContactFormState = {
  message: string;
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
      message: "Falha na validação. Por favor, verifique os dados inseridos.",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Em um aplicativo real, você enviaria um e-mail ou salvaria em um banco de dados aqui.
  console.log("Formulário de contato enviado:");
  console.log("Nome:", name);
  console.log("Email:", email);
  console.log("Mensagem:", message);

  // Simular chamada de API
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Obrigado pela sua mensagem! Entrarei em contato em breve.",
    status: "success",
  };
}
