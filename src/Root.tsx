import "./index.css";
import { Composition } from "remotion";

import {
  PonytailRepo,
  ponytailRepoDuration,
} from "./PonytailRepo/PonytailRepo";
import { ponytailRepoSchema } from "./PonytailRepo/types";
import {
  TasteSkillRepo,
  tasteSkillRepoDuration,
} from "./TasteSkillRepo/TasteSkillRepo";
import { tasteSkillRepoSchema } from "./TasteSkillRepo/types";
import { ReplayAttack, replayAttackDuration } from "./ReplayAttack/ReplayAttack";
import { replayAttackSchema } from "./ReplayAttack/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TasteSkillRepo"
        component={TasteSkillRepo}
        durationInFrames={tasteSkillRepoDuration}
        fps={30}
        width={1080}
        height={1920}
        schema={tasteSkillRepoSchema}
        defaultProps={{ channelName: process.env.CHANNEL_NAME || "CƯỜNG IT" }}
      />
      <Composition
        id="ReplayAttack"
        component={ReplayAttack}
        durationInFrames={replayAttackDuration}
        fps={30}
        width={1080}
        height={1920}
        schema={replayAttackSchema}
        defaultProps={{ channelName: process.env.CHANNEL_NAME || "CƯỜNG IT" }}
      />
    </>
  );
};
