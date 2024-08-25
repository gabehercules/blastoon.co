import CardPacks from "@/components/elements/pack-item";
import Link from "next/link";
import { BiLogoDiscordAlt } from "react-icons/bi";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-6 gap-12 overflow-y-auto sm:justify-start sm:py-4">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="font-nicesugar font-bold text-5xl text-center md:text-4xl sm:text-3xl sm:px-6 sm:leading-tight">
          The war for{" "}
          <span className="inline-block text-brand-yellow">$CHEESE</span> is
          coming
        </h1>
        <div>
          <Link
            href="https://discord.gg/BM4Y5c6G9R"
            target="_blank"
            className="flex items-center gap-2 font-bold bg-brand-yellow text-yellow-950 px-4 py-2 rounded-lg"
          >
            <BiLogoDiscordAlt size={22} />
            Join our Discord
          </Link>
        </div>
      </div>
      <CardPacks />
    </div>
  );
}
