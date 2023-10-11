import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { PopupPortalComponent } from './components/popup-portal/popup-portal.component';
import { PopupTemplateComponent } from './components/popup-template/popup-template.component';
import { TestComponent } from './popups/test/test.component';
import { ButtonNavigationComponent } from './components/button-navigation/button-navigation.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ComponentsComponent } from './components/components/components.component';
import { DisabledControlDirective } from './directives/disabled-control.directive';
import { AccountComponent } from './components/account/account.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ForumComponent } from './components/forum/forum.component';
import { AddThreadComponent } from './popups/add-thread/add-thread.component';
import { SearchThreadComponent } from './popups/search-thread/search-thread.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { ButtonComponent } from './components/button/button.component';
import { LoaderDirective } from './directives/loader.directive';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NoAccessDirective } from './directives/no-access.directive';
import { CreateCategoryComponent } from './popups/create-category/create-category.component';
import { CategoryLabelComponent } from './components/category-label/category-label.component';
import { ThreadComponent } from './components/thread/thread.component';
import { WildcardComponent } from './components/wildcard/wildcard.component';
import { UserCirclePipe } from './pipes/user-circle.pipe';
import { SettingsComponent } from './components/settings/settings.component';
import { UserTypePipe } from './pipes/user-type.pipe';
import { EditUserInformationsComponent } from './popups/edit-user-informations/edit-user-informations.component';
import { ArtilcePipe } from './pipes/artilce.pipe';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ChatComponent,
    PopupPortalComponent,
    PopupTemplateComponent,
    TestComponent,
    ButtonNavigationComponent,
    DropdownComponent,
    ComponentsComponent,
    DisabledControlDirective,
    AccountComponent,
    LoaderComponent,
    ForumComponent,
    AddThreadComponent,
    SearchThreadComponent,
    TooltipComponent,
    TooltipDirective,
    ButtonComponent,
    LoaderDirective,
    NoAccessComponent,
    NoAccessDirective,
    CreateCategoryComponent,
    CategoryLabelComponent,
    ThreadComponent,
    WildcardComponent,
    UserCirclePipe,
    SettingsComponent,
    UserTypePipe,
    EditUserInformationsComponent,
    ArtilcePipe,
    AdminPanelComponent,
  ],
  exports:[
    TooltipDirective,
    DisabledControlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      tapToDismiss: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
