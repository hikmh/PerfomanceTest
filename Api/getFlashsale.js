import http from 'k6/http';
import { sleep, check, group } from 'k6';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {duration:"1m", target:5}
    ]

};
export default function (){

    // group('Login', () => {
    //    Login();
    // })
    group('Flash Sale', () => {
        getFlashsale();
    })
}

function getFlashsale(){
    // const accessgettoken = Login();
    const tokenEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyNjEsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiRGF2aWQgSW1tYW51ZWwiLCJ1c2VyX3R5cGUiOi0xLCJhcHBfdmVyc2lvbiI6IjUuMDEuMDAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTkxNzA3NTEsImV4cCI6NDI5MTE3MDc1MX0.RgA-EHGZiC2z9LcGRb4gmUrG8SE1GD29TRsC7gxJrPI'
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
function Login(){
    const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/auth/login'
    const payload = JSON.stringify({
        "phone": "U2FsdGVkX198nb9BaIK9iNV5WwkdKD9YSa49VOQhFKo=",
        "pin" : "U2FsdGVkX19KTJ2cAox1IFJqRMu/qa341WwOCdui79E=",
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
// export default function () {
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyNjEsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiRGF2aWQgSW1tYW51ZWwiLCJ1c2VyX3R5cGUiOi0xLCJhcHBfdmVyc2lvbiI6IjUuMDEuMDAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTg5MDg1NjUsImV4cCI6NDI5MDkwODU2NX0.qy2Bq9qxjxxwLN8XL9mxfMS2dSRKYgXzj5-z_erGd0I'
    // const headers = {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'content-type': 'application/json',
    // };
    // const apiUrl = 'https://staging-superapp-api.superapp.co.id/api/v5/app/marketing/banner?city=kota-surabaya&slot=home-banner-v4';
    // /*const payload = JSON.stringify({"product_id": 2694,"product_attribute_id": 4408,"quantity": 10,"warehouse_id": 1,"flashsale_id": 0,"source_page": "home-search","query_id": "0","warehouse_name": "aloha"});*/
    // const response = http.get(apiUrl, {headers});
    // check(response, {
    //     'Success Post Cart': (r) => r.status === 200,
    // })
    // console.log(response)
    // const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/auth/login';
    // const payload = JSON.stringify({
    //     "phone": "U2FsdGVkX198nb9BaIK9iNV5WwkdKD9YSa49VOQhFKo=",
    //     "pin" : "U2FsdGVkX19KTJ2cAox1IFJqRMu/qa341WwOCdui79E=",
    //     "app_version":"5.02.00"
    //
    // });
    // const headers = {
    //     'content-type': 'application/json',
    // };
    // const response = http.post(tokenEndpoint,payload,{headers});
    // check(response,{
    //     'Success Get Token' : (r) => r.status === 202,
    // });
    // const body = JSON.parse(response.body);
    // return body.token;
// }
/*
//Contoh Script untuk generate report pengujian mengggunakan bawaan K6
export function handleSummary(data) {
    return {
        "ReportAddtocart.html": htmlReport(data), //define nama file report
    };
}*/
