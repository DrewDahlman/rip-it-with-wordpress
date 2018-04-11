/*
   ___ _
  / __| |___ __ _ _ _
 | (__| / -_) _` | " \
  \___|_\___\__,_|_||_|

 Get rid of everything Gulp generates. You can see the stripes ...

*/

let gulp    = require("gulp"),
    del     = require("del"),
    config  = require("../config");

/*
------------------------------------------
| clean:void (-)
------------------------------------------ */
gulp.task("clean", gulp.series(remove));

/*
------------------------------------------
| del:void (-)
|
| Deletes everything in specified directories.
------------------------------------------ */
function remove(done){
  return del(config.dev,{ force: true });
}
