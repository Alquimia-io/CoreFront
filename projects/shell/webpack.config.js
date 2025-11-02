const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      library: { type: 'var', name: 'shell' },
      filename: 'remoteEntry.js',
      remotes: {
        authMfe: 'authMfe@http://localhost:4201/remoteEntry.js',
        productsMfe: 'productsMfe@http://localhost:4202/remoteEntry.js'
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