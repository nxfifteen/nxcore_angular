import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Components Routing
import {MyMaterialModule} from '../../material-module';
import {PrivacyPolicyComponent} from './privacypolicy.component';
import {DocsRoutingModule} from './docs-routing.module';
import {AlertModule} from 'ngx-bootstrap';
import {TermsOfServiceComponent} from './termsservice.component';
import {PatreonComponent} from './patreon.component';
import {PatreonThanksComponent} from './patreonthanks.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    DocsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule,
    AlertModule.forRoot(),
  ],
  declarations: [PrivacyPolicyComponent, TermsOfServiceComponent, PatreonComponent, PatreonThanksComponent]
})
export class DocsModule {
}
