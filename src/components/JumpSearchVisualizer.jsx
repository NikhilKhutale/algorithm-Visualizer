import React, { useEffect, useState } from 'react';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const JumpSearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [searchIndex, setSearchIndex] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(-1);
  const [currentElement, setCurrentElement] = useState(-1);
  const [jumpSize, setJumpSize] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = async () => {
    const newArray = Array.from(new Set(Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 100)
    ))).sort((a, b) => a - b);
    setArray(newArray);
    setTarget('');
    setSearchIndex(null);
    setCurrentBlock(-1);
    setCurrentElement(-1);
    setJumpSize(-1)
    setIsSearching(false);
  };

  const handleTargetChange = (event) => {
    setTarget(parseInt(event.target.value));
  };

  const jumpSearch = async () => {
    setIsSearching(true);
    const arr = array;
    const n = arr.length;
    const jumpSize = Math.floor(Math.sqrt(n));
    let step = jumpSize;
    let prev = 0;
    setJumpSize(jumpSize)

    while (arr[Math.min(step, n) - 1] < target) {
      setCurrentBlock(prev);
      prev = step;
      setCurrentElement(arr[Math.min(step, n) - 1]);
      step += jumpSize;
      if (prev >= n) {
        setSearchIndex(-1);
        setCurrentBlock(-1);
        setJumpSize(-1);
        setCurrentElement(-1);
        setIsSearching(false);
        return;
      }
      await sleep(500);
    }

    while (arr[prev] < target) { 
      setCurrentBlock(prev);
      setCurrentElement(arr[prev]);
      prev++;
      if (prev === Math.min(step, n)) {
        setSearchIndex(-1);
        setCurrentBlock(-1);
        setJumpSize(-1)
        setCurrentElement(-1);
        setIsSearching(false);
        return;
      }
      await sleep(500); 
    }

    if (arr[prev] === target) { 
      setSearchIndex(prev);
    } else {
      setSearchIndex(-1);
    }

    setCurrentBlock(-1);
    setJumpSize(-1);
    setCurrentElement(-1);
    setIsSearching(false);
  };

  const reset = () => {
    generateArray()
  };

  return (
    <>
      <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <div className='pb-4'>
            <button onClick={generateArray} disabled={isSearching} class="btn btn-outline-primary">
              <i class="fa-solid fa-shuffle"></i>
            </button>
            <button onClick={reset} disabled={isSearching || searchIndex === null} class="btn btn-secondary">
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
              <button onClick={jumpSearch} disabled={isSearching || target === '' || array.length === 0} class="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {array.map((item, index) => (
            <div
              key={index}
              className={`array-item ${index >= currentBlock && index < (currentBlock + jumpSize) ? 'current-block' : ''
                } ${item === currentElement ? 'current-element' : ''} ${index === searchIndex ? 'found-element' : ''
                }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {searchIndex !== null && (
            <span>
              Found Index : {searchIndex === -1 ? 'Not Found' : searchIndex}
            </span>
          )}
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="h2">Binary Search</h2>
            <p class="fs-6">
              Searching is a fundamental operation in computer science, and various algorithms have been developed to efficiently find elements in a collection of data. One such algorithm is Jump Search, which combines the advantages of linear and binary search methods. In this article, we will explore the concept of Jump Search, provide a step-by-step guide with a real-life example, and analyze its complexities.
            </p>
            <h5 class="h5">
              What is Jump Search?
            </h5>
            <p class="fs-6">
              Jump Search is an algorithm used to search for a specific element in a sorted array by making a jump or step size to cover a range of elements. It works by dividing the array into blocks and then checking which block the target element might be located in. Once the appropriate block is found, a linear search is performed within that block.
            </p>
            <h5 class="h5">
              Applying Jump Search to an Array of Numbers:
            </h5>
            <p class="fs-6">
              Let's consider a practical example to understand how Jump Search works. Suppose we have an array of numbers: [2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]. Our goal is to find the index of the number 16.
              <br /><br />
              1. Step Size Determination: <br />
              The first step in Jump Search is to determine the step size. The optimal step size is the square root of the array's length. In our case, the array length is 11, so the step size would be √11, which is approximately 3.32. Since we cannot have a fraction as a step size, we round it down to the nearest whole number, which is 3.
              <br /><br />
              2. Jumping through Blocks: <br />
              We start by jumping from index 0 to index 3 and comparing the element at index 3 (value 12) with our target value (16). As the target value is greater, we continue to the next block.
              <br /><br />
              3. Jumping Again: <br />
              We now jump from index 3 to index 6 and compare the element at index 6 (value 24) with the target value. Again, the target value is greater, so we proceed to the next block.
              <br /><br />
              4. Linear Search within the Block: <br />
              We arrive at index 9 and perform a linear search within the block [7, 8, 9]. The element at index 9 (value 36) is not equal to our target value, so we move back to the previous index.
              <br /><br />
              5. Final Comparison: <br />
              We find ourselves at index 8 and compare the element at index 8 (value 32) with our target value. As 32 is less than 16, we conclude that the target value does not exist in the array.
            </p>
            <h5 class="h5">
              Real-Life Example:
            </h5>
            <p class="fs-6">
              Let's consider a real-life scenario to illustrate the practical application of Jump Search. Imagine you are searching for a specific book in a library. The books in the library are arranged in a sorted order based on their titles. In this case, Jump Search can be applied to efficiently locate the desired book.
              <br /><br />
              Suppose you are searching for a book titled "The Great Gatsby" and you know that the library has a total of 1000 books. You can start by taking steps of 10 books at a time, starting from the first book. By quickly glancing through the titles of the books in each step, you can determine which block the book might be in.
              <br /><br />
              Once you have identified the block, you can perform a linear search within that block to find the exact location of "The Great Gatsby." This approach minimizes the number of comparisons required, making the search more efficient than a simple linear search.
            </p>
            <h5 class="h5">
              Conclusion:
            </h5>
            <p class="fs-6">
              Jump Search is a practical and efficient algorithm for searching for elements in a sorted array. By dividing the array into blocks and performing a jump based on a predetermined step size, it combines the benefits of linear and binary search approaches. In this article, we provided a step-by-step guide to understanding Jump Search, demonstrated its application with a real-life example, and analyzed its complexities. Incorporating Jump Search into your search algorithms toolkit can significantly enhance search performance and reduce time complexity in certain scenarios.
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
                  <td>O(sqrt(n))</td>
                  <td>O(1)</td>
                </tr>
                <tr>
                  <th scope="col">Average case</th>
                  <td>O(sqrt(n))</td>
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

export default JumpSearchVisualizer;
