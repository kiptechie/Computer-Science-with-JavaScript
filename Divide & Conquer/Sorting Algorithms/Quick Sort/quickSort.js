/*
Quick sort is one of the most useful and powerful sorting algorithms. 
Like merge sort, quick sort uses recursion to divide-and-conquer. 
The last element in the list is used as the “pivot”. 
Everything smaller than the pivot is place in a “left” list. 
Larger values are placed in a “right” list. 
Quick sort is then performed again on the left and right lists.
*/

/*
[4,9,3,5] list
-> 5 is made the pivot since it's the last in the array
-> divide list into two lists, [4,3] and [9]
-> call quicksort on those two lists

[4, 3]
-> 3 is pivot
-> call quicksort on [] and [4]
-> those both return as is as they are the base case of length 0 or 1
-> concat [], 3, and [4]
-> return [3,4]

[9]
-> returns as this it is a base case of length 1

(back into the original function call)
-> call concat on [3,4], 5, and [9]
-> return [3,4,5,9]
*/

/*
Another Big O of O(n log n) but takes up less memory than mergesort so it is often favored. 
However it does really poorly if you pass it a sorted list. Think about it. 
It would always have a pivot of the biggest number which defeats the effectiveness of the divide-and-conquer approach as one side will always contain all the elements. 
Hence not good for lists you expect may already be sorted. 
There are some tricks to employ to get around that like checking the beginning, middle, and end numbers and swapping them to try to get the best pivot, but that's outside our scope today. 
There are a lot of subtle variants on quicksort.
*/

/*
Quicksort!

Name your function quickSort.

Quicksort should grab a pivot from the end and then separate the list (not including the pivot)
into two lists, smaller than the pivot and larger than the pivot. Call quickSort on both of those
lists independently. Once those two lists come back sorted, concatenate the "left" (or smaller numbers)
list, the pivot, and the "right" (or larger numbers) list and return that. The base case is when quickSort
is called on a list with length less-than-or-equal-to 1. In the base case, just return the array given.

As always, you can change describe to xdescribe to prevent the unit tests from running while you're coding.

No visualization is provided so feel free to use your own debugging methods (like console.log).
*/

const quickSort = nums => {
    if (nums.length <= 1) return nums;

    const pivot = nums[nums.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < pivot) {
            left.push(nums[i]);
        } else {
            right.push(nums[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
};


// unit tests
describe('quickSort', function() {
    it('quicksort an array', () => {
        const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
        const answer = quickSort(input);

        expect(answer).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    });
});