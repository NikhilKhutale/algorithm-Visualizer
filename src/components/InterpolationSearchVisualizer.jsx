import React, { useEffect, useState } from 'react';

const InterpolationSearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [steps, setSteps] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchComplete, setSearchComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);
  const [pos, setPos] = useState(-1);

  useEffect(() => {
    generateArray();
  }, []);

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
      } else { end = pos - 1 };

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

  const handleReset = () => {
    generateArray();
  };

  const isResetDisabled = searchComplete || steps.length === 0;
  const isSearchDisabled = searchComplete || target === '' || steps.length > 0 || array.length === 0;

  return (
    <>
      <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <div className='pb-4'>
            <button onClick={generateArray} disabled={searchComplete} class="btn btn-outline-primary">
              <i class="fa-solid fa-shuffle"></i>
            </button>
            <button onClick={handleReset} disabled={isResetDisabled} class="btn btn-secondary">
              <i class="fa-solid fa-rotate"></i>
            </button>
          </div>
          <div className='row'>
            <div className='col-7 col-lg-3'>
              <input
                type="number"
                placeholder="Enter a target"
                value={target}
                onChange={handleTargetChange}
                class="form-control "
              />
            </div>
            <div className='col-4 col-lg-3'>
              <button onClick={interpolationSearch} disabled={isSearchDisabled} class="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {array.map((value, index) => (
            <div
              key={index}
              className='array-item'
              style={{
                backgroundColor:
                  foundIndex === index
                    ? '#aaffaa'
                    : currentIndex === index
                      ? '#ffffaa'
                      : start <= index && index <= end
                        ? '#ffaaaa'
                        : 'transparent',
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <div>
          {foundIndex !== null && (
            <span>
              Found Index : {foundIndex === -1 ? 'Not Found' : foundIndex}
            </span>
          )}
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="h2">Interpolation Search</h2>
            <p class="fs-6">
              In the realm of computer science and data analysis, efficient search algorithms play a vital role in retrieving desired information from large datasets. One such algorithm, interpolation search, stands out for its ability to significantly reduce search time by intelligently estimating the target's probable location. In this article, we will delve into the intricacies of interpolation search, providing a step-by-step explanation, along with a real-life example. Additionally, we will explore the time complexities associated with this algorithm and its practical applications.
            </p>
            <h5 class="h5">
              What is Interpolation Search?
            </h5>
            <p class="fs-6">
              Interpolation search is an improvement over binary search, especially when the data is uniformly distributed. This algorithm operates on sorted arrays and exploits the range of values within the array to estimate the probable location of the target element. Instead of halving the search space as in binary search, interpolation search calculates the position of the target element by considering its value relative to the minimum and maximum elements in the array.
            </p>
            <h5 class="h5">
              Step-by-Step Explanation:
            </h5>
            <p class="fs-6">
              1. Sort the array: Before employing interpolation search, it is crucial to ensure that the array is sorted in ascending order. This enables efficient search operations.
              <br /><br />
              2. Calculate the interpolation position: To estimate the target's position, the algorithm employs an interpolation formula. It takes into account the minimum and maximum values of the array and the target element. The interpolation formula is as follows:
              <br /><br />
              position = low + ((target - array[low]) * (high - low)) / (array[high] - array[low])
              <br /><br />
              Here, 'low' and 'high' represent the indices of the current search range.
              <br /><br />
              3. Check the estimation: <br />
              a. If the estimation matches the target element, return the index. <br />
              b. If the estimation is greater than the target, perform the search on the left subarray (low to position - 1). <br />
              c. If the estimation is smaller than the target, perform the search on the right subarray (position + 1 to high).
              <br /><br />

              4. Repeat steps 2 and 3 until the target element is found or the search range becomes empty.
            </p>
            <h5 class="h5">
              Real-Life Example:
            </h5>
            <p class="fs-6">
              Consider a phone directory with names sorted in alphabetical order. Let's say we want to find the phone number associated with the name "John." We can employ interpolation search to locate the entry efficiently.
              <br /><br />
              1. Sort the phone directory by name.
              <br /><br />
              2. Calculate the interpolation position using the name "John," the minimum name in the directory, and the maximum name in the directory.
              <br /><br />
              3. Compare the estimated name with "John."
              <br /><br />
              a. If they match, retrieve the corresponding phone number.
              <br /><br />
              b. If the estimated name is greater, perform the search on the left subarray (before the estimated position).
              <br /><br />
              c. If the estimated name is smaller, perform the search on the right subarray (after the estimated position).
              <br /><br />
              4. Repeat steps 2 and 3 until the target name is found or the search range becomes empty.
            </p>
            <h5 class="h5">
              Conclusion:
            </h5>
            <p class="fs-6">
              Interpolation search is a powerful searching technique that provides faster retrieval of data from sorted arrays, especially when the data is uniformly distributed. By estimating the probable position of the target element, interpolation search eliminates unnecessary comparisons, leading to reduced search times. Although it may not always outperform binary search in terms of worst-case scenarios,
              interpolation search offers significant advantages when applied to real-world scenarios with uniformly distributed data. Understanding its step-by-step process and time complexities enables developers and data analysts to utilize this algorithm effectively in various applications, ranging from phone directories to large-scale datasets.
            </p>
          </div>
          <div class="col-lg-4">
            <h2 class="h2">Complexities</h2>
            <table class="table table-dark table-hover table-bordered text-center table-futuristic">
              <thead>
                <tr>
                  <th scope="col">Scenario</th>
                  <th scope="col">Time Complexity</th>
                  <th scope="col">Space Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Best case</th>
                  <td>O(1)</td>
                  <td>O(1)</td>
                </tr>
                <tr>
                  <th scope="col">Worst case</th>
                  <td>O(n)</td>
                  <td>O(1)</td>
                </tr>
                <tr>
                  <th scope="col">Average case</th>
                  <td>O(log log n)</td>
                  <td>O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>
  );
};

export default InterpolationSearchVisualizer;
