import Axios from './core/axios'
import defaults from './core/defaults'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance (config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
