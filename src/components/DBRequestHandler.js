export async function postData(url = '', data = {}) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options);
    return response.json();
}