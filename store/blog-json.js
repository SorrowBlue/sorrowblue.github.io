import JsonData from '~/assets/blog.json'

// 状態管理
export const state = () => ({
  data: JsonData
})

// getters
export const getters = {
  getAll(state) {
    return state.json
  }
}
