import { Component, OnInit } from '@angular/core';
import * as env from '../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'al-file-upload',
  templateUrl: './al-file-upload.component.html',
  styleUrls: ['./al-file-upload.component.css']
})
export class AlFileUploadComponent implements OnInit {

  uploadUrl: string;
  constructor(private msg: MessageService) {
    this.uploadUrl = `${env.environment.apiUrl}/fileupload`;
  }

  ngOnInit() {
  }

  showSuccess() {
    this.msg.add({ severity: 'success', detail: 'File Upload Complete' });
  }

}
