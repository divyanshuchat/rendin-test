import { useContext, useRef, useState } from "react";
import Button from "../../elements/Button/Button";
import Input from "../../elements/Input/Input";
import NoInfo from "../../elements/NoInfo/NoInfo";
import { Context } from "../../store/Store";

import { TenantProfileInfo } from "../../interfaces/TenantProfileInfo";
import TenantProfileController from "../../controllers/TenantProfile/TenantProfileController";
import AuthController from "../../controllers/Authentication/AuthController";
import UserProfileController from "../../controllers/UserProfile/UserProfileController";
import { AuthUserInfoProps } from "../../interfaces/AuthUserInfoProps";

const TenantProfile = () => {
  const { state } = useContext(Context);
  const { userInfo } = state;
  const [isEditMode, setIsEditMode] = useState<Boolean>(false);
  const { dispatch } = useContext(Context);

  const [userProfileData, setUserProfileData] = useState<TenantProfileInfo>(
    userInfo?.tenantProfile ? userInfo?.tenantProfile : []
  );

  const updateProfile = async () => {
    await TenantProfileController.updateTenantProfile(userInfo.userId, userProfileData);
    setIsEditMode(!isEditMode);
    refetchTenantProfileInfo();
  };

  const cancelEditing = () => {
    setIsEditMode(!isEditMode);
    refetchTenantProfileInfo();
  };

  const refetchTenantProfileInfo = async () => {
    const profile = await TenantProfileController.getTenantProfile(userInfo.userId);
    setUserProfileData(profile);
    refreshUserInfo();
  };

  const refreshUserInfo = async () => {
    const userData: AuthUserInfoProps = await AuthController.getUserInfo(userInfo.userId);
    dispatch({ type: "userInfo", userInfo: userData.user });
    dispatch({ type: "isLoggedIn", isLoggedIn: true });
  };

  const imageref: any = useRef(null);

  const handleClick = () => {
    if (imageref) {
      imageref.current.click();
    }
  };

  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0];
    if (image == null) return;
    else handleFireBaseUpload(image);
  };

  const handleFireBaseUpload = async (image: any) => {
    await UserProfileController.updateTenantPicture(userInfo.userId, image);
    await refreshUserInfo();
  };

  return state.userInfo ? (
    <div className="block mx-auto max-w-xl py-8 px-4">
      <div className="relative w-36" onClick={() => handleClick()}>
        <img src={userInfo.userImage} alt="userimage" className="h-36 rounded-full" />
        <form>
          <input ref={imageref} type="file" onChange={handleImageAsFile} hidden accept=".jpg, .jpeg" />
        </form>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 absolute bottom-3 right-2 text-rendin"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-2xl font-bold pt-4">{userInfo.name}</p>
      <p className="text-sm text-rendin">{userInfo.email}</p>
      <div className="py-4">
        <section>
          <p className="text-sm">About</p>
          <p>{!isEditMode && (userProfileData?.about ? userProfileData?.about : !isEditMode && <NoInfo />)}</p>
          {isEditMode && (
            <Input
              type="text"
              placeHolder="Write in one line or two about what you are looking for"
              value={userProfileData?.about}
              onChange={(e) =>
                setUserProfileData((prevState) => ({
                  ...prevState,
                  about: e.target.value,
                }))
              }
            />
          )}
        </section>

        <section>
          <p className="text-sm pt-3">Location</p>
          <p>{!isEditMode && (userProfileData.location ? userProfileData?.location : !isEditMode && <NoInfo />)}</p>
          {isEditMode && (
            <Input
              type="text"
              placeHolder="Where are you located?"
              value={userProfileData?.location}
              onChange={(e) =>
                setUserProfileData((prevState) => ({
                  ...prevState,
                  location: e.target.value,
                }))
              }
            />
          )}
        </section>

        <section>
          <p className="text-sm pt-3">Rooms</p>
          <p>
            {!isEditMode && (userProfileData?.rooms?.min ? userProfileData?.rooms?.min : <NoInfo />)}
            {!isEditMode && `${userProfileData?.rooms?.max ? "- " + userProfileData?.rooms?.max : ""}`}
          </p>
          {isEditMode && (
            <div className="flex items-center">
              <Input
                type="number"
                placeHolder="min"
                value={userProfileData?.rooms?.min}
                onChange={(e) =>
                  setUserProfileData((prevState) => ({
                    ...prevState,
                    rooms: { min: e.target.value, max: userProfileData?.rooms?.max },
                  }))
                }
              />
              <Input
                type="number"
                placeHolder="max"
                value={userProfileData?.rooms?.max}
                onChange={(e) =>
                  setUserProfileData((prevState) => ({
                    ...prevState,
                    rooms: { min: userProfileData?.rooms?.min, max: e.target.value },
                  }))
                }
              />
            </div>
          )}
        </section>

        <section>
          <p className="text-sm pt-3">Price</p>
          <p>{!isEditMode && (userProfileData?.price ? `€${userProfileData?.price}` : !isEditMode && <NoInfo />)}</p>
          {isEditMode && (
            <Input
              type="text"
              placeHolder="What's your budget?"
              value={userProfileData?.price}
              onChange={(e) =>
                setUserProfileData((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
            />
          )}
        </section>

        <Button
          isHalf={true}
          label={isEditMode ? "Update Info" : "Edit Info"}
          className="mt-6"
          onClick={() => (isEditMode ? updateProfile() : setIsEditMode(!isEditMode))}
        />
        {isEditMode && <Button isHalf={true} label={"Cancel"} className="mt-6 ml-4" onClick={() => cancelEditing()} />}
      </div>
    </div>
  ) : (
    <div className="text-center">No user information availabe</div>
  );
};

export default TenantProfile;
