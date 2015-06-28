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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.registerTask('default', ['jshint', 'jscs']);
};
