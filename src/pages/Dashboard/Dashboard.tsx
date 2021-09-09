import { Tab } from "@headlessui/react";
import { useContext } from "react";
import { TenantProfile } from "../../components/TenantProfile/TenantProfile";
import { Context } from "../../store/Store";
import AppartmentController from "../../controllers/Appartment/AppartmentController";
import { FavAppartmentsListing } from "../../components/Appartments/FavAppartmentsListing";
import { AppliedAppartmentsListing } from "../../components/Appartments/AppliedAppartmentsListing";
import { SuggestedApartmentsListing } from "../../components/Appartments/SuggestedApartmentsListing";
import _ from "lodash";
import { AppliedAppartmentsCard } from "../../components/ApartmentCard/AppliedAppartmentCard";

const Dashboard = () => {
  const { state } = useContext(Context);
  const tabs = ["Suggested Apartments", "Your favourites", "Applied"];
  const appartments = AppartmentController.getAllAppartments();
  const appliedAppartments = state?.userInfo?.appliedAppartments && _.values(state.userInfo.appliedAppartments);

  return (
    <div className="px-2 md:px-4 py-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12">
        <section className="col-span-12 sm:col-span-6 lg:col-span-8 p-4">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) => `py-2.5 text-sm leading-5 font-medium text-rendin px-4  rounded-lg
                  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-rendin ring-white ring-opacity-60 
                  ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-rendin"}`}
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <SuggestedApartmentsListing appartments={appartments} userInfo={state.userInfo} />
              </Tab.Panel>
              <Tab.Panel>
                <FavAppartmentsListing appartments={appartments} userInfo={state.userInfo} />
              </Tab.Panel>
              <Tab.Panel>
                <AppliedAppartmentsListing appartments={appartments} userInfo={state.userInfo} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
        <section className="hidden md:block col-span-12 sm:col-span-6 lg:col-span-4 p-4">
          <TenantProfile tenantProfile={state?.userInfo} />
          <div className="py-4">
            <h2>Applied appartments</h2>
            {state.userInfo?.appliedAppartments ? (
              appliedAppartments.map((apartment: any, index: number) => (
                <AppliedAppartmentsCard key={index} apartment={apartment} />
              ))
            ) : (
              <p className="pt-1 text-xs text-gray-600">Not applied to any appartment yet.</p>
            )}
          </div>
          <div className="py-2">
            <h2>Offer received</h2>
            <p className="pt-1 text-xs text-gray-600">Not offers received yet.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
