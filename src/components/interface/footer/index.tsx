import Image from "next/image";
import blastrLogo from "/public/blastr.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer border-t border-white/10">
      <div className="h-full flex items-center gap-1 px-6">
        <span className="size-[5px] flex rounded-md bg-green-500 animate-pulse mr-1" />
        <div className="text-xs leading-none">Minting now on</div>
        <Link
          href="https://blastr.xyz/blastoonpass"
          target="_blank"
          rel="referrer"
          className="flex items-center gap-1 text-xs leading-none"
        >
          <Image
            src={blastrLogo}
            width={18}
            height={18}
            alt="Blastr Logo; All Rights Reseved to them."
            className="rounded"
          />
          Blastr
        </Link>
      </div>
    </div>
  );
}
