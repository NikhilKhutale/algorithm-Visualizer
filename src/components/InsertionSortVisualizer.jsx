import React, { useEffect, useState } from "react";

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const insertionSort = async () => {
    setSorting(true);

    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        setHighlighted([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 500));

        array[j + 1] = array[j];
        array[j] = key;

        setArray([...array]);
        setHighlighted([j - 1, j]);
        j = j - 1;
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
          <button className="mx-lg-5 btn btn-outline-primary" onClick={insertionSort} disabled={sorting}>Insertion Sort</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "300px",
            verticalAlign: "baseline"
          }}
          className="animate__animated" >
          {array.map((value, idx) => (
            <div
              key={idx}

              style={{
                height: `${value * 3}px`,
                backgroundColor: highlighted.includes(idx)
                  ? "red"
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
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h5 class="h5">Insertion Sort</h5>
            <p class="fs-6">
              In the realm of sorting algorithms, Insertion Sort stands as a fundamental and intuitive method. Its simplicity and efficiency make it an ideal choice for smaller datasets or partially sorted arrays. In this article, we will explore the inner workings of Insertion Sort, step-by-step, and provide a real-life example to illustrate its practical application. Additionally, we will delve into its time and space complexities to understand its performance characteristics.
            </p>
            <h5 class="h5">
              Overview:
            </h5>
            <p class="fs-6">
              Insertion Sort is a comparison-based sorting algorithm that builds the final sorted array one element at a time. The algorithm iterates through the input array, selecting each element in turn and placing it into its correct position within the growing sorted segment. By doing so, it gradually builds the sorted array by shifting elements to the right until they are in the correct order.
            </p>
            <h5 class="h5">
              Step-by-Step Explanation:
            </h5>
            <p class="fs-6">
              To better comprehend the process, let's consider an example scenario: sorting a deck of playing cards in ascending order using Insertion Sort. We'll start with an unsorted array of cards and follow the algorithm step-by-step:
              <br /> <br />
              1. Begin with the first card, considering it as the sorted segment of the array. <br />
              2. Select the next card and compare it with the elements in the sorted segment, moving from right to left. <br />
              3. If the selected card is smaller, shift the larger element one position to the right. <br />
              4. Repeat the comparison and shifting process until the appropriate position for the selected card is found. <br />
              5. Insert the selected card into its correct position in the sorted segment. <br />
              6. Repeat steps 2 to 5 for each remaining card until the entire deck is sorted.
            </p>
            <h5 class="h5">
              Real-Life Example:
            </h5>
            <p class="fs-6">
              Let's apply Insertion Sort to a real-life scenario: organizing a list of students based on their exam scores in ascending order.
              <br /> <br />
              Consider the following unsorted array of exam scores: [85, 72, 93, 78, 90]. We'll walk through the Insertion Sort steps to sort the scores:
              <br /> <br />
              1. Start with the first score (85) and consider it as the sorted segment.
              <br /><br />
              2. Move to the next score (72) and compare it with the previous score in the sorted segment (85). Since 72 is smaller, we shift 85 one position to the right.
              <br /> <br />
              Updated array: [72, 85, 93, 78, 90]
              <br /> <br />
              3. The next score is 93, which is greater than the preceding scores. Thus, it remains in its current position.
              <br /> <br />
              Updated array: [72, 85, 93, 78, 90]
              <br /> <br />
              4. The fourth score is 78. We compare it with the scores in the sorted segment from right to left. It is smaller than 93, so we shift 93 one position to the right. Next, we compare 78 with 85, and again, a shift is needed.
              <br /><br />
              Updated array: [72, 78, 85, 93, 90]
              <br /> <br />
              5. Finally, we reach the last score (90). It is greater than 78 and 85, so it remains in its position.
              <br /><br />
              Sorted array: [72, 78, 85, 90, 93]
            </p>
            <h5 class="h5">
              Conclusion:
            </h5>
            <p class="fs-6">
              Insertion Sort, with its simple and intuitive approach, offers an effective solution for sorting smaller datasets and partially ordered arrays. By understanding its step-by-step process and analyzing its time and space complexities, we gain a comprehensive understanding of this sorting algorithm. With the provided real-life example, we can see how Insertion Sort can be applied practically to organize data in ascending order. Whether you are sorting playing cards, student scores, or any other type of data, Insertion Sort proves to be a valuable tool in your sorting arsenal.
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
      </div >
    </>
  );
};

export default InsertionSortVisualizer;
