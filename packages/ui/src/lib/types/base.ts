type TUser = {
  about: string | null;
  address: string | null;
  bio: string | null;
  city: string | null;
  clerk_user_id: string | null;
  country: string | null;
  created_at: string;
  department_id: string | null;
  email: string;
  employee_id: string | null;
  first_name: string | null;
  gender: string | null;
  hire_date: string | null;
  id: string;
  is_invite_pending: boolean;
  is_manager: boolean;
  last_name: string | null;
  managed_by: string | null;
  organization_id: string | null;
  password_updated_at: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  start_date: string | null;
  timezone: string | null;
  title: string | null;
  updated_at: string;
  user_id: string | null;
  username: string | null;
  user_profiles?: {
    id: string;
    username: string;
    profile_picture_url?: string;
  };
};

export type { TUser };
