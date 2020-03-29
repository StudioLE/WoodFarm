# Wood Farm

Wood Farm website built with [Hugo](https://gohugo.io/)

## Usage

### `npm start` and `npm run build`

Copies the required js, css, and font files from `node_modules` to `resources/assets/vendor` and `static/assets/fonts` using [Gulp](https://gulpjs.com/).

Builds the website with [Hugo](https://gohugo.io) for the `production` environment.

### `npm test`

Run end-to-end tests with [TestCafe](https://devexpress.github.io/testcafe)

### `npm run server`

Builds the website with [Hugo](https://gohugo.io) and serves it on [localhost:1313](http://localhost:1313) with the `development` environment and live reload.

### `npm run clean`

Remove generated `resources/assets/vendor`, `static/assets/fonts`, and `public` directories.

### `npm run deploy` and `npm run deploy-dry`

Deploy the website to [Amazon S3](https://aws.amazon.com/s3) with appropriate `cache-control` headers.

### `npm run invalidate`

Invalidate the [CloudFront](https://aws.amazon.com/cloudfront) edge caches.
