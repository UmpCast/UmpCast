module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        ['@babel/plugin-proposal-export-default-from'],
        'react-native-reanimated/plugin',
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
