import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faUserDoctor, faPerson, faNotesMedical, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

import Header from '../Header';

const Home: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000); 
  };

  return (
    <>
      <Header />
      <div className="home-bg">
        {isLoading ? (
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} /> 
          </div>
        ) : (
          <div className='home-bt'>
            <nav className="navbar">
              <ul className="nav-links">
                <li>
                  <Link to="#" className="nav-link" onClick={() => handleNavigation('/doctors')}>
                    <FontAwesomeIcon icon={faUserDoctor} /> Doctors
                  </Link>
                </li>
                <li>
                  <Link to="#" className="nav-link" onClick={() => handleNavigation('/patient')}>
                    <FontAwesomeIcon icon={faPerson} /> Patients
                  </Link>
                </li>
                <li>
                  <Link to="#" className="nav-link" onClick={() => handleNavigation('/appointment')}>
                    <FontAwesomeIcon icon={faCalendarCheck} /> Appointments
                  </Link>
                </li>
                <li>
                  <Link to="#" className="nav-link" onClick={() => handleNavigation('/medicalrecord')}>
                    <FontAwesomeIcon icon={faNotesMedical} /> Medical Records
                  </Link>
                </li>
                <li>
                  <Link to="#" className="nav-link" onClick={() => handleNavigation('/billing')}>
                    <FontAwesomeIcon icon={faArrowUpWideShort} /> Billings
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="body">
              <h1 className="head"> We are ready to <span className='span'>help your health</span> problems</h1>
              <p className="home-text">
                In times like today, your health is very important, especially since
                the number of COVID-19 cases is increasing day by day, so we are ready
                to help you with your health consultation
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
