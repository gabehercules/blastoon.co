import Image from "next/image";

interface UserNFTsSectionProps {
  nfts: any[]; // make type more specific
}

export default function UserNFTsSection({ nfts }: UserNFTsSectionProps) {
  return (
    <div className="flex-1 flex flex-col bg-white/10 p-3 overflow-hidden">
      <h1>My NFTs</h1>
      <div className="overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {nfts.map((item: any) => (
            <li
              key={item.token_id}
              className="flex items-center gap-3 p-3 border rounded-lg border-white/10 bg-black/60"
            >
              <Image
                src={`https://bafybeifa5dknjd7t7drkvjywu2voihxta67zcr75ugw5erqipktucc3xty.ipfs.4everland.io/${item.token_id}.png`}
                width={36}
                height={36}
                alt={`Image for token ${item.token_id}`}
                className="rounded"
              />
              <p>Contract name: {item.contract_name}</p>
              <p>Token ID: {item.token_id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
