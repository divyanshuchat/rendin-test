export interface TenantProfileInfo {
  about?: string;
  location?: string;
  price?: string;
  rooms: {
    min?: string;
    max?: string;
  };
}
