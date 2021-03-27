import { useSession } from "next-auth/client";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import BetterLink from "./nextjs/link";
import Image from "next/image";

type AType = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type NavLinkProps = AType & {
  href: string;
  as?: string;
  hardLink?: boolean;
};

function NavLink({
  children,
  href,
  as = undefined,
  hardLink,
  ...rest
}: PropsWithChildren<NavLinkProps>) {
  const aProps: AType = {
    ...rest,
  };
  if (hardLink) {
    aProps.href = href;
  }
  const data = (
    <a
      className="text-trueGray-400 hover:text-trueGray-300 flex cursor-pointer"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );

  if (hardLink) return data;
  return (
    <BetterLink href={href} as={as}>
      {data}
    </BetterLink>
  );
}

export function Navbar() {
  const [session, signedIn] = useSession();
  return (
    <nav
      className="bg-theme items-center mx-auto border-b-2 border-theme-subtle w-full"
      style={{
        borderBottomWidth: "1px",
      }}
    >
      <div className="justify-between flex max-w-7xl mx-auto items-center py-4 px-4 h-15">
        <div>
          <ul className="grid gap-12 grid-flow-col max-w-6xl ">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink hardLink href="/sharex" target="_blank">
              Sharex
            </NavLink>
            {signedIn && <NavLink href={"/profile"}>Profile</NavLink>}
          </ul>
        </div>
        <div>
          <ul>
            {session && (
              <NavLink href="/profile">
                <p className="text-trueGray-300 mr-3">{session.user.name}</p>
                {session.user.image && (
                  <Image
                    className="rounded-full m-0"
                    height="25px"
                    width="25px"
                    src={session.user.image}
                  />
                )}
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
