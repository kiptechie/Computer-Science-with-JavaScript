/*
Merge sort is a divide-and-conquer algorithm that uses recursion to divide a list into smaller pieces for sorting. 
This division continues until you have a list of one. 
MergeSort's Big O is o(n log n). 
*/

/*
[1, 5, 6] sublist 1
[2, 7, 8] sublist 2

-> compare 1 and 2, take 1 and put it in new list
-> compare 5 and 2, take 2 and put it in new list
-> compare 5 and 7, take 5 and put it in new list
-> compare 6 and 7, take 6 and put it in new list
-> list one has no more elements
   add the rest of list two in order (7 and 8)
*/

/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers
  
  To read the approach, refer to the class materials at 
  https://btholt.github.io/four-semesters-of-cs/
  
  As always, you can rename describe to be xdescribe to prevent the
  unit tests from running while you're working
  
  There is no visualization mechanism for this algorithm. Use your own
  preferred method of introspection like console.log().
*/

const mergeSort = nums => {
    if (nums.length < 2) {
        return nums;
    }
    const length = nums.length;
    const middle = Math.floor(length / 2);
    const left = nums.slice(0, middle);
    const right = nums.slice(middle, length);

    return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {

    const results = [];

    while (left.length && right.length) {

        if (left[0] <= right[0]) {
            results.push(left.shift());
        } else {
            results.push(right.shift());
        }
    }

    return results.concat(left, right);
};

// unit tests
describe('insertion sort', function() {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        var ans = mergeSort(nums);
        expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});