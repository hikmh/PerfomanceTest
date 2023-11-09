import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {duration:"10s", target:1000}
    ]

};
export default function (){
    Login();
}
function Login(){
    const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/auth/login'
    const payload = JSON.stringify({
        "phone": "U2FsdGVkX1/Y64SLgtWCNb7Rkn5oL/VOYD40P6lfUPg=",
        "pin" : "U2FsdGVkX1+bHA9vq4M7EgHHQDfB+7usrITHE6pAq3s=",
        "app_version":"5.02.00"
    });
    const timestamp = Date.now(); // Timestamp ketika kesalahan terjadi
    const headers = {
        'content-type': 'application/json'
    };
    const response = http.post(tokenEndpoint, payload, {headers} );
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
        'Status is 202' : (r) => {
            if (r.status === 202) {
                console.log('Success Login 202');
            }
            return r.status === 202
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
    // check(response,{
    //     'Success Get Token' : (r) => r.status === 202,
    // });
    const body = JSON.parse(response.body);
    return body.token;

//     let response = http.get('https://example.com/your_endpoint');
//     const timestamp = Date.now(); // Timestamp ketika kesalahan terjadi
//     check(response, {
//         'Status is 200': (r) => {
//             if (r.status !== 200) {
//                 console.error(`Error at minute ${Math.floor(timestamp / 60000)}`);
//             }
//             return r.status === 200;
//         },
//     });
// }

}
// export function handleSummary(data){
//     return {
//         "Login2.html": htmlReport(data),
//     };
//
// }
