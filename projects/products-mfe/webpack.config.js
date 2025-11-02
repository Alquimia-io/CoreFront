const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'productsMfe',
      library: { type: 'var', name: 'productsMfe' },
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsModule': './projects/products-mfe/src/app/products/products.module.ts'
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