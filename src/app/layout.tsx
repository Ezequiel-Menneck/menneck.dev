"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { Anaheim } from "next/font/google";
import { usePathname } from "next/navigation";
import "./global.css";

const afacadFlux = Anaheim({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="pt-BR" className={afacadFlux.className}>
      <head>
        <title>Menneck Dev</title>
        <link rel="shortcut icon" href="next.svg" type="image/x-icon" />
      </head>
      <body>
        <div className="w-screen h-screen">
          <motion.div
            key={pathname}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: 20, y: 20, opacity: 1 }}
            exit={{ x: -10, y: -10, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-screen h-screen flex flex-col items-center"
          >
            <Header />
            <div className="flex flex-col justify-center items-center max-w-4xl w-full">
              {children}
              <Footer />
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
