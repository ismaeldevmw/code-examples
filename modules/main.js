import { sum } from 'function';

const result = sum(10, 20);
const name = 'John Smith';

function sayHello() {
  console.log('Hello ' + name);
}

console.log('Thi is a simple sum: ', result);

export { name, sayHello };
