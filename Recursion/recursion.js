// Recursion is when you define something in terms of itself.
// A function that calls itself.
let wr = (msg = '--------') => document.write(`<br>${msg}`);

function basicRecursion(max, current) {
    // basic case (when do I stop);
    if (current > max) return;
    // write out what is current to the DOM
    wr(current);
    basicRecursion(max, current + 1);
}

basicRecursion(5, 1);
wr();
wr();

function fibonacci(n) {
    if (n <= 2) { // you could do if (n === 0 || n ====1) which is not recommended.
        // base case
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

for (var i = 1; i <= 20; i++) {
    wr(`${i}. ${fibonacci(i)}`);
}

/* Make a function that computes a factorial recursively.
A factrial is when you take a number n and multiply by each preceding integer until you hit one. 
5!
5 * 4 * 3 * 2 * 1
n * (n-1) * (n-2) ... * 3 * 2 * 1

Call the function factorial

factorial(1) = 1
factorial(2) = 2
factorial(3) = 6
*/

function factorial(n) {
    // base case
    if (n < 2) return 1;
    return n * factorial(n - 1);
}

// unit tests
describe('factorial', function() {
    it('should do factorials', () => {
        expect(factorial(1)).toEqual(1);
        expect(factorial(2)).toEqual(2);
        expect(factorial(3)).toEqual(6);
        expect(factorial(10)).toEqual(3628800);
    });
});