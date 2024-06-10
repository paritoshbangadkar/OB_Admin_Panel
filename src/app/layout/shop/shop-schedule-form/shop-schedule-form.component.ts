import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { validateField } from 'src/app/core/validators/form.validator';
import { ScheduleService } from '../../../services/schedule/schedule.service';

@Component({
  selector: 'app-shop-schedule-form',
  templateUrl: './shop-schedule-form.component.html',
  styleUrls: ['./shop-schedule-form.component.scss'],
})
export class ShopScheduleFormComponent implements OnInit {
  shopId: any;
  scheduleForm = new FormGroup({
    id: new FormControl(),
    shopId: new FormControl(),
    day: new FormControl('', [Validators.required]),
    session: new FormArray([], [Validators.required]),
  });

  get form() {
    return this.scheduleForm.controls;
  }

  get session() {
    return this.scheduleForm.controls['session'] as FormArray;
  }

  constructor(
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.shopId;
      if (params._id) {
        this.getById(params._id);
      }
    });
  }
  addSession(item) {
    const sessionForm = this.formBuilder.group({
      id: new FormControl(item ? item.id : null),
      sessionName: new FormControl(item ? item.sessionName : null),
      startTime: new FormControl(item ? item.startTime : null),
      endTime: new FormControl(item ? item.endTime : null),
    });
    this.session.push(sessionForm);
  }

  async create() {
    if (this.scheduleForm.invalid) {
      validateField(this.scheduleForm);
      return;
    }
    this.scheduleForm.controls.shopId.setValue(this.shopId);
    this.scheduleService.create(this.scheduleForm.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.goBack();
      },
      (error) => {
        this.toastService.success(error);
        this.spinner.hide();
      }
    );
  }

  getById(_id) {
    this.scheduleService.getById(_id).subscribe((success) => {
      for (let i = 0; i < success.schedule.session.length; i++) {
        this.addSession(success.schedule.session);
      }
      this.scheduleForm.patchValue(success.schedule);
      this.form.id.patchValue(success.id);
    });
  }

  async update() {
    if (this.scheduleForm.invalid) {
      validateField(this.scheduleForm);
      return;
    }
    this.scheduleForm.controls.shopId.setValue(this.shopId);
    this.scheduleService.update(this.scheduleForm.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.goBack();
      },
      (error) => {
        this.toastService.success(error);
        this.spinner.hide();
      }
    );
  }

  deleteMedia(item: any, index: number) {
    if (item.get('id').value) {
      // item.get('status').setValue(defaultStatus.DELETED);
    } else {
      this.session.removeAt(index);
    }
  }

  goBack() {
    this.location.back();
  }
}
