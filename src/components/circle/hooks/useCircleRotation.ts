import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CurrentIntervalProvider } from "@/App/providers/CurrentIntervalProvider";

export const useCircleRotation = (totalPoints: number) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const pointsRef = useRef<HTMLDivElement[]>([]);
    const { curInt, setCurInt } = useContext(CurrentIntervalProvider);

    const rotateCircle = (index: number) => {
        if (!circleRef.current) return;

        setCurInt(index);

        // текущий угол поворота
        const currentRotation = gsap.getProperty(
            circleRef.current,
            "rotate",
        ) as number;
        const targetAngle = (360 / totalPoints) * index;

        // нахъодим рахницу углов
        let delta = targetAngle - (currentRotation % 360);
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        // Останавливаем старые анимации
        gsap.killTweensOf(circleRef.current);
        gsap.killTweensOf(pointsRef.current);

        // вращаем круг
        gsap.to(circleRef.current, {
            rotate: `${currentRotation + delta}`,
            duration: 1,
            ease: "power2.inOut",
        });

        // чтобы цифры внутри кружочков правильно вращались
        pointsRef.current.forEach((el) => {
            gsap.to(el, {
                rotate: `-=${delta}`,
                duration: 1,
                ease: "power2.inOut",
            });
        });
    };

    useEffect(() => {
        rotateCircle(curInt);
    }, [curInt]);

    return { circleRef, pointsRef };
};
