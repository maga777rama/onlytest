import * as styles from "../SwiperBlock.module.scss";

interface ISliderItem {
    year: number;
    event: string;
}

export const SwiperItem = ({ year, event }: ISliderItem) => {
    return (
        <div className={styles.item}>
            <h2>{year}</h2>
            <p>{event}</p>
        </div>
    );
};
