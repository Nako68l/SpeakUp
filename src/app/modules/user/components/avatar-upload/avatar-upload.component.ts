import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../../../shared/services/file-storage/file-storage.service';

@Component({
    selector: 'app-avatar-upload',
    templateUrl: './avatar-upload.component.html',
    styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {

    uploadPercent;
    downloadURL;

    constructor(
        private storage: FileStorageService,
    ) {
    }

    ngOnInit() {
    }

    uploadImage($event) {
        [this.uploadPercent, this.downloadURL] = this.storage.upload('userPhoto', $event);
    }
}
