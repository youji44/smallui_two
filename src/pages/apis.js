
const baseURL = 'https://dkdiiaw.com/backend';
// const baseURL = 'http://127.0.0.1:8000';
const ipInfo = 'https://api.ipify.org?format=json';

const check = async () => {
    const tokenString = localStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow',
    };
   
    return (
        fetch(baseURL + '/api/CheckApi', requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    return result?.details
                }
                else
                    return 0
            })
            .catch(error => {
                console.log('Error:', error)
                return 0
            })
    )
}

const storeData = async (obj) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    var requestOptions = {
        headers: myHeaders,
        method: 'post',
        redirect: 'follow',
        body: JSON.stringify(obj)
    }
    return (
        fetch(baseURL+'/api/StoreDetail', requestOptions)
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch((error) => {
                return 0 
            })
    )
}

const getIPAddress = () => {
    var requestOptions = {
        method: 'get',
        redirect: 'follow',
    }
    return (
        fetch(ipInfo, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.ip)
                    return (result?.ip)
                throw 'error'
            })
            .catch((error) => { 
                return 0 
            })
    )
}

const visitNow = async (data) => {
   
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };
 
    return (
        fetch(baseURL + `/api/visit?browser=${encodeURIComponent(data.browser)}&datetime=${encodeURIComponent(data.datetime)}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    return result?.message
                }
                else{
                    return 0
                }
            })
            .catch(error => {
                console.log(error)
                return 0
            })
    )
}
export { check, storeData, getIPAddress,visitNow }