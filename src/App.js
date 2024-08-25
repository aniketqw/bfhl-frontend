import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      // console.log(parsedInput)
      const res = await axios.post('http://127.0.0.1:8000/bfhl', parsedInput);
      console.log(axios.post('http://127.0.0.1:8000/bfhl', parsedInput));
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    selectedOptions.forEach(option => {
      filteredResponse[option.value] = response[option.value];
    });

    return (
      <div className="filtered-response">
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <h3>Full Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select filters..."
          />
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;