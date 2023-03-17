/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage', // https://github.com/nestjs/mapped-types/issues/486#issuecomment-932715880
    '@fastify/static',
  ];

  options.module.rules[0].use[0].options.transpileOnly = true;

  return {
    ...options,
    externals: [],
    module: {
      rules: [
        ...options.module.rules,
        {
          test: /\.node$/,
          loader: 'node-loader',
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
    plugins: [
      ...options.plugins,

      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            // Copy the Swagger UI files to the dist folder;
            from: 'node_modules/swagger-ui-dist/',
            to: './swagger',
            globOptions: {
              ignore: [
                '**/*.map',
                '**/*.md',
                '**/*.html',
                '**/*.json',
                '**/LICENSE',
                '**/NOTICE',
                '**/index.js',
              ],
            },
          },
        ],
      }),
    ],
  };
};
