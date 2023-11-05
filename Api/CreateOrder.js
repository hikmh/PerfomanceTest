import http from 'k6/http';
import { sleep, check, group } from 'k6';
// import Login from "./Login";
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export const options = {
//     stages : [
//         {duration:"1m", target:5}
//     ]
//
// };

export default function (){
    group('Create Order', () => {
        CreateOrder();
    })
}
function CreateOrder() {
    // const getaccesstoken = Login()
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyNjEsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiRGF2aWQgSW1tYW51ZWwiLCJ1c2VyX3R5cGUiOi0xLCJhcHBfdmVyc2lvbiI6IjUuMDEuMDAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTkxNzA3NTEsImV4cCI6NDI5MTE3MDc1MX0.RgA-EHGZiC2z9LcGRb4gmUrG8SE1GD29TRsC7gxJrPI'
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
    };
    const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/order/create';
    const payload = JSON.stringify({
        "customer_id": 0,
        "address_id": 18761,
        "voucher_id":null,
        "voucher_type":null,
        "delivery_date": "2023-04-01",
        "estimation_time": "07:00 - 9:00",
        "grand_total": 336000,
        "coin_used": 0,
        "items": [
            {
                "city": "kota surabaya",
                "id": 18034,
                "product_attribute_id": 3840,
                "product_id": 2170,
                "qty": 7,
                "selling_price": 336000,
                "commission_product": 0,
                "commission_delivery": 0
            }
        ],
        "method": "COD",
        "note": "",
        "payment_type": "COD",
        "profit": 0,
        "points": 0,
        "commission_product": 0,
        "commission_delivery": 0,
        "commission_order": 0,
        "sub_total": 336000
    });
    const response = http.post(apiUrl,payload, {headers});
    console.log(response)
    check(response, {
        'Success Create Order': (r) => r.status === 201
    });
}