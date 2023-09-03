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

const routes: Routes = [
  { redirectTo: 'home', path: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/thread', component: ThreadComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'account', component: AccountComponent },
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
