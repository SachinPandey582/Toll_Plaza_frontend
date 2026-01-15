import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-entry', component: NewEntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
