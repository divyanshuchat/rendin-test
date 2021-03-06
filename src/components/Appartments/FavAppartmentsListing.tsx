import _ from "lodash";
import { UserInfoProps } from "../../interfaces/UserInfo";
import { AppartmentsListing } from "./ApartmentsListing";

export const FavAppartmentsListing = (props: { userInfo: UserInfoProps; }) => {
  const { userInfo } = props;
  if (userInfo.favAppartments) {
    return <AppartmentsListing appartments={_.values(userInfo.favAppartments)} favourite={true} />;
  } else return <p className="italic text-sm text-gray-500 p-4">You haven't favourited any apartment yet.</p>;
};
