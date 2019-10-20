// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  apiUrl: 'https://connect.core.nxfifteen.me.uk',
  uiUrl: 'http://localhost:4200',
  production: false,
  sentryDns: 'https://0535e5fa521e4246808526cd419c7856@sentry.io/1757010',
  version: '0.0.0.2',
};
