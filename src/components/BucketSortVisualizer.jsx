import { useState, useEffect } from 'react';

function BucketSortVisualizer() {
    const [mainArray, setMainArray] = useState([]);
    const [buckets, setBuckets] = useState(new Array(5).fill().map(() => []));
    const [sorting, setSorting] = useState(false)

    const generateArray = (size, max) => {
        const newArray = [];
        for (let i = 0; i < size; i++) {
            newArray.push(Math.floor(Math.random() * max) + 1);
        }
        setMainArray(newArray);
        setBuckets(new Array(5).fill().map(() => []));
    };


    useEffect(() => {
        generateArray(20, 20);
    }, []);

    function bucketSorting() {
        setSorting(true)
        let array = [...mainArray];
        let noOfBuckets = 5
        let maxElement = Math.max(...array);
        let minElement = Math.min(...array);


        let Range = (maxElement - minElement) / noOfBuckets;

        let temp = [];


        for (let i = 0; i < noOfBuckets; i++) {
            temp.push([]);
        }


        for (let i = 0; i < array.length; i++) {
            let diff = (array[i] - minElement) / Range - Math.floor((array[i] - minElement) / Range);

            if (diff === 0 && array[i] !== minElement) {
                temp[Math.floor((array[i] - minElement) / Range) - 1].push(array[i]);
            } else {
                temp[Math.floor((array[i] - minElement) / Range)].push(array[i]);
            }
        }

        setBuckets(temp)


        for (let i = 0; i < temp.length; i++) {
            if (temp[i].length !== 0) {
                temp[i].sort((a, b) => a - b);
            }
        }

        setBuckets(temp)


        let k = 0;
        for (let lst of temp) {
            if (lst.length) {
                for (let i of lst) {
                    array[k] = i;
                    k++;
                }
            }
        }
        let i = 0;
        const intervalId = setInterval(() => {
            setMainArray(array.slice(0, i + 1));
            i++;
            if (i >= array.length) {
                clearInterval(intervalId);
                setSorting(false)
            }
        }, 800);
    }

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={() => generateArray(20, 20)} disabled={sorting}>Generate Array</button>
                    <button className="mx-lg-5 btn btn-outline-primary" onClick={bucketSorting} disabled={sorting}>Sort Array</button>
                </div>
                <div className="animate__animated" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {mainArray.map((num, idx) => (
                        <div key={idx} className="animate__animated animate__zoomIn" style={{ backgroundColor: '#6ec4ff', height: `${(num * 3) + 40}px`, width: '30px', margin: '2px', position: "relative" }}>
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
                                                    {/*<!-- Iterate over 'values' array in each 'bucket' -->*/}
                                                    {values.map((value, j) => (
                                                        <div key={j}>{value}</div>
                                                    ))}
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
                        <h2 class="h2">Bucket Sort</h2>
                        <p class="fs-6">
                            One such algorithm that stands out for its simplicity and efficiency is Bucket Sort. By distributing elements into different buckets and sorting them individually, Bucket Sort provides an elegant solution for sorting a large set of numbers. In this article, we will explore the step-by-step process of Bucket Sort using a real-life example and an array of numbers. Additionally, we will discuss the time and space complexities of this algorithm.
                        </p>
                        <h5 class="h5">
                            Overview:
                        </h5>
                        <p class="fs-6">
                            Bucket Sort operates on the principle of dividing the input array into several smaller buckets. Each bucket represents a subrange of values from the original array. The elements are then distributed into their respective buckets based on their value ranges. Finally, the individual buckets are sorted, and the sorted elements are concatenated to obtain the final sorted array.
                        </p>
                        <h5 class="h5">
                            Step-by-Step Explanation:
                        </h5>
                        <p class="fs-6">
                            To better comprehend the Bucket Sort algorithm, let's consider an example of sorting a set of student scores in a class.
                            <br /><br />
                            Example: <br />
                            Suppose we have an array of student scores: [92, 85, 78, 95, 88, 82, 91, 85, 90, 89].
                            <br /><br />
                            Step 1: Creating Buckets: <br />
                            We start by creating a fixed number of buckets, each representing a specific range of values. In this case, let's create ten buckets, each representing a range of ten scores. The ranges could be: [0-9], [10-19], [20-29], and so on, until [90-99].
                            <br /><br />
                            Step 2: Distributing Elements: <br />
                            Next, we distribute the student scores into their respective buckets based on their range. For our example, the distribution would be as follows:
                            <br /> <br />
                            Bucket 0-9: Empty <br />
                            Bucket 10-19: Empty <br />
                            Bucket 20-29: Empty <br />
                            Bucket 30-39: Empty <br />
                            Bucket 40-49: Empty <br />
                            Bucket 50-59: Empty <br />
                            Bucket 60-69: Empty <br />
                            Bucket 70-79: [78] <br />
                            Bucket 80-89: [85, 82, 85, 88, 82, 89] <br />
                            Bucket 90-99: [92, 95, 91, 90]
                            <br /><br />

                            Step 3: Sorting Individual Buckets: <br />
                            After distributing the elements into their respective buckets, we sort each bucket individually. In our example:
                            <br /><br />
                            Bucket 0-9: Empty <br />
                            Bucket 10-19: Empty <br />
                            Bucket 20-29: Empty <br />
                            Bucket 30-39: Empty <br />
                            Bucket 40-49: Empty <br />
                            Bucket 50-59: Empty <br />
                            Bucket 60-69: Empty <br />
                            Bucket 70-79: [78] <br />
                            Bucket 80-89: [82, 85, 85, 88, 89] <br />
                            Bucket 90-99: [90, 91, 92, 95]
                            <br /><br />

                            Step 4: Concatenating Buckets: <br />
                            Finally, we concatenate the sorted buckets to obtain the final sorted array. In our example:
                            <br /><br />
                            Sorted Array: [78, 82, 85, 85, 88, 89, 90, 91, 92, 95]
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Bucket Sort is an efficient sorting algorithm that works well when the input elements are uniformly distributed. By dividing the data into separate buckets, sorting them individually, and then concatenating them, Bucket Sort provides a relatively simple and effective way to sort large sets of numbers. Its time complexity of O(n + k^2) makes it suitable for scenarios where the range of values is limited. However, it's important to note that the performance of Bucket Sort can be influenced by the choice of the underlying sorting algorithm for sorting individual buckets.
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
                                    <td>O(n^2)</td>
                                    <td>O(n + k)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(n + n^2/k + k)</td>
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

export default BucketSortVisualizer;
