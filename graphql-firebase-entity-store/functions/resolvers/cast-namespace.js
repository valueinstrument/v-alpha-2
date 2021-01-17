
// const credentials = require( '../credentials/credentials' );
// const rpc = credentials.float.rpc;
// const contractAddress = credentials.float.contractAddress;
//
// const Web3 = require( 'web3' );
// const web3 = new Web3( rpc );
//
// const abi = require( '../resources/viabi.json' ); // using require here
// const contract = new web3.eth.Contract( abi, contractAddress ); // using abi without JSON.parse here

const entitySetup = {
  entityDocVersion: '/e1/v0',
  profileDocVersion: '/p1/v0',
  authDocVersion: '/a1/v0',
  daysToExpiry: 365 * 2,
};

const castUuid = require( './v-core' ).castUuid;

module.exports.castNamespace = ( context, data ) => {

  /** Prepare data */

  const uuidE = castUuid().base64Url;
  const uuidP = castUuid().base64Url;
  const uuidA = castUuid().base64Url;
  const unix = Math.floor( Date.now() / 1000 );
  const uPhrase = 'vx' + castUuid().base64Url.slice( 0, 15 ) + 'X';

  let creatorUuid, heldBy;

  if ( context.a ) {
    heldBy = [uuidE, context.d];
    creatorUuid = context.d;
  }
  else {
    heldBy = [uuidE];
    creatorUuid = uuidE;
  }

  // let block, rpc, contract;

  // await getContractState().then( res => {
  //
  //   if ( res.success ) {
  //     block = res.data[0].currentBlock;
  //     rpc = res.data[0].network.rpc;
  //     contract = res.data[0].contract;
  //   }
  //   else {
  //     block = -1;
  //     rpc = 'error';
  //     contract = 'error';
  //   }
  // } );

  return {
    entity: {
      a: uuidE,
      b: entitySetup.entityDocVersion,
      c: data.c,
      d: uuidP,
      e: uuidA,
      g: context.host,

      i: data.i,
      j: data.j,

      m: data.m,
      n: data.n,

      x: {
        a: creatorUuid,
        b: heldBy,
      },

      y: {
        a: String( unix ),
        c: String( unix + 60 * 60 * 24 * entitySetup.daysToExpiry ),
        m: true,
        z: 100,
      },
    },
    profile: {
      a: uuidP,
      b: entitySetup.profileDocVersion,
      d: uuidE,

      m: {
        a: data.profile.descr,
        b: data.profile.email,
        m: data.profile.target,
        n: data.profile.unit,
      },
      n: {
        a: data.profile.lngLat,
        b: data.profile.loc,
      },
      o: {
        a: data.profile.tinyImg,
        b: data.profile.thumb,
        c: data.profile.medImg,
        n: data.profile.imgName,
      },

      x: {
        a: creatorUuid,
        b: heldBy,
      },

      y: {
        a: String( unix ),
      },
    },
    auth: {
      a: uuidA,
      b: entitySetup.authDocVersion,
      d: uuidE,
      e: uuidP,
      f: uPhrase,
      i: data.auth.i,
      j: data.auth.j,
    },
  };
};
