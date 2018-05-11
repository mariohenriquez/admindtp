import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { File } from './model/file';
import { DomSanitizer } from '@angular/platform-browser';
import { setTimeout } from 'core-js/library/web/timers';
const EXIF = require('exif-js');

@Component({
  selector: 'image-drop',
  template: require('./image-drop.component.html')

})
export class ImageDropComponent implements AfterViewInit {
  @Input() file: File;
  @Input() box: boolean;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() firstTitle: string;
  @Input() secondTitle: string;
  private orientation: any = 0;
  private imgLoading: boolean = false;
  private widthProgressBar: number = 0;


  constructor(private sanitizer: DomSanitizer) { }

  fileChanged(event) {
    var files = event.srcElement.files;
    if (files.length == 0) { 
      return
    }
    this.file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[0])));
    this.file.details = files[0];
    this.onSelect.emit(this.file);
    EXIF.getData(this.file.details, () => {
      this.imgLoading = true;
      this.orientation = EXIF.getTag(this.file.details, "Orientation");
      this.file.details.orientation = this.orientation == undefined ? 1 : this.orientation;
      setTimeout(() => {this.widthProgressBar = 100;}, 800);
    });
  }

  ngAfterViewInit() {
    if (this.file.details !== undefined) {
      let img = <HTMLImageElement>document.getElementById(this.file.details.name);
      img.onload = () => {
        setTimeout(() => {
          EXIF.getData(img, () => {
            this.orientation = EXIF.getTag(img , "Orientation");
            this.file.details.orientation = this.orientation == undefined ? 1 : this.orientation;
          });
        }, 50);
      };
    }
  }

  fileSelected(): boolean {
    return this.file.selected();
  }

  fileName(): string {
    return this.file.details.name;
  }

  fileSize(): number {
    return this.file.details.size / 1000;
  }

  delete() {
    this.onDelete.emit(this.file);
  }
}
