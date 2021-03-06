
const settings = {
  floatEth: true,
  verify: true,
};

// Connect to firebase database
const { namespaceDb } = require( '../../resources/databases-setup' );
const { profileDb } = require( '../../resources/databases-setup' );
const { authDb } = require( '../../resources/databases-setup' );

const colE = namespaceDb.database().ref( 'entities' );
const colP = profileDb.database().ref( 'profiles' );
const colA = authDb.database().ref( 'authentication' );

const castObjectPaths = require( './utils/cast-object-paths' );
const trackSearchableFields = require( './utils/track-searchable-fields' );

module.exports = async ( context, data ) => {

  /** Validate, cast and set inputs */
  await require( '../validate/validate' )( context, data ); // eslint-disable-line global-require

  /** Cast full set of namespace fields and store in DB. */
  const namespace = require( './utils/cast-namespace' )( context, data ); // eslint-disable-line global-require

  const setA = await new Promise( resolve => {
    colA.child( namespace.auth.a ).update( castObjectPaths( namespace.auth ), () => resolve( 'set Auth' ) );
  } );

  const setP = await new Promise( resolve => {
    colP.child( namespace.profile.a ).update( castObjectPaths( namespace.profile ), () => resolve( 'set Profile' ) );
  } );

  const setE = await new Promise( resolve => {
    colE.child( namespace.entity.a ).update( castObjectPaths( namespace.entity ), () => resolve( 'set Entity' ) );
  } );
  // console.log( setA, setP, setE );

  /** Float some ETH and optionally auto-verify */
  if ( settings.floatEth && 'Person' == namespace.entity.c ) {
    require( './set-transaction' )( context, { // eslint-disable-line global-require
      recipientAddress: namespace.entity.i,
    }, 'float' );
  }

  /** Verify */
  if ( settings.verify && 'Person' == namespace.entity.c ) {
    require( './set-transaction' )( context, { // eslint-disable-line global-require
      recipientAddress: namespace.entity.i,
    }, 'verify' );
  }

  /** Track searchable fields in entity db */
  trackSearchableFields( namespace.entity.a, namespace.profile );

  /** Mixin the auth and return entity Doc */
  namespace.entity.auth = namespace.auth;

  return namespace.entity;

};
