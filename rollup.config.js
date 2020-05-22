import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

const plugins = [
    commonjs({
        include: 'node_modules/**',
        namedExports: {
            "@iota/converter": ['asciiToTrytes', 'trits', 'trytes', 'trytesToAscii', 'value']
        }
    }),
    resolve({
        browser: process.env.BROWSER
    }),
    typescript({
        target: 'es5',
        module: 'es2015'
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: process.env.BROWSER ? './src/browser.ts' : './src/index.ts',
    output: {
        file: `dist/mam${process.env.BROWSER ? '.browser' : ''}${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'mam',
        compact: process.env.MINIFY
    },
    plugins,
    external: process.env.BROWSER
        ? ['big-integer']
        : ['@iota/converter', '@iota/core', '@iota/validators', 'big-integer']
}