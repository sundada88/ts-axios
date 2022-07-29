import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')
//
// axios.options('/extend/options')
//
// axios.delete('/extend/delete')
//
// axios.head('/extend/head')
//
// axios.post('/extend/post', { msg: 'post' })
//
// axios.put('/extend/put', { msg: 'put' })
//
// axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
}).then(res => {
  console.log(1, res)
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
}).then(res => {
  console.log(2, res)
})

axios('/simple/get', {
  method: 'get'
}).then(res => {
  console.log(123456)
  console.log(res)
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.code)
    console.log(user.result.age)
  }
}

test()
