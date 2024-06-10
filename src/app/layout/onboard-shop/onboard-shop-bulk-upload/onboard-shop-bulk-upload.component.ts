import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnboardShopService } from '../../../services/onboardShop/onboardShop.service';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../../../services/uploadService/upload.service';
import { OPTIONS } from 'src/app/core/helpers';
import { OnboardShopDataComponent } from '../onboard-shop-data/onboard-shop-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard-shop-bulk-upload',
  templateUrl: './onboard-shop-bulk-upload.component.html',
  styleUrls: ['./onboard-shop-bulk-upload.component.scss']
})
export class OnboardShopBulkUploadComponent implements OnInit {

  displayMessage: string = null;
  dtElement: any;
  dtInstance: any;
  invalidFile: boolean;
  filePath: string = "";
  fileUploaded: boolean = false;
  options = OPTIONS;
  uploadForm = new FormGroup({
    uploadedFile: new FormControl(null),
  });

  removeImageForm = new FormGroup({
    path: new FormControl(null)
  });

  formData = new FormData();
  excelShopList: any;

  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private onboardShopService: OnboardShopService,
    private uploadService: UploadService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if (this.uploadForm.value?.uploadedFile) {
      this.filePath = this.uploadForm.value?.uploadedFile;
      this.fileUploaded = this.uploadForm.value?.uploadedFile ? true : false;
    }
  }

  /**
   * to upload products in bulk using excel file
   */
  bulkUploadProduct() {
    this.spinner.show()
    if (this.displayMessage) {
      return
    }
    this.uploadService.uploadShopInBulk(this.formData)
      .subscribe(
        (data: any) => {
          this.excelShopList = data;
          this.dismissModal();
          this.openBulkUploadData(data);
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );

  }

  openBulkUploadData(data) {
    const modalRef = this.modalService.open(OnboardShopDataComponent, {
      centered: true, size: 'lg'
    });
    modalRef.componentInstance.shopData = data;
    modalRef.result.then((result) => {
    }, (dismiss) => {
    })
  }


  /**
   * to upload file to database
  */
  uploadFile(file: File) {
    this.spinner.show();
    this.displayMessage = null;
    if (this.uploadService.checkFileType(file) && this.uploadService.checkFileSize(file)) {
      this.formData.append('file', file);
      this.fileUploaded = true;
      this.spinner.hide();
    }
    else {
      if (!this.uploadService.checkFileType(file)) {
        this.displayMessage = this.options.fileType;
        this.spinner.hide();
        return;
      }
      if (!this.uploadService.checkFileSize(file)) {
        this.displayMessage = this.options.sizeLimit;
        this.spinner.hide();
        return;
      }
    }
  }


  /**
  * remove uploaded file
  */
  removeUploadedFile() {
    this.formData.delete('file');
    this.filePath = null;
    this.files = [];
    this.fileUploaded = false;
  }

  get form() {
    return this.uploadForm.controls;
  }
  /**
   * download bulk upload template
   */
  downloadTemplate() {
    saveAs(`assets/documents/Demo-template.xlsx`, 'Demo-template.xlsx');
  }
  /**
   * drag and drop file functionality
   */
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event) {
    this.prepareFilesList($event.target.files);
  }

  clearImage() {
    this.fileUploaded = false;
    this.form.image.setValue('');
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.uploadFile(files[0]);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }


  dismissModal() {
    this.modalService.dismissAll('dismiss with cross click');
  }

  /**
   * close modal
   */
  closeModal() {
    this.activeModal.close('close with cancel button');
  }
}
