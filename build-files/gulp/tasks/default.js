/*
   ___      _
  / __|_  _| |_ __
 | (_ | || | | "_ \
  \___|\_,_|_| .__/
             |_|

  The default task. Compiles your junk, starts the server, starts
  the watcher and cranks open your browser so you can get after it.

*/
let gulp  = require("gulp"),
    hub   = require("gulp-hub")(["tasks/*.js"]);

// Add tasks to gulp registry
gulp.registry(hub);

/*
------------------------------------------
| default:void (-)
|
| The default Gulp task to kick things off
| - clean
| - scripts
| - styles
| - copy
| - watch
------------------------------------------ */
gulp.task("default", gulp.series("clean", "scripts", "styles", "copy", "markup", gulp.parallel("watch")));
