import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group : 'Mi portal',
      separator : true,
      items : [
        {
          icon: 'assets/icons/figma-ui/date.svg',
          label: 'Consultas',
          route: '/doctor/schedules',
        },
        // {
        //   icon: 'assets/icons/figma-ui/user.svg',
        //   label: 'Asegurados',
        //   route: '/patient/patients',
        // },

      ]
    },


  ];
}
