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
        'Status is 202': (r) => {
            if (r.status !== 202) {
                console.error(`Error at minute ${Math.floor(timestamp / 60000)}`);
            }
            return r.status === 202;
        },
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
