import type { Metadata } from "next";

import "./globals.css";
import {TodosProvider} from "@/store/todos";



export const metadata: Metadata = {
  title: "TO DO LIST",
  description: "TO DO List using next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <TodosProvider>
        {children}
      </TodosProvider>
      </body>
    </html>
  )
}
