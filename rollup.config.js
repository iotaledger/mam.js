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
        file: `dist/cjs/index${process.env.BROWSER ? '-browser' : '-node'}${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'Mam',
        compact: process.env.MINIFY,
        globals: {
            "big-integer": "bigInt",
            "crypto": "crypto",
            '@iota/crypto.js': 'IotaCrypto',
            '@iota/iota.js': 'Iota',
            '@iota/util.js': 'IotaUtil'
        }
    },
    plugins,
    external: process.env.BROWSER
        ? ['@iota/crypto.js', '@iota/iota.js', '@iota/util.js', 'big-integer', 'crypto']
        : ['@iota/crypto.js', '@iota/iota.js', '@iota/util.js', 'big-integer', 'crypto']
}