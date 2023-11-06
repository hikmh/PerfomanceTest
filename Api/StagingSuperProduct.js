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

    group('Success To Get Super Product', () => {
        SuperProduct();
    })
}

function SuperProduct(){
    // const tokenEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE0MDAsImxldmVsIjoiYWdlbnQiLCJuYW1lIjoiaGlrbWFoIHNhbGFtIiwidXNlcl90eXBlIjo2LCJhcHBfdmVyc2lvbiI6IjUuMDEuMDAiLCJpc190ZXN0aW5nIjowLCJpYXQiOjE2OTkxNzEyMTUsImV4cCI6NDI5MTE3MTIxNX0.s3y1hrBUKp9UEqVp2w0tf6JOczfKTrCsagbPl68-XfM'
    const headers = {
        'X-TYPESENSE-API-KEY' : '165b230f-b5f7-4c2c-b953-8b0af272152d'
    }
    const url = 'http://dev.superagen.id:8108/collections/StagingSuperProduct-1/documents/search?q=minyak&query_by=name'
    const response = http.get(url,{headers});
    check(response,{
        'Success to Get Super Product' : (r) => r.status === 200,
    });
}
// function Login(){
//     const tokenEndpoint = 'https://staging-superapp-api.superapp.co.id/api/v5/app/auth/login'
//     const payload = JSON.stringify({
//         "phone": "U2FsdGVkX198nb9BaIK9iNV5WwkdKD9YSa49VOQhFKo=",
//         "pin" : "U2FsdGVkX19KTJ2cAox1IFJqRMu/qa341WwOCdui79E=",
//         "app_version":"5.02.00"
//     });
//     const headers = {
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