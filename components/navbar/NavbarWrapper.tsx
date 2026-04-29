"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { SafeUser } from "@/app/types";

type Props = {
  currentUser?: SafeUser | null;
};

const HIDE_NAVBAR_PATHS = [
  "/listings/",
  "/blog/",
   "/enquiry/",
  "/admin/",
];

export default function NavbarWrapper({ currentUser }: Props) {
  const pathname = usePathname();

  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some((path) =>
    pathname?.startsWith(path)
  );

  if (shouldHideNavbar) return null;

  return <Navbar currentUser={currentUser} />;
}