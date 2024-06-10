import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebLinkService } from '../../services/webLink/webLink.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { validateField } from 'src/app/core/validators/form.validator';

@Component({
  selector: 'app-web-link-details',
  templateUrl: './web-link-details.component.html',
  styleUrls: ['./web-link-details.component.scss']
})
export class WebLinkDetailsComponent implements OnInit {

  @Input() shopId: number = null;
  @Input() modelData: any = null;
  
  dataForm = new FormGroup({
    id: new FormControl('', []),
    shopId: new FormControl(''),
    webLinkName: new FormControl(''),
    url: new FormControl('', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]),

  });

  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private webLinkService: WebLinkService,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
    if (this.modelData && this.modelData.id) {
      this.dataForm.patchValue(this.modelData)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shopId'] && this.shopId) {
      this.shopId = changes['shopId'].currentValue;
    }
  }
  get form() {
    return this.dataForm.controls;
  }


  onSubmit() {
    if (this.dataForm.invalid) {
      validateField(this.dataForm);
      return;
    }
    this.spinner.show();
    if (!this.form['id'].value) this.create();
    else this.update();
  }

  create() {
    if (this.shopId) {
      this.dataForm.controls.shopId.setValue(this.shopId);
    }
    this.webLinkService.create(this.dataForm.getRawValue()).subscribe(
      (success) => {
        this.toastService.success(success.message);
        this.dataForm.reset();
        this.spinner.hide();
        this.dismissModal();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  update() {
    this.spinner.show();
    this.webLinkService.update(this.dataForm.getRawValue()).subscribe(
      (success) => {
        this.toastService.success(success.message);
        this.dataForm.reset();
        this.spinner.hide();
        this.dismissModal();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  /**
 * dismiss modal
 */
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
