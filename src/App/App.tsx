import * as styles from "@/App/styles/App.module.scss";
import {
    Circle,
    Lines,
    NavBlock,
    SwiperBlock,
    Title,
    YearsBlock,
    DividerLine,
} from "@/components";
import { CurrentIntervalProvider } from "@/App/providers/CurrentIntervalProvider";
import { useState } from "react";

export const App = () => {
    const [curInt, setCurInt] = useState<number>(0);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Title />
                {__PLATFORM__ === "desktop" && <Lines />}

                <CurrentIntervalProvider.Provider value={{ curInt, setCurInt }}>
                    {__PLATFORM__ === "desktop" && <Circle />}
                    <NavBlock />
                    {__PLATFORM__ === "mobile" && <DividerLine />}
                    <SwiperBlock />
                    <YearsBlock />
                </CurrentIntervalProvider.Provider>
            </div>
        </div>
    );
};
