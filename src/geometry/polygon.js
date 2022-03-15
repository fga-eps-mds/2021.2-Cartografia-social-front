import {cross, comparePoints, ccw} from './point';

export function signedArea(points) {
  let result = 0.0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    result += cross(points[i], points[(i + 1) % n]);
  }
  return result / 2.0;
}

export function leftIndex(points) {
  let ans = 0;
  for (let i = 1; i < points.length; i++) {
    if (comparePoints(points[i], points[ans]) < 0) {
      ans = i;
    }
  }
  return ans;
}

function arrayRotate(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push(arr.shift());
  }
  return arr;
}

export function makePolygon(points) {
  if (signedArea(points) > 0) {
    points.reverse();
  }
  const li = leftIndex(points);
  return arrayRotate(points, li).sort((a, b) => a.x - b.x);
}

export function isConvex(points) {
  const n = points.length;
  if (n < 3) return false;
  const left = ccw(points[0], points[1], points[2]); // Check the points in ccw order
  for (let i = 1; i < n; i++) {
    if (ccw(points[i], points[(i + 1) % n], points[(i + 2) % n]) !== left) {
      return false;
    }
  }
  return true;
}
