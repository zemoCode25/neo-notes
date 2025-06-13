import { useRouter, useSearchParams } from "next/navigation";
export function HandleClick(id: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set("id", id.toString());
  router.push(`?${params.toString()}`);
}
