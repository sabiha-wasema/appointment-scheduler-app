import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home.jsx';
import Main from './layouts/Main.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
