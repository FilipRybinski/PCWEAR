import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';
import { ComponentsComponent } from './components/components/components.component';
import { AccountComponent } from './components/account/account.component';
import { ThreadComponent } from './components/thread/thread.component';
import { WildcardComponent } from './components/wildcard/wildcard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { CommentsComponent } from './components/comments/comments.component';

const routes: Routes = [
  { redirectTo: 'home', path: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/thread', component: ThreadComponent },
  { path: 'forum/temporaryView',component:ThreadComponent,canActivate:[AdminGuard]},
  { path: 'components', component: ComponentsComponent },
  { path: 'component/comments',component:CommentsComponent},
  { path: 'account', component: AccountComponent },
  { path: 'account/view',component:AccountComponent,canActivate:[AdminGuard]},
  { path: 'account/settings',component:SettingsComponent},
  { path: 'account/admin-panel',component:AdminPanelComponent,canActivate:[AdminGuard]},
  { path: 'account/confirm',component:ConfirmAccountComponent},
  { path: '', component: AppComponent },
  { path: '**', component: WildcardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
