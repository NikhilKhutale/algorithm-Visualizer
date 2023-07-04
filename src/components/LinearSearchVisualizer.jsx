import React, { useEffect, useState } from 'react';

function LinearSearchVisualizer() {
    const [data, setData] = useState([]);
    const [target, setTarget] = useState("");
    const [foundIndex, setFoundIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        generateData();
    }, []);

    const generateData = () => {
        const newData = [];
        for (let i = 0; i < 10; i++) {
            newData.push(Math.floor(Math.random() * 100));
        }
        setData(newData);
        const randomIndex = Math.floor(Math.random() * newData.length);
        setTarget(newData[randomIndex]);
        setFoundIndex(null);
        setCurrentIndex(-1);
    };

    const handleSearch = () => {
        setCurrentIndex(0);
        setFoundIndex(null);
        let i = 0;
        setIsSearch(true);
        const searchInterval = setInterval(() => {
            if (i >= data.length) {
                clearInterval(searchInterval);
                setFoundIndex(-1);
                setIsSearch(false);
                return;
            }
            setCurrentIndex(i);
            if (data[i] === target) {
                setFoundIndex(i);
                clearInterval(searchInterval);
                setIsSearch(false);
            }
            i++;
        }, 1000);
    };

    const handleReset = () => {
        generateData();
    };

    const isResetDisabled = isSearch || foundIndex === null;
    const isSearchDisabled = isSearch || target === '' || data.length === 0;

    return (
        <>
            <div className="container-fluid py-5 min-vh-100 d-flex flex-column justify-content-between">
                <div>
                    <div className='pb-4'>
                        <button onClick={generateData} disabled={isSearch} class="btn btn-outline-primary">
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
                                onChange={(e) => setTarget(parseInt(e.target.value))}
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
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className='array-item'
                            style={{
                                backgroundColor:
                                    foundIndex === index
                                        ? '#aaffaa'
                                        : currentIndex === index
                                            ? '#ffffaa'
                                            : 'transparent',
                            }}
                        >
                            {value}
                        </div>
                    ))}
                </div>
                <div>
                    {foundIndex !== null && (
                        <span>
                            Found Index : {foundIndex === -1 ? 'Not Found' : foundIndex}
                        </span>
                    )}
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h5 class="h5">Linear Search</h5>
                        <p class="fs-6">
                            Searching is a fundamental operation in computer science, and linear search is one of the simplest and most straightforward searching algorithms. In this article, we will explore the concept of linear search, step-by-step, using both a real-life example and an array of numbers. We will also delve into the complexities associated with this algorithm.
                        </p>
                        <h5 class="h5">
                            What is Linear Search?
                        </h5>
                        <p class="fs-6">
                            Linear search, also known as sequential search, is a method used to find a specific element within a collection of data. It involves iterating through each element of the data structure, one by one, until the desired element is found or the entire structure has been traversed. This algorithm is applicable to both sorted and unsorted data.
                        </p>
                        <h5 class="h5">
                            Real-Life Example:
                        </h5>
                        <p class="fs-6">
                            Let's begin with a real-life example to better understand how linear search works. Imagine you are searching for a book titled "The Great Gatsby" in a library that has thousands of books. You don't know the exact location of the book, so you start from the first shelf and check each bookshelf sequentially until you find the desired book. This is analogous to performing a linear search on an array of books.
                            <br /><br />
                            Step-by-Step Process:
                            <br /><br />
                            1. Consider an array of numbers: [12, 34, 56, 23, 9, 87, 45, 67].
                            <br /><br />
                            2. Let's say we want to find the number 9 within this array.
                            <br /><br />
                            3. Start at the first element (12) and compare it with the desired element (9).
                            <br /><br />
                            4. Since the two numbers do not match, move to the next element (34).
                            <br /><br />
                            5. Repeat this process until either the desired element is found or the end of the array is reached.
                            <br /><br />
                            6. In this case, we find a match when we reach the fifth element (9) of the array.
                            <br /><br />
                            7. The search terminates, and we can conclude that the number 9 is present in the array.
                            <br /><br />
                            8. If we had reached the end of the array without finding a match, we would have concluded that the desired element is not present.
                        </p>
                        <h5 class="h5">
                            Advantages and Disadvantages:
                        </h5>
                        <p class="fs-6">
                            Advantages:
                            <br /><br />
                            - Linear search is simple and easy to implement, requiring minimal code. <br />
                            - It works well with both sorted and unsorted arrays. <br />
                            - No pre-processing or additional data structures are required.
                            <br /><br />
                            Disadvantages:
                            <br /><br />
                            - The time complexity of linear search is relatively high, especially for large arrays, as it needs to examine each element one by one. <br />
                            - It is not efficient for large-scale searches and may become impractical when dealing with massive amounts of data. <br />
                        </p>
                        <h5 class="h5">
                            Conclusion:
                        </h5>
                        <p class="fs-6">
                            Linear search is a basic yet important searching algorithm that can be used to find elements within a collection of data. It follows a simple step-by-step process of comparing each element until a match is found or the entire collection is traversed. Although it has its limitations in terms of time complexity, linear search remains relevant in scenarios where the data size is small or the
                            search space is limited. Understanding the linear search algorithm and its complexities equips us with valuable insights into the efficiency of searching algorithms. Whether you're searching for a book in a library or implementing a search function in a computer program, linear search provides a fundamental approach that can be built upon for more sophisticated searching techniques.
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
                                    <td>O(1)</td>
                                    <td>O(1)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Worst case</th>
                                    <td>O(n)</td>
                                    <td>O(1)</td>
                                </tr>
                                <tr>
                                    <th scope="col">Average case</th>
                                    <td>O(n)</td>
                                    <td>O(1)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
}

export default LinearSearchVisualizer;
