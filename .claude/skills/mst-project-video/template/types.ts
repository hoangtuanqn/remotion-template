import { z } from "zod";

export const topicVideoSchema = z.object({
  channelName: z.string(),
});
