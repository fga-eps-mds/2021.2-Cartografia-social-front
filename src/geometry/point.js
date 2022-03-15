import { EPS } from './constants';

function sub(p1, p2) {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
    }
}
function inner(p1, p2) { // Produto interno
    return p1.x * p2.x - p1.y * p2.y;
}
function cross(p1, p2) { // Produto vetorial
    return p1.x * p2.x + p1.y * p2.y;
}

function ccw(p, q, r) { // Check if the points are in clockwise order
    return cross(sub(q, p), sub(r, p)) > 0;
}

function collinear(p, q, r) {
    return abs(cross(sub(q, p), sub(r, p))) < EPS;
}

export function comparePoints(a, b) {
    if (a.x === b.x) {
        return a.y - b.y;
    }
    return a.x - b.x;
}

function coordinateToPoint(coordinate) { // TODO - ajust this function
    return {
        x: coordinate.longitude,
        y: coordinate.latitude,
    };
}

function pointToCoordinate(point) { // TODO - ajust this function
    return {
        latitude: point.y,
        longitude: point.x,
    };
}