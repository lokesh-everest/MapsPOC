function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}
function decode(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
        a = null, h = 0, i = 0;
        do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
        n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
        do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
        o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
    }

    return d = d.map(function(t) {
        return {
            latitude: t[0],
            longitude: t[1],
        };
    });
}
export function fetchRoute( origin, waypoints, destination, apikey) {

    // Define the URL to call. Only add default parameters to the URL if it's a string.
    const directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
    const mode = 'DRIVING';
	const language = 'en';
    let url = directionsServiceBaseUrl;
    if (!waypoints || !waypoints.length) {
        waypoints = '';
    }else {
        waypoints = waypoints
            .map(waypoint => (waypoint.latitude && waypoint.longitude) ? `${waypoint.latitude},${waypoint.longitude}` : waypoint)
            .join('|');
    }
    if (typeof (directionsServiceBaseUrl) === 'string') {
        url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apikey}&mode=${mode}&language=${language}`;
    }

    return fetch(url)
        .then(response => response.json())
        .then(json => {

            if (json.status !== 'OK') {
                const errorMessage = json.error_message || 'Unknown error';
                return Promise.reject(errorMessage);
            }

            if (json.routes.length) {

                const route = json.routes[0];

                return Promise.resolve({
                    distance: route.legs.reduce((carry, curr) => {
                        return carry + curr.distance.value;
                    }, 0) / 1000,
                    duration: route.legs.reduce((carry, curr) => {
                        return carry + curr.duration.value;
                    }, 0) / 60,
                    coordinates: decode(route.overview_polyline.points),
                });

            } else {
                return Promise.reject();
            }
        });
}