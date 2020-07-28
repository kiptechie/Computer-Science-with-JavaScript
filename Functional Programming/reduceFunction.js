/*
Next on our functional adventure is reduce. 
Reduce is really useful when you a have a list of values that you want to combine in some meaningful way down to one value. 
You'll often hear the term map/reduce thrown around in regards to data science; they're used a lot in that sense because you're taking large sets of data, doing some transformations on them to get them in a certain state, and then reducing them down to useful statistics.

A reduce function involves a list it's being called, a function that does the reducing, the accumulator, and the seed value.
 The accumulator is the interim value that is passed into each call of the reducer function that the function then returns. 
 The value returned is then passed into the next call of the reducer function on the next value. 
 The seed value is the value of the first accumulator. 
 If there's no seed value, the zero index in the array is the seed.


var list = ['a','b','c'];
list.reduce(function(accumulator, letter) {
    return accumulator + letter.toUpperCase();
}); // returns aBC since a becomes the seed

list.reduce(function(accumulator, letter) {
    return accumulator + letter.toUpperCase();
}, ''); // returns ABC since '' starts as the seed
*/

/*
Reduce

Good for taking a list and reducing it down to one value in a user defined way.

Test 1
Name your function addTogether
Take in a list and return the result of that list added together
Do not use a loop

Test 2
Name your function concatenateStringsWithSpaces
Take in a list, return that string with those strings concatenated together with spaces between them
Don't worry about leading or trailing whitespace
Do not use .join or loops

Test 3
Name your function squaresAndSubtracts
Map over your list, square each value, and then subtract them in order (take index 0, subtract index 1, 
then index 2, etc.)
Do not use a loop

Test 4
Name your function myReduce
Implement your own reduce
myReduce takes three parameters: the list being operated on, a function to apply the reduction, and 
seed value to start the reduce
You will need to use a loop 
*/

const addTogether = list => {
    return list.reduce((acc, num) => acc + num, 0);
};

const concatenateStringsWithSpaces = list => {
    return list.reduce((acc, string) => acc + string + " ", "");
};

const squaresAndSubtracts = list => {
    return list
        .map(num => num * num)
        .reduce((accumulator, num) => accumulator - num);
};

const myReduce = (list, fn, seed) => {
    let answer = seed;
    for (let i = 0; i < list.length; i++) {
        answer = fn(answer, list[i]);
    }
    return answer;
};

// unit tests
describe('reduce', function() {
    it('addTogether', () => {
        const testList = [5, 3, 0, 7, 2, 5, 6, 10, 9]
        expect(addTogether(testList)).toEqual(47);
    });
    it('concatenateStringsWithSpaces', () => {
        const testList = ['this', 'is', 'so', 'fun'];
        expect(concatenateStringsWithSpaces(testList).trim()).toEqual('this is so fun');
    });
    it('squaresAndSubtracts', () => {
        const testList = [10, 5, 4, 2, 1];
        expect(squaresAndSubtracts(testList)).toEqual(54);
    });
    it('myReduce', () => {
        const testList = [4, 2, 3, 2];
        const applyDivisors = (accumulator, divisor) => accumulator / divisor;
        expect(myReduce(testList, applyDivisors, 240)).toEqual(5);
    });
});