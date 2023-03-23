(function(Scratch) {
'use strict';
function setcss (){
vm.renderer.canvas.style.filter = 'blur(' + blur + 'px) contrast(' + contrast + ') saturate(' + saturation + '%) hue-rotate(' + color + 'deg) brightness(' + brightness + '%) invert(' + invert + '%)';
vm.renderer.canvas.style.imageRendering = rendermode;}
var blur = 0;
var contrast = 1;
var saturation = 100;
var color = 0;
var brightness = 100;
var invert = 0;
var rendermode = 'Default';
const vm = Scratch.vm;
if (!Scratch.extensions.unsandboxed) {
throw new Error('This extension must run unsandboxed');}
class CanvasEffects {
getInfo() {return {
id: 'CanvasEffects',
name: 'CanvasEffects',
blocks: [{
opcode: 'seteffect',
blockType: Scratch.BlockType.COMMAND,
text: 'Set Canvas [EFFECT] to [NUMBER]',
arguments: {
EFFECT: {
type: Scratch.ArgumentType.STRING,
menu: 'EFFECTMENU'},
NUMBER: {
type: Scratch.ArgumentType.NUMBER}},},{
opcode: 'setrendermode',
blockType: Scratch.BlockType.COMMAND,
text: 'Set Canvas render mode [EFFECT]',
arguments: {
EFFECT: {
type: Scratch.ArgumentType.STRING,
menu: 'RENDERMODE'}},},{
opcode: 'cleareffects',
blockType: Scratch.BlockType.COMMAND,
text: 'Clear Canvas effects'},{
opcode: 'refreshcheck',
blockType: Scratch.BlockType.BOOLEAN,
text: 'Is Canvas clear?'},{
opcode: 'geteffect',
blockType: Scratch.BlockType.REPORTER,
text: 'Get Canvas property [EFFECT]',
arguments: {
EFFECT: {
type: Scratch.ArgumentType.STRING,
menu: 'EFFECTGETMENU'}}},{
opcode: 'renderscale',
blockType: Scratch.BlockType.COMMAND,
text: 'Set Canvas render size to x:[X] y:[Y]',
arguments: {
X: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 100},
Y: {
type: Scratch.ArgumentType.NUMBER,
defaultValue: 100}}},],
menus: {
EFFECTMENU: {
acceptReporters: true,
items: ['Blur','Contrast','Saturation','Color','Brightness','Invert'] },
RENDERMODE: {
acceptReporters: true,
items: ['Pixelated','Auto']},
EFFECTGETMENU: {
acceptReporters: true,
items: ['Blur','Contrast','Saturation','Color','Brightness','Invert','Render mode'] }}};}
geteffect({EFFECT}){
if (EFFECT == 'Blur'){return blur;}else {
if (EFFECT == 'Contrast'){return contrast;}else {
if (EFFECT == 'Saturation'){return saturation;}else {
if (EFFECT == 'Color'){return color;}else {
if (EFFECT == 'Brightness'){return brightness;}else {
if (EFFECT == 'Invert'){return invert;}else {
if (EFFECT == 'Render mode'){return rendermode;}else {return ''}}}}}}}}setrendermode({EFFECT}){rendermode = EFFECT;setcss();}seteffect({EFFECT, NUMBER}) {
if (EFFECT == 'Blur'){blur = NUMBER;}else{if (EFFECT == 'Contrast'){contrast = NUMBER;}else{
if (EFFECT == 'Saturation'){saturation = NUMBER;}else{
if (EFFECT == 'Color'){color = NUMBER;}else{
if (EFFECT == 'Brightness'){brightness = NUMBER;}else{
if (EFFECT == 'Invert'){invert = NUMBER;}}}}}}
setcss();}
cleareffects(){
blur = 0;
contrast = 1;
saturation = 100;
color = 0;
brightness = 100;
invert = 0;
rendermode = 'Default';
vm.renderer.canvas.style.filter = '';
vm.renderer.canvas.style.imageRendering = '';}
//people can use this to detect if Scratch refreshed the canvas css values, and reapply them
refreshcheck(){
if (vm.renderer.canvas.style.filter == '' & vm.renderer.canvas.style.imageRendering == '' ){return true}else{return false}}
renderscale({X,Y}){
vm.renderer.resize(X,Y);}}
Scratch.extensions.register(new CanvasEffects());})(Scratch);
