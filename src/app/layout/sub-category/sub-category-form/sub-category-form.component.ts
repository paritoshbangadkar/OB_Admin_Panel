import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../services/category/category.service';
import { validateField } from 'src/app/core/validators/form.validator';
import { subCategoryFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { UploadService } from '@services/uploadService/upload.service';
import { OPTIONS, defaultStatus ,getSubCategoryTypeArray} from 'src/app/core/helpers/constants.helper';
import { BusinessService } from '@services/businessType/business.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent implements OnInit {

  fileContent: any;
  params: any;
  businessArr: any = [];
  files: any[] = [];
  subCategoryArr: any;
  fileContentImage: any
  categoryArr: any = [];
  category: any = [];
  errorMessages = subCategoryFormErrors;
  displayMessage: string = null;
  filePath: string = "";
  subcategoryType = getSubCategoryTypeArray();

  subCategoryForm = this.formBuilder.group({
    id: new FormControl(),
    businessTypeId: new FormControl('', [Validators.required]),
    parentId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    isMovingCategory: new FormControl(false),
    isDeliveryOrder: new FormControl(false),
    subCategoryType: new FormControl('', [Validators.required]),
    isCabService: new FormControl(false),
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private subCategoryService: SubCategoryService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getAllBusiness()
    this.getAllCategory();
    this.actRoutes.queryParams.subscribe((params) => {
      if (params._id) {
        this.getById(params._id);
      }
    });
  }
  get form() {
    return this.subCategoryForm.controls;
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
    if (this.subCategoryForm.invalid) {
      validateField(this.subCategoryForm);
      return;
    }
    this.subCategoryService.create(this.subCategoryForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/subCategory/subCategory-list']);
    }, (error) => {
      this.toastService.error(error);
      this.spinner.hide();
    });
  }

  update() {
    if (this.subCategoryForm.invalid) {
      validateField(this.subCategoryForm);
      return;
    }
    this.subCategoryService.update(this.subCategoryForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/subCategory/subCategory-list']);
    }, (error) => {
      this.toastService.error(error);
      this.spinner.hide();
    });
  }

  getById(_id) {
    this.subCategoryService.getById(_id).subscribe((success) => {
      this.subCategoryForm.patchValue(success);
      this.subCategoryForm.controls.parentId.setValue(success.parentId);
      this.subCategoryForm.controls.businessTypeId.setValue(success.businessTypeId);
      this.fileContentImage = success.imageUrl
    });
  }

  getAllBusiness() {
    this.spinner.show();
    this.businessService
      .getAll({ status: defaultStatus.ACTIVE })
      .subscribe(({ data, count }) => {
        this.businessArr = data;
        this.spinner.hide();
      });
  }
  async getAllCategory() {
    this.categoryService.getAll({ pageSize: 200 }).subscribe(async success => {
      this.category = success.data;
      await this.spinner.hide();
    });
  }


  goBack() {
    this.location.back();
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
            this.subCategoryForm.controls.image.setValue(data?.result?.cdn);
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

