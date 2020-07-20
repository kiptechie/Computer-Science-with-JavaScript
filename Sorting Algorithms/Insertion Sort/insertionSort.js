// Insertion sort is a step more complex but a bit more useful than bubble sort and is occasionally useful
// The worst case scenario for it is similar to bubble sort's but its best case makes it suited for times when you're pretty sure a list almost sorted or likely already sorted

/*
  Insertion sort!
  
  Be sure to call your function insertionSort!
  
  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the sorted part of the list and inserts it into the correct position in the array.
  
  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!
  
  And you put xdescribe instead of describe if you want to suspend running the unit tests.  
*/

var insertionSort = (nums) => {
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            snapshot(nums);
            if (nums[i] < nums[j]) {
                let spliced = nums.splice(i, 1);
                nums.splice(j, 0, spliced[0]);
            }
        }
    }
};

// unit tests
describe('insertion sort', function() {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        insertionSort(nums);
        expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        done();
    });
});