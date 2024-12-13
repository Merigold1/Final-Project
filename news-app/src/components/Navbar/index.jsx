import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'


function Navbar(props) {
    const links = [
        {
            title: 'Indonesia',
            path: '/'
        },
        {
            title: 'Programming',
            path: '/programming'
        },
        {
            title: 'COVID-19',
            path: '/covid-19'
        },
        {
            title: 'Saved News',
            path: '/saved'
        },
    ]
    return (
        <section className={styles.navbar}>
            <section className={styles.linksContainer}>
                {
                    links.map(l => {
                        return <NavLink className={((props) => {
                            return props.isActive ? styles.activeLink : styles.link
                        })} key={l.title} to={l.path} >
                            {l.title}
                        </NavLink>
                    })
                }
            </section>
            <div>
                <input
                    type="text"
                    placeholder='Search News'
                    className={styles.searchBarContainer}
                    onChange={e => { 
                        props.onChange(e.target.value)
                    }}
                />
                <button
                    onClick={() => { 
                        props.onClick()
                    }}
                    className={styles.searchBarBtn}
                >
                    Search
                </button>
            </div>
        </section>
    )
}

export { Navbar }