export interface Product {
    "_id": string,
    "metafields": {
      "decimalQuantity": boolean,
      "sizeChart": string,
      "productUnit": number
    },
    "images": string[],
    "collectionSet": string[],
    "brand"?: string,
    "categoy": string[],
    "status": string,
    "tag"?: string,
    "name": string,
    "alias"?: string,
    "description"?: string,
    "price": [
      { 
        "_id": string,
        "lowerLimit": number,
        "upperLimit": number,
        "vendorPrice": number,
        "adminPrice": number,
        "discountType":string,
        "userType":string
      }
    ],
    "sku": string,
    "weight": number,
    "tax": string,
    "inventoryMangement": {
      "allowOutOfStack": boolean,
      "inventoryQuantity": number,
      "inventoryLowStockQuantity": number
    },
    "sortOrder": number,
    "updatedAt": number,
    "createdAt": number,
  }