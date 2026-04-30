import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import ToastContainerBar from "@/components/ToastContainerBar";
import LoginModal from "@/components/models/LoginModal";
import RegisterModal from "@/components/models/RegisterModal";
import RentModal from "@/components/models/RentModal";
import SearchModal from "@/components/models/SearchModal";
import Navbar from "@/components/navbar/Navbar";
import GoogleMapsProvider from "@/components/GoogleMapsProvider";
import ContactSupportModal from "../components/models/ContactSupportModal";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
// ✅ THE FIX — tells Next.js to always render at request time,
// never statically preload. Required whenever layout calls headers() /
// cookies() / getServerSession().
export const dynamic = "force-dynamic";

export const metadata = {
  title: "TripleOne",
  description: "TripleOne",
  icons:
    "https://img.icons8.com/?size=100&id=ZblEpxMTnnq4&format=png&color=000000",
};

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className={nunito.variable}>
      <head>
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Lato:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
</head>
      <body
        className="
          font-sans
          bg-zinc-200
          text-zinc-900
          min-h-screen
        "
      >
        <GoogleMapsProvider>
          {/* GLOBAL MODALS */}
          <ContactSupportModal />
          <ScrollToTop />

          <ClientOnly>
            <ToastContainerBar />
            <SearchModal />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <NavbarWrapper />
             {/* ✅ ADD CHAT HERE (IMPORTANT) */}
            <ChatWidget />
          </ClientOnly>

          {/* PAGE CONTENT */}
          <main>{children}</main>

          <Footer />
        </GoogleMapsProvider>
          <Toaster position="top-center" />
      </body>
    </html>
  );
}