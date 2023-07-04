import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Preloader from './Preloader';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="vh-100" style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}}>
                <Preloader />
            </div>
        )
    }
  

  const handleNavigation = (algo) => {
    navigate(algo === "sorting" ? "/sorting" : "/searching")
  }

  return (
    <>
      <div class="container-fluid text-white bg-dark pt-5 min-vh-100">
        <div class="row justify-content-center">
          <div class="col-lg-4 mb-4" onClick={() => handleNavigation("sorting")}>
            <div class="card h-100" style={{cursor: "pointer"}}>
              <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688442464136sorting%20algorithm.jpg?alt=media&token=a006f8c1-a8df-4e98-9b78-4a4b5e0c1e15" class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Sorting Algorithm</h5>
                  <p class="card-text">In our everyday lives, we often encounter situations where we need to organize and sort information. Whether it's arranging a list of names in alphabetical order, sorting books on a shelf by author or title, or even organizing a playlist based on song duration...</p>
                </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4" onClick={() => handleNavigation("searching")}>
            <div class="card h-100" style={{cursor: "pointer"}}>
              <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/168844260113910838253_4560004%20(1).jpg?alt=media&token=c3382ad1-d083-4583-8be5-66e023662a96" class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Searching Algorithm</h5>
                  <p class="card-text">In the digital age, where vast amounts of information are readily available at our fingertips, efficient searching algorithms play a crucial role in finding relevant data quickly and effectively. Whether we're searching for a specific document, a desired product, ...</p>
                </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
