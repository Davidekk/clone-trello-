import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({ src: "../../public/fonts/font.woff2" });
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Page = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div
        className={cn(
          " flex flex-col items-center justify-center",
          headingFont.className
        )}
      >
        <div className="mb-5 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-500 shadow-sm">
          <Medal h-6 w-6 mr-2 />
          No 1 task management app
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Taskify helps teams move
        </h1>
        <div className="mt-2 w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-4 text-3xl text-white shadow-sm md:text-6xl">
          work forward
        </div>
      </div>
      <div
        className={cn(
          "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl",
          textFont.className
        )}
      >
        Collaborate, manage project, and react new productivity peaks.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up"> Get Taskify for free</Link>
      </Button>
    </div>
  );
};

export default Page;
