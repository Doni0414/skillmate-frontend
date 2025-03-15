import { useEffect, useRef, useState } from "react";
import apiClient from "../api-client";

export const RESOURCES_PREFIX = "http://localhost:8080/api/resources/";

export function useMyProfileState() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const imageInputRef = useRef(null);

    const [userInfo, setUserInfo] = useState();
    const [editableUserInfo, setEditableUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        apiClient.get("/users/profile")
    .then(response => {
        setUserInfo(response.data);
        setEditableUserInfo(response.data);
        return apiClient.get("/skills?userId=" + response.data.id)
        .then(response => {
            setUserInfo(lastUserInfo => ({
                    ...lastUserInfo,
                    skills: response.data
            }));
            setEditableUserInfo(lastEditableUserInfo => ({
                ...lastEditableUserInfo,
                skills: response.data
            }))
        setIsLoading(false);

        });
    })
    .catch(error => {
        console.log("error while obtaining skills list of user", error);
    })
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            apiClient.patch("/users/profile/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                setUserInfo(lastUserInfo => ({
                    ...lastUserInfo,
                    "imageResourceId": response.data.imageResourceId
                }));
            }).catch(error => {
                console.log("Error while updating profile image", error);
            })
        }
    }

    const [userInfoFieldErrors, setUserInfoFieldErrors] = useState({
    });

    const handleUserInfoChange = (field, value) => {
        console.log(userInfo)
        setEditableUserInfo(lastUserInfo => ({
            ...lastUserInfo,
            [field]: value
        }));
    }

    const handleClickOnEditButton = () => {
        apiClient.put("/users/profile", {
            ...editableUserInfo,
            gender: editableUserInfo.gender ? editableUserInfo.gender : "MALE"
        })
        .then(response => {
            setSuccessMessage("Successful edit");
            setShowSuccessMessage(true);
            setUserInfoFieldErrors({});

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            setUserInfo(lastUserInfo => ({
                ...lastUserInfo,
                ...response.data
            }));
            setEditableUserInfo(lastEditableUserInfo => ({
                ...lastEditableUserInfo,
                ...response.data
            }));
        }).catch(error => {
            setUserInfoFieldErrors({
                fullNameErrorMessage: error.response.data.fullName,
                nicknameErrorMessage: error.response.data.nickname,
                cityErrorMessage: error.response.data.city
            });
        })
    }

    // "add skill" popup state and handlers
    const addAchievementInputRef = useRef(null);
    const [addSkillForm, setAddSkillForm] = useState({
        name: "",
        description: "",
        level: "BEGINNER",
        achievements: []
    });
    const [addSkillFormErrors, setAddSkillFormErrors] = useState({

    });
    const [isAddSkillPopupOpen, setIsAddSkillPopupOpen] = useState(false);

    const [achievementFiles, setAchievementFiles] = useState([]);

    const handleClickOnAddSkillButton = () => {
        setIsAddSkillPopupOpen(true);
    };

    const handleChangeOfAddSkillForm = (field, value) => {
        setAddSkillForm(lastAddSkillForm => ({
            ...lastAddSkillForm,
            [field]: value
        }))
    }

    const handleClickOnSaveButtonInAddSkillPopup = (e) => {
        e.preventDefault();
        console.log(addSkillForm);
        console.log(achievementFiles);

        const formData = new FormData();
        achievementFiles.forEach(file => formData.append("achievements", file))

        apiClient.post(`/skills?userId=${userInfo.id}&name=${addSkillForm.name}&description=${addSkillForm.description}&level=${addSkillForm.level}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setUserInfo(lastUserInfo => {
                lastUserInfo.skills.push(response.data);
                return {
                    ...lastUserInfo,
                    skills: lastUserInfo.skills.slice()
                }
            })
            setAddSkillForm({
                name: "",
                description: "",
                level: "BEGINNER",
                achievements: []
            });
            setAchievementFiles([]);
            closeAddSkillPopup();
        }).catch(error => {
            console.log(error);
            setAddSkillFormErrors(error.response.data);
        })
    }

    const handleClickOnAttachAchievementsButtonInAddSkillForm = (e) => {
        e.preventDefault();
        addAchievementInputRef.current.click();
    } 

    const fileToAchievement = (file) => {
        if (file) {
            return {
                fileName: file.name ? file.name : "File",
                size: file.size ? (file.size / (1024 * 1024)).toFixed(2) + "MB" : ""
            }
        }
    }

    const handleAddAchievementInputRefOnChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const achievement = fileToAchievement(file);
            setAchievementFiles(lastAchievementFiles => {
                lastAchievementFiles.push(file);
                return lastAchievementFiles.slice();
            });
            setAddSkillForm(lastAddSkillForm => {
                lastAddSkillForm.achievements.push(achievement);
                return {
                ...lastAddSkillForm,
                achievements: lastAddSkillForm.achievements.slice()
            }
        })
        }
    }

    const deleteAchievementInAddSkillPopup = (e, index) => {
        e.preventDefault();
        setAchievementFiles(lastAchievementFiles => {
            return lastAchievementFiles.filter((achievementFile, i) => i !== index);
        });
        setAddSkillForm(lastAddSkillForm => ({
            ...lastAddSkillForm,
            achievements: lastAddSkillForm.achievements.filter((achievement, i) => i !== index)
        }))
    }
 
    const closeAddSkillPopup = () => {
        setIsAddSkillPopupOpen(false);
    }

    // view skill handler
    const [skillOnView, setSkillOnView] = useState();
    const handleClickOnViewSkillButton = (skill) => {
        setSkillOnView(skill);
    }

    const closeViewSkill = () => {
        setSkillOnView(null);
    }

    // edit skill handler
    const [skillOnEdit, setSkillOnEdit] = useState();
    const handleClickOnEditSkillButton = (skill) => {
        setSkillOnEdit(skill);
    }

    const closeEditSkill = () => {
        setSkillOnEdit(null);
    }

    const handleSkillOnEditFieldChange = (field, value) => {
        setSkillOnEdit(lastSkillOnEdit => ({
            ...lastSkillOnEdit,
            [field]: value
        }));
    }

    console.log(userInfo);

    async function downloadResource(resourceId) {
        try {
            // Fetch the file from the backend
            const response = await fetch(`http://localhost:8080/api/resources/${resourceId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            // Try extracting filename from Content-Disposition header
            const disposition = response.headers.get("Content-Disposition");
            let fileName = `resource_${resourceId}.bin`; // Default filename
    
            if (disposition && disposition.includes("filename=")) {
                fileName = disposition.split("filename=")[1].replace(/['"]/g, "");
            }
    
            const blob = await response.blob(); // Convert response to Blob
            return new File([blob], fileName, { type: blob.type }); // Create a File object
        } catch (error) {
            console.error("Error downloading resource:", error);
            return null;
        }
    }    

    const handleClickOnDeleteSkillButton = (skillId) => {
        apiClient.delete("/skills/" + skillId)
        .then(response => {
            setUserInfo(lastUserInfo => ({
                ...lastUserInfo,
                skills: lastUserInfo.skills.filter(skill => skill.id !== skillId)
            }))
        }).catch(error => {
            console.log("Error while deleting skill", error);
        });
    }

    return {
        addSkillForm,
        addSkillFormErrors,
        addAchievementInputRef,
        downloadResource,
        fileToAchievement,
        handleChangeOfAddSkillForm,
        handleClickOnAttachAchievementsButtonInAddSkillForm,
        handleAddAchievementInputRefOnChange,
        handleClickOnSaveButtonInAddSkillPopup,
        deleteAchievementInAddSkillPopup,
        showSuccessMessage,
        successMessage,
        isLoading,
        imageInputRef,
        userInfo,
        editableUserInfo,
        handleClickOnEditButton,
        userInfoFieldErrors,
        handleUserInfoChange,
        handleImageChange,
        isAddSkillPopupOpen,
        handleClickOnAddSkillButton,
        closeAddSkillPopup,
        skillOnView,
        handleClickOnViewSkillButton,
        closeViewSkill,
        skillOnEdit,
        handleClickOnEditSkillButton,
        handleSkillOnEditFieldChange,
        closeEditSkill,
        handleClickOnDeleteSkillButton
    }
}

// {
//     fullName: "Agabek Nurdaulet",
//     email: "nurdauletagabek2@gmail.com",
//     gender: "Male",
//     country: "Kazakhstan",
//     skills: [
//         {
//             id: 1,
//             name: "English",
//             description: "I am an English teacher with 8 years of experience. I help students of all levels master the language easily and effectively, whether it's exam preparation, improving conversational skills, or overcoming the language barrier.",
//             level: "High",
//             achievements: [
//                 {
//                     id: 1,
//                     fileName: "Document example.doc",
//                     size: "5.7MB"
//                 },
//                 {
//                     id: 2,
//                     fileName: "Picture.png",
//                     size: "5.7MB"
//                 },
//                 {
//                     id: 3,
//                     fileName: "Resume.pdf",
//                     size: "3.9MB"
//                 }
//             ]
//         },
//         {
//             id: 2,
//             name: "Java programming",
//             description: "Description 2",
//             level: "Medium"
//         }
//     ]
// }