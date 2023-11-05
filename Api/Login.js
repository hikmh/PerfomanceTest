import http from 'k6/http';
import { sleep, check, group } from 'k6';

// export const options = {
//     stages : [
//         {duration:"1m", target:5}
//     ]
//
// };
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