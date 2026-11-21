import { z } from "zod";

export const replayAttackSchema = z.object({ channelName: z.string() });
export type ReplayAttackProps = z.infer<typeof replayAttackSchema>;
