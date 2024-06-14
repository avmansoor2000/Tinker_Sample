import Card from '../card/card'
import './display.css'
import React, { useState, useEffect, useRef } from 'react';
import scanCodeImage from '../../assets/images/scan_code.png';
import { fetchData } from "../../api/fetchData"


function Display() {

  const peopleRef = useRef([]);
  const extraPeopleRef = useRef([]);
  // const [vanishingIndices, setVanishingIndices] = useState([]);
  const [flipStates, setFlipStates] = useState([]);
  const [members, setMembers] = useState(0);



  // Fetch data and set states
  useEffect(() => {
    async function getData() {
      try {

        const { frontData, backData, totalMembers } = await fetchData();
        // console.log(frontData, "fornt Data");
        if (frontData && backData && totalMembers) {
        peopleRef.current = frontData;
        extraPeopleRef.current = backData;
        console.log(frontData, 'frontData');
        console.log(backData, 'backData');
        setMembers(totalMembers)
        setFlipStates(Array(frontData.length).fill(false));
      } else {
        console.error('Data fetching returned incomplete or invalid data.');
      }
      } catch (error) {
        console.log('Error fetching data:', error);

      }
    }
    getData();

    const intervalId = setInterval(getData, 60000);
    return () => clearInterval(intervalId);


  }, []);




  // Set up useEffect to handle auto-flipping cards
  useEffect(() => {
    if (extraPeopleRef.current.length > 0) {
      const flipCard = (index) => {
        console.log(index + ' index');

        // Set the flip state of the card at the given index to true
        setFlipStates((prevFlipStates) => {
          const newFlipStates = [...prevFlipStates];
          newFlipStates[index] = true;
          return newFlipStates;
        });

        // After 30 seconds, set the flip state of the card back to false
        setTimeout(() => {
          setFlipStates((prevFlipStates) => {
            const newFlipStates = [...prevFlipStates];
            newFlipStates[index] = false;
            return newFlipStates;
          });
        }, 30000);
      };

      let currentIndex = 0;
      let interval;
      let timeout;

      const flipNextCard = () => {
        flipCard(currentIndex);
        console.log(currentIndex, 'currentIndex');
        currentIndex = (currentIndex + 1) % extraPeopleRef.current.length;

        if (currentIndex === 0) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            interval = setInterval(flipNextCard, 1000);
          }, 30000);
        }
      };

      // Set up an interval to flip cards every 1 second
      interval = setInterval(flipNextCard, 1000);

      // Clean up the interval on component unmount
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [peopleRef.current.length, extraPeopleRef.current.length]);



  return (
    <>


      <div className="TV_fixed">
        <div className="right_div">
          <div className="right_div_inside">
            <div className="greet_box">

              <h1> meet & greet</h1>
              <h2>SAY 👋🏻 TO THIS <br /> AWESOME MAKERS</h2>
              <h5>{members} MAKERS IN NOW</h5>

              <div className="right_div_inside1">
                <div className='scan_box'>
                  <img src={scanCodeImage} alt="Example" />
                  <div className="scan_box1">
                    <p>DON’T SEE YOUR NAME?</p>
                    <h2>
                      SCAN TO <br /> CHECK IN
                    </h2>
                  </div>
                </div>

                <p>LAST UPDATED<span> 2 MIN AGO</span></p>

              </div>
            </div>

          </div>
        </div>

        {/* ############################################################### */}
        <div className="card_container">
          <div className="card_row">

            {peopleRef.current.map((person, index) => (
              // <Thanos snap={snap}>
              <Card
                key={person.id}
                person={person}
                extraPerson={extraPeopleRef.current[index]}
                isFlipped={flipStates[index]}
                // isVanishing={vanishingIndices.includes(index)}
              />
              // </Thanos>
            ))}
          </div>

          {/* ############################################################### */}
        </div>
      </div>
    </>
  )
}

export default Display
