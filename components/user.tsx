import React from "react";
import { RiHammerLine } from "react-icons/ri";
import { Maybe, UserDataFragment } from "@/lib/__generated__/graphql";

export function User({
  user,
  bottom,
}: {
  user?: Maybe<UserDataFragment>;
  bottom: React.ReactElement;
}) {
  return (
    <div className="flex flex-row align-top">
      <div style={{ maxHeight: "48px" }}>
        {user?.avatar && (
          <img
            src={user.avatar}
            width="48px"
            height="48px"
            className="rounded-full"
          />
        )}
      </div>
      <div className="ml-4">
        <p className="font-semibold mr-2 flex items-center">
          {user?.name ?? <i>Unknown User</i>}
          <span data-tip="Staff member">
            <RiHammerLine className="ml-2" />
          </span>
        </p>
        {bottom}
      </div>
    </div>
  );
}
