import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProject() {
    return this.http.get<Project[]>('http://localhost:3000/projects');
  }

  getById(id: any) {
    return this.http.get<Project>(`http://localhost:3000/projects/${id}`);
  }

  addProject(data: any): Observable<Project> {
    return this.http.post<Project>('http://localhost:3000/projects', data);
  }

  updateProject(id: any, data: any): Observable<Project> {
    return this.http.put<Project>(`http://localhost:3000/projects/${id}`, data);
  }

  deleteProject(id: any): Observable<Project> {
    return this.http.delete<Project>(`http://localhost:3000/projects/${id}`);
  }

  filterProject(searchTerm: string): Observable<Project> {
    return this.http.get<Project>(
      `http://localhost:3000/projects?q=${searchTerm}`
    );
  }
}
