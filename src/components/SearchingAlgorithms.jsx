import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchingIntro from './SearchingIntro';
import LinearSearchVisualizer from './LinearSearchVisualizer';
import BinarySearchVisualizer from './BinarySearchVisualizer';
import InterpolationSearchVisualizer from './InterpolationSearchVisualizer';
import JumpSearchVisualizer from './JumpSearchVisualizer';
import ExponentialSearchVisualizer from './ExponentialSearchVisualizer';

const SearchingAlgorithms = () => {
    const location = useLocation();
  const searchTerm = location.search.slice(1);
  const sortVisualizers = {
    LinearSearch :LinearSearchVisualizer,
    BinarySearch :BinarySearchVisualizer,
    InterpolationSearch :InterpolationSearchVisualizer,
    JumpSearch :JumpSearchVisualizer,
    ExponentialSearch :ExponentialSearchVisualizer
  }

  const SearchComponent = sortVisualizers[searchTerm];

  return (
    <div className='container-fluid text-white bg-dark'>
        {SearchComponent ? <SearchComponent /> : <SearchingIntro />}
    </div>
  )
}

export default SearchingAlgorithms