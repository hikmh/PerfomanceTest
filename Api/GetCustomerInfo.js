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

    // group('Login', () => {
    //    Login();
    // })
    group('Customer Info', () => {
        getCustomerInfo();
    })
}

function getCustomerInfo(){
    // const accessgettoken = Login();
    const tokenEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTk4OTQsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiVEVTVElOR18xMjM1NjciLCJ1c2VyX3R5cGUiOjYsImFwcF92ZXJzaW9uIjoiNS4wMS4wMCIsImlzX3Rlc3RpbmciOjAsImlhdCI6MTY5OTE3MDk3MywiZXhwIjo0MjkxMTcwOTczfQ.b7u-jGN0QbGse3sNCvHXBMzRdS2bv93LO_DRZwr0qWI'
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
}
// function Login(){
//     const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/customer/info'
//     const payload = JSON.stringify({
//         "phone": "U2FsdGVkX198nb9BaIK9iNV5WwkdKD9YSa49VOQhFKo=",
//         "pin" : "U2FsdGVkX19KTJ2cAox1IFJqRMu/qa341WwOCdui79E=",
//         "app_version":"5.02.00"
//     });
//     const headers = {
//         'Authorization' :
//         'content-type': 'application/json'
//     };
//     const response = http.post(tokenEndpoint, payload, {headers} );
//     check(response,{
//         'Success Get Token' : (r) => r.status === 202,
//     });
//     const body = JSON.parse(response.body);
//     return body.token;
//     console.log(body)
//
// }