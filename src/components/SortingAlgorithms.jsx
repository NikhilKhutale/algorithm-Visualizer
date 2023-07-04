import React from 'react';
import { useLocation } from 'react-router-dom';
import SortingIntro from './SortingIntro';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import InsertionSortVisualizer from './InsertionSortVisualizer';
import SortingVisualizer from './SortingVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import QuickSortVisualizer from './QuickSortVisualizer';
import RadixSortVisualizer from './RadixSortVisualizer';
import CountingSortVisualizer from './CountingSortVisualizer';
import BucketSortVisualizer from './BucketSortVisualizer';

const SortingAlgorithms = () => {
  const location = useLocation();
  const searchTerm = location.search.slice(1);
  const sortVisualizers = {
    SelectionSort: SelectionSortVisualizer,
    InsertionSort: InsertionSortVisualizer,
    BubbleSort:SortingVisualizer,
    MergeSort:MergeSortVisualizer,
    QuickSort: QuickSortVisualizer,
    RadixSort: RadixSortVisualizer,
    CountingSort : CountingSortVisualizer,
    BucketSort: BucketSortVisualizer,
  };
  const SortComponent = sortVisualizers[searchTerm];


  return (
    <div className='container-fluid text-white bg-dark'>
      {SortComponent ? <SortComponent /> : <SortingIntro />}
    </div>
  );
};

export default SortingAlgorithms;
