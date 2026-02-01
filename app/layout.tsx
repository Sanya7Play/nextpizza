import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import {ClerkProvider} from "@clerk/nextjs";

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});
export const metadata: Metadata = {
    title: "Next Pizza",
    description: "Клон DODO Pizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	  <ClerkProvider>
		  <html lang="en">
			  <body className={`min-h-screen rounded-2xl ${nunito.variable} text-black`}>
			  	<Providers>{children}</Providers>
			  </body>
		  </html>
	  </ClerkProvider>

  );
}
