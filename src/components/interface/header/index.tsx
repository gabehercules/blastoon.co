"use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { BsThreeDots } from "react-icons/bs";

export default function Header() {
  return (
    <div className="header flex items-center justify-end gap-6 px-6 bg-gray-foreground border-b border-white/10">
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="p-1 rounded border border-b-2 border-border-gray">
          <BsThreeDots size={14} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-gray-foreground border border-border-gray p-0"
        >
          <DropdownMenuLabel className="text-sm text-neutral-400">
            More content
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border-gray" />
          {headerNav.map((item, i) => (
            <DropdownMenuItem key={i} asChild={true}>
              <a
                href={item.href}
                className="text-sm rounded-none py-1 px-2 font-light text-neutral-200 cursor-pointer hover:bg-white/5 hover:text-neutral-100 focus:bg-white/5 focus:text-neutral-100"
              >
                {item.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}

const headerNav = [
  { label: "Docs", href: "https://docs.blasttoon.xyz" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
  { label: "Cookies", href: "/cookies" },
  { label: "Blog", href: "https://blog.blasttoon.xyz" },
];
