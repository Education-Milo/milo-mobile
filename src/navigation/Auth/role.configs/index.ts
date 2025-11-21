import { UserRole } from '../permissions.config';
import { STUDENT_TAB_SCREENS, STUDENT_STACK_SCREENS } from './student.config';
import { TEACHER_TAB_SCREENS, TEACHER_STACK_SCREENS } from './professor.config';
import { PARENT_TAB_SCREENS, PARENT_STACK_SCREENS } from './parent.config';
import { ADMIN_TAB_SCREENS, ADMIN_STACK_SCREENS } from './admin.config';

export const ROLE_NAVIGATION_CONFIG = {
  [UserRole.STUDENT]: {
    tabs: STUDENT_TAB_SCREENS,
    stackScreens: STUDENT_STACK_SCREENS,
  },
  [UserRole.TEACHER]: {
    tabs: TEACHER_TAB_SCREENS,
    stackScreens: TEACHER_STACK_SCREENS,
  },
  [UserRole.PARENT]: {
    tabs: PARENT_TAB_SCREENS,
    stackScreens: PARENT_STACK_SCREENS,
  },
  [UserRole.ADMIN]: {
    tabs: ADMIN_TAB_SCREENS,
    stackScreens: ADMIN_STACK_SCREENS,
  },
};

export const getNavigationConfigForRole = (role?: UserRole | null) => {
    if (!role || !ROLE_NAVIGATION_CONFIG[role]) {
      return ROLE_NAVIGATION_CONFIG[UserRole.STUDENT];
    }
    return ROLE_NAVIGATION_CONFIG[role];
  };