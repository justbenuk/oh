"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoginUserSchema } from "../AuthSchema";
import z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginUserAction } from "../AuthActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLoginForm(data: z.infer<typeof LoginUserSchema>) {
    const response = await LoginUserAction(data);
    if (response.success) {
      router.replace("/dashboard");
      router.refresh();
    } else {
      toast.error("failed to login");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleLoginForm)} className="grid gap-3">
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
      <Button>Log In</Button>
    </form>
  );
}
