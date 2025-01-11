import './App.css';
import Intro from './Intro';
import About from './About';
import Contact from './Contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#fff', padding: '10px', zIndex: 1000, display: 'flex', justifyContent: 'flex-start' }}>
        <button onClick={() => scrollToSection('intro')} className="home-button">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} />
          </div>
          Home
        </button>
        <button onClick={() => scrollToSection('about')} className="home-button">
          <div className="icon">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          About
        </button>
        <button onClick={() => scrollToSection('contact')} className="home-button">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          Contact
        </button>
      </nav>
      <div style={{ paddingTop: '50px' }}>
        <section id="intro">
          <Intro />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
        
      </div>
    </div>
  );
};

export default App;