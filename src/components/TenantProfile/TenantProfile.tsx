import { useHistory } from "react-router-dom";
import Button from "../../elements/Button/Button";

export const TenantProfile = (props: any) => {
  const history = useHistory();

  return (
    <div>
      <h2>Tenant Profile</h2>
      {props?.tenantProfile?.tenantProfile ? (
        <section className="border p-4 bg-white">
          <div className="flex items-start">
            <img src={props?.tenantProfile?.userImage} alt="userimage" className="h-16 rounded-full mb-4 mr-2" />
            <p className="text-sm font-bold pt-3">{props?.tenantProfile?.tenantProfile?.about}</p>
          </div>

          <div className="grid grid-cols-3 items-center">
            <div className="col-span-2">
              <p className="text-sm py-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Background Check
              </p>
              <p className="text-sm py-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Move in 17th Jan
              </p>
              <p className="text-sm py-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {props?.tenantProfile?.tenantProfile?.price} € per month
              </p>
              <p className="text-sm py-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {props?.tenantProfile?.tenantProfile?.rooms.min} - {props?.tenantProfile?.tenantProfile?.rooms.max} rooms
              </p>
            </div>
            <div className="col-span-1 px-2">
              <Button label="Edit" onClick={() => history.push("/profile")} className="mt-2" />
              <br />
              <Button label="View" onClick={() => history.push("/profile")} className="mt-2" />
              <br />
              <Button label="Share" onClick={() => history.push("/profile")} className="mt-2" />
              {/* not sure what to do with share */}
            </div>
          </div>
        </section>
      ) : (
        <section className="border p-8 bg-white text-center text-xs mt-4">
          <p className="pb-6">
            No tenant profile created. Create your profile to receive offers and see suggested apartments that match
            your profile.
          </p>
          <Button label="Create tenant profile" isHalf={true} onClick={() => history.push("/profile")} />
        </section>
      )}
    </div>
  );
};
