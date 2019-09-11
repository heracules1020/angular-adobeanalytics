import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mobile-video-modal',
  templateUrl: './mobile-video-modal.component.html',
  styleUrls: ['./mobile-video-modal.component.css']
})
export class MobileVideoModalComponent implements OnInit {

  absolutePathImg:string;
  constructor(
  public dialogRef: MatDialogRef<MobileVideoModalComponent>,
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
