const check=async ()=>{
    const tokenString = localStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow',
    };
    return (
        fetch(`http://newproject.replatechnologies.com/api/CheckApi`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('result:',result)
            if(result?.success)
                {
                    return result?.details
                }
            else
                return 0
        })
        .catch(error => {return 0})
    )
}
const storeData=async(obj)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    var requestOptions = {
        headers: myHeaders,
        method: 'Post',
        redirect: 'follow',
        body: JSON.stringify(obj)
        }
    return (
        fetch('http://newproject.replatechnologies.com/api/StoreDetail',requestOptions)
        .then(response=>response.json())
        .then(result=>{
            if(result?.success)
           return result
           throw 'error'
        })
        .catch((error)=>{ return 0})
    )
}
const getIPAddress=()=>{
    var requestOptions = {
    method: 'get',
    redirect: 'follow',
    }
    return (
        fetch('https://api.ipify.org?format=json',requestOptions)
        .then(response=>response.json())
        .then(result=>{
            if(result?.ip)
            return (result?.ip)
            throw 'error'
        })
        .catch((error)=>{ return 0})
    )
}
export {check, storeData, getIPAddress}