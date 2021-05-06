import { Component, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  @ViewChild('modalImage', { static: true }) modalImage: any;
  modalImageSrc: string;

  constructor(
    private modalService: NzModalService
  ) { }

  // call by parent
  public clickImage(src: string) {
    if (!src) {
      return;
    }
    this.modalImageSrc = src;
    this.modalService.create({
      nzContent: this.modalImage,
      nzFooter: null,
      nzClosable: false,
      nzWidth: '80%'
    });
  }

}
