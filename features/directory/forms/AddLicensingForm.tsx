'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LicenseSchema } from "../DirectorySchema";
import z from "zod";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddLicensingForm() {
  const form = useForm({
    resolver: zodResolver(LicenseSchema),
    defaultValues: {
      name: '',
      websiteUrl: '',
      logo: '',
      email: '',
      contactNumber: ''
    }
  })

  async function handleAddLicensing(data: z.infer<typeof LicenseSchema>) {
  console.log(data)
}

  return (
    <form onSubmit={form.handleSubmit(handleAddLicensing)} className="grid gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h1 className="text-xl font-semibold">Licensing Authority Name</h1>
          <p className="text-md text-primary-foreground">Enter the name of the licensing authority or council.</p>
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              </FieldContent>
              </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h1 className="text-xl font-semibold">Licensing Authority Email</h1>
          <p className="text-md text-primary-foreground">Enter the email address of the licensing authority or council. This will be the point of contact for the passenger if they need to make a complaint</p>
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              </FieldContent>
              </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h1 className="text-xl font-semibold">Licensing Authority Contact Number</h1>
          <p className="text-md text-primary-foreground">Enter the contact number of the licensing authority or council. This will be the point of contact for the passenger if they need to make a complaint</p>
        </div>
        <Controller
          name="contactNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Contact Number</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              </FieldContent>
              </Field>
          )}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h1 className="text-xl font-semibold">Licensing Authority Website</h1>
          <p className="text-md text-primary-foreground">Enter the website url of the licensing authority or council.</p>
        </div>
        <Controller
          name="websiteUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Contact Number</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              </FieldContent>
              </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h1 className="text-xl font-semibold">Licensing Authority Logo</h1>
        </div>
        <Controller
          name="logo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="lg:col-span-2">
              <FieldLabel>Authority Logo</FieldLabel>
              <FieldContent>
                <Input {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              </FieldContent>
              </Field>
          )}
        />
      </div>
      <div className="flex flex-row items-center justify-end">
<Button size={'lg'}>Add Authority</Button>
      </div>
    </form>
  );
}
