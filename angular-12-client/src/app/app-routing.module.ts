import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { AuthGuard } from './helpers/auth-guard';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);


const routes: Routes = [
  { path: '', component: TutorialsListComponent  ,  canActivate: [AuthGuard], },
  // { path: 'login', component: LoginComponent},
  { path: 'account', loadChildren: accountModule },
  { path: 'tutorials', component: TutorialsListComponent,  canActivate: [AuthGuard] },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
