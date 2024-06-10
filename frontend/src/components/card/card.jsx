import React from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css'
// import { withStyles } from "@mui/styles";
// import CardMedia from "@mui/material/CardMedia";
// import Fade from "@mui/material/Fade";
// import test from '../../assets/images/test.jpg';
// import steve_2 from '../../assets/images/steve_2.webp'

function Card({ person, extraPerson, isFlipped, isVanishing }) {



  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
    //config: { tension: 500, friction: 80 }
  });

  const vanishingStyle = useSpring({
    opacity: isVanishing ? 0 : 1,
    transform: isVanishing ? 'scale(0.9)' : 'scale(1)',
    from: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 }
  });

  return (
    <>
      {/* ############################################################### */}
      {/* <div className="card_container">
        <div className="card_row"> */}

      {/* cards */}


      <div className="card-container">

        <animated.div className="card front" style={{ ...vanishingStyle, opacity: opacity.interpolate(o => 1 - o), transform }}>
          <div className="card_box">
            <img src={person.avatar} alt="Example" />
            <span className="mentor_tag">MENTOR</span>
            <div className="name_text">
              <h3>{person.name}</h3>
              <p>OUT IN 2 MIN</p>
            </div>
            {/* Extra Cards */}
          </div>
        </animated.div>

        {extraPerson && (

          <animated.div className="card back" style={{ ...vanishingStyle, opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
            <div className="card_box" >
              <img src={extraPerson.avatar} alt="Example" />
              <span className="mentor_tag">MENTOR</span>
              <div className="name_text">
                <h3>{extraPerson.name}</h3>
                <p>OUT IN 2 MIN</p>
              </div>
            </div>
          </animated.div>
        )}
      </div>


      {/* </div>
      </div> */}
    </>
  )
}

export default Card
