function validate(a, b) {
  if (typeof a !== 'number' || (typeof b !== 'number' && b !== undefined))
    throw new Error('Bad input');
}
function add(a, b) {
  validate(a, b);
  return b === undefined ? (x) => x + a : a + b;
}
function sub(a, b) {
  validate(a, b);
  return b === undefined ? (x) => x - a : a - b;
}
function mul(a, b) {
  validate(a, b);
  return b === undefined ? (x) => x * a : a * b;
}
function div(a, b) {
  validate(a, b);
  return b === undefined ? (x) => x / a : a / b;
}
function pipe(...args) {
  return (x) => {
    return args.reduce((curr, next) => {
      if (typeof next !== 'function') throw new Error('Not function input');
      return next(curr);
    }, x);
  };
}

// Good tests

let a = add(1, 2);
let b = mul(a, 10);

let sub1 = sub(1);

let c = sub1(b);
let d = mul(sub(a, 1))(c);

let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0);

let x = pipe(add(1), mul(2))(3);

// Bad tests

try {
  let a = add(1, '2');
} catch (error) {
  console.error(error);
}

try {
  let a = add();
} catch (error) {
  console.error(error);
}

try {
  let a = add('1');
} catch (error) {
  console.error(error);
}

try {
  let a = pipe(add(10), sub(10), mul(1), div(1), 10)(1);
} catch (error) {
  console.error(error);
}
