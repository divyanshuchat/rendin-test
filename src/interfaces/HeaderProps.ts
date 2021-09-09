import { UserInfoProps } from "./UserInfo";

export interface HeaderProps {
  userInfo?: UserInfoProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
