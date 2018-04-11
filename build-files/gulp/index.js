/*
             _
  __ _ _   _| |_ __
 / _` | | | | | '_ \
| (_| | |_| | | |_) |
 \__, |\__,_|_| .__/
 |___/        |_|

This is the main entry point for gulp.

For some reading about the upgrade to 4.0:
  - https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/

This project autoloads all tasks, so if adding a new task just create the tasks base file and assign its name and gulp will automatically load it and make it available to use.

*/

let gulp  = require("gulp"),
		glob  = require("glob"),
		path  = require("path"),
		tasks = glob.sync(path.join(__dirname, "./tasks/*.js")),
    args  = process.argv.slice(2);

// Check for production flags
process.env.NODE_ENV = args[1] === "-e" && args[2] === "production" ? "production" : "development";

// Glob and require all tasks
tasks.forEach( (task) => {
	require(task);
});
