"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Logo({}: Props) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
<Image
  src="/assets/logo.png"
  alt="logo"
  width={120}
  height={40}
  className="object-contain"
/>
    </div>
  );
}

export default Logo;
