import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {

  const [active, setActive] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setActive("")
  }, [location.pathname])

  useEffect(() => {
    setActive(location.search.substring(1))
  }, [location.search])

  const sorting = ["Bubble", "Selection", "Insertion", "Merge", "Quick", "Radix", "Counting", "Bucket"]

  const searching = ["Linear", "Binary", "Interpolation", "Jump", "Exponential"]

  const handleNavigate = (algo) => {
    navigate(`?${algo}${location.pathname === "/sorting" ? "Sort" : "Search"}`)
  }

  const navigateToGoogle = () => {
    window.open('https://velvety-mochi-49252e.netlify.app/', '_blank');
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand fs-4 fw-bold" href="#">Algorithm Visualizer</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
            {location.pathname.length > 1 && (
            (location.pathname === "/sorting" ? sorting : searching).map((algo) => (
              <li class="nav-item">
                <a className={`nav-link ${active.includes(algo) ? "active" : ""}`} onClick={() => { handleNavigate(algo) }}>{algo} {active.includes(algo) && (location.pathname === "/sorting" ? "Sort" : "Search")}</a>
              </li>
              )))}
              <li class="nav-item">
                <button class="btn btn-outline-primary" type="button" onClick={navigateToGoogle}><i class="fa-solid fa-user fa-fade" style={{color: "#ffffff"}}></i></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar