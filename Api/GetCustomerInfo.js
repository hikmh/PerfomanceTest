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
    const tokenEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEzNTQsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiVXNlckdEQUIiLCJ1c2VyX3R5cGUiOjYsImFwcF92ZXJzaW9uIjoiNS4wMS4wMCIsImlzX3Rlc3RpbmciOjAsImlhdCI6MTY5ODkxMTQ4NSwiZXhwIjo0MjkwOTExNDg1fQ.hUQn_sLPcWE11mXDrLwhq_AxLcxXiIj770zx4Po31kg'
    const headers = {
        'Authorization': `Bearer ${tokenEndpoint}`,
        'content-type': 'application/json'
    }
    const url = 'https://staging-superapp-api.superapp.co.id/api/v5/app/customer/info'
    const response = http.get(url,{headers});
    check(response,{
        'Get Customer Info' : (r) => r.status === 200,
    });
}
function Login(){
    const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/customer/info'
    const payload = JSON.stringify({
        "phone": "U2FsdGVkX198nb9BaIK9iNV5WwkdKD9YSa49VOQhFKo=",
        "pin" : "U2FsdGVkX19KTJ2cAox1IFJqRMu/qa341WwOCdui79E=",
        "app_version":"5.02.00"
    });
    // const headers = {
    //     'content-type': 'application/json'
    // };
    const response = http.post(tokenEndpoint, payload, {headers} );
    check(response,{
        'Success Get Token' : (r) => r.status === 202,
    });
    const body = JSON.parse(response.body);
    return body.token;
    console.log(body)

}