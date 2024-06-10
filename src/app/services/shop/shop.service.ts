import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/httpApi.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  routes: any = {
    createPath: `/admin/shop`,
    getByIdPath: (id) => `/admin/shop/${id}`,
    getQrCode: (id) => `/admin/shop/get-qr-code/${id}`,
    getAllPath: `/admin/shop`,
    getGustShop: `/admin/shop/guest-shop`,
    getAllDeletedBusiness: `/admin/shop/get-deleted-business`,
    getAllFavorite: `/admin/shop/get-favorite`,
    getAllShopEmployee: `/admin/shop/employee-listing`,
    getAllGroup: `/admin/shop/group-listing/`,
    getGroupInfo: `/admin/shop/group-info`,
    changeStatus: (_id) => `/admin/shop/${_id}`,
    employeeChangeStatus: (_id) => `/admin/shop/change-status/${_id}`,
    updatePath: (id) => `/admin/shop/${id}`,
    kycDoc: (id) => `/admin/shop/kyc/${id}`,
    deletePath: (id) => `/admin/shop/${id}`,
    deleteEmployee: (id) => `/admin/shop/delete/${id}`,
    viewEmployee: (id) => `/admin/shop/view/${id}`,
    updateEmployee: (id) => `/admin/shop/update/${id}`,
    deleteManyObj: `/admin/shop/delete-many`,
    deleteGuest: (id) => `/admin/shop/guest-user/${id}`,
    isKYCDone: `/admin/shop/kyc-status`,
    addPorterRequestPath: `/admin/shop/add-porter-request`,
    addPorterServicePath: `/admin/shop/add-delivery-service`,
    addPorterTokenPath: `/admin/shop/add-porter-token`,
    addCatalogueBtnPath: `/admin/shop/catalogue-btn`,
    addServiceBtnPath: `/admin/shop/service-btn`,
    addDiscountMessage: `/admin/shop/discount-message`,

    addPlaceOrderBtnPath: `/admin/shop/place-order-btn`,
    addDeliveryAddressConfirmPath: `/admin/shop/delivery-address-btn`,
    addProceedToBuyBtnPath: `/admin/shop/proceed-to-buy-btn`,
    addProceedToCheckoutBtnPath: `/admin/shop/proceed-to-checkout-btn`,
    // google map
    getAddress: (payload: any) =>
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lng}&key=AIzaSyAp92DF5Vk3CokhTVKskaGA174iSX7o2Cs`,

    getAddressByPinCode: (payload: any) =>
      `http://www.postalpincode.in/api/pincode/${payload.Pincode}`,
  };


  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }

  getAll(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getAllPath, payload)
      .pipe(map((res: any) => res));
  }

  getAllDeletedBusiness(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getAllDeletedBusiness, payload)
      .pipe(map((res: any) => res));
  }

  getAllGuestShop(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getGustShop, payload)
      .pipe(map((res: any) => res));
  }

  update(payload) {
    return this.http
      .put(this.routes.updatePath(payload._id), payload)
      .pipe(map((res: any) => res));
  }

  kycDoc(payload) {
    return this.http
      .patch(this.routes.kycDoc(payload.id), payload)
      .pipe(map((res: any) => res));
  }

  getById(id) {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }

  getQrCode(id) {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getQrCode(id))
      .pipe(map((res: any) => res));
  }

  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }

  deleteGuest(id) {
    return this.http
      .delete(this.routes.deleteGuest(id))
      .pipe(map((res: any) => res));
  }

  deleteManyObj(payload) {
    return this.http
      .deleteObj(this.routes.deleteManyObj, payload)
      .pipe(map((res: any) => res));
  }

  // google map
  getAddress(payload) {
    return this.http
      .get(this.routes.getAddress(), payload)
      .pipe(map((res: any) => res));
  }

  getAddressByPinCode(payload) {
    return this.http
      .get(this.routes.getAddressByPinCode(), payload)
      .pipe(map((res: any) => res));
  }

  changeStatus(_id) {
    return this.http
      .patch(this.routes.changeStatus(_id))
      .pipe(map((res: any) => res));
  }

  employeeChangeStatus(_id) {
    return this.http
      .put(this.routes.employeeChangeStatus(_id))
      .pipe(map((res: any) => res));
  }

  getAllFavorite(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getAllFavorite, payload)
      .pipe(map((res: any) => res));
  }

  getAllShopEmployee(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getAllShopEmployee, payload)
      .pipe(map((res: any) => res));
  }

  getAllGroup(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getAllGroup, payload)
      .pipe(map((res: any) => res));
  }

  getGroupInfo(payload): Observable<any> {
    debounceTime(500);
    distinctUntilChanged();
    return this.http
      .get(this.routes.getGroupInfo, payload)
      .pipe(map((res: any) => res));
  }

  deleteEmployee(id) {
    return this.http
      .delete(this.routes.deleteEmployee(id))
      .pipe(map((res: any) => res));
  }

  viewEmployee(id) {
    debounceTime(500); distinctUntilChanged();
    return this.http
      .get(this.routes.viewEmployee(id))
      .pipe(map((res: any) => res));
  }

  updateEmployee(payload) {
    return this.http
      .put(this.routes.updateEmployee(payload.id), payload)
      .pipe(map((res: any) => res));
  }

  isKYCDone(payload: any) {
    return this.http
      .patch(this.routes.isKYCDone, payload).pipe(map(data => {
        if (data && data) {
          return data;
        } else {
          return null;
        }
      }));
  }

  addPorterRequest(payload: any) {
    return this.http
      .patch(this.routes.addPorterRequestPath, payload)
      .pipe(map((res: any) => res));
  }

  addPorterService(payload: any) {
    return this.http
      .patch(this.routes.addPorterServicePath, payload)
      .pipe(map((res: any) => res));
  }

  addPorterToken(payload: any) {
    return this.http
      .patch(this.routes.addPorterTokenPath, payload)
      .pipe(map((res: any) => res));
  }

  addCatalogueBtn(payload: any) {
    return this.http
      .patch(this.routes.addCatalogueBtnPath, payload)
      .pipe(map((res: any) => res));
  }

  addServiceBtn(payload: any) {
    return this.http
      .patch(this.routes.addServiceBtnPath, payload)
      .pipe(map((res: any) => res));
  }

  addProceedToCheckoutBtn(payload: any) {
    return this.http
      .patch(this.routes.addProceedToCheckoutBtnPath, payload)
      .pipe(map((res: any) => res));
  }

  addProceedToBuyBtn(payload: any) {
    return this.http
      .patch(this.routes.addProceedToBuyBtnPath, payload)
      .pipe(map((res: any) => res));
  }

  addDeliveryAddressConfirmBtn(payload: any) {
    return this.http
      .patch(this.routes.addDeliveryAddressConfirmPath, payload)
      .pipe(map((res: any) => res));
  }

  addPlaceOrderBtn(payload: any) {
    return this.http
      .patch(this.routes.addPlaceOrderBtnPath, payload)
      .pipe(map((res: any) => res));
  }

  addDiscountMessage(payload: any) {
    return this.http
      .patch(this.routes.addDiscountMessage, payload)
      .pipe(map((res: any) => res));
  }
}