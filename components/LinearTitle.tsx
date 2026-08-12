import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export default function LinearTitle({ text, className }: Props) {
  return (
    <h1 className={cn("text-4xl md:text-6xl 2xl:text-8xl font-bold bg-linear-to-r from-black via-primary to-primary text-transparent bg-clip-text wrap-break-word", className)}>
      {text}
    </h1>
  );
}
