import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isIncrement, setIsIncrement] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState();
  const [popupVisible, setPopupVisible] = useState(false); 
  const [popupMessage, setPopupMessage] = useState(''); 
  
  const showAlert = (newCount) => {
    let message = '';
    if (newCount === 10) {
      message = 'Congratulations! You reached 10.';
    } else if (newCount === 100) {
      message = 'Great! You reached 100.';
    } else if (newCount === 1000) {
      message = 'Amazing! You reached 1000.';
    }

    if (message) {
      setPopupMessage(message);
      setPopupVisible(true);
    }
  };

  const changeBackgroundColor = (newCount) => {
    if (newCount >= 1000) {
      return 'background-red';
    } else if (newCount >= 100) {
      return 'background-blue';
    } else if (newCount >= 10) {
      return 'background-green';
    }
    return 'background-white';
  };

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount =
        prevCount < 10 ? prevCount + 1 :
        prevCount < 100 ? prevCount + 10 :
        prevCount < 1000 ? prevCount + 100 : prevCount;

      const newBackgroundClass = changeBackgroundColor(newCount);
      setBackgroundClass(newBackgroundClass); 
      showAlert(newCount);

      if (newCount >= 1000) {
        setIsIncrement(false);
      }

      return newCount;
    });
  };

  const decrementCount = () => {
    setCount((prevCount) => {
      const newCount =
        prevCount > 100 ? prevCount - 100 :
        prevCount > 10 ? prevCount - 10 :
        prevCount > 0 ? prevCount - 1 : prevCount;

      const newBackgroundClass = changeBackgroundColor(newCount);
      setBackgroundClass(newBackgroundClass); 

      showAlert(newCount);

      // If the count reaches 0, allow incrementing again
      if (newCount === 0) {
        setIsIncrement(true);
      }

      return newCount;
    });
  };

  useEffect(() => {
    setPopupMessage('Welcome! Start counting.');
    setPopupVisible(true);
  }, []);

  useEffect(() => {
    if (popupVisible) {
      const timer = setTimeout(() => {
        setPopupVisible(false);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [popupVisible]);

  return (
    <div className={`${backgroundClass} container transition`}>
      <button onClick={isIncrement ? incrementCount : decrementCount}>
        {isIncrement ? '+' : '-'}
      </button>
      <p>Count: {count}</p>
      
      {popupVisible && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setPopupVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
