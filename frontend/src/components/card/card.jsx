import './card.css'
import { useState,useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import scanCodeImage from '../../assets/images/scan_code.png';
import test from '../../assets/images/test.jpg';
import steve_2 from '../../assets/images/steve_2.webp'
import cardData from '../../assets/user.json';

function Card() {

  const [flippedStates, setFlippedStates] = useState([]);

  useEffect(() => {
    // Initialize flippedStates array with false values for each card
    setFlippedStates(Array(cardData.length).fill(false));
  }, []);

  useEffect(() => {
    // Automatically flip cards every 10 seconds
    const interval = setInterval(() => {
      setFlippedStates(prevStates =>
        prevStates.map(state => !state)
      );
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  function toggleCardFlip(index) {
    setFlippedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }

  return (
    <>
      <div className="TV_fixed">
        <div className="right_div">
          <div className="right_div_inside">

            <h1> Meet & Greet</h1>
            <h2>SAY 👋🏻 TO THIS <br /> AWESOME MAKERS</h2>
            <h5>17 MAKERS IN NOW</h5>

            <div className="right_div_inside1">
              <div className='scan_box'>
                <img src={scanCodeImage} alt="Example" />
                <div className="scan_box1">
                  <p>DON’T SEE YOUR NAME?</p>
                  <h2>
                    SCAN TO CHECK IN
                  </h2>
                </div>
              </div>

              <p>LAST UPDATED<span> 12 MIN AGO</span></p>

            </div>

          </div>
        </div>

        {/* ############################################################### */}
        <div className="card_container">
          <div className="card_row">

              {/* cards */}
              {cardData.map((card,index) => (
                <ReactCardFlip key={index}
                flipDirection="vertical"
                isFlipped={flippedStates[index]}
                onDoubleClick={() => toggleCardFlip(index)}>
                <div className="card_box">
              <img src={test} alt="Example" />
              <span className="mentor_tag">MENTOR</span>
              <div className="name_text">
                <h3>{card.name} </h3>
                <p>OUT IN 2 MIN</p>
              </div>
              
            </div>
            <div className="card_box" onClick={() => toggleCardFlip(index)}>
            <img src={steve_2} alt="Example" />
              <span className="mentor_tag">MENTOR</span>
              <div className="name_text">
                <h3>{card.name} </h3>
                <p>OUT IN 2 MIN</p>
              </div>
            </div>
            </ReactCardFlip>
            ))}
            </div>


          {/* ############################################################### */}
        </div>
      </div>
    </>
  )
}

export default Card
