// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://localhost:3000/volunteers',
  PUBLICKEY: ' public_IbxahIOtljwWt0cQXY+fdYm0kYY=',
  PRIVATEKEY: 'private_J7ty6K/3AxhD8dac2NDc7c8a2uU=',
  URLENDPOINT: 'https://ik.imagekit.io/cimrda',
  IMAGEKITID: 'cimrda',
  authenticationEndpoint:'http://localhost:3000/crypt'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
