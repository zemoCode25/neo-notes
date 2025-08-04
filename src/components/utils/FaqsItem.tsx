import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function FaqsItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <AccordionItem value={`item-${index}`} className="mt-3">
      <AccordionTrigger className="cursor-pointer">{question}</AccordionTrigger>
      <AccordionContent className="bg-violet-100">{answer}</AccordionContent>
    </AccordionItem>
  );
}
