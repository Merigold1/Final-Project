import { useState, useEffect } from 'react'
import styles from './CommonPageLayout.module.css'
import { fetchNews } from '../store/actions';
import { useSelector, useDispatch } from "react-redux";
import { NEWS_REDUCER_CASES } from '../store';
import { Navbar, NewsCard } from '../components';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function ProgrammingPage() {
    const [searchNews, setSearchNews] = useState('')
    const newsReducer = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const query = {
            q: 'Programming',
            fq: `news_desk:("Technology")`,
        }
        dispatch(fetchNews(query))
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
                const query ={
                    q: `${searchNews}`
                }
                dispatch(fetchNews(query))
                navigate(`/search/${searchNews}`)
            }}
            />
            <section className={styles.pageContainer}>
                <section>
                    <h1>Programming News</h1>
                </section>
                <section className={styles.newsContainer}>
                    {newsReducer.news.map((n, i) => {
                        const { headline, abstract, source, byline, web_url } = n
                        return (
                            <NewsCard
                                key={n._id}
                                headline={headline.main}
                                abstract={abstract}
                                source={source}
                                author={byline.original}
                                webUrl= {web_url}
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
                                isSaved={isNewsSaved(n)}

                            />
                        )
                    })}

                </section>
            </section>
        </>


    )
}

export default ProgrammingPage;