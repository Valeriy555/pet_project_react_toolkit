import {axiosService} from "./axios.service";
import {urls} from "../configs";

const containerService = {
    getAll: () => axiosService.get(urls.containers),
    create: (container) => axiosService.post(urls.containers, container),
    updateById: (_id, newContainer) => axiosService.put(`${urls.containers}/${_id}`, newContainer),
    updateStageById: (_id, newStage) => axiosService.put(`${urls.containers}/${_id}/stage`, {stage: newStage}),
    deleteById: (_id) => axiosService.delete(`${urls.containers}/${_id}`),

}

export {containerService}
