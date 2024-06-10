import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guest-shop',
  templateUrl: './guest-shop.component.html',
  styleUrls: ['./guest-shop.component.scss']
})
export class GuestShopComponent implements OnInit {
  selectedRow: any = {};
  guestShop: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: number = 0;
  selectAll: boolean = false;
  selectedCheckboxes: any[] = [];
  constructor(
    private shopService: ShopService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.spinner.show();
    let obj = {
      page: this.page,
      pageSize: this.pageSize,
      ...(this.search && { search: this.search }),
    }
    this.shopService
      .getAllGuestShop(obj).subscribe(({ data, count }) => {
        // this.guestShop = data;
        this.guestShop = data.map(x => {
          x.isSelected = false;
          return x;

        })
        this.collection = count;
        this.spinner.hide();
      },
        (error: any) => {
          this.spinner.hide();
        }
      );
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }
  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }

  delete(_id) {
    // this.spinner.show();
    // return
    this.shopService.deleteGuest(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(success.message);
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log("error", error);
      }
    )
  }
  open(item, content) {
    this.selectedRow = item;
    this.modalService.open(content, { centered: true });
  }

  selectUnselectAll(event: any) {
    // Set isSelected flag to true if selectAll checkbox is checked
    // Otherwise set it to false
    for (let i = 0; i < this.guestShop.length; i++) {
      // Check or uncheck
      this.guestShop[i]['isSelected'] = event.target.checked;
    }
    this.updateSelectedShop();
  }

  updateSelectedShop() {
    this.selectedCheckboxes = this.guestShop.filter(item => item.isSelected);

    if (this.guestShop.length == this.selectedCheckboxes.length) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }
  singleChange(event, itemId) {
    // Get the index of current checked/unchecked checkbox
    const idx = this.guestShop.findIndex(item => item.id == itemId);
    // Set 'isSelected' flag to true or false based on
    // the current state of the checkbox
    this.guestShop[idx]['isSelected'] = event.target.checked;
    this.updateSelectedShop();

  }

  deleteShop() {
    console.log("this.selectedCheckboxes", this.selectedCheckboxes);
    if (this.selectedCheckboxes.length == 0) {
      this.toastService.error('Select at least one user');
      return;
    }
    const deleteIds = this.selectedCheckboxes.map(x => x._id);
    console.log("deleteIds", deleteIds);
    this.shopService
      .deleteManyObj({ ids: deleteIds }).subscribe(
        (success: any) => {
          this.selectAll = false;
          this.selectedCheckboxes = [];
          this.toastService.success(success.message);
          this.modalService.dismissAll();
          this.spinner.hide();
          this.getAll();
        },
        (error: any) => {
          console.log("error", error);
        }
      )

  }

}
