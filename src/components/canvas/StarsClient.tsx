"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ssr:false must live in a Client Component — cannot be used in Server Components
const StarsCanvas = dynamic(() => import("./Stars"), { ssr: false });

export default function StarsClient() {
  const [mounted, setMounted] = useState(false);

  // Defer Three.js/WebGL until the browser is idle so it doesn't block
  // the main thread during the critical rendering path (reduces TBT).
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setMounted(true), 1500);
      return () => clearTimeout(id);
    }
  }, []);

  return mounted ? <StarsCanvas /> : null;
}
