import { salesData as Data } from "./dummyData.js";

class RewardPoints {
  constructor(data) {
    this.saleData = data;
    this.customerData = "";
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  setCustomer(customerName) {
    let customerData = this.saleData.find(
      (data) => data.name.toLowerCase() === customerName.toLowerCase()
    );

    if (!customerData) {
      return;
    } else {
      this.customerData = customerData.purchaseHistory;
      return `customer set to ${customerName}`;
    }
  }

  checkValidMonth(month) {
    return this.months.find(
      (monthName) => monthName.toLowerCase() === month.toLowerCase()
    );
  }

  monthsPoints(month) {
    if (!this.checkValidMonth(month)) {
      return;
    }
    return this.pointCalc(this.getMonthData(month), 0);
  }

  getMonthData(month) {
    let customerData = this.customerData;
    return customerData.filter(
      (data) =>
        this.months[new Date(data.date).getMonth()].toLowerCase() ===
        month.toLowerCase()
    );
  }

  pointCalc(purchaseData, points) {
    purchaseData.map((billData) => {
      let bill = billData.billingAmount;
      if (bill > 100) {
        points += (bill - 100) * 2 + 50;
      } else if (bill <= 100 && bill > 50) {
        points += bill - 50;
      }
    });
    return points;
  }

  selectedMonthsPoints(months) {
    return this.pointCalc(this.getSelectedMonthsData(months), 0);
  }

  getSelectedMonthsData(months) {
    let data = [];
    for (let month of months) {
      if (!this.checkValidMonth(month)) {
        console.log(`${month} is invalid`);
        return;
      }
      data = data.concat(this.getMonthData(month));
    }
    return data;
  }

  totalPoints() {
    return this.pointCalc(this.customerData, 0);
  }
}

//data avaiable for
//customers : chandler, monica, joey, ross, pheobe, rachel
//months: may, june , july

let data = new RewardPoints(Data);
let name = "Chandler";
let singleMonth = "june";
let months = ["may", "june", "july"];

console.log(
  data.setCustomer(name),
  data.monthsPoints(singleMonth),
  data.totalPoints(),
  data.selectedMonthsPoints(months)
);
