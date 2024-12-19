const gulp = require('gulp');
const preprocess = require('gulp-preprocess');
const { BUILD_TYPE, ENVIRONMENT } = require('./buildType');
const fs = require('fs');
const path = require('path');
let srcDestination = 'src';

//Default context
const context = {
    isPrivateBuild: true
};

function preProcessFiles() {
    Object.keys(context).forEach((key) => {
        if (!context[key]) delete context[key];
    });

    gulp.src(path.join(__dirname, '../src/**/*.ts*'))
        .pipe(preprocess({ context }))
        .pipe(gulp.dest(path.join(__dirname, `../${srcDestination}`)));
}

// function updateCapabilities() {
//     const capabilities = require('../capabilities.json');
//     if(BUILD_TYPE === 'private') {
//         capabilities.privileges.length = 2; // len 2 if private
//         capabilities.privileges[1] = webAccess.PRIVATE;
//     }
//     fs.writeFileSync(path.join(__dirname, '../capabilities.json'), JSON.stringify(capabilities, null, 2));
// }
// const BUILD_DATE = moment().utcOffset('+05:30').format('DD MMM kk:mm');

// const fullBuildNumber = String(pbiviz.visual.version);
// const BUILD_NUMBER = ` (${BUILD_DATE} v${fullBuildNumber.substring(0, fullBuildNumber.length)})`;

preProcessFiles();
// updateCapabilities();
// pbiviz.visual.displayName = `xViz Performance Flow${context.localBuild ? BUILD_NUMBER : ''}`;
// fs.writeFileSync(path.join(__dirname, '../pbiviz.json'), JSON.stringify(pbiviz, null, 2));
