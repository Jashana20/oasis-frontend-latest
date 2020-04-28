const baseUrl = "http://localhost:3000"
const entriesUrl = "http://localhost:3000/entries"

const post = (url, data) => {
    const configurationObject = {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Accept':'application/json',
        },
        body: JSON.stringify(data)
    } 
    return fetch(`${baseUrl}/${url}`, 
    configurationObject)
    .then(res => res.json())
  }

  const get = (url, token) => {
      return fetch(`${baseUrl}/${url}`,{
          headers: {
              "Authorization": token
          },
      }).then(res => res.json())
  }

  const patch = (id, data) => {
    fetch(`${entriesUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  };

  export default { post, get, patch}
  