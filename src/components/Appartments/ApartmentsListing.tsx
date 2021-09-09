import { ApartmentProps } from "../../interfaces/ApartmentProps";
import { AppartmentsCard } from "../ApartmentCard/ApartmentCard";
import AppartmentController from "../../controllers/Appartment/AppartmentController";
import moment from "moment";
import AuthController from "../../controllers/Authentication/AuthController";
import { useContext, useState } from "react";
import { Context } from "../../store/Store";
import { ApplyDialog } from "../ApplyDialog/ApplyDialog";
import { AuthUserInfoProps } from "../../interfaces/AuthUserInfoProps";

export const AppartmentsListing = (props: {
  appartments: any;
  apply?: any;
  userInfo?: any;
  applied?: boolean;
  favourite?: boolean;
}) => {
  const { appartments, userInfo } = props;
  const { dispatch } = useContext(Context);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [tempApplyData, setTempApplyData] = useState<ApartmentProps>();

  const apply = async (data: ApartmentProps) => {
    setShowApplyDialog(true);
    setTempApplyData(data);
  };

  const applyConfirm = async (data: ApartmentProps) => {
    setShowApplyDialog(false);
    await AppartmentController.addApplyApartment(userInfo, data);
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
    const userData: AuthUserInfoProps = await AuthController.getUserInfo(userInfo.userId);
    dispatch({ type: "userInfo", userInfo: userData.user });
    dispatch({ type: "isLoggedIn", isLoggedIn: true });
  };

  return (
    <>
    <div className="pt-4 grid grid-cols-12 gap-x-4 gap-y-6">
      {appartments &&
        appartments.length &&
        appartments.map((apartment: ApartmentProps, index: number) => (
          <AppartmentsCard
            key={index}
            apartment={apartment}
            apply={apply}
            addToFav={addToFav}
            applied={props.applied}
            favourite={props.favourite}
          />
        ))}
        
    </div>
    {showApplyDialog && <ApplyDialog applyConfirm={applyConfirm} appartmentData={tempApplyData} closeModal={setShowApplyDialog}/>}
    </>
  );
};
