const name = 'Scotch.io';

//just some test function
export default function printMe() {
    console.log('I get called from print.js!');
}

//another test function
setTimeout(() => alert(`Hello there from ${name}`), 300);