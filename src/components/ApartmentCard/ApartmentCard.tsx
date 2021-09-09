import { ApartmentCardProps } from "../../interfaces/ApartmentCardProps";

export const AppartmentsCard = (props: ApartmentCardProps) => {
  const { apartment }: ApartmentCardProps = props;

  const getHostname = (url: string) => {
    return new URL(url).hostname;
  };

  return (
    <div className="rounded-lg relative overflow-hidden shadow-lg col-span-12 md:col-span-6 lg:col-span-4 bg-white">
      <img className="object-cover h-40 w-full" src={apartment.image} alt="aptimage" />
      {apartment.rendin ? (
        <img
          className="absolute top-1 right-1 h-6 rounded-md"
          src="https://rendin.ee/_nuxt/img/rendin-icon-square.652607d.jpg"
          alt="rendin"
        />
      ) : null}
      <div className="px-2 pt-4">
        <div className="font-bold text-lg">{apartment.address}</div>
      </div>
      <div className="px-2 py-2 grid grid-cols-12">
        <div className="col-span-3">
          <span className="text-xs">PRICE</span>
          <p className="font-bold text-sm">{apartment.price}€</p>
        </div>
        <div className="col-span-3">
          <span className="text-xs">SIZE</span>
          <p className="font-bold text-sm">
            {apartment?.size} m<sup>2</sup>
          </p>
        </div>
        <div className="col-span-3">
          <span className="text-xs">ROOMS</span>
          <p className="font-bold text-sm">{apartment.rooms}</p>
        </div>
        <div className="col-span-3">
          <span className="text-xs">DEPOSIT FREE</span>
          <p className="font-bold text-sm">{apartment.rendin ? "Yes" : "Ask Agent"}</p>
        </div>
      </div>
      <div className="mb-12 underline">
        <a href={apartment.adLink} className="px-2 mb-4 underline text-xs" target="_blank" rel="noreferrer">
          View apartment on {getHostname(apartment.adLink)}
        </a>
      </div>

      <div className="grid grid-cols-2 items-center w-full absolute bottom-0">
        <div
          className="col-span-1 bg-rendin text-white border border-rendin text-center py-1 font-bold cursor-pointer"
          onClick={() => props.apply(apartment)}
        >
          {props.applied ? "APPLIED" : "APPLY"}
        </div>
        <div
          className={`col-span-1 text-center py-1  border ${
            props.favourite && "bg-rendin border-rendin text-white"
          } font-bold cursor-pointer`}
          onClick={() => props.addToFav(apartment)}
        >
          {props.favourite ? "FAVOURITED" : "FAVOURITE"}
        </div>
      </div>
    </div>
  );
};
