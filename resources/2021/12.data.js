const mock1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`
      .split('\n')
      .map((row) => row.split('-'));

const mock2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`
      .split('\n')
      .map((row) => row.split('-'));

const mock3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`
      .split('\n')
      .map((row) => row.split('-'));

const real = `bm-XY
ol-JS
bm-im
RD-ol
bm-QI
JS-ja
im-gq
end-im
ja-ol
JS-gq
bm-AF
RD-start
RD-ja
start-ol
cj-bm
start-JS
AF-ol
end-QI
QI-gq
ja-gq
end-AF
im-QI
bm-gq
ja-QI
gq-RD`
      .split('\n')
      .map((row) => row.split('-'));

export { mock1, mock2, mock3, real };
