import React, { useState, useEffect } from 'react';

const tableHeaderStyle = {
    border: "1px solid black",
    padding: "10px",
    backgroundColor: "lightgray",
};

const tableCellStyle = {
    border: "1px solid black",
    padding: "10px",
};


function RadixSortVisualizer() {
    const [array, setArray] = useState([]);
    const [buckets, setBuckets] = useState(new Array(10).fill().map(() => []));
    const [secondBuckets, setSecondBuckets] = useState(new Array(10).fill().map(() => []));
    const [sortedArray, setSortedArray] = useState([]);
    const [sorting, setSorting] = useState(false)

    function generateArray(length, range) {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(Math.floor(Math.random() * range));
        }
        return array;
    }


    function handleGenerateArray() {
        const array = generateArray(20, 100);
        setArray(array);
        setBuckets(new Array(10).fill().map(() => []));
        setSecondBuckets(new Array(10).fill().map(() => []));
        setSortedArray([]);
    }

    useEffect(() => {
        handleGenerateArray();
    }, []);

    async function handleSortArray() {
        setSorting(true)
        const maxDigit = Math.max(...array).toString().length;
        let currentArray = [...array];
        let sortedArray = [];
        let iteration = 1;

        const delay = 1000;

        const updateBuckets = (newBuckets) => {
            if (iteration === 1) {
                setBuckets([...newBuckets]); 
            } else {
                setSecondBuckets([...newBuckets]);
            }
        };

        for (let i = 0; i < maxDigit; i++) {
            const newBuckets = new Array(10).fill().map(() => []);

            for (let j = 0; j < currentArray.length; j++) {
                const digit = Math.floor(currentArray[j] / Math.pow(10, i)) % 10;
                await new Promise((resolve) => setTimeout(resolve, delay)); 
                newBuckets[digit].push(currentArray[j]);
                updateBuckets(newBuckets);
            }

            sortedArray = [].concat(...newBuckets);
            currentArray = sortedArray;

            for (let k = 0; k < sortedArray.length; k++) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                setArray(sortedArray.slice(0, k + 1));
            }

            iteration++;
        }
        setSorting(false)
    }

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={handleGenerateArray} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={handleSortArray} disabled={sorting}>Sort Array</button>
                </div>
                <div className="animate__animated py-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: "250px" }}>
                    {array.map((num, index) => (
                        <div className="animate__animated animate__zoomIn" key={index} style={{ backgroundColor: '#6ec4ff', height: `${num + 20}px`, width: '30px', margin: '2px', position: 'relative' }}>
                            <p style={{
                                position: "absolute",
                                bottom: "-20px",
                                margin: "0",
                                fontSize: "12px",
                                left: "50%",
                                transform: "translateX(-50%)"
                            }}>
                                {num}
                            </p>
                        </div>
                    ))}
                </div>
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-start" >
                        <div class="col-12 mb-4">
                            <div class="table-responsive">
                                <table class="table table-dark table-bordered text-center table-futuristic">
                                    <tbody>
                                        <tr>
                                            <th>Buckets</th>
                                            {/*<!-- Iterate over 'buckets' array -->*/}
                                            {buckets.map((values, i) => (
                                                <td key={i}>{i}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th>Elements</th>
                                            {/*<!-- Iterate over 'buckets' array -->*/}
                                            {buckets.map((values, i) => (
                                                <td key={i}>
                                                    {/* Iterate over 'values' array in each 'bucket' */}
                                                    {values.map((value, j) => {
                                                        const stringValue = value.toString();
                                                        const lastDigit = stringValue.charAt(stringValue.length - 1);

                                                        return (
                                                            <div key={j}>
                                                                {stringValue.slice(0, -1)}
                                                                <span className="last-digit" style={{ color: "red" }}>{lastDigit}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-12 mb-4">
                            <div class="table-responsive">
                                <table class="table table-dark table-bordered text-center table-futuristic">
                                    <tbody>
                                        <tr>
                                            <th>Buckets</th>
                                            {/*<!-- Iterate over 'buckets' array -->*/}
                                            {secondBuckets.map((values, i) => (
                                                <td key={i}>{i}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th>Elements</th>
                                            {/*<!-- Iterate over 'buckets' array -->*/}
                                            {secondBuckets.map((values, i) => (
                                                <td key={i}>
                                                    {/* Iterate over 'values' array in each 'bucket' */}
                                                    {values.map((value, j) => {
                                                        const stringValue = value.toString();
                                                        const secondLastDigit = stringValue.charAt(stringValue.length - 2);

                                                        let formattedValue = stringValue;
                                                        if (stringValue.length === 1) {
                                                            formattedValue = `0${stringValue}`;
                                                        }

                                                        return (
                                                            <div key={j}>
                                                                <span className="second-last-digit" style={{ color: "red" }}>{formattedValue.charAt(0)}</span>
                                                                <span>{formattedValue.charAt(1)}</span>
                                                                <span>{formattedValue.charAt(2)}</span>
                                                                {/* Add more spans for additional digits if needed */}
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="h2">Radix Sort</h2>
                        <p class="fs-6">
                            Among the plethora of sorting algorithms available, Radix Sort stands out for its unique approach to sorting elements. Unlike other popular algorithms such as Quicksort or Mergesort, Radix Sort operates on individual digits or characters of the input elements. This article explores the step-by-step process of Radix Sort using a real-life example and an array of numbers, while discussing its complexities and benefits.
                        </p>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Radix Sort is a non-comparative sorting algorithm that sorts elements by grouping them based on individual digits or characters. The algorithm utilizes the concept of "buckets" to distribute elements into different groups based on the values of the least significant digit to the most significant digit. By repeatedly applying this process, Radix Sort gradually sorts the elements until the entire array is in order.
                        </p>
                        <h5 class="h5">
                            Step-by-Step Explanation:
                        </h5>
                        <p class="fs-6">
                            To illustrate the workings of Radix Sort, let's consider a real-life example of sorting a list of phone numbers. Suppose we have the following phone numbers in an array: [9876543210, 1234567890, 5551234567, 7890123456, 3216549870]. We'll perform Radix Sort on this array to obtain the numbers in ascending order.
                            <br /><br />
                            Step-by-Step Radix Sort Process:
                            <br /><br />
                            1. Initialization: <br />
                            - Create ten buckets, representing digits from 0 to 9. <br />
                            - Set up a counter variable, initially set to the least significant digit (unit digit).
                            <br /><br />
                            2. Distribute Numbers into Buckets: <br />
                            - Iterate through each phone number in the array. <br />
                            - Group the numbers into buckets based on the value of the current digit being considered. <br />
                            - For our example, we start by considering the least significant digit (unit digit). <br />
                            - Distribute the numbers into the appropriate buckets based on this digit:
                            <br /><br />
                            - Bucket 0: [7890123456] <br />
                            - Bucket 1: [3216549870, 1234567890] <br />
                            - Bucket 2: [] <br />
                            - Bucket 3: [5551234567] <br />
                            - Bucket 4: [] <br />
                            - Bucket 5: [] <br />
                            - Bucket 6: [] <br />
                            - Bucket 7: [] <br />
                            - Bucket 8: [] <br />
                            - Bucket 9: [9876543210]
                            <br /><br />

                            3. Collect Numbers from Buckets: <br />
                            - Iterate through the buckets in order (from 0 to 9). <br />
                            - Collect the numbers from each non-empty bucket back into the original array. <br />
                            - The order of collection is crucial, as it ensures that the numbers are sorted by the current digit. <br />
                            - After the first pass, the array becomes: [7890123456, 3216549870, 1234567890, 5551234567, 9876543210]
                            <br /><br />

                            4. Update the Counter: <br />
                            - Increase the counter variable to consider the next significant digit. <br />
                            - In our example, we move from the unit digit to the tens digit.
                            <br /><br />

                            5. Repeat Steps 2-4: <br />
                            - Repeatedly perform Steps 2 to 4 until all digits have been processed. <br />
                            - In this example, we repeat the process twice more, considering the tens digit and the hundreds digit. <br />
                            - After the second pass, the array becomes: [7890123456, 1234567890, 3216549870, 5551234567, 9876543210] <br />
                            - After the third and final pass, the array becomes: [1234567890, 3216549870, 5551234567, 7890123456, 9876543210]
                            <br /><br />

                            Radix Sort offers significant advantages when dealing with large datasets, especially when the number of digits is relatively small. It also guarantees stability, meaning that elements with equal values retain their relative order after sorting.
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Radix Sort is a unique and efficient sorting algorithm that operates on individual digits or characters of the input elements. By grouping elements into buckets based on their digit values, Radix Sort gradually organizes the entire array until it is sorted. Despite its time complexity being dependent on the number of digits, Radix Sort is particularly useful for large datasets with a small number of digits, offering stability and reliable performance.
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
                                    <td>O(n * k)</td>
                                    <td>O(n + b)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Worst case</th>
                                    <td>O(n * k)</td>
                                    <td>O(n + b)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(n * k)</td>
                                    <td>O(n + b)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RadixSortVisualizer;
