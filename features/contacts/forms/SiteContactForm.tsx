"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SiteContactSchema } from "../ContactSchemas";
import z from "zod";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { SiteContactAction } from "../ContactActions";
import { toast } from "sonner";
export default function SiteContactForm() {
  const form = useForm({
    resolver: zodResolver(SiteContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function handleSiteContact(values: z.infer<typeof SiteContactSchema>) {
    const response = await SiteContactAction(values);

    if (response.success) {
      toast.success("Message sent");
      form.reset();
    } else {
      toast.error("Failed to send message");
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSiteContact)} className="grid gap-6">
      <FieldGroup className="flex flex-col lg:flex-row gap-3">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Subject</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Message</FieldLabel>
              <FieldContent>
                <Textarea {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex flex-row items-center justify-center sm:justify-end">
        <Button>
          <SendIcon />
          <span>Send Message</span>
        </Button>
      </div>
    </form>
  );
}
