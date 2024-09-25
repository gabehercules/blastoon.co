import Image from "next/image";

import packRare from "/public/pack-epic.png";
import superCheeseIcon from "/public/super-cheese.png";
import ethIcon from "/public/eth-icon.png";

export default function MarketplaceSideview() {
  return (
    <div className="product-info flex flex-col flex-1 bg-gray-foreground border border-border-gray rounded-lg overflow-hidden">
      <div className="bg-black/50 border-b border-border-gray">
        <Image
          src={packRare}
          width={300}
          height={300}
          alt="Image Card Pack"
          className="p-6 m-auto"
        />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold">Details</h2>
        <p>
          The Rare Pack has a chance to contain at least 2 rare cards. In
          addition has a chance of 15% to contain 1 epic card...
        </p>
      </div>
      <div className="p-4">
        <form>
          <div className="flex border border-border-gray rounded-xl mb-4 divide-x divide divide-border-gray">
            <button className="flex items-center justify-center w-[46px] p-3">
              -
            </button>
            <input
              type="text"
              className="flex-1 p-3 bg-gray-background focus-visible:outline-none font-bold text-center"
              readOnly
              value={"01"}
            />
            <button className="flex items-center justify-center w-[46px] p-3">
              +
            </button>
          </div>

          {/* button division */}
          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-green/20 border-2 border-brand-green">
              Buy with Super Cheese
              <span className="flex items-center gap-2 text-brand-green">
                <Image
                  src={superCheeseIcon}
                  width={18}
                  height={18}
                  alt="cheese icon"
                />
                55,000
              </span>
            </button>

            {/* button division */}
            <button className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-[#627EEA]/20 border-2 border-[#627EEA]">
              <div className="flex items-center gap-2">
                Buy with ETH{" "}
                <span className="bg-[#627EEA] text-xs font-normal rounded py-[2px] px-1">
                  soon
                </span>
              </div>
              <span className="flex items-center gap-2 text-[#627EEA]">
                <Image src={ethIcon} width={18} height={18} alt="cheese icon" />
                0,0014
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
