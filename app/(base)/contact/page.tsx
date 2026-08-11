import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SiteContactForm from "@/features/contacts/forms/SiteContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinearTitle from "@/components/LinearTitle";
import Link from "next/link";
import { CarTaxiFrontIcon, LocateIcon, MailIcon, StopCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  openGraph: {
    title: "Contact Operator Hub",
    url: "https://operatorhub.app/contact",
    siteName: "Operator Hub",
    images: [],
    locale: "en_GB",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
          <div className="flex flex-col justify-center items-start space-y-4">
            <LinearTitle text="Have Questions?" className="mb-2 py-2" />
            <span className="text-xl">
              Use the details below or the contact form to reach out to us. If you would like your business adding to our directory.{" "}
              <Link href={"/add-business"} className="underline font-semibold">
                Click Here
              </Link>
            </span>
            <div className="flex flex-col space-y-3">
              <Link href={"mailto://hello@operatorhub.app"} className="flex flex-row items-center gap-3">
                <MailIcon className="size-8 text-primary" />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-semibold text-xl">General Help</h1>
                  <span className="text-secondary-foreground italic">hello@operatorhub.app</span>
                </div>
              </Link>
              <Link href={"mailto://hello@operatorhub.app"} className="flex flex-row items-center gap-3">
                <CarTaxiFrontIcon className="size-8 text-primary" />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-semibold text-xl">Operator Help</h1>
                  <span className="text-secondary-foreground italic">operator@operatorhub.app</span>
                </div>
              </Link>
              <Link href={"mailto://hello@operatorhub.app"} className="flex flex-row items-center gap-3">
                <LocateIcon className="size-8 text-primary" />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="font-semibold text-xl">Postal Address</h1>
                  <span className="text-secondary-foreground italic">18 Parkside, Belgrave, Tamworth, B77 2JU</span>
                </div>
              </Link>
            </div>
            <div className="flex flex-row items-center gap-10 mt-4 bg-secondary p-2 rounded-xl">
              <div className="font-semibold text-lg flex flex-col leading-4">
                <span>Follow</span>
                <span>Us On</span>
              </div>
              <Link href={"/"}>
                <StopCircle />
              </Link>
              <Link href={"/"}>
                <StopCircle />
              </Link>
              <Link href={"/"}>
                <StopCircle />
              </Link>
              <Link href={"/"}>
                <StopCircle />
              </Link>
            </div>
          </div>
          <Card className="shadow-2xl shadow-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <SiteContactForm />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
