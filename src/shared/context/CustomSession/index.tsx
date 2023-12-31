"use client";
import { type ReactNode, useMemo } from "react";
import type { Session } from "next-auth";
import { CustomSessionContext } from "../context";

export default function CustomSessionProvider({
  session,
  children,
}: {
  session: Session | undefined;
  children: ReactNode;
}): ReactNode {
  const initialValue = useMemo(() => session, [session]);

  return (
    <CustomSessionContext.Provider value={initialValue}>{children}</CustomSessionContext.Provider>
  );
}
