module.exports = (api) => {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'inline-react-svg',
            [
                'module-resolver',
                {
                    alias: {
                        components: './src/components',
                        app: './src/app',
                        generated: './src/generated',
                        navigation: './src/navigation',
                        hooks: './src/hooks',
                        utils: './src/utils',
                        theme: './src/theme',
                        mocks: './src/mocks',
                        cache: './src/cache',
                        apollo: './src/apollo',
                        assets: './src/assets'
                    }
                }
            ]
        ]
    }
}
