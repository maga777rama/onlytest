import React, { useContext } from "react";
import * as styles from "./YearsBlock.module.scss";
import data from "~public/staticFiles/events.json";
import { CurrentIntervalProvider } from "@/App/providers/CurrentIntervalProvider";
import { useAnimatedYears } from "./hooks/useAnimatedYears";

export const YearsBlock = () => {
    const { curInt } = useContext(CurrentIntervalProvider);
    const start = data.dates[curInt].start;
    const end = data.dates[curInt].end;

    const { startRef, endRef } = useAnimatedYears(start, end);

    return (
        <div className={styles.container}>
            <span ref={startRef} className={styles.container__start}>
                {start}
            </span>
            <span ref={endRef} className={styles.container__end}>
                {end}
            </span>
        </div>
    );
};
