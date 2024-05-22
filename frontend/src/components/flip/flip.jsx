import React,{useState,useEffect} from 'react';
import ReactCardFlip from 'react-card-flip';
import './Flip.css'

const Flip = () => {

    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
          setIsFlipped(prevState => !prevState);
        }, 10000); // 20000 ms = 20 seconds
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
      }, []);


    function flipCard(){
        setIsFlipped(!isFlipped)
    }

  return (
    
    <ReactCardFlip flipDirection='horizontal'  isFlipped={isFlipped}>
        <div className='card' onClick={flipCard}>
            <h1>Front</h1>
        </div>
        <div className='card card-back' onClick={flipCard}>
            <h1>Back</h1>
        </div>
    </ReactCardFlip>
  )
}

export default Flip