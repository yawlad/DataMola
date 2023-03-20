function add(a, b){
  if (b === undefined) {
    return (x) => x + a;
  }
  return a + b;
};
function sub(a, b) {
  if (b === undefined) {
    return (x) => x - a;
  }
  return a - b;
};
function mul(a, b) {
  if (b === undefined) {
    return (x) => x * a;
  }
  return a * b;
};
function div (a, b) {
  if (b === undefined) {
    return (x) => x / a;
  }
  return a / b;
};
function pipe(...args) {
  return (x) => {
    return args.reduce((curr, next) => {
      return next(curr)
    }, x)
  }
}

let a = add(1,2);
let b = mul(a, 10);

let sub1 = sub(1);

let c = sub1(b);
let d = mul(sub(a,1))(c);

let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0);

let x = pipe(add(1), mul(2))(3);