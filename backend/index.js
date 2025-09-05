const addon = require('bindings')('addon');

console.log(addon.hello()); // should print: "Hello from C++ addon!"
