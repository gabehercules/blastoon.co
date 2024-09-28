export default function Portals() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-4 flex flex-col items-center gap-3 rounded-lg bg-gray-foreground">
        <div className="text-center">
          <p className="text-sm text-neutral-200">We are working here!</p>
          <a href="#" className="text-sm text-neutral-400 underline">
            Check out our docs about Raids
          </a>
        </div>
        <div className="w-[300px] h-1 rounded overflow-hidden bg-brand-yellow/10">
          <div className="w-5/6 h-1 bg-brand-yellow" />
        </div>
      </div>
    </div>
  );
}
