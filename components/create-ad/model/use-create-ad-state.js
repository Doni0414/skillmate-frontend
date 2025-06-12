import { useEffect, useRef, useState } from "react";
import { createAd, getUserSkillsByUserId } from "../../api";
import { validateFormData } from "./validate-form-data";
import { hasErrors } from "./has-errors";

export function useCreateAdState(user, closePopup) {
    const [formData, setFormData] = useState({
        skillName: "",
        description: "",
      });

      const [formErrors, setFormErrors] = useState({
        skillNameError: null,
        skillDescriptionError: null
      });

      const [adImage, setAdImage] = useState(null);
    
      const handleOnSkillNameSelect = (value) => {
        setFormData((lastFormData) => ({
          ...lastFormData,
          skillName: value,
        }));
      };
    
      const handleDescriptionInput = (value) => {
        setFormData((lastFormData) => ({
          ...lastFormData,
          description: value,
        }));
      };
      const [skills, setSkills] = useState([]);
    
      const skillsValues = skills ? skills.map((skill) => skill.name) : [];
    
      const imageInputRef = useRef(null);
      const handleUploadImageClick = (e) => {
        e.preventDefault();
        imageInputRef.current.click();
      };
    
      const handleImageInputRefOnChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          setAdImage(file);
        }
      };
    
      const [successMessage, setSuccessMessage] = useState(null);

      const [isFailureMessageVisible, setIsFailureMessageVisible] = useState(false);
      const [failureMessage, setFailureMessage] = useState(null);
    
      const handleOnSubmit = (e) => {
        e.preventDefault();

        const errors = validateFormData(formData);
        if (hasErrors(errors)) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({
            skillNameError: null,
            skillDescriptionError: null
          });
        createAd(user.id, formData.skillName, formData.description, adImage)
          .then((response) => {
            setSuccessMessage("Ad was successfully created!");
            setTimeout(() => {
              setSuccessMessage(null);
              closePopup();
            }, 3000);
          })
          .catch((error) => {
            if (error.response.data.errorMessage.startsWith("Ad with skillName")) {
                setIsFailureMessageVisible(true);
                setFailureMessage("You have already created ad with such skill");
                setTimeout(() => {
                    setIsFailureMessageVisible(false);
                    setFailureMessage(null);
                }, 5000);
            } else if (error.response.data.errorMessage.startsWith("createAd.description: size must be between")) {
                setFormErrors((lastFormErrors) => ({
                    ...lastFormErrors,
                    skillDescriptionError: "Description size must not be less than 20 characters",
                }));

            } else {
                console.log("Error while creating ad", error);
            }
          });
      };
    
      useEffect(() => {
        getUserSkillsByUserId(user.id)
          .then((response) => {
            setSkills(response.data);
            setFormData((lastFormData) => ({
              ...lastFormData,
              skillName: response.data[0]?.name,
            }));
          })
          .catch((error) => {
            console.log(
              "Error while obtaining skills list in CreateAdPopup",
              error,
            );
          });
      }, []);

      return {
        formData,
        formErrors,
        handleOnSubmit,
        successMessage,
        isFailureMessageVisible,
        failureMessage,
        skillsValues,
        handleOnSkillNameSelect,
        handleDescriptionInput,
        handleUploadImageClick,
        imageInputRef,
        handleImageInputRefOnChange,
        adImage,
        setAdImage
      }
}