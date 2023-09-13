export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  
  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  function partition(items, left, right,animations) {
    var mid = Math.floor((right + left) / 2)
    var pivot = items[mid], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
  
      while (items[i] < pivot) {
        animations.push([1,i,mid]);
        animations.push([2, i, mid]);
        i++;
      }
      while (items[j] > pivot) {
        animations.push([1, j, mid]);
        animations.push([2, j, mid]);
        j--;
      }
      if (i <= j) {
        animations.push([1, i, j]);
        animations.push([2, i, j]);
        animations.push([3, i, items[j]]);
        animations.push([3, j, items[i]]);
        swap(items, i, j,animations); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
  
  function quickSort(items, left, right,animations) {
    var index;
    if (items.length > 1) {
      index = partition(items, left, right,animations); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        quickSort(items, left, index - 1,animations);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        quickSort(items, index, right,animations);
      }
    }
  }
  
  
  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
  }
  
  
  function heapSort(input,animations) {
    let n = input.length;
    for (var i = Math.floor(n / 2); i >= 0; i -= 1) {
      heapify(input, i, n, animations);
    }
  
    for (i = n - 1; i >= 0; i--) {
      animations.push([1, 0, i]);
      animations.push([2, 0, i]);
      animations.push([3, 0, input[i]]);
      animations.push([3, i, input[0]]);
      swap(input, 0, i);
      heapify(input, 0, i,animations);
    }
  }
  
  function heapify(input, i, n, animations) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
  
    if (left < n && input[left] > input[max]) {
      animations.push([1, left, max]);
      animations.push([2, left, max]);
      max = left;
    }
    
    if (right < n && input[right] > input[max]) {
      animations.push([1, right, max]);
      animations.push([2, right, max]);
      max = right;
    }
  
    if (max !== i) {
      animations.push([1, max, i]);
      animations.push([2, max, i]);
      animations.push([3, max, input[i]]);
      animations.push([3, i, input[max]]);
      swap(input, i, max);
      heapify(input, max, n,animations);
    }
  }
  
  
  export function getBubbleSortAnimations(arr) {
    const animations = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        animations.push([1,j,j+1]);
        animations.push([2, j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          animations.push([3, j, arr[j+1]]);
          animations.push([3, j+1, arr[j]]);
          swap(arr,j,j+1);
        }
      }
    }
    // Print the sorted array
    return animations;
  }