import { CountrySelector } from "../common/country-selector";
import { Select } from "../common/select";
import { UserInfoField } from "./ui/user-info-field";
import { UserInfoFormField } from "./ui/user-info-form-field";

export function UserInfoFields({
  editableUserInfo,
  userInfoFieldErrors,
  handleUserInfoChange,
  genderLabels,
  genderValues,
  userInfo,
}) {
  return [
    <UserInfoField
      labelInfo="Full Name"
      field={
        <UserInfoFormField
          onChange={(e) => handleUserInfoChange("fullName", e.target.value)}
          placeholder="Your Full Name"
          value={editableUserInfo.fullName}
        />
      }
      errorText={userInfoFieldErrors.fullNameErrorMessage}
    />,
    <UserInfoField
      labelInfo="Nickname"
      errorText={userInfoFieldErrors.nicknameErrorMessage}
      field={
        <UserInfoFormField
          placeholder="Your nickname"
          value={editableUserInfo.nickname}
          onChange={(e) => handleUserInfoChange("nickname", e.target.value)}
        />
      }
    />,
    <UserInfoField
      labelInfo="Gender"
      errorText={userInfoFieldErrors.genderErrorMessage}
      field={
        <Select
          labels={genderLabels}
          values={genderValues}
          value={editableUserInfo.gender}
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 pr-4 py-4 border border-black/10 rounded-[7px] cursor-pointer focus:outline-none"
          onSelect={(value) => handleUserInfoChange("gender", value)}
        />
      }
    />,
    <UserInfoField
      labelInfo="Country"
      errorText={userInfoFieldErrors.countryErrorMessage}
      field={
        <CountrySelector
          selectedCountry={editableUserInfo.country}
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 pr-4 py-4 border border-black/10 rounded-[7px] cursor-pointer focus:outline-none"
          selectCountry={(value) => handleUserInfoChange("country", value)}
        />
      }
    />,
    <UserInfoField
      labelInfo="City"
      errorText={userInfoFieldErrors.cityErrorMessage}
      field={
        <UserInfoFormField
          placeholder="Your city"
          value={editableUserInfo.city}
          onChange={(e) => handleUserInfoChange("city", e.target.value)}
        />
      }
    />,
  ];
}
