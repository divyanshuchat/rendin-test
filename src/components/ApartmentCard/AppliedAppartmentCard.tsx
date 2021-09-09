import moment from "moment";
import { ApartmentCardProps } from "../../interfaces/ApartmentCardProps";

export const AppliedAppartmentsCard = (props: ApartmentCardProps) => {
    const {apartment} : ApartmentCardProps = props;
return ( <div className="border bg-white p-2">
<p className="font-bold text-sm py-2">{apartment.address}</p>
<div className="grid grid-cols-12 items-center">
  <p className="pt-2 text-sm font-bold col-span-2">
    <span className="text-xs font-light">PRICE</span>
    <br />
    {apartment.price}€
  </p>
  <p className="pt-2 text-sm font-bold col-span-2">
    <span className="text-xs font-light">SIZE</span>
    <br />
    {apartment.size}
  </p>
  <p className="pt-2 text-sm font-bold col-span-2">
    <span className="text-xs font-light">ROOMS</span>
    <br />
    {apartment.rooms}
  </p>
  <p className="pt-2 text-sm font-bold col-span-3">
    <span className="text-xs font-light">APPLIED AT</span>
    <br />
    {`${moment().diff(apartment.applyDate, "days")} days ago`}
  </p>
  <p className="pt-2 text-sm font-bold col-span-2">
    <span className="text-xs font-light">STATUS</span>
    <br />
    Waiting
  </p>
</div>
</div>)
}