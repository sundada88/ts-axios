import axios, {AxiosError} from '../../package/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['baraa', 'baz']
  }
})
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
axios.get('/base/get').then((res) => {
  console.log('ccccccccccccccc')
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
axios('/base/get', {
  method:'get'
}).then(res => {
  console.log(33333333333)
  console.log(res)
})

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
}).then(res => {
  console.log('bbbbb', res)
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2222
  },
  headers: {
    'content-type': 'aaaaaaaa'
  }
}).then(res => {
  console.log('aaaaaaaaaaaaaa', res)
})

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })


// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then(res => {
//   console.log(res)
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(res => {
//   console.log(res)
// })
