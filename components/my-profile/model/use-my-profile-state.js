import { useEffect, useRef, useState } from "react";
import apiClient from "../../api-client";
import { validateAddSkillForm } from "./validate-add-skill-form";
import { hasErrors } from "./has-errors";
import { fetchAchievementsFiles } from "../../common/achievements/model/fetch-achievement-files";
import { downloadResource, editSkill, getSkillsByUserId } from "../../api";
import { validateEditSkillForm } from "./validate-edit-skill-form";

export const RESOURCES_PREFIX = "http://213.109.146.203:8080/api/resources/";

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
        console.log(field + ": " + value)
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
        
        const errors = validateAddSkillForm(addSkillForm);

        if (hasErrors(errors)) {
            setAddSkillFormErrors(errors);
            return;
        }

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
            setShowSuccessMessage(true);
            setSuccessMessage("Skill has been created!");

            setTimeout(() => {
                setShowSuccessMessage(false);
                setSuccessMessage(null);
                closeAddSkillPopup();
            }, 2_000);
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
        setAddSkillFormErrors({});
        setAddSkillForm({
            name: "",
            description: "",
            level: "BEGINNER",
            achievements: []
        });
        setAchievementFiles([]);
        setIsAddSkillPopupOpen(false);
    }

    // view skill handler
    const addAchievementInputRefInEditPopup = useRef(null);
    const [skillOnView, setSkillOnView] = useState();
    const handleClickOnViewSkillButton = (skill) => {
        setSkillOnView(skill);
    }

    const closeViewSkill = () => {
        setSkillOnView(null);
    }

    // edit skill handler
    const [skillOnEdit, setSkillOnEdit] = useState();
    const [skillOnEditErrors, setSkillOnEditErrors] = useState({
        skillNameError: "",
        skillDescriptionError: ""
    });
    const handleClickOnEditSkillButton = (skill) => {
        fetchAchievementsFiles(downloadResource, skill.achievementIds, (files) => {
            console.log(files);
            setSkillOnEdit((lastSkillOnEdit) => {
                return {
                    ...skill,
                    downloadedAchievementFiles: files,
                    downloadedAchievements: files.map((file, index) => ({
                        id: skill.achievementIds[index],
                        ...fileToAchievement(file)
                    }))
                }
            });
        });
    }

    const closeEditSkill = () => {
        setSkillOnEdit(null);
        setSkillOnEditErrors({
            skillNameError: "",
            skillDescriptionError: ""
        });
    }

    const handleSkillOnEditFieldChange = (field, value) => {
        setSkillOnEdit(lastSkillOnEdit => ({
            ...lastSkillOnEdit,
            [field]: value
        }));
    }

    const handleClickOnAttachAchievementInEditSkillPopup = (e) => {
        e.preventDefault();
        addAchievementInputRefInEditPopup.current.click();
    }

    const handleAddAchievementInputRefInEditPopupOnChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSkillOnEdit((lastSkillOnEdit) => ({
                ...lastSkillOnEdit,
                downloadedAchievementFiles: [...lastSkillOnEdit.downloadedAchievementFiles, file],
                downloadedAchievements: [...lastSkillOnEdit.downloadedAchievements, fileToAchievement(file)]
            }));
        }
    }

    const handleClickOnDeleteAchievementInEditSkillPopup = (e, index) => {
        e.preventDefault();
        setSkillOnEdit((lastSkillOnEdit) => ({
            ...lastSkillOnEdit,
            downloadedAchievementFiles: lastSkillOnEdit.downloadedAchievementFiles.filter((file, i) => i !== index),
            downloadedAchievements: lastSkillOnEdit.downloadedAchievements.filter((achievement, i) => i !== index),
        }))
    }

    const handleClickOnSaveButtonInEditSkillPopup = (e) => {
        e.preventDefault();
        const errors = validateEditSkillForm(skillOnEdit);

        if (hasErrors(errors)) {
            setSkillOnEditErrors(errors);
            return;
        }
        editSkill(userInfo.id, skillOnEdit.name, skillOnEdit.description, skillOnEdit.level, skillOnEdit.id, skillOnEdit.downloadedAchievementFiles)
        .then(response => {

            setSuccessMessage("Skill has been edited successfully!");
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowSuccessMessage(null);
                closeEditSkill();
            }, 3_000);

            return getSkillsByUserId(userInfo.id)
            .then(response => {
                setUserInfo((lastUserInfo) => ({
                    ...lastUserInfo,
                    skills: response.data
                }))
            })
        }).catch(error => {
            console.log(error);
        });
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

    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);

    const handleClickOnChangePasswordButton = () => {
        setIsChangePasswordPopupOpen(true);
    }

    const closeChangePasswordPopup = () => {
        setIsChangePasswordPopupOpen(false);
    }

    const setSkillNameInAddSkillPopup = (skillName) => {
        console.log(skillName);
        setAddSkillForm((lastAddSkillForm) => ({
            ...lastAddSkillForm,
            name: skillName
        }));
    }

    const setSkillNameInEditSkillPopup = (skillName) => {
        console.log(skillName);
        setSkillOnEdit((lastSkillOnEdit) => ({
            ...lastSkillOnEdit,
            name: skillName
        }));
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
        handleClickOnDeleteSkillButton,
        handleAddAchievementInputRefInEditPopupOnChange,
        handleClickOnAttachAchievementInEditSkillPopup,
        addAchievementInputRefInEditPopup,
        handleClickOnSaveButtonInEditSkillPopup,
        skillOnEditErrors,
        handleClickOnDeleteAchievementInEditSkillPopup,
        isChangePasswordPopupOpen,
        handleClickOnChangePasswordButton,
        closeChangePasswordPopup,
        setSkillNameInAddSkillPopup,
        setSkillNameInEditSkillPopup
    }
}