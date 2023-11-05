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
        'Success Add to Cart': (r) => r.status === 201
    });
}

