import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from '../../../services/businessType/business.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OPTIONS } from '../../../core/helpers/constants.helper';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { validateField } from 'src/app/core/validators/form.validator';
import { businessTypeErrors } from 'src/app/core/helpers/formErrors.helpers';
@Component({
  selector: 'app-business-type-form',
  templateUrl: './business-type-form.component.html',
  styleUrls: ['./business-type-form.component.scss']
})

export class BusinessTypeFormComponent implements OnInit {

  params: any;
  submitted = false;
  errorMessages: any = businessTypeErrors;
  displayMessage: string = null;

  businessForm = this.formBuilder.group({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(null),
  });
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  get form() {
    return this.businessForm.controls;
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
  create() {
    if (this.businessForm.invalid) {
      validateField(this.businessForm);
      return;
    }
    this.businessService.create(this.businessForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/businessType/business-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    if (this.businessForm.invalid) {
      validateField(this.businessForm);
      return;
    }
    this.businessService.update(this.businessForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/businessType/business-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  getById(id) {
    this.businessService.getById(id).subscribe((success) => {
      this.businessForm.patchValue(success);
    });
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
            this.businessForm.controls.image.setValue(data?.result?.cdn);
            this.spinner.hide();
          },
          (error: any) => {
            this.toastService.error(error);
            this.spinner.hide();
          }
        );
    }

  }
  goBack() {
    this.location.back();
  }
  
  removeUploadedImage() {
    this.uploadService.deleteUploadedImage({ filePath: this.form.image.value })
      .subscribe(
        (data: any) => {
          this.form.image.reset(null)
          this.toastService.success("Image removed");
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }
}
