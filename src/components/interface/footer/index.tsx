import Image from "next/image";
import blastrLogo from "/public/blast-logo-yellow.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer border-t border-white/10">
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
    </div>
  );
}
