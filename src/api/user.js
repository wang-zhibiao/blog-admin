import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/vue-admin-template/user/login',
  //   method: 'post',
  //   data
  // })
  return new Promise((res, rej) => {
    let data = {
      code: 20000,
      data: { token: "admin-token" }
    }
    res(data)
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return new Promise((res, rej) => {
    let data = {
      code: 20000,
      data: {
        roles: ["admin"],
        introduction: "I am a super administrator",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name: "Super Admin"
      }
    }
    res(data)
  })
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
  return new Promise((res, rej) => {
    let data = { code: 20000, data: "success" }
    res(data)
  })
}
