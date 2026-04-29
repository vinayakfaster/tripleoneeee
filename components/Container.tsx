"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean; // ✅ NEW — pass this to skip padding
};

function Container({ children, fullWidth }: Props) {
  if (fullWidth) {
    // Zero padding, truly full width — for Navbar hero
    return (
      <div className="w-full">
        {children}
      </div>
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
}

export default Container;