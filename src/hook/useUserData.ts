import { useUserStore } from '@store/user/user.store';

export const useUserData = () => {
  const { user, ...rest } = useUserStore();

  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : '';
  const initials = user ?
    `${user.first_name?.charAt(0)?.toUpperCase() || ''}${user.last_name?.charAt(0)?.toUpperCase() || ''}` : '';

  return {
    user,
    fullName,
    initials,
    ...rest
  };
};