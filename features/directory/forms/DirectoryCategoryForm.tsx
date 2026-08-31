"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DirectoryCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  AddDirectoryCategorySchema,
  DirectoryCategoryFormValues,
  EditDirectoryCategorySchema,
} from "../DirectorySchema";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import Image from "next/image";
import MediaUpload from "@/features/media/MediaUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AddDirectoryCategoryAction,
  UpdateDirectoryCategoryAction,
} from "../DirectoryActions";

type DirecoryCategoryProps =
  | {
      mode: "add";
      category?: "never";
    }
  | {
      mode: "edit";
      category: DirectoryCategory;
    };

export default function DirectoryCategoryForm(props: DirecoryCategoryProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const category = isEditing ? props.category : null;

  const form = useForm({
    resolver: zodResolver(
      isEditing ? EditDirectoryCategorySchema : AddDirectoryCategorySchema,
    ),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      image: undefined,
    },
  });

  async function handleSubmit(data: DirectoryCategoryFormValues) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateDirectoryCategoryAction(props.category.id, data)
          : await AddDirectoryCategoryAction(data);

      if (response.success) {
        toast.success(isEditing ? "Category Updated" : "Category Added");
        router.push("/portal/directory/categories");
        router.refresh();
        return;
      }

      toast.error(
        isEditing ? "Failed to update category" : "Failed to add category",
      );
    } catch {
      toast.error(
        isEditing ? "Failed to update category" : "Failed to add category",
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => {
              const imageUrl = field.value?.url ?? category?.image;
              return (
                <Field>
                  <FieldLabel>Category Image</FieldLabel>
                  <FieldContent>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="category image"
                        width={500}
                        height={500}
                        className="w-full border-4 border-dashed"
                      />
                    ) : null}
                    <MediaUpload
                      endpoint="directoryCategoryImageUploader"
                      value={field.value ?? null}
                      onChangeAction={field.onChange}
                      label={category?.image ? "Replace Image" : "Upload Image"}
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
        <div className="grid gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Category Name</FieldLabel>
                <FieldContent>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Category Description</FieldLabel>
                <FieldContent>
                  <Textarea {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <div className="flex flex-row items-center justify-end">
            <Button disabled={form.formState.isSubmitting}>
              {isEditing ? "Update category" : "Add Category"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
