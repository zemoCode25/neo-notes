import Spinner from "../Spinner";

export default function GenerateLoading({ AIAction }: { AIAction: string }) {
  return (
    <div className="flex items-center justify-center">
      <span>{AIAction}</span>
      <Spinner />
    </div>
  );
}
