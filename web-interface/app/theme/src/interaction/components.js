const InteractionComponents = ( function() { // eslint-disable-line no-unused-vars

  /**
   * V Theme Module for interaction components
   *
   */

  'use strict';

  const btnClasses = 'cursor-pointer hidden pr-s';

  /* ============== user interface strings ============== */

  const ui = {
    upload: 'uploading...',
    change: 'Change',
    image: 'Image',
    titleOrCity: 'Enter a title or city name',

    key: 'Key',
    title: 'Title',
    loc: 'Location',
    descr: 'Description and Links',
    target: 'Target',
    unit: 'Unit',
    search: 'Search',
    create: 'create',
    query: 'search',

    getStarted: 'Watch intro',
    connectWallet: 'Connect a new crypto wallet',
    progressVerification: 'Ask a friend to transfer 1 VALUE to progress your verification.',
    brightId: 'Verify with BrightID to receive VALUE basic income.',
  };

  function getString( string, scope ) {
    return V.i18n( string, 'interaction', scope || 'interaction content' ) + ' ';
  }

  /* ================== event handlers ================== */

  function handleImageUpload( e ) {
    V.setNode( '#img-upload__label', getString( ui.upload ) );
    V.castImageUpload( e ).then( res => {
      V.setNode( '#img-upload__label', getString( ui.change ) );
      V.setNode( '#img-upload__preview', '' );
      V.setNode( '#img-upload__preview', V.cN( {
        t: 'img',
        y: {
          'max-width': '25px',
          'max-height': '20px',
          'margin-left': '10px',
        },
        src: res.src,
      } ) );
    } );
  }

  // function handleSetFilter() {
  //   if ( this.getAttribute( 'value' ) == '1' ) {
  //     this.setAttribute( 'value', '0' );
  //     this.classList.remove( 'filter-select', 'txt-brand-primary' );
  //   }
  //   else {
  //     this.setAttribute( 'value', '1' );
  //     this.classList.add( 'filter-select', 'txt-brand-primary' );
  //   }
  // }

  function handleGetStarted() {
    V.setState( 'active', { navItem: '/media' } );

    setTimeout( () => { V.getNode( '[path="/media"]' ).click() }, 350 );
  }

  /* ================== private methods ================= */

  function img( icon, css ) {
    return V.cN( {
      t: 'div',
      c: 'circle-1 flex justify-center items-center rounded-full bkg-white transition pill-shadow' + ( css ? ' ' + css : '' ),
      h: V.getIcon( icon ),
    } );
  }

  /* ================  public components ================ */

  // btns

  function filter() {
    return V.cN( {
      t: 'li',
      id: 'filter',
      c: btnClasses,
      h: img( 'filter_list' ),
    } );
  }

  function searchBtn() {
    return V.cN( {
      t: 'li',
      id: 'search',
      c: btnClasses,
      h: img( 'search' ),
    } );
  }

  function query() {
    return V.cN( {
      t: 'li',
      id: 'query',
      c: btnClasses,
      h: {
        t: 'div',
        c: 'create-btn pxy',
        h: getString( ui.query ),
      }, // img( 'search' )
    } );
  }

  function plus() {
    return V.cN( {
      t: 'li',
      id: 'plus',
      c: btnClasses,
      h: img( '+' ),
    } );
  }

  function close() {
    return V.cN( {
      t: 'li',
      id: 'close',
      c: btnClasses,
      h: img( 'close' ),
    } );
  }

  function set() {
    return V.cN( {
      t: 'li',
      id: 'set',
      c: btnClasses,
      h: {
        t: 'div',
        c: 'create-btn pxy',
        h: getString( ui.create ),
      }, // img( 'send' )
    } );
  }

  function sendNav() {
    return V.cN( {
      t: 'li',
      id: 'send',
      c: btnClasses,
      h: img( 'send' ),
    } );
  }

  function sendBtn() {
    return V.cN( {
      t: 'button',
      i: 'send-message',
      c: 'circle-1 flex justify-center items-center rounded-full bkg-white',
      h: V.cN( {
        t: 'span',
        c: 'sendbtn',
        s: {
          sendbtn: {
            position: 'relative',
            left: '1px',
            top: '1px',
            opacity: '0.75',
          },
        },
        h: V.getIcon( 'send' ),
      } ),
    } );
  }

  // form

  function form() {
    return V.setNode( {
      tag: 'form',
      classes: 'form fixed w-screen hidden bkg-white pxy',
      setStyle: {
        form: {
          'padding-top': 'calc(var(--page-position-top-selected) + 5px) !important',
          'height': '100%',
          'z-index': -1,
        },
      },
      h: {
        t: 'div',
        c: 'form__response pxy txt-red',
        // h: 'test response msg'
      },
    } );
  }

  function formField( whichField, whichValue, lat, lng ) {

    const fields = {
      uPhrase: {
        label: getString( ui.key ),
        inputId: 'loginform__uphrase',
        attributes: {
          type: 'password',
          autocomplete: 'off',
        },
      },
      title: {
        label: getString( ui.title ),
        inputId: 'plusform__title',
        attributes: {
          value: whichValue,
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          spellcheck: 'false',
        },
      },
      location: {
        label: getString( ui.loc ),
        inputId: 'plusform__loc',
        attributes: {
          value: whichValue,
          lat: lat,
          lng: lng,
          autocomplete: 'off',
        },
      },
      description: {
        label: getString( ui.descr ),
        inputId: 'plusform__descr',
        multiline: true,
      },
      target: {
        label: getString( ui.target ),
        inputId: 'plusform__target',
        fieldClasses: 'flex-grow w-30%',
      },
      unit: {
        label: getString( ui.unit ),
        inputId: 'plusform__unit',
        fieldClasses: 'flex-grow w-30%',
      },
      search: {
        label: getString( ui.search ),
        inputId: 'search-input',
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          spellcheck: 'false',
        },
      },
    };

    function autoHeight() {
      const elem = this;
      elem.style.height = '1px';
      elem.style.height = ( elem.scrollHeight )+'px';
    }

    function handleFocus() {
      this.closest( '.field' ).classList += ' field--static field--focus';
    }

    function handleBlur() {
      const close = this.closest( '.field' ).classList;
      if( !this.value ) {
        close.remove( 'field--static' );
      }
      close.remove( 'field--focus' );
    }

    const $inputContainer = V.cN( {
      t: 'div',
      c: 'field__input-container',
    } );

    const $labelNode = V.cN( {
      t: 'div',
      c: 'field__label-wrapper',
      h: {
        t: 'label',
        c: 'field__label label-primary',
        h: {
          t: 'span',
          c: 'label__content',
          h: fields[whichField].label,
        },
      },
    } );

    const $input = V.cN( {
      t: 'input',
      c: 'field__input',
      id: fields[whichField].inputId,
      e: {
        focus: handleFocus,
        blur: handleBlur,
      },
      a: fields[whichField].attributes || { value: whichValue },
    } );

    const $textarea = V.cN( {
      t: 'textarea',
      c: 'field__input auto-height',
      id: fields[whichField].inputId,
      a: {
        row: '1',
      },
      h: whichValue,
      e: {
        input: autoHeight,
        focus: handleFocus,
        blur: handleBlur,
      },
    } );

    if ( fields[whichField].multiline ) {
      V.setNode( $inputContainer, [ $labelNode, $textarea ] );
    }
    else {
      V.setNode( $inputContainer, [ $labelNode, $input ] );
    }

    const fieldClasses = fields[whichField].fieldClasses || '';
    const hasValue = whichValue ? ' field--static' : '';

    return V.cN( {
      t: 'div',
      c: 'field pxy ' + fieldClasses + hasValue,
      h: {
        t: 'div',
        c: 'field__border',
        h: {
          t: 'div',
          c: 'field__internal',
          h: $inputContainer,
        },
      },
    } );
  }

  function formUploadImage() {
    return V.cN( {
      t: 'div',
      c: 'pxy w-30%',
      h: {
        t: 'div',
        s: {
          'upload-field': {
            'padding': '16px 12px 17px',
            'align-items': 'center',
            // adjust look to other fields:
            'border': '1px solid #DBDAE3',
            'border-radius': '2px',
            'color': '#6F7287',
            'font-size': '14px',
            'transition': 'border 240ms cubic-bezier(0.4, 0, 0.3, 1)',
          },
          'upload-field:hover': {
            border: '1px solid #A9A8B3',
          },
        },
        c: 'upload-field relative flex flex-grow',
        h: [
          {
            t: 'label',
            i: 'img-upload__label',
            c: 'w-full cursor-pointer',
            a: {
              for: 'img-upload__file',
            },
            h: getString( ui.image ),
          },
          {
            t: 'input',
            i: 'img-upload__file',
            c: 'hidden',
            a: {
              type: 'file',
              accept: 'image/*',
            },
            e: {
              change: handleImageUpload,
            },
          },
          {
            t: 'div',
            i: 'img-upload__preview',
            y: {
              position: 'absolute',
              right: '10px',
            },
          },
        ],
      },
    } );
  }

  function formSearchFilter() {
    return V.cN( {
      t: 'div',
      h: [
        {
          t: 'p',
          c: 'pxy',
          h: getString( ui.titleOrCity ),
        },
        // V.cN( {
        //   t: 'search-filter-nav',
        //   c: 'nav search-filter-nav fixed w-screen overflow-x-scroll pxy',
        //   h: V.cN( {
        //     t: 'ul',
        //     c: 'search-filter-nav__ul flex items-center font-medium',
        //     s: {
        //       'filter-select': {
        //         'background': 'azure !important',
        //         'box-shadow': '0px 0px 0px 1px azure !important',
        //       }
        //     },
        //     h: [
        //       V.cN( {
        //         t: 'li',
        //         i: 'search-filter__city',
        //         classes: 'pill flex fs-rr justify-center items-center rounded-full bkg-white border-shadow cursor-pointer no-txt-select whitespace-no-wrap',
        //         h: 'City',
        //         k: handleSetFilter
        //       } ),
        //       V.cN( {
        //         t: 'li',
        //         i: 'search-filter__title',
        //         classes: 'pill flex fs-rr justify-center items-center rounded-full bkg-white border-shadow cursor-pointer no-txt-select whitespace-no-wrap',
        //         h: 'Title',
        //         k: handleSetFilter
        //       } ),
        //     ]
        //   } )
        // } )
      ],
    } );
  }

  // join

  function joinBtn() {
    const sc = V.getState( 'screen' );
    const colorBkg = 'rgba(' + sc.buttonBkg + ', 1)';

    return V.cN( { // #ffa41b
      t: 'join',
      i: 'join',
      c: 'fixed cursor-pointer txt-anchor-mid',
      y: sc.width > 800 ? { top: '12px', left: '12px' } : { top: '2px', left: '2px' },
      h: {
        svg: true,
        t: 'svg',
        a: {
          width: sc.width > 800 ? '66px' : '54px',
          viewBox: '0 0 36 36',
        },
        h: [
          {
            svg: true,
            t: 'circle',
            a: {
              'stroke-dasharray': '100',
              'transform': 'rotate(-90, 18, 18) translate(0, 36) scale(1, -1)',
              'stroke-dashoffset': '-200',
              'cx': '18',
              'cy': '18',
              'r': '15.91549430918954',
              'fill': colorBkg,
              'stroke': colorBkg,
              'stroke-width': '2.7',
            },
          },
          {
            svg: true,
            t: 'text',
            c: 'font-medium fs-xs txt-button',
            a: { x: '50%', y: '59%' },
            h: 'Join',
          },
        ],
      },
    } );
  }

  function onboardingCard() {

    const ledger = V.getSetting( 'transactionLedger' );

    if ( V.aE() && ledger == 'EVM' ) {
      let $cardContent;
      const balanceCheck = V.aE().balance && V.aE().balance.balance.liveBalance > 0 ? true : false;

      if ( !V.cA() ) { // no wallet in use
        $cardContent = V.castNode( {
          tag: 'div',
          c: 'flex w-full items-center justify-evenly',
          html: '<p>' + '👋 ' + getString( ui.connectWallet, 'onboarding call to action' ) + '</p>',
        } );
        $cardContent.addEventListener( 'click', function handleAddWallet() {
          if ( window.Web3Obj ) {
            Join.draw( 'authenticate existing entity' );
          }
          else {
            Join.draw( 'install metamask' );
          }
        } );
        return CanvasComponents.card( $cardContent );
      }
      else if ( !balanceCheck && V.aE().role == 'Person' ) { // wallet balance is 0
        $cardContent = V.castNode( {
          tag: 'div',
          c: 'flex w-full items-center justify-evenly',
          html: '<p>' + '👋 ' + getString( ui.progressVerification, 'onboarding call to action' ) + '</p>',
        } );
        return CanvasComponents.card( $cardContent );
      }
      else if ( balanceCheck && V.aE().role == 'Person' ) { // no brightID connected
        $cardContent = V.castNode( {
          tag: 'div',
          c: 'flex w-full items-center justify-evenly',
          html: '<p>' + '👋 ' + getString( ui.brightId, 'onboarding call to action' ) + '</p>',
          // <a href="brightid://link-verification/http:%2f%2fnode.brightid.org/VALUE/${ entity.private.base64Url }"><img src="/assets/img/brightID-logo_sm.png"></a>
        } );
        return CanvasComponents.card( $cardContent );
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }

  function getStarted() {
    return V.cN( {
      t: 'li',
      i: 'get-started',
      s: {
        getstarted: {
          background: 'rgb(255,112,148)',
          color: 'white',
          // border: '2px solid blue',
        },
      },
      c: 'pill getstarted flex justify-center items-center rounded-full cursor-pointer no-txt-select whitespace-no-wrap',
      h: getString( ui.getStarted ),
      k: handleGetStarted,
    } );
  }

  /* ====================== export ====================== */

  return {
    filter: filter,
    searchBtn: searchBtn,
    query: query,
    plus: plus,
    close: close,
    set: set,
    sendNav: sendNav,
    sendBtn: sendBtn,
    form: form,
    formField: formField,
    formUploadImage: formUploadImage,
    formSearchFilter: formSearchFilter,
    joinBtn: joinBtn,
    onboardingCard: onboardingCard,
    getStarted: getStarted,
  };

} )();
