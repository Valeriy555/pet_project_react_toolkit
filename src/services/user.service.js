import {axiosService} from "./axios.service";
import {urls} from "../configs";

const userService = {
    getAll: () => axiosService.get(urls.users),
    create: (users) => axiosService.post(urls.users, users),
    updateById: (_id, newUser) => axiosService.put(`${urls.users}/${_id}`,newUser),
    deleteById: (_id) => axiosService.delete(`${urls.users}/${_id}`)
}

export {userService}