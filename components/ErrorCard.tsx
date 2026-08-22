import { FaExclamationTriangle } from "react-icons/fa";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

export default function ErrorCard({title, description}: {title: string, description: string}) {
  return (
    <Empty className="border-2 border-dashed border-red-500">
      <EmptyHeader>
        <EmptyMedia variant={'icon'} className="bg-red-500 text-white">
          <FaExclamationTriangle />
        </EmptyMedia>
        <EmptyTitle className="text-red-500 text-2xl">{title}</EmptyTitle>
        <EmptyDescription className="text-lg">{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

