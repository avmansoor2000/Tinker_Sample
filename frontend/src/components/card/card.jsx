import React,{useEffect,useState} from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css'

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


  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (person.checkOutTime) {
      const checkoutTime = new Date(person.checkOutTime);
      const currentTime = new Date();

      const diffMilliseconds = checkoutTime - currentTime;
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

      setRemainingTime(`OUT IN ${diffMinutes} MIN`);
    }
  }, [person.checkOutTime]);



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
            <span className="mentor_tag">{person.isMentor ? "Mentor" : "Mentee"}</span>
            <div className="name_text">
              <h3>{person.name}</h3>
              <p>OUT IN {remainingTime} MIN</p>
            </div>
          </div>
        </animated.div>

        {extraPerson && (

          <animated.div className="card back" style={{ ...vanishingStyle, opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
            <div className="card_box" >
              <img src={extraPerson.avatar} alt="Example" />
              <span className="mentor_tag">{extraPerson.isMentor ? "Mentor" : "Mentee"}</span>
              <div className="name_text">
                <h3>{extraPerson.name}</h3>
                <p>OUT IN {remainingTime} MIN</p>
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
