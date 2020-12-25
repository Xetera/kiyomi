import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <nav className="bg-blueGray-900 flex justify-center items-center h-12">
      <ul className="grid gap-2 grid-flow-col">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>Memes</li>
      </ul>
    </nav>
  );
}
