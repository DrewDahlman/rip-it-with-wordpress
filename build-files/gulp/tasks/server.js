/*
  ___
 / __| ___ _ ___ _____
 \__ \/ -_) '_\ V / -_)
 |___/\___|_|  \_/\___|

 You just got served. By a webserver. Because that's what they do ...

*/

let gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    browserSyncReuseTab = require("browser-sync-reuse-tab")(browserSync),
    config = require("../config");

/*
------------------------------------------
| server:server (-)
|
| Sets up a browsersync server.
| Will attempt to focus on already open windows
| if the app is shut down and restarted.
------------------------------------------ */
gulp.task("server", function() {
  return browserSync.init({
    server: {
      baseDir: config.root,
    },
    files: [
      config.dev + "/css/**/*.css",
      config.dev + "/scripts/**/*.js"],
    port: config.port,
    open: false
  }, browserSyncReuseTab);
});
