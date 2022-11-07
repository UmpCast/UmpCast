const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// required to prevent eas build errors on firebase
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;