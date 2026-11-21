import { z } from "zod";

export const ponytailRepoSchema = z.object({ channelName: z.string() });
export type PonytailRepoProps = z.infer<typeof ponytailRepoSchema>;
