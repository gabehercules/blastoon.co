export default function Profile() {
  return (
    <div>
      <div className="relative h-[264px] flex items-center justify-center bg-gray-foreground mb-10 border border-border-gray rounded-lg">
        bg cover
        <div className="absolute -bottom-10 left-4 size-[126px] flex items-center justify-center text-sm rounded-full border border-border-gray bg-gray-background">
          <span>user avatar</span>
        </div>
      </div>
      <div>
        <span>address</span>
      </div>
      <div className="h-[1230px] bg-gray-foreground"></div>
    </div>
  );
}
