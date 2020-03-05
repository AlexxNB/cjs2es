const test = require('tape');
const {cjs2es} = require('../dist/cjs2es');

test('Simple module', function (t) {
    t.plan(1);


    const cjsModule = `const modulename = require('some-module');
console.log(modulename);
module.exports = {foo: 'bar'}`;

    const esModule = `import __cjs2es_0 from 'some-module';

const __cjs2es_lookup = { 'some-module': __cjs2es_0 };

function require(id) {
    if (id in __cjs2es_lookup) return __cjs2es_lookup[id];
    throw new Error(\`Cannot require modules dynamically (\${id})\`);
}

const exports = {}; const module = { exports };

const modulename = require('some-module');
console.log(modulename);
module.exports = {foo: 'bar'}

export default module.exports;`;

    t.equal(esModule,cjs2es(cjsModule));
});