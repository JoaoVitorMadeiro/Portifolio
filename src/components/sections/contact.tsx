
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Zod schema for client-side validation (can be different or use keys if fully internationalized)
const contactFormSchemaClient = (translations: any) => z.object({
  name: z.string().min(2, { message: translations.language === "pt-BR" ? "O nome deve ter pelo menos 2 caracteres." : "Name must be at least 2 characters." }),
  email: z.string().email({ message: translations.language === "pt-BR" ? "Por favor, insira um endereço de email válido." : "Please enter a valid email address." }),
  message: z.string().min(10, { message: translations.language === "pt-BR" ? "A mensagem deve ter pelo menos 10 caracteres." : "Message must be at least 10 characters." }),
});


type ContactFormData = z.infer<ReturnType<typeof contactFormSchemaClient>>;

interface ContactSectionProps {
  contactEmail?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const { translations } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto transition-transform hover:scale-105 group">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {translations.contactSubmittingButton}
        </>
      ) : (
        <>
          {translations.contactSubmitButton} <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </Button>
  );
}

export function ContactSection({ contactEmail }: ContactSectionProps) {
  const { toast } = useToast();
  const { translations, language } = useLanguage();


  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchemaClient(translations)), // Pass translations for dynamic messages
    defaultValues: {
      name: "",
      email: contactEmail || "",
      message: "",
    },
  });
  
  useEffect(() => {
    form.reset({ 
        name: "", 
        email: contactEmail || "", 
        message: "" 
    });
  }, [language, contactEmail, form]);


  const initialState: ContactFormState = { messageKey: "", status: "idle" };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: translations.contactToastSuccessTitle,
        description: translations.formMessages[state.messageKey] || state.messageKey,
      });
      form.reset();
    } else if (state.status === "error" && state.messageKey) {
       toast({
        title: translations.contactToastErrorTitle,
        description: translations.formMessages[state.messageKey] || state.messageKey,
        variant: "destructive",
      });
    }
  }, [state, toast, form, translations]);


  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl font-bold text-foreground sm:text-5xl">{translations.contactTitle}</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              {translations.contactDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground/80">{translations.contactNameLabel}</Label>
                <Input
                  id="name"
                  type="text"
                  {...form.register("name")}
                  placeholder={translations.contactNamePlaceholder}
                  className="mt-1 bg-background/70"
                  aria-invalid={form.formState.errors.name || state.errors?.name ? "true" : "false"}
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
                 {state.errors?.name && <p className="mt-1 text-sm text-destructive">{state.errors.name.join(', ')}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground/80">{translations.contactEmailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder={translations.contactEmailPlaceholder}
                  className="mt-1 bg-background/70"
                  aria-invalid={form.formState.errors.email || state.errors?.email ? "true" : "false"}
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
                {state.errors?.email && <p className="mt-1 text-sm text-destructive">{state.errors.email.join(', ')}</p>}
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground/80">{translations.contactMessageLabel}</Label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  placeholder={translations.contactMessagePlaceholder}
                  rows={5}
                  className="mt-1 bg-background/70"
                  aria-invalid={form.formState.errors.message || state.errors?.message ? "true" : "false"}
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-destructive">{form.formState.errors.message.message}</p>
                )}
                {state.errors?.message && <p className="mt-1 text-sm text-destructive">{state.errors.message.join(', ')}</p>}
              </div>
              
              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
