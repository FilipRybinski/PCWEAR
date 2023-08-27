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
    ToastrModule.forRoot(),
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
