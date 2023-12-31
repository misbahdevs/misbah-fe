import NextAuthConfiguration from "@/shared/config/NextAuth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import CustomSessionProvider from "@/shared/context/CustomSession";
import DashboardTemplate from "@/components/DashboardTemplate";

const ApplicationLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(NextAuthConfiguration);
  return (
    <ErrorBoundary fallback={<Error />}>
      {session && (
        <CustomSessionProvider session={session}>
          <DashboardTemplate>{children}</DashboardTemplate>
        </CustomSessionProvider>
      )}
    </ErrorBoundary>
  );
};

export default ApplicationLayout;
