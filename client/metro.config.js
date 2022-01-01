const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: false
    }
})

defaultConfig.resolver.sourceExts.push('cjs')

module.exports = defaultConfig
