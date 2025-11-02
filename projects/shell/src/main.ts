import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'authMfe': 'http://localhost:4200/remoteEntry.json',
  'productsMfe': 'http://localhost:4200/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
