/*
                      _
 _ __ ___   __ _ _ __| | ___   _ _ __
| '_ ` _ \ / _` | '__| |/ / | | | '_ \
| | | | | | (_| | |  |   <| |_| | |_) |
|_| |_| |_|\__,_|_|  |_|\_\\__,_| .__/
                                |_|

Renders static HTML files from mustache.

*/

let gulp         = require("gulp"),
    fs           = require("fs"),
    mustache     = require("gulp-mustache"),
    config       = require("../config");

/*
------------------------------------------
| markup:void (-)
------------------------------------------ */
gulp.task("markup", gulp.series(compileHTML));

/*
------------------------------------------
| compileHTML:stream
|
| Compiles markup in mustache to static HTML.
------------------------------------------ */
function compileHTML(){
  return gulp.src(config.assetPath + "/markup/**/**/*.php")
    .pipe(gulp.dest( config.dev ))
}
