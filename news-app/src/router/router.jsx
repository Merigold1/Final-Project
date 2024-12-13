import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProgrammingPage from '../pages/ProgrammingPage'
import CovidPage from '../pages/CovidPage'
import SavedPage from '../pages/SavedPage'
import ErrorPage from '../pages/ErrorPage'
import SearchPage from '../pages/SearchPage'
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/programming',
        element: <ProgrammingPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/covid-19',
        element: <CovidPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/saved',
        element: <SavedPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/search/:query',
        element: <SearchPage />,
        errorElement: <ErrorPage />
    },
]
    
)

export default router