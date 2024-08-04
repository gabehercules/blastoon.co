import Image, { StaticImageData } from "next/image";

export default function UserAvatar({
  avatarSrc,
}: {
  avatarSrc: StaticImageData;
}) {
  return (
    <Image
      src={avatarSrc}
      width={512}
      height={512}
      alt={"Image"}
      className="w-full h-auto"
    />
  );
}
