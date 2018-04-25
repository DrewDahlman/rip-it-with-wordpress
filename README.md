# rip-it-with-wordpress
A cool place to start with Wordpress & Gulp.

## Getting Started
- Run `docker-compose up`
- Check it out at `http://localhost:8080`

## Configure
You can set basic configurations for your particular setup as well as app meta and build details in the `build-files/gulp/config.js` file.

## Dist
To create a dist build, minified with source maps.
- run `docker-compose run builder gulp dist -e production`

## Templates & Markup
Templates & Markup are handled by [mustache](https://mustache.github.io/) which allows us to create partials for common used components as well as environment based markup.

To use a template on the client side: ( note this auto resolves the path so no need to ever use `../../` the base is always `templates` )
```javascript
let template = require('templates/example.html')(data:json)
```

## Bundled Libs
The project starts off with `lodash`, `jQuery`, `mustache` and `modernizr` prebuilt and included. You don't need to expose them or import them anywhere.

## Dependency Management
Need to add a dependency? There are couple ways to do that.
  - Perfile require:
    - `docker-compose exec builder npm install YOUR_DEP_PACKAGE --save`
    - Then in places you need it `import MY_PACKAGE from 'my-package'` and use in files you need it.

  - Global Dependency
    - `npm install YOUR_DEP_PACKAGE --save`
    - In `build-files/gulp/webpack/plugins/plugins.js` add the plugin

      ```javascript
      new webpack.ProvidePlugin({
        YOUR_DEPENDENCY: "your_dependency"
      })
      ```
    - The key you give your dependency is how you will be able to access it.
    - Make sure you add any configurations if needed ( see Modernizr )


## File Structure
The idea is to have everything live inside of the `src` and build into `public` during dev and dist.

## Tools
This project is built on top of a number of different tools best suited for their respective tasks. Using Gulp as the task runner we can easily modify and customize each build to specific project needs.

- Gulp
  - Task management
  - Configuration ( `build-files/gulp/config.js` )
  - Reving files
  - Watching file changes
  - Compressing images
  - Uploading to s3 or desired destination

- Webpack
  - JavaScript bundling
  - Transpiling
  - Dependency management
  - Tree shaking / deduping
  - Common modules
  - Minification
  - ESLint
  - Sourcemaps

- Node Sass
  - Compiling Sass/SCSS files
  - Minification of CSS
  - Autoprefixing
  - Sourcemaps

- Browsersync
  - Basic dev server
  - Hot replacing CSS
  - Manage multiple devices

- Mustache
  - Static HTML creation using partials and includes
  - Dynamic clientside templates for javascript

## Deployment as a static site to s3
The project comes with a built in `deploy-static-aws` task that will run a dist and pipe the files to s3 for a static site hosting. You can run `gulp deploy-static-aws -e production` and it will run a production dist as well.

In order to use this make sure you have configured your `~/.aws/credentials` file for the user with the access key and secret, as well as the `build-files/gulp/config.js` with the identity to use, the bucket and the region.

## Deploy assets
Sometimes you may want to just deploy assets to s3, this can be done with `gulp deploy-assets`. This will upload all assets to the s3 bucket specified in the config.js and do a replace on any references to those assets in html, css and js.

## Tasks
run `gulp --tasks`
<pre>
├── asset-minify
├── clean
├── cleanup
├── copy
├─┬ default
│ └─┬ series
│   ├── clean
│   ├── scripts
│   ├── styles
│   ├── markup
│   ├── copy
│   └─┬ parallel
│     ├── watch
│     └── server
├─┬ deploy-assets
│ └─┬ series
│   ├── dist
│   ├── aws
│   └── replace
├─┬ deploy-static-aws
│ └─┬ series
│   ├── dist
│   └── aws
├─┬ dist
│ └─┬ series
│   ├── clean
│   ├── scripts
│   ├── styles
│   ├── markup
│   ├── rev
│   ├── replace
│   ├── clean
│   ├── asset-minify
│   └── cleanup
├─┬ markup
│ └─┬ series
│   └── compileHTML
├─┬ replace
│ └─┬ series
│   └── replaceRefs
├─┬ rev
│ └─┬ series
│   ├── revScripts
│   ├── copySourceMaps
│   └── revStyles
├─┬ scripts
│ └─┬ series
│   ├── setConfiguration
│   ├── getManifest
│   └── compileScripts
├── server
├─┬ styles
│ └─┬ series
│   ├── lint
│   ├── build
│   └── minify
└── watch
</pre>