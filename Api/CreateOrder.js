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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE0OTMsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiVXNlckdEQUIiLCJ1c2VyX3R5cGUiOi0xLCJhcHBfdmVyc2lvbiI6IjUuMDEuMDAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTkyNzUyOTQsImV4cCI6NDI5MTI3NTI5NH0.c_w7bIHLQJivNfu_p1HZMxzkou27i7tq4UUkMAwowE4'
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
    };
    const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/order/create';
    const payload = JSON.stringify({
        "customer_id": 21493,
        "address_id": 21468,
        "voucher_id": null,
        "voucher_type": null,
        "delivery_date": "2023-11-08",
        "discount": 0,
        "estimation_time": "07:00 - 9:00",
        "grand_total": 100000,
        "coin_used": 0,
        "items": [
            {
                "cart_id": 1192,
                "city": "kota-surabaya",
                "product_id": 2158,
                "id": 25908,
                "product_attribute_id": 3825,
                "qty": 2,
                "selling_price": 50000,
                "discount": 0,
                "final_price": 100000
            }
        ],
        "method": "COD",
        "note": "",
        "payment_type": "COD",
        "sub_total": 100000,
        "is_jawara": false,
        "quick_order": false,
        "potential_cashback": 0
    });
    const response = http.post(apiUrl,payload, {headers});
    console.log(response)
    check(response, {
        'Success Create Order': (r) => r.status === 201
    });
}