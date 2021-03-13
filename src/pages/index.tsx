import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Covid19 Tracker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout title="Covid19 Tracker">
                <main className={styles.main}>Main</main>

                <footer className={styles.footer}>Footer</footer>
            </Layout>
        </div>
    );
}
