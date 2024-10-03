"use client";

import { BiSearch } from "react-icons/bi";
import { TbSlash } from "react-icons/tb";

export default function SearchForm() {
  return (
    <form className="h-full relative">
      <label htmlFor="search" className="relative">
        <BiSearch
          size={20}
          className="absolute z-10 top-0 left-4 text-brand-yellow"
        />
      </label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search something in the app..."
        className="h-full min-w-[320px] bg-gray-background border-r border-border-gray pl-10 pr-4 outline-none placeholder:text-neutral-600 focus-visible:ring-brand-yellow/40 focus-visible:ring-inset
        focus-visible:ring-2"
        autoComplete="off"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          alert("searching...");
        }}
        className="absolute z-10 right-4 top-3 text-brand-yellow p-1 rounded border border-b-2 border-border-gray hover:bg-gray-foreground hover:border-brand-yellow/50 transition-all duration-200"
      >
        <TbSlash size={16} />
      </button>
    </form>
  );
}
