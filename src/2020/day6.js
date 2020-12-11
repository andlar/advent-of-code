import { parseInput } from './util';

const filterOrs = group => new Set([...group.replace(/ /g, '')]).size;

const filterAnds = group => {
    let people = group.split(' ');
    let count = people.length;
    return [...new Set([...group.replace(/ /g, '')])]
        .map(c => people.filter(p => p.indexOf(c) >= 0).length)
        .filter(a => a === count)
        .length;
}

const getAll = (customs, filterFn) => parseInput(customs).map(g => filterFn(g)).reduce((sum, acc) => sum + acc, 0);

export { filterOrs, filterAnds, getAll };
