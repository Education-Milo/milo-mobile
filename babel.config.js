module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              '@hooks': './src/hook',
              '@screens': './src/screens',
              '@components': './src/components',
              '@navigation': './src/navigation',
              '@theme': './src/theme',
              '@constants': './src/constants',
              '@assets': './assets',
              '@services': './src/services',
              '@stores': './src/stores',
              '@api': './src/api',
              '@': './src',
            },
          },
        ],
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
            blacklist: null,
            whitelist: null,
            safe: false,
            allowUndefined: true,
          },
        ],
      ],
    };
  };