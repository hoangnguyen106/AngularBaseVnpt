import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/modules/shared/models/project.model';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss'],
})
export class DeleteProjectComponent {
  id: any;
  @Input() item!: Project;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private _NgbActiveModal: NgbActiveModal
  ) {}
  onDeleteProject(deleteItem: Project) {
    this.id = this.route.snapshot.queryParams['id'];
    this.projectService.deleteProject(this.id).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this._NgbActiveModal.close(deleteItem);
        this.router.navigate(['/console/dashboard'], {
          queryParams: {},
        });
      }
    });
  }

  onClose() {
    this._NgbActiveModal.dismiss();
    this.router.navigate(['/console/dashboard'], {
      queryParams: {},
    });
  }
}
