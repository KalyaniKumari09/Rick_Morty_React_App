import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import '../components/CharacterList.css';

const CharacterList = ({ characters }) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCheckboxChange = (filterType, value) => {
    let setter;
    let selectedFilters;
    if (filterType === 'species') {
      setter = setSelectedSpecies;
      selectedFilters = selectedSpecies;
    } else if (filterType === 'gender') {
      setter = setSelectedGender;
      selectedFilters = selectedGender;
    } else if (filterType === 'origin') {
      setter = setSelectedOrigin;
      selectedFilters = selectedOrigin;
    }

    if (selectedFilters.includes(value)) {
      setter(selectedFilters.filter(item => item !== value));
    } else {
      setter([...selectedFilters, value]);
    }
  };

  const handleFilterRemove = (filterType, value) => {
    if (filterType === 'species') {
      setSelectedSpecies(selectedSpecies.filter(item => item !== value));
    } else if (filterType === 'gender') {
      setSelectedGender(selectedGender.filter(item => item !== value));
    } else if (filterType === 'origin') {
      setSelectedOrigin(selectedOrigin.filter(item => item !== value));
    }
  };

  const filteredCharacters = characters
    .filter((character) => 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecies.length === 0 || selectedSpecies.includes(character.species)) &&
      (selectedGender.length === 0 || selectedGender.includes(character.gender)) &&
      (selectedOrigin.length === 0 || selectedOrigin.includes(character.origin.name))
    )
    .sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id);

  return (
    <div className="container">
      <div className="filters">
        <h2>Filters</h2>
        <div>
          <h3>Species</h3>
          <ul>
            <li><input
              type="checkbox"
              checked={selectedSpecies.includes('Human')}
              onChange={() => handleCheckboxChange('species', 'Human')}
            /> Human</li>
            <li><input
              type="checkbox"
              checked={selectedSpecies.includes('Mytholog')}
              onChange={() => handleCheckboxChange('species', 'Mytholog')}
            /> Mytholog</li>
            <li><input
              type="checkbox"
              checked={selectedSpecies.includes('Other Species')}
              onChange={() => handleCheckboxChange('species', 'Other Species')}
            /> Other Species...</li>
          </ul>
        </div>
        <div>
          <h3>Gender</h3>
          <ul>
            <li><input
              type="checkbox"
              checked={selectedGender.includes('Male')}
              onChange={() => handleCheckboxChange('gender', 'Male')}
            /> Male</li>
            <li><input
              type="checkbox"
              checked={selectedGender.includes('Female')}
              onChange={() => handleCheckboxChange('gender', 'Female')}
            /> Female</li>
          </ul>
        </div>
        <div>
          <h3>Origin</h3>
          <ul>
            <li><input
              type="checkbox"
              checked={selectedOrigin.includes('unknown')}
              onChange={() => handleCheckboxChange('origin', 'unknown')}
            /> Unknown</li>
            <li><input
              type="checkbox"
              checked={selectedOrigin.includes('Post-Apocalyptic Earth')}
              onChange={() => handleCheckboxChange('origin', 'Post-Apocalyptic Earth')}
            /> Post-Apocalyptic Earth</li>
            <li><input
              type="checkbox"
              checked={selectedOrigin.includes('Nuptia 4')}
              onChange={() => handleCheckboxChange('origin', 'Nuptia 4')}
            /> Nuptia 4</li>
            <li><input
              type="checkbox"
              checked={selectedOrigin.includes('Other Origins')}
              onChange={() => handleCheckboxChange('origin', 'Other Origins')}
            /> Other Origins...</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="search-sort">
          <div className="selected-filters">
            <h2>Selected Filters</h2>
            {selectedSpecies.map((filter, index) => (
              <span key={index} className="filter-tag">{filter} <button onClick={() => handleFilterRemove('species', filter)}>X</button></span>
            ))}
            {selectedGender.map((filter, index) => (
              <span key={index} className="filter-tag">{filter} <button onClick={() => handleFilterRemove('gender', filter)}>X</button></span>
            ))}
            {selectedOrigin.map((filter, index) => (
              <span key={index} className="filter-tag">{filter} <button onClick={() => handleFilterRemove('origin', filter)}>X</button></span>
            ))}
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button>Search</button>
          </div>
          <div className="sort">
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="asc"> Ascending</option>
              <option value="desc"> Descending</option>
            </select>
          </div>
        </div>
        <div className="character-grid">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;