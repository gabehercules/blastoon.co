import { acme } from "@/fonts";
import Link from "next/link";
import { BiLogoDiscordAlt } from "react-icons/bi";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-8 items-center">
        <h1 className={`font-rowdies font-bold text-6xl`}>
          The war for <span className="text-brand-yellow">$CHEESE</span> is
          coming
        </h1>
        <h4>
          Jump into our official Discord community and prepare yourself to
          conquer the Cheeselands
        </h4>
        <div>
          <Link
            href="https://discord.gg/BM4Y5c6G9R"
            target="_blank"
            className="flex items-center gap-2 bg-brand-yellow text-lg text-yellow-950 px-4 py-2 rounded-lg font-rowdies"
          >
            <BiLogoDiscordAlt size={22} />
            Join our Discord
          </Link>
        </div>
      </div>
    </div>
  );
}
