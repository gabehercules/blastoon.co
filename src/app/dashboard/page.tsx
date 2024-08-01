import "@/styles/dashboard.css";

import blastoonTemp from "/public/blastoon-760_temp.webp";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      {/* profile info */}
      <div className="dashboard-main flex flex-col space-y-4">
        {/* profile header */}
        <div className="flex gap-3">
          {/* profile pic */}
          <div className="size-52 rounded-xl overflow-hidden">
            <Image
              src={blastoonTemp}
              width={300}
              height={300}
              alt="Profile pic for some one"
              className="w-full h-auto"
            />
          </div>

          {/* user details */}
          <div className="flex-1 flex gap-4 divide-x divide-white/20 bg-white/10">
            {/* --- */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-white text-xl font-bold">0x...54dc8</h1>
                <span className="text-white text-sm">aka: Zneider.eth</span>
              </div>
              <p className="text-white text-sm">Joined: 2021</p>
              <p className="text-white text-sm">Location: Earth</p>
              <p className="text-white text-sm">Bio: Some bio here</p>
            </div>
            {/* --- */}
            <div className="w-[20%] max-w-52 bg-white/10">
              <span>$CHEESE 56.500</span>
              <button>Buy $CHEESE</button>
            </div>
          </div>
        </div>

        {/* prfile tabs */}
        <div className="bg-white/10 p-3">
          <ul className="flex gap-3">
            <li className="text-white">Profile</li>
            <li className="text-white">Collection</li>
            <li className="text-white">Achievements</li>
            <li className="text-white">My NFTs</li>
          </ul>
        </div>

        {/* some content */}
        <div className="flex-1 bg-white/10 p-3">some content here</div>
      </div>

      <div className="dashboard-sidebar bg-white/10"></div>
    </div>
  );
}
