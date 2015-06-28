module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				jshintrc: 'config/grunt/.jshintrc.json'
			}
		},
		jscs: {
			src: ['Gruntfile.js', 'src/**/*.js'],
			options: {
				config: 'config/grunt/.jscs.json'
			}
		},
		less: {
			development: {
				files: {
					'src/css/style.css': ['src/less/vendor/*.less', 'src/less/*.less']
				}
			}
		},
		uncss: {
			dist: {
				files: {
					'app/css/style.css': ['src/index.html']
				}
			}
		},
		processhtml: {
			dist: {
				files: {
					'index.html': ['src/index.html']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				keepSpecialComments: 0
			},
			target: {
				files: {
					'app/css/style.min.css': ['app/css/style.css']
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'app/js/app.min.js': ['src/js/app.js', 'src/js/vendor/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',
		['jshint', 'jscs', 'less:development', 'uncss', 'cssmin', 'uglify', 'processhtml']);
};
