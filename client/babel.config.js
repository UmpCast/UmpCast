module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@': './src'
                }
            }
        ],
        [
            'import-graphql',
            {
                runtime: true
            }
        ]
    ]
}
