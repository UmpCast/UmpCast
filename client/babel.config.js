module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        ['resolve-barrel-files'],
        ['@babel/plugin-proposal-export-namespace-from'],
        [
            'import-graphql',
            {
                runtime: true
            }
        ],
        [
            'module-resolver',
            {
                alias: {
                    '@': './src'
                }
            }
        ]
    ]
}
