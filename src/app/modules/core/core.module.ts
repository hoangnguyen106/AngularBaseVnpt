import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CoreRoutes } from './core.routing';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CoreRoutes),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class CoreModule {}
