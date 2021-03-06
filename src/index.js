import {parse} from 'acorn';

export  function cjs2es(code) {
    
const require = `function require(id) {
    if (id in __cjs2es_lookup) return __cjs2es_lookup[id];
    throw new Error(\`Cannot require modules dynamically (\${id})\`);
}`;

    if (!/\b(require|module|exports)\b/.test(code)) return code;

    try {

        const ast = parse(code, {ecmaVersion: 9});
        const requires = [];

        walk(ast, node => {
            if (node.type === 'CallExpression' && node.callee.name === 'require') {
                if (node.arguments.length !== 1) return;
                const arg = node.arguments[0];
                if (arg.type !== 'Literal' || typeof arg.value !== 'string') return;
                requires.push(arg.value);
            }
        });

        const imports = requires.map((id, i) => `import __cjs2es_${i} from '${id}';`).join('\n');
        const lookup = `const __cjs2es_lookup = { ${requires.map((id, i) => `'${id}': __cjs2es_${i}`).join(', ')} };`;

        return  [
            imports,
            lookup,
            require,
            `const exports = {}; const module = { exports };`,
            code,
            `export default module.exports;`
        ].join('\n\n');

    } catch (err) {return code}
}

function walk(node, callback) {
    if(typeof node !== 'object') return;

    if(node.type) callback(node);
    
    for(let key in node) {
        let child = node[key];
        if(child && typeof child == 'object') {
            ( Array.isArray(child) ? child : [child] ).forEach(i => walk(i, callback));
        } 
    }
};