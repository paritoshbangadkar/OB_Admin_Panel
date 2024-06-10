import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../services/images/image.service';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  loading = false;

  myInterval: number | 0 = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  fieldTextType: boolean;

  imageArr: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    
    public userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
    localStorage.removeItem('OBUser');
    // get return url from route parameters or default to "/"
    this.returnUrl =
      this.route.snapshot.queryParams[`returnUrl`] || '/dashboard';
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: ['', Validators.required],
    });
  }

  login() {
    this.spinner.show();
    this.userService.login(this.loginForm.value).subscribe((success) => {
      this.toastService.success('Login done Successfully !!');
      this.router.navigate(['/dashboard']);
      this.spinner.hide();
    },
      (error) => {
        console.log(error);
        this.toastService.error('Invalid Credentials !!');
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = 0;
  }

  addSlide(): void {
    setTimeout(() => {
      const seed = Math.random().toString(36).slice(-6);
      this.slides.push({
        image: `https://picsum.photos/seed/${seed}/900/500`,
      });
    }, 500);
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
