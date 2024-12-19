/* eslint-disable */
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const publish = require('@futagoza/gulp-publish-package');
const eslint = require('gulp-eslint');
const touch = require('gulp-touch-cmd');
const srcDestination = 'src';
const path = require('path');
const preprocess = require('gulp-preprocess');
const fs = require('fs');
const logger = require('./build/logger.mjs')

const paths = {
    ts: {
        src: [`./src/**/*.ts`, `./src/**/*.tsx`],
        dest: `./dist/`,
    },
    style: {
        src: `./src/styles/index.less`,
        dest: `./dist/styles`,
    },
    assets: {
        src: ['./src/assets/**/*.woff2', './src/assets/**/*.woff', './src/assets/**/*.png', './src/assets/**/*.svg'],
        dest: './dist/assets',
    },
};

const context = {
    isPrivateBuild: process.env.BUILD_TYPE === 'private' ? 'true' : '',
};
/**
 * COMPONENTS BUILD
 */

function cleanDist() {
    return del(`./dist`);
}

function preProcessFiles() {
    logger('Gulp called', 'info')
    Object.keys(context).forEach((key) => {
        if (!context[key]) delete context[key];
    });

    gulp.src(path.join(__dirname, '/src/**/*.ts*'))
        .pipe(preprocess({ context }))
        .pipe(gulp.dest(path.join(__dirname, `${srcDestination}`)));
    // fs.writeFileSync(path.join(__dirname, 'sample.txt'), JSON.stringify(context));

}

// function compileLess() {
//     return gulp.src(paths.style.src).pipe(less()).pipe(gulp.dest(paths.style.dest)).pipe(touch());
// }

// function copyCSSAssets() {
//     return gulp.src(paths.assets.src).pipe(gulp.dest(paths.assets.dest));
// }

// const buildPackage = gulp.series(
//     function compilePackageLess() {
//         return compileLess();
//     },
//     function compileCSSAssets() {
//         return copyCSSAssets();
//     },
// );

// const watchLess = gulp.series(function compilePackageLess() {
//     return compileLess();
// });

// function checkLint() {
//     return gulp
//         .src(paths.ts.src)
//         .pipe(eslint({ configFile: '.eslintrc.json' }))
//         .pipe(eslint.format());
// }

// /**
//  * COMPONENTS WATCH
//  */
// gulp.task('watch', () => {
//     gulp.watch(['./src/**/*.less'], gulp.series(watchLess));
// });

// gulp.task('lint', () => {
//     gulp.watch(paths.ts.src, gulp.series(checkLint));
// });

// function publishPackage() {
//     return gulp.src(['./']).pipe(
//         publish({
//             access: 'restricted',
//             tag: 'test',
//         }),
//     );
// }

preProcessFiles();
// const compile = gulp.series(buildPackage);
// exports.clean = gulp.series(cleanDist);
// exports.build = gulp.series(compile);
// exports.publish = gulp.series(compile, publishPackage);
