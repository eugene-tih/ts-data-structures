export default {
    input: 'compiled/Main.js',
    output: {
        file: './build/bundle.js',
        format: 'cjs',
        exports: 'named',
        esModule: false,
        strict: false,
    },
    treeshake: false,
};
