import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';
import { ProjectService } from '../../services/project.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';

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

  constructor(
    private projectService: ProjectService,
    private bsModalService: BsModalService
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
        this.loadProject();
      }
    });
  }

  //Edit project form popup
  editProject(id: any) {
    this.bsModalRef = this.bsModalService.show(EditProjectComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
        setTimeout(() => {
          this.loadProject();
        }, 3000);
      }
    });
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
    this.projects = this.allProjects.filter((val) =>
      val.projectName.toLowerCase().includes(value)
    );
  }
}
