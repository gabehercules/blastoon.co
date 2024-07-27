import Logo from "@/components/elements/logo";

import { BsTwitterX } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

export default function Header() {
  return (
    <div className="header flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <ul className="flex items-center gap-4">
        <li>
          <a href="https://discord.gg/dUwBkgh2RS" target="_blank">
            <BsDiscord size={16} />
          </a>
        </li>
        <li>
          <a href="https://x.com/BlastToonCo" target="_blank">
            <BsTwitterX size={14} />
          </a>
        </li>
      </ul>
    </div>
  );
}
