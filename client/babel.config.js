module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        ['@babel/plugin-proposal-export-default-from'],
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
