/*
 * pages.js
 * @copyright Boa 2021
 * @author Favio Figueroa
 */

import { lazy } from 'react';

const pages = {};

pages.WEB__Home = {
  path: '/boleto',
  // component: lazy(() => import('./views/SearchF')),
  component: lazy(() =>
    //import('../_examples/components/form/AutoCompleteTriggerComponent'),
    //import('../_examples/components/form/ExampleTextFieldSelect'),
    import('./views/ticket/Ticket'),
  ),

  /*detailPages: [
    {
      path: '/:id',
      component: lazy(() => import('./views/ProfilePage')),
    },
  ],*/
};


/******************************************************/
export default pages;
