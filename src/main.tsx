import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
