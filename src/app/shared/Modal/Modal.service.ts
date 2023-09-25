import { Component, Inject, Injectable } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Injectable()
export class ModalService {
    constructor(
        private dialog: MatDialog,
        private sharedService: SharedService
    ) {}

    openModal(
        title: string,
        message: string,
        confirm: boolean
    ): Promise<boolean> {
        // const dialogConfig: any = this.sharedService.getModalSize();
        // dialogConfig.data = {
        //     title,
        //     message,
        //     confirm,
        // };
        let dialogConfig = {
            // width: '20%',
            data: {
                title,
                message,
                confirm,
            },
        };
        const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
        return new Promise((resolve) => {
            dialogRef.afterClosed().subscribe((result: boolean) => {
                resolve(result);
            });
        });
    }
}

@Component({
    selector: 'modal',
    templateUrl: 'modal.html',
})
export class ModalComponent {
    constructor(
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close() {
        this.dialogRef.close();
    }
}
