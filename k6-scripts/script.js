import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        // Ramp-up from 1 to 5 virtual users (VUs) in 5s
        { duration: "10s", target: 75 },
    
        // Stay at rest on 5 VUs for 10s
        { duration: "40s", target: 75 },
    
        // Ramp-down from 5 to 0 VUs for 5s
        { duration: "10s", target: 0 },
      ],
}

export default function () {
    var baseUrl = 'https://<url>'

    var payload = JSON.stringify({
        guid: '<guid>'
    })

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Scenario 1: 
    // Step 1 - Login
    let response = http.post(baseUrl + 'login', payload, params)
    let response_json = response.json()
    check(response, { "Login status is 200": (r) => r.status === 200 })
    sleep(1)


    // Step 2 - Check Queue
    params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + response_json.token,
        },
    }
    response = http.get(baseUrl + 'queue/check', params)
    response_json = response.json()
    check(response, { "Check Queue status is 200": (r) => r.status === 200 })
    check(response_json, { "queue is check true": (r) => r.is_check === true })
    console.log("is_check: " + response_json.is_check + " queue: " + response_json.queue + " current_queue: " + response_json.current_queue)
    sleep(1)
}