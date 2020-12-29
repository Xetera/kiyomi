import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function BetterLink({ href, children, as }) {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return (
    <Link href={href} as={as}>
      {React.cloneElement(children, { className })}
    </Link>
  );
}
