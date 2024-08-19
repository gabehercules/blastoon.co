import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        src={"/blastoon-logo.png"}
        width={250}
        height={250}
        alt="Blastoon Logo"
        className="w-[36px] rounded"
      />
      {/* <div className="text-lg font-rowdies">Blast Toon Co.</div> */}
      <div className="text-[10px] font-bold bg-brand-yellow text-yellow-950 px-[3px] py-[2px] rounded">
        ALPHA
      </div>
    </Link>
  );
}
