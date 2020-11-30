import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const plugins = [
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    }),
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: './es/index.js',
    output: {
        file: `dist/mam${process.env.BROWSER ? '.browser' : ''}${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'mam',
        compact: process.env.MINIFY,
        globals: {
            "big-integer": "bigInt",
            "crypto": "crypto",
            '@iota/iota2.js': 'Iota2'
        }
    },
    plugins,
    external: process.env.BROWSER
        ? ['@iota/iota2.js', 'big-integer', 'crypto']
        : ['@iota/iota2.js', 'big-integer', 'crypto']
}