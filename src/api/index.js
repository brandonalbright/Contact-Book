async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyYW5kb24iLCJpYXQiOjE2MDU1NzQwOTIsImV4cCI6MTYwNjE3ODg5Mn0.HJQ-TnkS1pKhJ-h9oFGShA20oN322SouFjJHvCfY7PI'
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
  
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
  
    return data;
  }

export default fetchAPI