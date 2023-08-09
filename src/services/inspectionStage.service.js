import {axiosService} from "./axios.service";
import {urls} from "../configs";

const inspectionStageService = {
    getAll: () => axiosService.get(urls.stages),
    getById: (_id) => axiosService.get(`${urls.stages}/${_id}`),
}

export {inspectionStageService}