import React, { useContext } from "react";
import * as styles from "./NavBlock.module.scss";
import NavButtonDesktop from "~public/staticFiles/navButtonDesktop.svg";
import NavButtonMobile from "~public/staticFiles/navButtonMobile.svg";

import { CurrentIntervalProvider } from "@/App/providers/CurrentIntervalProvider";
import data from "~public/staticFiles/events.json";

const NavButton =
    __PLATFORM__ === "mobile" ? NavButtonMobile : NavButtonDesktop;

export const NavBlock = () => {
    const blockCount = data.dates.length;
    const { curInt, setCurInt } = useContext(CurrentIntervalProvider);

    const handleClick = (mode: string) => {
        mode === "prev" && setCurInt((prev) => prev - 1);
        mode === "next" && setCurInt((prev) => prev + 1);
    };
    return (
        // семантический контейнер для навигации
        <nav
            className={styles.navBlock}
            aria-label="Навигация по временным отрезкам"
        >
            <div className={styles.counter}>
                0{curInt + 1}/0{blockCount}
            </div>
            <div className={styles.buttons}>
                <button
                    type="button"
                    aria-label="Предыдущий отрезок"
                    disabled={curInt === 0}
                    onClick={() => setCurInt(curInt - 1)}
                >
                    <NavButton stroke="#42567A" strokeWidth={2} />
                </button>
                <button
                    type="button"
                    aria-label="Следующий отрезок"
                    disabled={curInt === blockCount - 1}
                    onClick={() => setCurInt(curInt + 1)}
                >
                    <NavButton stroke="#42567A" strokeWidth={2} />
                </button>
            </div>
        </nav>
    );
};
