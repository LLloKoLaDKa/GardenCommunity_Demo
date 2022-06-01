const path = require('path');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        ads: "./apps/ads/main.tsx",
        auth: "./apps/auth/main.tsx",
        appeals: "./apps/appeals/main.tsx",
        home: "./apps/home/main.tsx",
        users: "./apps/users/main.tsx",
        sectors: "./apps/sectors/main.tsx",
        gardeners: "./apps/gardeners/main.tsx",
        infrastructure: "./apps/infrastructure/main.tsx",
        accesspolicies: "./apps/accesspolicies/main.tsx",
        configurations: "./apps/configurations/main.tsx",
        novelties: "./apps/novelties/main.tsx",
        contacts: "./apps/contacts/main.tsx",
        photos: "./apps/photos/main.tsx",
        credits: "./apps/credits/main.tsx",
        pageentries: "./apps/pageEntriesStatistics/main.tsx",
        site: "./apps/site/main.tsx"
    },
    output: {
        path: path.resolve(__dirname, '../../wwwroot/dist/'),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.pdf']
    },
    module: {
        rules: [
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: { localIdentName: '[name]__[local]--[hash:base64:5]' }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
                exclude: /(node_modules)/
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp|pdf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    },
    // plugins: [
    //     new BundleAnalyzerPlugin({
    //         analyzerMode: 'server',
    //         generateStatsFile: true,
    //         statsOptions: { source: false }
    //     })
    // ]
}
