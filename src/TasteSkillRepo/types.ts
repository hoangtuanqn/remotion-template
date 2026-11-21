import { z } from "zod";

export const tasteSkillRepoSchema = z.object({ channelName: z.string() });
export type TasteSkillRepoProps = z.infer<typeof tasteSkillRepoSchema>;
