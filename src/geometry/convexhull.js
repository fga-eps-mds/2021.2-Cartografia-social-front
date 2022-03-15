import { comparePoints } from './point';

function makeHullPresorted(points) {
    if (points.length <= 1) return points.slice();

    const upperHull = [];
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        while (upperHull.length >= 2) {
            let q = upperHull[upperHull.length - 1];
            let r = upperHull[upperHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                upperHull.pop();
            else break;
        }
        upperHull.push(p);
    }
    upperHull.pop();
    const lowerHull = [];
    for (let i = points.length - 1; i >= 0; i--) {
        let p = points[i];
        while (lowerHull.length >= 2) {
            let q = lowerHull[lowerHull.length - 1];
            let r = lowerHull[lowerHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                lowerHull.pop();
            else break;
        }
        lowerHull.push(p);
    }
    lowerHull.pop();
    if (
        upperHull.length === 1 &&
        lowerHull.length === 1 &&
        upperHull[0].x === lowerHull[0].x &&
        upperHull[0].y === lowerHull[0].y
    )
        return upperHull;
    return upperHull.concat(lowerHull);
}

export function makeHull(points) {
    const newPoints = points.slice();
    newPoints.sort(comparePoints);
    return makeHullPresorted(newPoints);
}
