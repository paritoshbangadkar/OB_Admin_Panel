import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../../services/notifications/notification.service';
import { UploadService } from '@services/uploadService/upload.service';
import { OPTIONS } from 'src/app/core/helpers/constants.helper';
import { ROLES } from '../../../../app/core/helpers/constants.helper';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { notificationFormErrors } from 'src/app/core/helpers/formErrors.helpers';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent implements OnInit {

  fileData: { image: any; fileName: string; fileType: any; fileSize: any; };
  url: any = '';
  errorMessages = notificationFormErrors;

  notificationForm = this.formBuilder.group({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    role: new FormControl('all'),
    media: new FormControl('')
  });
  get form() {
    return this.notificationForm.controls;
  }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private notificationsService: NotificationsService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService
  ) { }

  roles = [{ name: 'all', label: 'all' },
  {
    name: ROLES.CUSTOMER,
    label: ROLES.CUSTOMER
  },
  {
    name: ROLES.SHOP,
    label: ROLES.SHOP
  }
  ]
  ngOnInit(): void { }

  goBack() {
    this.location.back();
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
            this.uploadFile(file)
          } else {
            if (!this.uploadService.checkImageType(file)) {
              this.toastService.error(OPTIONS.imageType);
              this.spinner.hide();
              return;
            }
            if (!this.uploadService.checkFileSize(file)) {
              this.toastService.error(OPTIONS.sizeLimit);
              this.spinner.hide();
              return;
            }
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }
  public fileLeave(event) {
    console.log(event);
  }

  /**
   * to upload image file to database
  */
  uploadFile(file: File) {
    this.spinner.show();
    if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData)
        .subscribe(
          (data: any) => {
            this.fileData = {
              image: data?.result?.data?.key,
              fileName: `${data?.result?.data.key}`.split('post/')[1],
              fileType: data?.result?.data?.contentType,
              fileSize: data?.result?.data?.size,
            }
            this.notificationForm.controls.media.setValue(this.fileData);
            this.url = data?.result?.cdn,
              this.spinner.hide();
          },
        );
    }

  }

  removeUploadedImage() {
    this.uploadService.deleteUploadedImage({ filePath: this.url })
      .subscribe(
        (data: any) => {
          this.url = null
          this.toastService.success("Image removed");
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }

  onSubmit() {
    if (this.notificationForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    this.spinner.show();
    this.notificationsService.create(this.notificationForm.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['/notification/notification-list']);
      },
      (error: any) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }
}
