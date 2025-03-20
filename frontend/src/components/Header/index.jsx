import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <img src="/images/logo.png" alt="Logo" />
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/cadastro">Cadastrar Usuário</Link>
            </nav>
        </header>
    )
}

export default Header;