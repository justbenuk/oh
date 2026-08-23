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
  FieldDescription,
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
  children?: React.ReactNode;
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Controller
            name="logo"
            control={form.control}
            render={({ field, fieldState }) => {
              const logoUrl = field.value?.url ?? authority?.logo;

              return (
                <Field className="lg:col-span-2">
                  <FieldLabel>Licensing Authority Logo</FieldLabel>
                  <FieldContent>
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Authority Logo"
                        width={500}
                        height={500}
                        className="w-full border-4 border-dashed"
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
        </div>
        <div className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="lg:col-span-2">
                <FieldLabel>Licensing Authority Name</FieldLabel>
                <FieldContent>
                  <Input {...field} />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="lg:col-span-2">
                <FieldLabel>Licensing Authority Contact Email</FieldLabel>
                <FieldContent>
                  <Input {...field} type="email" />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="contactNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="lg:col-span-2">
                <FieldLabel>Main Switchboard Contact Number</FieldLabel>
                <FieldContent>
                  <Input {...field} type="tel" />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="websiteUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="lg:col-span-2">
                <FieldLabel>Licensing Authority Website URL</FieldLabel>
                <FieldContent>
                  <Input {...field} type="url" />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-4">
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
          </div>
          <div className="flex flex-row items-center justify-end">
            <Button size="lg" disabled={form.formState.isSubmitting}>
              {isEditing ? "Update Authority" : "Add Authority"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
