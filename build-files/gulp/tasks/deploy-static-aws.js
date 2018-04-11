/*
     _            _                   _        _   _
  __| | ___ _ __ | | ___  _   _   ___| |_ __ _| |_(_) ___    __ ___      _____
 / _` |/ _ \ '_ \| |/ _ \| | | | / __| __/ _` | __| |/ __|  / _` \ \ /\ / / __|
| (_| |  __/ |_) | | (_) | |_| | \__ \ || (_| | |_| | (__  | (_| |\ V  V /\__ \
 \__,_|\___| .__/|_|\___/ \__, | |___/\__\__,_|\__|_|\___|  \__,_| \_/\_/ |___/
           |_|            |___/

Push up to s3 as a static site

Make sure you have your credentials stored locally in ~/.aws/credentials and have your identity added.

*/
let gulp        = require("gulp"),
    AWS         = require("aws-sdk"),
    fs          = require("fs"),
    path        = require("path"),
    mime        = require("mime"),
    config      = require("../config"),
    manifest    = {},
    totalFiles  = 0,
    dirs        = [],
    s3;

/*
------------------------------------------
| deploy:void (-)
------------------------------------------ */
gulp.task("deploy-static-aws", gulp.series("dist", aws));

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
        console.log("Site now live at: " + config.aws.bucket + ".s3-website-" + config.aws.region + ".amazonaws.com");
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
        resolve();
      });
    });
  });
}

/*
------------------------------------------
| generateManifest:void (-)
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
          } else {
            manifest[file] = file;
          }
        });

        if( dirs.length > 0 ){
          resolve( generateManifest( config.dev + "/" + dirs[0] ) );
          dirs.shift();
        } else {
          resolve();
        }
      }
    });
  });
}

/*
------------------------------------------
| parseDir:void (-)
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
        } else {

          // Upload the file and wait for complete
          upload(dir, dir + "/" + file)
          .then( () => {

            // Reduce the file count and increment i
            dirFilesCount--;
            i++;

            // If nor more dirs to loop through and i is total files resolve
            if( dirs.length == 0 && i == totalFiles ){
              resolve();
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
| upload:void (-)
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
        resolve();
      }
    });
  });
}