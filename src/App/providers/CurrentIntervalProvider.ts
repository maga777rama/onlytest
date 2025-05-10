import React, { createContext } from "react";

interface IContextProps {
    curInt: number;
    setCurInt: React.Dispatch<React.SetStateAction<number>>;
}

export const CurrentIntervalProvider = createContext<IContextProps | null>(
    null,
);
