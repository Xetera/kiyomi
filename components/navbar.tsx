import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import BetterLink from "./nextjs/link";
import Image from "next/image";

function NavLink({ children, href, as = undefined }) {
  return (
    <BetterLink href={href} as={as}>
      <a className="text-blueGray-600 hover:text-blueGray-400 font-semibold flex">
        {children}
      </a>
    </BetterLink>
  );
}

export function Navbar() {
  const [session, signedIn] = useSession();
  return (
    <nav className="bg-blueGray-900 items-center mx-auto border-b-2 border-theme-light w-full">
      <div className="justify-between flex max-w-7xl mx-auto items-center py-4 px-4 h-15">
        <div>
          <ul className="grid gap-12 grid-flow-col max-w-6xl ">
            <NavLink href={"/"}>
              <a>Home</a>
            </NavLink>
            <a href={"/sharex"}>Sharex</a>
            {signedIn && <NavLink href={"/profile"}>Profile</NavLink>}
          </ul>
        </div>
        <div>
          <ul>
            {session && (
              <NavLink href="/profile">
                <Image
                  className="rounded-full m-0"
                  height="35px"
                  width="35px"
                  src={session.user.image}
                />
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
