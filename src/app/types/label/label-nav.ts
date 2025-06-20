import { TLabel } from "./label";
import { LucideProps } from "lucide-react";

export type TLabelNav = TLabel & {
  readonly id: number;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
