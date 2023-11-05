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
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ManageThreadsComponent } from './popups/manage-threads/manage-threads.component';
import { CategoryPickerComponent } from './components/category-picker/category-picker.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ManagePermissionsComponent } from './popups/manage-permissions/manage-permissions.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ManageArchivesComponent } from './popups/manage-archives/manage-archives.component';
import { ThreadLabelComponent } from './components/thread-label/thread-label.component';
import { UserIconCircleComponent } from './components/user-icon-circle/user-icon-circle.component';
import { DotsPipe } from './pipes/dots.pipe';
import { AddPostComponent } from './popups/add-post/add-post.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { PartComponent } from './components/part/part.component';
import { CommentsComponent } from './components/comments/comments.component';
import { StarsComponent } from './components/stars/stars.component';
import { AssessPartComponent } from './popups/assess-part/assess-part.component';
import { ProcessorsComponent } from './components/processors/processors.component';
import { SearchPostComponent } from './popups/search-post/search-post.component';
import { SearchProcessorComponent } from './popups/search-processor/search-processor.component';
import { SearchMotherboardComponent } from './popups/search-motherboard/search-motherboard.component';
import { MotherboardComponent } from './components/motherboard/motherboard.component';
import { MemoryComponent } from './components/memory/memory.component';
import { SearchMemoryComponent } from './popups/search-memory/search-memory.component';
import { SearchHardDriveComponent } from './popups/search-hard-drive/search-hard-drive.component';
import { HardDriveComponent } from './components/hard-drive/hard-drive.component';
import { ProcessorCoolerComponent } from './components/processor-cooler/processor-cooler.component';
import { SearchProcessorCoolerComponent } from './popups/search-processor-cooler/search-processor-cooler.component';
import { SearchGraphicsComponent } from './popups/search-graphics/search-graphics.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { CaseComponent } from './components/case/case.component';
import { SearchCaseComponent } from './popups/search-case/search-case.component';
import { SearchPowerSupplyComponent } from './popups/search-power-supply/search-power-supply.component';
import { PowerSupplyComponent } from './components/power-supply/power-supply.component';
import { CreatorComponent } from './components/creator/creator.component';
import { ComponentsComponent } from './components/components/components.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { ChartComponent } from './components/chart/chart.component';

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
    ManageThreadsComponent,
    CategoryPickerComponent,
    EmptyStateComponent,
    ManagePermissionsComponent,
    MyAccountComponent,
    ManageArchivesComponent,
    ThreadLabelComponent,
    UserIconCircleComponent,
    DotsPipe,
    AddPostComponent,
    ToolbarComponent,
    ConfirmAccountComponent,
    PartComponent,
    CommentsComponent,
    StarsComponent,
    AssessPartComponent,
    ProcessorsComponent,
    SearchPostComponent,
    SearchProcessorComponent,
    SearchMotherboardComponent,
    MotherboardComponent,
    MemoryComponent,
    SearchMemoryComponent,
    SearchHardDriveComponent,
    HardDriveComponent,
    ProcessorCoolerComponent,
    SearchProcessorCoolerComponent,
    SearchGraphicsComponent,
    GraphicsComponent,
    CaseComponent,
    SearchCaseComponent,
    SearchPowerSupplyComponent,
    PowerSupplyComponent,
    CreatorComponent,
    ComponentsComponent,
    RecommendedComponent,
    ChartComponent,
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
