import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';
import { AccountComponent } from './components/account/account.component';
import { ThreadComponent } from './components/thread/thread.component';
import { WildcardComponent } from './components/wildcard/wildcard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProcessorsComponent } from './components/processors/processors.component';
import { MotherboardComponent } from './components/motherboard/motherboard.component';
import { MemoryComponent } from './components/memory/memory.component';
import { HardDriveComponent } from './components/hard-drive/hard-drive.component';
import { ProcessorCoolerComponent } from './components/processor-cooler/processor-cooler.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { CaseComponent } from './components/case/case.component';
import { PowerSupplyComponent } from './components/power-supply/power-supply.component';
import { ComponentsComponent } from './components/components/components.component';
import { UserGuard } from './guards/user.guard';
import { CreatorComponent } from './components/creator/creator.component';
import { ModeratorGuard } from './guards/moderator.guard';
import { RecommendedComponent } from './components/recommended/recommended.component';


const routes: Routes = [
  { redirectTo: 'home', path: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/thread', component: ThreadComponent },
  { path: 'forum/temporaryView',component:ThreadComponent,canActivate:[AdminGuard]},
  { path: 'components', component: ComponentsComponent },
  { path: 'components/recommended', component: RecommendedComponent},
  { path: 'components/favourite', component: ComponentsComponent,canActivate:[UserGuard] },
  { path: 'components/processors', component: ProcessorsComponent },
  { path: 'components/motherboards', component: MotherboardComponent },
  { path: 'components/memories', component: MemoryComponent },
  { path: 'components/hard-drives', component: HardDriveComponent },
  { path: 'components/processor-coolers', component: ProcessorCoolerComponent },
  { path: 'components/graphics', component: GraphicsComponent },
  { path: 'components/cases', component: CaseComponent },
  { path: 'components/power-supplies', component: PowerSupplyComponent },
  { path: 'component/comments',component:CommentsComponent},
  { path: 'account/creator',component:CreatorComponent,canActivate:[ModeratorGuard]},
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
