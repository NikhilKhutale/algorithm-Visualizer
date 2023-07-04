import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-dark text-light">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <h4>Contact</h4>
            <ul class="list-unstyled">
              <li>Email: <a href="mailto:nikhilkhutale007@gmail.com"  className='footer-link'>nikhilkhutale007@gmail.com</a></li>
            </ul>
          </div>
          <div class="col-md-6 col-lg-4 text-md-end">
            <h4>References</h4>
            <ul class="list-unstyled">
              <li><img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688444127711gfg.png?alt=media&token=0fdda7e7-c1e5-4566-8911-6682ff931bd4" alt="www.geeksforgeeks.org/" style={{width:'20px', height:'20px'}} /> <a href="https://www.geeksforgeeks.org/"  className='footer-link'>Geeksforgeeks</a></li>
              <li><img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688444333941wiki.png?alt=media&token=c17a6e2e-4437-4d9e-880e-36baad2878ec" alt="www.wikipedia.org" style={{width:'20px', height:'20px'}} /> <a href="https://www.wikipedia.org/"  className='footer-link'>Wikipedia</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer