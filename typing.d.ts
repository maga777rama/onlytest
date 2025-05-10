declare module "*.scss" {
    interface IClassModule {
        [classname: string]: string;
    }

    const className: IClassModule;
    export = className;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";

declare module "*.svg" {
    import { FC, SVGProps } from "react";
    const content: FC<SVGProps<SVGElement>>;
    export default content;
}

declare const __PLATFORM__: "mobile" | "desktop";

declare module "*.json" {
    const value: any;
    export default value;
}
