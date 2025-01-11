import './contact.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: ''
  });

  const [temperature, setTemperature] = useState(null); // เก็บข้อมูลอุณหภูมิ
  const [error, setError] = useState(null); // เก็บข้อความเมื่อเกิดข้อผิดพลาด
  const [temperatureData, setTemperatureData] = useState([]); // เก็บข้อมูลอุณหภูมิสำหรับกราฟ
  const [labels, setLabels] = useState([]); // เก็บข้อมูลเวลา
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // เก็บข้อมูลเวลา

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "3a4907f275d43b762753e70e7f243fee"; // ใส่ API Key ของคุณ
      const lat = 13.7563; // ตัวอย่าง ละติจูดของกรุงเทพฯ
      const lon = 100.5018; // ตัวอย่าง ลองจิจูดของกรุงเทพฯ
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const temp = response.data.main.temp; // ดึงค่าอุณหภูมิ
          setTemperature(temp);
          setTemperatureData((prevData) => {
            const newData = [...prevData, temp];
            return newData.length > 3 ? newData.slice(1) : newData; // Keep only the latest 10 values
          });
          setLabels((prevLabels) => {
            const newLabels = [...prevLabels, new Date().toLocaleTimeString()];
            return newLabels.length > 3 ? newLabels.slice(1) : newLabels; // Keep only the latest 10 labels
          });
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (err) {
        setError("Unable to fetch data");
      }
    };

    fetchWeatherData();
    const weatherInterval = setInterval(fetchWeatherData, 1000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // อัพเดตทุก 1 วินาที

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h2 className="c-title">Contact Me</h2>
          <div className="c-info">
            <div className="c-info-item">
              <FontAwesomeIcon icon={faEnvelope} className="c-icon" />
              <span>kunanon@gmail.com</span>
            </div>
            <div className="c-info-item">
              <FontAwesomeIcon icon={faPhone} className="c-icon" />
              <span>0626105545</span>
            </div>
            <div className="c-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="c-icon" />
              <span>169, Soi Sukhumvit 101/1, Sukhumvit Road, Bang Chak Subdistrict, Phra Khanong District, Bangkok, 10260.</span>
            </div>
          </div>
        </div>
        <div className="c-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '300px' }}>
        <h1>Weather Information</h1>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : temperature !== null ? (
          <p>อุณหภูมิในพื้นที่: {temperature}°C</p>
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
        <p>Current Time: {currentTime}</p>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Contact;