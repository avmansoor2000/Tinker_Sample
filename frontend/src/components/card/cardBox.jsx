// CardBox.js
import React from 'react';
import ReactCardFlip from 'react-card-flip';

function CardBox({ card, isFlipped, onDoubleClick, index }) {
  return (
    <ReactCardFlip
      flipDirection="vertical"
      isFlipped={isFlipped}
      onDoubleClick={onDoubleClick}
    >
      <div className="card_box">
        <img src={card.image} alt="Example" />
        <span className="mentor_tag">MENTOR</span>
        <div className="name_text">
          <h3>{card.name}</h3>
          <p>OUT IN 2 MIN</p>
        </div>
      </div>
      <div className="card_box" onClick={() => onDoubleClick(index)}>
        <h1>doji</h1>
      </div>
    </ReactCardFlip>
  );
}

export default CardBox;
