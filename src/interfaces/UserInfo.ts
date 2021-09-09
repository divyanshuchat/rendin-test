import { TenantProfileInfo } from "./TenantProfileInfo";

export interface UserInfoProps {
  name?: string;
  userImage?: string;
  tenantProfile: TenantProfileInfo
}
