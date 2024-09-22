import CheeseBalance from "./cheese-balance";
import PlayerLevelAndXp from "./level-xp";
// import Notifications from "./notifications";
// import SearchForm from "./search-form";
import SuperCheeseBalance from "./supercheese-balance";

export default function Topbar() {
  return (
    <div className="topbar flex items-center divide-x divide-border-gray border-b border-border-gray">
      <PlayerLevelAndXp />
      <CheeseBalance />
      <SuperCheeseBalance />
      <div className="flex-1 h-full" />
      {/* <Notifications />
      <SearchForm /> */}
    </div>
  );
}
