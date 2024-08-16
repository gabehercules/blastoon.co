import Image, { StaticImageData } from "next/image";

export default function UserAvatar({ address }: { address: string }) {
  return (
    <Image
      src={`https://avatar.vercel.sh/${address}.svg`}
      width={512}
      height={512}
      alt={"Image"}
      className="w-full h-auto"
    />
  );
}
