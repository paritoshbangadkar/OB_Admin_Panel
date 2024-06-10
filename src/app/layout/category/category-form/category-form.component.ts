import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessService } from '@services/businessType/business.service';
import { OPTIONS } from '../../../core/helpers/constants.helper';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { validateField } from 'src/app/core/validators/form.validator';
import { categoryFormErrors } from 'src/app/core/helpers/formErrors.helpers';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent implements OnInit {
  businessArr: any = [];
  errorMessages: any = categoryFormErrors;
  displayMessage: string = null;

  categoryForm = new FormGroup({
    id: new FormControl(),
    // businessTypeId: new FormControl([], [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    parentId: new FormControl(null),
    amount: new FormControl(null, [Validators.required]),
  });


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private categoryService: CategoryService,
    private businessService: BusinessService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    // this.getAllBusinessType()
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  get form() {
    return this.categoryForm.controls;
  }

  getById(id) {
    this.categoryService.getById(id).subscribe((success) => {
      this.categoryForm.patchValue(success);
    });
  }

  // getAllBusinessType() {
  //   this.spinner.show();
  //  this.businessService
  //     .getAll({})
  //     .subscribe((success) => {
  //       this.businessArr = success.data;
  //       this.spinner.hide();
  //     });
  // }

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
  create() {
    if (this.categoryForm.invalid) {
      validateField(this.categoryForm);
      return;
    }
    this.categoryService.create(this.categoryForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/category/category-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    if (this.categoryForm.invalid) {
      validateField(this.categoryForm);
      return;
    }
    this.categoryService.update(this.categoryForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/category/category-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
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
            this.categoryForm.controls.image.setValue(data?.result?.cdn);
            this.spinner.hide();
          },
          (error: any) => {
            this.toastService.error(error);
            this.spinner.hide();
          }
        );
    }

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
