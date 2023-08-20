import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExampleComponent } from './components/example/example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConsoleRoutes } from './console.routing';
import { AuthGuard } from '../core/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteProjectComponent } from './components/delete-project/delete-project.component';
import { SearchComponent } from './components/search/search.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgbActiveModal,
  NgbModalRef,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent,
    ExampleComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(ConsoleRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  providers: [AuthGuard, BsModalService, NgbActiveModal],
})
export class ConsoleModule {}
