import http from 'k6/http';
import { sleep, check, group } from 'k6';


// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export const options = {
//     stages : [
//         {duration:"1m", target:5}
//     ]
//
// };

export default function (){

    group('Login', () => {
        login();
    })
    group('Customer Info', () => {
        CustomerInfo();
    })
    group('Get Flash Sale', () => {
        Flashsale();
    })

    group('Get Catalog Product', () => {
       CatalogProduct();
    })
    group('Add to Cart', () => {
       CreateOrder();
    })
    group('Create Order', () => {
        addtocart();
    })



}
function login(){
    const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/auth/login'
    const payload = JSON.stringify({
        "phone": "U2FsdGVkX1/nIlULYFMtNiIBPq2IqnvxRw1Kk6/sxNg=",
        "pin" : "U2FsdGVkX18MIHeRGgIn2Yt2GVz13adxrVl7P4NU0g4=",
        "app_version":"5.02.00"
    });
    const headers = {
        'content-type': 'application/json'
    };
    const response = http.post(tokenEndpoint, payload, {headers} );
    check(response,{
        'Success Get Token' : (r) => r.status === 202,
    });
    const body = JSON.parse(response.body);
    return body.token;
    console.log(body)

}
function CustomerInfo(){
    const tokenEndpoint = login();
    const headers = {
        'Authorization': `Bearer ${tokenEndpoint}`
        // 'content-type': 'application/json'
    }
    const url = 'https://staging-superapp-api.superapp.co.id/api/v5/app/customer/info'
    const response = http.get(url,{headers});
    // console.log(response)
    check(response,{
        'Get Customer Info' : (r) => r.status === 200,
    });
}function Flashsale(){
    const tokenEndpoint = login();
    const headers = {
        'Authorization': `Bearer ${tokenEndpoint}`,
        'content-type': 'application/json'
    }
    const url = ('https://staging-superapp-api.superapp.co.id/api/v5/app/flash-sale?city=kota-surabaya')
    const response = http.get(url,{headers});
    check(response,{
        'Success Get Flash Sale' : (r) => r.status === 200,
    });
}
function CatalogProduct(){
    const tokenEndpoint = login();
    const headers = {
        'Authorization': `Bearer ${tokenEndpoint}`,
        'content-type': 'application/json'
    }
    const url = ('https://staging-superapp-api.superapp.co.id/api/v5/app/product/catalogue?page=1&city=kota-surabaya')
    const response = http.get(url,{headers});
    check(response,{
        'Success to Get Product' : (r) => r.status === 200,
    });
}
function addtocart() {
    const getaccesstoken = login();
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2NzIsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiRVZBTiIsInVzZXJfdHlwZSI6LTEsImFwcF92ZXJzaW9uIjoiNS4wMS4wMCIsImlzX3Rlc3RpbmciOjAsImlhdCI6MTY5OTE3ODg4NSwiZXhwIjo0MjkxMTc4ODg1fQ.9lT0OBpSaWf0bLJ9YtvINnuzmLqF0gRvBiedJZBfmkQ';
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
function CreateOrder() {
    // const getaccesstoken = Login()
    const accessToken = login();
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
// function Addtocart() {
//     const accessToken = Login();
//     const headers = {
//         'Authorization': `Bearer ${accessToken}`,
//         'content-type': 'application/json',
//     };
//     const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/cart';
//     const payload = JSON.stringify({});
//     const response = http.post(apiUrl,payload, {headers});
//     check(response, {
//         'Success Add to Cart': (r) => r.status === 201
//     });
// }
//
