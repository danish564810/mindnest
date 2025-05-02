import React from "react";
import "../Card/card.css";
const Card = ({ title, children,bodyContent, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h5 className="mb-0">{title}</h5>
      </div>

      <div className="card-body">
        {children}
        <div className="card-body-inner">
          <div className="details">
            {bodyContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
