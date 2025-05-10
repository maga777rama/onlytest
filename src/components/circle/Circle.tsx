import * as styles from "./Circle.module.scss";
import { useCircleRotation } from "./hooks/useCircleRotation";
import { calculatePointCoordinates } from "./hooks/useCalculatePointCoordinates";
import { CurrentIntervalProvider } from "@/App/providers/CurrentIntervalProvider";
import dataJson from "~public/staticFiles/events.json";
import { EventsData, DateEntry } from "./types";

const data = dataJson as EventsData;
import { useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
export const Circle = () => {
    const { curInt, setCurInt } = useContext(CurrentIntervalProvider);
    const totalPoints = data.dates.length;
    const { circleRef, pointsRef } = useCircleRotation(totalPoints);

    const catRef = useRef<HTMLSpanElement[]>([]); // NEW

    useEffect(() => {
        catRef.current.forEach((el, i) => {
            gsap.killTweensOf(el);
            if (i === curInt) {
                gsap.set(el, { autoAlpha: 0, x: 10 });
                gsap.to(el, {
                    autoAlpha: 1,
                    x: 0,
                    delay: 0.6,
                    duration: 0.3,
                    ease: "power3.out",
                });
            } else {
                gsap.set(el, { autoAlpha: 0 });
            }
        });
    }, [curInt]);

    return (
        <div className={styles.circle} ref={circleRef}>
            {data.dates.map((item: DateEntry, index: number) => {
                const { x, y } = calculatePointCoordinates(index, totalPoints);
                const isActive = curInt === index;

                return (
                    <div
                        key={item.id}
                        ref={(el) => {
                            if (el) pointsRef.current[index] = el;
                        }}
                        className={`${styles.wrapper} ${isActive ? styles.active : ""}`}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        onClick={() => setCurInt(index)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                setCurInt(index);
                        }}
                    >
                        <div className={styles.hitArea} />

                        <div className={styles.point}>
                            <span
                                className={styles.label}
                                data-number={index + 1}
                            />
                        </div>

                        {/* подпись категории */}
                        <span
                            ref={(el) => {
                                if (el) catRef.current[index] = el;
                            }}
                            className={styles.category}
                        >
                            {item.category}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
