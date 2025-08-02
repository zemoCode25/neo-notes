import { Card } from "../ui/card";
import clsx from "clsx";

const cardColor = {
  yellow: "bg-yellow-50",
  blue: "bg-blue-50",
  red: "bg-red-50",
};

export default function FeaturesCard({
  title,
  description,
  color = "blue",
}: {
  title: string;
  description: string;
  color: "yellow" | "blue" | "red";
}) {
  return (
    <Card className={clsx("p-6 max-w-[350px] !gap-2", cardColor[color])}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
