import React, { useEffect, useState } from "react";

const SelectionSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [highlighted, setHighlighted] = useState([]);
    const [min, setMin] = useState(null);

    const generateArray = () => {
        const newArray = Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 100 + 1)
        );
        setArray(newArray);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const selectionSort = async () => {
        setSorting(true);
        const len = array.length;

        for (let i = 0; i < len; i++) {
            let minIndex = i;
            setHighlighted([minIndex]);

            for (let j = i + 1; j < len; j++) {
                setHighlighted([minIndex, j]);
                await new Promise((resolve) => setTimeout(resolve, 500));

                if (array[j] < array[minIndex]) {
                    minIndex = j;
                    setMin(minIndex);
                }
            }

            if (minIndex !== i) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
                setArray(array);
            }
            setHighlighted([]);
        }

        setSorting(false);
    };

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={generateArray} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={selectionSort} disabled={sorting}>Selection Sort</button>
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
                                backgroundColor: highlighted.includes(idx)
                                    ? min === idx
                                        ? "yellow"
                                        : "red"
                                    : "#6ec4ff",
                                width: "30px",
                                display: "inline-block",
                                margin: "2px",
                                textAlign: "center",
                                position: "relative"
                            }}
                            className="animate__animated animate__zoomIn"
                        >
                            <p
                                style={{
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
                        <h5 class="h5">Selection Sort</h5>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Selection sort is a simple and intuitive sorting algorithm that can be applied to an array of numbers or any collection of elements. It works by repeatedly finding the minimum or maximum element from the unsorted portion of the array and placing it at the beginning of the sorted portion. In this article, we will delve into the inner workings of selection sort, provide a step-by-step explanation, and explore its time complexity. Additionally, we will showcase a real-life example to illustrate the algorithm's practical application.
                        </p>
                        <p class="fs-6">
                            Let's consider an array of numbers [7, 2, 1, 9, 3] to demonstrate the selection sort algorithm. The goal is to arrange the elements of the array in ascending order.
                            <br /> <br />
                            Step 1: Find the minimum element: <br />
                            First, we search through the entire array to find the minimum element. In our example, the minimum element is 1.
                            <br /> <br />
                            Step 2: Swap the minimum element: <br />
                            Once we have identified the minimum element, we swap it with the first element of the array. After swapping, the array becomes [1, 2, 7, 9, 3].
                            <br /> <br />
                            Step 3: Move to the next position: <br />
                            Now, we move to the next position, which is the second element of the array, and repeat the process.
                            <br /> <br />
                            Step 4: Find the minimum element in the remaining unsorted portion: <br />
                            We search for the minimum element in the remaining unsorted portion of the array. In this case, the minimum element is 2.
                            <br /> <br />
                            Step 5: Swap the minimum element: <br />
                            After finding the minimum element, we swap it with the second element of the array. The array now becomes [1, 2, 7, 9, 3].
                            <br /> <br />
                            Step 6: Repeat steps 3-5: <br />
                            We repeat steps 3-5 until we have sorted the entire array.
                            <br /> <br />
                            Step 7: Find the minimum element in the remaining unsorted portion: <br />
                            We search for the minimum element in the remaining unsorted portion of the array, which is [7, 9, 3]. The minimum element here is 3.
                            <br /> <br />
                            Step 8: Swap the minimum element: <br />
                            After finding the minimum element, we swap it with the third element of the array. The array becomes [1, 2, 3, 9, 7].
                            <br /> <br />
                            Step 9: Repeat steps 3-5: <br />
                            We repeat steps 3-5 once again. This time, the minimum element in the remaining unsorted portion [9, 7] is 7.
                            <br /> <br />
                            Step 10: Swap the minimum element: <br />
                            After finding the minimum element, we swap it with the fourth element of the array. Finally, the array becomes [1, 2, 3, 7, 9].
                            <br /><br />
                        </p>
                        <h5 class="h5">
                            Real-Life Example:
                        </h5>
                        <p class="fs-6">
                            To better understand the practical application of selection sort, let's consider a real-life scenario where it can be used.
                        </p>
                        <p class="fs-6">
                            Imagine you are a librarian at a busy library with thousands of books. Due to some mishap, the books on the shelves got mixed up, and it's your responsibility to sort them back into the correct order based on their unique identification numbers.
                        </p>
                        <p class="fs-6">
                            You decide to use the selection sort algorithm to accomplish this task. You start by scanning the entire library and locating the book with the lowest identification number. Once found, you swap it with the book at the beginning of the shelf. You then move to the next position, find the book with the next lowest identification number, and swap it with the second book on the shelf. This process continues until all the books are sorted in ascending order.
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Selection sort is a simple and easy-to-understand sorting algorithm that can be employed to sort arrays or any collection of elements. By iteratively finding the minimum or maximum element and swapping it with the appropriate position, the algorithm gradually builds a sorted array. Although it may not be the most efficient algorithm for large datasets, it serves as a great starting point to understand the fundamentals of sorting algorithms. Whether it's sorting numbers or organizing books in a library, selection sort proves to be a valuable tool in various real-life scenarios.

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
                                    <td>O(n^2)</td>
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
            </div >
        </>
    );
};

export default SelectionSortVisualizer;
