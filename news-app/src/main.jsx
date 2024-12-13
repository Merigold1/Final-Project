import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/index.js'
import { Provider } from 'react-redux'
import router from './router/router.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
