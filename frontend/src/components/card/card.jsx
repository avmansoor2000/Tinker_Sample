import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css'
import temp_avatar from '../../assets/images/avatar.jpg'

function Card({ person, extraPerson, isFlipped, isVanishing }) {

  const [showPurpose, setShowPurpose] = useState(true);
  const [extraShowPurpose, setExtraShowPurpose] = useState(true);


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

  // CALCULATE PERSON TIME
  const [remainingTime, setRemainingTime] = useState("");
  const [extraRemainingTime, setExtraRemainingTime] = useState("");

  useEffect(() => {
    if (person.checkOutTime) {
      const checkoutTime = new Date(person.checkOutTime);
      const currentTime = new Date();

      const diffMilliseconds = checkoutTime - currentTime;
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

      setRemainingTime(`${diffMinutes} `);
    }
  }, [person.checkOutTime]);
  // CALCULATE EXTRA PERSON TIME 
  useEffect(() => {
    if (extraPerson && extraPerson.checkOutTime) {
      const checkoutTime = new Date(extraPerson.checkOutTime);
      const currentTime = new Date();

      const diffMilliseconds = checkoutTime - currentTime;
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

      setExtraRemainingTime(`${diffMinutes} `);
    }
  }, [extraPerson, extraPerson?.checkOutTime]);

    // SHOW PURPOSE OR TIME PERSON
  useEffect(() => {
    // Check if remainingTime is less than 5 minutes
    if (remainingTime < 5) {
      setShowPurpose(false); // Hide purpose
    } else {
      setShowPurpose(true); // Show purpose
    }
  }, [remainingTime]);
    // SHOW PURPOSE OR TIME FOR EXTRA PERSON
  useEffect(() => {
    if (extraRemainingTime < 5) {
      setExtraShowPurpose(false); // Hide purpose
    } else {
      setExtraShowPurpose(true); // Show purpose
    }
  }, [extraRemainingTime]);


  // SPLIT NAME
  const splitName = (name) => {
    const [firstName, ...lastName] = name.split(' ');
    return { firstName, lastName: lastName.join(' ') };
  };

  const { firstName, lastName } = splitName(person.name);
  // const { EfirstName, ElastName } = splitName(extraPerson.name);
  
  const extraPersonName = extraPerson ? splitName(extraPerson.name) : null;




  return (
    <>

      <div className="card-container">

        <animated.div className={`card front ${remainingTime < 2 ? 'blink' : ''}`}
         style={{ ...vanishingStyle, opacity: opacity.interpolate(o => 1 - o), transform }}>
        {/* <div className="water-flow"></div> */}
          <div className="card_box" style={{ textTransform: 'uppercase' }} >
            <img src={person.avatar || temp_avatar} alt="Example" />
            <div className="mentor_tag">
              <span >{person.isMentor ? "Mentor" : "Mentee"}</span>
            </div>
            <div className="name_text">
              <h2>{firstName} <br /> {lastName}</h2>
              <div className='purpose_text'>
                {showPurpose && <p className='purpose'>{person.purpose}</p>}
                {!showPurpose && <p className='ramaining_time'>OUT IN {remainingTime} MIN</p>}
              </div>
            </div>
          </div>
        </animated.div>

        {extraPerson && (

          <animated.div className={`card front ${remainingTime < 55 ? 'blink' : ''}`}
           style={{textTransform: 'uppercase', ...vanishingStyle, opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
            <div className="card_box" >
              <img src={extraPerson.avatar || temp_avatar} alt="Example" />
              <div className="mentor_tag"> 
              <span >{extraPerson.isMentor ? "Mentor" : "Mentee"}</span>
              </div>
              <div className="name_text">
                <h2>{extraPersonName.firstName} <br /> {extraPersonName.lastName}</h2>
                <div className='purpose_text'>
                  {extraShowPurpose && <p className='purpose'>{extraPerson.purpose}</p>}
                  {!extraShowPurpose && <p className='ramaining_time'>OUT IN {remainingTime} MIN</p>}
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
