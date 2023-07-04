import React, { useState, useEffect } from "react";

const MergeSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [trackedArray, setTrackedArray] = useState([])

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    setArray(newArray);
    setOriginalArray(newArray);
    setSorted(false);
    setHighlighted([]);
  };


  useEffect(() => {
    generateArray();
  }, []);

  const mergeSort = async (arr, start, end) => {
    setSorting(true);
    if (start === undefined) {
      start = 0;
      end = arr.length - 1;
    }

    if (start >= end) {
      setSorting(false);
      setSorted(true);
      return;
    }

    const middle = Math.floor((start + end) / 2);
    await mergeSort(arr, start, middle);
    await mergeSort(arr, middle + 1, end);
    await merge(arr, start, middle, end);
  };

  const merge = async (arr, start, middle, end) => {
    let i = start;
    let j = middle + 1;
    const mergedArray = [];

    while (i <= middle && j <= end) {
      setHighlighted([i, j]);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTrackedArray(mergedArray)

      if (arr[i] < arr[j]) {
        mergedArray.push(arr[i]);
        i++;
      } else {
        mergedArray.push(arr[j]);
        j++;
      }
    }

    while (i <= middle) {
      mergedArray.push(arr[i]);
      setTrackedArray(mergedArray)
      i++;
    }

    while (j <= end) {
      mergedArray.push(arr[j]);
      setTrackedArray(mergedArray)
      j++;
    }

    for (let k = start; k <= end; k++) {
      arr[k] = mergedArray[k - start];
    }

    setArray([...arr]);
    setHighlighted([]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <div className="container-fluid pt-5 min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <button className="mx-lg-5 btn btn-outline-primary" onClick={generateArray} disabled={sorting}>Generate Array</button>
          <button className="mx-lg-5 btn btn-outline-primary" onClick={() => mergeSort(array)} disabled={sorting}>Merge Sort</button>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "300px",
          verticalAlign: "baseline"
        }}
          className="animate__animated px-4"
        >
          {originalArray.map((value, idx) => (
            <div
              key={idx}
              style={{
                height: `${value * 3}px`,
                backgroundColor: highlighted.includes(idx)
                  ? "#f6bd60" 
                  : sorted
                    ? "#6ec4ff" 
                    : sorting
                      ? "#ffcc00" 
                      : "#6ec4ff",
                width: "30px",
                display: "inline-block",
                margin: "2px",
                textAlign: "center",
                position: "relative",
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
        <div className="container-fluid d-flex flex-column align-items-center px-auto py-5">
          Additional Space :-
          <div className="d-flex flex-wrap">
            {trackedArray.map((value, idx) => (
              <div
                key={idx}
                style={{ fontSize: "12px" }}
                className="m-2 p-2 border border-primary bg-blue text-white"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="h2">Merge Sort</h2>
            <p class="fs-6">

              Merge Sort, known for its efficiency and effectiveness in handling large sets of data. In this article, we will explore the inner workings of Merge Sort, provide a real-life example to illustrate its application, and delve into its time and space complexities.
            </p>
            <h5 class="h5">
              Overview:
            </h5>
            <p class="fs-6">
              Merge Sort is a divide-and-conquer algorithm that operates by recursively dividing an array into smaller subarrays until each subarray consists of a single element. It then merges these subarrays in a sorted order until the entire array is sorted. The key idea behind Merge Sort is to repeatedly merge two sorted subarrays to create a larger sorted subarray. Let's dive into the step-by-step process of Merge Sort using an example.
            </p>

            <h5 class="h5">
              Step-by-Step Explanation:
            </h5>
            <p class="fs-6">
              Consider the following array of numbers: [8, 2, 6, 3, 9, 1, 5, 7, 4]. We will apply Merge Sort to sort this array in ascending order.
              <br /><br />
              Step 1: Divide
              <br /> <br />
              The first step in Merge Sort is to divide the array into smaller subarrays. We recursively split the array until each subarray contains only one element.
              <br /> <br />
              [8, 2, 6, 3, 9, 1, 5, 7, 4]
              <br /> <br />
              Divide into two subarrays:
              <br /> <br />
              [8, 2, 6, 3] and [9, 1, 5, 7, 4]
              <br /><br />
              Divide further:
              <br /><br />
              [8, 2] and [6, 3]
              <br /><br />
              [9, 1] and [5, 7, 4]
              <br /><br />
              Divide further:
              [8] and [2]
              [6] and [3]
              [9] and [1]
              [5] and [7, 4]
              <br /><br />
              Step 2: Merge
              <br /><br />
              After dividing the array into individual elements, we start merging them in sorted order. We compare elements from each subarray and place them in the correct position in a temporary array. This process continues until all subarrays are merged.
              <br /><br />
              Merge [8] and [2]: <br />
              [2, 8]
              <br /><br />
              Merge [6] and [3]: <br />
              [3, 6]
              <br /><br />
              Merge [9] and [1]: <br />
              [1, 9]
              <br /><br />
              Merge [5] and [7, 4]: <br />
              [4, 5, 7]
              <br /><br />
              Merge [3, 6] and [2, 8]: <br />
              [2, 3, 6, 8]
              <br /><br />
              Merge [1, 9] and [4, 5, 7]: <br />
              [1, 4, 5, 7, 9]
              <br /><br />
              Step 3: Final Merge
              <br /><br />
              In the final step, we merge the two remaining sorted subarrays to obtain the fully sorted array.
              <br /><br />
              Merge [2, 3, 6, 8] and [1, 4, 5, 7, 9]: <br />
              [1, 2, 3, 4, 5, 6, 7, 8, 9]
              <br /> <br />
              And there we have it! The original array [8, 2, 6, 3, 9, 1, 5, 7, 4] is now sorted in ascending order using Merge Sort.

            </p>
            <h5 class="h5">
              Real-Life Example:
            </h5>
            <p class="fs-6">
              Now, let's consider a real-life example where Merge Sort proves to be beneficial. Imagine you are managing an online retail store with thousands of orders that need to be sorted based on their order numbers. Each order has a unique identification number, and it is essential to process them in ascending order to ensure efficient fulfillment.
              <br /><br />
              By applying Merge Sort to sort the order numbers, you can guarantee that the orders will be processed systematically. Merge Sort's time complexity ensures efficient sorting, even with a large number of orders. Moreover, its stability ensures that orders with the same order number will maintain their relative order, preventing any confusion in the fulfillment process.
            </p>
            <h5 class="h5">
              Conclusion:
            </h5>
            <p class="fs-6">
              In conclusion, Merge Sort is a powerful sorting algorithm that operates on the divide-and-conquer principle. It effectively sorts large data sets with a time complexity of O(n log n) and a space complexity of O(n). By dividing the array into smaller subarrays and merging them in sorted order, Merge Sort achieves a sorted array efficiently. Whether it's sorting numbers in an array or managing orders in a retail store, Merge Sort proves to be a valuable tool in various real-life scenarios.
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
                  <td> O(n log n)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <th scope="col">Worst case</th>
                  <td> O(n log n)</td>
                  <td>O(n)</td>
                </tr>
                <tr>
                  <th scope="col">Average case</th>
                  <td> O(n log n)</td>
                  <td>O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>
  );
};

export default MergeSortVisualizer;
