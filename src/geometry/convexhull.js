import { pointCompare } from './point';

function makeHullPresorted(points) {
    if (points.length <= 1)
        return points.slice();
    // Andrew's monotone chain algorithm. Positive y coordinates correspond to "up"
    // as per the mathematical convention, instead of "down" as per the computer
    // graphics convention. This doesn't affect the correctness of the result.
    var upperHull = [];
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        while (upperHull.length >= 2) {
            var q = upperHull[upperHull.length - 1];
            var r = upperHull[upperHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                upperHull.pop();
            else
                break;
        }
        upperHull.push(p);
    }
    upperHull.pop();
    var lowerHull = [];
    for (var i = points.length - 1; i >= 0; i--) {
        var p = points[i];
        while (lowerHull.length >= 2) {
            var q = lowerHull[lowerHull.length - 1];
            var r = lowerHull[lowerHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                lowerHull.pop();
            else
                break;
        }
        lowerHull.push(p);
    }
    lowerHull.pop();
    if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
        return upperHull;
    else
        return upperHull.concat(lowerHull);
}

export function makeHull(points) {
    var newPoints = points.slice();
    newPoints.sort(pointCompare);
    return convexhull.makeHullPresorted(newPoints);
}