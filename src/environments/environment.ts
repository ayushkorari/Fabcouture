// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://13.59.66.175:3000/',
  config: {
    AWS_BUCKET: 'udown-appfiles',
    AWS_ACCESS_KEY: 'AKIAJEV4OJD4FA6IEDFQ',
    AWS_SECRET_KEY: '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',
    AWS_REGION: 'us-east-1'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
