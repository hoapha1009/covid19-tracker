import React from "react";
import styles from "./Global.module.css";

type P = {
    global: {
        NewConfirmed: Number;
        TotalConfirmed: Number;
        NewDeaths: Number;
        TotalDeaths: Number;
        NewRecovered: Number;
        TotalRecovered: Number;
    };
};

const Global: React.FC<P> = ({ global }) => {
    return (
        <div className={styles.global}>
            <p className={styles.title}>Global:</p>
            <div className={styles.info}>
                <div className={styles.ele}>
                    New confirmed: {global.NewConfirmed}
                </div>
                <div className={styles.ele}>
                    Total confirmed: {global.TotalConfirmed}
                </div>
                <div className={styles.ele}>New deaths: {global.NewDeaths}</div>
                <div className={styles.ele}>
                    Total deaths: {global.TotalDeaths}
                </div>
                <div className={styles.ele}>
                    New recovered: {global.NewRecovered}
                </div>
                <div className={styles.ele}>
                    Total recovered: {global.TotalRecovered}
                </div>
            </div>
        </div>
    );
};

export default Global;
