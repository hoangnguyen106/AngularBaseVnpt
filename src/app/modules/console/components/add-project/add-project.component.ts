import { Component, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  addProject: FormGroup;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private projectService: ProjectService,
    public fb: FormBuilder,
    private router: Router,
    private bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService
  ) {
    this.addProject = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      teamMember: this.fb.array([]),
      progress: [Validators.required],
      status: ['', Validators.required],
      created: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createItem(data: any): FormGroup {
    return this.fb.group(data);
  }

  get photos(): FormArray {
    return this.addProject.get('teamMember') as FormArray;
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

  onAddProject() {
    this.projectService.addProject(this.addProject.value).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
      this.addProject.reset();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
