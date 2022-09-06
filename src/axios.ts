import Cancel, { isCancel } from './cancel/Calcel'
import { CancelToken } from './cancel/CancelToken'
import Axios from './core/axios'
import defaults from './core/defaults'
import { mergeConfig } from './core/mergeConfig'
import { extend } from './helpers/utils'
import { AxiosRequestConfig, AxiosStatic } from './types'

function createInstance (config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create (config) {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel =  Cancel
axios.isCancel = isCancel

export default axios
