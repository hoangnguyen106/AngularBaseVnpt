import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/modules/shared/models/project.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  editProject!: FormGroup;
  id: any;
  modalOptions: NgbModalOptions;
  @Input() item!: Project;

  constructor(
    private projectService: ProjectService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private _NgbActiveModal: NgbActiveModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  @ViewChild('content') addview!: ElementRef;

  ngOnInit(): void {
    this.loadEditData(this.item.id);
    this.editProject = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      teamMember: this.fb.array([]),
      progress: [Validators.required],
      status: ['', Validators.required],
      created: ['', Validators.required],
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

  loadEditData(id: any) {
    this.projectService.getById(id).subscribe((res) => {
      console.log(res);
      this.editProject.patchValue(res);
    });
  }

  onSave(updatedItem: Project) {
    // Emit the updated item to the parent component
    this.loadEditData(updatedItem.id);
    this.id = this.route.snapshot.queryParams['id'];
    this.projectService
      .updateProject(this.id, this.editProject.value)
      .subscribe((res) => {
        if (res != null) {
          // this.event.emit('OK');
          // console.log(this.event);
          this._NgbActiveModal.close(updatedItem);
        }

        this.editProject.reset();
      });
  }

  onCancel(): void {
    this._NgbActiveModal.dismiss();
  }
}
