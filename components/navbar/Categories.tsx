"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "All Hotels",
    icon: IoDiamond,
    description: "Explore all premium stays",
  },
  {
    label: "Luxury Suites",
    icon: IoDiamond,
    description: "High-end suites with premium comfort",
  },
  {
    label: "Villas",
    icon: MdOutlineVilla,
    description: "Private villas with luxury amenities",
  },
  {
    label: "City Stays",
    icon: GiCastle,
    description: "Premium stays in top city locations",
  },
  {
    label: "Resorts",
    icon: TbBeach,
    description: "Relaxing resort-style properties",
  },
  {
    label: "Budget Luxury",
    icon: GiBarn,
    description: "Affordable stays with a luxury feel",
  },
];

function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const onScroll = () => {
    const currentScroll = window.scrollY;

    // Only hide if user scrolled significantly down
    if (currentScroll > lastScrollY && currentScroll > 100) {
      setShow(false);
    } else if (currentScroll < lastScrollY || currentScroll < 100) {
      setShow(true);
    }

    setLastScrollY(currentScroll);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [lastScrollY]);

  if (pathname !== "/") return null;

  return (
    <div
     className={`fixed top-[100px] z-[20] w-full bg-white shadow-md transition-all duration-500 ease-in-out ${
    show ? "translate-y-0 opacity-100" : "-translate-y-[100%] opacity-0 pointer-events-none"
  }`}
    >
      <Container>
        <div className="py-3 flex flex-row items-center justify-between overflow-x-auto gap-3">
          {categories.map((item) => (
            <div key={item.label} className="transition-transform duration-300 hover:scale-105">
              <CategoryBox
                icon={item.icon}
                label={item.label}
                selected={category === item.label}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Categories;
