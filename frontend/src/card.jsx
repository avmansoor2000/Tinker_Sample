import './card.css'
import { useEffect, useState } from 'react'
import scanCodeImage from './assets/images/scan_code.png';
import test from './assets/images/test.jpg';

function Card() {

    const [cardsData, setCardsData] = useState([]);
    // Fetch data from the API
    useEffect(() => {
        fetch("https://app-api.tinkerhub.org/checkin/active")
            .then((response) => response.json())
            .then((data) => {
                setCardsData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            <div className="TV_fixed">
                <div className="right_div">
                    <div className="right_div_inside">

                        <h1> meet & greet</h1>
                        <h2>SAY 👋🏻 TO THIS AWESOME MAKERS</h2>
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
                <div className="left_div">
                    {/* card  */}
                    <div className='card_row_1'>
                    {cardsData.map((card, index) => (



                            <div className="card_box">
                                <img src={test} alt="Example" />
                                <span className="mentor_tag">MENTOR</span>
                                <div className="name_text">
                                    <h3>{card.name} </h3>
                                    <p>OUT IN 2 MIN</p>
                                </div>
                            </div>
                    ))}
                        </div>
                </div>
            </div>
        </>
    )
}

export default Card
