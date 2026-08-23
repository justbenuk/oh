import ErrorCard from "@/components/ErrorCard";
import LicensingMap from "@/components/maps/LicensingMap";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { FetchSingleLicensingAction } from "@/features/directory/DirectoryActions";
import { MailIcon, PhoneCall } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LicensingSinglePage({ params }: Props) {
  const slug = await params;

  const post = await FetchSingleLicensingAction(slug);

  if (!post) {
    return (
      <div className="mt-20">
        <PageContainer>
          <ErrorCard
            title="Authority Not Found"
            description="Something went wrong! We couln't find the authority your looking for"
          />
        </PageContainer>
      </div>
    );
  }

  const longitude = post.longitude;
  const latitude = post.latitude;

  return (
    <div>
      <PageTitle title={post.name} image={"/assets/taxi.jpg"} />
      <PageContainer>
        <div className="grid gap-20 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl font-semibold">Contact Authority</h1>
              <p>
                We want to make it easier for you to contact the licensing
                authority of a Driver or Company you may have used. We provide
                the details here for you to contact them directly
              </p>
              <p>
                Although we provide these details for you to make a complaint if
                required, It should also be used when a Driver or Company have
                gone above and beyond to help.
              </p>
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex flex-row gap-2 items-center">
                  <div className="bg-primary p-2 rounded-full">
                    <PhoneCall className="size-6" />
                  </div>
                  <span className="text-xl">{post.contactNumber}</span>
                </div>

                <Link
                  href={`mailto://${post.email}`}
                  className="flex flex-row gap-2 items-center"
                >
                  <div className="bg-primary p-2 rounded-full">
                    <MailIcon className="size-6" />
                  </div>
                  <span className="text-xl">{post.email}</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {latitude !== null && longitude !== null ? (
                <LicensingMap longitude={longitude} latitude={latitude} />
              ) : (
                <p>Map coordinates are unavailable for this authority.</p>
              )}
            </div>
          </div>
          <div>table off al companies under this authority will go here</div>
        </div>
      </PageContainer>
    </div>
  );
}
