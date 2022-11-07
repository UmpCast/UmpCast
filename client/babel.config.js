module.exports = function (api) {
    api.cache(true)
    return (module.exports = {
        presets: ['babel-preset-expo'],
        plugins: [
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
    })
}
