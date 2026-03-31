"use client";

import dynamic from "next/dynamic";

// ssr:false must live in a Client Component — cannot be used in Server Components
const StarsCanvas = dynamic(() => import("./Stars"), { ssr: false });

export default function StarsClient() {
  return <StarsCanvas />;
}
