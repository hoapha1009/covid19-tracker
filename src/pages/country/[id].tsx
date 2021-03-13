import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const getCovid19 = async (id) => {
    let dataCovid19 = {};
    try {
        const res = await fetch(`https://api.covid19api.com/country/${id}`);
        dataCovid19 = await res.json();
    } catch (error) {
        dataCovid19 = {
            TotalConfirmed: "?",
            NewConfirmed: "?",
            TotalDeaths: "?",
            NewDeaths: "?",
            TotalRecovered: "?",
            NewRecovered: "?",
        };
    }

    return dataCovid19;
};

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const dataCountry = await res.json();

    return dataCountry;
};

const Country = ({ country, covid19 }) => {
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map((border) => getCountry(border))
        );

        setBorders(borders);
    };

    useEffect(() => {
        getBorders();
    }, []);

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name}></img>

                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>
                            {country.region}
                        </div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>
                                    {country.population}
                                </div>
                                <div className={styles.overview_label}>
                                    Population
                                </div>
                            </div>

                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>
                                    {country.area}
                                </div>
                                <div className={styles.overview_label}>
                                    Area(km2)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>
                            Details
                        </h4>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Capital
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.capital}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Languages
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.languages
                                    .map(({ name }) => name)
                                    .join(", ")}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Total Confirmed
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.TotalConfirmed}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                New Confirmed
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.TotalConfirmed}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Total Deaths
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.TotalDeaths}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                New Deaths
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.NewDeaths}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Total Recovered
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.TotalRecovered}
                            </div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                New Recovered
                            </div>
                            <div className={styles.details_panel_value}>
                                {covid19.NewRecovered}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const country = await getCountry(params.id);
    const covid19 = await getCovid19(params.id);

    return {
        props: { country, covid19 },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let paths = [];
    try {
        const countries = await fetch("https://api.covid19api.com/summary", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((rs) => {
            return rs.json();
        });

        paths = countries.map((c) => ({
            params: { id: c.CountryCode },
        }));
    } catch (error) {}

    return {
        paths,
        fallback: false,
    };
};

export default Country;
