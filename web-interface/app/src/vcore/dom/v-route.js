const VRoute = ( function() { // eslint-disable-line no-unused-vars

  /**
   * Module for routing methods
   *
   */

  'use strict';

  window.onpopstate = () => {
    Canvas.draw( window.history.state );
  };

  const routes = [
    {
      path: '',
      action: () => {
        return {
          status: 'home',
          data: []
        };
      }
    },
    {
      path: '/profile',
      children: [
        {
          path: '',
          action: () => {
            return {
              status: 'me',
              data: []
            };
          }
        },
        {
          path: '/:rawentity',
          action: ( context ) => {
            return {
              status: 'profile',
              data: [ context.params.rawentity ]
            };
          }
        }
      ]
    },
    {
      path: '/chat',
      children: [
        {
          path: '/everyone',
          action: () => {
            return {
              status: 'chat everyone',
              data: [ 'chat everyone' ]
            };
          }
        },
        {
          path: '/:id',
          action: ( context ) => {
            return {
              status: 'chat id',
              data: [ context.params.id ]
            };
          }
        }
      ]
    },
    {
      path: '/market',
      children: [
        {
          path: '',
          action: () => {
            return {
              status: 'market',
              data: [ 'marketplace' ]
            };
          }
        },
        {
          path: '/:id',
          action: ( context ) => {
            return {
              status: 'market category',
              data: [ context.params.id ]
            };
          }
        }
      ]
    },
    {
      path: '/media',
      children: [
        {
          path: '',
          action: () => {
            return {
              status: 'media',
              data: [ 'media' ]
            };
          }
        },
        {
          path: '/:id',
          action: ( context ) => {
            return {
              status: 'media category',
              data: [ context.params.id ]
            };
          }
        }
      ]
    },
    {
      path: '/data',
      action: () => {
        return {
          status: 'data',
          data: [ 'data' ]
        };
      }
    }
  ];

  const Router = new UniversalRouter( routes );

  /* ================== private methods ================= */

  /* ============ public methods and exports ============ */

  function castRoute( route ) {
    return Router.resolve( route );
  }

  function setRoute() {
    // todo
  }

  function setBrowserHistory( data ) {
    if( V.getState( 'active' ).path != data.path ) {
      window.history.pushState(
        data,
        data.path,
        window.location.origin + data.path
      );
      V.setState( 'active', { path: data.path } );
    }
  }

  return {
    castRoute: castRoute,
    setRoute: setRoute,
    setBrowserHistory: setBrowserHistory
  };

} )();