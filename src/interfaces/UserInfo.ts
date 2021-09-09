import { ApartmentProps } from "./ApartmentProps";
import { TenantProfileInfo } from "./TenantProfileInfo";

export interface UserInfoProps {
  favAppartments?: ApartmentProps;
  appliedAppartments?: ApartmentProps;
  name?: string;
  userImage?: string;
  tenantProfile: TenantProfileInfo
}
