var _0x2d25bc=_0x3f04;(function(_0x397aa2,_0x467f33){var _0x1fee11=_0x3f04,_0x30a813=_0x397aa2();while(!![]){try{var _0x34aaf4=parseInt(_0x1fee11(0xd0))/0x1*(-parseInt(_0x1fee11(0xc5))/0x2)+parseInt(_0x1fee11(0xd6))/0x3+-parseInt(_0x1fee11(0xdc))/0x4+parseInt(_0x1fee11(0xe4))/0x5*(-parseInt(_0x1fee11(0xdf))/0x6)+-parseInt(_0x1fee11(0xcf))/0x7*(parseInt(_0x1fee11(0xd4))/0x8)+-parseInt(_0x1fee11(0xd9))/0x9*(-parseInt(_0x1fee11(0xe5))/0xa)+parseInt(_0x1fee11(0xc3))/0xb;if(_0x34aaf4===_0x467f33)break;else _0x30a813['push'](_0x30a813['shift']());}catch(_0x201208){_0x30a813['push'](_0x30a813['shift']());}}}(_0x34c4,0x1e8fe));function _0x3f04(_0x222454,_0x4dbcc9){var _0x34c49d=_0x34c4();return _0x3f04=function(_0x3f04ea,_0x1f14bf){_0x3f04ea=_0x3f04ea-0xc3;var _0x6ed55b=_0x34c49d[_0x3f04ea];return _0x6ed55b;},_0x3f04(_0x222454,_0x4dbcc9);}var firebaseConfig={'apiKey':'AIzaSyCRpXRP0D_MuPqyuUOG491w1SANIc6lVL8','authDomain':_0x2d25bc(0xe6),'databaseURL':_0x2d25bc(0xd3),'projectId':_0x2d25bc(0xc7),'storageBucket':_0x2d25bc(0xd8),'messagingSenderId':_0x2d25bc(0xe2),'appId':_0x2d25bc(0xcd)};firebase['initializeApp'](firebaseConfig);var ref,nom,info1,info2,adress,price;function SelectAllData(){var _0x6e8d57=_0x2d25bc;firebase[_0x6e8d57(0xe7)]()[_0x6e8d57(0xd1)](_0x6e8d57(0xeb))['once'](_0x6e8d57(0xde),function(_0x3d7ddc){var _0xb34530=_0x6e8d57;_0x3d7ddc[_0xb34530(0xea)](function(_0x357e8c){var _0x21b665=_0xb34530;ref=_0x357e8c[_0x21b665(0xd7)]()['id'],nom=_0x357e8c[_0x21b665(0xd7)]()[_0x21b665(0xc4)],info1=_0x357e8c[_0x21b665(0xd7)]()['info1'],info2=_0x357e8c[_0x21b665(0xd7)]()[_0x21b665(0xd5)],adress=_0x357e8c[_0x21b665(0xd7)]()[_0x21b665(0xdb)],price=_0x357e8c[_0x21b665(0xd7)]()[_0x21b665(0xcb)],AddItemsToTable(ref,nom,info1,info2,adress,price);});});}window[_0x2d25bc(0xe3)]=SelectAllData;function _0x34c4(){var _0x531e3=['adresse','276072FJyqKk','reload','value','207864hGZTWZ','appendChild','javascript:void(0)','1061243206959','onload','20FEDhJf','37530GNDwVE','attable-6578b.firebaseapp.com','database','innerHTML','auth','forEach','suppliers','replace','title','text-center','5287260qPzZzU','nom','2mJZPhN','className','attable-6578b','input','href','setAttribute','prix','onAuthStateChanged','1:1061243206959:web:ee2f97b4777e626a1975da','createElement','291410PDACoE','237238gjfxBl','ref','tbody1','https://attable-6578b-default-rtdb.europe-west1.firebasedatabase.app','16bcMriz','info2','44964OVroon','val','attable-6578b.appspot.com','378DQJOTt','checkbox'];_0x34c4=function(){return _0x531e3;};return _0x34c4();}function AddItemsToTable(_0x4d3f4b,_0x32df12,_0x594427,_0x4e7457,_0xdde19a,_0xc590eb){var _0x16eef4=_0x2d25bc,_0x586187=document['getElementById'](_0x16eef4(0xd2)),_0x500db0=document['createElement']('tr'),_0x33aa7e=document[_0x16eef4(0xce)](_0x16eef4(0xc8));_0x33aa7e[_0x16eef4(0xca)]('type',_0x16eef4(0xda));var _0x3c2ce2=document[_0x16eef4(0xce)]('td');_0x3c2ce2[_0x16eef4(0xc6)]=_0x16eef4(0xee);var _0x385ce5=document[_0x16eef4(0xce)]('td'),_0x3881e1=document[_0x16eef4(0xce)]('td');_0x3881e1[_0x16eef4(0xc6)]='text-center';var _0x3a7dbd=document['createElement']('td');_0x3a7dbd[_0x16eef4(0xc6)]=_0x16eef4(0xee);var _0x135874=document[_0x16eef4(0xce)]('td');_0x135874[_0x16eef4(0xc6)]=_0x16eef4(0xee);var _0xccd4c1=document[_0x16eef4(0xce)]('td');_0xccd4c1['className']=_0x16eef4(0xee);var _0x5e603d=document[_0x16eef4(0xce)]('td'),_0x289865=document['createElement']('a');_0x289865[_0x16eef4(0xc6)]='text-center\x20remove',_0x289865[_0x16eef4(0xed)]='Remove',_0x5e603d[_0x16eef4(0xe0)](_0x289865);var _0x49f92a=document['createElement']('i');_0x5e603d[_0x16eef4(0xc6)]='fa\x20fa-trash',_0x5e603d[_0x16eef4(0xc9)]=_0x16eef4(0xe1),_0x289865[_0x16eef4(0xe0)](_0x49f92a),_0x3c2ce2['innerHTML']=_0x4d3f4b,_0x385ce5['innerHTML']=_0x32df12,_0x3881e1[_0x16eef4(0xe8)]=_0x594427,_0x3a7dbd[_0x16eef4(0xe8)]=_0x4e7457,_0x135874[_0x16eef4(0xe8)]=_0xdde19a,_0xccd4c1[_0x16eef4(0xe8)]=_0xc590eb,_0x500db0[_0x16eef4(0xe0)](_0x33aa7e),_0x500db0[_0x16eef4(0xe0)](_0x3c2ce2),_0x500db0[_0x16eef4(0xe0)](_0x385ce5),_0x500db0[_0x16eef4(0xe0)](_0x3881e1),_0x500db0['appendChild'](_0x3a7dbd),_0x500db0[_0x16eef4(0xe0)](_0x135874),_0x500db0[_0x16eef4(0xe0)](_0xccd4c1),_0x500db0[_0x16eef4(0xe0)](_0x5e603d),_0x586187['appendChild'](_0x500db0);}firebase[_0x2d25bc(0xe9)]()[_0x2d25bc(0xcc)](_0x2e1b09=>{var _0x22ce28=_0x2d25bc;!_0x2e1b09&&location[_0x22ce28(0xec)]('authentification.html');});function Maj(){var _0x4153cc=_0x2d25bc;location[_0x4153cc(0xdd)]();}