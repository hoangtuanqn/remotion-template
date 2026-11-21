// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';
import { watchCompositionDeletes } from "./scripts/composition-cleanup";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Chỉ chạy khi mở Studio: xóa composition trên giao diện sẽ xóa luôn file liên quan.
if (process.argv.includes("studio")) {
  watchCompositionDeletes();
}
