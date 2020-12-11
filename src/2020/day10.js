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

export { evaluateAdapters };
