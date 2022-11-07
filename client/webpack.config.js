const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv)
    config.module.rules.push(
        ...[
            // for graphql-tools compatability on web
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            }
        ]
    )

    return config
}
