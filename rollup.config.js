import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

const isTest = process.env.NODE_ENV === 'test';

export default !isTest ? 
[

    {
        input: 'src/index.js',
        output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' }
        ],
        external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [terser()]
    },
    {
        input: 'src/index.js',
        output:{ 
            file: pkg.browser, 
            name: 'cjs2es',
            format: 'iife' 
        },
        external: false,
        plugins: [resolve(),terser()]
    }

] : [

    {
        input: 'src/index.js',
        output: {
            file: pkg.main, 
            format: 'cjs' 
        },
        external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ]
    }

]