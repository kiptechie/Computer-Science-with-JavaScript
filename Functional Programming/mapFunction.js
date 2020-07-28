/*
Map is a higher order function. 
That is to say it takes in another function and has its own logic on how to apply that function. 
Map is the first one we'll look at and amongst the useful tool in your functional programming tool box.

Map has similarities to forEach. 
It takes a function in and applies that function individually to each element in that array. 
Where it differs from forEach is that map creates a new array of the values returned within the function. 
It allows you to transform whole lists of values without modifying the original list.


var array = [1,2,3,4,5];
var transformed = array.map(function(num) { return num+1 });
console.log(transformed); // [2,3,4,5,6]
*/

/*
Map

Map is a method on the array prototype in JavaScript. It takes one (required)
parameter: the function you want called on each element in the array. While you
can make these functions, I'd recommend making them named and thus resuseable.

There are four tests to pass here:

Test 1
Make a function named doubleEach. doubleEach takes in an array and returns an
array where every element in the array is doubled. Do not use a loop.

Test 2
Make a function named squareEach. squareEach takes in an array and returns an
array where every element in the array is squared. Do not use a loop.

Test 3
Make a function named doubleAndSquareEach. If you made your other functions
composeable, you can reuse them here. Return an array where each element
is doubled first and then squared. Do not use a loop.

Test 4
Make a function named myMap. myMap is going to simulate the behavior of the
map method on the Array prototype. myMap takes two parameters: the array being
mapped over, and the function being called on each element. You must use a loop
in myMap. myMap returns the resulting array of calling the inputted function on 
each value in the array.
*/

const double = num => 2 * num;
const doubleEach = input => input.map(double);

const square = num => num * num;
const squareEach = input => input.map(square);

const doubleAndSquareEach = input => input.map(double).map(square);

const myMap = (array, fn) => {
    const answer = [];
    for (let i = 0; i < array.length; i++) {
        answer.push(fn(array[i]));
    }
    return answer;
};


// unit tests
// do not modify the below code
describe('map tests', function() {
    it('doubleEach', () => {
        const testList = [5, 50, 500, 5000, 10, 5, 3];
        expect(doubleEach(testList)).toEqual([10, 100, 1000, 10000, 20, 10, 6]);
    });
    it('squareEach', () => {
        const testList = [10, 1, 9, 2, 8, 3, 8, 4, 7, 5, 6, 50];
        expect(squareEach(testList)).toEqual([100, 1, 81, 4, 64, 9, 64, 16, 49, 25, 36, 2500]);
    });
    it('doubleAndSquareEach', () => {
        const testList = [5, 2, 4, 8, 1, 7, 10];
        expect(doubleAndSquareEach(testList)).toEqual([100, 16, 64, 256, 4, 196, 400]);
    });
    it('myMap', () => {
        const testList = [6, 2, 4, 8, 10];
        const divideByTwo = num => num / 2;
        expect(myMap(testList, divideByTwo)).toEqual([3, 1, 2, 4, 5]);
    });
});