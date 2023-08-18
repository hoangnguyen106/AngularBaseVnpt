import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/shared/models/project.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() allProject: Project[] = [];
  @Input() projects: Project[] = [];
  searchTerm = '';

  ngOnInit(): void {
    console.log(this.allProject);
    console.log(this.projects);
  }
  search(value: string): void {
    this.projects = this.allProject.filter((val) =>
      val.projectName.toLowerCase().includes(value)
    );
  }
}
