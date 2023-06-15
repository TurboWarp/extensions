(function (Scratch) {
'use strict';
var generaltextcolor;
var generalbordercolor = '#c5cbd8';
var variablestyle1;
var variablestyle2;
var variablestyle3;
var variablestyle4;
var variablestyle5;
var variablestyle6;
var variableboxcolor;
var variablevalueboxcolor;
var variablevaluetextcolor;
var listfootercolor;
var listlabelcolor;
var listvaluetextcolor;
var listvalueboxcolor;
var listvalueboxcornerradius;
var variablebalueboxcornerradius;
var monitorroot;
var monitorroot2;
var monitorvalue;
var monitorlistlabel;
var monitorlistfooter;
var monitorrowvalueouter;
var monitorrowsinner;
var monitorrowindex;
var monitorvaluelarge;
var generalcornerradius;
var itterationtestvarpos = 0;
var scrollrule = 'allowed';
var bordersize = 1;
var ineditor = false;
var itterationtest = 0;

// Credit to skyhigh173 for the idea of this
const label = (name, hidden) => ({
blockType: Scratch.BlockType.LABEL,
text: name,
hideFromPalette: hidden
});

if (Scratch.vm.runtime.isPackaged == true) {
console.log('CustomCSS - Using packaged index');
ineditor = false;
monitorroot = '.sc-monitor-root';
monitorroot2 = '.sc-monitor-root[opcode^="data_"] .sc-monitor-value-color';
monitorvalue = '.sc-monitor-value';
monitorlistlabel = '.sc-monitor-list-label';
monitorlistfooter = '.sc-monitor-list-footer';
monitorrowvalueouter = '.sc-monitor-row-value-outer';
monitorrowsinner = '.sc-monitor-rows-inner';
monitorrowindex = '.sc-monitor-row-index';
monitorvaluelarge = '.sc-monitor-large-value';
} else {
console.log('CustomCSS - Using editor index');
ineditor = true;
monitorroot = 'div[class^="monitor_monitor-container"]';
monitorroot2 = 'div[class^="monitor_value"]';
monitorvalue = 'div[class^="monitor_value"]';
monitorlistlabel = 'div[class^="monitor_list-header"]';
monitorlistfooter = 'div[class^="monitor_list-footer"]';
monitorrowvalueouter = 'div[class^="monitor_list-value"]';
monitorrowsinner = 'div[class^="monitor_list-body"]';
monitorrowindex = 'div[class^="monitor_list-index"]';
monitorvaluelarge = 'div[class^="monitor_large-value"]';
}

const ColorIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAABbmlDQ1BpY2MAACiRdZE7SwNBFIW/xEfEBym0ELHYQiVFAqIglhqLNEEkKhi1ScZsIiRx2U2QYCvYWAgWoo2vwn+grWCrIAiKIGJn76sRWe8kQoIkM8zej7NzLnfPgjeaVTmneQJy+YIdi4SNhfii4XullS7ZAXwJ5ViTMzNRGq6vezy63oV0r8b36q6OlZSjwNMmPKYsuyAs0xBdL1iat4V7VCaxInwkHLRlQOFrrScr/KI5XeEPzfZcbAq8uqeRruFkDauMnRMOCA/kskX1N4/+ks5Ufn5Wap+cfhxiRAhjkKTIKlkKhKTmJbP6vuGyb5o18Sh5WpSwxZEmI96gqEXpmpJqip6SnaWkc/+fp2OOjlS6d4ah5dl13wfBtws/O677fey6PyfQ9ASX+ap/TXIa/xR9p6oNHIJ/E86vqlpyDy62oPfRStiJstQkx2ua8HYGXXHovoX2pUpWf+85fYC5DflFN7B/AENy37/8C97bZ/ptCpHvAAAACXBIWXMAAAsSAAALEgHS3X78AAADqUlEQVR4Xu2Z23LcMAxDN53+/y+ncWedehVJAHiTvXXfUlMkeATdZh+P+99N4CZwE3hfAh8Xbu3Tqd3Vu2uwU7hnuBfaqDbNgw70dBk8NgvaUSbkAgOCm/amq4C2a5yy+eXtpHB8JTTY1lUctwrakM9viPYaAaoB3BOhFlyBETUZ0cOoxjD3lfa43qRFQDOZ4ezgZm5bBm0jfXZwJjdUDLoquKVuO7vj0KEQZSxTnas6LgqaOc8NbozubZ5c1BvSbCFx4FkdZ9p3xN63cHOd6ieXWagBSuqQimM9G5anB/mpVbVfZENrXaVAdL1KzrrHWZfZBqNkspQZUpuhG2gDg0X10rnclvlyMENTZ4eIT3HhKZfqiPpOgJ6VV6r7MLfbtrQZ1xFjX3PvtEmPfwtLO0xbtOOQMKpHKujAOWgtSmWjwc1s0xXW/qekvqkWBJDYNh8Pj862gLJ3IGf+EC8PeGYgGyTD/smKcpzalyyUskEniHShqj/McYrbju1RgqkgkiyYMXpCIxzn6YsWSnKBYUAs3YsXHCrEgGFiIBAlgFy+05RecPIpOhhQDm/TMZh1ZIa/LXjAUQUEJwzhbR+KycLerC8HlDilz2NSJECYMFOox3GjginQ5KPYhONl0HRuLOBWTzaFJHv2LOCiDgQKgCcoE54KznrR9fS/jV1wPswlq+C8ANB4ZJKP6H3Cmk8Bt9JtCHj5d+t1JFMocl1mbTo367hVbqMbSQicTuAZHedm8NVx+l2Zcdz/6DY4eQw4mKQyoHHTj9Loe09rxxlwn/WAg8krgU7efyk6PeCWcRm5yuK2ThMU6EuCez4lvhvcgHmhqRdhdKqq+Upd6IVldds27rKOK52hTjEEjlrvq5uIqv+1vOgVhsBFaXq7PIyjll+Ae05Q9jfFSe3BM5pxr+Noa1stN2pagPHJuEPVx4BDdSN+plR1s/FpE8uAe7oXak0TCSv3A8x6GDez4FjtZrFsgbPEKeDQkt17OsPSTZ9ABRy7ZEsATk7VdGgqiHaVqAJZx/5Yje2eY4WmCEbXHXMzz+4ULTsQb83RNge1wIBDZgROXaqtaMvvnfseqPSBzgQmV+iERSZjxCMAFj1M3e+8zFWDeT1YhKLmmUZQjt536w8wLz0y4NAy9R4OqPksgKju8XvXGAjeanDHa4nSbFTsdDWN4DHQsh3nvb54AGZsQS960gsMus9cxiU9lRQhrBMBsrSX0mIEQPVyexX9jtbvoTeBm4CDwB/Fgod+niXXXwAAAABJRU5ErkJggg==';
const BorderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAABbmlDQ1BpY2MAACiRdZE7SwNBFIW/xEfEBym0ELHYQiVFAqIglhqLNEEkKhi1ScZsIiRx2U2QYCvYWAgWoo2vwn+grWCrIAiKIGJn76sRWe8kQoIkM8zej7NzLnfPgjeaVTmneQJy+YIdi4SNhfii4XullS7ZAXwJ5ViTMzNRGq6vezy63oV0r8b36q6OlZSjwNMmPKYsuyAs0xBdL1iat4V7VCaxInwkHLRlQOFrrScr/KI5XeEPzfZcbAq8uqeRruFkDauMnRMOCA/kskX1N4/+ks5Ufn5Wap+cfhxiRAhjkKTIKlkKhKTmJbP6vuGyb5o18Sh5WpSwxZEmI96gqEXpmpJqip6SnaWkc/+fp2OOjlS6d4ah5dl13wfBtws/O677fey6PyfQ9ASX+ap/TXIa/xR9p6oNHIJ/E86vqlpyDy62oPfRStiJstQkx2ua8HYGXXHovoX2pUpWf+85fYC5DflFN7B/AENy37/8C97bZ/ptCpHvAAAACXBIWXMAAAsSAAALEgHS3X78AAAB+ElEQVR4Xu3crU4DQRiFYf4CAkuCQ4JDYhFwVRgE14TmAhA4HBaBQCEIhJ/vS0pK6Gwy86aEYffdZMx2T3fm6elSw6yseCiggAIKKFApsB7Xncf4mPi4i/UflMwSqHRcxMmTGHuV0GO9bC0Wth3j8ucCVwdW/Bbn87Wh18cKVVrXe5xcKNgQTH5FPeYCC05ZRQ8gIBxAy8hGYy7/ylzH+HoGNsa7vTwfTTsxTkvPs9KsW+Gu4k3OYrx2S8Anlj87jn8LLpv2OGscn2KfyeeWabU+4/L6od9+Lfft8dqmb18rXI8L/pM5CQfZhRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsCYjRMOCsxjTZvTtDbuJe6TY4zHUyyqeqOapv9DjzfejXE0w2v6hDqXTrD9GNVFat0iKD+V3AWi+pPpHOz79LZmxSiZLJxrhftHDkudqnsrLYuz+ju9rBuO5X2G4O5jgfk8m/qRO/s8lBCGdq25jYs3YxxOXC7Rci+pm4k7uHwFFFBAgRqBT7goY1S1+c1iAAAAAElFTkSuQmCC';
const GradientIcon = 'data:image/png;base64,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';
const extensionIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAABbmlDQ1BpY2MAACiRdZG7S8NQFMZ/tmpFKwo6iDh0qOKg4APEUevQpYjUCr6WNqatkLYhSZHiKrg4FBxEF1+D/4GugquCICiCiJu7r0VKPNcIFak33Jwf373f4eQL+GKGlrPrJyCXd6x4NBKaX1gMBZ5ppJV2ehhOarY5OTMT49/1cUudqjeDqtf/92qulhXd1qCuSXhMMy1HWKYhtuaYireEO7VsckX4QHjAkgGFL5We8vhJccbjN8VWIj4FPtUzlPnFqV+sZa2ccL9wOGcUtZ951JcE9fzcrNRu2T3YxIkSIUSKIqsYOAxKzUtmtX1D375pCuLR5G1SwhJHhqx4B0QtSlddalp0XR6Dksr9b552enTE6x6MQMOj6772QmAbKmXX/Tx03coR+B/gPF/1FySn8XfRy1UtvA9tG3B6UdVSO3C2CV33ZtJKfkt+2b50Gl5OoHUBOq6hecnL6uec4ztIrMsvuoLdPeiT+23LXyYnaBv57vDxAAAACXBIWXMAAAsSAAALEgHS3X78AAADVUlEQVR4Xu2cTU4kMQyFgZmrDRvugTQrzsIKae7BBs4GPQqjSEU6SdnPz66kJr1DnR/nq/ccp6jqm5v1WQQWgQkI3E4QYzXEu1+Xi0fsn++3IiZXjWoBSQdjL8QLjjbO2vq/gRslUO3CItqX8O4iJj3jHAsceFV/gv2G6fb4wAnlz6tunGlyHAuQBE8NYpnjhldcJDAJ1NyGCu7j7d+wP+41Ifi3fXmqz/H7GZ+bAi4Dy2GUf+Ph+fZMQFF45l11FkitS9BSY9m+rHG/gdOeEGaHZtGzWXGWyUfpK1XdNt4FrnL1JDv5AgfKfoFb4EACYDeT4kYrdEEGULcrcNqS5H+FRzk51OB51HhIlS8tNbSnCAq4mtaZSpSUB5DfDJ1MOc4w7/Rd3RSXyGztylTgCNRdwNXyWyvnzQqUDk67KWjb19SGbBrlONoxqOAYEBAbSndOZOxWn7U5gDQXuAUOJAB2u1LcegxCRnJZVcbpqhUV3Kw1GcKOCi4FMCM8bQ2X1kmt4/KVi7pbgiiF1ccFHHq35KgCGoFJAcc6h7ZsjtxW8j5NmHNcTyUzKUirOhM4CRhJG23QI7Q3gRthAdYYkB01zXlKcN75LQzcGe16OsVFqC1McdY8NGL/MMUlu3pbNkpthyjOCx4CDd1RzeDQAz1bfQi0nv0l7zyEWbUWKAMgG5o0n5ofupFO1Gu3B7ClAAu0lk0laqPcVkp2ZeWtNI7E/hZgadFIbnN5e1CyWKky99TnCU2qtrSW5tvAyD9tWMorITNVjVh090XfMuCR4EkV22vHgtZVXA7gLPCY0ETgvoo98IcDvKyrVR8CLc3Re6xX9IsHM8PzgCZWnMW2uW+0+lBge0rL6xErjgEvjREB0BuaWnHb3ILmPW94KDTtawpqxbHgsQGiwKTWLDckE7hR7BsNzWTVWklgsS+6idSgSY9OWntu10xRHOPE0avNthtK74AuBYba0x2cpe7rAew9CiGFZlHZNjbKsyO1xeYAGfbtwZQCY6gsBFyexBOgFBpLZaHgPABKgbFVFpLjevbytq8nsLwul121B41ZQLfm8bCmSwEsBdVqx1JgBLAhFMeq/yKBDQkuB6VR4BHQUpyH5rg9i/cAHgVsL+b1/SKwCAxF4C9m9hvNY2HwsAAAAABJRU5ErkJggg==';
const miscIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAABb2lDQ1BpY2MAACiRdZE5SwNRFIW/JGpEEwIqKGKRIi6FAVEQS41FmiASFYzaJJNNyDLMJEiwFWwsAhaijVvhP9BWsFUQBEUQsbN3aySM9yVCgsQ3vLkf571zuXMG7KGMljVbpiGbKxjhYMC7HFnxOl9pw00Xw/RGNVOfmZ8P8e/6usem6p1f9fr/XtPVGU+YGtjahSc13SgIyzSENgq64h3hHi0djQsfCY8aMqDwtdJjNX5RnKrxh2JjMTwLdtXTm2rgWANraSMrPCLsy2aK2u886ktcidzSgtR+2QOYhAkSwEuMIutkKOCXmpPMmvvGqr458uLR5K1TwhBHirR4R0UtSteE1KToCXkylFTuf/M0kxPjte6uALQ+W9b7IDh3oVK2rO9jy6qcgOMJLnN1f15ymvoUvVzXfIfg2YLzq7oW24OLbeh71KNGtCo5ZNuTSXg7A3cEum+hY7WW1e85pw+wuCm/6Ab2D2BI7nvWfgAKMGgOw1QnnAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAy9JREFUeF7tm1lOwzAQhikgxCLEYThen3tiHpAQFMaRE7Uhjme1nXgiRRVgz/LN7yUOPdxUvk6n0+3xeDzD5wuEch/D+Yi/u4OfD3Cfw8+VQ23DPYAKkH4JdxuBxyhCNYtfUWU/Usdg5wlsfMMdVPsltbeF/hSlkdsC0CqCMAUf1EYYnmRoM9tmudSqTABS4jLLL1R/z5dZgfYOzkwUxcHBHPdqlk1Bw8XBQW7ibUhBPklXDo5ZBbNVZyUeswk74dMkxxqKY9aY1c0EWojEFBwsBA9wv5XalLLQttQpACv4dLD2dGGGRVvKpecvDJghRyjmM3x8wmFAczFKnyst+0+A47MyBrhtm3gSYZm0lm1VEKaLg2qkcmOqQ1RjjlMNSM4na0Ej5+XtSO7MbDwo3OiBoUqhl+irGM7WvW4Dsequ5riNKohTgiVxkPaD4+u40Xl4RdfbhRlhY5tJqXPJYoz0Bnae78Csp+2IasEncM3sqFXTszN2qbhHOze7sjxMZ5dznM9v+PoefI7Dw7pqOSrO1UYEeBsPHYndvHlQnKuNoQOf4xjQfAPMhObgBODmD/kCU+pdU0c/TczJrc5xa+dl4rM0jRK3CA4DBtNGg0/SRmvgKEAobdUhtgSuKggq2ZbAUWOv2r4VcJtSm+/jBJptRXGcvRmnjwDVdddpiMRXg+GrPeErPjUuynCtCi0cAGOCLRlkLp6SsaTEM8SYC3TsXDLglv+7IPleNUW5JLga00TO579itvyQn0umxN+TI7KVVbUEBFUfDo6J08EZg8OuvswwttctqzjYGL9vLy2ViFfFQlFSb1uSVTZZxanUbodGHByzqNih6sN0BhijuN6goTSYU1yP0HJMBrAYxaEqsKNGKLGs0UUZ2BGweSq+HWEWd1U4PlSZVB2cg2MSYHZzxTk4JoF0N/aqitoIqoe7EYNYOL3t6bJcsg0uBNALPBQTyuIQDKKMMkfbYD9+i3H0tfTJNI/qhs4P3XDmVlt9lDi0fY+pUWIQKUgrAVLAMUst38Ecxz+vk6L6WEGDfw1wXN9D+qLOCgAl/jnwJP6u0lUzxBhCWr4xALV8TfD+AIvYJ9qOjwVzAAAAAElFTkSuQmCC';

///
function setvariableposition(X, Y, NAME) {
//console.log('Checking for variable position')
try {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).children.item(0).children.item(0).textContent == NAME) {
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.transform = 'translate(' + X + 'px,' + Y + 'px)';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.left = '0px';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.top = '0px';
} else {
itterationtestvarpos = itterationtestvarpos + 1;
setvariableposition(X, Y, NAME);
}
} catch (err) {
try {
if (ineditor == false) {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).className == monitorlistlabel) {
itterationtestvarpos = itterationtestvarpos + 1;
setvariableposition(X, Y, NAME);
}
} else {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).className == 'monitor_list-monitor_1FdIj') {
itterationtestvarpos = itterationtestvarpos + 1;
setvariableposition(X, Y, NAME);
}
}

} catch (err) {}
}
}
///
function setlistposition(X, Y, NAME) {
//console.log('Checking for variable position')
try {
if (ineditor == true) {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).children.item(0).textContent == NAME) {
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.transform = 'translate(' + X + 'px,' + Y + 'px)';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.left = '0px';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.top = '0px';
} else {
itterationtestvarpos = itterationtestvarpos + 1;
setlistposition(X, Y, NAME);
}
} else {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).textContent == NAME) {
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.transform = 'translate(' + X + 'px,' + Y + 'px)';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.left = '0px';
document.querySelectorAll(monitorroot).item(itterationtestvarpos).style.top = '0px';
} else {
itterationtestvarpos = itterationtestvarpos + 1;
setlistposition(X, Y, NAME);
}
}
} catch (err) {
try {
if (ineditor == false) {
if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).className == 'sc-monitor-inner') {
itterationtestvarpos = itterationtestvarpos + 1;
setlistposition(X, Y, NAME);
}
} else {

if (document.querySelectorAll(monitorroot).item(itterationtestvarpos).children.item(0).className == 'monitor_default-monitor_2vCcZ') {
itterationtestvarpos = itterationtestvarpos + 1;
setlistposition(X, Y, NAME);
}
}
} catch (err) {}
}
}
///
function applyCSS() {
//console.log(variablestyle1)
try {
variablestyle1 = document.querySelectorAll(monitorroot).item(itterationtest).style;
variablestyle1.color = generaltextcolor;
if (ineditor == true) {
try {
document.querySelectorAll(monitorlistfooter).item(itterationtest).style.color = generaltextcolor;
document.querySelectorAll(monitorlistlabel).item(itterationtest).style.color = generaltextcolor;
} catch (err) {}
}
variablestyle1.background = variableboxcolor;
if (ineditor == true) {
try {
document.querySelectorAll(monitorrowsinner).item(itterationtest).style.background = variableboxcolor;
} catch (err) {}
}
variablestyle1.border = bordersize + 'px solid' + generalbordercolor;
variablestyle1.borderRadius = generalcornerradius + 'px';
} catch (err) {}
try {
variablestyle2 = document.querySelectorAll(monitorroot2).item(itterationtest).style;
variablestyle2.background = variablevalueboxcolor;

} catch (err) {}
try {
variablestyle3 = document.querySelectorAll(monitorvalue).item(itterationtest).style;
variablestyle3.color = variablevaluetextcolor;
variablestyle3.borderRadius = variablebalueboxcornerradius + 'px';

} catch (err) {}
try {
variablestyle4 = document.querySelectorAll(monitorlistlabel).item(itterationtest).style;
variablestyle4.background = listlabelcolor;

} catch (err) {}
try {
variablestyle5 = document.querySelectorAll(monitorlistfooter).item(itterationtest).style;
variablestyle5.background = listfootercolor;

} catch (err) {}
try {
variablestyle6 = document.querySelectorAll(monitorrowvalueouter).item(itterationtest).style;
variablestyle6.background = listvalueboxcolor;
variablestyle6.color = listvaluetextcolor;
variablestyle6.borderRadius = listvalueboxcornerradius + 'px';

} catch (err) {}
try {
if (ineditor == true) {
document.querySelectorAll(monitorrowsinner).item(itterationtest).children.item(0).style.overflow = scrollrule;
} else {
document.querySelectorAll(monitorrowsinner).item(itterationtest).style.overflow = scrollrule;
}
} catch (err) {}
///Doing this because the lists in the editor have the wrong padding
try {
if (ineditor == true) {
document.querySelectorAll(monitorlistfooter).item(itterationtest).style.padding = '5px';
}
} catch (err) {}
try {
document.querySelector(monitorroot).style;
} catch (err) {}
try {
document.querySelectorAll(monitorrowindex).item(itterationtest).style.color = generaltextcolor;
} catch (err) {}
try {
document.querySelectorAll(monitorvaluelarge).item(itterationtest).style.color = variablevaluetextcolor;
} catch (err) {}
try {
document.querySelectorAll(monitorvaluelarge).item(itterationtest).style.background = variablevalueboxcolor;
} catch (err) {}
itterationtest = itterationtest + 1;
if (document.querySelectorAll(monitorroot).item(itterationtest) !== null || document.querySelectorAll(monitorrowvalueouter).item(itterationtest) !== null) {
applyCSS();
} else {
itterationtest = 0;
setTimeout(function() {
applyCSS();
}, 0);
}

}

applyCSS();

class CustomCSS {
getInfo() {
return {
id: 'CustomCSS',
name: 'CSS',
menuIconURI: extensionIcon,
color1: '#0072d6',
blocks: [
{
func: 'plshelpimlost',
blockType: Scratch.BlockType.BUTTON,
text: 'How to use',
},
label('Looks blocks', false),
{
blockIconURI: ColorIcon,
opcode: 'changecss',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS color of [COLORABLE] to [COLOR]',
extensions: ['colours_looks'],
arguments: {
COLORABLE: {
type: Scratch.ArgumentType.STRING,
menu: 'COLORABLE_MENU'
},
COLOR: {
type: Scratch.ArgumentType.COLOR,
defaultValue: '#ff0000'
}
}
},
{
blockIconURI: GradientIcon,
opcode: 'gradientAngle',
blockType: Scratch.BlockType.REPORTER,
text: 'Make a CSS gradient with [COLOR1] and [COLOR2] at angle [ANGLE]',
extensions: ['colours_looks'],
arguments: {
COLOR1: {
type: Scratch.ArgumentType.COLOR,
defaultValue: '#ff0000'
},
COLOR2: {
type: Scratch.ArgumentType.COLOR,
defaultValue: '#6ed02d'
},
ANGLE: {
type: Scratch.ArgumentType.ANGLE,
defaultValue: '90'
}
}
},
{
blockIconURI: BorderIcon,
opcode: 'setbordersize',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS border size to [SIZE]',
extensions: ['colours_looks'],
arguments: {
SIZE: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: '2'
}
}
},
{
blockIconURI: BorderIcon,
opcode: 'setborderradius',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS roundness of [CORNER] to [SIZE]',
extensions: ['colours_looks'],
arguments: {
SIZE: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: '4'
},
CORNER: {
type: Scratch.ArgumentType.STRING,
menu: 'BORDER_MENU'
}
}
},
label('Sensing blocks', false),
{
blockIconURI: miscIcon,
opcode: 'allowscrollrule',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS list scroll rule to [SCROLLRULE]',
extensions: ['colours_sensing'],
arguments: {
SCROLLRULE: {
type: Scratch.ArgumentType.STRING,
menu: 'SCROLL_MENU'
}
}
},
label('Motion blocks', false),
{
blockIconURI: miscIcon,
opcode: 'setvarpos',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS position of variable with label [NAME] to x:[X] y:[Y]',
extensions: ['colours_motion'],
arguments: {
X: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 0
},
Y: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 0
},
NAME: {
type: Scratch.ArgumentType.STRING,
defaultValue: 'my variable'
}
}
},
{
blockIconURI: miscIcon,
opcode: 'setlistpos',
blockType: Scratch.BlockType.COMMAND,
text: 'Set CSS position of list with label [NAME] to x:[X] y:[Y]',
extensions: ['colours_motion'],
arguments: {
X: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 0
},
Y: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 0
},
NAME: {
type: Scratch.ArgumentType.STRING,
defaultValue: 'my variable'
}
}
},
],
menus: {
COLORABLE_MENU: {
acceptReporters: false,
items: ['general text',
'general background',
'general border',
'variable value box',
'varibale value text',
'list label',
'list footer',
'list value box',
'list value text'
]
},
BORDER_MENU: {
acceptReporters: false,
items: ['general borders ',
'variable value box borders',
'list value box borders'
]
},
SCROLL_MENU: {
acceptReporters: false,
items: ['auto',
'hidden'
]
}
}
};
}
changecss(args) {
if (args.COLORABLE == 'general text') {
generaltextcolor = args.COLOR;
} else {
if (args.COLORABLE == 'general background') {
variableboxcolor = args.COLOR;
} else {
if (args.COLORABLE == 'variable value box') {
variablevalueboxcolor = args.COLOR;
} else {
if (args.COLORABLE == 'varibale value text') {
variablevaluetextcolor = args.COLOR;
} else {
if (args.COLORABLE == 'list label') {
listlabelcolor = args.COLOR;
} else {
if (args.COLORABLE == 'list footer') {
listfootercolor = args.COLOR;
} else {
if (args.COLORABLE == 'list value box') {
listvalueboxcolor = args.COLOR;
} else {
if (args.COLORABLE == 'list value text') {
listvaluetextcolor = args.COLOR;
} else {
if (args.COLORABLE == 'general border') {
generalbordercolor = args.COLOR;
} else {
return '';
}
}
}
}
}
}
}
}
}
}

gradientAngle(args) {
return 'linear-gradient(' + args.ANGLE + 'deg,' + args.COLOR1 + ',' + args.COLOR2 + ')';
}

setbordersize(args) {
bordersize = args.SIZE;
}

setborderradius(args) {
//console.log(args.CORNER)
if (args.CORNER == 'general borders ') {
//console.log('test')
generalcornerradius = args.SIZE;
} else {
if (args.CORNER == 'variable value box borders') {
variablebalueboxcornerradius = args.SIZE;
} else {
if (args.CORNER == 'list value box borders') {
listvalueboxcornerradius = args.SIZE;
} else {
return '';
}
}
}
}

allowscrollrule(args) {
scrollrule = args.SCROLLRULE;
}
setvarpos(args) {
itterationtestvarpos = 0;
setvariableposition(args.X + Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2 - args.Y, args.NAME);
}

setlistpos(args) {
itterationtestvarpos = 0;
setlistposition(args.X + Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2 - args.Y, args.NAME);
}

plshelpimlost() {
alert("\nThis is a short introduction to how to use the CSS extension!\n\n𝗟𝗼𝗼𝗸𝘀 𝗯𝗹𝗼𝗰𝗸𝘀\nThese blocks change the appearance of the variable and list didsplays. You can use the drop-down menu to select what component you want to modify. 𝙏𝙝𝙚 𝙘𝙤𝙡𝙤𝙧 𝙗𝙡𝙤𝙘𝙠 modifieas the color of a component. You can use the 𝙜𝙧𝙖𝙙𝙞𝙚𝙣𝙩 block inside the color input, to create gradients instead of solid colors. 𝙏𝙝𝙚 𝙜𝙧𝙖𝙙𝙞𝙚𝙣𝙩 𝙤𝙣𝙡𝙮 𝙬𝙤𝙧𝙠𝙨 𝙤𝙣 𝙘𝙚𝙧𝙩𝙖𝙞𝙣 𝙘𝙤𝙢𝙥𝙤𝙣𝙚𝙣𝙩𝙨! The 𝙗𝙤𝙧𝙙𝙚𝙧 𝙗𝙡𝙤𝙘𝙠𝙨 modify the borders of certain components.\n\n𝗦𝗲𝗻𝘀𝗶𝗻𝗴 𝗯𝗹𝗼𝗰𝗸𝘀\nThese blocks can change the behaviour of certain components. The 𝙨𝙘𝙧𝙤𝙡𝙡 𝙧𝙪𝙡𝙚 block change the behaviour for lists. On 'auto' they will show the scroll bar, and allow you to school, but on 'hidden', they won't let you do that, and the scroll bar will be hidden.\n\n𝗠𝗼𝘁𝗶𝗼𝗻 𝗯𝗹𝗼𝗰𝗸𝘀\nThese blocks allow you to move variable and list displays around. You need to use their 𝙡𝙖𝙗𝙚𝙡 𝙣𝙖𝙢𝙚. The label name is the text that displays on the display. For example, a public variable will be like 'my variable', and a 'for this sprite only variable' will be like 'Sprite1: my variable'.")
}

}

// "Extension" option reimplementation by Xeltalliv
const runtime = Scratch.vm.runtime;
const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
const res = cbfsb(blockInfo, categoryInfo);
if (blockInfo.extensions) {
if (!res.json.extensions) res.json.extensions = [];
res.json.extensions.push(...blockInfo.extensions);
}
return res;
};

Scratch.extensions.register(new CustomCSS());
})(Scratch);