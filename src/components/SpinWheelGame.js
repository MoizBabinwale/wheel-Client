// SpinWheelGame.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../actions/api";

function SpinWheelGame() {
  const [cashbackOffer, setCashbackOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile) {
      setUserName(profile.data.name);
      getWheelData();
    } else {
      navigate("/login");
    }
  }, []);

  const getWheelData = async () => {
    try {
      const response = await axios.get(API + "/getAllOffers", { headers: { "Content-Type": "application/json" } });
      if (response.status === 200) {
        console.log(response);
        var allOffers = response.data.data;
        setOffers(allOffers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API + "/spin-wheel"); // API endpoint to generate cashback offer
      setCashbackOffer(response.data.offer);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="container">
        <h2>Spin Wheel Game for {userName}</h2>
        <div className="centered-wheel">
          <div>
            <div className="flex gap-6 mb-2">
              <ul>
                <span className="font-bold">OFFERS :</span>
                {offers.map((item, index) => (
                  <li key={index} className={item === cashbackOffer ? "bg-blue-400 p-2 rounded-sm border-yellow-400 border-2" : ""}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="spin-button" onClick={handlePlay} disabled={isLoading}>
            {isLoading ? "Spinning..." : "Play"}
          </button>
        </div>
        {cashbackOffer && (
          <div>
            <h3>Your Cashback Offer</h3>
            <b>{cashbackOffer}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpinWheelGame;
