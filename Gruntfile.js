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
		uncss: {
			dist: {
				files: {
					'dist/css/style.css': ['src/index.html']
				}
			}
		},
		processhtml: {
			dist: {
				files: {
					'index.html': ['src/index.html']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('default', ['jshint', 'jscs', 'uncss', 'processhtml']);
};
