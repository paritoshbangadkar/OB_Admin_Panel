import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '@services/shop/shop.service';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OPTIONS } from 'src/app/core/helpers';
import { shopKYCFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { validateField } from 'src/app/core/validators/form.validator';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/services';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-kyc-document',
  templateUrl: './kyc-document.component.html',
  styleUrls: ['./kyc-document.component.scss']
})
export class KycDocumentComponent implements OnInit {
  filePath: string = '';
  filePreview = {
    aadharCard: '', shopAct: '', incorporationCertificate: ''
  };
  shopData: any = {};
  shopId: number;
  errorMessages = shopKYCFormErrors;
  isKYCDone: boolean = false;
  kycForm = this.formBuilder.group(
    {
      id: new FormControl(''),
      aadharCard: new FormControl('', [Validators.required]),
      shopAct: new FormControl(''),
      incorporationCertificate: new FormControl(''),
    },
  );
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private shopService: ShopService,
    private router: Router,
    private uploadService: UploadService,
    private toastService: ToastrService,
    private location: Location,
    private actRoutes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.id;
      if (params.id) {
        this.getShop(this.shopId);
      }
    });
  }

  get form() {
    return this.kycForm.controls;
  }
  getShop(id: any) {
    this.shopService.getById(id).subscribe(data => {
      this.shopData = data?.shopDetails;
      this.isKYCDone = data?.shopDetails?.isKYCDone;
      this.filePreview.aadharCard = data?.shopDetails.aadharCard;
      this.filePreview.shopAct = data?.shopDetails.shopAct;
      this.filePreview.incorporationCertificate = data?.shopDetails.incorporationCertificate;
      this.kycForm.controls.id.setValue(this.shopData?._id)
      this.kycForm.patchValue(this.shopData?.shopDetails)

    })
  }
  update() {
    if (this.kycForm.invalid) {
      validateField(this.kycForm);
      return;
    }
    this.shopService.kycDoc(this.kycForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['shop/shop-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  public dropped(files: NgxFileDropEntry[], key) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.uploadService.checkDocumentType(file) && this.uploadService.checkFileSize(file)) {
            this.uploadFile(file, key)
          } else {
            if (!this.uploadService.checkDocumentType(file)) {
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

  uploadFile(file: File, key) {
    this.spinner.show();
    if (this.uploadService.checkDocumentType(file) && this.uploadService.checkFileSize(file)) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData)
        .subscribe(
          (data: any) => {
            this.filePath = data?.result?.cdn;
            this.filePreview[key] = data?.result?.cdn;
            this.kycForm.controls[key].setValue(data?.result?.data?.key);
            this.spinner.hide();
          },
          (error: any) => {
            this.toastService.error(error);
            this.spinner.hide();
          }
        );
    }

  }
  public fileOver(event) {
    console.log(event);
  }
  public fileLeave(event) {
    console.log(event);
  }

  removeUploadedImage(key) {
    this.uploadService.deleteUploadedImage({ filePath: this.kycForm.controls.aadharCard.value })
      .subscribe(
        (data: any) => {
          if (key == 'aadharCard') {
            this.filePreview.aadharCard = '';
            this.kycForm.controls.aadharCard.reset(null);
            this.toastService.success("AadharCard removed");
          } else if (key == 'shopAct') {
            this.form.shopAct.reset(null);
            this.filePreview.shopAct = '';
            this.toastService.success("Shop Act removed");
          } else if (key == 'incorporationCertificate') {
            this.form.incorporationCertificate.reset(null);
            this.filePreview.incorporationCertificate = '';
            this.toastService.success("Incorporation Certificate removed");
          }
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }
  goBack() {
    this.location.back();
  }

  async downloadDoc(data) {
    let fileName = data.split("post/")[1];
    saveAs(data, fileName, { autoBom: true });
  }

  checkValue(event: any) {
    this.spinner.show();
    console.log(event.target.checked);
    this.isKYCDone = event.target.checked;
    let params = {
      shopId: this.shopData?._id,
      isKYCDone: this.isKYCDone
    }
    this.shopService.isKYCDone(params).subscribe({
      next: async (result) => {
        this.toastService.success(result.message)
        this.isKYCDone = false;
        this.getShop(this.shopId)
        await this.spinner.hide();
      }, error: async (error) => {
        this.toastService.error(error);
        await this.spinner.hide();
      }
    })
  }
}
