// Write a function, makeChange, that returns an integer that represents the least number of coins that add up to the amount, n.
let recursionCounter = 0;
const coins = [10, 6, 1];

const makeChange = (value, i) => {
    recursionCounter++;
    console.log(`${recursionCounter}: calling ${value} at ${i}`)
    if (value === 0) return 0;
    let minCoins;
    coins.forEach((coin, i) => {
        if (value - coin >= 0) {
            let currMinCoins = makeChange(value - coin, i);
            if (minCoins === undefined || currMinCoins < minCoins) {
                minCoins = currMinCoins;
            }
        }
    });
    return minCoins + 1;
};

makeChange(10);