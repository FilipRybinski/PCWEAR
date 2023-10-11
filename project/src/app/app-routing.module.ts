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
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { redirectTo: 'home', path: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent, data:{ animation:'ForumPage'} },
  { path: 'forum/thread', component: ThreadComponent, data:{ animation:'ThreadPage'}  },
  { path: 'components', component: ComponentsComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/settings',component:SettingsComponent},
  { path: 'account/admin-panel',component:AdminPanelComponent},
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
