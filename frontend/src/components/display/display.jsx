import Card from '../card/card'
import './display.css'
import React, { useState, useEffect, useRef } from 'react';
import scanCodeImage from '../../assets/images/scan_code.png';
import { fetchData } from "../../api/fetchData"
// import InfinityGauntlet from "react-thanos-snap";
// import { Thanos } from "react-thanos";
// import ReactCardFlip from 'react-card-flip';
// import Thanos from "react-thanos-snap"
// import frontData from "../data/frontData.json";
// import backData from "../data/backData.json";
// import test from '../../assets/images/test.jpg'


function Display() {

  // const [people, setPeople] = useState([]);
  // const [extraPeople, setExtraPeople] = useState([]);
  const peopleRef = useRef([]);
  const extraPeopleRef = useRef([]);
  // const [snap, setSnap] = useState(false);
  const [vanishingIndices, setVanishingIndices] = useState([]);
  const [flipStates, setFlipStates] = useState([]);
  const [members, setMembers] = useState(0);



  // Fetch data and set states
  useEffect(() => {
    async function getData() {
      const { frontData, backData, totalMembers } = await fetchData();
      peopleRef.current = frontData;
      extraPeopleRef.current = backData;
      // console.log(frontData,'frontData');
      setMembers(totalMembers)
      setFlipStates(Array(frontData.length).fill(false));
    }
    getData();

    const intervalId = setInterval(getData, 60000);
    return () => clearInterval(intervalId);
  }, []);




  // Set up useEffect to handle auto-flipping cards
  useEffect(() => {
    const flipCard = (index) => {
      console.log(index+'index');
      // Set the flip state of the card at the given index to true
      setFlipStates((prevFlipStates) => {
        const newFlipStates = [...prevFlipStates];
        newFlipStates[index] = true;
        // console.log(newFlipStates);
        return newFlipStates;
      })

      // After 20 seconds, set the flip state of the card back to false
      setTimeout(() => {
        // console.log('30seconds setTimeout worked');
        // interval()
        setFlipStates((prevFlipStates) => {
          // console.log(prevFlipStates,'prevFlipStates');
          const newFlipStates = [...prevFlipStates];
          newFlipStates[index] = false;
         
          return newFlipStates;
        });
      }, 30000);
      return () => clearInterval(interval);
    };

    let currentIndex = 0;
    // Set up an interval to flip cards every 5 seconds
    const interval = setInterval(() => {
      flipCard(currentIndex);
      console.log(currentIndex,'currentIndex');
      currentIndex = (currentIndex + 1) % extraPeopleRef.current.length;
      // console.log(currentIndex,'currentIndex');
    }, 1000); // Flip each card every 5 seconds

    // Clean up the interval on component unmount
   return () => clearInterval(interval)
  }, []);



  // const handleSnap = () => {
  //   setSnap(true);
  //   const indicesToVanish = [0, 1]; 
  //   setVanishingIndices(indicesToVanish);

  //   setTimeout(() => {
  //     setPeople((prevPeople) => prevPeople.filter((_, index) => !indicesToVanish.includes(index)));
  //     setExtraPeople((prevExtraPeople) => prevExtraPeople.filter((_, index) => !indicesToVanish.includes(index)));
  //     setFlipStates((prevFlipStates) => prevFlipStates.filter((_, index) => !indicesToVanish.includes(index)));
  //     setVanishingIndices([]);
  //     setSnap(false);
  //   }, 1000);
  // };



  return (
    <>
      {/* <div>
        <button onClick={handleSnap}>Snap!</button>
        <Thanos snap={snap}>
          <div className="card_box" >
            <img src={test} alt="Example" />
            <span className="mentor_tag">MENTOR</span>
            <div className="name_text">
              <h3>Steve Jobs</h3>
              <p>OUT IN 2 MIN</p>
            </div>
          </div>
        </Thanos>
      </div> */}


      <div className="TV_fixed">
        <div className="right_div">
          <div className="right_div_inside">

            <h1> Meet & Greet</h1>
            <h2>SAY 👋🏻 TO THIS <br /> AWESOME MAKERS</h2>
            <h5>{members} MAKERS IN NOW</h5>

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

            {peopleRef.current.map((person, index) => (
              // <Thanos snap={snap}>


              <Card
                key={person.mid}
                person={person}
                extraPerson={extraPeopleRef.current[index]}
                isFlipped={flipStates[index]}
                isVanishing={vanishingIndices.includes(index)}
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
