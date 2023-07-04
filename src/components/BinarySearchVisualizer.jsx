import React, { useState, useEffect } from 'react';

const BinarySearchVisualizer = () => {
    const [data, setData] = useState([]);
    const [target, setTarget] = useState(null);
    const [foundIndex, setFoundIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [low, setLow] = useState(-1);
    const [high, setHigh] = useState(-1);
    const [mid, setMid] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        generateData();
    }, []);

    const generateData = () => {
        const newData = Array.from({ length: 10 }, () =>
            Math.floor(Math.random() * 100)
        ).sort((a, b) => a - b);
        setData(newData);
        setTarget(newData[Math.floor(Math.random() * newData.length)]);
        setLow(-1);
        setHigh(-1);
        setMid(null);
        setCurrentIndex(null);
        setFoundIndex(null);
    };

    const handleInputChange = (event) => {
        setTarget(parseInt(event.target.value));
    };

    const handleSearch = () => {
        setIsSearch(true);
        setLow(0);
        setHigh(data.length - 1);
        setCurrentIndex(null);
        setFoundIndex(null);
        binarySearch(data, target);
    };

    const binarySearch = (arr, x) => {
        let l = 0;
        let r = arr.length - 1;

        const binarySearchStep = () => {
            if (l > r) {
                setFoundIndex(-1);
                setIsSearch(false);
                return;
            }

            const m = Math.floor((l + r) / 2);
            setMid(m);
            setCurrentIndex(m);

            if (arr[m] === x) {
                setFoundIndex(m);
                setIsSearch(false);
                return;
            } else if (arr[m] < x) {
                setLow(m + 1);
                l = m + 1;
            } else {
                setHigh(m - 1);
                r = m - 1;
            }

            setTimeout(binarySearchStep, 1000); 
        };

        setTimeout(binarySearchStep, 1000); 
    };

    const handleReset = () => {
        generateData();
    };

    const isResetDisabled = isSearch || foundIndex === null;
    const isSearchDisabled = isSearch || target === '' || data.length === 0;

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <div className='pb-4'>
                        <button onClick={generateData} disabled={isSearch} class="btn btn-outline-primary">
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
                                onChange={handleInputChange}
                                class="form-control "
                            />
                        </div>
                        <div className='col-4 col-lg-3'>
                            <button onClick={handleSearch} disabled={isSearchDisabled} class="btn btn-outline-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center flex-wrap">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className='array-item'
                            style={{
                                backgroundColor:
                                    foundIndex === index
                                        ? '#aaffaa'
                                        : currentIndex === index
                                            ? '#ffffaa'
                                            : low <= index && index <= high
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
                        <h2 class="h2">Binary Search</h2>
                        <p class="fs-6">
                            In the realm of computer science and algorithms, the concept of binary search stands tall as a fundamental and efficient search technique. Binary search is a method that operates on a sorted array, dividing it into two halves and repeatedly narrowing down the search range until the desired element is found. This article will delve into the workings of binary search, explaining its step-by-step process using a real-life example and an array of numbers. Additionally, we will explore the time and space complexities associated with binary search, highlighting its remarkable efficiency.
                        </p>
                        <h5 class="h5">
                            What is Binary Search?
                        </h5>
                        <p class="fs-6">
                            Binary search follows a divide-and-conquer approach, significantly reducing the search space with each iteration. It begins by examining the middle element of the array. If the middle element matches the target value, the search is successful. Otherwise, if the target value is smaller, the search is continued in the left half of the array. Conversely, if the target value is larger, the search proceeds in the right half. This process is repeated until the target value is found or until the search range becomes empty, indicating that the value is not present in the array.
                        </p>
                        <h5 class="h5">
                            Real-Life Example:
                        </h5>
                        <p class="fs-6">
                            To better understand binary search, let's consider a real-life scenario. Imagine you have a bookshelf filled with books arranged in alphabetical order by the authors' last names. You want to find a particular book, "The Great Gatsby" by F. Scott Fitzgerald.
                            <br /><br />
                            1. Identify the range: Begin by noting the first and last books on the shelf. This range represents the entire array of books.
                            <br /><br />
                            2. Locate the middle book: Find the book that falls halfway between the first and last book. In our example, this might be "Moby-Dick" by Herman Melville.
                            <br /><br />
                            3. Compare the middle book: Compare the title of the middle book with the target book, "The Great Gatsby." If they match, the search is complete, and you have found the desired book.
                            <br /><br />
                            4. Adjust the range: If the middle book comes before "The Great Gatsby" in alphabetical order, you can eliminate the left half of the range, including the middle book itself. Otherwise, if the middle book comes after "The Great Gatsby," discard the right half of the range, including the middle book.
                            <br /> <br />
                            5. Repeat the process: Continue the process by returning to step 2 with the adjusted range. Locate the new middle book and compare it with "The Great Gatsby."
                            <br /><br />
                            6. Termination: Repeat steps 3 to 5 until either the target book is found or the search range becomes empty.
                        </p>
                        <h5 class="h5">
                            Applying Binary Search to an Array of Numbers:
                        </h5>
                        <p class="fs-6">
                            Let's now apply binary search to an array of numbers [1, 3, 5, 7, 9, 11, 13, 15]. Our goal is to find the index of the number 7.
                            <br /><br />
                            1. Identify the range: The initial range is from index 0 (first element) to index 7 (last element).
                            <br /><br />
                            2. Locate the middle element: Calculate the middle index as (0 + 7) / 2 = 3. The middle element is 7.
                            <br /><br />
                            3. Compare the middle element: Since the middle element matches the target value, the search is successful.
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Binary search is a powerful search algorithm that employs a divide-and-conquer strategy to efficiently locate a target element in a sorted array. By dividing the search range in half with each iteration, binary search drastically reduces the number of elements to be examined. This approach ensures a logarithmic time complexity, making binary search a go-to solution for efficient searching. By understanding its step-by-step process, as illustrated through a real-life example and an array of numbers, you can harness the potential of binary search in your programming endeavors.
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
                                    <td>O(log n)</td>
                                    <td>O(1)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(log n)</td>
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

export default BinarySearchVisualizer;
