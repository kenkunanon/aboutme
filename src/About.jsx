import "./about.css";
import Wse from "./img/tr_page-0001.jpg";
import Me2 from "./img/me2.jpg";
import React, { useState, useEffect, useRef } from 'react';
import C5 from './img/c5.jpg';
import C3 from './img/c3.jpg';
import C4 from './img/c4.jpg';
import C6 from './img/c6.jpg';
import C7 from './img/c7.jpg';
import C8 from './img/ts_page-0001.jpg';
import an from  './img/angular.png';
import re from './img/react.png';
import no from './img/node.png';
import py from './img/python.png';
import js from './img/javascript.png';
import api from './img/api.png';
import ht from './img/html.png';
import tw from './img/Tailwind.png';
import cs from './img/css.png';

const images = [C5, C4, C3, C6, C7, C8];
const descriptions = [
  "Hackathon Innovative Application for Smart Life Season2: Received a 5,000 baht commendation for developing an AI chatbot capable of predicting human emotions.",
  "TESA Top Gun Rally 2024 (Si Racha District, Chonburi Province):Represented the institution in the TASA 2024 competition, contributing to server development by integrating Raspberry Pi and implementing real-time data updates on a dashboard of web socket, as part of the project on Acoustic and AI-Based Predictive Maintenance with Edge Computing.",
  "The certificate is awarded to Kunannon Sriborthong to certify the attendance to Top Gun Rally 2024",
  "The certificate was awarded to our team for achieving the silver ranking in the Top Gun Rally 2024.",
  "Training in Robot Operating System (ROS), AI, and IoT is provided at Kasetsart University (KU).",
  "TESA Top Gun Rally 2023 (Ubon Ratchathani) :Represented the institution in the TASA 2023 competition in Ubon Ratchathani, focusing on hardware development using a Tiny Machine Learning Kit (TinyML Kit) to create a Flood and Drought Monitoring System as part of the competition’s theme."
];

const techStackImages = [
  an, re, no, py, js, api, ht, tw, cs
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    if (!showDescription) {
      resetInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [showDescription]);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetInterval();
  };

  const handleImageClick = () => {
    if (showDescription) {
      resetInterval();
    } else {
      clearInterval(intervalRef.current);
    }
    setShowDescription(!showDescription);
  };

  return (
    <div className="about-container">
      <div className="a">
        <div className="a-left">
          <div className="a-card bg"></div>
          <div className="a-card">
            <img
              src={Me2}
              alt="me2"
              className="a-img"
            />
          </div>
        </div>
        <div className="a-right">
          <h1 className="a-title">About Me</h1>
          <p className="a-sub">  
          I am passionate about the potential of technology to drive innovation and have been actively developing applications, 
          websites, and AI projects since high school. To further enhance my communication skills, 
          I am currently pursuing an English language course at WSE. As the Student President of this department, 
          I have developed strong leadership and teamwork abilities. My technical skills encompass mobile app and web application development,
           database management, and deep learning.
          </p>
          <div className="a-award">
          <img src={Wse} alt="award" className="a-award-img" />
            <div className="a-award-texts">
              <h4 className="a-award-title">Transcript</h4>
              <p className="a-award-desc">
              The transcript includes academic records from the first semester of Year 1 to the first semester of Year 3.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="slideshow">
        <h2 style={{ color: 'gray' }}>Click for seeing detail of Certificates</h2>
        <div className="slideshow-container">
          <button onClick={prevSlide} className="slideshow-button">Previous</button>
          <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" onClick={handleImageClick} />
          <button onClick={nextSlide} className="slideshow-button">Next</button>
        </div>
        {showDescription && (
          <div className="description-card">
            <p>{descriptions[currentIndex]}</p>
          </div>
        )}
      </div>
      <div className="tech-stack">
        <h2 className="tech-stack-title">TECH STACK</h2>
        <div className="tech-stack-grid">
          {techStackImages.map((src, index) => (
            <div key={index} className="tech-stack-item">
              <img src={src} alt={`Tech ${index + 1}`} className="tech-stack-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;