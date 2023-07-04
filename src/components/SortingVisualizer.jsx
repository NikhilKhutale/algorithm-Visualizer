import React, { useEffect, useState } from "react";
import 'animate.css';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [highlighted, setHighlighted] = useState([]);
    const [sorted, setSorted] = useState([]);

    const generateArray = () => {
        const newArray = Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 100 + 1)
        );
        setArray(newArray);
    };

    useEffect(() => {
        generateArray();
    }, []);


    const bubbleSort = async () => {
        setSorting(true);
        const len = array.length;
        let isSwapped = false;

        for (let i = 0; i < len; i++) {
            isSwapped = false;

            for (let j = 0; j < len - i - 1; j++) {
                setTimeout(() => {
                    setHighlighted([j, j + 1]);
                }, 100)
                if (array[j] > array[j + 1]) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    var temp = array[j]
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    setArray(array)
                    isSwapped = true;
                }
            }

            if (!isSwapped) {
                break;
            }

            setSorted(sorted => [...sorted, len - i - 1]);
        }

        setTimeout(() => {
            setHighlighted([]);
            setSorted([]);
        }, 100)
        setSorting(false);

    };

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={generateArray} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={bubbleSort} disabled={sorting}>Bubble Sort</button>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        height: "300px",
                        verticalAlign: "baseline"
                    }}
                    className="animate__animated"
                >
                    {array.map((value, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: `${value * 3}px`,
                                backgroundColor: sorted.includes(idx)
                                    ? "yellow"
                                    : highlighted.includes(idx)
                                        ? "red"
                                        : "#6ec4ff",
                                width: "30px",
                                display: "inline-block",
                                margin: "2px",
                                textAlign: "center",
                                position: "relative"
                            }}
                            className="animate__animated animate__zoomIn"
                        >
                            <p style={{
                                position: "absolute",
                                bottom: "-20px",
                                margin: "0",
                                fontSize: "12px",
                                left: "50%",
                                transform: "translateX(-50%)"
                            }}
                            >
                                {value}
                            </p>
                        </div>

                    ))}
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="h2">Bubble Sort</h2>
                        <p class="fs-6">
                            One of the simplest yet widely used sorting algorithms is Bubble Sort. In this article, we will explore the concept of Bubble Sort, examine its step-by-step process using an array of numbers, and illustrate its application in a real-life scenario.
                        </p>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Bubble Sort is a comparison-based sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order. The algorithm gets its name from the way smaller elements "bubble" to the top of the list during each pass. Bubble Sort is straightforward to understand and implement, although it may not be the most efficient algorithm for large datasets.
                        </p>
                        <h5 class="h5">
                            Step-by-Step Implementation:
                        </h5>
                        <p class="fs-6">
                            To demonstrate Bubble Sort in action, let's consider the following array of numbers: [8, 3, 1, 5, 2].
                        </p>
                        <p class="fs-6">
                            1. Start with the first pair of adjacent elements, [8, 3].<br />
                            - Compare the two elements: 8 and 3. <br />
                            - Since 8 is greater than 3, swap their positions: [3, 8]. <br />
                            - The array now becomes [3, 8, 1, 5, 2]. <br /> <br />

                            2. Move to the next pair: [8, 1]. <br />
                            - Compare 8 and 1. <br />
                            - Since 8 is greater than 1, swap their positions: [3, 1, 8, 5, 2]. <br />
                            - The array now becomes [3, 1, 8, 5, 2]. <br /> <br />

                            3. Continue this process for each adjacent pair until the end of the array. <br />
                            - Compare [8, 5], [8, 2], and [5, 2], swapping elements when necessary. <br />
                            - After each pass, the largest element in the unsorted portion of the array "bubbles" to the end. <br /> <br />

                            4. Repeat the process starting from the beginning until the entire array is sorted. <br />
                            - The next pass results in [1, 3, 5, 2, 8]. <br />
                            - The pass after that leads to [1, 3, 2, 5, 8]. <br />
                            - Finally, the last pass gives us the sorted array: [1, 2, 3, 5, 8]. <br /> <br />
                        </p>
                        <h5 class="h5">
                            Real-Life Example: Sorting Books on a Shelf
                        </h5>
                        <p class="fs-6">
                            To illustrate the practical application of Bubble Sort, let's imagine a scenario where you have a shelf filled with books in random order, and you want to arrange them in ascending order based on their publication years.
                        </p>
                        <p class="fs-6">
                            Consider the following books and their publication years:
                        </p>
                        <p class="fs-6">
                            1. "A" (1960) <br />
                            2. "B" (1949) <br />
                            3. "C" (1925) <br />
                            4. "D" (1813) <br />
                            5. "E" (1997) <br /> <br />

                        </p>
                        <p class="fs-6">

                            Now, let's apply Bubble Sort to sort these books based on their publication years:
                        </p>
                        <p class="fs-6">
                            1. Compare the first two books, "A" and "B".
                            - Since "A" was published in 1960 and "B" in 1949, they are already in the correct order. <br /> <br />

                            2. Move on to the next pair, "B" and "C".
                            - Since "C" was published in 1925 and "B" in 1949, swap their positions. <br /> <br />

                            3. Continue this process for the remaining pairs until the entire shelf is sorted.
                            - After a few passes, the books are rearranged as follows: <br /> <br />


                            [D, C, B, A, E] <br /> <br />

                            4. Repeat the process until the entire shelf is sorted. <br /> <br />
                            - After a few more passes, the books are finally arranged in ascending order of publication years: <br /> <br />
                            [D, C, A, B, E]

                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Bubble Sort is a simple yet effective sorting algorithm that iteratively compares adjacent elements and swaps them if they are in the wrong order. Although it may not be the most efficient algorithm for large datasets, it is easy to understand and implement.
                            <br /> <br />
                            In this article, we explored the step-by-step process of Bubble Sort using an array of numbers and demonstrated its practical application by sorting a shelf of books based on their publication years. Sorting algorithms like Bubble Sort are crucial in various real-life scenarios, from organizing data to optimizing search and retrieval operations.

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
                                    <td>O(n)</td>
                                    <td>O(1)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Worst case</th>
                                    <td>O(n^2)</td>
                                    <td>O(1)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(n^2)</td>
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

export default SortingVisualizer;
