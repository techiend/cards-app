const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Agregar soporte para alias
config.resolver.sourceExts.push('ts', 'tsx', 'css'); // Asegura soporte para TypeScript
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@/')) {
    const newModuleName = moduleName.replace('@/', path.resolve(__dirname, 'src') + '/');
    return context.resolveRequest(context, newModuleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;