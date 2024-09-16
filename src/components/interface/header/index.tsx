"use client";

import { BsThreeDots } from "react-icons/bs";

export default function Header() {
  return (
    <div className="header flex items-center justify-end gap-6 px-6 bg-gray-foreground border-b border-white/10">
      <button className="p-1 rounded border border-b-2 border-border-gray">
        <BsThreeDots size={14} />
      </button>
    </div>
  );
}
