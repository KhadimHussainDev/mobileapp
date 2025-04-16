const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@react-native-async-storage/async-storage',
          '@react-navigation',
          'react-native-vector-icons',
          'react-native-reanimated',
          'react-native-gesture-handler',
          'react-native-screens',
          'react-native-safe-area-context',
        ],
      },
    },
    argv
  );

  // Customize the config for web
  config.resolve.alias = {
    ...config.resolve.alias,
    // Use react-native-web for all react-native imports
    'react-native$': 'react-native-web',
    // Resolve the correct path for vector icons
    'react-native-vector-icons': 'react-native-vector-icons/dist',
  };

  // Ensure polyfills are loaded
  config.entry = [
    path.resolve(__dirname, 'src/utils/webPolyfills.js'),
    ...config.entry,
  ];

  // Add support for importing specific icon fonts
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  });

  // Set the HTML template file
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.template = './web/index.html';
    }
  });

  return config;
}; 