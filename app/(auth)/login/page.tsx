import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import LoginForm from "@/features/auth/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">Fill in the form below to enter your account</p>
        </div>
        <LoginForm />
        <Field>
          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
