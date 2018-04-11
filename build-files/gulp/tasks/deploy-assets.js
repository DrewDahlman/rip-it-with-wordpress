/*
     _            _                                  _
  __| | ___ _ __ | | ___  _   _    __ _ ___ ___  ___| |_ ___
 / _` |/ _ \ '_ \| |/ _ \| | | |  / _` / __/ __|/ _ \ __/ __|
| (_| |  __/ |_) | | (_) | |_| | | (_| \__ \__ \  __/ |_\__ \
 \__,_|\___| .__/|_|\___/ \__, |  \__,_|___/___/\___|\__|___/
           |_|            |___/

Deploy just assets and run a replace in scripts, styles and markup.

Make sure you have your credentials stored locally in ~/.aws/credentials and have your identity added.

*/
let gulp          = require("gulp"),
    AWS           = require("aws-sdk"),
    fs            = require("fs"),
    path          = require("path"),
    mime          = require("mime"),
    revReplace    = require("gulp-rev-replace"),
    config        = require("../config"),
    manifest      = {},
    totalFiles    = 0,
    dirs          = [],
    s3;

/*
------------------------------------------
| deploy:void (-)
------------------------------------------ */
gulp.task("deploy-assets", gulp.series("dist", aws, replace));

/*
------------------------------------------
| aws:stream (-)
|
| Deploy project to s3.
------------------------------------------ */
function aws(done){

  // Set the identity
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: config.aws.identity
  });

  // For dev purposes only
  AWS.config.update({
    region: config.aws.region
  });

  // S3
  s3 = new AWS.S3();

  // deploy
  generateManifest( config.dev)
  .then( () => {
    emptyBucket()
    .then( () => {
      parseDir( config.dev )
      .then( () => {
        done();
      });
    });
  });
}

/*
------------------------------------------
| emptyBucket:promise (-)
|
| Empty the bucket.
------------------------------------------ */
function emptyBucket(){
  return new Promise( (resolve, reject) => {
    let params = {
      Bucket: config.aws.bucket,
      Prefix: ""
    };

    // Clear Everything out
    s3.listObjects(params, (err, data) => {
      if (err) console.log(err);

      params = {Bucket: config.aws.bucket};
      params.Delete = {Objects:[]};

      data.Contents.forEach( (content) => {
        params.Delete.Objects.push({Key: content.Key});
      });

      s3.deleteObjects(params, (err, data) => {
        console.log("Bucket emptied!");
        resolve(data);
      });
    });
  });
}

/*
------------------------------------------
| generateManifest:promise (-)
|
| Gets manifest of all files and total count
------------------------------------------ */
function generateManifest( dir ){
  return new Promise( (resolve, reject) => {
    fs.readdir( dir, (err, files) => {

      if(files){
        totalFiles += files.length;

        files.forEach( (file) => {
          if( path.extname(file) == "" ){
            dirs.push( file );
            totalFiles--;
          } else if(path.extname(file) == ".html"){
            totalFiles--;
          } else {
            let key = dir.replace(config.dev, "") + "/" + file;
            manifest[key] = "//" + config.aws.bucket + ".s3.amazonaws.com" + dir.replace(config.dev, "") + "/" + file;
          }
        });

        if( dirs.length > 0 ){
          resolve( generateManifest( config.dev + "/" + dirs[0] ) );
          dirs.shift();
        } else {
          fs.writeFile(config.dev + '/asset-manifest.json', JSON.stringify(manifest), () => {
            resolve();
          });
        }
      }
    });
  });
}

/*
------------------------------------------
| parseDir:promise (-)
|
| Recursive function to go over files in directories.
------------------------------------------ */
function parseDir( dir, i = 0 ){
  return new Promise( (resolve, reject) => {

    // Read the directory
    fs.readdir( dir, (err, files) => {

      // Get the total file count for the directory
      let dirFilesCount = files.length;

      // Loop each file
      files.forEach( (file) => {

        // if the file is a direcory remove it from count and push into array
        if( path.extname(file) == "" ){
          dirs.push( file );
          dirFilesCount--;
        } else if( path.extname(file) == ".html" ){
          dirFilesCount--;
        } else {

          // Upload the file and wait for complete
          upload(dir, dir + "/" + file)
          .then( () => {

            // Reduce the file count and increment i
            dirFilesCount--;
            i++;

            // If nor more dirs to loop through and i is total files resolve
            if( dirs.length == 0 && i == totalFiles ){
              setTimeout( () => { resolve(); }, 1000);
            }

            // If dir file count is 0 but more dirs left parse the next dir
            if( dirFilesCount == 0 && dirs.length > 0 ){
              resolve( parseDir( config.dev + "/" + dirs[0], i) );
              dirs.shift();
            }

          });
        }
      });
    });
  });
}

/*
------------------------------------------
| upload:promise (-)
|
| Upload files.
------------------------------------------ */
function upload( dir, file ){

  return new Promise( (resolve, reject) => {
    let params = {
      Bucket: config.aws.bucket + dir.replace(config.dev, ""),
      Key: "",
      Body: "",
      ACL: "public-read",
      ContentType: mime.lookup(file)
    }

    let fileStream = fs.createReadStream(file);
    fileStream.on("error", (err) => { console.log("File Error", err); });

    file = file.replace(config.dev + "/", "");
    params.Body = fileStream;
    params.Key = path.basename(file);
    s3.upload (params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
      resolve();
    });
  });
}

/*
------------------------------------------
| replace:stream (-)
|
| Replace all mentions of assets with URL.
------------------------------------------ */
function replace(done){
  let asset_manifest = gulp.src(config.dev + "/asset-manifest.json");

  return new Promise( (resolve, reject) => {
    gulp.src([config.dev + "/**/*.html", config.dev + "/**/*.css", config.dev + "/**/*.js"])
      .pipe(revReplace({manifest: asset_manifest}))
      .pipe(gulp.dest(config.dev))
      .on('finish', () => {
        fs.unlink(config.dev + "/asset-manifest.json", () => {
          resolve();
        });
      });
  });
}