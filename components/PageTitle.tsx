import { ReactNode } from "react";
import PageContainer from "./PageContainer";

interface Props {
  children?: ReactNode;
  title: string;
  image: string;
}
export default function PageTitle({ children, title, image }: Props) {
  return (
    <div style={{ backgroundImage: `url('${image}')`, backgroundPosition: "center", backgroundSize: "cover" }}>
      <div className="bg-gray-950/50 py-20">
        <PageContainer>
          <h1 className="text-primary font-semibold text-4xl">{title}</h1>
          <div className="text-secondary text-xl">{children}</div>
        </PageContainer>
      </div>
    </div>
  );
}
