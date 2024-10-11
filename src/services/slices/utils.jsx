
export const checkResponse = (res) =>  {
  return new Promise((resolve, reject) => {
    if (res.status === 204) {
      return resolve(res)
    }
    const func = res.status < 400 ? resolve : reject
    res.json().then((data) => func(data))
  })
}