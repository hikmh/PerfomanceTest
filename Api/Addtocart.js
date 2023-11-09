import http from 'k6/http';
import { sleep, check, group } from 'k6';
import Login from "./Login";

// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export const options = {
//     stages : [
//         {duration:"1m", target:5}
//     ]
//
// };

export default function (){
    group('Add to Cart', () => {
        Addtocart();
    })
}
function Addtocart() {
    // const getaccesstoken = Login();
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2NzIsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiRVZBTiIsInVzZXJfdHlwZSI6LTEsImFwcF92ZXJzaW9uIjoiNS4wMS4wMCIsImlzX3Rlc3RpbmciOjAsImlhdCI6MTY5OTE3ODg4NSwiZXhwIjo0MjkxMTc4ODg1fQ.9lT0OBpSaWf0bLJ9YtvINnuzmLqF0gRvBiedJZBfmkQ';
    const headers = {
        'Authorization': `Bearer ${getaccesstoken}`,
        'content-type': 'application/json',
    };
    const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/cart';
    const payload = JSON.stringify({
        "product_id": 2694,
        "product_attribute_id": 4408,
        "quantity": 10,
        "warehouse_id": 1,
        "flashsale_id": 0,
        "source_page": "home-search",
        "query_id": "0",
        "warehouse_name": "aloha"});
    const response = http.post(apiUrl,payload, {headers});
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

