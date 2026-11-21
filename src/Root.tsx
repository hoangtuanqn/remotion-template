import "./index.css";
import { Composition } from "remotion";
import { DockerExplainer } from "./DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./DockerExplainer/types";
import {
  CitVoiceStudioRepo,
  citVoiceStudioRepoDuration,
} from "./CitVoiceStudioRepo/CitVoiceStudioRepo";
import { citVoiceStudioRepoSchema } from "./CitVoiceStudioRepo/types";
import { DevVsDevops, devVsDevopsDuration } from "./DevVsDevops/DevVsDevops";
import { devVsDevopsSchema } from "./DevVsDevops/types";
import {
  EmbedGoogleDriveVideo,
  embedGoogleDriveVideoDuration,
} from "./EmbedGoogleDriveVideo/EmbedGoogleDriveVideo";
import { embedGoogleDriveVideoSchema } from "./EmbedGoogleDriveVideo/types";

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
