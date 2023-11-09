import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {duration:"300s", target:2000}
    ]

};
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
    const tokenEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTk4OTQsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiVEVTVElOR18xMjM1NjciLCJ1c2VyX3R5cGUiOjYsImFwcF92ZXJzaW9uIjoiNS4wLjAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTk0NjU2MDMsImV4cCI6NDI5MTQ2NTYwM30.DSQrYcqr2EEEORbpzU6cgqz_0-66EXo0enPjzSggDkE'
    const headers = {
        'Authorization': `Bearer ${tokenEndpoint}`
        // 'content-type': 'application/json'
    }
    const url = 'https://staging-superapp-api.superapp.co.id/api/v5/app/customer/info'
    const response = http.get(url,{headers});
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
        'Status is 200' : (r) => {
            if (r.status === 200) {
                console.log('Success 200');
            }
            return r.status === 200
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
    // 'Status is 200' : (r) => {
    //     if ( r.status = 503) {
    //         console.error(`Error with Response 503`);
    //     } else if (r.status = 500) {
    //         console.error(`Error with Response 500`);
    //     }
    //     else if (r.status = 403) {
    //         console.error(`Error with Response 403`);
    //     } else if (r.status = 400){
    //         console.error(`Error with Response 400`);
    //     }
    //     return r.status === 200;
    // }

    //     if (r.status = 503){
    //         console.error('Error status is 503');
    // } {r.status = 403){
    //
    // }
    //
    // }
    //     return r.status === 200;
    // 'Response status is 503': (r) => r.status === 503,
    // 'Response status is 403': (r) => r.status === 403,
    // 'Response status is 400': (r) => r.status === 400,
    // 'Response status is 200': (r) => r.status === 200,


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
export function handleSummary(data){
    return {
        "summary-hikmah45.html": htmlReport(data),
    };

}