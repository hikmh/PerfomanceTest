import http from 'k6/http';
import { sleep, check, group } from 'k6';
import Login from "./Login";
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {duration:"1m", target:5}
    ]

};

export default function (){
    group('Create Order', () => {
        CreateOrder();
    })
}
function CreateOrder() {
    // const getaccesstoken = Login()
    const accessToken = ''
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
    };
    const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/order/create';
    const payload = JSON.stringify({
        "customer_id":19261,
        "address_id":18989,
        "voucher_id":null,
        "voucher_type":null,
        "delivery_date":"2023-11-01",
        "discount":0,
        "estimation_time":"07:00 - 9:00",
        "grand_total":200000,
        "coin_used":0,
        "items":[{
            "cart_id":1004,
            "city":"kota-surabaya",
            "product_id":2703,
            "id":27700,
            "product_attribute_id":4417,
            "qty":2,
            "selling_price":100000,
            "discount":0,"final_price":200000
        }],
        "method":"COD",
        "note":"",
        "payment_type":"COD",
        "sub_total":200000,
        "is_jawara":false,
        "quick_order":false,
        "potential_cashback":0
    });
    const response = http.post(apiUrl,payload, {headers});
    check(response, {
        'Success Create Order': (r) => r.status === 201
    });
}