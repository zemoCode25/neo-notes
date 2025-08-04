import { Card } from "../ui/card";
import clsx from "clsx";
import { TFeature } from "@/lib/features";

const cardColor = {
  yellow: "bg-yellow-50",
  blue: "bg-blue-50",
  red: "bg-red-50",
};

export default function FeaturesCard({
  title,
  description,
  color = "blue",
  icon: IconComponent,
}: TFeature) {
  return (
    <Card
      className={clsx("p-6 max-w-[420px] !gap-2 relative", cardColor[color])}
    >
      <span className="absolute top-[-16px] right-4 bg-violet-200 p-2 rounded-md border border-black">
        {<IconComponent />}
      </span>
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
