import { ConvexError, v } from "convex/values";

import { mutation, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
  userId: Id<"users">
) => {
  return await ctx.db
    .query("members")
    .withIndex("by_workspace_id_user_id", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", userId)
    )
    .unique();
};

export const create = mutation({
  args: {
    body: v.string(),
    image: v.optional(v.id("_storage")),
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    parentMessageId: v.optional(v.id("messages")),
    //TODO: add conversationId
  },
  handler: async (ctx, agrs) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError("Unauthorized");
    }

    const member = await getMember(ctx, agrs.workspaceId, userId);

    if (!member) {
      throw new ConvexError("Unauthorized");
    }

    //TODO: Handle conversationId

    const messageId = await ctx.db.insert("messages", {
      memberId: member._id,
      body: agrs.body,
      image: agrs.image,
      workspaceId: agrs.workspaceId,
      channelId: agrs.channelId,
      parentMessageId: agrs.parentMessageId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});
