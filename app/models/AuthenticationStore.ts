import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "app/services/api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
    distributeAuthToken(value?: string) {
      const token = value || store.authToken
      api.apiSauce.setHeader("Authorization", `Bearer ${token}`)
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
