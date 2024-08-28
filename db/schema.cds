namespace myproject;
using { cuid } from '@sap/cds/common';

entity Customers : cuid {
  name: String(255);
  email: String(255);
  customerNumber: Integer;
  totalPurchaseValue: Integer;
  totalRewardPoints: Integer;
  totalRedeemedRewardPoints: Integer;
}

entity Products : cuid {
  name: String(255);
  description: String(255);
  price: Integer;
}

entity Purchases : cuid {
  purchaseValue: Integer;
  rewardPoints: Integer;
  customer: Association to Customers;
  selectedProduct: Association to Products;
}

entity Redemptions : cuid {
  redeemedAmount: Integer;
  customer: Association to Customers;
}

