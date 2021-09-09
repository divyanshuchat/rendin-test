import _ from "lodash";
import { AppartmentsListing } from "./ApartmentsListing";

export const AppliedAppartmentsListing = (props: any) => {
  const { userInfo } = props;
  if (userInfo.appliedAppartments) {
    return <AppartmentsListing appartments={_.values(userInfo.appliedAppartments)} applied={true}/>;
  } else return <p className="italic text-sm text-gray-500 p-4">You haven't applied to any apartment yet.</p>;
};
