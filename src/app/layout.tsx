"use client";

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
        <div className="w-screen h-screen flex mt-5 ml-5">
          <motion.div
            key={pathname}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 20, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full flex flex-col"
          >
            <Header />
            <div className="w2/4 mt-10">{children}</div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
