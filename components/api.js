import apiClient from "./api-client"
import { RESOURCES_PREFIX } from "./my-profile/use-my-profile-state";

export const getResourceURLById = (resourceId) => {
    return RESOURCES_PREFIX + resourceId;
}
export const getUserById = async (userId) => {
    const response = await apiClient.get("/users/profile/" + userId);
    return response;
}

export const getPublicationsByCategoriesAndUserIdAndPageAndPageSize = async (categories, userId, page, pageSize) => {
    const response = await apiClient.get("/posts", {
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
    return response;
}

export const getLikesCountByPostId = async (postId) => {
    const response = await apiClient.get(`/posts/${postId}/likes`)
    return response;
}

export const getCommentsByPostId = async (postId) => {
    const response = await apiClient.get(`/posts/${postId}/comments`);
    return response.data;
}

export const getCommentsCountByPostId = async (postId) => {
    const comments = await getCommentsByPostId(postId)
    return comments.length;
}