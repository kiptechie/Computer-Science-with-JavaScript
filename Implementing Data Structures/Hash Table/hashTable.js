/*
Hash tables are extremely powerful tools in modern CS and are used extensively in things like programming languages' underpinnings, databases, caches, etc. 
They do have some tradeoffs, namely potentially memory footprints and the need for complicated hashing but they have constant time (O(1)) lookups, deletes, and adds if you're doing a set or map.

The gist of a hash table is you send your key through a hashing function (like MD5, SHA1, or one of your invention) which converts the to an addressable space (some sort of index.) 
Since in JavaScript we don't actually manage memory on that low of level, we're going to approximate the way it would work with a large empty array. 
However keep in mind that if this was a language where we managed our own memory we'd be doing that instead.

This is powerful for maps because now our key points to exactly where our object is being store. 
And it's very powerful for sets because we can just check where if anything exists that memory address and if so then it exists; if not then that key is not in the set. 
When we delete or add there's no lookup cost either so we have constant time deletes, adds, and lookups. 
A perfect structure, right? Well, no, not really.

First of all, this isn't useful for something an order with (a list of some sort) because your addresses won't have any notion of order.

Secondly, you need a sufficiently large footprint of memory to be able to store all of your objects without collisions (we'll talk about collisions in a sec.) This can balloon quickly.

Thirdly, you'll need a good hashing algorithm that spits out a viable address for table. That algorithms needs to have several qualities to it. 
It needs to be idempotent. 
Idempotent is a fancy way of saying that a function given an input always outputs the same output. 
function double(x) { return 2x; } would be an idempotent function because if I do double(5) a million times, on the million-and-first try I'll still get the answer 10. 
The function double is idempotent. Take the following function:


var multiplier = 0;
function doublePlus(x) {
    multiplier++;
    return 2 * x * multiplier;
}
                    
The above function is not idempotent because if I call I keep calling the doublePlus function with 5, I'm going to keep getting different answers. 
It is not idempotent because the function has side effects. 
Side effects are when calling a function makes some effect to the state surrounding it. 
You generally want to avoid side effects in programming as much as possible because it makes debugging much hard, makes your code less testable because it means you code must be in a certain state to work a certain way, and makes the code harder to read because you have to think about functions over term instead of in a vacuum because they depend on the code around them. 
Idempotence is critical in a good hashing function because given a certain input it always has to address the same place in memory or else the whole idea of a hash table falls apart.

A good hashing algorithm needs to have a pretty good distribution of values. 
If it doesn't have a good distribution of values you are going to end up with collisions. 
Collisions happen when two inputs end up with the same the output, which means they are going to end up in the same spot in memory. 
That's a problem. An example of a poor hashing algorithm would be substituting 1 for a, 2 for b, 3 for c, etc. for a string. 'az' (1 + 26) and 'by' (2 + 25) are going to collide, as would 'za'. You need them to have a wide and as-even-as-possible distribution.

A good hashing algorithm needs to be performant too; the point of a hash table to have lightning fast lookups and writes; if your hashing algorithm is mega slow then you're defeating the purpose; ie don't use cryptographically secure algorithms!

The modulo operator (%) is important to understand in hashing too. 
Generally the numbers your hashing algorithms will generate huge numbers, numbers far larger than the size of your array. 
To ensure that your number falls in a legal limit of 0 to the largest index in the array, we're going to use the modulo operator. 
Remember doing long division in school? Where 10 / 3 = 3 remainder 1? The modulo operator give you just the remainder. So 10 % 3 = 1. It just totally throws away the result of the integer division. 
This is useful because now we can get huge numbers but still ensure they fall in an acceptable range.
*/

/*
A HashTableSet!

Name your class/newable-function HashTableSet.

With a set, you want to put in a value to check later if it's in the collection.
You are going to watch a sufficiently large array to assure you don't have collisions. I did 255
to start with. When added, use a hashing function to hash the string and put in your table.
The class should have three functions:

add -   function - takes a string as an input, hashes it, and puts in its table
check - function - takes a string and returns true if it exists in its table; otherwise returns false
hash -  function - takes a string and a max number and return a number between 0 and the max number
                    function must be idempotent; the same string and max number will always yield the
                    same output        
*/

class HashTableSet {
    constructor() {
        this.table = new Array(255);
    }
    add(input) {
        this.table[this.hash(input, 255)] = input;
    }
    check(input) {
        return !!this.table[this.hash(input, 255)];
    }
    hash(input, max) {
        let num = 0;
        for (let i = 0; i < input.length; i++) {
            num += input.charCodeAt(i) * i;
        }
        return num % max;
    }
}



// unit tests
// do not modify the below code
describe('hash table set', function() {
    it('hash', () => {
        const table = new HashTableSet();
        expect(table.hash('test 1', 50)).toEqual(table.hash('test 1', 50));
        expect(table.hash('test 2', 10)).toEqual(table.hash('test 2', 10));
        expect(table.hash('a much longer strings than the other ones', 255)).toEqual(table.hash('a much longer strings than the other ones', 255));
        expect(table.hash('1 tset', 50)).not.toEqual(table.hash('test 1', 50));
        expect(table.hash('a much longer strings than the other ones', 2)).toBeLessThan(3);
    });
    it('add and check', () => {
        const table = new HashTableSet();
        table.add('hi');
        table.add('this is fun');
        table.add('another thing');

        //document.getElementById('target').innerHTML = JSON.stringify(table, null, 4);

        expect(table.check('hi')).toEqual(true);
        expect(table.check('this is fun')).toEqual(true);
        expect(table.check('another thing')).toEqual(true);

        expect(table.check('ih')).toEqual(false);
        expect(table.check('not in the list')).toEqual(false);
        expect(table.check('also not in the list')).toEqual(false);
    });
});