import gulp from "gulp"
import shell from "gulp-shell"

export const build = shell.task([
  "parcel build ./index.html"
]);

export const serve = shell.task([
  "parcel serve ./index.html"
]);
export const test = shell.task([
  "npx mocha"
]);

export default gulp.series(build, serve);