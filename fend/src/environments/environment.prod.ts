export const environment = {
  production: true,
  SOCKET_ENDPOINT: 'localhost:5000',
};


/* local env */
const protocol = 'http';
const host = 'localhost';
const port = '5000';


const webHost = 'http://localhost:4200/';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}`;
const endpoint = `${hostUrl}`;


const superAdminEmail = ''
export const ENVIRONMENT = {
  production: false,
  API: {
    protocol,
    host,
    port,
    hostUrl,
    webHost
  },
  API_ENDPOINT: endpoint,
  TEMP_URL: hostUrl,
  SUPER_ADMIN_EMAIL: superAdminEmail
};

export interface APIOptions {
  protocol: string;
  host: string;
  port: string;
  hostUrl: string;
  webHost: string;
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
