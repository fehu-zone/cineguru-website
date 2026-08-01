import { redirect } from "next/navigation";

export default async function RootPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const query = await searchParams;
  redirect(query.lang === "en" ? "/en" : "/tr");
}
