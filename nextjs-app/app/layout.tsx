import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Jost, Kalnia } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Toaster } from "sonner";
import { cn } from "@/app/lib/utils"

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { SanityLive } from "@/sanity/lib/live";

import { handleError } from "./client-utils";


const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "600", "700"],
})

const kalnia= Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "The Green Grange",
  description: "The Green Grange is a beautifully restored 18th-century eco-friendly barn in Gyé-sur-Seine, Champagne. A cozy retreat with local charm and nature at your doorstep.",
};

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning className={cn(jost.variable, kalnia.variable, "min-h-screen bg-background antialiased")}>
      <body>
      
          <section className="min-h-screen bg-[#edf4ea]">
            {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
                <VisualEditing />
              </>
            )}
            {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
            <SanityLive onError={handleError} />
            <main className="mx-4 xl:mx-auto  mt-12 font-jost text-green-900 ">
            <Header />
              {children}
            <Footer />
            </main>
          </section>
          <SpeedInsights />
        
      </body>
    </html>
  );
}
