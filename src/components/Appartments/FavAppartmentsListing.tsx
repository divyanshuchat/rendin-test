import _ from "lodash";
import { AppartmentsListing } from "./ApartmentsListing";

export const FavAppartmentsListing = (props: any) => {
  const { userInfo } = props;
  if (userInfo.favAppartments) {
    return <AppartmentsListing appartments={_.values(userInfo.favAppartments)} favourite={true} />;
  } else return <p className="italic text-sm text-gray-500 p-4">You haven't favourited any apartment yet.</p>;
};
