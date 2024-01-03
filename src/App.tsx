// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Country {
  name: {
    common: string;
  };
  population: number;
  capital: string;
  region: string;
  flags: {
    svg: string;
    png: string;
  };
  // Add more properties as needed
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterCountries = () => {
    let filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedRegion) {
      filtered = filtered.filter((country) => country.region.includes(selectedRegion));
    }

    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <header>
        <h1>Country Explorer</h1>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onInput={filterCountries}
          />
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              filterCountries();
            }}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </label>
      </header>

      <div id="countries-list">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country-card">
            <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
            <div className="details">
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            </div>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
