import Image from "next/image";
import packCard from "/public/card-pack.png";

import { BiCheese } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";

export default function CardPacks() {
  return (
    <div className="flex gap-6">
      {/* -- */}
      <div className="flex flex-col items-center rounded-lg overflow-hidden border border-white/20">
        <div className="flex items-start justify-center overflow-hidden p-3 border-b border-white/20">
          <Image
            src={packCard}
            height={600}
            width={400}
            alt="Image for the pack"
            className="w-[250px] h-auto"
          />
        </div>

        <div className="w-full p-3">
          <div>
            <span className="flex font-rowdies text-lg mb-4">Common Pack</span>
          </div>

          <div className="space-y-3">
            <button className="cheese-btn w-full">
              <BiCheese size={22} />
              30.000
            </button>

            <button className="btn w-full">
              <FaEthereum size={18} />
              FREE
            </button>
          </div>
        </div>
      </div>

      {/* --- */}

      <div className="flex flex-col items-center rounded-lg overflow-hidden border border-white/20">
        <div className="flex items-start justify-center overflow-hidden p-3 border-b border-white/20">
          <Image
            src={packCard}
            height={600}
            width={400}
            alt="Image for the pack"
            className="w-[250px] h-auto"
          />
        </div>

        <div className="w-full p-3">
          <div>
            <span className="flex font-rowdies text-lg mb-4">Rare Pack</span>
          </div>

          <div className="space-y-3">
            <button className="cheese-btn w-full">
              <BiCheese size={22} />
              40.000
            </button>

            <button className="btn w-full">
              <FaEthereum size={18} />
              0.014
            </button>
          </div>
        </div>
      </div>

      {/* --- */}

      <div className="flex flex-col items-center rounded-lg overflow-hidden border border-white/20">
        <div className="flex items-start justify-center overflow-hidden p-3 border-b border-white/20">
          <Image
            src={packCard}
            height={600}
            width={400}
            alt="Image for the pack"
            className="w-[250px] h-auto"
          />
        </div>

        <div className="w-full p-3">
          <div>
            <span className="flex font-rowdies text-lg mb-4">Epic Pack</span>
          </div>

          <div className="space-y-3">
            <button className="cheese-btn w-full">
              <BiCheese size={22} />
              50.000
            </button>

            <button className="btn w-full">
              <FaEthereum size={18} />
              0.022
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
