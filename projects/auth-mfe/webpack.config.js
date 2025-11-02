const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authMfe',
      library: { type: 'var', name: 'authMfe' },
      filename: 'remoteEntry.js',
      exposes: {
        './AuthModule': './projects/auth-mfe/src/app/auth/auth.module.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        '@angular/forms': { singleton: true, strictVersion: true },
        'rxjs': { singleton: true, strictVersion: true },
        'domain': { singleton: true },
        'infrastructure': { singleton: true },
        'shared': { singleton: true }
      }
    })
  ]
};