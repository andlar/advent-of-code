const calcFuel = (weight) => Math.floor(weight / 3) - 2;

const iterateOnFuel = (fuel) => {
    let newFuel = calcFuel(fuel);
    if (newFuel > 0) {
        let subFuel = iterateOnFuel(newFuel);
        return fuel + subFuel;
    } else {
        return fuel;
    }
};

const sumOfFuel = (module) => {
    let firstFuel = calcFuel(module);
    return iterateOnFuel(firstFuel);
};

const sumOfModules = (modules) => {
    return modules.map(sumOfFuel).reduce((acc, val) => acc + val);
};

export { calcFuel, iterateOnFuel, sumOfFuel, sumOfModules };
