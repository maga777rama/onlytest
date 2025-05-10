import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useFadeAnimation = (dependency: any) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1,
                });
            },
        });
    }, [dependency]);

    return containerRef;
};
