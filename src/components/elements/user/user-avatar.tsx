import Image, { StaticImageData } from "next/image";

export default function UserAvatar({ address }: { address: string }) {
  return (
    <Image
      src={`https://api.multiavatar.com/${address}.png`}
      width={512}
      height={512}
      alt={"Image"}
      className="w-full h-auto"
    />
  );
}
