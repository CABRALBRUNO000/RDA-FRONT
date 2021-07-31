// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  AMBIENTE: 'desenvolvimento',

  API: 'http://localhost:3000',
  // API:'http://localhost:3000/volunteers',
  PUBLICKEY: 'public_+hB40s/S9YExGhUnrP6lqyWo16Q=', 
  PRIVATEKEY: 'private_NXH5tlpCiAYoPOzICzZvdk8US68=', 
  URL_ENDPOINT: 'https://ik.imagekit.io/cimrda/', 
  IMAGEKITID: 'cimrda',
  authenticationEndpoint:'https://api-rda.vercel.app/crypt' 
};

/* 
 API: 'http://localhost:3000/volunteers',
  PUBLICKEY: ' public_IbxahIOtljwWt0cQXY+fdYm0kYY=',
  PRIVATEKEY: 'private_NXH5tlpCiAYoPOzICzZvdk8US68=',
  URLENDPOINT: 'https://ik.imagekit.io/cimrda',
  IMAGEKITID: 'cimrda',
  authenticationEndpoint:'http://localhost:3000/crypt'


 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
