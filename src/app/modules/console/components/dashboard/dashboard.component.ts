import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';
import { ProjectService } from '../../services/project.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  searchTerm = '';
  bsModalRef!: BsModalRef;

  //Pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  options: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    backdropClass: 'light-blue-backdrop',
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadProject();
  }
  // Get data project
  loadProject() {
    this.projectService.getAllProject().subscribe((res) => {
      this.projects = res;
      this.allProjects = this.projects;
      console.log(res);
    });
  }

  // Add new project form popup
  addNewProject() {
    const modalRef = this.modalService.open(AddProjectComponent, this.options);

    modalRef.result.then((result: any) => {
      if (result) {
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
          this.toastrService.success('Add project successfully!!!');
          this.loadProject();
        }, 1000);
      }
    });
  }

  openEditPopup(item: Project): void {
    this.router.navigate(['/console/dashboard'], {
      queryParams: { id: item.id },
    });

    const modalRef = this.modalService.open(EditProjectComponent, this.options);
    modalRef.componentInstance.item = item;

    modalRef.result.then((result: any) => {
      if (result) {
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
          this.toastrService.success('Edit project successfully!!!');
          console.log(result);
          this.loadProject();
        }, 1000);
      }
    });
  }

  // Delete project form popup
  deleteProject(item: Project) {
    this.router.navigate(['/console/dashboard'], {
      queryParams: { id: item.id },
    });
    setTimeout(() => {
      const modalRef = this.modalService.open(
        DeleteProjectComponent,
        this.options
      );
      modalRef.componentInstance.item = item;
      modalRef.result.then((result: any) => {
        if (result) {
          this.spinner.show();

          setTimeout(() => {
            this.spinner.hide();
            this.toastrService.success('Delete project successfully!!!');
            console.log(result);
            this.loadProject();
          }, 1000);
        }
      });
    }, 100);
  }

  // Pagination
  onTableDataChange(event: any) {
    this.page = event;
    this.loadProject();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadProject();
  }

  // Search project
  search(value: string): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.projects = this.allProjects.filter((val) =>
        val.projectName.toLowerCase().includes(value)
      );
    }, 300);
  }
}
