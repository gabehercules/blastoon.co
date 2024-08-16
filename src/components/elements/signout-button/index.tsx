"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function SignoutButton({ children }: ConnectButtonProps) {
  const router = useRouter();
  const handleDisconnect = () => {
    signOut();

    router.push("/login");
  };

  return (
    <button
      className={`w-[150px] flex items-center justify-center px-4 py-1 rounded-lg border border-b-[3px] border-yellow-200/60 text-sm font-semibold bg-gradient-to-tr from-brand-yellow from-10% to-yellow-600 to-90% text-yellow-950 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={handleDisconnect}
    >
      {children}
    </button>
  );
}
