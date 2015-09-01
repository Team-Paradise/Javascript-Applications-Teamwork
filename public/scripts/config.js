
System.config({
    transpiler: 'babel',
	babelOptions: {
		/*optional: [
			"runtime"
		]*/
	},
    map: {
        babel: 'lib/babel-core/browser.js',
		jquery: 'lib/jquery/dist/jquery.js'
    }
});