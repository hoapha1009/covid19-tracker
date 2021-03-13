import { GetServerSideProps } from "next";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Global from "../components/Global/Global";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ global, countries }) {
    return (
        <Layout title="Covid19 Tracker">
            <div className={styles.counts}>
                <Global global={global} />
                Found {countries.length} countries
            </div>

            <CountriesTable countries={countries} />
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
