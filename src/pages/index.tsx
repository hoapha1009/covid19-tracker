import { GetServerSideProps } from "next";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Global from "../components/Global/Global";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ global, countries }) {
    const [keyword, setKeyword] = useState<string>("");

    const filteredCountries = countries.filter((c) => {
        return (
            c.Country.toLowerCase().includes(keyword) ||
            c.CountryCode.toLowerCase().includes(keyword) ||
            c.Slug.toLowerCase().includes(keyword)
        );
    });

    const onHandleChangeSearch = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        e.preventDefault();

        setKeyword(e.currentTarget.value.toLowerCase());
    };

    return (
        <Layout title="Covid19 Tracker">
            <div className={styles.counts}>
                <Global global={global} />
                Found {countries.length} countries
            </div>

            <SearchInput
                onChange={onHandleChangeSearch}
                placeholder="Filter by Country name, Country code, Slug..."
            />

            <CountriesTable countries={filteredCountries} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await fetch("https://api.covid19api.com/summary", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((rs) => rs.json());

    return {
        props: {
            global: data.Global,
            countries: data.Countries,
        },
    };
};
