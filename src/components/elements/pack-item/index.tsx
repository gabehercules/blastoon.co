import Image from "next/image";
import commonPack from "/public/pack-common.png";
import rarePack from "/public/pack-rare.png";
import epicPack from "/public/pack-epic.png";
import cheeseCoinIcon from "/public/cheese-coin.png";
import cheeseTokenIcon from "/public/cheese-token.png";

import { BiCheese } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";

export default function CardPacks() {
  return (
    <div className="flex gap-6">
      {/* -- */}
      <div className="flex flex-col items-center rounded-lg">
        <div>
          <span className="flex font-rowdies text-lg mb-4">Common Pack</span>
        </div>
        <Image
          src={commonPack}
          height={600}
          width={400}
          alt="Image for the pack"
          className=""
        />

        <div className="w-full p-3">
          <div className="flex items-center justify-center gap-2">
            <button className="cheese-common-btn">
              <Image
                src={cheeseCoinIcon}
                width={28}
                height={28}
                alt="Cheese Coin"
              />
              30.000
            </button>

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
          <span className="flex font-rowdies text-lg mb-4">Rare Pack</span>
        </div>
        <Image
          src={rarePack}
          height={600}
          width={400}
          alt="Image for the pack"
          className=""
        />

        <div className="w-full p-3">
          <div className="flex items-center justify-center gap-2">
            <button className="cheese-rare-btn">
              <Image
                src={cheeseTokenIcon}
                width={28}
                height={28}
                alt="Cheese Coin"
              />
              40.000
            </button>

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
          <span className="flex font-rowdies text-lg mb-4">Epic Pack</span>
        </div>
        <Image
          src={epicPack}
          height={600}
          width={400}
          alt="Image for the pack"
          className=""
        />

        <div className="w-full p-3">
          <div className="flex items-center justify-center gap-2">
            <button className="cheese-epic-btn">
              <Image
                src={cheeseTokenIcon}
                width={28}
                height={28}
                alt="Cheese Coin"
              />
              50.000
            </button>

            <button className="btn" disabled>
              <FaEthereum size={18} />
              0.022
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
