module.exports = (api) => {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        components: './src/components',
                        app: './src/app',
                        utils: './src/utils',
                        apollo: './src/apollo',
                        assets: './src/assets',
                        global: './src/global'
                    }
                }
            ],
            ['module:react-native-dotenv']
        ]
    }
}
