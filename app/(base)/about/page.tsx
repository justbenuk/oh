import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About Operator Hub" image="/assets/taxi2.jpg">
        <span>What are we here for</span>
      </PageTitle>
      <PageContainer size="read">
        <div className="grid gap-6 py-10">
          <div>
            <h1 className="text-2xl font-semibold">Connecting Passengers with Trusted Local Private Hire Operators</h1>
          </div>
          <p>OperatorHub was created to make finding reliable private hire and taxi services simpler, safer, and more transparent.</p>
          <p>
            Across the UK, thousands of independent taxi and private hire operators provide an essential service to their local communities. However, many passengers struggle to
            find accurate information about local operators, understand which licensing authority regulates them, or know what services are available in a particular area.
          </p>
          <h1 className="text-xl font-semibold">OperatorHub brings this information together in one place.</h1>
          <p>
            Our platform provides professionally managed business profiles for licensed taxi and private hire operators, giving passengers easy access to important information
            including operating areas, licensing authorities, contact details, available services, and helpful travel information.
          </p>
          <h1 className="text-xl font-semibold">Supporting Local Businesses</h1>
          <p>We believe independent taxi companies are a vital part of every community.</p>
          <p>
            Every business listed on OperatorHub has its own dedicated website, designed to showcase its services while providing useful information that customers expect before
            booking.
          </p>
          <h1 className="text-xl font-semibold">Helping Passengers Travel Safely</h1>
          <p>Finding a taxi company should be about more than just a phone number.</p>
          <p>
            OperatorHub helps passengers make informed decisions by providing clear information about operators, the areas they serve, and the licensing authority responsible for
            regulating them.
          </p>
          <p>By making this information easy to access, we aim to encourage safer travel and greater transparency across the private hire industry.</p>
          <h1 className="text-xl font-semibold">More Than a Business Directory</h1>
          <p>OperatorHub is more than a directory of taxi companies.</p>
          <p>
            It&apos;s a growing platform designed to connect passengers with trusted local transport providers while giving independent operators modern digital tools to manage
            their online presence and better serve their communities.
          </p>
          <p>
            Whether you&apos;re looking for a local taxi company or you&apos;re an operator wanting to present your business professionally online, OperatorHub is built to support
            the future of independent private hire.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
