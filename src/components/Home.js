import React from 'react'
import{ useRef, useState,useEffect } from 'react';
import './Home.css';

import homepageVehicleImage1 from '../Image/VR25HomeIMg.jpg';
import homepageVehicleImage2 from '../Image/VR25HomeIMg2.jpg';
import homepageVehicleImage3 from '../Image/VR25HomeIMg3.jpg';
import vehicle1 from '../Image/vehicle1.png';
import vehicle2 from '../Image/vehicle2.png';
import vehicle3 from '../Image/vehicle3.png';
import vehicle4 from '../Image/vehicle4.png';
import bajaLogo from '../Image/trial4.png';
import aboutbajaLogo from '../Image/VR25-logo-removebg-preview.png';

import awardImg from '../Image/award_img.jpeg';
import videobg from '../Video/VR25_HomePage_video.mp4';
import videobg1 from '../Video/VR25_About_video.mp4';
import videobg2 from '../Video/rolling.mp4';
import ScrollAnimation from './ScrollAnimation';


function Home() {
  const cardWrapperRef = useRef(null);
  const [currScroll, setCurrScroll] = useState(5);
  const [initPos, setInitPos] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // Initial speed
  const videoRef = React.createRef();

  useEffect(() => {
    if (cardWrapperRef.current) {
      setCurrScroll(cardWrapperRef.current.scrollLeft);
    }
  }, []);

  const widthToScroll = cardWrapperRef.current?.children[0]?.offsetWidth || 0;

  const handlePrevClick = () => {
    console.log("prevClicked")
    cardWrapperRef.current.scrollLeft -= widthToScroll;
  };

  const handleNextClick = () => {
    console.log("nextClicked")
    cardWrapperRef.current.scrollLeft += widthToScroll;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    cardWrapperRef.current.classList.add('grab');
    setInitPos(e.clientX - cardWrapperRef.current.getBoundingClientRect().left);
    setCurrScroll(cardWrapperRef.current.scrollLeft);
    setClicked(true);
  };

  const handleMouseMove = (e) => {
    if (clicked) {
      const xPos = e.clientX - cardWrapperRef.current.getBoundingClientRect().left;
      cardWrapperRef.current.scrollLeft = currScroll - (xPos - initPos);
    }
  };

  const handleMouseUpAndLeave = () => {
    cardWrapperRef.current.classList.remove('grab');
    setClicked(false);
  };
  const handleScroll = () => {
    // Adjust the multiplier as needed based on your requirements
    const speedMultiplier = 0.1;
    const maxPlaybackRate = 4; // Adjust as needed
    const newScrollSpeed = 1 + window.scrollY * speedMultiplier;
    setScrollSpeed(Math.min(newScrollSpeed, maxPlaybackRate));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Access the video element and update the playback rate
    if (videoRef.current) {
      videoRef.current.playbackRate = scrollSpeed;
    }
  }, [scrollSpeed]);

  //animation javascript
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
  
  return (
    <>
      <div className='homepage'>

        <div class="wrapper">
              <img src={bajaLogo} alt=''/>
              <img src={homepageVehicleImage1}  alt=''/>
              <img src={homepageVehicleImage3} alt=''/>
              <img src={bajaLogo} alt=''/>
        </div>

       




        <div className="homeInfo">
          <div className="homeInfo-title">
            <div className="title-name">
                <div className="title-sub-name">
                  <h1>VISHWA<span style={{"color":"#fa5f1a"}}>RACERS</span></h1>
                </div>
            </div>
            <div className="title-spec">
                <h1>BA<span style={{"color":"#fa5f1a"}}>J</span>A</h1>
            </div>
          </div>
          {/* <h1 style={{"fontWeight":"bold","fontSize":"200px"}}>BAJA</h1> */}
          <div class="intro-engage-button">FROM CONCEPT TO REALITY, AND BEYOND</div>
        </div>
        
      </div>
         
         <div className="infoTags">
          <div className="info-desc-1">
              <video src={videobg} autoPlay loop muted style={{"width":"100%","height":"100%"}}></video>
          </div>
        
          <div className="info-desc-2 reveal fade-bottom">
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"6vw"}}>DREAM </span>
                </h2>
              </div>
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"8vw","textDecoration":"underline"}}>BELIEVE</span>
                </h2>
              </div>
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"10vw"}}>ACHEIVE.</span>
                </h2>
              </div>
            </div>
        </div>

      <div className="aboutInfo">
        <div className="aboutDescription reveal fade-left">
          <div className="aboutHeading">
              <span style={{fontSize:"4vw","color":"#00171F","padding":"0px 10px 0px 10px"}}>ABOUT US</span>
          </div>
          <div className="smallDec" style={{"padding":"0px 10px 0px 10px","color":"#00171F"}}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reiciendis eius odio id velit natus corporis eos molestias enim molestiae explicabo exercitationem cumque dolor nemo ipsa. Distinctio officiis dolorum autem debitis alias quae neque necessitatibus deserunt porro ad, at nam sit consequatur quod fugit repellat assumenda impedit aliquam et hic illum ab facere sint. Sit quis rem at perferendis enim fugit iusto amet! Sapiente odit adipisci voluptatum! Hic labore, a molestiae tempora magni at commodi dolore explicabo tempore quidem nobis quae corporis aut eligendi ullam veniam temporibus exercitationem dicta harum ea? Nostrum eveniet ipsum maiores perspiciatis illum unde, iure aspernatur!</p>
          </div>
          <div className="contactButton">
            <a href="/contact"><button type="button" class="engage-button">ENGAGE WITH US</button></a>
          </div>

        </div>

        <div className="aboutVideo ">
          {/* <video width="500px" height="500px" controls="controls">
            <source src="https://www.youtube.com/watch?v=lbQu3PZoEAU" type="video/mp4" />
          </video> */}
            <div className="home-video">
              {/* <iframe style={{width:"100%","height":"100%"}}
              src="https://www.youtube.com/embed/lbQu3PZoEAU?autoplay=0&mute=1&playlist=lbQu3PZoEAU&loop=1">
              </iframe> */}

              {/* <video src={videobg1} autoPlay loop muted style={{"width":"70%","height":"70%"}}></video> */}
              <img src={aboutbajaLogo} alt="Baja Logo" style={{"width":"80%","height":"100%"}} />
            </div>

        </div>
      </div>
      
      <div className="cardInfoHeading ">
        <h3>
          <span className='infoHeadings'>EXPLORE AMAZING  <span style={{color:"#fa5f1a"}}>FLEETS</span></span>
        </h3>
      </div>
      <div className="carInfo ">
        
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src={vehicle1} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Nimbus 1.O</h5>
            {/* <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p> */}
            
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src={vehicle2} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Nimbus 2.O</h5>
            {/* <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p> */}
            
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src={vehicle3} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Meracis</h5>
            {/* <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p> */}
            
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src={vehicle4} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Meracis 2.O</h5>
            {/* <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p> */}
            
          </div>
        </div>
      </div>
      
      <div className="model-section-image">
        <div className="model-image">
         {/* <img src={aboutImage} alt="Car image" /> */}
         {/* <img src="https://pbs.twimg.com/media/FLfU5dYaAAQC_ku?format=jpg&name=4096x4096" alt="Car image" /> */}
         {/* <img src="https://www.imeche.org/images/default-source/oscar/Formula-Student/fs_awards17_large.jpg?sfvrsn=9483d912_0" alt="Car image" /> */}
         {/* <img src="https://www.brookes.ac.uk/getmedia/48355b46-c8cf-4472-83b1-fd0f585ed16c/1OBR800.png" alt="Car image" /> */}
         {/* <img src="https://c4.wallpaperflare.com/wallpaper/575/526/560/car-sports-car-wallpaper-preview.jpg" alt="Car image" /> */}
         {/* <img src="https://www.bajasae.net/cdsweb/SharedComponents/public_assets/img/trophies.jpg" alt="Car image" /> */}
         <video src={videobg2} autoPlay loop muted style={{"width":"100%","height":"100%"}}></video>
         {/* <video ref={videoRef} controls width="400" height="300">
        <source src={videobg2} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
        </div>
        <div className="model-image-desc">
          <h1> <span style={{color:"#fa5f1a"}}>NIMBUS</span> 2.O</h1>
          {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit explicabo omnis qui magni rerum doloremque vero facilis, quae quas quod.</p> */}
        </div>
      </div>

      <div className="awardsInfo">
        <div className="currentAwards reveal fade-left">
            <h2>
              <span style={{fontSize:"3vw"}}><span style={{color:"#fa5f1a"}}>3 </span>AWARDS</span>
            </h2>
        </div>
        <div className="currentAwards">
            <h2>
              <span style={{fontSize:"3vw"}}><span style={{color:"#fa5f1a"}}>|</span></span>
            </h2>
        </div>
        <div className="currentCars">
            <h2>
            <span style={{fontSize:"3vw"}}><span style={{color:"#fa5f1a"}}>5 </span>CARS</span>
            </h2>
        </div>
        <div className="currentAwards">
            <h2>
              <span style={{fontSize:"3vw"}}><span style={{color:"#fa5f1a"}}>|</span></span>
            </h2>
        </div>
        <div className="currentMembers reveal fade-right">
            <h2>
            <span style={{fontSize:"3vw"}}><span style={{color:"#fa5f1a"}}>30+ </span>MEMBERS</span>
            </h2>
        </div>
      </div>

      <div className="awards-section-image">
        <div className="award-image">
         {/* <img src={aboutImage} alt="Car image" /> */}
         {/* <img src="https://pbs.twimg.com/media/FLfU5dYaAAQC_ku?format=jpg&name=4096x4096" alt="Car image" /> */}
         {/* <img src="https://www.imeche.org/images/default-source/oscar/Formula-Student/fs_awards17_large.jpg?sfvrsn=9483d912_0" alt="Car image" /> */}
         {/* <img src="https://www.brookes.ac.uk/getmedia/48355b46-c8cf-4472-83b1-fd0f585ed16c/1OBR800.png" alt="Car image" /> */}
         {/* <img src="https://pbs.twimg.com/media/FkHdcl2XwAM2W_p?format=jpg&name=4096x4096" alt="AWARDSimage" /> */}
         <img src={awardImg} alt="AWARDSimage" />
         {/* <img src="https://www.bajasae.net/cdsweb/SharedComponents/public_assets/img/trophies.jpg" alt="Car image" /> */}
        </div>
        <div className="award-image-desc">
          <h1> <span style={{color:"#fa5f1a"}}>ACHEIVEMENTS</span> CORNER</h1>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ab?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, odio. Eius harum maxime molestiae eum ipsam assumenda placeat, alias qui?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor maxime nisi perferendis deserunt beatae hic voluptatem necessitatibus minima perspiciatis aperiam quae officia dolores id rem, dicta fugiat facere possimus! Minima?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt cumque dolore, optio eos laboriosam repellendus nam suscipit autem sapiente?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ab?</p>
            </div>
          </div>
        </div>
      </div>
        

      <div className="farmerTagLine">
        <h6>
          <span className='infoHeading' style={{"fontSize":"4vw"}}>WE <span style={{color:"#fa5f1a"}}>BELIEVE</span> OUR FARMERS</span>
        </h6>
      </div>

      <div className="about_quote">
          <div className="about_quote_message">
            <h1>"Our Farmers, the stewards of the Earth, </h1>
            <p style={{fontSize:"25px"}}>Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals & happiness."</p>
          </div>
        </div>

      <div className="farmerClass">
      <div className="farmingImages">
      <div class="wrapper">
              <img className="farmImg" src='https://indiacsr.in/wp-content/uploads/2023/04/Eating-Healthily.jpg' alt=''/>
              <img className="farmImg" src='https://agronicfood.com/wp-content/uploads/2020/02/0-4.png'  alt=''/>
              <img className="farmImg" src='https://s3.amazonaws.com/bizenglish/wp-content/uploads/2021/07/12095052/Picture-2-A-proud-Sri-Lankan-dairy-farmer.jpg' alt=''/>
              <img className="farmImg" src='https://files.globalgiving.org/pfil/1891/pict_original.jpg?m=1195034976000'  alt=''/>
          </div>
        </div>
        <div className="farmerBenefits reveal fade-bottom">
            <p style={{"padding":"0px 10px 0px 10px","textAlign":"justify"}}>
            At the heart of our Formula Student car lies a deep-rooted belief in the resilience and ingenuity of our farmers. They are the backbone of our society, tirelessly nurturing the land and providing us with the sustenance we need to thrive. Their unwavering dedication to their craft inspires us to push the boundaries of innovation, to strive for excellence in every aspect of our design and engineering. Just as our farmers cultivate the fields with unwavering commitment, we cultivate the spirit of innovation, transforming raw ideas into cutting-edge technology. We believe that by harnessing the power of science and engineering, we can empower our farmers and revolutionize the agricultural sector, creating a world where food security is not a privilege but a fundamental right.
            <br></br>
            Our team's commitment to innovation stems from the profound respect we hold for our farmers, the unsung heroes who tirelessly toil to provide the world with sustenance. Their unwavering dedication to their craft serves as an inspiration, driving us to push the boundaries of technology and design. Just as farmers nurture the land with unwavering commitment, we strive to transform raw ideas into cutting-edge solutions, harnessing the power of science and engineering to revolutionize the agricultural sector. 
            </p>
        </div>
      </div>

      <div className="upcomings">
        <h4>
          <span className='infoHeadings' style={{"fontSize":"3vw"}}>MEET OUR NEW <span style={{color:"#fa5f1a"}}>AUTOBEAUTIES</span> </span>
        </h4>

        <span className='upcomingsHeading' style={{"fontSize":"1.5vw","color":"white"}}>INTRODUCING OUR LATEST ADDITION TO OUR COLLECTION</span>
        
      </div>

      <div className="newUpcomings">
      <div className="carInfo car-upcomings">
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem.</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
           
          </div>
        </div>
      </div>
      </div>


      <div className="sponsors">
        <div className="sponsor_info">
          <div className="sponsor-heading">
            <h2>MADE POSSIBLE BY</h2>
          </div>
          <div className="sponsor-logo-images">
            <img src="https://www.ammoniaindia.org/wp-content/uploads/2017/11/logo-refcon.jpg" alt="Refcon" style={{"width":"300px","height":"150px","margin":"20px"}} />
            <img src="https://media.licdn.com/dms/image/C5603AQEuigkBXkPoSg/profile-displayphoto-shrink_400_400/0/1603101045568?e=2147483647&v=beta&t=wjrTkUMFhDZG-9bgnMboaAGTiV7fO_WALKHG5Jr7oyk" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>
            <img src="https://static.wixstatic.com/media/6fd641_7ec0c2157f004265bace78077144afa5~mv2.jpg/v1/fit/w_2500,h_1330,al_c/6fd641_7ec0c2157f004265bace78077144afa5~mv2.jpg" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>
            <img src="https://s3.amazonaws.com/media.mixrank.com/hero-img/5565e17b0c2a74dc3e347bb5133165ef" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>
          </div>
          <div className="sponsor-logo-images">
            <img src="https://static.wixstatic.com/media/263487_04b3ef2cd73342dabf6aac9ebf5072dc~mv2.gif" alt="Refcon" style={{"width":"300px","height":"150px","margin":"20px"}} />
            <img src="https://media.licdn.com/dms/image/C4E0BAQEM0gK1uySBrQ/company-logo_200_200/0/1597438084039?e=2147483647&v=beta&t=d2njNggLfQzO6UWipywXA3or0uDlbZIqUxkEKvEw6ZA" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA81BMVEX///8zMzP/fwAtLS37+/swMDAAAAA5OTklJSUoKCjp6enNzc0hISFxcXH//Pvh4eEcHBxfX195eXmkpKQdHR3/3cf/eQDy8vL+gQAVFRWtra07Ozvd3d0TExO/v7//ghX/8ObR0dFQUFD/oWX/dgCampq5ubmAgICPj49FRUV1dXWqqqpjY2NNTU2IiIhYWFj/1b3+59X/7uP+iTf/awD+xqP+za3+lEv+fDH+qG3+gij+rnj9uoz+hzv/0bb/jEn/o3b9u4ve0sr+m1f+kzn+nmb+iSH+lUn9s33/2MX/w5f9upb/sov/gyv+l1v9kjT9nU0hxE6EAAARtklEQVR4nO2de3ubuLbGjYVA4mKwcUwxlxjH2GBjaNqms6fp9Ow5md3p7Dmzz3z/T7PBtxjENQE7yeP3n6aJE+tnSUtLS1qLTueiiy666KKLLrrooosuuuiiiy666Hn61jt3C9rWT+/P3YKWNfnHz+duQsv6fP3ljQ/T+9Hs6txtaFUfHkbdNzpMJ1fvI119ve52f3n/R/z17Rsbrb1v//Mp0qwbaRZ/9c/bczepcX34szvq7jT7+PnczWlDvc8fd4ijm7dqbW4ftoi/Ts7ckLbE/+/vG8LZ3blb0orU+UD68Kk7uh51Rw8fzt2a5iWNfZfufJ2NPt79PBq9e3PTUFKmoRWZmu+zyMT07j5+untbayGnhIzLRV9cffo6ib9x9fDb5KwtaljjqcnwdPzVj/3esHf/hoap7ZmmqG6/Phqak7M0pnnR0oKR1/NzN6M9cYpu4oFx7ma0Jnrum6Y3ps/djtZkD6BsDuxzN6M1qY6HBbxSz92OtkRb7BAL4dudgZzPAMw6525Ga+LGQABAfLMzkLZEGWBdebMzkAt0RJkh/2bXiDmLIWTcV9iBvSwRr5JEGVLQ46Ox2oZaBXx3nVL3+81VClEdUwIVyVvrbPPSwZJrk7Cb1Gj0L+KQzB4wgNoItCJBbJXwXYJv9tPnSeoV6tiTqVaFTkc4+3JHBJLsJQbtAp6QcPYzGSgb6xhWbqmMXjTh6Dt53MD5ZrUOBABjIDqDJ/X3aQhHH78SP1MtWajQQBjBeeHCipdKe/0ExFMQjrr3ZAdKAVM+QCGS2f5CsfeewJytPKhPSTj7SFjQTsfql3YgEBhWVCzjaMVWffzyCEeze9LC0K5e0lSsmXpgGenGrV5cH3Zn159JL40Li20GZpipY6gZ7pbq1UZsm/BmQn7XwoUdCLFv5brgSm3/oGXCf5PfU125sAMBLIqT0rC8EzHC4HGdbZcwQ7aoFbdRLg4EO2YxHhRQGDiKePgUT004n5bYUHlR/Ae44k4cCuI8tr7cYP8+pyWkHVhiQ6FQFmhzGEHWGMaUETHYoTxc8DsetT88A6E6QGWzCIll+3zVMAzbtlau6EWcR34tNJmB9Gh/VYBOTmhPyw1hySxMijZWPgUwiCghwLqT/HA4Fp+Y0KLK/VBcOxpM80FfRwLlk3Fy28MnJVyhCh4Xcp8QVeGsYDHPGtxW7DmdilB15AreCGSfdmaYF20aRwP4RITcQqjibuF+TmtUTrJ5nrcNLsuXyxWtaCci5MRSI7odpBmLoTF3l6HHsmz8ApbVp6JrVW9zwOBTEBrrat4kZPnjX6NV29WjFUFAMFb8gkgADRkGBXbFvhwwJyA09Cqb+UggfPwl1ZgvEaPluLBAZnTFqAJJi+0TGnrVEJKp7JtlzBe6WTx1gQndKh0pOW0T8uuKgMDsb02+agUhFspDMkD2HKm8AcQ2umHZ64qBB5kdb5pCj31dqPg7AE2tsgbQfIVP4RkyKgICZrD9qOdTUD2GGu8F3ZIWSFX6+RmA1eZg1BcbK6rOIVM3YMj4xU1Q8tbYRsStK1lRxG6cNZUPa/NFEgq3I3yrq4XqV1kHodDfTCYjEJ4Yt1/kIxqs1iIhvagCCLAbTxRVmVZy7DIE8/11LkRtem1KFSMD0Dxuni2C+sHeR8Qcixptudv0Sy22wqSShc37j3EdA0oI69nj1BHa3D0Z0Upf1mqIxPilnMg8Ay+WtsxqghLv2FojpAM5+uPFIWrMOnS8JE9NnC8AQIUYKZOx6FlUPIhaI7RkCg4lvWigYn0zBXk/7OcrDKceC4ShXDyMBbITbW9jmtsiVD1MmW4HFBBiPbYPtCQZUoHiyBrPWyvXR8Wh5HQnquF2LW6L0DGjzZxURIi3kVGRL/tTuwZztisUrD4gfeFP3L24CcLehGzPEFLygqZzCKONLEKbVXDJVCSMJYlmbjdiMbkmrpqMeX8gz8/caApEi1SKMNqgb2wHRel6PwbkfLkOYXwInDcowDQZh7T3/lEDhBOSUJ0CCnhGghAIAvSmob8MnPnu6JMTNaoeYYdncxyDdJhO3S9VDRDekme8lg4p7HNHhFBeL5SxZUtHSzO31Ki6hB0L5gU2lOQLQ9AUYe9qQnzPif46GhwRAuTaabeD3tiCuoSdsZZNKKSc0yVqivA2I291gZKEUMhILtj65bUJ1UU2opDaYbiNnT19IwlVEcXRXelAKAek3+hsP+PahB1jmjlO0yRjsyHC3g8y2YqLL4VAyt4T4il53hIH3EnCSrdDlUzCeN4fy2IaIpz8Tt4G2vQhJSv79RArxEt4b2cTE4SqQmg159NxUSnMQsR+0qvhGyP8JSNzNZ6H0XKx82mAT4xRzt/NkiShxJhyUppmmp6b8siCrBUjTWI3R5hRAUDZjMDhsrP17sn9qXvwv5KEmWEdoPnJUW5lbcvaI/ySQShtd03DIP4XkcEw6/GorQJhZCcHiVFAZ23K0ra0uXk4+iPju852EG7mC0O+w9FZYiVCSCWHgZgxTNPrYWO2dJKdJL+/CREbHOKHi+FjwyoRUrKTaL4yJF+SNmdOU3uLyaf7rPxqrr+LnEGWWCn4Y1NYjRAlL9xb5KJPHB8PmvJpJrPvmdnHXLC7vQb9cZJRTYyxaoSppcAm4zrAS7kOfdwY4exHZpK8Ova2l5wRCl3raJDNE5awImGYIDQyCFPBe9pryvOefOpm2ppI3Epj4g8SYqyHwZ6EWyYi20/qQ4kkTB+Qc/up0ARh990k54f0OBwKIPLPoq0vwqJiRAbdSlqJivMw6ZJljFI4Tr71vLE9fkw4+55fzEFSfE8HKNrZQ2Qyw3AQJi19NcLUYkdaGsimOCxvZ+qeT/h9FCH+VlS8ibOchRh60SZRkDUz7lNYcz2khORSoBCvw33iXRdsM9HE3tfZJp3iblL4MtXg52PHXYj9cB31KRaGEWwkrRJh2lAOiEMqJuPkYu4Lm534c3P+bjcljkbXN99KX0rTKifFNwt53tqI5+35sQnJI0SLpL9C5F1AlPV+nIIRBdar526B77YVjkZfHuqW5VD51WB9nPebQ6itk2009LRfamafddNGyEDAer71rCTE3o99narZX79WLKZGS7wj6rKAQXKUauS5BRK09Amok+5CgHK7SYmmPQAyld6B1VLv/rHa2Ozd/efbySQjUXRLxnGGpQzWiGG07R3fBCEnDtIKFOLiPplXohVcaeQ3ZydQY0QiFlYD8cfowBhBzt493N99++PqiozC2bIZsQk4x5ZW05wFca4XQpG5koeCgIZ6UQftAkIQMQP+6Yx3H2eJVNEIc9a9vibKqznEQlafkPMZ1pv2fXGwCFzHcRTFKZxm44PhFWDw9Gz/2/vZqEto9Ne2/NFBPhFhqU+o2rZtGJLEcapaIY1ZDR6XFiisnSfbnN7tw6dZBuNvx8FGek1szmsTcivLqDPYbJ1hHhlB7hXWKrq9mY3Ijpw9TA6vkAgzX5uQXmuRZwTWfrDipUqktDQWhwjvopcU1uvP/EdN/v3wyyhNOesekrsMMn+wJuHuik60XRFMxkTeQuGlCveGaWswZXfpZBiMy15eqNu7+//81U1OytnNLuKYESSrRyj5CVMFgaAxjDdQLJsro+TmA2974REXZlZVUG9y9fnPm9/jZWPvCnzZ2dR5mq8eoTqeEg6pvAxCJqIUnXHZekfzrr4ZAZh9zkDdafLh6o+7rzc7wn29w2cRqmORImJsaC3Rkj1fUAwD1mJQUjmEtoMh2CA2c7bf6022mc6jf+4m4pyMc1YhjBx2ezXwIHkdHuDtr6sqH0GaSA/d4pQUmodxNw7F58LttMvlHv3f7v9WSR9KQM8SEExNQID8eCA6mlE0v0SRn6NNS2ZZXGaEEhoqBrfPVt8nWvIllkaSsypb5N5OgDi1fqtOSGHMUOOiQUg7FKCw30zJkx3h9X7VJ7c9Fff42UqHuTubyYoBMKdFjPSKgpAtvT5dh/CvfUn8jETlZxCambt3bryWKYTEAgLawRQuuz1dj/DggJMnf08nNPPuBksDM+pfVskfh6qIG7oqtSP8eCBckAGWpxIW3G5WHQ1Gu+KMo/XDGzGgmapwBCFPBDqfSAjlwgDTKlpYIBEbOFKg6Y1MRIKw0xAhxCVVs9zYN2Dyt0ocgxtZL4h52Bmkz8WeRAhwwSTbEvRBvB3MdSfofq183FylbWm0W0un0z+FEJV//vRmr43C3A9CyYqw1ld6PYwvQqUgnkAor8s9PWXrW+T7hJbcJOHBp4nEpy5Q1iaEplgaGOSC3bnBMMh7ia03UqAx7Zd24rBJ8hpsXUIMyVPzg+IbRqo098393wF63kvtsJF0qF5qbxHLSB4+1SMEuJ857uLTgrgKwXKK4zIEj7+g5RIuG3FM94Q/Hd9ISeZh1CGEsudkLhL2ou9BOa4kkb7vnkvIN1MmdU94ffysJjpxNlaDEKNBtuHgpzLO3oHkj9J5A9v8I8LkdQ3aOVr3qxMy68yyAvFhaG5CkTDIaRmdPRieSDj6PX2K4TL17kTFA5TJK95qFRRrYHIXztXz6WJtCEd/TYgfjA+FlKoQQoDZ3LOXcUFGEcR5PfWME4yEYsLRKOvhPnx/V16mnBAiEObmY6tuUc0hOXc5bGYWbquZjbKf7sM5+uZ2m+COH0UcDEbmRWbF/ENcaVFUrCHjPtb+3Zuqdtt7NxplFMPail+ATW7Z0W3S9O4RaELfyS/8FY2EwqxMLXdv0Vg53967Weatt93b2AFm8q0E1hjd5Yti2YpXmFaLmnFbCtUb/WdS9HOam3sMI6TS7+LaFybDeI5deCBBL4qrEkBwgsdH9P6//OE+tBWEXky1qeG5CR7q4VIp9Yt5qiTLGJ2iuHuv4u0M1bDGiuO6ruMo40qHZpJTXLgvvoP9mmuD01a/pK4dNQxfYXHwg4wAl2Xuv+oHLKjKtLRikTB9xQ8g4PTycsLC+hUDdoKS0pCRUP90Q7R5c6aWJ/kPT1hHkG5+zbXKihOAdGpJq6IbOsM6kl9iRTEqCxY3Khp5DU95NSeD9DAF2flJF3oaIK9Z77ekjrB86lWCBlDIRFT5gVJ6AyZL5LWx4ymYvkvcvuIMy2FIWDZu3jdlEy/qXVCLxRcUZY8+zIaCLzW0ySFNn9UaK39zlQ4KpreocpvpSJm5lbsOxOd4lNk2SzZxoYB3w8dyUEDQqKm4cJW5xduGUbpOS/1cQsSe5VFmW0IIDtEEXvRSu55NNg1gdc9br72ytWWet9xDJqxURbFx7TKdobC9DWhNc0LTcSmQaO+LiLSQpFIpU0cdaBbsdlt9WNCh4gAKrPEAlFVjgyWXBnOWCpxO407o6kebDxE+VI2AQ6aklOW2rWLB563OM/8CQGHB0yAnf86ySvs3prz6NHkCuTNRNawgc1s/pArqIvaubmajF0VIocwrFirvDEKYkftLAWZZEL2efP0+6r4wQkD6sep8EHog00RBzSsIF3e+bZ5X/sII02FqyQnjokSZMxhiueiIbPL3NnXgpRFCuF/2Vc5aULmFhCM+qmij2/t1tsuNeGmElBDftKAleyUKTEFMG+mFE/DzYw7PiyOk5P5q7PrILIqnIWFZMAF7n2+OMiJeHmH8EJXiOsKA6RfVLH//c/c4F+IFEpYImF4R39W/viQzWl4bIRiy4wIDevtAJJi9KkKIgV5wI6p39XdGclnrhPD52gMi6Bc8THfy/maWkTzXPuGzBT19y6eJBRfwP9z9HdmXdxlql7DDP1u2rWwKFZl+4TMfJu/fX+WoYvL12SQF68gNMP2mLsC8NHEDFPml5lt9WDctBcwQA2/R/pWKs0jlA6QJwG+38P/5RFsLXTOFwfzED747lWhrqZsmFbxV89KxfDZ+joz0mq+LFGmua0Nz/bxqJC9XNLfCDF4Hr/iqSKFo22GZosuWr1w071LM2i2Knr1q0dYAMOL8zVqXzjhksFP7wPTViB4Dxi8pFvCKRRuONy3Y2b52qbxTWuvhNYuzVspb9Ty3Uo3znE1fdNFFF1100UUXXXTRRRdddNFFF1100UUXXXTRfwHTL3uUFtPVpwAAAABJRU5ErkJggg==" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>
          </div>
          <div className="sponsor-logo-images">
            {/* <img src="https://media.licdn.com/dms/image/C560BAQGDVuxJH8DkYg/company-logo_200_200/0/1630645533635/c2m_cad_to_manufacturing_logo?e=2147483647&v=beta&t=Ehx4lcbND0RpkSqpzgpM7JTwh1gJWXRR7R7ypR9NUDE" alt="Refcon" style={{"width":"300px","height":"150px","margin":"20px"}} /> */}
            <img src="https://yt3.googleusercontent.com/DigOH9wDnetaSsAPl50LRrZcLubRRcFK9X9SbabHo2PGfeWcWrxJIbcOV_UP0QEgQkM4-hOM6g=s900-c-k-c0x00ffffff-no-rj" alt="Venus Technocrafts" style={{"width":"300px","height":"150px","margin":"20px"}}/>

          </div>

        </div>
      </div>

      <section id='team-descriptions'>
        <div className="teamMiniDesc " >
          <div className="teamDesc reveal fade-bottom">
              <div className="teamVishwaracers">
                <h4>
                  <span style={{fontSize:"3.5vw","color":"#fa5f1a"}}>TEAM VR25</span>
                </h4>
              </div>
              <div className="team-description" style={{color:"#fff"}}>
                <p>Emerging from the vibrant heart of Pune, India, the Vishwaracers Baja team stands poised to make a resounding impact on the Formula Racing Student arena. This dynamic ensemble of astute and passionate engineers brings together a remarkable blend of skills and expertise, united by an unwavering commitment to innovation and excellence. Propelled by an insatiable thirst for pushing the frontiers of automotive technology, the Vishwaracers Baja team is meticulously crafting a Formula Racing Student car that will embody their technical mastery and leave an indelible mark on the global motorsport landscape. With every meticulous design decision, every rigorous testing session, and every unwavering dedication to precision, the Vishwaracers Baja team relentlessly pursues the pinnacle of automotive performance. Their unwavering spirit and unwavering pursuit of excellence are the driving forces behind their journey to carve a legacy of triumph in the Formula Racing Student realm.</p>
              </div>
              <a href="/team"><button type="button" class="team-engage-button">KNOW MORE</button></a>
          </div>
          <div className="teamImg reveal fade-bottom">
            <img src="https://media.licdn.com/dms/image/D4D22AQFmMp44s99M3w/feedshare-shrink_800/0/1682914945632?e=2147483647&v=beta&t=9sAPC6CtNXZZXMvgZ8pMl1e3YJLgr7IlntV8CT7iriQ" alt="Team-Image"/>
          </div>
        </div>
      </section>


      <div className="reviewTagline">
        <div className="TaglineHeading reveal fade-left">
          <h3>
            <span style={{fontSize:"3.5vw","color":"#252525"}}>EXPERIENCED BY <span style={{color:"#fa5f1a"}}>VR25 CLIENTS.</span> </span>
          </h3>
        </div>

        <div className="Tagline-Icon">
        <i class="fa-solid fa-quote-right" style={{fontSize:"3.5vw","color":"#fa5f1a"}}></i>
        </div>
      </div>

      <div className="home-review-section">
              <div class="review-wrapper">
                    <button class="arrow prev" style={{"width":"60px","height":"60px","border-radius" :"50%"}}onClick={handlePrevClick} ><i class="ri-arrow-left-s-line"
                        
                       style={{"border-radius": "50%"}}></i></button>
                    <button class="arrow next" style={{"width":"60px","height":"60px","border-radius" :"50%"}} onClick={handleNextClick} ><i class="ri-arrow-right-s-line" style={{"border-radius": "50%"}}></i></button>
                    
                    <div class="card-wrapper" ref={cardWrapperRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpAndLeave} onMouseLeave={handleMouseUpAndLeave}>
                        
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Dr.Ketan Meshram
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "I was very impressed with the Formula Student car website. It was well-designed and easy to navigate. I found the information about the team and the car to be very informative. I also enjoyed reading the blog posts. Overall, I would highly recommend this website to anyone who is interested in Formula Student."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Prof. Anne Chaise
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "The website is a great resource for anyone who wants to learn more about Formula Student. It is well-organized and easy to find information. I especially liked the section on the team members. It was interesting to learn about their backgrounds and experiences. Overall, I think the website is a valuable asset to the Formula Student community."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Mr. George Den
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "The website is a great way to showcase the team's work and achievements. I was particularly impressed with the quality of the photos and videos. The website also does a good job of explaining the team's mission and goals. Overall, I think the website is a very effective way to promote the team and its work."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Prof. Laxminarayan 
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "I found the website to be very informative and engaging. I learned a lot about Formula Student and the team's car. I also enjoyed the team's blog posts, which were well-written and informative. Overall, I would highly recommend this website to anyone who is interested in Formula Student."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Mr.Subhash Sharma
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "The website is a great way to learn about the team and its work. I was particularly impressed with the section on the team's sponsors. It was interesting to learn about the companies that support the team. Overall, I think the website is a valuable resource for anyone who is interested in Formula Student."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Mrs.Suzie Fernandes
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "The website is a great way to stay up-to-date on the team's progress. I was particularly impressed with the team's social media presence. They are very active on Twitter and Facebook, and they use their social media channels to keep fans engaged. Overall, I think the website is a valuable resource for anyone who is interested in Formula Student."
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Dr. Maira Bean
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                "The website is a great way to learn about the team's history and achievements. I was particularly impressed with the team's trophy cabinet. It was interesting to see all of the awards that the team has won over the years. Overall, I think the website is a valuable resource for anyone who is interested in Formula Student."
                                </p>

                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>


        

      








        










    </>


      
        

    
  )
}

export default Home

{/* <img className="homepage-vehicle-image" src="https://lh3.googleusercontent.com/kgJ7dcL7ErCnYfnQU9a9t6C1WFgJB1OjFR86BA6HdQ5_vjOsTIDliVpX0AOxJsWy7B38XmqmOQqZ0ShtDac9FCM=w16383" alt="BajaVehicleImage" /> */}
{/* <img className="homepage-vehicle-image" src={homepageVehicleImage} alt="BajaVehicleImage" /> */}