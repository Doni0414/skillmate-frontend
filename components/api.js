import apiClient from "./api-client"
import { RESOURCES_PREFIX } from "./my-profile/use-my-profile-state";

export const getResourceURLById = (resourceId) => {
    return RESOURCES_PREFIX + resourceId;
}
export const getUserById = async (userId) => {
    const data = await apiClient.get("/users/profile/" + userId);
    return data;
}

export const getPublicationsByCategoriesAndUserIdAndPageAndPageSize = async (categories, userId, page, pageSize) => {
    const data = await apiClient.get("/posts", {
        params: {
            categories: categories,
            userId: userId,
            page: page,
            size: pageSize
        },
        paramsSerializer: {
            indexes: null
        }
    })
    return data;
}