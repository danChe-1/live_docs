"use client";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumetUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUser = await getDocumetUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });
      }}
      authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};
export default Provider;

