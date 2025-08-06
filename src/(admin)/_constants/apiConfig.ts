import { BACKEND_ADMIN_URL_API } from "../../shared/_constants/envDefaults";

export const adminApiConfig = {
    baseUrl: BACKEND_ADMIN_URL_API,
    endpoints: {
        getAllTodos: '/todos',
        addTodo: '/todos/add',
        toggleTodo: '/todos/toggle',
    }
}