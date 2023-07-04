import React, { useState } from 'react';

const HeapSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [comparing, setComparing] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);
    const [displayed, setDisplayed] = useState(0);

    const generateArray = () => {
        const arr = [];
        for (let i = 0; i < 50; i++) {
            arr.push(Math.floor(Math.random() * 100) + 1);
        }
        setArray(arr);
        setSortedArray([]);
        setDisplayed(0);
    };

   
    const swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

   
    const heapify = async (arr, n, i) => {
        let largest = i; 
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            await new Promise((resolve) => setTimeout(resolve, 500));

            setComparing([i, largest]);

            swap(arr, i, largest);
            setArray([...arr]);

            setTimeout(() => setComparing([]), 1000);

            await heapify(arr, n, largest);
        }
    };

    const heapSort = async () => {
        const arr = [...array];
        const n = arr.length;


        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }
        for (let i = n - 1; i >= 0; i--) {
            swap(arr, 0, i);
            setArray([...arr]);
            sortedArray.unshift(arr.pop());
            await heapify(arr, i, 0);
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        setArray([]);
        setDisplayed(n);
    };

    return (
        <>
            <div>
                <h1>Heap Sort Visualizer</h1>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "300px",
                }}>
                    {array.map((value, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: `${value * 4}px`,
                                backgroundColor: comparing.includes(idx)
                                    ? 'red'
                                    : 'blue',
                                width: "45px",
                                display: "inline-block",
                                margin: "2px",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            <p style={{
                                position: "absolute",
                                bottom: "-15px",
                                margin: "0",
                                fontSize: "12px"
                            }}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "300px",
                }}>
                    {sortedArray.map((value, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: `${value * 4}px`,
                                backgroundColor: comparing.includes(idx)
                                    ? 'red'
                                    : 'blue',
                                width: "45px",
                                display: "inline-block",
                                margin: "2px",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            <p style={{
                                position: "absolute",
                                bottom: "-15px",
                                margin: "0",
                                fontSize: "12px"
                            }}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <button onClick={generateArray}>Generate New Array</button>
                    <button onClick={heapSort}>Heap Sort</button>
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-color legend-red"></div>
                        <p>Elements being compared</p>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color legend-green"></div>
                        <p>Sorted elements</p>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color legend-blue"></div>
                        <p>Unsorted elements</p>
                    </div>
                </div>
            </div >
        </>
    );
};
export default HeapSortVisualizer;