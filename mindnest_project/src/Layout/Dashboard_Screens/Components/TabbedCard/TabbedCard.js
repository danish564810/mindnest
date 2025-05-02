import React, { useState } from 'react';
import '../TabbedCard/tabbedCard.css';

const TabbedCard = ({ title, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const ActiveContent = tabs.find(tab => tab.key === activeTab)?.content;

  return (
    <div className="card">
      <div className="card-header sub-sec  p-0">
        <div className = "subscription-upper-inner d-flex ">
          <div className="payment-insurace w-100">
          <ul className="nav nav-tabs d-flex subTab mb-0">
          {tabs.map(tab => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
          </div>
        </div>
      
      </div>
      <div className="card-body">
        {/* Bootstrap-style tabs */}
        

        {/* Tab-specific content */}
        <div className="card-body-inner">
          <div className="details">
            {ActiveContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedCard;
