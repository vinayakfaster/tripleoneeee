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
import Script from "next/script"; // ✅ NEW IMPORT

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TripleOne",
  description: "TripleOne",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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

        {/* ✅ GTM Snippet 1 — inside <head> */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WNSKGBVS');
            `,
          }}
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
        {/* ✅ GTM Snippet 2 — immediately after <body> tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WNSKGBVS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
