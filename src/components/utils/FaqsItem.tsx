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
      <AccordionTrigger className="cursor-pointer bg-blue-300">
        {question}
      </AccordionTrigger>
      <AccordionContent className="bg-blue-100">{answer}</AccordionContent>
    </AccordionItem>
  );
}
