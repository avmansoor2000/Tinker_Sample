import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css'
import temp_avatar from '../../assets/images/avatar.jpg'

function Card({ person, extraPerson, isFlipped, isVanishing }) {

  const [showPurpose, setShowPurpose] = useState(true);


  // Flip Effect
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

  // Calculate Time
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (person.checkOutTime) {
      const checkoutTime = new Date(person.checkOutTime);
      const currentTime = new Date();

      const diffMilliseconds = checkoutTime - currentTime;
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

      setRemainingTime(`${diffMinutes} `);
    }
  }, [person.checkOutTime]);

  useEffect(() => {
    // Check if remainingTime is less than 5 minutes
    if (remainingTime < 5) {
      setShowPurpose(false); // Hide purpose
    } else {
      setShowPurpose(true); // Show purpose
    }
  }, [remainingTime]);



  return (
    <>

      <div className="card-container">

        <animated.div className="card front" style={{ ...vanishingStyle, opacity: opacity.interpolate(o => 1 - o), transform }}>
          <div className="card_box" style={{ textTransform: 'uppercase' }} >
            <img src={person.avatar || temp_avatar} alt="Example" />
            <div className="mentor_tag">
              <span >{person.isMentor ? "Mentor" : "Mentee"}</span>
            </div>
            <div className="name_text">
              <h2>{person.name}</h2>
              <div>
                {showPurpose && <p className='purpose'>{person.purpose}</p>}
                {!showPurpose && <p className='ramaining_time'>OUT IN {remainingTime} MIN</p>}
              </div>
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
                <div>
                  {showPurpose && <p className='purpose'>{person.purpose}</p>}
                  {!showPurpose && <p className='ramaining_time'>OUT IN {remainingTime} MIN</p>}
                </div>
              </div>
            </div>
          </animated.div>
        )}
      </div>

    </>
  )
}

export default Card
