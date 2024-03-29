const mock = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`.split('\n\n');

const real = `Monkey 0:
  Starting items: 66, 59, 64, 51
  Operation: new = old * 3
  Test: divisible by 2
    If true: throw to monkey 1
    If false: throw to monkey 4

Monkey 1:
  Starting items: 67, 61
  Operation: new = old * 19
  Test: divisible by 7
    If true: throw to monkey 3
    If false: throw to monkey 5

Monkey 2:
  Starting items: 86, 93, 80, 70, 71, 81, 56
  Operation: new = old + 2
  Test: divisible by 11
    If true: throw to monkey 4
    If false: throw to monkey 0

Monkey 3:
  Starting items: 94
  Operation: new = old * old
  Test: divisible by 19
    If true: throw to monkey 7
    If false: throw to monkey 6

Monkey 4:
  Starting items: 71, 92, 64
  Operation: new = old + 8
  Test: divisible by 3
    If true: throw to monkey 5
    If false: throw to monkey 1

Monkey 5:
  Starting items: 58, 81, 92, 75, 56
  Operation: new = old + 6
  Test: divisible by 5
    If true: throw to monkey 3
    If false: throw to monkey 6

Monkey 6:
  Starting items: 82, 98, 77, 94, 86, 81
  Operation: new = old + 7
  Test: divisible by 17
    If true: throw to monkey 7
    If false: throw to monkey 2

Monkey 7:
  Starting items: 54, 95, 70, 93, 88, 93, 63, 50
  Operation: new = old + 4
  Test: divisible by 13
    If true: throw to monkey 2
    If false: throw to monkey 0`.split('\n\n');

export { mock, real };
