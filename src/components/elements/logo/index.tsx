import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"#"} className="flex items-center  gap-2">
      <Image
        src={"/blastoon-co.jpg"}
        width={250}
        height={250}
        alt="Blastoon Logo"
        className="w-[30px] rounded"
      />
      <div className="text-sm font-semibold">Blast Toon Co.</div>
    </Link>
  );
}
