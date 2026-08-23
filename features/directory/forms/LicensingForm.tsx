"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Licensing } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import MediaUpload from "@/features/media/MediaUpload";
import {
  AddLicensingAuthorityAction,
  UpdateLicensingAuthorityAction,
} from "../DirectoryActions";
import {
  AddLicenseSchema,
  EditLicenseSchema,
  type LicenseFormValues,
} from "../DirectorySchema";

type LicensingFormProps =
  | {
      mode: "add";
      authority?: never;
    }
  | {
      mode: "edit";
      authority: Licensing;
    };

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="col-span-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        {description ? (
          <p className="text-md text-primary-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default function LicensingForm(props: LicensingFormProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const authority = isEditing ? props.authority : null;

  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(isEditing ? EditLicenseSchema : AddLicenseSchema),
    defaultValues: {
      name: authority?.name ?? "",
      websiteUrl: authority?.websiteUrl ?? "",
      logo: undefined,
      email: authority?.email ?? "",
      contactNumber: authority?.contactNumber ?? "",
      longitude: authority?.longitude ?? undefined,
      latitude: authority?.latitude ?? undefined,
    },
  });

  async function handleSubmit(data: LicenseFormValues) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateLicensingAuthorityAction(props.authority.id, data)
          : await AddLicensingAuthorityAction(data);

      if (response.success) {
        toast.success(isEditing ? "Authority updated" : "Authority added");
        router.push("/portal/licensing");
        router.refresh();
        return;
      }

      toast.error(
        isEditing ? "Failed to update authority" : "Failed to add authority",
      );
    } catch {
      toast.error(
        isEditing ? "Failed to update authority" : "Failed to add authority",
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-10">
      <FormSection
        title="Licensing Authority Name"
        description="Enter the name of the licensing authority or council."
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <FormSection
        title="Licensing Authority Email"
        description="Enter the email address of the licensing authority or council. This will be the point of contact for passengers who need to make a complaint."
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input {...field} type="email" />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <FormSection
        title="Licensing Authority Contact Number"
        description="Enter the contact number of the licensing authority or council. This will be the point of contact for passengers who need to make a complaint."
      >
        <Controller
          name="contactNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Contact Number</FieldLabel>
              <FieldContent>
                <Input {...field} type="tel" />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <FormSection
        title="Licensing Authority Website"
        description="Enter the website URL of the licensing authority or council."
      >
        <Controller
          name="websiteUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Website URL</FieldLabel>
              <FieldContent>
                <Input {...field} type="url" />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <FormSection title="Licensing Authority Logo">
        <Controller
          name="logo"
          control={form.control}
          render={({ field, fieldState }) => {
            const logoUrl = field.value?.url ?? authority?.logo;

            return (
              <Field className="lg:col-span-2">
                <FieldLabel>Authority Logo</FieldLabel>
                <FieldContent>
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Authority Logo"
                      width={100}
                      height={100}
                    />
                  ) : null}
                  <MediaUpload
                    endpoint="logoUploader"
                    value={field.value ?? null}
                    onChangeAction={field.onChange}
                    label={authority?.logo ? "Replace image" : "Upload image"}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            );
          }}
        />
      </FormSection>

      <FormSection title="Longitude">
        <Controller
          name="longitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Longitude</FieldLabel>
              <FieldContent>
                <Input
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  defaultValue={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === ""
                        ? undefined
                        : event.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <FormSection title="Latitude">
        <Controller
          name="latitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Latitude</FieldLabel>
              <FieldContent>
                <Input
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  defaultValue={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === ""
                        ? undefined
                        : event.target.valueAsNumber,
                    )
                  }
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </FieldContent>
            </Field>
          )}
        />
      </FormSection>

      <div className="flex flex-row items-center justify-end">
        <Button size="lg" disabled={form.formState.isSubmitting}>
          {isEditing ? "Update Authority" : "Add Authority"}
        </Button>
      </div>
    </form>
  );
}
