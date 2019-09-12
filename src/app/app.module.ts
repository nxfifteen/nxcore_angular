import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppComponent} from './app.component';
// Import containers
import {DefaultLayoutComponent} from './containers';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
// Import routing module
import {AppRoutingModule} from './app.routing';
// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import {ConfigService} from './services/config.service';
import {Observable, ObservableInput, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: false,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    smartypants: false,
  };
}

export function loadConfigurationData(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('https://connect.core.nxfifteen.me.uk/269VLG/ux/config?key=Ze3t6noklu9Vozikrw')
        .pipe(
          map((x: ConfigService) => {
            config.uiSettings = x.uiSettings;
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            config.uiSettings = {'showNavBar': true, 'showAsideBar': false};
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptions,
      },
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurationData,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
