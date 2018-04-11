/*
   ___
  / __|___ _ __ _  _
 | (__/ _ \ "_ \ || |
  \___\___/ .__/\_, |
          |_|   |__/

  Copy the production ready assets to the ./dist folder.

  NOTE: hidden files must be added explicitly to be copied (or use the
  {"dot": true} setting).

*/

let gulp    = require("gulp"),
    config  = require("../config");

/*
------------------------------------------
| copy:void (-)
------------------------------------------ */
gulp.task("copy", gulp.series(copyFiles));

/*
------------------------------------------
| copy:stream (-)
|
| Copies fiels from the specified below.
------------------------------------------ */
function copyFiles(){
  return gulp.src([
    config.assetPath + "/assets/**/*"
  ])
  .pipe(gulp.dest(config.dev));
}
