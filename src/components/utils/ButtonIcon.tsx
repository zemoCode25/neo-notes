import { Button } from "../ui/button";

// Usage example:
// <ButtonIcon className="bg-blue-500 text-white" onClick={() => console.log('Button clicked')}>
//   <SomeIconComponent />
// </ButtonIcon>
// This will render a button with the specified className and children, which can be an icon or text.
// This component can be used to create buttons with icons or any other content, styled with Tailwind CSS.
export function ButtonIcon({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`flex items-center justify-center ${className}`}
      type="button"
      {...props}
    >
      {children}
    </Button>
  );
}
