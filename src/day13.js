import { runProgram, continueProgram } from './intcode';
import { program } from './data/day13.data';
import { drawGrid } from './util';

const initGame = () => {
    return {
        memory: [...program],
        input: [],
        output: [],
    }
}

const paintGrid = (grid, input) => {
    let nextGrid = {...grid};
    let key, value;
    while (input.length > 0) {
        key = input.shift() + ':' + input.shift();
        if (key === '-1:0') {
            key = 'score';
            value = input.shift();
        } else {
            value = pickCharacter(input.shift());
        }
        nextGrid[key] = value;
    }
    return nextGrid;
}

const pickCharacter = character => {
    switch (character) {
    case 0: return ' ';
    case 1: return '#';
    case 2: return '*';
    case 3: return '-';
    case 4: return 'o';
    default: return '?';
    }
}

const getCountOfBlocks = () => {
    let game = initGame();
    let endState = runProgram(game);
    let grid = paintGrid({}, endState.output);
    let blockCount = Object.keys(grid).filter(key => grid[key] === '*').length;
    return blockCount;
}

const playGame = () => {
    let game = initGame();
    game.memory[0] = 2;
    game = runProgram(game);
    let grid = paintGrid({}, game.output);
    while (!game.done) {
        game.input.push(getJoystickDirection(grid));
        game = continueProgram(game);
        grid = paintGrid(grid, game.output);
    }
    return grid;
}

const getJoystickDirection = grid => {
    let ball = parseInt(Object.keys(grid).find(key => grid[key] === 'o').split(':')[0], 10);
    let paddle = parseInt(Object.keys(grid).find(key => grid[key] === '-').split(':')[0], 10);
    let direction;
    if (ball === paddle) {
        direction =  0
    } else {
        direction = ball < paddle ? -1 : 1;
    }
    return direction;
}

export { initGame, paintGrid, getCountOfBlocks, getJoystickDirection, playGame };
