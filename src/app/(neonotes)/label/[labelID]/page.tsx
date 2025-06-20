import React from "react";

export default async function LabelPage({
  params,
}: {
  params: Promise<{ labelID: string }>;
}) {
  const { labelID } = await params;
  return <div>{labelID}</div>;
}
