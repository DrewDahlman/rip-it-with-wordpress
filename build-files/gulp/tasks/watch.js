/*
 __      __    _      _
 \ \    / /_ _| |_ __| |_
  \ \/\/ / _` |  _/ _| " \
   \_/\_/\__,_|\__\__|_||_|

 Watch ES6, Sass and templates for changes and compile on the fly.

 "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come."

*/

let gulp    = require("gulp"),
    config  = require("../config");

/*
------------------------------------------
| watch:void (-)
------------------------------------------ */
gulp.task("watch", function(){
  gulp.watch( config.watchPath + "/scripts/**/**/*.js", gulp.parallel("scripts") );
  gulp.watch( config.watchPath + "/templates/**/**/*.html", gulp.parallel("scripts") );
  gulp.watch( config.watchPath + "/styles/**/**/*", gulp.parallel("styles") );
  gulp.watch( config.watchPath + "/markup/**/**/*", gulp.parallel("markup") );
});
