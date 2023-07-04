import React, { useEffect, useState } from "react";

const QuickSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [low, setLow] = useState(-1);
    const [high, setHigh] = useState(-1);
    const [pivot, setPivot] = useState(-1);
    const [comparing, setComparing] = useState([]);
    const [sorting, setSorting] = useState(false);


    const generateArray = () => {
        const newArray = [];
        for (let i = 0; i < 20; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 5);
        }
        setArray(newArray);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const quickSort = async (arr, low, high) => {
        setSorting(true);
        if (low < high) {
            const pivotIndex = await partition(arr, low, high);
            await quickSort(arr, low, pivotIndex - 1);
            await quickSort(arr, pivotIndex + 1, high);
        }
        setSorting(false);
    };

    const partition = async (arr, low, high) => {

        const pivot = arr[high];
        setPivot(pivot);
        setLow(low);
        setHigh(high);
        let i = low - 1;
        for (let j = low; j <= high - 1; j++) {

            await sleep(500); 
            if (arr[j] <= pivot) {
                i++;
                await swap(arr, i, j);
            }
        }
        await swap(arr, i + 1, high);
        setLow(-1);
        setHigh(-1);
        setPivot(-1);
        setComparing([])
        return i + 1;
    };

    const swap = async (arr, i, j) => {
        setComparing([j, i]);
        await sleep(500); 
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setArray([...arr]);
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={generateArray} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={() => quickSort(array, 0, array.length - 1)} disabled={sorting}>Quick Sort</button>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "300px",
                }}
                    className="animate__animated"
                >
                    {array.map((value, idx) => (
                        <div
                            className={`array-bar ${low === idx ? 'low' : ''
                                } ${high === idx ? 'high' : ''} ${pivot === value ? 'pivot' : ''
                                } ${comparing.includes(idx) ? 'comparing' : ''}`}
                            key={idx}
                            style={{
                                height: `${value * 3}px`,
                                width: "30px",
                                display: "inline-block",
                                margin: "2px",
                                textAlign: "center",
                                position: "relative"
                            }}
                        >
                            <p style={{
                                position: "absolute",
                                bottom: "-20px",
                                margin: "0",
                                fontSize: "12px",
                                left: "50%",
                                transform: "translateX(-50%)"
                            }}>
                                {value}
                            </p>
                        </div>
                    ))
                    }
                </div>
            </div >
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="h2">Quick Sort</h2>
                        <p class="fs-6">
                            Quick sort is a widely used and efficient sorting algorithm that follows the divide-and-conquer strategy. In this article, we will explore the step-by-step process of quick sort using both a real-life example and an array of numbers. We will also discuss the time and space complexities of this algorithm.
                        </p>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Quick sort, is based on the principle of partitioning. The algorithm selects a pivot element from the array and rearranges the other elements such that all elements smaller than the pivot come before it, and all elements greater than the pivot come after it. This process is recursively applied to the sub-arrays on each side of the pivot until the entire array is sorted.
                        </p>
                        <h5 class="h5">
                            Real-Life Example:
                        </h5>
                        <p class="fs-6">
                            Let's consider a real-life example to understand the step-by-step process of quick sort. Imagine you are organizing a collection of books on a shelf. The goal is to sort them in ascending order based on their publication years. Here's how quick sort can be applied:
                            <br /><br />
                            1. Select a pivot book: Choose a book from the collection, such as one from the middle or at random, and mark it as the pivot.
                            <br /><br />
                            2. Partition the collection: Divide the remaining books into two groups – those published before the pivot year and those published after the pivot year.
                            <br /><br />
                            3. Rearrange the books: Place all books published before the pivot year to the left of the pivot and all books published after the pivot year to the right.
                            <br /><br />
                            4. Recursive sorting: Apply steps 1-3 to the two subgroups created in step 3. Choose pivots for each subgroup and partition the books accordingly.
                            <br /><br />
                            5. Combine the sorted subgroups: Once all subgroups are sorted, combine them to obtain the final sorted collection.
                        </p>
                        <h5 class="h5">
                            Step-by-Step Explanation:
                        </h5>
                        <p class="fs-6">
                            Let's now consider an array of numbers and apply quick sort to sort them step-by-step:
                            <br /><br />
                            Example: [7, 2, 1, 6, 8, 5, 3, 4]
                            <br /><br />
                            1. Select a pivot: Choose the last element, 4, as the pivot.
                            <br /><br />
                            2. Partition the array: Rearrange the elements such that all numbers smaller than the pivot (in this case, 2, 1, 3) come before it, and all numbers greater than the pivot (6, 8, 5, 7) come after it. The array becomes [2, 1, 3, 4, 6, 8, 5, 7].
                            <br /><br />
                            3. Recursive sorting: <br />
                            - Sort the left sub-array [2, 1, 3] by selecting 3 as the pivot. Partitioning gives [2, 1, 3]. The array remains the same as it is already sorted. <br />
                            - Sort the right sub-array [6, 8, 5, 7] by selecting 7 as the pivot. Partitioning gives [6, 5, 7, 8]. The array becomes [2, 1, 3, 4, 6, 5, 7, 8]. <br />
                            <br /><br />
                            4. Combine the sorted sub-arrays: The final sorted array is obtained by combining the left sub-array, pivot, and right sub-array. [2, 1, 3, 4, 6, 5, 7, 8].
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Quick sort is a widely used sorting algorithm that efficiently sorts large data sets. By dividing the array into smaller sub-arrays and sorting them independently, quick sort achieves a time complexity of O(n log n) on average. Although it may have a worst-case time complexity of O(n^2), careful pivot selection and randomized partitioning techniques can minimize this occurrence. Understanding the step-by-step process of quick sort using both real-life examples and arrays of numbers provides a practical insight into its functioning.
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
                                    <td>O(n log n)</td>
                                    <td>O(log n)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Worst case</th>
                                    <td>O(n^2)</td>
                                    <td>O(log n)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td> O(n log n)</td>
                                    <td>O(log n)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickSortVisualizer;
