export type TNavLink = {
  readonly id: number;
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
};
