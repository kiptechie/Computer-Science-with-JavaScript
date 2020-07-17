// This is o(n) because we go through all the inputs once in a loop.
function crossAdd(input) {
    var answer = [];
    for (var i = 0; i < input.length; i++) {
        var goingUp = input[i];
        var goingDown = input[input.length - 1 - i];
        answer.push(goingUp + goingDown);
    }
    return answer;
}

// still o(n). Unless we say otherwise, we're assuming worst case scenario.
// In this worst case, the needle would be the last element.
function find(needle, haystack) {
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) return true;
    }
}

// This would be o(n^2). For every input, we have to go through a full loop inside of another full loop,
// meaning we're doing alot of work! This is the trick: look for loops.
// A loop inside a loop would likewise be o(n^3).
function makeTuples(input) {
    var answer = [];
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input.length; j++) {
            answer.push([input[i], input[j]]);
        }
    }
}

// if we have no loops and just do something and exit or return, then it's said we're doing it in constant time, or o(1).
// You can also have o(log n) if a code employs a divide-and-conqure strategy (often recursive,) meaning as you add more terms, the increases in time as you add input diminishes.