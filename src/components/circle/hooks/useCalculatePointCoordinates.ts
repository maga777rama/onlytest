// export const calculatePointCoordinates = (
//     index: number,
//     totalPoints: number,
// ) => {
//     console.log(totalPoints);
//     const angle = -(360 / totalPoints) * (index + 1);
//     const x = Math.cos((angle * Math.PI) / 180) * 266;
//     const y = Math.sin((angle * Math.PI) / 180) * 266;
//     return { x, y };
// };

export const calculatePointCoordinates = (
    index: number,
    totalPoints: number,
) => {
    const radius = 266;
    const initialAngle = -60; // смещение для первой вершины
    const angleStep = 360 / totalPoints;
    // для обхода по часовой стрелке вычитаем step, иначе — добавляйте
    const angle = initialAngle - angleStep * index;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    return { x, y };
};
