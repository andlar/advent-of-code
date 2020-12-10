const evaluateAdapters = vals => {
    let out = {1: 0, 3: 1};
    vals.concat([0])
        .sort((a, b) => a - b)
        .forEach((v, idx, arr) => {
            if (idx === 0) { return; }
            out[v - arr[idx - 1]] += 1;
        });
    out.total = out[1] * out[3];
    return out;
};

const buildChain = vals => vals
      .concat([0])
      .concat([Math.max(...vals) + 3])
      .sort((a, b) => a - b)
      .join(',');

const validChain = vals => vals
      .concat([0])
      .concat([Math.max(...vals) + 3])
      .sort((a, b) => a - b)
      .reduce((acc, v, idx, arr) => acc && (idx === 0 || v - arr[idx - 1] <= 3), true);

const findShorterChains = vals => {
    let cache = {};
    let max = Math.max(...vals) + 3;
    const helper = vals => {
        let chain = buildChain(vals);
        if (cache[chain]) { return; }
        let tst = ',' + max;
        if (!chain.endsWith(tst)) {
            cache[chain] = {valid: false};
            return;
        }
        cache[chain] = {valid: validChain(vals)};
        if (cache[chain].valid) {
            vals.forEach((v, idx, arr) => {
                helper(arr.filter(val => val !== v));
            });
        }
    }
    helper(vals);
    let output = Object.keys(cache)
        .map(key => ({...cache[key], key: key}));

    return output
        .filter(v => v.valid);
}
export { evaluateAdapters, buildChain, validChain, findShorterChains };
