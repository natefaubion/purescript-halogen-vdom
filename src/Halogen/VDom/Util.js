"use strict";

exports.forE = function (a, f) {
  return function () {
    var b = [];
    for (var i = 0; i < a.length; i++) {
      b.push(f(i, a[i])());
    }
    return b;
  };
};

exports.forInE = function (o, f) {
  return function () {
    var ks = Object.keys(o);
    for (var i = 0; i < ks.length; i++) {
      var k = ks[i];
      f(k, o[k])();
    }
  };
};

exports.replicateE = function (n, f) {
  return function () {
    for (var i = 0; i < n; i++) {
      f();
    }
  };
};

exports.diffWithIxE = function (a1, a2, f1, f2, f3) {
  return function () {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i  = 0;
    while (1) {
      if (i < l1) {
        if (i < l2) {
          a3.push(f1(i, a1[i], a2[i])());
        } else {
          f2(i, a1[i])();
        }
      } else if (i < l2) {
        a3.push(f3(i, a2[i])());
      } else {
        break;
      }
      i++;
    }
    return a3;
  };
};

exports.strMapWithIxE = function (as, fk, f) {
  return function () {
    var o = {};
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      var k = fk(a);
      o[k] = f(k, i, a)();
    }
    return o;
  };
};

exports.diffWithKeyAndIxE = function (o1, as, fk, f1, f2, f3) {
  return function () {
    var o2 = {};
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      var k = fk(a);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i, o1[k], a)();
      } else {
        o2[k] = f3(k, i, a)();
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k])();
    }
    return o2;
  };
};

exports.refEq = function (a, b) {
  return a === b;
};
