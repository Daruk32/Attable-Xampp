var _0x545efa=_0x558c;(function(_0x3c15f9,_0x56cd65){var _0x59edf2=_0x558c,_0x3695eb=_0x3c15f9();while(!![]){try{var _0x396adb=-parseInt(_0x59edf2(0x97))/0x1*(-parseInt(_0x59edf2(0xc2))/0x2)+parseInt(_0x59edf2(0xad))/0x3+-parseInt(_0x59edf2(0xc3))/0x4+-parseInt(_0x59edf2(0xaf))/0x5*(parseInt(_0x59edf2(0xb0))/0x6)+-parseInt(_0x59edf2(0xb2))/0x7*(-parseInt(_0x59edf2(0xbe))/0x8)+parseInt(_0x59edf2(0xa5))/0x9+parseInt(_0x59edf2(0xb9))/0xa;if(_0x396adb===_0x56cd65)break;else _0x3695eb['push'](_0x3695eb['shift']());}catch(_0x34f699){_0x3695eb['push'](_0x3695eb['shift']());}}}(_0x11d0,0xc1cd6));function _0x11d0(){var _0x329665=['checkbox','innerHTML','title','javascript:void(0)','text-center\x20remove','setAttribute','493230TidOsh','forEach','93020GPGuPp','6jWNAhZ','type','7kaySlP','prix','auth','createElement','text-center','attable-51633','val','3620UZxtgH','onAuthStateChanged','ref','value','authentification.html','4142584IFKaOI','libelle','appendChild','onload','5520celWFd','3395052mxXUKK','getElementById','products','36mBgUvn','1:255390814899:web:714ec5ace61cd6479796c6','attable-51633.firebaseapp.com','once','tbody1','G-2DZWXDMSY6','255390814899','input','replace','reload','href','AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E','className','quantity','7913034bSocLR','fa\x20fa-trash'];_0x11d0=function(){return _0x329665;};return _0x11d0();}const firebaseConfig={'apiKey':_0x545efa(0xa2),'authDomain':_0x545efa(0x99),'projectId':_0x545efa(0xb7),'databaseURL':'https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app','storageBucket':'attable-51633.appspot.com','messagingSenderId':_0x545efa(0x9d),'appId':_0x545efa(0x98),'measurementId':_0x545efa(0x9c)};firebase['initializeApp'](firebaseConfig);var ref,nom,price,quantities;function SelectAllData(){var _0x31ee2b=_0x545efa;firebase['database']()[_0x31ee2b(0xbb)](_0x31ee2b(0x96))[_0x31ee2b(0x9a)](_0x31ee2b(0xbc),function(_0xba2e28){var _0x28e428=_0x31ee2b;_0xba2e28[_0x28e428(0xae)](function(_0x423591){var _0x3bfc47=_0x28e428;ref=_0x423591[_0x3bfc47(0xb8)]()['id'],nom=_0x423591[_0x3bfc47(0xb8)]()[_0x3bfc47(0xbf)],price=_0x423591[_0x3bfc47(0xb8)]()[_0x3bfc47(0xb3)],quantities=_0x423591[_0x3bfc47(0xb8)]()[_0x3bfc47(0xa4)],AddItemsToTable(ref,nom,price,quantities);});});}window[_0x545efa(0xc1)]=SelectAllData;function _0x558c(_0x10cd4b,_0x2fb988){var _0x11d0e5=_0x11d0();return _0x558c=function(_0x558c01,_0x50787b){_0x558c01=_0x558c01-0x96;var _0x45e2cd=_0x11d0e5[_0x558c01];return _0x45e2cd;},_0x558c(_0x10cd4b,_0x2fb988);}function AddItemsToTable(_0x40238d,_0x3d5127,_0x13b010,_0xeafbe2){var _0x3c0c36=_0x545efa,_0x5dc016=document[_0x3c0c36(0xc4)](_0x3c0c36(0x9b)),_0x5108b6=document['createElement']('tr'),_0x316689=document[_0x3c0c36(0xb5)](_0x3c0c36(0x9e));_0x316689[_0x3c0c36(0xac)](_0x3c0c36(0xb1),_0x3c0c36(0xa7));var _0x2fadce=document[_0x3c0c36(0xb5)]('td');_0x2fadce[_0x3c0c36(0xa3)]=_0x3c0c36(0xb6);var _0xd31777=document[_0x3c0c36(0xb5)]('td'),_0x40001e=document[_0x3c0c36(0xb5)]('td');_0x40001e[_0x3c0c36(0xa3)]=_0x3c0c36(0xb6);var _0x4daacd=document[_0x3c0c36(0xb5)]('td');_0x4daacd[_0x3c0c36(0xa3)]=_0x3c0c36(0xb6);var _0x13c2f8=document['createElement']('td');_0x13c2f8['className']=_0x3c0c36(0xb6);var _0x57ff1b=document[_0x3c0c36(0xb5)]('td'),_0x3b7075=document[_0x3c0c36(0xb5)]('a');_0x3b7075[_0x3c0c36(0xa3)]=_0x3c0c36(0xab),_0x3b7075[_0x3c0c36(0xa9)]='Remove',_0x57ff1b[_0x3c0c36(0xc0)](_0x3b7075);var _0x22bc49=document[_0x3c0c36(0xb5)]('i');_0x57ff1b[_0x3c0c36(0xa3)]=_0x3c0c36(0xa6),_0x57ff1b[_0x3c0c36(0xa1)]=_0x3c0c36(0xaa),_0x3b7075['appendChild'](_0x22bc49),_0x2fadce[_0x3c0c36(0xa8)]=_0x40238d,_0xd31777[_0x3c0c36(0xa8)]=_0x3d5127,_0x40001e[_0x3c0c36(0xa8)]=_0x13b010,_0x4daacd[_0x3c0c36(0xa8)]=_0xeafbe2,_0x5108b6[_0x3c0c36(0xc0)](_0x316689),_0x5108b6[_0x3c0c36(0xc0)](_0x2fadce),_0x5108b6['appendChild'](_0xd31777),_0x5108b6[_0x3c0c36(0xc0)](_0x40001e),_0x5108b6['appendChild'](_0x4daacd),_0x5108b6['appendChild'](_0x13c2f8),_0x5108b6['appendChild'](_0x57ff1b),_0x5dc016['appendChild'](_0x5108b6);}firebase[_0x545efa(0xb4)]()[_0x545efa(0xba)](_0x4d5301=>{var _0x40269b=_0x545efa;!_0x4d5301&&location[_0x40269b(0x9f)](_0x40269b(0xbd));});function Maj(){var _0x2bcb2e=_0x545efa;location[_0x2bcb2e(0xa0)]();}