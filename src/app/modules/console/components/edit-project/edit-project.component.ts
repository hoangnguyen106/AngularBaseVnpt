import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent {
  editProject!: FormGroup;
  id: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private projectService: ProjectService,
    public fb: FormBuilder,
    private router: Router,
    private bsModalRef: BsModalRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editProject = this.fb.group({
      projectName: [''],
      description: [''],
      teamMember: this.fb.array([]),
      progress: [],
      status: [''],
      created: [''],
    });

    this.id = this.route.snapshot.queryParams['id'];
    this.projectService.getById(this.id).subscribe((res) => {
      console.log(res);
      this.editProject.patchValue(res);
    });
  }

  createItem(data: any): FormGroup {
    return this.fb.group(data);
  }

  get photos(): FormArray {
    return this.editProject.get('teamMember') as FormArray;
  }

  onFileChange(event: any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(
            this.createItem({
              url: e.target.result, //Base64 string for preview image
            })
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onEditProject() {
    this.projectService
      .updateProject(this.id, this.editProject.value)
      .subscribe((res) => {
        console.log(this.editProject.value);
        console.log(res);
        if (res != null) {
          this.event.emit('OK');
          this.bsModalRef.hide();
        }
        this.editProject.reset();
      });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
