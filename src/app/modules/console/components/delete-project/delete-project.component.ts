import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss'],
})
export class DeleteProjectComponent {
  id: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}
  onDeleteProject() {
    this.id = this.route.snapshot.queryParams['id'];
    this.projectService.deleteProject(this.id).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
