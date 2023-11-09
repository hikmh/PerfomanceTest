import http from 'k6/http';
import { sleep, check, group } from 'k6';
// import Login from "./Login";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {duration:"300s", target:10}
    ]

};

export default function (){
    group('Create Order', () => {
        CreateOrder();
    })
}
function CreateOrder() {
    // const getaccesstoken = Login()
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE0OTMsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiVXNlckdEQUIiLCJ1c2VyX3R5cGUiOi0xLCJhcHBfdmVyc2lvbiI6IjUuMC4wIiwiaXNfdGVzdGluZyI6MCwiaWF0IjoxNjk5NDY5MzA4LCJleHAiOjQyOTE0NjkzMDh9.5KSYfi-rq6x5pSOSX5G8KNu6rwHIQwSNzfGcigg6ADg'
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
        "grand_total": 450000,
        "coin_used": 0,
        "items": [
            {
                "cart_id": 1194,
                "city": "kota-surabaya",
                "product_id": 2158,
                "id": 25908,
                "product_attribute_id": 3825,
                "qty": 1,
                "selling_price": 50000,
                "discount": 0,
                "final_price": 50000
            },
            {
                "cart_id": 1195,
                "city": "kota-surabaya",
                "product_id": 2158,
                "id": 25907,
                "product_attribute_id": 3824,
                "qty": 1,
                "selling_price": 400000,
                "flashsale_id": 943,
                "flashsale_product_id": 2871
            }
        ],
        "method": "COD",
        "note": "",
        "payment_type": "COD",
        "sub_total": 450000,
        "is_jawara": false,
        "quick_order": false,
        "potential_cashback": 0
    });
    const response = http.post(apiUrl,payload, {headers});
    console.log(response)
    check(response, {
        'Status is 503' : (r) => {
            if (r.status === 503) {
                console.error('Error 503');
            }
            return r.status === 503
        },
        'Status is 400' : (r) => {
            if (r.status === 400) {
                console.error('Error 400');
            }
            return r.status === 400
        },
        'Status is 0' : (r) => {
            if (r.status === 0) {
                console.error('Error 0');
            }
            return r.status === 0
        },
        'Status is 201' : (r) => {
            if (r.status === 201) {
                console.log('Success 201');
            }
            return r.status === 201
        },
        'Status is 401' : (r) => {
            if (r.status === 401) {
                console.error('Error 401');
            }
            return r.status === 401
        },
        'Status is 404' : (r) => {
            if (r.status === 404) {
                console.error('Error 404');
            }
            return r.status === 404
        },
        'Status is 500' : (r) => {
            if (r.status === 500) {
                console.error('Error 500');
            }
            return r.status === 500
        },
        'Status is 408' : (r) => {
            if (r.status === 408) {
                console.error('Error 408');
            }
            return r.status === 408
        },
        'Status is 507' : (r) => {
            if (r.status === 507) {
                console.error('Error 507');
            }
            return r.status === 507
        },
        'Status is 502' : (r) => {
            if (r.status === 502) {
                console.error('Error 502');
            }
            return r.status === 502
        },
        'Status is 429' : (r) => {
            if (r.status === 429) {
                console.error('Error 429');
            }
            return r.status === 429
        }
    });
}
export function handleSummary(data){
    return {
        "summary-hikmah51.html": htmlReport(data),
    };

}