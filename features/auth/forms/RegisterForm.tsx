"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RegisterUserSchema } from "../AuthSchema";
import z from "zod";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterUserAction } from "../AuthActions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleRegisterForm(data: z.infer<typeof RegisterUserSchema>) {
    const response = await RegisterUserAction(data);

    if (response.success) {
      toast.success("User Registered");
      redirect("/dashboard");
    } else {
      toast.error("Failed to register user");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleRegisterForm)} className="grid gap-3">
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
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input {...field} type="password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <FieldContent>
              <Input {...field} type="password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
          </Field>
        )}
      />
      <Button>Register</Button>
    </form>
  );
}
