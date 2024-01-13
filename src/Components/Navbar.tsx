import '../App.css';
import { useState,useEffect } from 'react';
function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
      setIsDarkMode(prevMode => !prevMode);
    }

    useEffect (() => {
      document.body.classList.toggle('dark-mode', isDarkMode)
    }, [isDarkMode]);
  return (
    <div className='nav'>
        <h3>Where in the world?</h3>
        <button onClick={toggleMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
    </div>
  )
}

export default Navbar