import { ApartmentProps } from "../../interfaces/ApartmentProps";
import { AppartmentsCard } from "../ApartmentCard/ApartmentCard";
import AppartmentController from "../../controllers/Appartment/AppartmentController";
import moment from "moment";
import AuthController from "../../controllers/Authentication/AuthController";
import { useContext } from "react";
import { Context } from "../../store/Store";

export const AppartmentsListing = (props: { appartments: any; apply?: any; userInfo?: any, applied?: boolean, favourite?:boolean }) => {
  const { appartments, userInfo } = props;
  const { dispatch } = useContext(Context);

  const apply = async (data: any) => {
    const apartmentData = {
      ...data,
      applyDate: moment().format(),
    };
    await AppartmentController.addApplyApartment(userInfo, apartmentData);
    refreshUserInfo();
  };

  const addToFav = async (data: any) => {
    const apartmentData = {
      ...data,
      addedDate: moment().format(),
    };
    await AppartmentController.addFavApartment(userInfo, apartmentData);
    refreshUserInfo();
  };

  const refreshUserInfo = async () => {
    const userData: any = await AuthController.getUserInfo(userInfo.userId);
    dispatch({ type: "userInfo", userInfo: userData.user });
    dispatch({ type: "isLoggedIn", isLoggedIn: true });
  };

  return (
    <div className="pt-4 grid grid-cols-12 gap-x-4 gap-y-6">
      {appartments &&
        appartments.length &&
        appartments.map((apartment: ApartmentProps, index: number) => (
          <AppartmentsCard key={index} apartment={apartment} apply={apply} addToFav={addToFav} applied={props.applied} favourite={props.favourite}/>
        ))}
    </div>
  );
};
