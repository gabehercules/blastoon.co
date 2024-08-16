import Image from "next/image";
import blastrLogo from "/public/blast-logo-yellow.png";
import Link from "next/link";
import { BsDiscord, BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="footer flex items-center justify-between border-t border-white/10">
      <div className="h-full flex items-center gap-1 px-6">
        <span className="size-[5px] flex rounded-md bg-green-500 animate-pulse mr-1" />
        <div className="text-xs leading-none">Built on</div>
        <Link
          href="https://blast.io/"
          target="_blank"
          rel="referrer"
          className="flex items-center gap-1 text-xs leading-none"
        >
          <Image
            src={blastrLogo}
            width={50}
            height={20}
            alt="Blastr Logo; All Rights Reseved to them."
            className="rounded"
          />
        </Link>
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          {new Date().getFullYear()} Part of Blast Toon Co.
        </p>
      </div>

      <ul className="flex items-center gap-4 px-6">
        <li>
          <a href="https://discord.gg/BM4Y5c6G9R" target="_blank">
            <BsDiscord size={16} />
          </a>
        </li>
        <li>
          <a href="https://x.com/BlastToonCo" target="_blank">
            <BsTwitterX size={14} />
          </a>
        </li>
      </ul>
    </div>
  );
}
