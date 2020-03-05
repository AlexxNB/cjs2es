# cjs2es
Converts source of any CommonJS module to the ES module

# Usage

```javascript
import {cjs2es} from 'cjs2es';

const cjsSource = `
const modulename = require('some-module');
console.log(modulename);
module.exports = {foo: 'bar'}
`;

const esSource = cjs2es(cjsSource);
```

# Copyright

Original idea is from here: 
https://github.com/sveltejs/svelte-repl/blob/master/src/workers/bundler/plugins/commonjs.js