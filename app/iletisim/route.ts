import { NextResponse } from "next/server";

export function GET(request: Request) {
  const target = new URL("/tr#contact", request.url);
  return NextResponse.redirect(target, 301);
}
