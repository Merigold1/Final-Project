import { react } from 'react';
import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'

export const NEWS_REDUCER_CASES = {
    INSERT_NEWS: "INSERT_NEWS",
    FETCHING_NEWS: "FETCHING_NEWS",
    DONE_FETCHING_NEWS: "DONE_FETCHING_NEWS",
    SAVE_NEWS: "SAVE_NEWS",
    UNSAVE_NEWS: 'UNSAVE_NEWS'
};

const newsState = {
    news: [],
    savedNews: [],
    isPending: false,
};

function newsReducer(state = newsState, action) {
    switch (action.type) {
        case NEWS_REDUCER_CASES.INSERT_NEWS: {
            return {
                ...state,
                news: action.news,
                isPending: false
            };
        }
        case NEWS_REDUCER_CASES.FETCHING_NEWS: {
            return {
                ...state,
                isPending: true
            };
        }
        case NEWS_REDUCER_CASES.DONE_FETCHING_NEWS: {
            return {
                ...state,
                isPending: false
            };
        }
        case NEWS_REDUCER_CASES.SAVE_NEWS: {
            const savedNews = [...state.savedNews, action.news]
            return {
                ...state,
                savedNews: savedNews
            };
        }
        case NEWS_REDUCER_CASES.UNSAVE_NEWS: {
            return {
                ...state,
                savedNews: state.savedNews.filter(news => news._id !== action.newsId),
            }
        }
        default:
            return state;


    }
}

const store = createStore(newsReducer, applyMiddleware(thunk))

export default store