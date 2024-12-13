import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { NEWS_REDUCER_CASES } from '.';

const API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export function fetchNews(query) {
    return async function (dispatch) {
        try {
            dispatch({
                type: NEWS_REDUCER_CASES.FETCHING_NEWS,
            });
            const queryString = qs.stringify(
                {
                    ...query,
                    "api-key": import.meta.env.VITE_API_KEY,
                },
                { encode: true }
            )

            const response = await fetch(`${API_URL}${queryString}`)

            const responseJSON = await response.json()

            if (!response.ok) {
                throw new Error(JSON.stringify(responseJSON))
            }

            dispatch({
                type: NEWS_REDUCER_CASES.INSERT_NEWS,
                news: responseJSON.response.docs
            })

        } catch (error) {
            console.error("[actions-fetchNews]:", error);

        } finally {
            dispatch({
                type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS,
            })
        }
    }
}