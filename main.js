!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t,n)=>{const o=document.createElement("div");o.id=e,o.className="div-style",document.querySelector("#"+t).append(o),((e,t)=>{const n=document.createElement("div");n.className="div-heading",n.textContent=e,document.querySelector(t).append(n)})(n,"#"+e)},r=()=>{const e=document.createElement("div");e.id="project-content",document.querySelector("#project-div").append(e),["Project - 1","Project - 2"].forEach(e=>{const t=document.createElement("div");t.classList.add("project-title"),t.textContent=e,document.querySelector("#project-content").append(t)})};(e=>{const t=document.createElement("div");t.textContent=e,t.id="heading",document.querySelector("#content").append(t)})("Clumsyknight's TODO List"),(()=>{const e=document.createElement("div");e.id="container",document.querySelector("#content").append(e),o("project-div","container","Projects"),r(),o("todo-div","container","TODOs")})()}]);