"use client";

import CheeseBalance from "./cheese-balance";
import Notifications from "./notifications";
import SearchForm from "./search-form";
import SuperCheeseBalance from "./supercheese-balance";

export default function Topbar() {
  return (
    <div className="topbar flex items-center divide-x divide-border-gray border-b border-border-gray">
      <CheeseBalance />
      <SuperCheeseBalance />
      <div className="flex-1 h-full" />
      <Notifications />
      <SearchForm />
    </div>
  );
}
