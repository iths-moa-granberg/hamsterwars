import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.root}>
            <nav>
                <div>
                    <Link to="/">
                        <span role="img" aria-label="hamster">🐹</span>
                        Hamsterwars
                    </Link>
                </div>
                <div>
                    <Link to="/battle/">Battle</Link>
                    <Link to="/stats/">Stats</Link>
                    <Link to="/upload/">Upload</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;