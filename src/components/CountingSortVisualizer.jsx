import React, { useState, useEffect } from 'react';

function CountingSortVisualizer() {
    const [array, setArray] = useState([]);
    const [countingArray, setCountingArray] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);
    const [sorting, setSorting] = useState(false)

    function generateArray(length, range) {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(Math.floor(Math.random() * range));
        }
        return array;
    }

    function countingSort(array, max) {
        const countingArray = new Array(max + 1).fill(0);
        for (let i = 0; i < array.length; i++) {
            countingArray[array[i]]++;
        }
        for (let i = 1; i < countingArray.length; i++) {
            countingArray[i] += countingArray[i - 1];
        }
        const sortedArray = new Array(array.length).fill(0);
        for (let i = array.length - 1; i >= 0; i--) {
            sortedArray[countingArray[array[i]] - 1] = array[i];
            countingArray[array[i]]--;
        }
        return sortedArray;
    }

    function handleGenerateArray() {
        const array = generateArray(10, 20);
        setArray(array);
        setCountingArray([]);
        setSortedArray([]);
    }

    useEffect(() => {
        handleGenerateArray();
    }, []);

    function handleSortArray() {
        setSorting(true)
        const max = Math.max(...array);
        const sortedArray = countingSort(array, max);
        const countingArray = new Array(max + 1).fill(0);
        for (let i = 0; i < array.length; i++) {
            countingArray[array[i]]++;
        }
        setCountingArray(countingArray);

        let i = 0;
        const intervalId = setInterval(() => {
            setArray(sortedArray.slice(0, i + 1));
            i++;
            if (i >= sortedArray.length) {
                clearInterval(intervalId);
                setSorting(false)
            }
        }, 500);
    }


    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={handleGenerateArray} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={handleSortArray} disabled={sorting}>Sort Array</button>
                </div>
                <div className="animate__animated" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {array.map((num, index) => (
                        <div className="animate__animated animate__zoomIn" key={index} style={{ backgroundColor: '#6ec4ff', height: `${(num * 3) + 40}px`, width: '30px', margin: '2px', position: "relative" }}>
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
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-start">
                        {countingArray.length > 0 &&
                            <div class="table-responsive">
                                <table class="table table-vertical-align-middle table-dark table-bordered text-center table-futuristic">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Integer</th>
                                            {countingArray.map((count, index) => (
                                                <td key={index} >{index}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th scope="row">Count</th>
                                            {countingArray.map((count, index) => (
                                                <td key={index} >{count}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>


            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="h2">Counting Sort</h2>
                        <p class="fs-6">
                            Counting Sort is one such algorithm known for its simplicity and efficiency. It is particularly useful when the input consists of integers within a specific range. In this article, we will explore the Counting Sort algorithm, discuss its implementation using a real-life example, provide a step-by-step explanation using an array of numbers, and analyze its time and space complexities.
                        </p>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Counting Sort works by determining, for each input element, the number of elements that are less than it. Based on this information, it places each element into its correct position in the output array. Unlike comparison-based sorting algorithms like Quicksort or Mergesort, Counting Sort operates in linear time, making it a favorable choice in certain scenarios.
                        </p>
                        <h5 class="h5">
                            Real-life Example
                        </h5>
                        <p class="fs-6">
                            Let's consider a scenario where a teacher needs to sort the exam scores of a class. The scores range from 0 to 100, and there are 50 students in total. Using Counting Sort, the teacher can quickly organize the scores in ascending order, allowing for easy identification of the highest and lowest scores.
                            <br /><br />
                            Implementation Steps:
                            <br /><br />
                            1. Determine the range: <br />
                            In our example, the scores range from 0 to 100. Hence, we create a counting array with a size of 101 (to accommodate the range of scores from 0 to 100).
                            <br /><br />
                            2. Count the occurrences: <br />
                            Traverse the input array of scores and count the number of occurrences for each score. For instance, if a student scored 85, we increment the count at index 85 of the counting array.
                            <br /><br />
                            3. Calculate cumulative counts: <br />
                            Modify the counting array to store the cumulative counts. Each element at index i will represent the number of scores less than or equal to i. By summing up the current count with the previous cumulative count, we achieve this cumulative effect.
                            <br /><br />
                            4. Determine the positions: <br />
                            Create a temporary output array with the same size as the input array. Iterate over the input array, and for each score, find its position in the output array using the cumulative counts array. Decrease the count for that score in the cumulative counts array.
                            <br /><br />
                            5. Build the sorted array: <br />
                            Traverse the input array once again, and for each score, place it in its correct position in the output array based on the information from the cumulative counts array.
                            <br /><br />
                            6. Return the sorted array: <br />
                            After completing the previous step, the output array will contain the sorted exam scores. Return this array as the result.
                        </p>
                        <h5 class="h5">
                            Step-by-Step Explanation:
                        </h5>
                        <p class="fs-6">
                            Let's illustrate the implementation steps using the following array of scores: [75, 92, 88, 79, 95, 82, 92, 85, 85].

                            <br /><br />
                            1. Determine the range: <br />
                            We have scores ranging from 0 to 100. So, our counting array will have a size of 101.
                            <br /><br />
                            2. Count the occurrences: <br />
                            Traverse the input array and update the counting array accordingly: <br />
                            Counting Array: [0, 0, 0, ..., 0, 0, 2, 0, 2, 0, ..., 1, 0, 1, ..., 0] <br />
                            <br /><br />
                            3. Calculate cumulative counts: <br />
                            Starting from index 1, each element in the counting array represents the cumulative count of scores up to that point: <br />
                            Counting Array: [0, 0, 0, ..., 0, 0, 2, 2, 4, 4, ..., 5, 5, 6, ..., 6]
                            <br /><br />
                            4. Determine the positions: <br />
                            Create a temporary output array and use the cumulative counts array to find the correct positions for each score:
                            <br /><br />
                            Output Array: [0, 0, 0, ..., 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ..., 0, 0, 75, 0, 0, ..., 0, 79, 0, 0, ..., 0, 0, 82, 0, ..., 0, 0, 0, 0, ..., 0, 0, 0, 0, 0, 85, 0, 0, 0, ..., 0, 0, 88, 0, 0, ..., 0, 0, 0, 0, ..., 0, 0, 92, 92, 0, ..., 0, 0, 95, 0, 0, ..., 0, 0, 0, 0, 0, 0, 0]
                            <br /><br />
                            5. Build the sorted array: <br />
                            Traverse the input array and place each score in its correct position in the output array: <br />
                            Output Array: [75, 79, 82, 85, 85, 88, 92, 92, 95, 0, 0, ..., 0, 0]
                            <br /><br />
                            6. Return the sorted array: <br />
                            The sorted array of scores is: [75, 79, 82, 85, 85, 88, 92, 92, 95].
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            In conclusion, Counting Sort is a simple yet efficient sorting algorithm, especially useful when dealing with integer values within a known range. Its linear time complexity makes it a favorable choice in scenarios where comparison-based algorithms might be less efficient. By understanding its implementation steps and complexities, you can harness the power of Counting Sort to sort data effectively in real-life applications.
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
                                    <td>O(n + k)</td>
                                    <td>O(n + k)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Worst case</th>
                                    <td>O(n + k)</td>
                                    <td>O(n + k)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(n + k)</td>
                                    <td>O(n + k)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CountingSortVisualizer;
