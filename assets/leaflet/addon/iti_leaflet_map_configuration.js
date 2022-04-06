var geolocs = [[
    "Àttable",
    45.7344424, 4.7797099
]];

/* exemple d'utilisation d'un marker avec un icon spé aev un effet de vol pour aller dessus

let iconOption = {
iconUrl: './assets/location-marker.svg',
iconSize: [30, 30]
};
let ourCustomIcon = L.icon(iconOption);
let marker = L.marker([latitude, longitude], 
{icon: ourCustomIcon}).bindPopup(`<h3> ${title} </h3> 
<p> ${description} </p>
`).on('click', () => {
map.flyTo([latitude, longitude], zoomLevel);
}).addTo(map);


*/
function geoloc() {
    var geoSuccess = function (position) {

        startPos = position;
        geolocs.push(
            ["Me", startPos.coords.latitude, startPos.coords.longitude]
        );

        //  console.log(geolocs);
        L.Routing.control({
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
            altLineOptions: {
                styles: [
                    { color: 'black', opacity: 0.15, weight: 9 },
                    { color: 'white', opacity: 0.8, weight: 6 },
                    { color: 'blue', opacity: 0.5, weight: 2 }
                ]
            },
            show: false,
            collapsible: true,

            waypoints: [
                L.latLng(geolocs[1][1], geolocs[1][2]),
                L.latLng(geolocs[0][1], geolocs[0][2])
            ],

            lineOptions: {
                styles: [{ color: 'red', opacity: 1, weight: 4 }]
            },
            router: new L.Routing.osrmv1({
                language: 'fr',
                profile: 'car',
            }),
        }).addTo(macarte);
        // console.log(geolocs);
        /* impossible d'avoir plus d'un pop up de marker ouvert en même temps
        étrangement le tableau ne peut pas être parcouru par des boucles for ou des accès directs hormis au 
        premier élément, indice 0, on fait avec !!!!
        */
        var marker1 = new L.marker([startPos.coords.latitude, startPos.coords.longitude]).addTo(macarte);
        marker1.bindPopup("Vous êtes ici 👇");


    };
    var geoFail = function () {
        L.Routing.control({
            geocoder: L.Control.Geocoder.nominatim(),
            reverseWaypoints: true,
            showAlternatives: true,
            altLineOptions: {
                styles: [
                    { color: 'black', opacity: 0.15, weight: 9 },
                    { color: 'white', opacity: 0.8, weight: 6 },
                    { color: 'blue', opacity: 0.5, weight: 2 }
                ]
            },
            show: true,
            collapsible: true,
            routeWhileDragging: true,
            waypoints: [
                L.latLng(geolocs[0][1], geolocs[0][2])
            ],
            lineOptions: {
                styles: [{ color: 'red', opacity: 1, weight: 4 }]
            },
            router: new L.Routing.osrmv1({
                language: 'fr',
                profile: 'car',
            }),
        }).addTo(macarte)
        // console.log(geolocs);
        /* impossible d'avoir plus d'un pop up de marker ouvert en même temps
        étrangement le tableau ne peut pas être parcouru par des boucles for ou des accès directs hormis au 
        premier élément, indice 0, on fait avec !!!!
        */
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
}


var macarte = null;
function initMap(lat = 45.7344424, lon = 4.7797099) {
    macarte = L.map('map_leaflet', {
        center: new L.LatLng(45.733524, 4.779900),
        layers: []/* pour rajouter les layers*/
    })
        .setView([lat, lon], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20,

    }).addTo(macarte);

    //     var marker = new L.marker([39.5, -77.3], { opacity: 0.01 }); //opacity may be set to zero


    var carreEmplacementLocal = L.polygon([[45.734426, 4.779927], [45.734369, 4.779929], [45.73437, 4.780041], [45.734427, 4.780042], [45.734426, 4.779927]]
        , {
            color: 'black',
            fillColor: 'red',
            fillOpacity: 0.5,
            "dashArray": "25"
        })
    carreEmplacementLocal.addTo(macarte);

    /* AJOUT DES MARQUEURS PERSONNALISES */
    let AttableCustomIcon = {
        iconUrl: 'assets/leaflet/addon/restaurants.png',
        iconSize: [40, 40]
    };
    let AttableIcon = L.icon(AttableCustomIcon);
    var marker = new L.marker([geolocs[0][1] - 0.00004, geolocs[0][2] + 0.00025], { icon: AttableIcon })
        .addTo(macarte)
        .bindPopup("On est là 👇").openPopup()
        .bindTooltip("Local de l'association", { permanent: true, direction: "bottom", className: "attable-label", offset: [0, 0] });
    // On peu définir un style particulier avec le className attable-label


    const ParkingCustomIcon = {
        iconUrl: 'assets/leaflet/addon/automotive.png',
        iconSize: [30, 30]
    };
    const ParkingIcon = L.icon(ParkingCustomIcon);
    var markerPArking = new L.marker([45.733524, 4.779900], { icon: ParkingIcon }).addTo(macarte);
    markerPArking.bindPopup("🆓 Parking gratuit ici 🚙");
    markerPArking.on('mouseover', function (ev) {
        ev.target.openPopup();
    });

    //on doit passer par un popup car sinon la div disparait (vu qu sinon c'est un tooltip on ne peut pas cliquer dessus)
    let contenuDivMarkerBus = "<div class='separator'> Transports TCL </div> <span class='infoImp'> C14</span> <a target='_blank' href='https://www.tcl.fr/se-deplacer/horaires' class='link' > Gare Oullins - Gorge de Loup</a><br> <span class='infoImp'> C19 </span><a target='_blank' href='https://www.tcl.fr/se-deplacer/horaires' class='link'>Perrache - Francheville Taffignon</a> ";

    const BusCustomIcon = {
        iconUrl: 'assets/leaflet/addon/transport.png',
        iconSize: [30, 30]
    };
    const BusIcon = L.icon(BusCustomIcon);
    var markerBus = new L.marker([45.7341737, 4.7797505], { icon: BusIcon })
        .bindPopup(contenuDivMarkerBus)
        .on('mouseover', function (ev) {
            ev.target.openPopup();
        })
        .addTo(macarte);
    /* AJOUT DES MARQUEURS PERSONNALISES */

    /* AJOUT bouton aller à l'origine et aller sur le site UMAP*/
    var commandCenterMapAttable = L.control({ position: 'topleft' });
    commandCenterMapAttable.onAdd = function (macarte) {
        var span = L.DomUtil.create('span', 'commandCenterMapAttable');
        span.innerHTML += '<img title="Centrer sur le local" src="assets/leaflet/addon/focus_120886.svg" alt="GO" /> ';
        return span;
    };
    commandCenterMapAttable.addTo(macarte);

    var commandCenterMapAttableUMAP = L.control({ position: 'topleft' });
    commandCenterMapAttableUMAP.onAdd = function (macarte) {
        var span = L.DomUtil.create('a', 'commandCenterMapAttableUMAP');
        span.innerHTML += '<a title="Voir en plein écran et voir les places de parkings disponibles"  alt="FS" <a href="//umap.openstreetmap.fr/fr/map/parking-esplanade_742065"> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg></a>';
        return span;
    };
    commandCenterMapAttableUMAP.addTo(macarte);
    /* AJOUT bouton aller à l'origine */



    // let cercle = L.circle([geolocs["CDG69"].lat, geolocs["CDG69"].lon], {
    //     color: '#1d96e5',
    //     fillColor: '#3b647e',
    //     fillOpacity: 0.5,
    //     radius: 1000
    // }).addTo(macarte);
    //cercle.bindPopup("<b>Centre de gestion de la fonction publique territoriale du Rhône et de la Métropole de Lyon</b><br>9, allée Alban Vistel<br> 69110 Sainte Foy-lès-Lyon");
}
window.onload = function () {

    initMap();
    geoloc();
    /* masque le bouton de loading*/
    $(".custom-load").hide();

    /* gestion du clic sur le bouton centrer sur local Attable*/
    $(".commandCenterMapAttable").click(function () {
        macarte.flyTo([45.734369, 4.779929], 19);
    });

    /*  affiche le bouton de loading parfois le chargement peut prendre du temps */
    $(".commandCenterMapAttableUMAP").click(function () {
        $(".custom-load").show();
    });

    $("#close").click(function () {
        $(".custom-load").hide();
    });

/* 
.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.1); }

*/
};
    /*  affiche le bouton de loading parfois le chargement peut prendre du temps */
   
    /* enleve le loading juste avant de quitter la page*/
    window.addEventListener('unload', function (event) {
        $(".custom-load").hide();
    });