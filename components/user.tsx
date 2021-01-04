import React from "react";
import { RiHammerLine } from "react-icons/ri";
import Image from "next/image";

export function User({ user, bottom }) {
  return (
    <div className="flex flex-row align-top">
      <div style={{ maxHeight: "48px" }}>
        <Image
          src={user.image}
          width="48px"
          height="48px"
          className="rounded-full"
        />
      </div>
      <div className="ml-4">
        <p className="font-semibold mr-2 flex items-center">
          {user.name}
          <span data-tip="Staff member">
            <RiHammerLine className="ml-2" />
          </span>
        </p>
        {bottom}
      </div>
    </div>
  );
}
