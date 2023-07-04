import React, { useEffect, useState } from 'react';

const ExponentialSearchVisualizer = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [steps, setSteps] = useState([]);
    const [foundIndex, setFoundIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [low, setLow] = useState(-1);
    const [high, setHigh] = useState(-1);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const newArray = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 100)
        ).sort((a, b) => a - b);
        setArray(newArray);
        setTarget('');
        setSteps([]);
        setFoundIndex(null);
        setCurrentIndex(null);
        setLow(-1);
        setHigh(-1);
    };

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const handleSearch = async () => {
        setIsSearching(true);
        const arr = array;
        const x = parseInt(target);
        let bound = 1;
        while (bound < arr.length && arr[bound] < x) {
            bound *= 2;
        }
        const start = bound / 2;
        const end = Math.min(bound, arr.length - 1);

        const result = await binarySearch(arr, start, end, x);
        setSteps(result);
        setIsSearching(false);
    };

    const binarySearch = async (arr, start, end, x) => {
        let left = start;
        let right = end;
        const steps = [];

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push(mid); 

            setCurrentIndex(mid);
            setLow(left);
            setHigh(right);

            await sleep(1500); 

            if (arr[mid] === x) {
                setFoundIndex(mid);
                return steps;
            } else if (arr[mid] < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        setFoundIndex(-1);
        return steps;
    };

    const handleReset = () => {
        generateArray();
    };

    const isResetDisabled = isSearching || steps.length === 0;
    const isSearchDisabled = isSearching || target === '' || steps.length > 0 || array.length === 0;

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <div className='pb-4'>
                        <button onClick={generateArray} disabled={isSearching} class="btn btn-outline-primary">
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
                                onChange={(e) => setTarget(e.target.value)}
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
                    {array.map((num, index) => (
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
                            {num}
                        </div>
                    ))}
                </div>
                <div>
                    {foundIndex && (
                        <h5 className='h5'>Found Index : {foundIndex === -1 ? "Not Found" : foundIndex}</h5>
                    )}
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="h2">Exponential Search</h2>
                        <p class="fs-6">
                            In the realm of computer science, efficient search algorithms are crucial for optimizing performance and reducing time complexities. Exponential search is one such algorithm that strikes a balance between simplicity and efficiency. In this article, we will delve into the workings of exponential search, providing a step-by-step explanation with the aid of a real-life example. Additionally, we will explore the time and space complexities associated with this algorithm, shedding light on its effectiveness in practical scenarios.
                        </p>
                        <h5 class="h5">
                            What is Exponential Search?
                        </h5>
                        <p class="fs-6">
                            Exponential search is a searching algorithm designed to locate an element within a sorted array. It follows a divide-and-conquer approach, which allows it to significantly reduce the number of iterations required compared to linear search. The algorithm operates by performing a binary search within exponentially increasing subranges of the array until the desired element is found.
                        </p>
                        <h5 class="h5">
                            Applying Exponential Search to an Array of Numbers:
                        </h5>
                        <p class="fs-6">
                            Let's consider an array of numbers: [1, 4, 7, 9, 12, 17, 20, 25, 28, 35]. Our objective is to find the position of the element 17 within this sorted array.
                            <br /><br />
                            1. Initialize the variables: <br />
                            - Set the index (i) to 1. <br />
                            - Set the exponent (exp) to 2.
                            <br /><br />

                            2. Exponential search begins: <br />
                            - Check if the element at index i matches the desired value. <br />
                            - If it does, the search is complete, and the index is returned. <br />
                            - If the element at index i is greater than the desired value, proceed to step 4.
                            <br /><br />
                            3. Increment the index: <br />
                            - Double the value of the index (i *= 2). <br />
                            - If the new index exceeds the array length, set it to the last element's index.
                            <br /><br />
                            4. Perform a binary search: <br />
                            - Set the start index (start) to (i / 2). <br />
                            - Set the end index (end) to the minimum of (i - 1) and the array length.
                            <br /><br />
                            5. Binary search: <br />
                            - Calculate the middle index (mid) as (start + end) / 2. <br />
                            - If the middle element matches the desired value, return its index. <br />
                            - If the middle element is greater than the desired value, update the end index to (mid - 1). <br />
                            - If the middle element is less than the desired value, update the start index to (mid + 1). <br />
                            - Repeat steps 5 until the element is found or the range is exhausted.
                            <br /><br />
                            6. Repeat steps 2-5 until the desired element is found or the entire array is traversed.
                            <br /><br />
                            In our example, the exponential search would compare the element at index 1 (4) to the desired value (17). As 4 is less than 17, it proceeds to step 3, doubling the index to 2. The algorithm continues this process until it reaches the subrange [9, 12, 17]. Finally, a binary search is performed within this subrange, resulting in the element being found at index 5.
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Exponential search presents an efficient alternative to linear search, especially when dealing with sorted arrays. By using an exponentially increasing range and subsequent binary searches, this algorithm reduces the number

                            of iterations required to locate an element. With its straightforward implementation, exponential search strikes a balance between simplicity and efficiency.

                            Understanding the step-by-step process and the associated complexities of exponential search helps developers make informed decisions when selecting search algorithms for their applications. By leveraging its power, programmers can optimize search operations, leading to improved performance in real-life scenarios where time efficiency is crucial.
                        </p>
                    </div>
                    <div class="col-lg-4 table-responsive">
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
            </div>
        </>
    );
};

export default ExponentialSearchVisualizer;
