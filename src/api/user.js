import axios from '@/utils/axios'

export function login(data) {
  return axios.post('/vue-element-admin/user/login', data)
}

export function getInfo(token) {
  return axios.get('/vue-element-admin/user/info', { token })
}

export function logout() {
  return axios.post('/vue-element-admin/user/logout')
}
