/*jshint browser: true*/
/*jshint esnext: true*/

module.exports = {
    entry: {
        fsm: './src/App/FSM/main.js'
    },
    output: {
        filename: './src/[name].js'
    },
    watch: true,
    devServer: {
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { 
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                } 
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
};