import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/Modal/Modal.service';

@Component({
    selector: 'app-form-errors-dialog',
    templateUrl: './form-errors-dialog.component.html',
    styleUrls: ['./form-errors-dialog.component.css'],
})
export class FormErrorsDialogComponent implements OnInit {
    errors: string[] = [];
    constructor(
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.errors = this.data.errors;
    }

    public ngOnInit(): void {}

    public close(): void {
        this.dialogRef.close();
    }
}
