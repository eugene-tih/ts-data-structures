const fs = require('fs');
const path = require('path');

const {execSync} = require('child_process');

// series([
//     exec('npm run dev'),
//     exec('npm run test')
// ]);

execSync('npm run build:rollup config rollup.config.js');

return;

// Get all necessary directories
const rootDir = path.dirname(path.resolve('..', __dirname));
const typescriptArtifactsDir = path.resolve(rootDir, 'compiled');
const buildDir = path.resolve(rootDir, 'build');

if (!fs.existsSync(typescriptArtifactsDir)) {
    throw new Error('Cannot find folder with typescript artifacts.');
}

fs.rmdirSync(buildDir, { recursive: true });
fs.mkdirSync(buildDir);

const structuresDir = getDirectories(typescriptArtifactsDir);

structuresDir.forEach(dir => {

});

// console.log(path.dirname(require.main.filename));


// console.log(require.main.filename);
console.log(rootDir);
// fs.readdirSync('./')


function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
