import Image from "next/image";
import commonPack from "/public/pack-common.png";
import rarePack from "/public/pack-rare.png";
import epicPack from "/public/pack-epic.png";
import cheeseCoinIcon from "/public/cheese-coin.png";
import superCheese from "/public/super-cheese.png";

import { FaEthereum } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PackItem() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-6 sm:flex-col sm:pb-6">
        {/* -- */}
        <div className="flex flex-col items-center rounded-lg">
          <div>
            <span className="flex font-nicesugar text-lg mb-4">
              Common Pack
            </span>
          </div>
          <Image
            src={commonPack}
            height={400}
            width={300}
            alt="Image for the pack"
            className="max-w-[280px] w-auto h-auto"
          />

          <div className="w-full p-3">
            <div className="flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipTrigger className="cheese-common-btn  opacity-70">
                  <Image
                    src={cheeseCoinIcon}
                    width={28}
                    height={28}
                    alt="Cheese Coin"
                  />
                  20.000
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-nicesugar text-lg">SOON</p>
                </TooltipContent>
              </Tooltip>

              <button className="btn" disabled>
                <FaEthereum size={18} />
                0.007
              </button>
            </div>
          </div>
        </div>

        {/* --- */}

        <div className="flex flex-col items-center rounded-lg">
          <div>
            <span className="flex font-nicesugar text-lg mb-4">Rare Pack</span>
          </div>
          <Image
            src={rarePack}
            height={400}
            width={300}
            alt="Image for the pack"
            className="max-w-[280px] w-auto h-auto"
          />

          <div className="w-full p-3">
            <div className="flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipTrigger className="cheese-rare-btn opacity-70">
                  <Image
                    src={superCheese}
                    width={28}
                    height={28}
                    alt="Cheese Coin"
                  />
                  30.000
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-nicesugar text-lg">SOON</p>
                </TooltipContent>
              </Tooltip>

              <button className="btn" disabled>
                <FaEthereum size={18} />
                0.014
              </button>
            </div>
          </div>
        </div>

        {/* --- */}

        <div className="flex flex-col items-center rounded-lg">
          <div>
            <span className="flex font-nicesugar text-lg mb-4">Epic Pack</span>
          </div>
          <Image
            src={epicPack}
            height={400}
            width={300}
            alt="Image for the pack"
            className="max-w-[280px] w-auto h-auto"
          />

          <div className="w-full p-3">
            <div className="flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipTrigger className="cheese-epic-btn opacity-70">
                  <Image
                    src={superCheese}
                    width={28}
                    height={28}
                    alt="Cheese Coin"
                  />
                  50.000
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-nicesugar text-lg">SOON</p>
                </TooltipContent>
              </Tooltip>

              <button className="btn" disabled>
                <FaEthereum size={18} />
                0.022
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
