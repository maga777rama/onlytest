import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";
    console.log(options.platform);

    const svgrLoader = {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
    };
    const svgrLoader1 = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
    };

    const assetsLoader = {
        test: /\.(jpg|png)/,
        use: {
            loader: "url-loader",
            options: {
                limit: 50000,
            },
        },
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
        ],
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: isDev
                            ? "[path][name]__[local]"
                            : "[hash:base64:8]",
                    },
                },
            },
            // "sass-loader",
            {
                loader: "sass-loader",
                options: {
                    additionalData: `$PLATFORM: ${JSON.stringify(options.platform || "mobile")};`,
                },
            },
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
        },
    };

    return [
        assetsLoader,
        cssLoader,
        scssLoader,
        tsLoader,
        svgrLoader,
        svgrLoader1,
    ];
}
