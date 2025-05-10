import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildWebServer } from "./buildWebServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === "development";

    return {
        mode: options.mode ?? "development",
        entry: options.paths.entry,
        output: {
            filename: "bundle.js",
            path: options.paths.output,
            clean: true,
        },
        devtool: isDev ? "inline-source-map" : false,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),

        devServer: isDev ? buildWebServer(options) : undefined,
    };
}
