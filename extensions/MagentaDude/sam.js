// Name: SAM
// ID: samtts
// Description: Use the classic SAM text-to-speech voice via SamJs.
// By: MagentaDude <https://scratch.mit.edu/users/MagentaDude1359/>
// By: lselden
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The SAM extension must run unsandboxed");
  }

  // SamJs library taken from https://discordier.github.io/sam/dist/samjs.min.js
  // The SamJs code in this extension does not have a license due to being reverse engineered from a commercial software
  // All of the other code in this extension is under the MIT license though

  /* eslint-disable */
  // prettier-ignore
  function initSamJs() {
    // emulate commonjs environment so iife wrapper below doesn't pollute globals
    const exports = {}; const module = {exports};
    /**
     * This is SamJs.js v0.3.0
     *
     * A Javascript port of "SAM Software Automatic Mouth".
     *
     * (c) 2017-2024 Christian Schiffler
     *
     * @link(https://github.com/discordier/sam)
     *
     * @author 2017 Christian Schiffler <c.schiffler@cyberspectrum.de>
     */
    function H(){let Y=(H,e)=>0!=(H&e),r=H=>{let A=new Uint8Array(H.length);return H.split("").forEach((H,e)=>{A[e]=H.charCodeAt(0)}),A},t=H=>{var e=new Uint8Array(4);return e[0]=H,e[1]=H>>8,e[2]=H>>16,e[3]=H>>24,e},O=H=>{var e=new Uint8Array(2);return e[0]=H,e[1]=H>>8,e},I=null,R=H=>{let e=new Uint8Array(44+H.length),A=0,E=H=>{e.set(H,A),A+=H.length};return E(r("RIFF")),E(t(H.length+12+16+8-8)),E(r("WAVE")),E(r("fmt ")),E(t(16)),E(O(1)),E(O(1)),E(t(22050)),E(t(22050)),E(O(1)),E(O(8)),E(r("data")),E(t(H.length)),E(H),e},l={" ":0,"!":2,'"':2,"#":2,$:2,"%":2,"&":2,"'":130,"(":0,")":0,"*":2,"+":2,",":2,"-":2,".":2,"/":2,0:3,1:3,2:3,3:3,4:3,5:3,6:3,7:3,8:3,9:3,":":2,";":2,"<":2,"=":2,">":2,"?":2,"@":2,A:192,B:168,C:176,D:172,E:192,F:160,G:184,H:160,I:192,J:188,K:160,L:172,M:168,N:172,O:192,P:160,Q:160,R:172,S:180,T:164,U:192,V:168,W:168,X:176,Y:192,Z:188,"[":0,"\\":0,"]":0,"^":2,_:0,"`":32},n=128,U=(H,e)=>0!=(l[H]&e),N=(H,e,A)=>U(H[e],A),W=(H,e)=>-1!==e.indexOf(H),A=H=>{let e=H.split("="),E=e.pop(),A=e.join("=").split("("),r=A.pop().split(")"),t=A[0],O=r[0],R=r[1],I=["T","C","S"],Y=["E","I","Y"],l=(H,e,A)=>{if(H.startsWith(O,e)&&((e,A)=>{for(let H=t.length-1;-1<H;H--){var E=t[H];if(U(E,n)){if(e[--A]!==E)return!1}else if(!{" ":()=>!N(e,--A,n),"#":()=>N(e,--A,64),".":()=>N(e,--A,8),"&":()=>N(e,--A,16)||W(e.substr(--A,2),["CH","SH"]),"@":()=>{var H;return!!N(e,--A,4)||"H"===(H=e[A])&&!!W(H,I)},"^":()=>N(e,--A,32),"+":()=>W(e[--A],Y),":":()=>{for(;0<=A&&N(e,A-1,32);)A--;return!0}}[E]())return!1}return!0})(H,e)&&((e,A)=>{for(let H=0;H<R.length;H++){var E=R[H];if(U(E,n)){if(e[++A]!==E)return!1}else if(!{" ":()=>!N(e,++A,n),"#":()=>N(e,++A,64),".":()=>N(e,++A,8),"&":()=>N(e,++A,16)||W(e.substr(++A-2,2),["HC","HS"]),"@":()=>{var H;return!!N(e,++A,4)||"H"===(H=e[A])&&!!W(H,I)},"^":()=>N(e,++A,32),"+":()=>W(e[++A],Y),":":()=>{for(;N(e,A+1,32);)A++;return!0},"%":()=>{if("E"!==e[A+1])return"ING"===e.substr(A+1,3)&&(A+=3,!0);if(N(e,A+2,n)){if(!W(e[A+2],["R","S","D"]))return"L"!==e[A+2]?"FUL"===e.substr(A+2,3)&&(A+=4,!0):"Y"===e[A+3]&&(A+=3,!0);A+=2}else A++;return!0}}[E]())return!1}return!0})(H,e+(O.length-1)))return A(E,O.length),!0};return l.c=O[0],l},S={},f=(" (A.)=EH4Y. |(A) =AH| (ARE) =AAR| (AR)O=AXR|(AR)#=EH4R| ^(AS)#=EY4S|(A)WA=AX|(AW)=AO5| :(ANY)=EH4NIY|(A)^+#=EY5|#:(ALLY)=ULIY| (AL)#=UL|(AGAIN)=AXGEH4N|#:(AG)E=IHJ|(A)^%=EY|(A)^+:#=AE| :(A)^+ =EY4| (ARR)=AXR|(ARR)=AE4R| ^(AR) =AA5R|(AR)=AA5R|(AIR)=EH4R|(AI)=EY4|(AY)=EY5|(AU)=AO4|#:(AL) =UL|#:(ALS) =ULZ|(ALK)=AO4K|(AL)^=AOL| :(ABLE)=EY4BUL|(ABLE)=AXBUL|(A)VO=EY4|(ANG)+=EY4NJ|(ATARI)=AHTAA4RIY|(A)TOM=AE|(A)TTI=AE| (AT) =AET| (A)T=AH|(A)=AE| (B) =BIY4| (BE)^#=BIH|(BEING)=BIY4IHNX| (BOTH) =BOW4TH| (BUS)#=BIH4Z|(BREAK)=BREY5K|(BUIL)=BIH4L|(B)=B| (C) =SIY4| (CH)^=K|^E(CH)=K|(CHA)R#=KEH5|(CH)=CH| S(CI)#=SAY4|(CI)A=SH|(CI)O=SH|(CI)EN=SH|(CITY)=SIHTIY|(C)+=S|(CK)=K|(COMMODORE)=KAA4MAHDOHR|(COM)=KAHM|(CUIT)=KIHT|(CREA)=KRIYEY|(C)=K| (D) =DIY4| (DR.) =DAA4KTER|#:(DED) =DIHD|.E(D) =D|#:^E(D) =T| (DE)^#=DIH| (DO) =DUW| (DOES)=DAHZ|(DONE) =DAH5N|(DOING)=DUW4IHNX| (DOW)=DAW|#(DU)A=JUW|#(DU)^#=JAX|(D)=D| (E) =IYIY4|#:(E) =|':^(E) =| :(E) =IY|#(ED) =D|#:(E)D =|(EV)ER=EH4V|(E)^%=IY4|(ERI)#=IY4RIY|(ERI)=EH4RIH|#:(ER)#=ER|(ERROR)=EH4ROHR|(ERASE)=IHREY5S|(ER)#=EHR|(ER)=ER| (EVEN)=IYVEHN|#:(E)W=|@(EW)=UW|(EW)=YUW|(E)O=IY|#:&(ES) =IHZ|#:(E)S =|#:(ELY) =LIY|#:(EMENT)=MEHNT|(EFUL)=FUHL|(EE)=IY4|(EARN)=ER5N| (EAR)^=ER5|(EAD)=EHD|#:(EA) =IYAX|(EA)SU=EH5|(EA)=IY5|(EIGH)=EY4|(EI)=IY4| (EYE)=AY4|(EY)=IY|(EU)=YUW5|(EQUAL)=IY4KWUL|(E)=EH| (F) =EH4F|(FUL)=FUHL|(FRIEND)=FREH5ND|(FATHER)=FAA4DHER|(F)F=|(F)=F| (G) =JIY4|(GIV)=GIH5V| (G)I^=G|(GE)T=GEH5|SU(GGES)=GJEH4S|(GG)=G| B#(G)=G|(G)+=J|(GREAT)=GREY4T|(GON)E=GAO5N|#(GH)=| (GN)=N|(G)=G| (H) =EY4CH| (HAV)=/HAE6V| (HERE)=/HIYR| (HOUR)=AW5ER|(HOW)=/HAW|(H)#=/H|(H)=| (IN)=IHN| (I) =AY4|(I) =AY|(IN)D=AY5N|SEM(I)=IY| ANT(I)=AY|(IER)=IYER|#:R(IED) =IYD|(IED) =AY5D|(IEN)=IYEHN|(IE)T=AY4EH|(I')=AY5| :(I)^%=AY5| :(IE) =AY4|(I)%=IY|(IE)=IY4| (IDEA)=AYDIY5AH|(I)^+:#=IH|(IR)#=AYR|(IZ)%=AYZ|(IS)%=AYZ|I^(I)^#=IH|+^(I)^+=AY|#:^(I)^+=IH|(I)^+=AY|(IR)=ER|(IGH)=AY4|(ILD)=AY5LD| (IGN)=IHGN|(IGN) =AY4N|(IGN)^=AY4N|(IGN)%=AY4N|(ICRO)=AY4KROH|(IQUE)=IY4K|(I)=IH| (J) =JEY4|(J)=J| (K) =KEY4| (K)N=|(K)=K| (L) =EH4L|(LO)C#=LOW|L(L)=|#:^(L)%=UL|(LEAD)=LIYD| (LAUGH)=LAE4F|(L)=L| (M) =EH4M| (MR.) =MIH4STER| (MS.)=MIH5Z| (MRS.) =MIH4SIXZ|(MOV)=MUW4V|(MACHIN)=MAHSHIY5N|M(M)=|(M)=M| (N) =EH4N|E(NG)+=NJ|(NG)R=NXG|(NG)#=NXG|(NGL)%=NXGUL|(NG)=NX|(NK)=NXK| (NOW) =NAW4|N(N)=|(NON)E=NAH4N|(N)=N| (O) =OH4W|(OF) =AHV| (OH) =OW5|(OROUGH)=ER4OW|#:(OR) =ER|#:(ORS) =ERZ|(OR)=AOR| (ONE)=WAHN|#(ONE) =WAHN|(OW)=OW| (OVER)=OW5VER|PR(O)V=UW4|(OV)=AH4V|(O)^%=OW5|(O)^EN=OW|(O)^I#=OW5|(OL)D=OW4L|(OUGHT)=AO5T|(OUGH)=AH5F| (OU)=AW|H(OU)S#=AW4|(OUS)=AXS|(OUR)=OHR|(OULD)=UH5D|(OU)^L=AH5|(OUP)=UW5P|(OU)=AW|(OY)=OY|(OING)=OW4IHNX|(OI)=OY5|(OOR)=OH5R|(OOK)=UH5K|F(OOD)=UW5D|L(OOD)=AH5D|M(OOD)=UW5D|(OOD)=UH5D|F(OOT)=UH5T|(OO)=UW5|(O')=OH|(O)E=OW|(O) =OW|(OA)=OW4| (ONLY)=OW4NLIY| (ONCE)=WAH4NS|(ON'T)=OW4NT|C(O)N=AA|(O)NG=AO| :^(O)N=AH|I(ON)=UN|#:(ON)=UN|#^(ON)=UN|(O)ST=OW|(OF)^=AO4F|(OTHER)=AH5DHER|R(O)B=RAA|^R(O):#=OW5|(OSS) =AO5S|#:^(OM)=AHM|(O)=AA| (P) =PIY4|(PH)=F|(PEOPL)=PIY5PUL|(POW)=PAW4|(PUT) =PUHT|(P)P=|(P)S=|(P)N=|(PROF.)=PROHFEH4SER|(P)=P| (Q) =KYUW4|(QUAR)=KWOH5R|(QU)=KW|(Q)=K| (R) =AA5R| (RE)^#=RIY|(R)R=|(R)=R| (S) =EH4S|(SH)=SH|#(SION)=ZHUN|(SOME)=SAHM|#(SUR)#=ZHER|(SUR)#=SHER|#(SU)#=ZHUW|#(SSU)#=SHUW|#(SED)=ZD|#(S)#=Z|(SAID)=SEHD|^(SION)=SHUN|(S)S=|.(S) =Z|#:.E(S) =Z|#:^#(S) =S|U(S) =S| :#(S) =Z|##(S) =Z| (SCH)=SK|(S)C+=|#(SM)=ZUM|#(SN)'=ZUM|(STLE)=SUL|(S)=S| (T) =TIY4| (THE) #=DHIY| (THE) =DHAX|(TO) =TUX| (THAT)=DHAET| (THIS) =DHIHS| (THEY)=DHEY| (THERE)=DHEHR|(THER)=DHER|(THEIR)=DHEHR| (THAN) =DHAEN| (THEM) =DHAEN|(THESE) =DHIYZ| (THEN)=DHEHN|(THROUGH)=THRUW4|(THOSE)=DHOHZ|(THOUGH) =DHOW|(TODAY)=TUXDEY|(TOMO)RROW=TUMAA5|(TO)TAL=TOW5| (THUS)=DHAH4S|(TH)=TH|#:(TED)=TIXD|S(TI)#N=CH|(TI)O=SH|(TI)A=SH|(TIEN)=SHUN|(TUR)#=CHER|(TU)A=CHUW| (TWO)=TUW|&(T)EN =|(T)=T| (U) =YUW4| (UN)I=YUWN| (UN)=AHN| (UPON)=AXPAON|@(UR)#=UH4R|(UR)#=YUH4R|(UR)=ER|(U)^ =AH|(U)^^=AH5|(UY)=AY5| G(U)#=|G(U)%=|G(U)#=W|#N(U)=YUW|@(U)=UW|(U)=YUW| (V) =VIY4|(VIEW)=VYUW5|(V)=V| (W) =DAH4BULYUW| (WERE)=WER|(WA)SH=WAA|(WA)ST=WEY|(WA)S=WAH|(WA)T=WAA|(WHERE)=WHEHR|(WHAT)=WHAHT|(WHOL)=/HOWL|(WHO)=/HUW|(WH)=WH|(WAR)#=WEHR|(WAR)=WAOR|(WOR)^=WER|(WR)=R|(WOM)A=WUHM|(WOM)E=WIHM|(WEA)R=WEH|(WANT)=WAA5NT|ANS(WER)=ER|(W)=W| (X) =EH4KR| (X)=Z|(X)=KS| (Y) =WAY4|(YOUNG)=YAHNX| (YOUR)=YOHR| (YOU)=YUW| (YES)=YEHS| (Y)=Y|F(Y)=AY|PS(YCH)=AYK|#:^(Y)=IY|#:^(Y)I=IY| :(Y) =AY| :(Y)#=AY| :(Y)^+:#=IH| :(Y)^#=AY|(Y)=IH| (Z) =ZIY4|(Z)=Z".split("|").map(H=>{var e=(H=A(H)).c;S[e]=S[e]||[],S[e].push(H)}),'(A)=|(!)=.|(") =-AH5NKWOWT-|(")=KWOW4T-|(#)= NAH4MBER|($)= DAA4LER|(%)= PERSEH4NT|(&)= AEND|(\')=|(*)= AE4STERIHSK|(+)= PLAH4S|(,)=,| (-) =-|(-)=|(.)= POYNT|(/)= SLAE4SH|(0)= ZIY4ROW| (1ST)=FER4ST| (10TH)=TEH4NTH|(1)= WAH4N| (2ND)=SEH4KUND|(2)= TUW4| (3RD)=THER4D|(3)= THRIY4|(4)= FOH4R| (5TH)=FIH4FTH|(5)= FAY4V| (64) =SIH4KSTIY FOHR|(6)= SIH4KS|(7)= SEH4VUN| (8TH)=EY4TH|(8)= EY4T|(9)= NAY4N|(:)=.|(;)=.|(<)= LEH4S DHAEN|(=)= IY4KWULZ|(>)= GREY4TER DHAEN|(?)=?|(@)= AE6T|(^)= KAE4RIXT'.split("|").map(A)),T="*12345678".split(""),E=" *.*?*,*-*IYIHEHAEAAAHAOUHAXIXERUXOHRXLXWXYXWHR*L*W*Y*M*N*NXDXQ*S*SHF*TH/H/XZ*ZHV*DHCH**J*******EYAYOYAWOWUWB*****D*****G*****GX****P*****T*****K*****KX****ULUMUN".match(/.{1,2}/g),i=[32768,49408,49408,49408,49408,164,164,164,164,164,164,132,132,164,164,132,132,132,132,132,132,132,68,4164,4164,4164,4164,2124,3148,2124,1096,16460,9280,8256,8256,9280,64,64,9284,8260,8260,9284,8264,8256,76,8260,0,0,180,180,180,148,148,148,78,78,78,1102,1102,1102,78,78,78,78,78,78,75,75,75,1099,1099,1099,75,75,75,75,75,75,128,193,193],o=[0,4626,4626,4626,2056,2824,2312,2824,3592,3851,2822,4108,3082,1541,1541,3595,3082,3594,3082,2825,2056,2055,2825,2567,2310,2056,2054,2055,2055,2055,770,1285,514,514,514,514,514,514,1542,1542,2055,1542,1542,514,2312,1027,513,286,3597,3852,3852,3852,3598,3593,2054,513,514,1797,513,257,1798,513,514,1798,513,514,2056,514,514,1540,514,514,1798,513,1028,1798,257,1028,1479,1535],Z=(e,A)=>{var H=E.findIndex(H=>H===e+A&&"*"!==H[1]);return-1!==H&&H},P=e=>{var H=E.findIndex(H=>H===e+"*");return-1!==H&&H},b=(r,t,O)=>{for(let E=0;E<r.length;E++){let H=r[E],e=r[E+1]||"",A;if(!1!==(A=Z(H,e)))E++,t(A);else if(!1!==(A=P(H)))t(A);else{for(A=T.length;H!==T[A]&&0<A;)--A;if(0===A)throw Error();O(A)}}},D=(H,e)=>Y(i[H],e),B=23,V=57,w=69,m=1,y=2,J=8192,k=4096,Q=2048,x=1024,j=256,a=128,u=64,s=32,$=16,_=8,L=4,G=2,h=1,q=(A,E,r,t)=>{let H=(H,e)=>{switch(H){case 53:D(r(e-1),x)&&E(e,16);break;case 42:A(e+1,43,t(e));break;case 44:A(e+1,45,t(e))}},e=(H,e)=>{E(H,13),A(H+1,e,t(H))},O=-1,R;for(;null!==(R=r(++O));)if(0!==R)if(D(R,$))A(O+1,D(R,s)?21:20,t(O)),H(R,O);else if(78===R)e(O,24);else if(79===R)e(O,27);else if(80===R)e(O,28);else if(D(R,a)&&t(O))0===r(O+1)&&null!==(R=r(O+2))&&D(R,a)&&t(O+2)&&A(O+2,31,0);else{var I,Y=0===O?null:r(O-1);if(R===B)switch(Y){case w:E(O-1,42);break;case V:E(O-1,44);break;default:D(Y,a)&&E(O,18)}else 24===R&&D(Y,a)?E(O,19):60===Y&&32===R?E(O,38):60===R?(I=r(O+1),D(I,s)||null===I||E(O,63)):(72===R&&(I=r(O+1),D(I,s)&&null!==I||(E(O,75),R=75)),D(R,h)&&32===Y?E(O,R-12):D(R,h)||H(R,O),69!==R&&57!==R||0<O&&D(r(O-1),a)&&(0===(R=r(O+1))&&(R=r(O+2)),D(R,a))&&!t(O+1)&&E(O,30))}},z=(r,t,O)=>{for(let H=0;null!==r(H);H++)if(D(r(H),j)){for(var e,A=H;1<--H&&!D(r(H),a););if(0===H)break;for(;H<A;H++)D(r(H),J)&&!D(r(H),L)||(e=O(H),t(H,(e>>1)+e+1))}let R=-1,I;for(;null!==(I=r(++R));){let H=R,e,A,E;if(D(I,a))I=r(++H),D(I,u)?(e=null===I?u|h:i[I],Y(e,L)?(E=O(R),t(R,(E>>2)+E+1)):Y(e,h)&&(A=O(R),t(R,A-(A>>3)))):18!==I&&19!==I||!D(r(++H),u)||t(R,O(R)-1);else if(D(I,Q))null!==(I=r(++H))&&D(I,G)&&(t(H,6),t(H-1,5));else if(D(I,G)){for(;0===(I=r(++H)););null!==I&&D(I,G)&&(t(H,1+(O(H)>>1)),t(R,1+(O(R)>>1)))}else 0<H&&D(I,k)&&D(r(H-1),G)&&t(H,O(H)-2)}},H1=(H,e,A)=>{let E=0;for(var r;null!==(r=H(E));)D(r,u)&&null!==(r=H(E+1))&&D(r,a)&&0!==(r=e(E+1))&&r<128&&A(E,r+1),++E},e1=(H,e,A)=>{let E=0;for(var r;null!==(r=H(E));){var t=e(E);A(E,0===t||127<t?255&o[r]:o[r]>>8),E++}},A1=(A,H,e)=>{let E=-1;for(var r;null!==(r=A(++E));)if(D(r,G)){if(D(r,h)){let H,e=E;for(;0===(H=A(++e)););if(null!==H&&(D(H,_)||36===H||37===H))continue}H(E+1,r+1,e(E),255&o[r+1]),H(E+2,r+2,e(E),255&o[r+2]),E+=2}},E1=[24,26,23,23,23],r1=[0,224,230,236,243,249,0,6,12,6],M=[0,31,31,31,31,2,2,2,2,2,2,2,2,2,5,5,2,10,2,8,5,5,11,10,9,8,8,160,8,8,23,31,18,18,18,18,30,30,20,20,20,20,23,23,26,26,29,29,2,2,2,2,2,2,26,29,27,26,29,27,26,29,27,26,29,27,23,29,23,23,29,23,23,29,23,23,29,23,23,23],d=[0,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,3,2,4,4,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,0,1,0,1,0,5,5,5,5,5,4,4,2,0,1,2,0,1,2,0,1,2,0,1,2,0,2,2,0,1,3,0,2,3,0,2,160,160],K=[0,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3,3,3,1,2,3,2,1,3,3,3,3,1,1,3,3,3,2,2,3,2,3,0,0,5,5,5,5,4,4,2,0,2,2,0,3,2,0,4,2,0,3,2,0,2,2,0,2,3,0,3,3,0,3,176,160],t1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,241,226,211,187,124,149,1,2,3,3,0,114,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,25,0,0,0,0,0,0,0,0,0],O1=[0,5980947,5980947,5980947,5980947,7230474,6113550,5980947,5783320,5842971,5712919,5775125,5383440,5844244,6113550,4075794,5383182,5774866,4076306,7218448,5250317,6112527,5904395,3944978,7216654,5904395,7230217,5320198,7943686,6641158,7943686,5980945,6506758,6967046,5315078,7946758,6113550,5383440,6107913,6767114,4990984,6106890,6639366,6639366,7946758,6639365,7958022,0,5916691,5777179,5775125,5778203,5774866,5382669,5315078,5315078,5315078,7946758,7946758,7946758,7368198,7237126,7237126,6181894,6181894,6181894,5315078,5315078,5315078,7946758,7946758,7946758,6647046,6641162,7367946,6181894,6181894,6181894,556844,98067],C=[0,0,0,0,0,526861,461581,527630,527887,68879,68623,3087,68367,2316,461581,330508,68623,3087,396301,67597,2061,461838,2061,330252,67597,2061,526861,780,2313,198153,0,0,0,0,0,0,0,0,779,66827,779,1035,0,0,1,66827,920064,66050,593422,68879,3087,68879,3087,2061,2,260,0,2,260,0,1,260,0,1,260,0,0,0,0,0,0,0,0,461324,0,0,330240,0,1245199,1048591],R1=[56,132,107,25,198,99,24,134,115,152,198,177,28,202,49,140,199,49,136,194,48,152,70,49,24,198,53,12,202,49,12,198,33,16,36,105,18,194,49,20,196,113,8,74,34,73,171,106,168,172,73,81,50,213,82,136,147,108,148,34,21,84,210,37,150,212,80,165,70,33,8,133,107,24,196,99,16,206,107,24,140,113,25,140,99,53,12,198,51,153,204,108,181,78,162,153,70,33,40,130,149,46,227,48,156,197,48,156,162,177,156,103,49,136,102,89,44,83,24,132,103,80,202,227,10,172,171,48,172,98,48,140,99,16,148,98,177,140,130,40,150,51,152,214,181,76,98,41,165,74,181,156,198,49,20,214,56,156,75,180,134,101,24,174,103,28,166,99,25,150,35,25,132,19,8,166,82,172,202,34,137,110,171,25,140,98,52,196,98,25,134,99,24,196,35,88,214,163,80,66,84,74,173,74,37,17,107,100,137,74,99,57,138,35,49,42,234,162,169,68,197,18,205,66,52,140,98,24,140,99,17,72,102,49,157,68,51,29,70,49,156,198,177,12,205,50,136,196,115,24,134,115,8,214,99,88,7,129,224,240,60,7,135,144,60,124,15,199,192,192,240,124,30,7,128,128,0,28,120,112,241,199,31,192,12,254,28,31,31,14,10,122,192,113,242,131,143,3,15,15,12,0,121,248,97,224,67,15,131,231,24,249,193,19,218,233,99,143,15,131,131,135,195,31,60,112,240,225,225,227,135,184,113,14,32,227,141,72,120,28,147,135,48,225,193,193,228,120,33,131,131,195,135,6,57,229,195,135,7,14,28,28,112,244,113,156,96,54,50,195,30,60,243,143,14,60,112,227,199,143,15,15,14,60,120,240,227,135,6,240,227,7,193,153,135,15,24,120,112,112,252,243,16,177,140,140,49,124,112,225,134,60,100,108,176,225,227,15,35,143,15,30,62,56,60,56,123,143,7,14,60,244,23,30,60,120,242,158,114,73,227,37,54,56,88,57,226,222,60,120,120,225,199,97,225,225,176,240,240,195,199,14,56,192,240,206,115,115,24,52,176,225,199,142,28,60,248,56,240,225,193,139,134,143,28,120,112,240,120,172,177,143,57,49,219,56,97,195,14,14,56,120,115,23,30,57,30,56,100,225,241,193,78,15,64,162,2,197,143,129,161,252,18,8,100,224,60,34,224,69,7,142,12,50,144,240,31,32,73,224,248,12,96,240,23,26,65,170,164,208,141,18,130,30,30,3,248,62,3,12,115,128,112,68,38,3,36,225,62,4,78,4,28,193,9,204,158,144,33,7,144,67,100,192,15,198,144,156,193,91,3,226,29,129,224,94,29,3,132,184,44,15,128,177,131,224,48,65,30,67,137,131,80,252,36,46,19,131,241,124,76,44,201,13,131,176,181,130,228,232,6,156,7,160,153,29,7,62,130,143,112,48,116,64,202,16,228,232,15,146,20,63,6,248,132,136,67,129,10,52,57,65,198,227,28,71,3,176,184,19,10,194,100,248,24,249,96,179,192,101,32,96,166,140,195,129,32,48,38,30,28,56,211,1,176,38,64,244,11,195,66,31,133,50,38,96,64,201,203,1,236,17,40,64,250,4,52,224,112,76,140,29,7,105,3,22,200,4,35,232,198,154,11,26,3,224,118,6,5,207,30,188,88,49,113,102,0,248,63,4,252,12,116,39,138,128,113,194,58,38,6,192,31,5,15,152,64,174,1,127,192,7,255,0,14,254,0,3,223,128,3,239,128,27,241,194,0,231,224,24,252,224,33,252,128,60,252,64,14,126,0,63,62,0,15,254,0,31,255,0,62,240,7,252,0,126,16,63,255,0,63,56,14,124,1,135,12,252,199,0,62,4,15,62,31,15,15,31,15,2,131,135,207,3,135,15,63,192,7,158,96,63,192,3,254,0,63,224,119,225,192,254,224,195,224,1,223,248,3,7,0,126,112,0,124,56,24,254,12,30,120,28,124,62,14,31,30,30,62,0,127,131,7,219,135,131,7,199,7,16,113,255,0,63,226,1,224,193,195,225,0,127,192,5,240,32,248,240,112,254,120,121,248,2,63,12,143,3,15,159,224,193,199,135,3,195,195,176,225,225,193,227,224,113,240,0,252,112,124,12,62,56,14,28,112,195,199,3,129,193,199,231,0,15,199,135,25,9,239,196,51,224,193,252,248,112,240,120,248,240,97,199,0,31,248,1,124,248,240,120,112,60,124,206,14,33,131,207,8,7,143,8,193,135,143,128,199,227,0,7,248,224,239,0,57,247,128,14,248,225,227,248,33,159,192,255,3,248,7,192,31,248,196,4,252,196,193,188,135,240,15,192,127,5,224,37,236,192,62,132,71,240,142,3,248,3,251,192,25,248,7,156,12,23,248,7,224,31,161,252,15,252,1,240,63,0,254,3,240,31,0,253,0,255,136,13,249,1,255,0,112,7,192,62,66,243,13,196,127,128,252,7,240,94,192,63,0,120,63,129,255,1,248,1,195,232,12,228,100,143,228,15,240,7,240,194,31,0,127,192,111,128,126,3,248,7,240,63,192,120,15,130,7,254,34,119,112,2,118,3,254,0,254,103,0,124,199,241,142,198,59,224,63,132,243,25,216,3,153,252,9,184,15,248,0,157,36,97,249,13,0,253,3,240,31,144,63,1,248,31,208,15,248,55,1,248,7,240,15,192,63,0,254,3,248,15,192,63,0,250,3,240,15,128,255,1,184,7,240,1,252,1,188,128,19,30,0,127,225,64,127,160,127,176,0,63,192,31,192,56,15,240,31,128,255,1,252,3,241,126,1,254,1,240,255,0,127,192,29,7,240,15,192,126,6,224,7,224,15,248,6,193,254,1,252,3,224,15,0,252],I1=(e,A)=>{let E=(H,e)=>(H*e>>8&255)<<1,r=[[],[],[]];O1.map((H,e)=>{r[0][e]=255&H,r[1][e]=H>>8&255,r[2][e]=H>>16&255});for(let H=5;H<30;H++)r[0][H]=E(e,r[0][H]),r[1][H]=E(A,r[1][H]);for(let H=48;H<54;H++)r[0][H]=E(e,r[0][H]),r[1][H]=E(A,r[1][H]);return r},Y1=(e,H,A,E)=>{let Y=[e,H[0],H[1],H[2],A[0],A[1],A[2]],l=(H,e)=>Y[H][e],r=(e,A,E,H)=>{let r=H<0,t=Math.abs(H)%e,O=H/e|0,R=0,I=e;for(;0<--I;){let H=l(A,E)+O;(R+=t)>=e&&(R-=e,r?H--:H&&H++),Y[A][++E]=H,H+=O}},t,O,R=0;for(let H=0;H<E.length-1;H++){var I=E[H][0],n=E[H+1][0],U=M[n],N=M[I],W=(O=N===U?(t=d[I],d[n]):N<U?(t=K[n],d[n]):(t=d[I],K[I]),(R+=E[H][1])+O),S=R-t,f=t+O;if(0==(f-2&128)){r((N=E[H][1]>>1)+(U=E[H+1][1]>>1),0,S,e[R+U]-e[R-N]);for(let H=1;H<7;H++){var T=l(H,W)-l(H,S);r(f,H,S,T)}}}return R+E[E.length-1][1]},l1=255,n1=1,U1=(A,E,r)=>{let H=(H,e,A)=>{var E=e;e<30?e=0:e-=30;let r;for(;127===(r=A[e]);)++e;for(;e!==E;)for(r+=H,A[e]=255&r;++e!==E&&255===A[e];);},t=[],O=[[],[],[]],R=[[],[],[]],I=[],Y=0;for(let e=0;e<E.length;e++){var l=E[e][0],n=(l===m?H(n1,Y,t):l===y&&H(l1,Y,t),r1[E[e][2]]);for(let H=E[e][1];0<H;H--)O[0][Y]=r[0][l],O[1][Y]=r[1][l],O[2][Y]=r[2][l],R[0][Y]=255&C[l],R[1][Y]=C[l]>>8&255,R[2][Y]=C[l]>>16&255,I[Y]=t1[l],t[Y]=A+n&255,Y++}return[t,O,R,I]},N1=(H,e,A,E,r)=>{var A=I1(A,E),[t,O,R,E]=U1(e,H,A),e=Y1(t,O,R,H);if(!r)for(let H=0;H<t.length;H++)t[H]-=O[0][H]>>1;var I=[0,1,2,2,2,3,3,4,4,5,6,8,9,11,13,15];for(let H=R[0].length-1;0<=H;H--)R[0][H]=I[R[0][H]],R[1][H]=I[R[1][H]],R[2][H]=I[R[2][H]];return[e,O,t,R,E]},W1=H=>{let A=new Uint8Array(H),E=0,r=0,t=(H,e)=>{e=16*(15&e),t.ary(H,[e,e,e,e,e])};return t.ary=(H,e)=>{if(((E+=[[162,167,167,127,128],[226,60,60,0,0],[225,60,59,0,0],[200,0,0,54,55],[199,0,0,54,54]][r][H])/50|0)>A.length)throw new Error;r=H;for(let H=0;H<5;H++)A[(E/50|0)+H]=e[H]},t.get=()=>A.slice(0,E/50|0),t},v=(O,e,H,A)=>{let E=(7&H)-1,R=256*E&65535,I=248&H,r=(H,e,A,E)=>{let r=8,t=R1[R+I];for(;0!=(128&t)?O(H,e):O(A,E),t<<=1,--r;);};if(0===I){let H=A>>4^255;for(I=255&e;r(3,26,4,6),I++,I&=255,255&++H;);return I}I^=255;for(var t=255&E1[E];r(2,5,1,t),255&++I;);return e},c=H=>127*Math.sin(2*Math.PI*(H/256))|0,S1=(H,e,A,t,E,O,r)=>{let R=A,I=0,Y=0,l=0,n=0,U=0,N=E[0],W=.75*N|0;for(;e;){var S=r[U];if(0!=(248&S))n=v(H,n,S,E[255&U]),U+=2,e-=2,R=A;else{{let e=[],A=256*I,E=256*Y,r=256*l;for(let H=0;H<5;H++){var f=c(255&A>>8),T=c(255&E>>8),i=(255&r>>8)<129?-112:112,f=(f*(15&O[0][U])+T*(15&O[1][U])+i*(15&O[2][U]))/32+128;e[H]=0|f,A+=256*t[0][U]/4,E+=256*t[1][U]/4,r+=256*t[2][U]/4}H.ary(0,e)}if(0==--R){if(U++,0==--e)return;R=A}if(0!=--N){if(0!=--W||0===S){I+=t[0][U],Y+=t[1][U],l+=t[2][U];continue}n=v(H,n,S,E[255&U])}}N=E[U],W=.75*N|0,I=0,Y=0,l=0}};function X(H){var e,A,E,r,t,O=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},H=(H=>{if(!H)return!1;let e=H=>H===I.length?null:I[H],A=(e,H,A,E)=>{for(let H=I.length-1;H>=e;H--)I[H+1]=I[H],R[H+1]=t(H),O[H+1]=r(H);I[e]=H,R[e]=0|E,O[e]=A},r=H=>0|O[H],t=H=>0|R[H],E=(H,e)=>{R[H]=e},O=[],R=[],I=[],Y=0;return b(H,H=>{O[Y]=0,R[Y]=0,I[Y++]=H},H=>{O[Y-1]=H}),q(A,(H,e)=>{I[H]=e},e,r),H1(e,r,(H,e)=>{O[H]=e}),e1(e,r,E),z(e,E,t),A1(e,A,r),I.map((H,e)=>H?[H,0|R[e],0|O[e]]:null).filter(H=>H)})(H);return!1!==H&&(r=void 0===(r=O.pitch)?64:255&r,A=void 0===(A=O.mouth)?128:255&A,E=void 0===(E=O.throat)?128:255&E,e=255&(O.speed||72),O=O.singmode||!1,r=N1(H,r,A,E,O),A=W1(176.4*H.reduce((H,e)=>H+e[1],0)*e|0),[E,O,H,r,t]=r,S1(A,E,e,O,H,r,t),A.get())}let F=H=>{let e=" "+H.toUpperCase(),A=0,E="",r=(H,e)=>{A+=e,E+=H},t=0;for(;A<e.length&&t++<1e4;){var O=e[A];if("."!==O||N(e,A+1,1))if(U(O,2))f.some(H=>H(e,A,r));else if(0!==l[O]){if(!U(O,n))return!1;S[O].some(H=>H(e,A,r))}else E+=" ",A++;else E+=".",A++}return E},g=X,p=(H,e)=>{if(!1===(H=X(H,e)))return!1;var A=H,E=new Float32Array(A.length);for(let H=0;H<A.length;H++)E[H]=(A[H]-128)/256;return E};function H(H){let A=H||{},E=(H,e)=>e||A.phonetic?H.toUpperCase():F(H);this.buf8=(H,e)=>g(E(H,e),A),this.buf32=(H,e)=>p(E(H,e),A),this.speak=(e,H)=>{if(e=this.buf32(e,H),I=null===I?new AudioContext:I){var O=I,R=e;let t,H=new Promise((H,e)=>{let A=O.createBufferSource(),E=O.createBuffer(1,R.length,22050),r=E.getChannelData(0);for(let H=0;H<R.length;H++)r[H]=R[H];A.buffer=E,A.connect(O.destination),A.onended=()=>{H(!0)},t=H=>{A.disconnect(),e(H)},A.start(0)});return H.abort=t,H}throw new Error},this.download=(H,e)=>{var A,H=this.buf8(H,e),e=new Blob([R(H)],{type:"audio/vnd.wave"}),e=(H=window.URL||window.webkitURL).createObjectURL(e);(A=document.createElement("a")).href=e,A.target="_blank",A.download="sam.wav",document.body.appendChild(A),A.click(),document.body.removeChild(A),H.revokeObjectURL(e)},this.wav=(H,e)=>R(this.buf8(H,e))}return H.buf8=g,H.buf32=p,H.convert=F,H}var e=this;"object"==typeof exports&&"undefined"!=typeof module?module.exports=H():"function"==typeof define&&define.amd?define(H):(e="undefined"!=typeof globalThis?globalThis:e||self).SamJs=H();

    // module exports is now SamJs
    return module.exports;
  }
  /* eslint-enable */

  const PRESETS = {
    SAM: {
      speed: 72,
      pitch: 64,
      throat: 128,
      mouth: 128,
    },
    elf: {
      speed: 72,
      pitch: 64,
      throat: 110,
      mouth: 160,
    },
    "little robot": {
      speed: 92,
      pitch: 60,
      throat: 190,
      mouth: 190,
    },
    "stuffy guy": {
      speed: 82,
      pitch: 72,
      throat: 110,
      mouth: 105,
    },
    "little old lady": {
      speed: 82,
      pitch: 32,
      throat: 145,
      mouth: 145,
    },
    "extra-terrestrial": {
      speed: 100,
      pitch: 64,
      throat: 150,
      mouth: 200,
    },
  };

  let noDownload = true;
  let presetMenu = []; // Useful when declaring the preset menu

  Object.keys(PRESETS).forEach((key) => {
    presetMenu.push({ text: Scratch.translate(key), value: key });
  });

  // taken from https://github.com/discordier/sam/blob/master/docs/manual.md#phonetic-input-to-sam
  const phonemeMenu = [
    {
      value: "IY",
      text: Scratch.translate("/i/ IY as in feet"),
    },
    {
      value: "IH",
      text: Scratch.translate("/ɪ/ IH as in pin"),
    },
    {
      value: "EH",
      text: Scratch.translate("/ɛ/ EH as in beg"),
    },
    {
      value: "AE",
      text: Scratch.translate("/æ/ AE as in Sam"),
    },
    {
      value: "AA",
      text: Scratch.translate("/ɑ/ AA as in pot"),
    },
    {
      value: "AH",
      text: Scratch.translate("/ᴧ/ AH as in budget"),
    },
    {
      value: "AO",
      text: Scratch.translate("/ɔː/ AO as in talk"),
    },
    {
      value: "OH",
      text: Scratch.translate("/oʊ/ OH as in cone"),
    },
    {
      value: "UH",
      text: Scratch.translate("/ʊ/ UH as in book"),
    },
    {
      value: "UX",
      text: Scratch.translate("/u/ UX as in loot"),
    },
    {
      value: "ER",
      text: Scratch.translate("/əː/ ER as in bird"),
    },
    {
      value: "AX",
      text: Scratch.translate("/æ/ AX as in gallon"),
    },
    {
      value: "IX",
      text: Scratch.translate("/ɪ/ IX as in digit"),
    },
    {
      value: "EY",
      text: Scratch.translate("/eɪ/ EY as in made"),
    },
    {
      value: "AY",
      text: Scratch.translate("/aɪ/ AY as in high"),
    },
    {
      value: "OY",
      text: Scratch.translate("/ɔɪ/ OY as in boy"),
    },
    {
      value: "AW",
      text: Scratch.translate("/aʊ/ AW as in how"),
    },
    {
      value: "OW",
      text: Scratch.translate("/əʊ/ OW as in slow"),
    },
    {
      value: "UW",
      text: Scratch.translate("/ʉː/ UW as in crew"),
    },
    // The following symbols are used internally by some of S.A.M.'s rules, but they are also available to the user.
    // {
    //     value: "YX",
    //     text: Scratch.translate("Y diphthong ending")
    // },
    // {
    //     value: "WX",
    //     text: Scratch.translate("W diphthong ending")
    // },
    // {
    //     value: "RX",
    //     text: Scratch.translate("R after a vowel")
    // },
    // {
    //     value: "LX",
    //     text: Scratch.translate("L after a vowel")
    // },
    // {
    //     value: "/X",
    //     text: Scratch.translate("/X as in H before a non-front vowel or consonant")
    // },
    // {
    //     value: "DX",
    //     text: Scratch.translate("DX \"flap\" as in pity")
    // },
    {
      value: "R",
      text: Scratch.translate("/ɹ/ R as in red"),
    },
    {
      value: "L",
      text: Scratch.translate("/l/ L as in allow"),
    },
    {
      value: "W",
      text: Scratch.translate("/w/ W as in away"),
    },
    {
      value: "WH",
      text: Scratch.translate("/w/ WH as in whale"),
    },
    {
      value: "Y",
      text: Scratch.translate("/j/ Y as in you"),
    },
    {
      value: "M",
      text: Scratch.translate("/m/ M as in Sam"),
    },
    {
      value: "N",
      text: Scratch.translate("/n/ N as in man"),
    },
    {
      value: "NX",
      text: Scratch.translate("/ŋ/ NX as in song"),
    },
    {
      value: "B",
      text: Scratch.translate("/b/ B as in bad"),
    },
    {
      value: "D",
      text: Scratch.translate("/d/ D as in dog"),
    },
    {
      value: "G",
      text: Scratch.translate("/ɡ/ G as in again"),
    },
    {
      value: "J",
      text: Scratch.translate("/ʤ/ J as in judge"),
    },
    {
      value: "Z",
      text: Scratch.translate("/z/ Z as in zoo"),
    },
    {
      value: "ZH",
      text: Scratch.translate("/ʒ/ ZH as in pleasure"),
    },
    {
      value: "V",
      text: Scratch.translate("/v/ V as in seven"),
    },
    {
      value: "DH",
      text: Scratch.translate("/ð/ DH as in then"),
    },
    {
      value: "S",
      text: Scratch.translate("/s/ S as in Sam"),
    },
    {
      value: "SH",
      text: Scratch.translate("/ʃ/ SH as in fish"),
    },
    {
      value: "F",
      text: Scratch.translate("/f/ F as in fish"),
    },
    {
      value: "TH",
      text: Scratch.translate("/θ/ TH as in thin"),
    },
    {
      value: "P",
      text: Scratch.translate("/p/ P as in poke"),
    },
    {
      value: "T",
      text: Scratch.translate("/t/ T as in talk"),
    },
    {
      value: "K",
      text: Scratch.translate("/k/ K as in cake"),
    },
    {
      value: "CH",
      text: Scratch.translate("/ʧ/ CH as in speech"),
    },
    {
      value: "/H",
      text: Scratch.translate("/h/ /H as in ahead"),
    },
    {
      value: "UL",
      text: Scratch.translate("/əl/ UL as in settle"),
    },
    {
      value: "UM",
      text: Scratch.translate("/əm/ UM as in astronomy"),
    },
    {
      value: "UN",
      text: Scratch.translate("/ʌŋ/ UN as in function"),
    },
    {
      value: "Q",
      text: Scratch.translate("/ʔ/ Q as in kitt**-**en (glottal stop)"),
    },
  ];

  const SamJs = initSamJs();

  class SAM {
    getInfo() {
      return {
        id: "samtts",
        /* eslint-disable */
        name: "SAM", // Lint wanted me to translate this, but I feel like it shouldn't be because it's an abbreviation/name
        /* eslint-enable */
        color1: "#706deb", // Light blue color from the Colodore color palette
        color2: "#4f4dc3", // A mix of the two
        color3: "#2e2c9b", // Blue color from Colodore
        blocks: [
          {
            opcode: "speak",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("speak [SPEECH]"),
            arguments: {
              SPEECH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, my name is SAM.",
              },
            },
          },
          {
            opcode: "loadPreset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load preset [PRESET]"),
            arguments: {
              PRESET: {
                type: Scratch.ArgumentType.STRING,
                menu: "PRESET_MENU",
              },
            },
          },
          {
            opcode: "downloadSpeech",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("download speech of [SPEECH]"),
            arguments: {
              SPEECH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, my name is SAM.",
              },
            },
          },
          {
            opcode: "addSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("add speech [SPEECH] as sound [NAME]"),
            arguments: {
              SPEECH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, my name is SAM.",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "speech",
              },
            },
          },
          {
            opcode: "setProp",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [PROP] amount to [NUM]"),
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "PROP_MENU",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "getProp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROP] amount"),
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "PROP_MENU",
              },
            },
          },
          {
            opcode: "getPhoneme",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("phoneme [PHONEME]"),
            arguments: {
              PHONEME: {
                type: Scratch.ArgumentType.STRING,
                menu: "PHONEMES",
              },
            },
          },
        ],
        menus: {
          PROP_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("speed"),
                value: "speed",
              },
              {
                text: Scratch.translate("pitch"),
                value: "pitch",
              },
              {
                text: Scratch.translate("mouth"),
                value: "mouth",
              },
              {
                text: Scratch.translate("throat"),
                value: "throat",
              },
            ],
          },
          PRESET_MENU: {
            acceptReporters: true,
            items: presetMenu,
          },
          PHONEMES: {
            acceptReporters: true,
            items: phonemeMenu,
          },
        },
      };
    }

    checkProps(util) {
      // Utility function to assign the sprite a voice if it doesn't have one
      if (!util.target.extensionStorage.samtts) {
        util.target.extensionStorage.samtts = { ...PRESETS.SAM }; // We need the {...foo} so it makes a *copy* of the preset
      }
    }
    speak(args, util) {
      this.checkProps(util);

      new SamJs(util.target.extensionStorage.samtts).speak(args.SPEECH);
    }
    loadPreset(args, util) {
      util.target.extensionStorage.samtts = { ...PRESETS[args.PRESET] };
    }
    downloadSpeech(args, util) {
      if (noDownload) {
        if (
          confirm(
            Scratch.translate(
              "Do you want to allow this project to download voice clips to your computer?"
            )
          )
        ) {
          noDownload = false;
        } else {
          return;
        }
      }
      this.checkProps(util);
      new SamJs(util.target.extensionStorage.samtts).download(args.SPEECH);
    }
    /**
     * Shamelessly copied from Lily/Assets.js addSound()
     */
    async addSound(args, util) {
      const targetId = util.target.id;
      const assetName = Scratch.Cast.toString(args.NAME);

      this.checkProps(util);
      const buffer = new SamJs(util.target.extensionStorage.samtts).wav(
        args.SPEECH
      );

      const storage = Scratch.vm.runtime.storage;
      const asset = storage.createAsset(
        storage.AssetType.Sound,
        storage.DataFormat.WAV,
        buffer,
        null,
        true
      );

      try {
        await Scratch.vm.addSound(
          {
            asset,
            md5: asset.assetId + "." + asset.dataFormat,
            name: assetName,
          },
          targetId
        );
      } catch (e) {
        console.error(e);
      }
    }
    setProp(args, util) {
      this.checkProps(util);
      util.target.extensionStorage.samtts[args.PROP] = 2.55 * args.NUM; // Conversion from 0-100 to 0-255
      // I could've kept the whole thing on a scale of 0-255 but decided not to for consistency with the sound and pen blocks
      // The converted 0-100 scale is displayed to the user, but it's still 0-255 under the hood
    }
    getProp(args, util) {
      this.checkProps(util);
      return util.target.extensionStorage.samtts[args.PROP] / 2.55; // 0-255 -> 0-100
    }
    getPhoneme(args, util) {
      return args.PHONEME;
    }
  }
  Scratch.extensions.register(new SAM());
})(Scratch);
