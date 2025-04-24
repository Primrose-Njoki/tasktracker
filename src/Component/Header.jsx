import styles from './Header.module.css'
const Header =()=> {
    return (
        <header className={styles.header}>
    <h1>Task Tracker</h1>
    <p>Organize your life one task at a time</p>
    </header>
    )  
}
export default Header;
