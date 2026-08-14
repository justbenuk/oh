import PageContainer from "@/components/PageContainer";
import SiteLogo from "@/components/SiteLogo";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center p-44">
        <SiteLogo size="large" />
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p>
            Our aim is the provide practical advise and guidance on safer travel for all members of the public using Taxi&apos;s as there preferred method of transport, We also
            extend this to local operators, so they can market their businesses better, provide web services and a directory of local companies for local people to support
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
