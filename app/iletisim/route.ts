import { NextResponse } from "next/server";

export function GET(request: Request) {
  const target = new URL("/tr#contact", request.url);
  const response = NextResponse.redirect(target, 301);
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}
