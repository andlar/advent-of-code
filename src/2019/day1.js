const calcFuel = (weight) => Math.floor(weight / 3) - 2;

const iterateOnFuel = (fuel) => {
    let newFuel = calcFuel(fuel);
    return fuel + (newFuel > 0 ? iterateOnFuel(newFuel) : 0);
};

const sumOfFuel = (module) => iterateOnFuel(calcFuel(module));

const sumOfModules = (modules) => modules.map(sumOfFuel).reduce((acc, val) => acc + val);

export { calcFuel, iterateOnFuel, sumOfFuel, sumOfModules };
