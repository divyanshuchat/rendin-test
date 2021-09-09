import _ from "lodash";
import { AppartmentsListing } from "./ApartmentsListing";

export const SuggestedApartmentsListing = (props: { userInfo: any; appartments: any }) => {
  const { userInfo, appartments } = props;

  if (userInfo && userInfo.tenantProfile) {
    const filter = {
      price: userInfo?.tenantProfile?.price,
      location: userInfo?.tenantProfile?.location,
      minRoom: userInfo?.tenantProfile?.rooms.min,
      maxRoom: userInfo?.tenantProfile?.rooms.max,
    };

    const filteredAppartments = appartments.filter(
      (obj: { price: number; location: string; rooms: number }) =>
        obj.price <= filter.price &&
        obj.location.toLowerCase() === filter.location.toLowerCase() &&
        obj.rooms >= filter.minRoom &&
        obj.rooms <= filter.maxRoom
    );
    
    const filterAppliedAppartments = filteredAppartments.filter((el: any) => {
      return !_.values(userInfo?.appliedAppartments).find((f: any) => {
        return el.id === f.id;
      });
    });

    return <AppartmentsListing appartments={filterAppliedAppartments} userInfo={userInfo} />;
  } else return <AppartmentsListing appartments={appartments.slice(0, 39)} />;
  //   I suggest we add a infinte scroll to the paginated list of apartments
};
