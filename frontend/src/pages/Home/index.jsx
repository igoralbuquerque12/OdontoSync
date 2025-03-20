import styles from './Home.module.css';

import Header from '../../components/Header';

function Home() {
    return (
        <>
            <Header />
            <h1 className={styles}>Home</h1>
        </>
    )
}

export default Home;