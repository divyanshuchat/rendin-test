export interface ApartmentCardProps {
  favourite?: boolean;
  apply?: any;
  addToFav?: any;
  applied?: boolean; 
  apartment: {
    id: number;
    address?: string | undefined;
    image?: string | undefined;
    rendin?: boolean | undefined;
    price?: string | undefined;
    size?: string | undefined;
    rooms?: number | undefined;
    adLink: string;
    applyDate?: string
  };
}