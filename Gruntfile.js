module.exports = function(grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);
   grunt.loadNpmTasks('grunt-aws-lambda');

   // Configurable paths
   var config = {
      aws: grunt.file.readYAML("config/aws-config.yaml")
   };

   var AWS = require('aws-sdk');

   grunt.initConfig({
      aws_region: config.aws.aws_region,

      lambda_invoke: {
         default: {
            options: {
               file_name: 'index.js'
            }
         }
      },
      lambda_deploy: {
         default: {
            arn: null, // bug in the plugin requires you to specify null if function name is specified
            function: 'helloWorldLambda',
            options: {
               region: config.aws.aws_region,
               timeout: 45,
               memory: 256
            }
         }
      },
      lambda_package: {
         default: {}
      }
   });

   grunt.registerTask('test', ['lambda_invoke']);
   grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);

}