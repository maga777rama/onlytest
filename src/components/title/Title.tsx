import React from "react";
import * as styles from "./Title.module.scss";
import AccentLine from "~public/staticFiles/accentLine.svg";
export const Title = () => {
    return (
        <div className={styles.titleBlock}>
            {__PLATFORM__ === "desktop" && <AccentLine />}
            <span className={styles.title}>Исторические даты</span>
        </div>
    );
};
