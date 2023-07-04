import React, { useState } from 'react';

const InterpolationSearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [steps, setSteps] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchComplete, setSearchComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);
  const [pos, setPos] = useState(-1);

  const interpolationSearch = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let start = 0;
    let end = array.length - 1;
    let steps = [];
    let found = false;

    while (start <= end && target >= array[start] && target <= array[end]) {

      if (start === end) {
        if (array[start] === target) {
          steps.push(start);
          setSteps(steps);
          setFoundIndex(start);
          found = true;
        } else {
          steps.push(-1);
          setSteps(steps);
          setFoundIndex(null);
        }
        break;
      }

      const pos =
        start +
        Math.floor(((end - start) / (array[end] - array[start])) * (target - array[start]));


      steps.push(pos);
      setCurrentIndex(pos);
      setStart(start);
      setEnd(end);
      setPos(pos);
      
      if (array[pos] === target) {
        setSteps(steps);
        setFoundIndex(pos);
        found = true;
        break;
      }

      if (array[pos] < target) { 
 start = pos + 1
      }else {end = pos - 1};

      setSteps(steps);
      await delay(500); 
    }

    if (!found) {
      steps.push(-1);
      setSteps(steps);
      setFoundIndex(null);
    }

    setSearchComplete(true);
  };

  const generateArray = () => {
    const newArray = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 100)
        ).sort((a, b) => a - b);
    setArray(newArray);
    setTarget('');
    setSteps([]);
    setFoundIndex(null);
    setSearchComplete(false);
    setCurrentIndex(null);
    setStart(-1);
    setEnd(-1);
    setPos(-1);
  };

  const handleTargetChange = (event) => {
    setTarget(parseInt(event.target.value));
  };

  return (
    <div>
      <button onClick={generateArray}>Generate Array</button>
      <div>
        <label htmlFor="target">Target:</label>
        <input type="number" id="target" value={target} onChange={handleTargetChange} />
        <button onClick={interpolationSearch} disabled={searchComplete}>
          Search
        </button>
      </div>
      <div>
        <h3>Array: {array.join(', ')}</h3>
        <h3>Target: {target}</h3>
        <h3>
          Result: {foundIndex !== null ? (foundIndex !== -1 ? `Found at index ${foundIndex}` : 'Not found') : ''}
        </h3>
        <h3>Steps: {steps.join(', ')}</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {array.map((value, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor:
                  foundIndex === index
                    ? '#aaffaa'
                    : currentIndex === index
                    ? '#ffffaa'
                    : start <= index && index <= end
                    ? '#ffaaaa'
                    : 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '5px',
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterpolationSearch;
