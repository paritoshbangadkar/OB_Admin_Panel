// import { Injectable } from "@angular/core";
// import * as moment from "moment-timezone";
// const timeZone = 'Asia/Kolkata';
// @Injectable()
// export class UtilityService {

//     constructor() { }
//     getTime() {
//         return moment().tz(timeZone).format("HH:mm:ss");
//     };
//     getDate() {
//         return moment().tz(timeZone).format("YYYY-MM-DD");
//     };
//     newDateTime(time) {
//         return moment(`${this.getDate()} ${time}`)
//             .tz(timeZone)
//             .format("YYYY-MM-DD HH:mm:ss");
//     };
//     addNewDate(time) {
//         return moment(`${this.getDate()} ${time}`)
//             .tz(timeZone)
//             .add(1, "d")
//             .format("YYYY-MM-DD HH:mm:ss");
//     };
//     getDay() {
//         return moment().tz(timeZone).weekday();
//     };
//     getDateTime() {
//         return moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
//     };
//     addSeconds() {
//         return moment()
//             .tz(timeZone)
//             .add(1, "seconds")
//             .format("YYYY-MM-DD HH:mm:ss");
//     };
//     checkTime() {
//         let hour = moment().tz(timeZone).get("hour");
//         return hour < 19 || hour === 0 ? true : false;
//     };
//     SSCheckTime() {
//         let hour = moment().tz(timeZone).get("hour");
//         return hour < 15 || hour === 0 ? true : false;
//     };
//     getHour() {
//         return moment().tz(timeZone).get("hour");
//     };
//     decrementDate() {
//         return moment().tz(timeZone).subtract(1, "d").format("YYYY-MM-DD");
//     };
//     checkDay() {
//         let day = moment().tz(timeZone).day();
//         return day === 0 || day === 6 ? true : false;
//     };
//     checkMarketTime(time, after) {
//         var format = "HH:mm:ss";
//         var m = moment(time, format).tz(timeZone);
//         var closingTime = moment(after, format).tz(timeZone);
//         var beforeTime = moment("00:00:00", format).tz(timeZone);
//         if (time === "00:00:00") {
//             return true;
//         } else {
//             return beforeTime.diff(closingTime, "minute") > 0 ? true : false;
//         }
//     };

// }
