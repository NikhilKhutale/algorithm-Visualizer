import React from 'react'
import './App.css'
import {
  RouterProvider,
  createHashRouter,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Preloader from './components/Preloader';
import SortingAlgorithms from './components/SortingAlgorithms';
import SearchingAlgorithms from './components/SearchingAlgorithms';


const Layout = () => {
  return (
    <React.Suspense fallback={<Preloader />}>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Suspense>
  )
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/sorting",
        element: <SortingAlgorithms />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/searching",
        element: <SearchingAlgorithms />,
        errorElement: <ErrorPage />,
      }
    ]}
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App