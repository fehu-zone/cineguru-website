import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const query = await searchParams;
  if (query.lang === "en" || query.lang === "tr") {
    redirect(`/${query.lang}`);
  }

  const acceptLanguage = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  const prefersTurkish = /(^|,|-)tr(?:-|,|;|$)/.test(acceptLanguage);
  redirect(prefersTurkish ? "/tr" : "/en");
}
