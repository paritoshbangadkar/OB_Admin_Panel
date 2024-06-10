import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-custom-pagination",
    templateUrl: "./custom-pagination.component.html",
    styleUrls: ["./custom-pagination.component.scss"],
})
export class CustomPaginationComponent implements OnInit, AfterViewInit {
    @Input() page: number = 1;
    @Output() pageChange = new EventEmitter<number>();
    @Input() pageSize: number = 50;
    @Output() pageSizeChange = new EventEmitter<number>();
    @Input() collection: number = 0;
    @Output() collectionChange = new EventEmitter<number>();

    @Output() myOutput: EventEmitter<any> = new EventEmitter();
    itemsPerPage: number = 50;
    public currentPageLimit: number = 50;
    public pageLimitOptions = [{ value: 50 }, { value: 75 }, { value: 100 }];

    constructor() { }
    ngAfterViewInit(): void {
        // console.log("child", this.pageSize, this.page, this.collection);
    }

    ngOnInit(): void {
        // console.log("child", this.pageSize, this.page, this.collection);
    }

    onChangePage(pageNo) {
        this.pageChange.emit(this.page);
        this.pageSizeChange.emit(this.pageSize);
        this.collectionChange.emit(this.collection);
        this.myOutput.emit(pageNo);
    }
}
