export default {
    input: 'compiled/LinkedList/LinkedList.js',
    output: {
        file: 'bundle.js',
        format: 'cjs',
        exports: 'named',
        esModule: false,
        strict: false
    },
    treeshake: false
};
