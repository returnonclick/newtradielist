'use strict';

module.exports = {
  // Development asset
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/font-awesome/css/font-awesome.min.css',
        'public/lib/ytplayer/css/jquery.mb.YTPlayer.min.css',
        'public/lib/magnific-popup/css/magnific-popup.css',
        'public/lib/owl-carousel/css/owl.carousel.css',
        'public/lib/owl-carousel/css/owl.carousel.plugins.css',
        'public/lib/owl-carousel/css/owl.theme.default.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/jquery/dist/jquery-1.11.1.min.js',
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/vendor/jquery.easing.min.js',
        'public/lib/vendor/jquery.stellar.min.js',
        'public/lib/vendor/smoothscroll.js',
        'public/lib/vendor/jquery.counterup.min.js',
        'public/lib/vendor/waypoints.min.js',
        'public/lib/ytplayer/js/jquery.mb.YTPlayer.min.js',
        'public/lib/magnific-popup/js/jquery.magnific-popup.min.js',
        'public/lib/vendor/masonry.pkgd.min.js',
        'public/lib/vendor/imagesloaded.pkgd.min.js',
        'public/lib/owl-carousel/js/owl.carousel.js',
        'public/lib/owl-carousel/js/owl.carousel.plugins.js',
        'public/theme.js',
        'public/custom.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
