var path = require("path");

module.exports = {
	entry: {
		bundle:['webpack/hot/dev-server',"index.html","boot.js"]
	},
	output: {
		path: path.resolve(__dirname, '<%=folder %>'),
		filename: '[name].js'
	},
	module: {
		<% if (eslint) {%>
		preLoaders:[{
            test:    /\.jsx?$/,
            exclude: /node_modules/,
            include: Path.resolve(__dirname, 'src'),
            loaders: ['eslint-loader']
        }],<% }%>
		loaders: [
			{ test: /\.jsx$/, loader: 'jsx-loader' },
			{ test: /\.css$/, loader: "style!css"},
			<% if (style==='saas') { %>{ test: /\.sass$/, loader: "style!css!sass" <% } %>
			<% if (style==='less') { %>{ test: /\.less$/, loader: "style!css!less" <% } %>
			{ test: /\.(jpg|png)$/, loader: "url?limit=8192"},
			{ test: /\.(html)$/, loader: "file?name=[path][name].[ext]&context=./app"}
		],
	},
};
