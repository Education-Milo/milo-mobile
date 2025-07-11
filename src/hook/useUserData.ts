import { useUserStore } from '@store/user/user.store';

export const useUserData = () => {
  const { user, ...rest } = useUserStore();

  const fullName = user ? `${user.prenom} ${user.nom}`.trim() : '';
  const initials = user ?
    `${user.prenom?.charAt(0)?.toUpperCase() || ''}${user.nom?.charAt(0)?.toUpperCase() || ''}` : '';

  return {
    user,
    fullName,
    initials,
    ...rest
  };
};