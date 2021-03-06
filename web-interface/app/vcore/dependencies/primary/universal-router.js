/*! Universal Router 9.0.1 | MIT License | https://www.kriasoft.com/universal-router/ */
!function( e, r ) {'object'==typeof exports&&'undefined'!=typeof module?module.exports=r():'function'==typeof define&&define.amd?define( r ):( e=e||self ).UniversalRouter=r()}( this, function() {
  'use strict'; function n( e, r ) {
    void 0===r&&( r={} ); for( var o=function( e ) {
        for( var r=[], t=0; t<e.length; ) {
          var n=e[t]; if( '*'!==n&&'+'!==n&&'?'!==n ) {
            if( '\\'!==n ) {
              if( '{'!==n ) {
                if( '}'!==n ) {
                  if( ':'!==n ) {
                    if( '('!==n ) {r.push( { type: 'CHAR', index: t, value: e[t++] } )}
                    else{
                      var i=1, o=''; if( '?'===e[u=t+1] ) {throw new TypeError( 'Pattern cannot start with "?" at '+u )}for( ;u<e.length; ) {
                        if( '\\'!==e[u] ) {
                          if( ')'===e[u] ) {if( 0===--i ) {u++; break}}
                          else if( '('===e[u]&&( i++, '?'!==e[u+1] ) ) {throw new TypeError( 'Capturing groups are not allowed at '+u )}o+=e[u++];
                        }
                        else {o+=e[u++]+e[u++]}
                      }if( i ) {throw new TypeError( 'Unbalanced pattern at '+t )}if( !o ) {throw new TypeError( 'Missing pattern at '+t )}r.push( { type: 'PATTERN', index: t, value: o } ), t=u;
                    }
                  }
                  else{for( var a='', u=t+1; u<e.length; ) {var f=e.charCodeAt( u ); if( !( 48<=f&&f<=57||65<=f&&f<=90||97<=f&&f<=122||95===f ) ) {break}a+=e[u++]}if( !a ) {throw new TypeError( 'Missing parameter name at '+t )}r.push( { type: 'NAME', index: t, value: a } ), t=u}
                }
                else {r.push( { type: 'CLOSE', index: t, value: e[t++] } )}
              }
              else {r.push( { type: 'OPEN', index: t, value: e[t++] } )}
            }
            else {r.push( { type: 'ESCAPED_CHAR', index: t++, value: e[t++] } )}
          }
          else {r.push( { type: 'MODIFIER', index: t, value: e[t++] } )}
        }return r.push( { type: 'END', index: t, value: '' } ), r;
      }( e ), t=r.prefixes, n=void 0===t?'./':t, i='[^'+w( r.delimiter||'/#?' )+']+?', a=[], u=0, f=0, s='', p=function( e ) {if( f<o.length&&o[f].type===e ) {return o[f++].value}}, l=function( e ) {var r=p( e ); if( void 0!==r ) {return r}var t=o[f], n=t.type, i=t.index; throw new TypeError( 'Unexpected '+n+' at '+i+', expected '+e )}, d=function() {for( var e, r=''; e=p( 'CHAR' )||p( 'ESCAPED_CHAR' ); ) {r+=e}return r}; f<o.length; ) {
      var h=p( 'CHAR' ), c=p( 'NAME' ), v=p( 'PATTERN' ); if( c||v ) {var m=h||''; -1===n.indexOf( m )&&( s+=m, m='' ), s&&( a.push( s ), s='' ), a.push( { name: c||u++, prefix: m, suffix: '', pattern: v||i, modifier: p( 'MODIFIER' )||'' } )}
      else{
        var x=h||p( 'ESCAPED_CHAR' ); if( x ) {s+=x}
        else if( s&&( a.push( s ), s='' ), p( 'OPEN' ) ) {m=d(); var E=p( 'NAME' )||'', g=p( 'PATTERN' )||'', y=d(); l( 'CLOSE' ), a.push( { name: E||( g?u++:'' ), pattern: E&&!g?i:g, prefix: m, suffix: y, modifier: p( 'MODIFIER' )||'' } )}
        else {l( 'END' )}
      }
    }return a;
  }function v( e, r ) {var t=[]; return function( u, f, e ) {void 0===e&&( e={} ); var r=e.decode, s=void 0===r?function( e ) {return e}:r; return function( e ) {var t=u.exec( e ); if( !t ) {return!1}for( var r=t[0], n=t.index, i=Object.create( null ), o=function( e ) {if( void 0===t[e] ) {return'continue'}var r=f[e-1]; '*'===r.modifier||'+'===r.modifier?i[r.name]=t[e].split( r.prefix+r.suffix ).map( function( e ) {return s( e, r )} ):i[r.name]=s( t[e], r )}, a=1; a<t.length; a++ ) {o( a )}return{ path: r, index: n, params: i }}}( u( e, t, r ), t, r )}function w( e ) {return e.replace( /([.+*?=^!:${}()[\]|/\\])/g, '\\$1' )}function b( e ) {return e&&e.sensitive?'':'i'}function a( e, r, t ) {
    return function( e, r, t ) {
      void 0===t&&( t={} ); for( var n=t.strict, i=void 0!==n&&n, o=t.start, a=void 0===o||o, u=t.end, f=void 0===u||u, s=t.encode, p=void 0===s?function( e ) {return e}:s, l='['+w( t.endsWith||'' )+']|$', d='['+w( t.delimiter||'/#?' )+']', h=a?'^':'', c=0, v=e; c<v.length; c++ ) {
        var m=v[c]; if( 'string'==typeof m ) {h+=w( p( m ) )}
        else{
          var x=w( p( m.prefix ) ), E=w( p( m.suffix ) ); if( m.pattern ) {
            if( r&&r.push( m ), x||E ) {
              if( '+'===m.modifier||'*'===m.modifier ) {var g='*'===m.modifier?'?':''; h+='(?:'+x+'((?:'+m.pattern+')(?:'+E+x+'(?:'+m.pattern+'))*)'+E+')'+g}
              else {h+='(?:'+x+'('+m.pattern+')'+E+')'+m.modifier}
            }
            else {h+='('+m.pattern+')'+m.modifier}
          }
          else {h+='(?:'+x+E+')'+m.modifier}
        }
      }if( f ) {i||( h+=d+'?' ), h+=t.endsWith?'(?='+l+')':'$'}
      else{var y=e[e.length-1], A='string'==typeof y?-1<d.indexOf( y[y.length-1] ):void 0===y; i||( h+='(?:'+d+'(?='+l+'))?' ), A||( h+='(?='+d+'|'+l+')' )}return new RegExp( h, b( t ) );
    }( n( e, t ), r, t );
  }function u( e, r, t ) {return e instanceof RegExp?function( e, r ) {if( !r ) {return e}var t=e.source.match( /\((?!\?)/g ); if( t ) {for( var n=0; n<t.length; n++ ) {r.push( { name: n, prefix: '', suffix: '', modifier: '', pattern: '' } )}}return e}( e, r ):Array.isArray( e )?( n=r, i=t, o=e.map( function( e ) {return u( e, n, i ).source} ), new RegExp( '(?:'+o.join( '|' )+')', b( i ) ) ):a( e, r, t ); var n, i, o}function t( r ) {
    try{return decodeURIComponent( r )}
    catch( e ) {return r}
  }function i( e, r ) {if( 'function'==typeof e.route.action ) {return e.route.action( e, r )}}function e( e, r ) {if( !e||'object'!=typeof e ) {throw new TypeError( 'Invalid routes' )}this.options=Object.assign( { decode: t }, r ), this.baseUrl=this.options.baseUrl||'', this.root=Array.isArray( e )?{ path: '', children: e, parent: null }:e, this.root.parent=null}return e.prototype.resolve=function( e ) {var o, a, r=this, u=Object.assign( { router: this }, this.options.context, {}, 'string'==typeof e?{ pathname: e }:e ), f=function a( u, f, s, p, l ) {var d, h, c=0; return{ next: function( e ) {if( u===e ) {return{ done: !0, value: !1 }}if( !d ) {var r=u, t=!r.children; if( r.match||( r.match=v( r.path||'', Object.assign( { end: t }, s ) ) ), d=r.match( p ) ) {var n=d.path; return d.path=t||'/'!==n.charAt( n.length-1 )?n:n.substr( 1 ), d.params=Object.assign( {}, l, {}, d.params ), { done: !1, value: { route: u, baseUrl: f, path: d.path, params: d.params } }}}if( d&&u.children ) {for( ;c<u.children.length; ) {if( !h ) {var i=u.children[c]; i.parent=u, h=a( i, f+d.path, s, p.substr( d.path.length ), d.params )}var o=h.next( e ); if( !o.done ) {return{ done: !1, value: o.value }}h=null, c++}}return{ done: !0, value: !1 }} }}( this.root, this.baseUrl, this.options, u.pathname.substr( this.baseUrl.length ) ), s=this.options.resolveRoute||i, p=u; function l( r, t, e ) {void 0===t&&( t=!o.done&&o.value.route ); var n=null===e&&!o.done&&o.value.route; if( o=a||f.next( n ), a=null, !r&&( o.done||!function( e, r ) {for( var t=r; t; ) {if( ( t=t.parent )===e ) {return 1}}}( t, o.value.route ) ) ) {return a=o, Promise.resolve( null )}if( o.done ) {var i=new Error( 'Route not found' ); return i.status=404, Promise.reject( i )}return p=Object.assign( {}, u, {}, o.value ), Promise.resolve( s( p, o.value.params ) ).then( function( e ) {return null!=e?e:l( r, t, e )} )}return u.next=l, Promise.resolve().then( function() {return l( !0, r.root )} ).catch( function( e ) {if( r.options.errorHandler ) {return r.options.errorHandler( e, p )}throw e} )}, e;
} );
//# sourceMappingURL=universal-router.min.js.map
