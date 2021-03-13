import React, { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";
import {
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
} from "@material-ui/icons";

type Props = {
    countries: Countries[];
};

type Countries = {
    CountryCode: String;
    Country: String;
    Slug: String;
    NewConfirmed: Number;
    TotalConfirmed: Number;
    NewDeaths: Number;
    TotalDeaths: Number;
    NewRecovered: Number;
    TotalRecovered: Number;
};

const orderBy = (countries, value, direction) => {
    console.log("value", value);
    console.log("direction", direction);

    if (direction === "asc") {
        return [...countries].sort((a, b) => {
            return a[value] > b[value] ? 1 : -1;
        });
    }

    if (direction === "desc") {
        return [...countries].sort((a, b) => {
            return a[value] > b[value] ? -1 : 1;
        });
    }

    return [...countries];
};

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }

    if (direction === "asc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    }
};

const CountriesTable: React.FC<Props> = ({ countries }) => {
    const [direction, setDirection] = useState<string>();
    const [value, setValue] = useState<string>();

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    };

    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_id}>
                    <div>ID</div>
                </button>
                <button
                    onClick={() => setValueAndDirection("code")}
                    className={styles.heading_code}
                >
                    <div>Country Code</div>
                    {value === "code" && <SortArrow direction={direction} />}
                </button>
                <button
                    onClick={() => setValueAndDirection("country")}
                    className={styles.heading_country}
                >
                    <div>Country</div>
                    {value === "country" && <SortArrow direction={direction} />}
                </button>
                <button
                    onClick={() => setValueAndDirection("slug")}
                    className={styles.heading_slug}
                >
                    <div>Slug</div>
                    {value === "slug" && <SortArrow direction={direction} />}
                </button>
                <button
                    onClick={() => setValueAndDirection("NewConfirmed")}
                    className={styles.heading_number}
                >
                    <div>New confirmed</div>
                    {value === "NewConfirmed" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
                <button
                    onClick={() => setValueAndDirection("TotalConfirmed")}
                    className={styles.heading_number}
                >
                    <div>Total confirmed</div>
                    {value === "TotalConfirmed" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
                <button
                    onClick={() => setValueAndDirection("NewDeaths")}
                    className={styles.heading_number}
                >
                    <div>New deaths</div>
                    {value === "NewDeaths" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
                <button
                    onClick={() => setValueAndDirection("TotalDeaths")}
                    className={styles.heading_number}
                >
                    <div>Total deaths</div>
                    {value === "TotalDeaths" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
                <button
                    onClick={() => setValueAndDirection("NewRecovered")}
                    className={styles.heading_number}
                >
                    <div>New recovered</div>
                    {value === "NewRecovered" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
                <button
                    onClick={() => setValueAndDirection("TotalRecovered")}
                    className={styles.heading_number}
                >
                    <div>Total recovered</div>
                    {value === "TotalRecovered" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
            </div>

            {orderedCountries.map((c, index) => {
                return (
                    <Link
                        key={index}
                        href="/country/[id]"
                        as={`/country/${c.CountryCode}`}
                    >
                        <a>
                            <div className={styles.row}>
                                <div className={styles.id}>{index + 1}</div>
                                <div className={styles.code}>
                                    <div>{c.CountryCode}</div>
                                </div>
                                <div className={styles.country}>
                                    <div>{c.Country}</div>
                                </div>
                                <div className={styles.slug}>
                                    <div>{c.Slug}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.NewConfirmed}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.TotalConfirmed}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.NewDeaths}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.TotalDeaths}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.NewRecovered}</div>
                                </div>
                                <div className={styles.number}>
                                    <div>{c.TotalRecovered}</div>
                                </div>
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

export default CountriesTable;
