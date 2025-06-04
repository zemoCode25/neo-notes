export default function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-600 text-sm">{message}</p>;
}
