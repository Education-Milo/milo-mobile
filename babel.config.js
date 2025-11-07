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
              '@utils': './src/utils',
              '@constants': './src/constants',
              '@assets': './assets',
              '@validations': './src/validations',
              '@stores': './src/stores',
              '@api': './src/api',
              '@i18n': './src/i18n',
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