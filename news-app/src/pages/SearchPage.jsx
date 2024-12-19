import { useState, useEffect } from 'react'
import styles from './CommonPageLayout.module.css'
import { fetchNews } from '../store/actions';
import { useSelector, useDispatch } from "react-redux";
import { NEWS_REDUCER_CASES } from '../store';
import { Navbar, NewsCard } from '../components';
import { NavLink, Navigate, useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function HomePage() {
    const [searchNews, setSearchNews] = useState('')
    const newsReducer = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { query } = useParams()


    useEffect(() => {
        setSearchNews(searchNews)
    }, [])

    const isNewsSaved = (n) => {
        return newsReducer.savedNews.some((saved) => saved._id === n._id)
    }

    return (
        <>
            <Navbar onChange={(value) => {
                setSearchNews(value)
            }}

                onClick={() => {
                    const query = {
                        q: `${searchNews}`
                    }
                    dispatch(fetchNews(query))
                    navigate(`/search/${searchNews}`)
                }}
            />
            <section className={styles.pageContainer}>
                <section>
                    <h1>{query.charAt(0).toUpperCase() + query.slice(1) + ' News'}</h1>
                </section>
                <section className={styles.newsContainer}>
                    {newsReducer.news.map((n, i) => {
                        const isSaved = isNewsSaved(n)
                        const { headline, abstract, source, byline, web_url } = n
                        return (
                            <NewsCard
                                key={n._id}
                                headline={headline.main}
                                abstract={abstract}
                                source={source}
                                author={byline.original}
                                webUrl={web_url}
                                viewDetails={(webUrl) => {
                                    window.open(webUrl, '_blank')
                                }}
                                save={() => {
                                    dispatch({
                                        type: NEWS_REDUCER_CASES.SAVE_NEWS,
                                        news: n
                                    })
                                }}
                                unSave={() => {
                                    dispatch({
                                        type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
                                        newsId: n._id
                                    })
                                }}
                                isSaved={isSaved}

                            />
                        )
                    })}

                </section>
            </section>
        </>


    )
}

export default HomePage;