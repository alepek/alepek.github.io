module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'src/*.js'],
			options: {
				jshintrc: 'config/grunt/.jshintrc.json'
			}
		},
		jscs: {
			src: ['Gruntfile.js', 'src/*.js'],
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
					'app/js/app.min.js': ['src/js/vendor/jquery.js', 'src/js/vendor/*.js', 'src/js/app.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ['Gruntfile.js', 'src/js/**/*.js'],
				tasks: ['jshint', 'jscs', 'uglify'],
				options: {
					spawn: true,
					reload: true,
					debounceDelay: 250
				}
			},
			html: {
				files: ['src/*.html'],
				tasks: ['processhtml'],
				options: {
					spawn: true,
					debounceDelay: 250
				}
			},
			css: {
				files: ['src/**/*.less'],
				tasks: ['less:development', 'uncss', 'cssmin'],
				options: {
					spawn: true,
					debounceDelay: 250
				}
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
		grunt.event.removeAllListeners('watch');
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build',
		['jshint', 'jscs', 'less:development', 'uncss', 'cssmin', 'uglify', 'processhtml']);
};
