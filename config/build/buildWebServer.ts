import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildWebServer(options: BuildOptions): DevServerConfiguration {
  return {
    open: true,
    port: options.port ?? 3000,
    hot: true,
  };
}
