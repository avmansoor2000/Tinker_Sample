import Card from '../card/card'
import './display.css'
import React,{ useState,useEffect } from 'react';
// import ReactCardFlip from 'react-card-flip';
import scanCodeImage from '../../assets/images/scan_code.png';
// import test from '../../assets/images/test.jpg';
// import steve_2 from '../../assets/images/steve_2.webp'
// import cardData from '../../assets/user.json';
import frontData from "../data/frontData.json";
import backData from "../data/backData.json";


function Display() {

  // Initialize state for main and extra data arrays
  const [people, setPeople] = useState(frontData);
  const [extraPeople, setExtraPeople] = useState(backData);
  // console.log(extraPeople,'extra');

  // Initialize state for flip states of each card
  const [flipStates, setFlipStates] = useState(
    Array(frontData.length).fill(false)
  );

  // Set up useEffect to handle auto-flipping cards
  useEffect(() => {
    const flipCard = (index) => {
      console.log(index);
      // Set the flip state of the card at the given index to true
      setFlipStates((prevFlipStates) => {
        const newFlipStates = [...prevFlipStates];
        newFlipStates[index] = true;

        return newFlipStates;
      })

      // After 20 seconds, set the flip state of the card back to false
      setTimeout(() => {
        setFlipStates((prevFlipStates) => {
          const newFlipStates = [...prevFlipStates];
          newFlipStates[index] = false;
          // console.log(newFlipStates,'newFlipStates');
          return newFlipStates;
        });
      }, 30000); 
    };

    let currentIndex = 0;

    // Set up an interval to flip cards every 5 seconds
    const interval = setInterval(() => {
      flipCard(currentIndex);
      // console.log(currentIndex,'currentIndex');
      currentIndex = (currentIndex + 1) % extraPeople.length;
    }, 1000); // Flip each card every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [extraPeople.length]);
//   console.log(people.length,'people.length');


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

          {people.map((person, index) => (
          <Card
            key={person.id}
            person={person}
            extraPerson={extraPeople[index]}
            isFlipped={flipStates[index]}
          />
        ))}
            </div>

          {/* ############################################################### */}
        </div>
      </div>
    </>
  )
}

export default Display
