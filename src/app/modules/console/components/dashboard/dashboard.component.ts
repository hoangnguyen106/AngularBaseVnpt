import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';
import { ProjectService } from '../../services/project.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @ViewChild(EditProjectComponent) addview!: EditProjectComponent;
  // @Input() event: any;
  constructor(
    private projectService: ProjectService,
    private bsModalService: BsModalService,
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
    this.bsModalRef = this.bsModalService.show(AddProjectComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
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

    const modalRef = this.modalService.open(EditProjectComponent);
    modalRef.componentInstance.item = item;

    // if (this.event === 'OK') {
    //   this.loadProject();
    // }
  }

  // Delete project form popup
  deleteProject(id: any) {
    this.router.navigate(['/console/dashboard'], { queryParams: { id: id } });
    setTimeout(() => {
      this.bsModalRef = this.bsModalService.show(DeleteProjectComponent);
      this.bsModalRef.content.event.subscribe((result: any) => {
        if (result == 'OK') {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
            this.toastrService.success('Delete project successfully!!!');
            this.projects = [];
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
