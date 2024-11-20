import { UserRole } from 'src/modules/users/entities/user.entity';

export const MENU_FRONTEND = [
  {
    role: UserRole.OFFICER,
    menu: [
      { label: 'Propietarios', icon: 'person', routerLink: 'owners' },
      { label: 'Mascotas', icon: 'pets', routerLink: 'pets' },
    ],
  },
  {
    role: UserRole.ADMIN,
    menu: [{ label: 'Usuarios', icon: 'group', routerLink: 'users' }],
  },
] as const;
