import apiClient from "./api-client"
import { RESOURCES_PREFIX } from "./my-profile/model/use-my-profile-state";

export const getResourceURLById = (resourceId) => {
    console.log(resourceId);
    return resourceId ? RESOURCES_PREFIX + resourceId : null;
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

export const logout = async (postId) => {
    return await apiClient.get("/users/auth/logout");
}

export const me = async () => {
    const response = await apiClient.get("/users/profile");
    return response;
}

export const forgotPassword = (email) => {
    return apiClient.post("/users/auth/forgot-password", {}, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            email: email
        }
    });
}

export const resetPassword = (token, newPassword) => {
    return apiClient.patch("/users/auth/reset-password", {}, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            token: token,
            newPassword: newPassword
        }
    })
}

export const editSkill = (userId, skillName, skillDescription, skillLevel, skillId, achievements) => {
    const formData = new FormData();
    achievements.forEach(achievement => formData.append("achievements", achievement));
    return apiClient.put(`/skills/${skillId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        params: {
            userId,
            name: skillName,
            description: skillDescription,
            level: skillLevel
        }
    })
}

export const getSkillsByUserId = (userId) => {
    return apiClient.get("/skills", {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            userId
        }
    })
}

export const downloadResource = async (resourceId) => {
    try {
      // Fetch the file from the backend
      const response = await fetch(
        `http://localhost:8080/api/resources/${resourceId}`,
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      // Try extracting filename from Content-Disposition header
      const disposition = response.headers.get("Content-Disposition");
      console.log(decodeURIComponent(disposition));
      let fileName = `resource_${resourceId}.bin`; // Default filename

      if (disposition && disposition.includes("filename=")) {
        fileName = decodeURIComponent(disposition.split("filename=")[1]).replace(/['"]/g, "");
      }

      console.log("filename is " + fileName);

      const blob = await response.blob(); // Convert response to Blob
      console.log(blob);
      console.log(new File([blob], fileName, { type: blob.type }));
      return new File([blob], fileName, { type: blob.type }); // Create a File object
    } catch (error) {
      console.error("Error downloading resource:", error);
      return null;
    }
  }