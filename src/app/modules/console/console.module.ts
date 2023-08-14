import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExampleComponent } from './components/example/example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConsoleRoutes } from './console.routing';
import { AuthGuard } from '../core/guards/auth.guard';

@NgModule({
  declarations: [DashboardComponent, ExampleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(ConsoleRoutes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ConsoleModule {}
