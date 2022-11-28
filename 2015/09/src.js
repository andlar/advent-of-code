const interpretRow = (row) => {
  const [f, , t, , d] = row.split(' ');
  const key = [f, t].sort((a, b) => a < b ? -1 : 1).join('.');
  return [key, parseInt(d, 10), new Set([f, t])];
};

const interpretInput = (input) => {
  let distances = {};
  let locations = []
  input.forEach((row) => {
    const [k, d, l] = interpretRow(row);
    distances = {...distances, [k]: d};
    locations = locations.concat([...l]);
  });
  return [distances, new Set(locations)];
};

const buildRoutes = (locations) => {
  let routes = [...locations];
  for (let i = 1; i < locations.size; i++) {
    routes = routes.flatMap((r) => [...locations]
                            .filter((v) => !r.includes(v))
                            .map((v) => `${r}.${v}`))
  }
  return routes;
};

const calculateCost = (distances, route) => route
      .split('.')
      .reduce((sum, city, idx, arr) => {
        if (idx === 0) { return sum; }
        const key = [city, arr[idx - 1]]
              .sort((a, b) => (a < b ? -1 : 1))
              .join('.');
        return sum + distances[key];
      }, 0);

const findRoute = (input, shortest = true) => {
  const [distances, locations] = interpretInput(input);
  const routes = buildRoutes(locations);
  const costs = routes.map((r) => calculateCost(distances, r));
  return shortest ? Math.min(...costs) : Math.max(...costs);
};

export {
  interpretRow,
  interpretInput,
  buildRoutes,
  calculateCost,
  findRoute,
};
