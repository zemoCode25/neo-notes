import { LabelPageClient } from "./components/LabelPageClient";

export default async function LabelPage({
  params,
}: {
  params: Promise<{ labelID: string }>;
}) {
  const { labelID } = await params;
  return <LabelPageClient labelID={labelID} />;
}
