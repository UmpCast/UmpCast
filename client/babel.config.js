module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        ['@babel/plugin-proposal-export-default-from'],
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
