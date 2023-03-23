import React from 'react'
import SideNav from '../partials/SideNav/SideNav'
import SideNavMobile from '../partials/SideNav/SideNavMobile'

const About = () => {
  return (
    <div>
        {/* <div>
        <SideNav/>
        <SideNavMobile/>
        </div> */}
<div className='container mt-5'>
<h1 className='container'>About Us</h1>
<p className='text-break fs-3'><br/><h2>Kodegram</h2> is a fullstack web application developed by a team of four using the MERN stack, Firebase, and Sass for customized CSS. The purpose of Kodegram is to provide a social media platform that is similar to Instagram in terms of its features and functionalities.<br/><br/>

The name Kodegram is derived from the name of the code camp attended by the development team, KodeGo, and the popular social media platform Instagram. This name reflects the inspiration behind the project and the team's goal to create a unique and innovative social media platform.<br/><br/>

Using the MERN stack, Kodegram leverages the power of MongoDB, Express, React, and Node.js to provide a seamless user experience. Firebase is used for authentication, database management, while SASS is used to create personalized CSS styles that are unique to Kodegram.<br/><br/>

The development team has worked tirelessly to create a user-friendly interface that includes a range of features such as photo sharing, user profiles, a news feed, likes, comments, and direct messaging. The team has also implemented advanced search functionality to help users discover new content and connect with other users. <br/><br/>

Overall, Kodegram is an exciting project that showcases the power of modern web development tools and technologies. The development team has put in a tremendous amount of effort to create a platform that is both user-friendly and innovative, and they are excited to share their creation with the world.</p>
</div>
<div className='container mt-5 pt-5 border d-flex justify-content-evenly flex-md-row flex-sm-column'>
    
    {/* Kenneth */}
<div className="card my-1 mx-1" style={{width: '18rem'}}>
  <img className="card-img-top img-fluid" src="https://firebasestorage.googleapis.com/v0/b/chat2-6ea80.appspot.com/o/Kenneth.jpg?alt=media&token=0c409954-e9b5-4ec3-803c-c7d1db2ca814" alt="Kenneth S. Tan" />
  <div className="card-body">
    <h5 className="card-title">Kenneth S. Tan</h5>
    <p class="card-text">"Looking for a dynamic full-stack developer who can handle it all? Look no further - I'm your one-stop-shop for web development."</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h4>Fullstack Developer</h4></li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
  <a href="#" className="card-link" target="_blank">Github</a>
    <a href="#" className="card-link" target="_blank">My Porfolio</a>
  </div>
</div>
    {/* Marc */}
    <div className="card my-1 mx-1" style={{width: '18rem'}}>
  <img className="card-img-top img-fluid" src="https://firebasestorage.googleapis.com/v0/b/chat2-6ea80.appspot.com/o/184412_427360140695437_1678832722_n.jpg?alt=media&token=ff13a2bf-d850-41c8-8493-2155dc5935c0" alt="Marc James G. Montero" />
  <div className="card-body">
    <h5 className="card-title">Marc James G. Montero</h5>
    <p class="card-text">"With my expertise in both front-end and back-end development, I can ensure your website is seamless, fast, and user-friendly."</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h4>Fullstack Developer</h4></li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
  <a href="https://github.com/varuscritical900" className="card-link" target="_blank">Github</a>
    <a href="https://641c29863419180806e14a55--bright-licorice-131fe1.netlify.app/?fbclid=IwAR16ZsjHXM_AOps-_ESK1Iqq15Ove-a2zFgXMJPC52Ni3UXY5YVOCLcayiE" className="card-link" target="_blank">My Porfolio</a>
  </div>
</div>

    {/* Divino */}
    <div className="card my-1 mx-1" style={{width: '18rem'}}>
  <img className="card-img-top img-fluid" src="https://firebasestorage.googleapis.com/v0/b/chat2-6ea80.appspot.com/o/divino.jpg?alt=media&token=9a765718-615b-4255-a5c6-f8c689728a2b" alt="Divino N. Viado" />
  <div className="card-body">
    <h5 className="card-title">Divino N. Viado</h5>
    <p class="card-text">"Need a website that's as beautiful as it is functional? I'll deliver as a full-stack developer with an eye for design."</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h4>Fullstack Developer</h4></li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
  <a href="#" className="card-link" target="_blank">Github</a>
    <a href="#" className="card-link" target="_blank">My Porfolio</a>
  </div>
</div>

    {/* John Paul */}
    <div className="card my-1 mx-1" style={{width: '18rem'}}>
  <img className="card-img-top img-fluid" src="https://firebasestorage.googleapis.com/v0/b/chat2-6ea80.appspot.com/o/JohnPaul.jpg?alt=media&token=63e76adb-29d2-4b34-9cab-4bb5125141fa" alt="John Paul T. Ladao" />
  <div className="card-body">
    <h5 className="card-title">John Paul T. Ladao</h5>
    <p class="card-text">"I don't just code websites - I craft digital experiences that engage, inform, and inspire as a full-stack developer."</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h4>Fullstack Developer</h4></li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
    <a href="#" className="card-link" target="_blank">Github</a>
    <a href="#" className="card-link" target="_blank">My Porfolio</a>
  </div>
</div>
</div>

    </div>
  )
}

export default About