import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useAnimatedYears = (start: number, end: number) => {
    const startRef = useRef<HTMLSpanElement>(null);
    const endRef = useRef<HTMLSpanElement>(null);

    // Запоминаем предыдущее значение
    const prevStart = useRef(start);
    const prevEnd = useRef(end);

    useEffect(() => {
        if (!startRef.current || !endRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Анимируем от предыдущего значения к новому
            tl.fromTo(
                startRef.current,
                { textContent: prevStart.current },
                {
                    textContent: start,
                    duration: 1,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                },
            );

            tl.fromTo(
                endRef.current,
                { textContent: prevEnd.current },
                {
                    textContent: end,
                    duration: 1,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                },
                "<",
            );

            // Обновляем предыдущие значения
            prevStart.current = start;
            prevEnd.current = end;
        });

        return () => ctx.revert();
    }, [start, end]);

    return { startRef, endRef };
};
