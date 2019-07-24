import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  public result: string;
  public title: string;
  public message: string;
  public id: string;
  public ok: string = 'yes';
  public responseData: any = [];
  public isReject: boolean = false;
  public reasonsForRejection: string = '';
  public no: string = '';
  public yes: '';
  public showCancelButton: boolean = true;
  public showTextBox: boolean = false;
  public successIcon;
  note: string;
  reasonText: any;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.id = data.id;
    this.result = data.index;
    this.no = data.no;
    this.yes = data.yes;
    this.successIcon = data.successIcon;
    this.reasonText = data.reasonText;
    if (data.showTextBox != undefined) this.showTextBox = data.showTextBox;
    if (data.isHideCancel != undefined && data.isHideCancel) {
      this.showCancelButton = false;
    } else {
      this.showCancelButton = true;
    }

    var response = {
      id: data.id,
      index: data.index,
      status: data.status,
      note: this.note || ''
    };
    //  console.log(response);
    this.responseData.push(response);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    if (this.showTextBox && this.responseData[0].note.trim() == '') return;
  }

  ngOnInit() {}
}
