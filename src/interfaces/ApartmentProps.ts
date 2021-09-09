export interface ApartmentProps {
  id: number;
  address?: string | undefined;
  image?: string | undefined;
  rendin?: boolean | undefined;
  price?: string | undefined;
  size?: string | undefined;
  rooms?: number | undefined;
  adLink: string;
}
