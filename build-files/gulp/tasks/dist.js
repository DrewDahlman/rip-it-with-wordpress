/*
  ___  _    _
 |   \(_)__| |_
 | |) | (_-<  _|
 |___/|_/__/\__|

 Run this to compile final

*/

let gulp = require("gulp");

/*
------------------------------------------
| dist:void (-)
|
| The Dist Gulp task for going to production.
| - clean
| - styles
| - scripts
| - markup
| - rev
| - clean
| - replace
| - copy
| - cleanup
------------------------------------------ */
gulp.task("dist", gulp.series("clean", "scripts", "styles", "markup", "rev", "replace", "clean", "copy", "cleanup"));

