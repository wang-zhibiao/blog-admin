import cache from '@/utils/cache'
import { getLanguage } from '@/language'

const state = {
  sidebar: {
    opened: cache.getCookie('sidebarStatus') ? !!+cache.getCookie('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: cache.getCookie('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      cache.setCookie('sidebarStatus', 1)
    } else {
      cache.setCookie('sidebarStatus', 0)
    }
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    cache.setCookie('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    cache.setCookie('size', size)
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    cache.setCookie('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
