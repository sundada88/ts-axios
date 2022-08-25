import { Axios } from "./core/Axios";
import defaults from "./core/defaults";
import { extend } from "./helpers/utils";
import { AxiosInstance, AxiosRequestConfig } from "./types";

function createInstance(initConfig: AxiosRequestConfig): AxiosInstance{
    const context = new Axios(initConfig)
    const instance = Axios.prototype.request.bind(context)
    extend(instance, context)
    return instance as AxiosInstance
}

const axios = createInstance(defaults)
export default axios