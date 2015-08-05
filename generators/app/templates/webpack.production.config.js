var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: {
		bundle:["./src/index.html","./src/boot.js"]   		
	},
	resolve: {
		alias: {'react':'react/dist/react.min.js'}
	},
	output: {
		path: path.resolve(__dirname,'<%= folder%>'),
		filename: '[name].js'
	},
	module: {
		<% if (eslint) {%>
		preLoaders:[{
            test:    /\.jsx?$/,
            exclude: /node_modules/,
            include: Path.resolve(__dirname, 'src/'),
            loaders: ['eslint-loader']
        }],<% }%>
		loaders: [
			{ test: /\.(ttf|eot|png|gif|jpg|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=8192" },
			{ test: /\.(jsx|js)/, loader: 'jsx-loader' },
            { test: /\.(js|jsx)/, loader:'babel?stage=1'},
			{ test: /\.css$/, loader: "style!css"},
			<% if (style==='sass') { %>{ test: /\.sass$/, loader: "style!css!sass" <% } %> },
			<% if (style==='less') { %>{ test: /\.less$/, loader: "style!css!less" <% } %> },
			{ test: /\.(html)$/, loader: "file?name=[path][name].[ext]&context=./app"}
		],
	},
	plugins: [ 
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]
};
