import Image from "next/image";
import logoGif from "/public/blasttoonco-logo.gif";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center overflow-hidden rounded border ring-2 ring-yellow-blast/30 border-yellow-blast/60">
        <Image
          src={logoGif}
          width={300}
          height={300}
          alt="Blast Toon Co."
          className="size-[300px]"
        />
        <div className="w-full max-w-[300px] flex flex-col gap-2 p-4">
          <p className="text-sm">Total supply: 777</p>
          <p className="text-sm">Minting from: 0.007 ETH</p>
        </div>
        <Link
          href="https://blastr.xyz/blastoonpass"
          target="_blank"
          className="w-full py-3 px-4 text-sm text-center font-bold bg-yellow-blast text-yellow-950 hover:bg-yellow-blast/70 transition-colors duration-200"
        >
          Mint now
        </Link>
      </div>
    </div>
  );
}
