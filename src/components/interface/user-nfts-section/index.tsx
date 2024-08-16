import Image from "next/image";

interface UserNFTsListProps {
  nfts: any[]; // make type more specific later
}

export default function UserNFTsList({ nfts }: UserNFTsListProps) {
  return (
    <ul className="grid grid-cols-6 gap-4 mr-2">
      {nfts.map((item: any) => (
        <li
          key={item.tokenId}
          className="flex flex-col rounded-lg border border-b-2 border-white/10 border-b-brand-yellow/20"
        >
          <Image
            src={`https://bafybeifa5dknjd7t7drkvjywu2voihxta67zcr75ugw5erqipktucc3xty.ipfs.4everland.io/${item.tokenId}.png`}
            width={256}
            height={256}
            alt={`Image for token ${item.tokenId}`}
            className="w-full h-auto rounded-t-lg"
          />
          <div className="p-3">
            <p className="font-rowdies text-sm">Blast Toon #{item.tokenId}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
