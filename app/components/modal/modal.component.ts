import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  absolutePathImg:string;
  constructor(
  public dialogRef: MatDialogRef<ModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.absolutePathImg=environment.imageDir;
 //   this.data.video.play();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseModal(): void {
    this.dialogRef.close();
  }

}
