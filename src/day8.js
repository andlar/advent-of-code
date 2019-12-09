const parseLayer = input => {
    let output = {};
    input.split('').forEach(c => {
        if (!output[c]) {
            output[c] = 0;
        };
        output[c] += 1;
    });
    return output;
}

const findFewest = layers => {
    return layers.sort((a, b) => a[0] - b[0])[0];
}

const flattenLayers = (input, pixelCount) => {
    let output = '';
    for (let i = 0; i < pixelCount; i++) {
        let layerCount = 0;
        let checkChar;
        do {
            checkChar = input.charAt(i + (layerCount * pixelCount));
            layerCount += 1;
        } while (checkChar === '2');
        output += checkChar;
    }
    return output;
}

export { parseLayer, findFewest, flattenLayers };
