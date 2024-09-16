"use client";
import { TbBell } from "react-icons/tb";

export default function Notifications() {
  return (
    <button className="h-full text-brand-yellow hover:bg-brand-yellow/10 transition-all duration-200 p-3">
      <TbBell size={20} />
    </button>
  );
}
