import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        src={"/blastoon-co.jpg"}
        width={250}
        height={250}
        alt="Blastoon Logo"
        className="w-[30px] rounded"
      />
      <div className="text font-semibold">Blast Toon Co.</div>
      <div className="text-[10px] font-bold bg-brand-yellow text-yellow-950 px-[3px] py-[2px] border border-yellow-600 rounded">
        ALPHA
      </div>
    </Link>
  );
}
