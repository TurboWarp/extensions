// Name: Noise
// ID: corbnorbsnoise
// Description: Adds many types of noises using FastNoiseLite.
// By: Corbnorbs <https://scratch.mit.edu/users/___DemonZ___/>
// Original: Auburn
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const noises = Object.create(null);

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;
  const Cast = Scratch.Cast;
  const Translate = Scratch.translate;

  class Noise {
    getInfo() {
      return {
        id: "corbnorbsnoise",
        name: Translate("Noise"),
        color1: "#b5074c",
        color2: "#990841",
        docsURI: "https://extensions.turbowarp.org/Corbnorb/noise",
        blocks: [
          {
            opcode: "initNoise",
            blockType: BlockType.COMMAND,
            text: Translate(
              "create noise id:[ID] seed:[SEED] type:[TYPE] octaves:[OCTAVES] frequency:[FREQUENCY] fractal:[FRACTAL]"
            ),
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: "myNoise",
              },
              SEED: {
                type: ArgumentType.NUMBER,
                defaultValue: "0",
              },
              TYPE: {
                type: ArgumentType.STRING,
                menu: "NOISE_TYPE",
                defaultValue: "Perlin",
              },
              OCTAVES: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
              FREQUENCY: {
                type: ArgumentType.NUMBER,
                defaultValue: "0.01",
              },
              FRACTAL: {
                type: ArgumentType.STRING,
                menu: "FRACTAL_TYPE",
                defaultValue: "FBm",
              },
            },
          },
          {
            opcode: "getNoise",
            blockType: BlockType.REPORTER,
            text: Translate(
              "get noise id:[ID] at x:[X] y:[Y] z:[Z] easing:[EASING] inverted?[INVERTED]"
            ),
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: "myNoise",
              },
              X: {
                type: ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Z: {
                type: ArgumentType.NUMBER,
                defaultValue: "0",
              },
              INVERTED: {
                type: ArgumentType.STRING,
                menu: "INVERTED_MENU",
                defaultValue: "false",
              },
              EASING: {
                type: ArgumentType.STRING,
                menu: "EASING_TYPE",
                defaultValue: "Linear",
              },
            },
          },
        ],
        menus: {
          NOISE_TYPE: {
            acceptReporters: true,
            items: [
              "openSimpex2",
              "openSimpex2S",
              "cellular",
              "perlin",
              "value Cubic",
              "value",
            ],
          },
          FRACTAL_TYPE: {
            acceptReporters: true,
            items: ["none", "fbm", "ridged", "ping Pong"],
          },
          INVERTED_MENU: {
            acceptReporters: true,
            items: [
              { text: "true", value: "true" },
              { text: "false", value: "false" },
            ],
          },
          EASING_TYPE: {
            acceptReporters: true,
            items: ["linear", "squared", "cubed", "root"],
          },
        },
      };
    }

    initNoise(args) {
      const id = Cast.toString(args.ID);
      const seed = Cast.toNumber(args.SEED);
      const fractal = Cast.toString(args.FRACTAL);
      const frequency = Cast.toNumber(args.FREQUENCY);
      const octaves = Cast.toNumber(args.OCTAVES);
      noises[id] = new FastNoiseLite(seed);
      switch (args.TYPE) {
        case "openSimplex2":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
          break;
        case "openSimplex2S":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2S);
          break;
        case "cellular":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.Cellular);
          break;
        case "perlin":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.Perlin);
          break;
        case "value cubic":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.ValueCubic);
          break;
        case "value":
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.Value);
          break;
        default:
          noises[id].SetNoiseType(FastNoiseLite.NoiseType.Perlin);
          break;
      }
      switch (fractal) {
        case "none":
          noises[id].SetFractalType(FastNoiseLite.FractalType.None);
          break;
        case "fbm":
          noises[id].SetFractalType(FastNoiseLite.FractalType.FBm);
          break;
        case "ridged":
          noises[id].SetFractalType(FastNoiseLite.FractalType.Ridged);
          break;
        case "ping pong":
          noises[id].SetFractalType(FastNoiseLite.FractalType.PingPong);
          break;
        default:
          noises[id].SetFractalType(FastNoiseLite.FractalType.None);
          break;
      }
      noises[id].SetFrequency(frequency);
      noises[id].SetFractalOctaves(octaves);
    }

    getNoise(args) {
      const id = Cast.toString(args.ID);
      const easing = Cast.toString(args.EASING);
      const inverted = Cast.toBoolean(args.INVERTED);
      if (id in noises) {
        let value = noises[id].GetNoise(args.X, args.Y, args.Z);
        value = inverted == true ? -value : value;
        value = (value + 1) / 2;
        switch (easing) {
          case "linear":
            break;
          case "squared":
            value = Math.pow(value, 2);
            break;
          case "cubed":
            value = Math.pow(value, 3);
            break;
          case "root":
            value = Math.sqrt(Math.abs(value));
            break;
          default:
            break;
        }
        value = value * 2 - 1;
        return value;
      }
      console.log("ISSUE");
      return 0;
    }
  }

  // MIT License
  //
  // Copyright(c) 2023 Jordan Peck (jordan.me2@gmail.com)
  // Copyright(c) 2023 Contributors
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files(the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions :
  //
  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.
  //

<<<<<<< HEAD
  //minified code. find original here:
  // https://raw.githubusercontent.com/Auburn/FastNoiseLite/refs/heads/master/JavaScript/FastNoiseLite.js

  /* eslint-disable */
  /* prettier-disable */
  // prettier-ignore
  class FastNoiseLite{static NoiseType=Object.freeze({OpenSimplex2:"OpenSimplex2",OpenSimplex2S:"OpenSimplex2S",Cellular:"Cellular",Perlin:"Perlin",ValueCubic:"ValueCubic",Value:"Value"});static RotationType3D=Object.freeze({None:"None",ImproveXYPlanes:"ImproveXYPlanes",ImproveXZPlanes:"ImproveXZPlanes"});static FractalType=Object.freeze({None:"None",FBm:"FBm",Ridged:"Ridged",PingPong:"PingPong",DomainWarpProgressive:"DomainWarpProgressive",DomainWarpIndependent:"DomainWarpIndependent"});static CellularDistanceFunction=Object.freeze({Euclidean:"Euclidean",EuclideanSq:"EuclideanSq",Manhattan:"Manhattan",Hybrid:"Hybrid"});static CellularReturnType=Object.freeze({CellValue:"CellValue",Distance:"Distance",Distance2:"Distance2",Distance2Add:"Distance2Add",Distance2Sub:"Distance2Sub",Distance2Mul:"Distance2Mul",Distance2Div:"Distance2Div"});static DomainWarpType=Object.freeze({OpenSimplex2:"OpenSimplex2",OpenSimplex2Reduced:"OpenSimplex2Reduced",BasicGrid:"BasicGrid"});static TransformType3D=Object.freeze({None:"None",ImproveXYPlanes:"ImproveXYPlanes",ImproveXZPlanes:"ImproveXZPlanes",DefaultOpenSimplex2:"DefaultOpenSimplex2"});_Seed=1337;_Frequency=.01;_NoiseType=FastNoiseLite.NoiseType.OpenSimplex2;_RotationType3D=FastNoiseLite.RotationType3D.None;_TransformType3D=FastNoiseLite.TransformType3D.DefaultOpenSimplex2;_DomainWarpAmp=1;_FractalType=FastNoiseLite.FractalType.None;_Octaves=3;_Lacunarity=2;_Gain=.5;_WeightedStrength=0;_PingPongStrength=2;_FractalBounding=1/1.75;_CellularDistanceFunction=FastNoiseLite.CellularDistanceFunction.EuclideanSq;_CellularReturnType=FastNoiseLite.CellularReturnType.Distance;_CellularJitterModifier=1;_DomainWarpType=FastNoiseLite.DomainWarpType.OpenSimplex2;_WarpTransformType3D=FastNoiseLite.TransformType3D.DefaultOpenSimplex2;constructor(e){void 0!==e&&(this._Seed=e)}SetSeed(e){this._Seed=e}SetFrequency(e){this._Frequency=e}SetNoiseType(e){this._NoiseType=e,this._UpdateTransformType3D()}SetRotationType3D(e){this._RotationType3D=e,this._UpdateTransformType3D(),this._UpdateWarpTransformType3D()}SetFractalType(e){this._FractalType=e}SetFractalOctaves(e){this._Octaves=e,this._CalculateFractalBounding()}SetFractalLacunarity(e){this._Lacunarity=e}SetFractalGain(e){this._Gain=e,this._CalculateFractalBounding()}SetFractalWeightedStrength(e){this._WeightedStrength=e}SetFractalPingPongStrength(e){this._PingPongStrength=e}SetCellularDistanceFunction(e){this._CellularDistanceFunction=e}SetCellularReturnType(e){this._CellularReturnType=e}SetCellularJitter(e){this._CellularJitterModifier=e}SetDomainWarpType(e){this._DomainWarpType=e,this._UpdateWarpTransformType3D()}SetDomainWarpAmp(e){this._DomainWarpAmp=e}GetNoise(e,t,i){let s=(e,t)=>{switch(e*=this._Frequency,t*=this._Frequency,this._NoiseType){case FastNoiseLite.NoiseType.OpenSimplex2:case FastNoiseLite.NoiseType.OpenSimplex2S:let i=(e+t)*(.5*(1.7320508075688772-1));e+=i,t+=i}switch(this._FractalType){default:return this._GenNoiseSingleR2(this._Seed,e,t);case FastNoiseLite.FractalType.FBm:return this._GenFractalFBmR2(e,t);case FastNoiseLite.FractalType.Ridged:return this._GenFractalRidgedR2(e,t);case FastNoiseLite.FractalType.PingPong:return this._GenFractalPingPongR2(e,t)}},a=(e,t,i)=>{switch(e*=this._Frequency,t*=this._Frequency,i*=this._Frequency,this._TransformType3D){case FastNoiseLite.TransformType3D.ImproveXYPlanes:{let s=e+t,a=-.211324865405187*s;e+=a-(i*=.577350269189626),t+=a-i,i+=.577350269189626*s;break}case FastNoiseLite.TransformType3D.ImproveXZPlanes:{let s=e+i,a=-.211324865405187*s;e+=a-(t*=.577350269189626),i+=a-t,t+=.577350269189626*s;break}case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:let s=(e+t+i)*(2/3);e=s-e,t=s-t,i=s-i}switch(this._FractalType){default:return this._GenNoiseSingleR3(this._Seed,e,t,i);case FastNoiseLite.FractalType.FBm:return this._GenFractalFBmR3(e,t,i);case FastNoiseLite.FractalType.Ridged:return this._GenFractalRidgedR3(e,t,i);case FastNoiseLite.FractalType.PingPong:return this._GenFractalPingPongR3(e,t,i)}};return 2===arguments.length?s(e,t):3===arguments.length?a(e,t,i):void 0}DomainWrap(e){switch(this._FractalType){default:this._DomainWarpSingle(e);break;case FastNoiseLite.FractalType.DomainWarpProgressive:this._DomainWarpFractalProgressive(e);break;case FastNoiseLite.FractalType.DomainWarpIndependent:this._DomainWarpFractalIndependent(e)}}_Gradients2D=[.130526192220052,.99144486137381,.38268343236509,.923879532511287,.608761429008721,.793353340291235,.793353340291235,.608761429008721,.923879532511287,.38268343236509,.99144486137381,.130526192220051,.99144486137381,-.130526192220051,.923879532511287,-.38268343236509,.793353340291235,-.60876142900872,.608761429008721,-.793353340291235,.38268343236509,-.923879532511287,.130526192220052,-.99144486137381,-.130526192220052,-.99144486137381,-.38268343236509,-.923879532511287,-.608761429008721,-.793353340291235,-.793353340291235,-.608761429008721,-.923879532511287,-.38268343236509,-.99144486137381,-.130526192220052,-.99144486137381,.130526192220051,-.923879532511287,.38268343236509,-.793353340291235,.608761429008721,-.608761429008721,.793353340291235,-.38268343236509,.923879532511287,-.130526192220052,.99144486137381,.130526192220052,.99144486137381,.38268343236509,.923879532511287,.608761429008721,.793353340291235,.793353340291235,.608761429008721,.923879532511287,.38268343236509,.99144486137381,.130526192220051,.99144486137381,-.130526192220051,.923879532511287,-.38268343236509,.793353340291235,-.60876142900872,.608761429008721,-.793353340291235,.38268343236509,-.923879532511287,.130526192220052,-.99144486137381,-.130526192220052,-.99144486137381,-.38268343236509,-.923879532511287,-.608761429008721,-.793353340291235,-.793353340291235,-.608761429008721,-.923879532511287,-.38268343236509,-.99144486137381,-.130526192220052,-.99144486137381,.130526192220051,-.923879532511287,.38268343236509,-.793353340291235,.608761429008721,-.608761429008721,.793353340291235,-.38268343236509,.923879532511287,-.130526192220052,.99144486137381,.130526192220052,.99144486137381,.38268343236509,.923879532511287,.608761429008721,.793353340291235,.793353340291235,.608761429008721,.923879532511287,.38268343236509,.99144486137381,.130526192220051,.99144486137381,-.130526192220051,.923879532511287,-.38268343236509,.793353340291235,-.60876142900872,.608761429008721,-.793353340291235,.38268343236509,-.923879532511287,.130526192220052,-.99144486137381,-.130526192220052,-.99144486137381,-.38268343236509,-.923879532511287,-.608761429008721,-.793353340291235,-.793353340291235,-.608761429008721,-.923879532511287,-.38268343236509,-.99144486137381,-.130526192220052,-.99144486137381,.130526192220051,-.923879532511287,.38268343236509,-.793353340291235,.608761429008721,-.608761429008721,.793353340291235,-.38268343236509,.923879532511287,-.130526192220052,.99144486137381,.130526192220052,.99144486137381,.38268343236509,.923879532511287,.608761429008721,.793353340291235,.793353340291235,.608761429008721,.923879532511287,.38268343236509,.99144486137381,.130526192220051,.99144486137381,-.130526192220051,.923879532511287,-.38268343236509,.793353340291235,-.60876142900872,.608761429008721,-.793353340291235,.38268343236509,-.923879532511287,.130526192220052,-.99144486137381,-.130526192220052,-.99144486137381,-.38268343236509,-.923879532511287,-.608761429008721,-.793353340291235,-.793353340291235,-.608761429008721,-.923879532511287,-.38268343236509,-.99144486137381,-.130526192220052,-.99144486137381,.130526192220051,-.923879532511287,.38268343236509,-.793353340291235,.608761429008721,-.608761429008721,.793353340291235,-.38268343236509,.923879532511287,-.130526192220052,.99144486137381,.130526192220052,.99144486137381,.38268343236509,.923879532511287,.608761429008721,.793353340291235,.793353340291235,.608761429008721,.923879532511287,.38268343236509,.99144486137381,.130526192220051,.99144486137381,-.130526192220051,.923879532511287,-.38268343236509,.793353340291235,-.60876142900872,.608761429008721,-.793353340291235,.38268343236509,-.923879532511287,.130526192220052,-.99144486137381,-.130526192220052,-.99144486137381,-.38268343236509,-.923879532511287,-.608761429008721,-.793353340291235,-.793353340291235,-.608761429008721,-.923879532511287,-.38268343236509,-.99144486137381,-.130526192220052,-.99144486137381,.130526192220051,-.923879532511287,.38268343236509,-.793353340291235,.608761429008721,-.608761429008721,.793353340291235,-.38268343236509,.923879532511287,-.130526192220052,.99144486137381,.38268343236509,.923879532511287,.923879532511287,.38268343236509,.923879532511287,-.38268343236509,.38268343236509,-.923879532511287,-.38268343236509,-.923879532511287,-.923879532511287,-.38268343236509,-.923879532511287,.38268343236509,-.38268343236509,.923879532511287];_RandVecs2D=[-.2700222198,-.9628540911,.3863092627,-.9223693152,.04444859006,-.999011673,-.5992523158,-.8005602176,-.7819280288,.6233687174,.9464672271,.3227999196,-.6514146797,-.7587218957,.9378472289,.347048376,-.8497875957,-.5271252623,-.879042592,.4767432447,-.892300288,-.4514423508,-.379844434,-.9250503802,-.9951650832,.0982163789,.7724397808,-.6350880136,.7573283322,-.6530343002,-.9928004525,-.119780055,-.0532665713,.9985803285,.9754253726,-.2203300762,-.7665018163,.6422421394,.991636706,.1290606184,-.994696838,.1028503788,-.5379205513,-.84299554,.5022815471,-.8647041387,.4559821461,-.8899889226,-.8659131224,-.5001944266,.0879458407,-.9961252577,-.5051684983,.8630207346,.7753185226,-.6315704146,-.6921944612,.7217110418,-.5191659449,-.8546734591,.8978622882,-.4402764035,-.1706774107,.9853269617,-.9353430106,-.3537420705,-.9992404798,.03896746794,-.2882064021,-.9575683108,-.9663811329,.2571137995,-.8759714238,-.4823630009,-.8303123018,-.5572983775,.05110133755,-.9986934731,-.8558373281,-.5172450752,.09887025282,.9951003332,.9189016087,.3944867976,-.2439375892,-.9697909324,-.8121409387,-.5834613061,-.9910431363,.1335421355,.8492423985,-.5280031709,-.9717838994,-.2358729591,.9949457207,.1004142068,.6241065508,-.7813392434,.662910307,.7486988212,-.7197418176,.6942418282,-.8143370775,-.5803922158,.104521054,-.9945226741,-.1065926113,-.9943027784,.445799684,-.8951327509,.105547406,.9944142724,-.992790267,.1198644477,-.8334366408,.552615025,.9115561563,-.4111755999,.8285544909,-.5599084351,.7217097654,-.6921957921,.4940492677,-.8694339084,-.3652321272,-.9309164803,-.9696606758,.2444548501,.08925509731,-.996008799,.5354071276,-.8445941083,-.1053576186,.9944343981,-.9890284586,.1477251101,.004856104961,.9999882091,.9885598478,.1508291331,.9286129562,-.3710498316,-.5832393863,-.8123003252,.3015207509,.9534596146,-.9575110528,.2883965738,.9715802154,-.2367105511,.229981792,.9731949318,.955763816,-.2941352207,.740956116,.6715534485,-.9971513787,-.07542630764,.6905710663,-.7232645452,-.290713703,-.9568100872,.5912777791,-.8064679708,-.9454592212,-.325740481,.6664455681,.74555369,.6236134912,.7817328275,.9126993851,-.4086316587,-.8191762011,.5735419353,-.8812745759,-.4726046147,.9953313627,.09651672651,.9855650846,-.1692969699,-.8495980887,.5274306472,.6174853946,-.7865823463,.8508156371,.52546432,.9985032451,-.05469249926,.1971371563,-.9803759185,.6607855748,-.7505747292,-.03097494063,.9995201614,-.6731660801,.739491331,-.7195018362,-.6944905383,.9727511689,.2318515979,.9997059088,-.0242506907,.4421787429,-.8969269532,.9981350961,-.061043673,-.9173660799,-.3980445648,-.8150056635,-.5794529907,-.8789331304,.4769450202,.0158605829,.999874213,-.8095464474,.5870558317,-.9165898907,-.3998286786,-.8023542565,.5968480938,-.5176737917,.8555780767,-.8154407307,-.5788405779,.4022010347,-.9155513791,-.9052556868,-.4248672045,.7317445619,.6815789728,-.5647632201,-.8252529947,-.8403276335,-.5420788397,-.9314281527,.363925262,.5238198472,.8518290719,.7432803869,-.6689800195,-.985371561,-.1704197369,.4601468731,.88784281,.825855404,.5638819483,.6182366099,.7859920446,.8331502863,-.553046653,.1500307506,.9886813308,-.662330369,-.7492119075,-.668598664,.743623444,.7025606278,.7116238924,-.5419389763,-.8404178401,-.3388616456,.9408362159,.8331530315,.5530425174,-.2989720662,-.9542618632,.2638522993,.9645630949,.124108739,-.9922686234,-.7282649308,-.6852956957,.6962500149,.7177993569,-.9183535368,.3957610156,-.6326102274,-.7744703352,-.9331891859,-.359385508,-.1153779357,-.9933216659,.9514974788,-.3076565421,-.08987977445,-.9959526224,.6678496916,.7442961705,.7952400393,-.6062947138,-.6462007402,-.7631674805,-.2733598753,.9619118351,.9669590226,-.254931851,-.9792894595,.2024651934,-.5369502995,-.8436138784,-.270036471,-.9628500944,-.6400277131,.7683518247,-.7854537493,-.6189203566,.06005905383,-.9981948257,-.02455770378,.9996984141,-.65983623,.751409442,-.6253894466,-.7803127835,-.6210408851,-.7837781695,.8348888491,.5504185768,-.1592275245,.9872419133,.8367622488,.5475663786,-.8675753916,-.4973056806,-.2022662628,-.9793305667,.9399189937,.3413975472,.9877404807,-.1561049093,-.9034455656,.4287028224,.1269804218,-.9919052235,-.3819600854,.924178821,.9754625894,.2201652486,-.3204015856,-.9472818081,-.9874760884,.1577687387,.02535348474,-.9996785487,.4835130794,-.8753371362,-.2850799925,-.9585037287,-.06805516006,-.99768156,-.7885244045,-.6150034663,.3185392127,-.9479096845,.8880043089,.4598351306,.6476921488,-.7619021462,.9820241299,.1887554194,.9357275128,-.3527237187,-.8894895414,.4569555293,.7922791302,.6101588153,.7483818261,.6632681526,-.7288929755,-.6846276581,.8729032783,-.4878932944,.8288345784,.5594937369,.08074567077,.9967347374,.9799148216,-.1994165048,-.580730673,-.8140957471,-.4700049791,-.8826637636,.2409492979,.9705377045,.9437816757,-.3305694308,-.8927998638,-.4504535528,-.8069622304,.5906030467,.06258973166,.9980393407,-.9312597469,.3643559849,.5777449785,.8162173362,-.3360095855,-.941858566,.697932075,-.7161639607,-.002008157227,-.9999979837,-.1827294312,-.9831632392,-.6523911722,.7578824173,-.4302626911,-.9027037258,-.9985126289,-.05452091251,-.01028102172,-.9999471489,-.4946071129,.8691166802,-.2999350194,.9539596344,.8165471961,.5772786819,.2697460475,.962931498,-.7306287391,-.6827749597,-.7590952064,-.6509796216,-.907053853,.4210146171,-.5104861064,-.8598860013,.8613350597,.5080373165,.5007881595,-.8655698812,-.654158152,.7563577938,-.8382755311,-.545246856,.6940070834,.7199681717,.06950936031,.9975812994,.1702942185,-.9853932612,.2695973274,.9629731466,.5519612192,-.8338697815,.225657487,-.9742067022,.4215262855,-.9068161835,.4881873305,-.8727388672,-.3683854996,-.9296731273,-.9825390578,.1860564427,.81256471,.5828709909,.3196460933,-.9475370046,.9570913859,.2897862643,-.6876655497,-.7260276109,-.9988770922,-.047376731,-.1250179027,.992154486,-.8280133617,.560708367,.9324863769,-.3612051451,.6394653183,.7688199442,-.01623847064,-.9998681473,-.9955014666,-.09474613458,-.81453315,.580117012,.4037327978,-.9148769469,.9944263371,.1054336766,-.1624711654,.9867132919,-.9949487814,-.100383875,-.6995302564,.7146029809,.5263414922,-.85027327,-.5395221479,.841971408,.6579370318,.7530729462,.01426758847,-.9998982128,-.6734383991,.7392433447,.639412098,-.7688642071,.9211571421,.3891908523,-.146637214,-.9891903394,-.782318098,.6228791163,-.5039610839,-.8637263605,-.7743120191,-.6328039957];_Gradients3D=[0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,1,0,1,0,-1,0,1,0,1,0,-1,0,-1,0,-1,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,0,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,1,0,1,0,-1,0,1,0,1,0,-1,0,-1,0,-1,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,0,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,1,0,1,0,-1,0,1,0,1,0,-1,0,-1,0,-1,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,0,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,1,0,1,0,-1,0,1,0,1,0,-1,0,-1,0,-1,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,0,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,1,0,1,0,-1,0,1,0,1,0,-1,0,-1,0,-1,0,1,1,0,0,-1,1,0,0,1,-1,0,0,-1,-1,0,0,1,1,0,0,0,-1,1,0,-1,1,0,0,0,-1,-1,0];_RandVecs3D=[-.7292736885,-.6618439697,.1735581948,0,.790292081,-.5480887466,-.2739291014,0,.7217578935,.6226212466,-.3023380997,0,.565683137,-.8208298145,-.0790000257,0,.760049034,-.5555979497,-.3370999617,0,.3713945616,.5011264475,.7816254623,0,-.1277062463,-.4254438999,-.8959289049,0,-.2881560924,-.5815838982,.7607405838,0,.5849561111,-.662820239,-.4674352136,0,.3307171178,.0391653737,.94291689,0,.8712121778,-.4113374369,-.2679381538,0,.580981015,.7021915846,.4115677815,0,.503756873,.6330056931,-.5878203852,0,.4493712205,.601390195,.6606022552,0,-.6878403724,.09018890807,-.7202371714,0,-.5958956522,-.6469350577,.475797649,0,-.5127052122,.1946921978,-.8361987284,0,-.9911507142,-.05410276466,-.1212153153,0,-.2149721042,.9720882117,-.09397607749,0,-.7518650936,-.5428057603,.3742469607,0,.5237068895,.8516377189,-.02107817834,0,.6333504779,.1926167129,-.7495104896,0,-.06788241606,.3998305789,.9140719259,0,-.5538628599,-.4729896695,-.6852128902,0,-.7261455366,-.5911990757,.3509933228,0,-.9229274737,-.1782808786,.3412049336,0,-.6968815002,.6511274338,.3006480328,0,.9608044783,-.2098363234,-.1811724921,0,.06817146062,-.9743405129,.2145069156,0,-.3577285196,-.6697087264,-.6507845481,0,-.1868621131,.7648617052,-.6164974636,0,-.6541697588,.3967914832,.6439087246,0,.6993340405,-.6164538506,.3618239211,0,-.1546665739,.6291283928,.7617583057,0,-.6841612949,-.2580482182,-.6821542638,0,.5383980957,.4258654885,.7271630328,0,-.5026987823,-.7939832935,-.3418836993,0,.3202971715,.2834415347,.9039195862,0,.8683227101,-.0003762656404,-.4959995258,0,.791120031,-.08511045745,.6057105799,0,-.04011016052,-.4397248749,.8972364289,0,.9145119872,.3579346169,-.1885487608,0,-.9612039066,-.2756484276,.01024666929,0,.6510361721,-.2877799159,-.7023778346,0,-.2041786351,.7365237271,.644859585,0,-.7718263711,.3790626912,.5104855816,0,-.3060082741,-.7692987727,.5608371729,0,.454007341,-.5024843065,.7357899537,0,.4816795475,.6021208291,-.6367380315,0,.6961980369,-.3222197429,.641469197,0,-.6532160499,-.6781148932,.3368515753,0,.5089301236,-.6154662304,-.6018234363,0,-.1635919754,-.9133604627,-.372840892,0,.52408019,-.8437664109,.1157505864,0,.5902587356,.4983817807,-.6349883666,0,.5863227872,.494764745,.6414307729,0,.6779335087,.2341345225,.6968408593,0,.7177054546,-.6858979348,.120178631,0,-.5328819713,-.5205125012,.6671608058,0,-.8654874251,-.0700727088,-.4960053754,0,-.2861810166,.7952089234,.5345495242,0,-.04849529634,.9810836427,-.1874115585,0,-.6358521667,.6058348682,.4781800233,0,.6254794696,-.2861619734,.7258696564,0,-.2585259868,.5061949264,-.8227581726,0,.02136306781,.5064016808,-.8620330371,0,.200111773,.8599263484,.4695550591,0,.4743561372,.6014985084,-.6427953014,0,.6622993731,-.5202474575,-.5391679918,0,.08084972818,-.6532720452,.7527940996,0,-.6893687501,.0592860349,.7219805347,0,-.1121887082,-.9673185067,.2273952515,0,.7344116094,.5979668656,-.3210532909,0,.5789393465,-.2488849713,.7764570201,0,.6988182827,.3557169806,-.6205791146,0,-.8636845529,-.2748771249,-.4224826141,0,-.4247027957,-.4640880967,.777335046,0,.5257722489,-.8427017621,.1158329937,0,.9343830603,.316302472,-.1639543925,0,-.1016836419,-.8057303073,-.5834887393,0,-.6529238969,.50602126,-.5635892736,0,-.2465286165,-.9668205684,-.06694497494,0,-.9776897119,-.2099250524,-.007368825344,0,.7736893337,.5734244712,.2694238123,0,-.6095087895,.4995678998,.6155736747,0,.5794535482,.7434546771,.3339292269,0,-.8226211154,.08142581855,.5627293636,0,-.510385483,.4703667658,.7199039967,0,-.5764971849,-.07231656274,-.8138926898,0,.7250628871,.3949971505,-.5641463116,0,-.1525424005,.4860840828,-.8604958341,0,-.5550976208,-.4957820792,.667882296,0,-.1883614327,.9145869398,.357841725,0,.7625556724,-.5414408243,-.3540489801,0,-.5870231946,-.3226498013,-.7424963803,0,.3051124198,.2262544068,-.9250488391,0,.6379576059,.577242424,-.5097070502,0,-.5966775796,.1454852398,-.7891830656,0,-.658330573,.6555487542,-.3699414651,0,.7434892426,.2351084581,.6260573129,0,.5562114096,.8264360377,-.0873632843,0,-.3028940016,-.8251527185,.4768419182,0,.1129343818,-.985888439,-.1235710781,0,.5937652891,-.5896813806,.5474656618,0,.6757964092,-.5835758614,-.4502648413,0,.7242302609,-.1152719764,.6798550586,0,-.9511914166,.0753623979,-.2992580792,0,.2539470961,-.1886339355,.9486454084,0,.571433621,-.1679450851,-.8032795685,0,-.06778234979,.3978269256,.9149531629,0,.6074972649,.733060024,-.3058922593,0,-.5435478392,.1675822484,.8224791405,0,-.5876678086,-.3380045064,-.7351186982,0,-.7967562402,.04097822706,-.6029098428,0,-.1996350917,.8706294745,.4496111079,0,-.02787660336,-.9106232682,-.4122962022,0,-.7797625996,-.6257634692,.01975775581,0,-.5211232846,.7401644346,-.4249554471,0,.8575424857,.4053272873,-.3167501783,0,.1045223322,.8390195772,-.5339674439,0,.3501822831,.9242524096,-.1520850155,0,.1987849858,.07647613266,.9770547224,0,.7845996363,.6066256811,-.1280964233,0,.09006737436,-.9750989929,-.2026569073,0,-.8274343547,-.542299559,.1458203587,0,-.3485797732,-.415802277,.840000362,0,-.2471778936,-.7304819962,-.6366310879,0,-.3700154943,.8577948156,.3567584454,0,.5913394901,-.548311967,-.5913303597,0,.1204873514,-.7626472379,-.6354935001,0,.616959265,.03079647928,.7863922953,0,.1258156836,-.6640829889,-.7369967419,0,-.6477565124,-.1740147258,-.7417077429,0,.6217889313,-.7804430448,-.06547655076,0,.6589943422,-.6096987708,.4404473475,0,-.2689837504,-.6732403169,-.6887635427,0,-.3849775103,.5676542638,.7277093879,0,.5754444408,.8110471154,-.1051963504,0,.9141593684,.3832947817,.131900567,0,-.107925319,.9245493968,.3654593525,0,.377977089,.3043148782,.8743716458,0,-.2142885215,-.8259286236,.5214617324,0,.5802544474,.4148098596,-.7008834116,0,-.1982660881,.8567161266,-.4761596756,0,-.03381553704,.3773180787,-.9254661404,0,-.6867922841,-.6656597827,.2919133642,0,.7731742607,-.2875793547,-.5652430251,0,-.09655941928,.9193708367,-.3813575004,0,.2715702457,-.9577909544,-.09426605581,0,.2451015704,-.6917998565,-.6792188003,0,.977700782,-.1753855374,.1155036542,0,-.5224739938,.8521606816,.02903615945,0,-.7734880599,-.5261292347,.3534179531,0,-.7134492443,-.269547243,.6467878011,0,.1644037271,.5105846203,-.8439637196,0,.6494635788,.05585611296,.7583384168,0,-.4711970882,.5017280509,-.7254255765,0,-.6335764307,-.2381686273,-.7361091029,0,-.9021533097,-.270947803,-.3357181763,0,-.3793711033,.872258117,.3086152025,0,-.6855598966,-.3250143309,.6514394162,0,.2900942212,-.7799057743,-.5546100667,0,-.2098319339,.85037073,.4825351604,0,-.4592603758,.6598504336,-.5947077538,0,.8715945488,.09616365406,-.4807031248,0,-.6776666319,.7118504878,-.1844907016,0,.7044377633,.312427597,.637304036,0,-.7052318886,-.2401093292,-.6670798253,0,.081921007,-.7207336136,-.6883545647,0,-.6993680906,-.5875763221,-.4069869034,0,-.1281454481,.6419895885,.7559286424,0,-.6337388239,-.6785471501,-.3714146849,0,.5565051903,-.2168887573,-.8020356851,0,-.5791554484,.7244372011,-.3738578718,0,.1175779076,-.7096451073,.6946792478,0,-.6134619607,.1323631078,.7785527795,0,.6984635305,-.02980516237,-.715024719,0,.8318082963,-.3930171956,.3919597455,0,.1469576422,.05541651717,-.9875892167,0,.708868575,-.2690503865,.6520101478,0,.2726053183,.67369766,-.68688995,0,-.6591295371,.3035458599,-.6880466294,0,.4815131379,-.7528270071,.4487723203,0,.9430009463,.1675647412,-.2875261255,0,.434802957,.7695304522,-.4677277752,0,.3931996188,.594473625,.7014236729,0,.7254336655,-.603925654,.3301814672,0,.7590235227,-.6506083235,.02433313207,0,-.8552768592,-.3430042733,.3883935666,0,-.6139746835,.6981725247,.3682257648,0,-.7465905486,-.5752009504,.3342849376,0,.5730065677,.810555537,-.1210916791,0,-.9225877367,-.3475211012,-.167514036,0,-.7105816789,-.4719692027,-.5218416899,0,-.08564609717,.3583001386,.929669703,0,-.8279697606,-.2043157126,.5222271202,0,.427944023,.278165994,.8599346446,0,.5399079671,-.7857120652,-.3019204161,0,.5678404253,-.5495413974,-.6128307303,0,-.9896071041,.1365639107,-.04503418428,0,-.6154342638,-.6440875597,.4543037336,0,.1074204368,-.7946340692,.5975094525,0,-.3595449969,-.8885529948,.28495784,0,-.2180405296,.1529888965,.9638738118,0,-.7277432317,-.6164050508,-.3007234646,0,.7249729114,-.00669719484,.6887448187,0,-.5553659455,-.5336586252,.6377908264,0,.5137558015,.7976208196,-.3160000073,0,-.3794024848,.9245608561,-.03522751494,0,.8229248658,.2745365933,-.4974176556,0,-.5404114394,.6091141441,.5804613989,0,.8036581901,-.2703029469,.5301601931,0,.6044318879,.6832968393,.4095943388,0,.06389988817,.9658208605,-.2512108074,0,.1087113286,.7402471173,-.6634877936,0,-.713427712,-.6926784018,.1059128479,0,.6458897819,-.5724548511,-.5050958653,0,-.6553931414,.7381471625,.159995615,0,.3910961323,.9188871375,-.05186755998,0,-.4879022471,-.5904376907,.6429111375,0,.6014790094,.7707441366,-.2101820095,0,-.5677173047,.7511360995,.3368851762,0,.7858573506,.226674665,.5753666838,0,-.4520345543,-.604222686,-.6561857263,0,.002272116345,.4132844051,-.9105991643,0,-.5815751419,-.5162925989,.6286591339,0,-.03703704785,.8273785755,.5604221175,0,-.5119692504,.7953543429,-.3244980058,0,-.2682417366,-.9572290247,-.1084387619,0,-.2322482736,-.9679131102,-.09594243324,0,.3554328906,-.8881505545,.2913006227,0,.7346520519,-.4371373164,.5188422971,0,.9985120116,.04659011161,-.02833944577,0,-.3727687496,-.9082481361,.1900757285,0,.91737377,-.3483642108,.1925298489,0,.2714911074,.4147529736,-.8684886582,0,.5131763485,-.7116334161,.4798207128,0,-.8737353606,.18886992,-.4482350644,0,.8460043821,-.3725217914,.3814499973,0,.8978727456,-.1780209141,-.4026575304,0,.2178065647,-.9698322841,-.1094789531,0,-.1518031304,-.7788918132,-.6085091231,0,-.2600384876,-.4755398075,-.8403819825,0,.572313509,-.7474340931,-.3373418503,0,-.7174141009,.1699017182,-.6756111411,0,-.684180784,.02145707593,-.7289967412,0,-.2007447902,.06555605789,-.9774476623,0,-.1148803697,-.8044887315,.5827524187,0,-.7870349638,.03447489231,.6159443543,0,-.2015596421,.6859872284,.6991389226,0,-.08581082512,-.10920836,-.9903080513,0,.5532693395,.7325250401,-.396610771,0,-.1842489331,-.9777375055,-.1004076743,0,.0775473789,-.9111505856,.4047110257,0,.1399838409,.7601631212,-.6344734459,0,.4484419361,-.845289248,.2904925424,0];_PrimeX=501125321;_PrimeY=1136930381;_PrimeZ=1720413743;static _Lerp(e,t,i){return e+i*(t-e)}static _InterpHermite(e){return e*e*(3-2*e)}static _InterpQuintic(e){return e*e*e*(e*(6*e-15)+10)}static _CubicLerp(e,t,i,s,a){let r=s-i-(e-t);return a*a*a*r+a*a*(e-t-r)+a*(i-e)+t}static _PingPong(e){return(e-=2*Math.trunc(.5*e))<1?e:2-e}_CalculateFractalBounding(){let e=Math.abs(this._Gain),t=e,i=1;for(let s=1;s<this._Octaves;s++)i+=t,t*=e;this._FractalBounding=1/i}_HashR2(e,t,i){let s=e^t^i;return s=Math.imul(s,668265261),s}_HashR3(e,t,i,s){let a=e^t^i^s;return a=Math.imul(a,668265261),a}_ValCoordR2(e,t,i){let s=this._HashR2(e,t,i);return s=Math.imul(s,s),s^=s<<19,s*(1/2147483648)}_ValCoordR3(e,t,i,s){let a=this._HashR3(e,t,i,s);return a=Math.imul(a,a),a^=a<<19,a*(1/2147483648)}_GradCoordR2(e,t,i,s,a){let r=this._HashR2(e,t,i);return r^=r>>15,r&=254,s*this._Gradients2D[r]+a*this._Gradients2D[1|r]}_GradCoordR3(e,t,i,s,a,r,o){let l=this._HashR3(e,t,i,s);return l^=l>>15,l&=252,a*this._Gradients3D[l]+r*this._Gradients3D[1|l]+o*this._Gradients3D[2|l]}_GenNoiseSingleR2(e,t,i){switch(this._NoiseType){case FastNoiseLite.NoiseType.OpenSimplex2:return this._SingleOpenSimplex2R2(e,t,i);case FastNoiseLite.NoiseType.OpenSimplex2S:return this._SingleOpenSimplex2SR2(e,t,i);case FastNoiseLite.NoiseType.Cellular:return this._SingleCellularR2(e,t,i);case FastNoiseLite.NoiseType.Perlin:return this._SinglePerlinR2(e,t,i);case FastNoiseLite.NoiseType.ValueCubic:return this._SingleValueCubicR2(e,t,i);case FastNoiseLite.NoiseType.Value:return this._SingleValueR2(e,t,i);default:return 0}}_GenNoiseSingleR3(e,t,i,s){switch(this._NoiseType){case FastNoiseLite.NoiseType.OpenSimplex2:return this._SingleOpenSimplex2R3(e,t,i,s);case FastNoiseLite.NoiseType.OpenSimplex2S:return this._SingleOpenSimplex2SR3(e,t,i,s);case FastNoiseLite.NoiseType.Cellular:return this._SingleCellularR3(e,t,i,s);case FastNoiseLite.NoiseType.Perlin:return this._SinglePerlinR3(e,t,i,s);case FastNoiseLite.NoiseType.ValueCubic:return this._SingleValueCubicR3(e,t,i,s);case FastNoiseLite.NoiseType.Value:return this._SingleValueR3(e,t,i,s);default:return 0}}_UpdateTransformType3D(){switch(this._RotationType3D){case FastNoiseLite.RotationType3D.ImproveXYPlanes:this._TransformType3D=FastNoiseLite.TransformType3D.ImproveXYPlanes;break;case FastNoiseLite.RotationType3D.ImproveXZPlanes:this._TransformType3D=FastNoiseLite.TransformType3D.ImproveXZPlanes;break;default:switch(this._NoiseType){case FastNoiseLite.NoiseType.OpenSimplex2:case FastNoiseLite.NoiseType.OpenSimplex2S:this._TransformType3D=FastNoiseLite.TransformType3D.DefaultOpenSimplex2;break;default:this._TransformType3D=FastNoiseLite.TransformType3D.None}}}_UpdateWarpTransformType3D(){switch(this._RotationType3D){case FastNoiseLite.RotationType3D.ImproveXYPlanes:this._WarpTransformType3D=FastNoiseLite.TransformType3D.ImproveXYPlanes;break;case FastNoiseLite.RotationType3D.ImproveXZPlanes:this._WarpTransformType3D=FastNoiseLite.TransformType3D.ImproveXZPlanes;break;default:switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:this._WarpTransformType3D=FastNoiseLite.TransformType3D.DefaultOpenSimplex2;break;default:this._WarpTransformType3D=FastNoiseLite.TransformType3D.None}}}_GenFractalFBmR2(e,t){let i=this._Seed,s=0,a=this._FractalBounding;for(let r=0;r<this._Octaves;r++){let r=this._GenNoiseSingleR2(i++,e,t);s+=r*a,a*=FastNoiseLite._Lerp(1,.5*Math.min(r+1,2),this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,a*=this._Gain}return s}_GenFractalFBmR3(e,t,i){let s=this._Seed,a=0,r=this._FractalBounding;for(let o=0;o<this._Octaves;o++){let o=this._GenNoiseSingleR3(s++,e,t,i);a+=o*r,r*=FastNoiseLite._Lerp(1,.5*(o+1),this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,i*=this._Lacunarity,r*=this._Gain}return a}_GenFractalRidgedR2(e,t){let i=this._Seed,s=0,a=this._FractalBounding;for(let r=0;r<this._Octaves;r++){let r=Math.abs(this._GenNoiseSingleR2(i++,e,t));s+=(-2*r+1)*a,a*=FastNoiseLite._Lerp(1,1-r,this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,a*=this._Gain}return s}_GenFractalRidgedR3(e,t,i){let s=this._Seed,a=0,r=this._FractalBounding;for(let o=0;o<this._Octaves;o++){let o=Math.abs(this._GenNoiseSingleR3(s++,e,t,i));a+=(-2*o+1)*r,r*=FastNoiseLite._Lerp(1,1-o,this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,i*=this._Lacunarity,r*=this._Gain}return a}_GenFractalPingPongR2(e,t){let i=this._Seed,s=0,a=this._FractalBounding;for(let r=0;r<this._Octaves;r++){let r=FastNoiseLite._PingPong((this._GenNoiseSingleR2(i++,e,t)+1)*this._PingPongStrength);s+=2*(r-.5)*a,a*=FastNoiseLite._Lerp(1,r,this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,a*=this._Gain}return s}_GenFractalPingPongR3(e,t,i){let s=this._Seed,a=0,r=this._FractalBounding;for(let o=0;o<this._Octaves;o++){let o=FastNoiseLite._PingPong((this._GenNoiseSingleR3(s++,e,t,i)+1)*this._PingPongStrength);a+=2*(o-.5)*r,r*=FastNoiseLite._Lerp(1,o,this._WeightedStrength),e*=this._Lacunarity,t*=this._Lacunarity,i*=this._Lacunarity,r*=this._Gain}return a}_SingleOpenSimplex2R2(e,t,i){const s=.21132486540518713;let a,r,o,l=Math.floor(t),h=Math.floor(i),n=t-l,_=i-h,c=(n+_)*s,p=n-c,d=_-c;l=Math.imul(l,this._PrimeX),h=Math.imul(h,this._PrimeY);let m=.5-p*p-d*d;a=m<=0?0:m*m*(m*m)*this._GradCoordR2(e,l,h,p,d);let u=3.1547005383792506*c+(-.6666666666666666+m);if(u<=0)o=0;else{let t=p+(2*s-1),i=d+(2*s-1);o=u*u*(u*u)*this._GradCoordR2(e,l+this._PrimeX,h+this._PrimeY,t,i)}if(d>p){let t=p+s,i=d+(s-1),a=.5-t*t-i*i;r=a<=0?0:a*a*(a*a)*this._GradCoordR2(e,l,h+this._PrimeY,t,i)}else{let t=p+(s-1),i=d+s,a=.5-t*t-i*i;r=a<=0?0:a*a*(a*a)*this._GradCoordR2(e,l+this._PrimeX,h,t,i)}return 99.83685446303647*(a+r+o)}_SingleOpenSimplex2R3(e,t,i,s){let a=Math.round(t),r=Math.round(i),o=Math.round(s),l=t-a,h=i-r,n=s-o,_=Math.trunc(-1-h|1),c=Math.trunc(-1-l|1),p=Math.trunc(-1-n|1),d=c*-l,m=_*-h,u=p*-n;a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY),o=Math.imul(o,this._PrimeZ);let R=0,L=.6-l*l-(h*h+n*n);for(let t=0;;t++){if(L>0&&(R+=L*L*(L*L)*this._GradCoordR3(e,a,r,o,l,h,n)),d>=m&&d>=u){let t=L+d+d;t>1&&(t-=1,R+=t*t*(t*t)*this._GradCoordR3(e,a-c*this._PrimeX,r,o,l+c,h,n))}else if(m>d&&m>=u){let t=L+m+m;t>1&&(t-=1,R+=t*t*(t*t)*this._GradCoordR3(e,a,r-_*this._PrimeY,o,l,h+_,n))}else{let t=L+u+u;t>1&&(t-=1,R+=t*t*(t*t)*this._GradCoordR3(e,a,r,o-p*this._PrimeZ,l,h,n+p))}if(1===t)break;d=.5-d,m=.5-m,u=.5-u,l=c*d,h=_*m,n=p*u,L+=.75-d-(m+u),a+=c>>1&this._PrimeX,r+=_>>1&this._PrimeY,o+=p>>1&this._PrimeZ,c=-c,_=-_,p=-p,e=~e}return 32.69428253173828*R}_SingleOpenSimplex2SR2(e,t,i){const s=.21132486540518713;let a=Math.floor(t),r=Math.floor(i),o=t-a,l=i-r;a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY);let h=a+this._PrimeX,n=r+this._PrimeY,_=(o+l)*s,c=o-_,p=l-_,d=2/3-c*c-p*p,m=d*d*(d*d)*this._GradCoordR2(e,a,r,c,p),u=3.1547005383792506*_+(-.6666666666666666+d),R=c-(1-2*s),L=p-(1-2*s);m+=u*u*(u*u)*this._GradCoordR2(e,h,n,R,L);let F=o-l;if(_>s){if(o+F>1){let t=c+(3*s-2),i=p+(3*s-1),o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a+(this._PrimeX<<1),r+this._PrimeY,t,i))}else{let t=c+s,i=p+(s-1),o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a,r+this._PrimeY,t,i))}if(l-F>1){let t=c+(3*s-1),i=p+(3*s-2),o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a+this._PrimeX,r+(this._PrimeY<<1),t,i))}else{let t=c+(s-1),i=p+s,o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a+this._PrimeX,r,t,i))}}else{if(o+F<0){let t=c+(1-s),i=p-s,o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a-this._PrimeX,r,t,i))}else{let t=c+(s-1),i=p+s,o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a+this._PrimeX,r,t,i))}if(l<F){let t=c-s,i=p-(s-1),o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a,r-this._PrimeY,t,i))}else{let t=c+s,i=p+(s-1),o=2/3-t*t-i*i;o>0&&(m+=o*o*(o*o)*this._GradCoordR2(e,a,r+this._PrimeY,t,i))}}return 18.24196194486065*m}_SingleOpenSimplex2SR3(e,t,i,s){let a=Math.floor(t),r=Math.floor(i),o=Math.floor(s),l=t-a,h=i-r,n=s-o;a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY),o=Math.imul(o,this._PrimeZ);let _=e+1293373,c=Math.trunc(-.5-l),p=Math.trunc(-.5-h),d=Math.trunc(-.5-n),m=l+c,u=h+p,R=n+d,L=.75-m*m-u*u-R*R,F=L*L*(L*L)*this._GradCoordR3(e,a+(c&this._PrimeX),r+(p&this._PrimeY),o+(d&this._PrimeZ),m,u,R),D=l-.5,C=h-.5,N=n-.5,P=.75-D*D-C*C-N*N;F+=P*P*(P*P)*this._GradCoordR3(_,a+this._PrimeX,r+this._PrimeY,o+this._PrimeZ,D,C,N);let V=((1|c)<<1)*D,y=((1|p)<<1)*C,T=((1|d)<<1)*N,f=(-2-(c<<2))*D-1,S=(-2-(p<<2))*C-1,g=(-2-(d<<2))*N-1,M=!1,G=V+L;if(G>0){let t=m-(1|c);F+=G*G*(G*G)*this._GradCoordR3(e,a+(~c&this._PrimeX),r+(p&this._PrimeY),o+(d&this._PrimeZ),t,u,R)}else{let t=y+T+L;if(t>0){let i=m,s=u-(1|p),l=R-(1|d);F+=t*t*(t*t)*this._GradCoordR3(e,a+(c&this._PrimeX),r+(~p&this._PrimeY),o+(~d&this._PrimeZ),i,s,l)}let i=f+P;if(i>0){let e=(1|c)+D;F+=i*i*(i*i)*this._GradCoordR3(_,a+(c&2*this._PrimeX),r+this._PrimeY,o+this._PrimeZ,e,C,N),M=!0}}let b=!1,X=y+L;if(X>0){let t=m,i=u-(1|p);F+=X*X*(X*X)*this._GradCoordR3(e,a+(c&this._PrimeX),r+(~p&this._PrimeY),o+(d&this._PrimeZ),t,i,R)}else{let t=V+T+L;if(t>0){let i=m-(1|c),s=u,l=R-(1|d);F+=t*t*(t*t)*this._GradCoordR3(e,a+(~c&this._PrimeX),r+(p&this._PrimeY),o+(~d&this._PrimeZ),i,s,l)}let i=S+P;if(i>0){let e=D,t=(1|p)+C;F+=i*i*(i*i)*this._GradCoordR3(_,a+this._PrimeX,r+(p&this._PrimeY<<1),o+this._PrimeZ,e,t,N),b=!0}}let W=!1,Y=T+L;if(Y>0){let t=m,i=u,s=R-(1|d);F+=Y*Y*(Y*Y)*this._GradCoordR3(e,a+(c&this._PrimeX),r+(p&this._PrimeY),o+(~d&this._PrimeZ),t,i,s)}else{let t=V+y+L;if(t>0){let i=m-(1|c),s=u-(1|p);F+=t*t*(t*t)*this._GradCoordR3(e,a+(~c&this._PrimeX),r+(~p&this._PrimeY),o+(d&this._PrimeZ),i,s,R)}let i=g+P;if(i>0){let e=D,t=C,s=(1|d)+N;F+=i*i*(i*i)*this._GradCoordR3(_,a+this._PrimeX,r+this._PrimeY,o+(d&this._PrimeZ<<1),e,t,s),W=!0}}if(!M){let e=S+g+P;if(e>0){let t=D,i=(1|p)+C,s=(1|d)+N;F+=e*e*(e*e)*this._GradCoordR3(_,a+this._PrimeX,r+(p&this._PrimeY<<1),o+(d&this._PrimeZ<<1),t,i,s)}}if(!b){let e=f+g+P;if(e>0){let t=(1|c)+D,i=C,s=(1|d)+N;F+=e*e*(e*e)*this._GradCoordR3(_,a+(c&2*this._PrimeX),r+this._PrimeY,o+(d&this._PrimeZ<<1),t,i,s)}}if(!W){let e=f+S+P;if(e>0){let t=(1|c)+D,i=(1|p)+C;F+=e*e*(e*e)*this._GradCoordR3(_,a+(c&this._PrimeX<<1),r+(p&this._PrimeY<<1),o+this._PrimeZ,t,i,N)}}return 9.046026385208288*F}_SingleCellularR2(e,t,i){let s=Math.round(t),a=Math.round(i),r=Number.MAX_VALUE,o=Number.MAX_VALUE,l=0,h=.43701595*this._CellularJitterModifier,n=(s-1)*this._PrimeX,_=(a-1)*this._PrimeY;switch(this._CellularDistanceFunction){default:case FastNoiseLite.CellularDistanceFunction.Euclidean:case FastNoiseLite.CellularDistanceFunction.EuclideanSq:for(let c=s-1;c<=s+1;c++){let s=_;for(let _=a-1;_<=a+1;_++){let a=this._HashR2(e,n,s),p=510&a,d=c-t+this._RandVecs2D[p]*h,m=_-i+this._RandVecs2D[1|p]*h,u=d*d+m*m;o=Math.max(Math.min(o,u),r),u<r&&(r=u,l=a),s+=this._PrimeY}n+=this._PrimeX}break;case FastNoiseLite.CellularDistanceFunction.Manhattan:for(let c=s-1;c<=s+1;c++){let s=_;for(let _=a-1;_<=a+1;_++){let a=this._HashR2(e,n,s),p=510&a,d=c-t+this._RandVecs2D[p]*h,m=_-i+this._RandVecs2D[1|p]*h,u=Math.abs(d)+Math.abs(m);o=Math.max(Math.min(o,u),r),u<r&&(r=u,l=a),s+=this._PrimeY}n+=this._PrimeX}break;case FastNoiseLite.CellularDistanceFunction.Hybrid:for(let c=s-1;c<=s+1;c++){let s=_;for(let _=a-1;_<=a+1;_++){let a=this._HashR2(e,n,s),p=510&a,d=c-t+this._RandVecs2D[p]*h,m=_-i+this._RandVecs2D[1|p]*h,u=Math.abs(d)+Math.abs(m)+(d*d+m*m);o=Math.max(Math.min(o,u),r),u<r&&(r=u,l=a),s+=this._PrimeY}n+=this._PrimeX}}switch(this._CellularDistanceFunction===FastNoiseLite.CellularDistanceFunction.Euclidean&&this._CellularReturnType!==FastNoiseLite.CellularReturnType.CellValue&&(r=Math.sqrt(r),this._CellularReturnType!==FastNoiseLite.CellularReturnType.CellValue&&(o=Math.sqrt(o))),this._CellularReturnType){case FastNoiseLite.CellularReturnType.CellValue:return l*(1/2147483648);case FastNoiseLite.CellularReturnType.Distance:return r-1;case FastNoiseLite.CellularReturnType.Distance2:return o-1;case FastNoiseLite.CellularReturnType.Distance2Add:return.5*(o+r)-1;case FastNoiseLite.CellularReturnType.Distance2Sub:return o-r-1;case FastNoiseLite.CellularReturnType.Distance2Mul:return o*r*.5-1;case FastNoiseLite.CellularReturnType.Distance2Div:return r/o-1;default:return 0}}_SingleCellularR3(e,t,i,s){let a=Math.round(t),r=Math.round(i),o=Math.round(s),l=Number.MAX_VALUE,h=Number.MAX_VALUE,n=0,_=.39614353*this._CellularJitterModifier,c=(a-1)*this._PrimeX,p=(r-1)*this._PrimeY,d=(o-1)*this._PrimeZ;switch(this._CellularDistanceFunction){case FastNoiseLite.CellularDistanceFunction.Euclidean:case FastNoiseLite.CellularDistanceFunction.EuclideanSq:for(let m=a-1;m<=a+1;m++){let a=p;for(let p=r-1;p<=r+1;p++){let r=d;for(let d=o-1;d<=o+1;d++){let o=this._HashR3(e,c,a,r),u=1020&o,R=m-t+this._RandVecs3D[u]*_,L=p-i+this._RandVecs3D[1|u]*_,F=d-s+this._RandVecs3D[2|u]*_,D=R*R+L*L+F*F;h=Math.max(Math.min(h,D),l),D<l&&(l=D,n=o),r+=this._PrimeZ}a+=this._PrimeY}c+=this._PrimeX}break;case FastNoiseLite.CellularDistanceFunction.Manhattan:for(let m=a-1;m<=a+1;m++){let a=p;for(let p=r-1;p<=r+1;p++){let r=d;for(let d=o-1;d<=o+1;d++){let o=this._HashR3(e,c,a,r),u=1020&o,R=m-t+this._RandVecs3D[u]*_,L=p-i+this._RandVecs3D[1|u]*_,F=d-s+this._RandVecs3D[2|u]*_,D=Math.abs(R)+Math.abs(L)+Math.abs(F);h=Math.max(Math.min(h,D),l),D<l&&(l=D,n=o),r+=this._PrimeZ}a+=this._PrimeY}c+=this._PrimeX}break;case FastNoiseLite.CellularDistanceFunction.Hybrid:for(let m=a-1;m<=a+1;m++){let a=p;for(let p=r-1;p<=r+1;p++){let r=d;for(let d=o-1;d<=o+1;d++){let o=this._HashR3(e,c,a,r),u=1020&o,R=m-t+this._RandVecs3D[u]*_,L=p-i+this._RandVecs3D[1|u]*_,F=d-s+this._RandVecs3D[2|u]*_,D=Math.abs(R)+Math.abs(L)+Math.abs(F)+(R*R+L*L+F*F);h=Math.max(Math.min(h,D),l),D<l&&(l=D,n=o),r+=this._PrimeZ}a+=this._PrimeY}c+=this._PrimeX}}switch(this._CellularDistanceFunction===FastNoiseLite.CellularDistanceFunction.Euclidean&&this._CellularReturnType!==FastNoiseLite.CellularReturnType.CellValue&&(l=Math.sqrt(l),this._CellularReturnType!==FastNoiseLite.CellularReturnType.CellValue&&(h=Math.sqrt(h))),this._CellularReturnType){case FastNoiseLite.CellularReturnType.CellValue:return n*(1/2147483648);case FastNoiseLite.CellularReturnType.Distance:return l-1;case FastNoiseLite.CellularReturnType.Distance2:return h-1;case FastNoiseLite.CellularReturnType.Distance2Add:return.5*(h+l)-1;case FastNoiseLite.CellularReturnType.Distance2Sub:return h-l-1;case FastNoiseLite.CellularReturnType.Distance2Mul:return h*l*.5-1;case FastNoiseLite.CellularReturnType.Distance2Div:return l/h-1;default:return 0}}_SinglePerlinR2(e,t,i){let s=Math.floor(t),a=Math.floor(i),r=t-s,o=i-a,l=r-1,h=o-1,n=FastNoiseLite._InterpQuintic(r),_=FastNoiseLite._InterpQuintic(o);s=Math.imul(s,this._PrimeX),a=Math.imul(a,this._PrimeY);let c=s+this._PrimeX,p=a+this._PrimeY,d=FastNoiseLite._Lerp(this._GradCoordR2(e,s,a,r,o),this._GradCoordR2(e,c,a,l,o),n),m=FastNoiseLite._Lerp(this._GradCoordR2(e,s,p,r,h),this._GradCoordR2(e,c,p,l,h),n);return 1.4247691104677813*FastNoiseLite._Lerp(d,m,_)}_SinglePerlinR3(e,t,i,s){let a=Math.floor(t),r=Math.floor(i),o=Math.floor(s),l=t-a,h=i-r,n=s-o,_=l-1,c=h-1,p=n-1,d=FastNoiseLite._InterpQuintic(l),m=FastNoiseLite._InterpQuintic(h),u=FastNoiseLite._InterpQuintic(n);a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY),o=Math.imul(o,this._PrimeZ);let R=a+this._PrimeX,L=r+this._PrimeY,F=o+this._PrimeZ,D=FastNoiseLite._Lerp(this._GradCoordR3(e,a,r,o,l,h,n),this._GradCoordR3(e,R,r,o,_,h,n),d),C=FastNoiseLite._Lerp(this._GradCoordR3(e,a,L,o,l,c,n),this._GradCoordR3(e,R,L,o,_,c,n),d),N=FastNoiseLite._Lerp(this._GradCoordR3(e,a,r,F,l,h,p),this._GradCoordR3(e,R,r,F,_,h,p),d),P=FastNoiseLite._Lerp(this._GradCoordR3(e,a,L,F,l,c,p),this._GradCoordR3(e,R,L,F,_,c,p),d),V=FastNoiseLite._Lerp(D,C,m),y=FastNoiseLite._Lerp(N,P,m);return.9649214148521423*FastNoiseLite._Lerp(V,y,u)}_SingleValueCubicR2(e,t,i){let s=Math.floor(t),a=Math.floor(i),r=t-s,o=i-a;s=Math.imul(s,this._PrimeX),a=Math.imul(a,this._PrimeY);let l=s-this._PrimeX,h=a-this._PrimeY,n=s+this._PrimeX,_=a+this._PrimeY,c=s+(this._PrimeX<<1),p=a+(this._PrimeY<<1);return FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(this._ValCoordR2(e,l,h),this._ValCoordR2(e,s,h),this._ValCoordR2(e,n,h),this._ValCoordR2(e,c,h),r),FastNoiseLite._CubicLerp(this._ValCoordR2(e,l,a),this._ValCoordR2(e,s,a),this._ValCoordR2(e,n,a),this._ValCoordR2(e,c,a),r),FastNoiseLite._CubicLerp(this._ValCoordR2(e,l,_),this._ValCoordR2(e,s,_),this._ValCoordR2(e,n,_),this._ValCoordR2(e,c,_),r),FastNoiseLite._CubicLerp(this._ValCoordR2(e,l,p),this._ValCoordR2(e,s,p),this._ValCoordR2(e,n,p),this._ValCoordR2(e,c,p),r),o)*(1/2.25)}_SingleValueCubicR3(e,t,i,s){let a=Math.floor(t),r=Math.floor(i),o=Math.floor(s),l=t-a,h=i-r,n=s-o;a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY),o=Math.imul(o,this._PrimeZ);let _=a-this._PrimeX,c=r-this._PrimeY,p=o-this._PrimeZ,d=a+this._PrimeX,m=r+this._PrimeY,u=o+this._PrimeZ,R=a+(this._PrimeX<<1),L=r+(this._PrimeY<<1),F=o+(this._PrimeZ<<1);return FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,c,p),this._ValCoordR3(e,a,c,p),this._ValCoordR3(e,d,c,p),this._ValCoordR3(e,R,c,p),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,r,p),this._ValCoordR3(e,a,r,p),this._ValCoordR3(e,d,r,p),this._ValCoordR3(e,R,r,p),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,m,p),this._ValCoordR3(e,a,m,p),this._ValCoordR3(e,d,m,p),this._ValCoordR3(e,R,m,p),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,L,p),this._ValCoordR3(e,a,L,p),this._ValCoordR3(e,d,L,p),this._ValCoordR3(e,R,L,p),l),h),FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,c,o),this._ValCoordR3(e,a,c,o),this._ValCoordR3(e,d,c,o),this._ValCoordR3(e,R,c,o),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,r,o),this._ValCoordR3(e,a,r,o),this._ValCoordR3(e,d,r,o),this._ValCoordR3(e,R,r,o),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,m,o),this._ValCoordR3(e,a,m,o),this._ValCoordR3(e,d,m,o),this._ValCoordR3(e,R,m,o),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,L,o),this._ValCoordR3(e,a,L,o),this._ValCoordR3(e,d,L,o),this._ValCoordR3(e,R,L,o),l),h),FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,c,u),this._ValCoordR3(e,a,c,u),this._ValCoordR3(e,d,c,u),this._ValCoordR3(e,R,c,u),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,r,u),this._ValCoordR3(e,a,r,u),this._ValCoordR3(e,d,r,u),this._ValCoordR3(e,R,r,u),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,m,u),this._ValCoordR3(e,a,m,u),this._ValCoordR3(e,d,m,u),this._ValCoordR3(e,R,m,u),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,L,u),this._ValCoordR3(e,a,L,u),this._ValCoordR3(e,d,L,u),this._ValCoordR3(e,R,L,u),l),h),FastNoiseLite._CubicLerp(FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,c,F),this._ValCoordR3(e,a,c,F),this._ValCoordR3(e,d,c,F),this._ValCoordR3(e,R,c,F),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,r,F),this._ValCoordR3(e,a,r,F),this._ValCoordR3(e,d,r,F),this._ValCoordR3(e,R,r,F),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,m,F),this._ValCoordR3(e,a,m,F),this._ValCoordR3(e,d,m,F),this._ValCoordR3(e,R,m,F),l),FastNoiseLite._CubicLerp(this._ValCoordR3(e,_,L,F),this._ValCoordR3(e,a,L,F),this._ValCoordR3(e,d,L,F),this._ValCoordR3(e,R,L,F),l),h),n)*(1/3.375)}_SingleValueR2(e,t,i){let s=Math.floor(t),a=Math.floor(i),r=FastNoiseLite._InterpHermite(t-s),o=FastNoiseLite._InterpHermite(i-a);s=Math.imul(s,this._PrimeX),a=Math.imul(a,this._PrimeY);let l=s+this._PrimeX,h=a+this._PrimeY,n=FastNoiseLite._Lerp(this._ValCoordR2(e,s,a),this._ValCoordR2(e,l,a),r),_=FastNoiseLite._Lerp(this._ValCoordR2(e,s,h),this._ValCoordR2(e,l,h),r);return FastNoiseLite._Lerp(n,_,o)}_SingleValueR3(e,t,i,s){let a=Math.floor(t),r=Math.floor(i),o=Math.floor(s),l=FastNoiseLite._InterpHermite(t-a),h=FastNoiseLite._InterpHermite(i-r),n=FastNoiseLite._InterpHermite(s-o);a=Math.imul(a,this._PrimeX),r=Math.imul(r,this._PrimeY),o=Math.imul(o,this._PrimeZ);let _=a+this._PrimeX,c=r+this._PrimeY,p=o+this._PrimeZ,d=FastNoiseLite._Lerp(this._ValCoordR3(e,a,r,o),this._ValCoordR3(e,_,r,o),l),m=FastNoiseLite._Lerp(this._ValCoordR3(e,a,c,o),this._ValCoordR3(e,_,c,o),l),u=FastNoiseLite._Lerp(this._ValCoordR3(e,a,r,p),this._ValCoordR3(e,_,r,p),l),R=FastNoiseLite._Lerp(this._ValCoordR3(e,a,c,p),this._ValCoordR3(e,_,c,p),l),L=FastNoiseLite._Lerp(d,m,h),F=FastNoiseLite._Lerp(u,R,h);return FastNoiseLite._Lerp(L,F,n)}_DoSingleDomainWarp(){let e=(e,t,i,s,a,r,o)=>{switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:this._SingleDomainWarpOpenSimplex2Gradient(e,32.69428253173828*t,i,s,!1,a,r,o);break;case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:this._SingleDomainWarpOpenSimplex2Gradient(e,7.71604938271605*t,i,s,!0,a,r,o);break;case FastNoiseLite.DomainWarpType.BasicGrid:this._SingleDomainWarpBasicGrid(e,t,i,s,a,r,o)}};return 6===arguments.length&&arguments[3]instanceof Vector2?((e,t,i,s,a,r)=>{switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:this._SingleDomainWarpOpenSimplex2Gradient(e,38.283687591552734*t,i,s,!1,a,r);break;case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:this._SingleDomainWarpOpenSimplex2Gradient(e,16*t,i,s,!0,a,r);break;case FastNoiseLite.DomainWarpType.BasicGrid:this._SingleDomainWarpBasicGrid(e,t,i,s,a,r)}})(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):7===arguments.length&&arguments[3]instanceof Vector3?e(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]):void 0}_DomainWarpSingle(){let e=e=>{let t=this._Seed,i=this._DomainWarpAmp*this._FractalBounding,s=this._Frequency,a=e.x,r=e.y,o=e.z;switch(this._WarpTransformType3D){case FastNoiseLite.TransformType3D.ImproveXYPlanes:{let e=a+r,t=-.211324865405187*e;o*=.577350269189626,a+=t-o,r=r+t-o,o+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.ImproveXZPlanes:{let e=a+o,t=-.211324865405187*e;r*=.577350269189626,a+=t-r,o+=t-r,r+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:let e=(a+r+o)*(2/3);a=e-a,r=e-r,o=e-o}this._DoSingleDomainWarp(t,i,s,e,a,r,o)};return 1===arguments.length&&arguments[0]instanceof Vector2?(e=>{let t=this._Seed,i=this._DomainWarpAmp*this._FractalBounding,s=this._Frequency,a=e.x,r=e.y;switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:let e=(a+r)*(.5*(1.7320508075688772-1));a+=e,r+=e}this._DoSingleDomainWarp(t,i,s,e,a,r)})(arguments[0]):1===arguments.length&&arguments[0]instanceof Vector3?e(arguments[0]):void 0}_DomainWarpFractalProgressive(){let e=e=>{let t=this._Seed,i=this._DomainWarpAmp*this._FractalBounding,s=this._Frequency;for(let a=0;a<this._Octaves;a++){let a=e.x,r=e.y,o=e.z;switch(this._WarpTransformType3D){case FastNoiseLite.TransformType3D.ImproveXYPlanes:{let e=a+r,t=-.211324865405187*e;o*=.577350269189626,a+=t-o,r=r+t-o,o+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.ImproveXZPlanes:{let e=a+o,t=-.211324865405187*e;r*=.577350269189626,a+=t-r,o+=t-r,r+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:{let e=(a+r+o)*(2/3);a=e-a,r=e-r,o=e-o}}this._DoSingleDomainWarp(t,i,s,e,a,r,o),t++,i*=this._Gain,s*=this._Lacunarity}};return 1===arguments.length&&arguments[0]instanceof Vector2?(e=>{let t=this._Seed,i=this._DomainWarpAmp*this._FractalBounding,s=this._Frequency;for(let a=0;a<this._Octaves;a++){let a=e.x,r=e.y;switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:let e=(a+r)*(.5*(1.7320508075688772-1));a+=e,r+=e}this._DoSingleDomainWarp(t,i,s,e,a,r),t++,i*=this._Gain,s*=this._Lacunarity}})(arguments[0]):1===arguments.length&&arguments[0]instanceof Vector3?e(arguments[0]):void 0}_DomainWarpFractalIndependent(){let e=e=>{let t=e.x,i=e.y,s=e.z;switch(this._WarpTransformType3D){case FastNoiseLite.TransformType3D.ImproveXYPlanes:{let e=t+i,a=-.211324865405187*e;s*=.577350269189626,t+=a-s,i=i+a-s,s+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.ImproveXZPlanes:{let e=t+s,a=-.211324865405187*e;i*=.577350269189626,t+=a-i,s+=a-i,i+=.577350269189626*e}break;case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:{let e=(t+i+s)*(2/3);t=e-t,i=e-i,s=e-s}}let a=this._Seed,r=this._DomainWarpAmp*this._FractalBounding,o=this._Frequency;for(let l=0;l<this._Octaves;l++)this._DoSingleDomainWarp(a,r,o,e,t,i,s),a++,r*=this._Gain,o*=this._Lacunarity};return 1===arguments.length&&arguments[0]instanceof Vector2?(e=>{let t=e.x,i=e.y;switch(this._DomainWarpType){case FastNoiseLite.DomainWarpType.OpenSimplex2:case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:let e=(t+i)*(.5*(1.7320508075688772-1));t+=e,i+=e}let s=this._Seed,a=this._DomainWarpAmp*this._FractalBounding,r=this._Frequency;for(let o=0;o<this._Octaves;o++)this._DoSingleDomainWarp(s,a,r,e,t,i),s++,a*=this._Gain,r*=this._Lacunarity})(arguments[0]):1===arguments.length&&arguments[0]instanceof Vector3?e(arguments[0]):void 0}_SingleDomainWarpBasicGrid(){let e=(e,t,i,s,a,r,o)=>{let l=a*i,h=r*i,n=o*i,_=Math.floor(l),c=Math.floor(h),p=Math.floor(n),d=FastNoiseLite._InterpHermite(l-_),m=FastNoiseLite._InterpHermite(h-c),u=FastNoiseLite._InterpHermite(n-p);_=Math.imul(_,this._PrimeX),c=Math.imul(c,this._PrimeY),p=Math.imul(p,this._PrimeZ);let R=_+this._PrimeX,L=c+this._PrimeY,F=p+this._PrimeZ,D=1020&this._HashR3(e,_,c,p),C=1020&this._HashR3(e,R,c,p),N=FastNoiseLite._Lerp(this._RandVecs3D[D],this._RandVecs3D[C],d),P=FastNoiseLite._Lerp(this._RandVecs3D[1|D],this._RandVecs3D[1|C],d),V=FastNoiseLite._Lerp(this._RandVecs3D[2|D],this._RandVecs3D[2|C],d);D=1020&this._HashR3(e,_,L,p),C=1020&this._HashR3(e,R,L,p);let y=FastNoiseLite._Lerp(this._RandVecs3D[D],this._RandVecs3D[C],d),T=FastNoiseLite._Lerp(this._RandVecs3D[1|D],this._RandVecs3D[1|C],d),f=FastNoiseLite._Lerp(this._RandVecs3D[2|D],this._RandVecs3D[2|C],d),S=FastNoiseLite._Lerp(N,y,m),g=FastNoiseLite._Lerp(P,T,m),M=FastNoiseLite._Lerp(V,f,m);D=1020&this._HashR3(e,_,c,F),C=1020&this._HashR3(e,R,c,F),N=FastNoiseLite._Lerp(this._RandVecs3D[D],this._RandVecs3D[C],d),P=FastNoiseLite._Lerp(this._RandVecs3D[1|D],this._RandVecs3D[1|C],d),V=FastNoiseLite._Lerp(this._RandVecs3D[2|D],this._RandVecs3D[2|C],d),D=1020&this._HashR3(e,_,L,F),C=1020&this._HashR3(e,R,L,F),y=FastNoiseLite._Lerp(this._RandVecs3D[D],this._RandVecs3D[C],d),T=FastNoiseLite._Lerp(this._RandVecs3D[1|D],this._RandVecs3D[1|C],d),f=FastNoiseLite._Lerp(this._RandVecs3D[2|D],this._RandVecs3D[2|C],d),s.x+=FastNoiseLite._Lerp(S,FastNoiseLite._Lerp(N,y,m),u)*t,s.y+=FastNoiseLite._Lerp(g,FastNoiseLite._Lerp(P,T,m),u)*t,s.z+=FastNoiseLite._Lerp(M,FastNoiseLite._Lerp(V,f,m),u)*t};6===arguments.length&&arguments[3]instanceof Vector2&&((e,t,i,s,a,r)=>{let o=a*i,l=r*i,h=Math.floor(o),n=Math.floor(l),_=FastNoiseLite._InterpHermite(o-h),c=FastNoiseLite._InterpHermite(l-n);h=Math.imul(h,this._PrimeX),n=Math.imul(n,this._PrimeY);let p=h+this._PrimeX,d=n+this._PrimeY,m=510&this._HashR2(e,h,n),u=510&this._HashR2(e,p,n),R=FastNoiseLite._Lerp(this._RandVecs2D[m],this._RandVecs2D[u],_),L=FastNoiseLite._Lerp(this._RandVecs2D[1|m],this._RandVecs2D[1|u],_);m=510&this._HashR2(e,h,d),u=510&this._HashR2(e,p,d);let F=FastNoiseLite._Lerp(this._RandVecs2D[m],this._RandVecs2D[u],_),D=FastNoiseLite._Lerp(this._RandVecs2D[1|m],this._RandVecs2D[1|u],_);s.x+=FastNoiseLite._Lerp(R,F,c)*t,s.y+=FastNoiseLite._Lerp(L,D,c)*t})(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]),7===arguments.length&&arguments[3]instanceof Vector3&&e(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6])}_SingleDomainWarpOpenSimplex2Gradient(){let e=(e,t,i,s,a,r,o,l)=>{r*=i,o*=i,l*=i;let h,n,_,c=Math.round(r),p=Math.round(o),d=Math.round(l),m=r-c,u=o-p,R=l-d,L=-m-1|1,F=-u-1|1,D=-R-1|1,C=L*-m,N=F*-u,P=D*-R;c=Math.imul(c,this._PrimeX),p=Math.imul(p,this._PrimeY),d=Math.imul(d,this._PrimeZ),h=n=_=0;let V=.6-m*m-(u*u+R*R);for(let t=0;;t++){if(V>0){let t,i,s,r=V*V*(V*V);if(a){let a=1020&this._HashR3(e,c,p,d);t=this._RandVecs3D[a],i=this._RandVecs3D[1|a],s=this._RandVecs3D[2|a]}else{let a=this._HashR3(e,c,p,d),r=252&a,o=a>>6&1020,l=m*this._Gradients3D[r]+u*this._Gradients3D[1|r]+R*this._Gradients3D[2|r];t=l*this._RandVecs3D[o],i=l*this._RandVecs3D[1|o],s=l*this._RandVecs3D[2|o]}h+=r*t,n+=r*i,_+=r*s}let i=V,s=c,r=p,o=d,l=m,y=u,T=R;if(C>=N&&C>=P?(l+=L,i=i+C+C,s-=L*this._PrimeX):N>C&&N>=P?(y+=F,i=i+N+N,r-=F*this._PrimeY):(T+=D,i=i+P+P,o-=D*this._PrimeZ),i>1){i-=1;let t,c,p,d=i*i*(i*i);if(a){let i=1020&this._HashR3(e,s,r,o);t=this._RandVecs3D[i],c=this._RandVecs3D[1|i],p=this._RandVecs3D[2|i]}else{let i=this._HashR3(e,s,r,o),a=252&i,h=i>>6&1020,n=l*this._Gradients3D[a]+y*this._Gradients3D[1|a]+T*this._Gradients3D[2|a];t=n*this._RandVecs3D[h],c=n*this._RandVecs3D[1|h],p=n*this._RandVecs3D[2|h]}h+=d*t,n+=d*c,_+=d*p}if(1===t)break;C=.5-C,N=.5-N,P=.5-P,m=L*C,u=F*N,R=D*P,V+=.75-C-(N+P),c+=L>>1&this._PrimeX,p+=F>>1&this._PrimeY,d+=D>>1&this._PrimeZ,L=-L,F=-F,D=-D,e+=1293373}s.x+=h*t,s.y+=n*t,s.z+=_*t};7===arguments.length&&((e,t,i,s,a,r,o)=>{const l=.21132486540518713;r*=i,o*=i;let h,n,_=Math.floor(r),c=Math.floor(o),p=r-_,d=o-c,m=(p+d)*l,u=p-m,R=d-m;_=Math.imul(_,this._PrimeX),c=Math.imul(c,this._PrimeY),h=n=0;let L=.5-u*u-R*R;if(L>0){let t,i,s=L*L*(L*L);if(a){let s=510&this._HashR2(e,_,c);t=this._RandVecs2D[s],i=this._RandVecs2D[1|s]}else{let s=this._HashR2(e,_,c),a=254&s,r=s>>7&510,o=u*this._Gradients2D[a]+R*this._Gradients2D[1|a];t=o*this._RandVecs2D[r],i=o*this._RandVecs2D[1|r]}h+=s*t,n+=s*i}let F=3.1547005383792506*m+(-.6666666666666666+L);if(F>0){let t,i,s=u+(2*l-1),r=R+(2*l-1),o=F*F*(F*F);if(a){let s=510&this._HashR2(e,_+this._PrimeX,c+this._PrimeY);t=this._RandVecs2D[s],i=this._RandVecs2D[1|s]}else{let a=this._HashR2(e,_+this._PrimeX,c+this._PrimeY),o=254&a,l=a>>7&510,h=s*this._Gradients2D[o]+r*this._Gradients2D[1|o];t=h*this._RandVecs2D[l],i=h*this._RandVecs2D[1|l]}h+=o*t,n+=o*i}if(R>u){let t=u+l,i=R+(l-1),s=.5-t*t-i*i;if(s>0){let r,o,l=s*s*(s*s);if(a){let t=510&this._HashR2(e,_,c+this._PrimeY);r=this._RandVecs2D[t],o=this._RandVecs2D[1|t]}else{let s=this._HashR2(e,_,c+this._PrimeY),a=254&s,l=s>>7&510,h=t*this._Gradients2D[a]+i*this._Gradients2D[1|a];r=h*this._RandVecs2D[l],o=h*this._RandVecs2D[1|l]}h+=l*r,n+=l*o}}else{let t=u+(l-1),i=R+l,s=.5-t*t-i*i;if(s>0){let r,o,l=s*s*(s*s);if(a){let t=510&this._HashR2(e,_+this._PrimeX,c);r=this._RandVecs2D[t],o=this._RandVecs2D[1|t]}else{let s=this._HashR2(e,_+this._PrimeX,c),a=254&s,l=s>>7&510,h=t*this._Gradients2D[a]+i*this._Gradients2D[1|a];r=h*this._RandVecs2D[l],o=h*this._RandVecs2D[1|l]}h+=l*r,n+=l*o}}s.x+=h*t,s.y+=n*t})(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]),8===arguments.length&&e(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7])}}class Vector2{constructor(e,t){this.x=e,this.y=t}}class Vector3{constructor(e,t,i){this.x=e,this.y=t,this.z=i}}
  /* eslint-enable */
  /* prettier-enable */
=======
  class FastNoiseLite {
    static NoiseType = Object.freeze({
      OpenSimplex2: "OpenSimplex2",
      OpenSimplex2S: "OpenSimplex2S",
      Cellular: "Cellular",
      Perlin: "Perlin",
      ValueCubic: "ValueCubic",
      Value: "Value",
    });
    static RotationType3D = Object.freeze({
      None: "None",
      ImproveXYPlanes: "ImproveXYPlanes",
      ImproveXZPlanes: "ImproveXZPlanes",
    });
    static FractalType = Object.freeze({
      None: "None",
      FBm: "FBm",
      Ridged: "Ridged",
      PingPong: "PingPong",
      DomainWarpProgressive: "DomainWarpProgressive",
      DomainWarpIndependent: "DomainWarpIndependent",
    });
    static CellularDistanceFunction = Object.freeze({
      Euclidean: "Euclidean",
      EuclideanSq: "EuclideanSq",
      Manhattan: "Manhattan",
      Hybrid: "Hybrid",
    });
    static CellularReturnType = Object.freeze({
      CellValue: "CellValue",
      Distance: "Distance",
      Distance2: "Distance2",
      Distance2Add: "Distance2Add",
      Distance2Sub: "Distance2Sub",
      Distance2Mul: "Distance2Mul",
      Distance2Div: "Distance2Div",
    });
    static DomainWarpType = Object.freeze({
      OpenSimplex2: "OpenSimplex2",
      OpenSimplex2Reduced: "OpenSimplex2Reduced",
      BasicGrid: "BasicGrid",
    });
    static TransformType3D = Object.freeze({
      None: "None",
      ImproveXYPlanes: "ImproveXYPlanes",
      ImproveXZPlanes: "ImproveXZPlanes",
      DefaultOpenSimplex2: "DefaultOpenSimplex2",
    });

    /* Private */
    _Seed = 1337;
    _Frequency = 0.01;
    _NoiseType = FastNoiseLite.NoiseType.OpenSimplex2;
    _RotationType3D = FastNoiseLite.RotationType3D.None;
    _TransformType3D = FastNoiseLite.TransformType3D.DefaultOpenSimplex2;
    _DomainWarpAmp = 1.0;

    _FractalType = FastNoiseLite.FractalType.None;
    _Octaves = 3;
    _Lacunarity = 2.0;
    _Gain = 0.5;
    _WeightedStrength = 0.0;
    _PingPongStrength = 2.0;

    _FractalBounding = 1 / 1.75;

    _CellularDistanceFunction =
      FastNoiseLite.CellularDistanceFunction.EuclideanSq;
    _CellularReturnType = FastNoiseLite.CellularReturnType.Distance;
    _CellularJitterModifier = 1.0;

    _DomainWarpType = FastNoiseLite.DomainWarpType.OpenSimplex2;
    _WarpTransformType3D = FastNoiseLite.TransformType3D.DefaultOpenSimplex2;

    /**
     * @description Create new FastNoiseLite object with optional seed
     * @param {number} [seed]
     * @constructor
     */
    constructor(seed) {
      if (seed !== undefined) {
        this._Seed = seed;
      }
    }

    /**
     * @description Sets seed used for all noise types
     * @remarks Default: 1337
     * @default 1337
     * @param {number} seed
     */
    SetSeed(seed) {
      this._Seed = seed;
    }

    /**
     * @description Sets frequency for all noise types
     * @remarks Default: 0.01
     * @default 0.01
     * @param {number} frequency
     */
    SetFrequency(frequency) {
      this._Frequency = frequency;
    }

    /**
     * @description Sets noise algorithm used for GetNoise(...)
     * @remarks Default: OpenSimplex2
     * @default FastNoiseLite.NoiseType.OpenSimplex2
     * @param {FastNoiseLite.NoiseType} noiseType
     */
    SetNoiseType(noiseType) {
      this._NoiseType = noiseType;
      this._UpdateTransformType3D();
    }

    /**
     * @description Sets domain rotation type for 3D Noise and 3D DomainWarp.
     * @description Can aid in reducing directional artifacts when sampling a 2D plane in 3D
     * @remarks Default: None
     * @default FastNoiseLite.RotationType3D.None
     * @param {FastNoiseLite.RotationType3D} rotationType3D
     */
    SetRotationType3D(rotationType3D) {
      this._RotationType3D = rotationType3D;
      this._UpdateTransformType3D();
      this._UpdateWarpTransformType3D();
    }

    /**
     * @description Sets method for combining octaves in all fractal noise types
     * @remarks Default: None
     * @default FastNoiseLite.FractalType.None
     * @param {FastNoiseLite.FractalType} fractalType
     */
    SetFractalType(fractalType) {
      this._FractalType = fractalType;
    }

    /**
     * @description Sets octave count for all fractal noise types
     * @remarks Default: 3
     * @default 3
     * @param {number} octaves
     */
    SetFractalOctaves(octaves) {
      this._Octaves = octaves;
      this._CalculateFractalBounding();
    }

    /**
     * @description Sets octave lacunarity for all fractal noise types
     * @remarks Default: 2.0
     * @default 2.0
     * @param {number} lacunarity
     */
    SetFractalLacunarity(lacunarity) {
      this._Lacunarity = lacunarity;
    }

    /**
     * @description Sets octave gain for all fractal noise types
     * @remarks Default: 0.5
     * @default 0.5
     * @param {number} gain
     */
    SetFractalGain(gain) {
      this._Gain = gain;
      this._CalculateFractalBounding();
    }

    /**
     * @description Sets octave weighting for all none DomainWarp fratal types
     * @remarks Default: 0.0 | Keep between 0...1 to maintain -1...1 output bounding
     * @default 0.5
     * @param {number} weightedStrength
     */
    SetFractalWeightedStrength(weightedStrength) {
      this._WeightedStrength = weightedStrength;
    }

    /**
     * @description Sets strength of the fractal ping pong effect
     * @remarks Default: 2.0
     * @default 2.0
     * @param {number} pingPongStrength
     */
    SetFractalPingPongStrength(pingPongStrength) {
      this._PingPongStrength = pingPongStrength;
    }

    /**
     * @description Sets distance function used in cellular noise calculations
     * @remarks Default: EuclideanSq
     * @default FastNoiseLite.CellularDistanceFunction.EuclideanSq
     * @param {FastNoiseLite.CellularDistanceFunction} cellularDistanceFunction
     */
    SetCellularDistanceFunction(cellularDistanceFunction) {
      this._CellularDistanceFunction = cellularDistanceFunction;
    }

    /**
     * @description Sets return type from cellular noise calculations
     * @remarks Default: Distance
     * @default FastNoiseLite.CellularReturnType.Distance
     * @param {FastNoiseLite.CellularReturnType} cellularReturnType
     */
    SetCellularReturnType(cellularReturnType) {
      this._CellularReturnType = cellularReturnType;
    }

    /**
     * @description Sets the maximum distance a cellular point can move from it's grid position
     * @remarks Default: 1.0
     * @default 1.0
     * @param {number} cellularJitter
     */
    SetCellularJitter(cellularJitter) {
      this._CellularJitterModifier = cellularJitter;
    }

    /**
     * @description Sets the warp algorithm when using DomainWarp(...)
     * @remarks Default: OpenSimplex2
     * @default FastNoiseLite.DomainWarpType.OpenSimplex2
     * @param {FastNoiseLite.DomainWarpType} domainWarpType
     */
    SetDomainWarpType(domainWarpType) {
      this._DomainWarpType = domainWarpType;
      this._UpdateWarpTransformType3D();
    }

    /**
     * @description Sets the maximum warp distance from original position when using DomainWarp(...)
     * @remarks Default: 1.0
     * @default 1.0
     * @param {number} domainWarpAmp
     */
    SetDomainWarpAmp(domainWarpAmp) {
      this._DomainWarpAmp = domainWarpAmp;
    }

    /**
     * @description 2D/3D noise at given position using current settings
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} [z] Z coordinate
     * @return {number} Noise output bounded between -1...1
     */
    GetNoise(x, y, z) {
      /**
       * @description 2D noise at given position using current settings
       * @param {number} x
       * @param {number} y
       * @return {number} Noise output bounded between -1...1
       */
      let R2 = (x, y) => {
        x *= this._Frequency;
        y *= this._Frequency;

        switch (this._NoiseType) {
          case FastNoiseLite.NoiseType.OpenSimplex2:
          case FastNoiseLite.NoiseType.OpenSimplex2S: {
            const SQRT3 = 1.7320508075688772;
            const F2 = 0.5 * (SQRT3 - 1);
            let t = (x + y) * F2;
            x += t;
            y += t;
            break;
          }
          default:
            break;
        }

        switch (this._FractalType) {
          default:
            return this._GenNoiseSingleR2(this._Seed, x, y);
          case FastNoiseLite.FractalType.FBm:
            return this._GenFractalFBmR2(x, y);
          case FastNoiseLite.FractalType.Ridged:
            return this._GenFractalRidgedR2(x, y);
          case FastNoiseLite.FractalType.PingPong:
            return this._GenFractalPingPongR2(x, y);
        }
      };

      /**
       * @description 3D noise at given position using current settings
       * @param {number} x
       * @param {number} y
       * @param {number} z
       * @return {number} Noise output bounded between -1...1
       */
      let R3 = (x, y, z) => {
        x *= this._Frequency;
        y *= this._Frequency;
        z *= this._Frequency;

        switch (this._TransformType3D) {
          case FastNoiseLite.TransformType3D.ImproveXYPlanes: {
            let xy = x + y;
            let s2 = xy * -0.211324865405187;
            z *= 0.577350269189626;
            x += s2 - z;
            y += s2 - z;
            z += xy * 0.577350269189626;
            break;
          }
          case FastNoiseLite.TransformType3D.ImproveXZPlanes: {
            let xz = x + z;
            let s2 = xz * -0.211324865405187;
            y *= 0.577350269189626;
            x += s2 - y;
            z += s2 - y;
            y += xz * 0.577350269189626;
            break;
          }
          case FastNoiseLite.TransformType3D.DefaultOpenSimplex2: {
            const R3 = 2.0 / 3.0;
            let r = (x + y + z) * R3;
            x = r - x;
            y = r - y;
            z = r - z;
            break;
          }
          default:
            break;
        }

        switch (this._FractalType) {
          default:
            return this._GenNoiseSingleR3(this._Seed, x, y, z);
          case FastNoiseLite.FractalType.FBm:
            return this._GenFractalFBmR3(x, y, z);
          case FastNoiseLite.FractalType.Ridged:
            return this._GenFractalRidgedR3(x, y, z);
          case FastNoiseLite.FractalType.PingPong:
            return this._GenFractalPingPongR3(x, y, z);
        }
      };

      if (arguments.length === 2) {
        return R2(x, y);
      }

      if (arguments.length === 3) {
        return R3(x, y, z);
      }
    }

    /**
     * @description 2D/3D warps the input position using current domain warp settings
     * @param {Vector2|Vector3} coord
     */
    DomainWrap(coord) {
      switch (this._FractalType) {
        default:
          this._DomainWarpSingle(coord);
          break;
        case FastNoiseLite.FractalType.DomainWarpProgressive:
          this._DomainWarpFractalProgressive(coord);
          break;
        case FastNoiseLite.FractalType.DomainWarpIndependent:
          this._DomainWarpFractalIndependent(coord);
          break;
      }
    }

    // prettier-ignore
    _Gradients2D = [
                0.130526192220052, 0.99144486137381, 0.38268343236509, 0.923879532511287, 0.608761429008721, 0.793353340291235, 0.793353340291235, 0.608761429008721,
                0.923879532511287, 0.38268343236509, 0.99144486137381, 0.130526192220051, 0.99144486137381, -0.130526192220051, 0.923879532511287, -0.38268343236509,
                0.793353340291235, -0.60876142900872, 0.608761429008721, -0.793353340291235, 0.38268343236509, -0.923879532511287, 0.130526192220052, -0.99144486137381,
                -0.130526192220052, -0.99144486137381, -0.38268343236509, -0.923879532511287, -0.608761429008721, -0.793353340291235, -0.793353340291235, -0.608761429008721,
                -0.923879532511287, -0.38268343236509, -0.99144486137381, -0.130526192220052, -0.99144486137381, 0.130526192220051, -0.923879532511287, 0.38268343236509,
                -0.793353340291235, 0.608761429008721, -0.608761429008721, 0.793353340291235, -0.38268343236509, 0.923879532511287, -0.130526192220052, 0.99144486137381,
                0.130526192220052, 0.99144486137381, 0.38268343236509, 0.923879532511287, 0.608761429008721, 0.793353340291235, 0.793353340291235, 0.608761429008721,
                0.923879532511287, 0.38268343236509, 0.99144486137381, 0.130526192220051, 0.99144486137381, -0.130526192220051, 0.923879532511287, -0.38268343236509,
                0.793353340291235, -0.60876142900872, 0.608761429008721, -0.793353340291235, 0.38268343236509, -0.923879532511287, 0.130526192220052, -0.99144486137381,
                -0.130526192220052, -0.99144486137381, -0.38268343236509, -0.923879532511287, -0.608761429008721, -0.793353340291235, -0.793353340291235, -0.608761429008721,
                -0.923879532511287, -0.38268343236509, -0.99144486137381, -0.130526192220052, -0.99144486137381, 0.130526192220051, -0.923879532511287, 0.38268343236509,
                -0.793353340291235, 0.608761429008721, -0.608761429008721, 0.793353340291235, -0.38268343236509, 0.923879532511287, -0.130526192220052, 0.99144486137381,
                0.130526192220052, 0.99144486137381, 0.38268343236509, 0.923879532511287, 0.608761429008721, 0.793353340291235, 0.793353340291235, 0.608761429008721,
                0.923879532511287, 0.38268343236509, 0.99144486137381, 0.130526192220051, 0.99144486137381, -0.130526192220051, 0.923879532511287, -0.38268343236509,
                0.793353340291235, -0.60876142900872, 0.608761429008721, -0.793353340291235, 0.38268343236509, -0.923879532511287, 0.130526192220052, -0.99144486137381,
                -0.130526192220052, -0.99144486137381, -0.38268343236509, -0.923879532511287, -0.608761429008721, -0.793353340291235, -0.793353340291235, -0.608761429008721,
                -0.923879532511287, -0.38268343236509, -0.99144486137381, -0.130526192220052, -0.99144486137381, 0.130526192220051, -0.923879532511287, 0.38268343236509,
                -0.793353340291235, 0.608761429008721, -0.608761429008721, 0.793353340291235, -0.38268343236509, 0.923879532511287, -0.130526192220052, 0.99144486137381,
                0.130526192220052, 0.99144486137381, 0.38268343236509, 0.923879532511287, 0.608761429008721, 0.793353340291235, 0.793353340291235, 0.608761429008721,
                0.923879532511287, 0.38268343236509, 0.99144486137381, 0.130526192220051, 0.99144486137381, -0.130526192220051, 0.923879532511287, -0.38268343236509,
                0.793353340291235, -0.60876142900872, 0.608761429008721, -0.793353340291235, 0.38268343236509, -0.923879532511287, 0.130526192220052, -0.99144486137381,
                -0.130526192220052, -0.99144486137381, -0.38268343236509, -0.923879532511287, -0.608761429008721, -0.793353340291235, -0.793353340291235, -0.608761429008721,
                -0.923879532511287, -0.38268343236509, -0.99144486137381, -0.130526192220052, -0.99144486137381, 0.130526192220051, -0.923879532511287, 0.38268343236509,
                -0.793353340291235, 0.608761429008721, -0.608761429008721, 0.793353340291235, -0.38268343236509, 0.923879532511287, -0.130526192220052, 0.99144486137381,
                0.130526192220052, 0.99144486137381, 0.38268343236509, 0.923879532511287, 0.608761429008721, 0.793353340291235, 0.793353340291235, 0.608761429008721,
                0.923879532511287, 0.38268343236509, 0.99144486137381, 0.130526192220051, 0.99144486137381, -0.130526192220051, 0.923879532511287, -0.38268343236509,
                0.793353340291235, -0.60876142900872, 0.608761429008721, -0.793353340291235, 0.38268343236509, -0.923879532511287, 0.130526192220052, -0.99144486137381,
                -0.130526192220052, -0.99144486137381, -0.38268343236509, -0.923879532511287, -0.608761429008721, -0.793353340291235, -0.793353340291235, -0.608761429008721,
                -0.923879532511287, -0.38268343236509, -0.99144486137381, -0.130526192220052, -0.99144486137381, 0.130526192220051, -0.923879532511287, 0.38268343236509,
                -0.793353340291235, 0.608761429008721, -0.608761429008721, 0.793353340291235, -0.38268343236509, 0.923879532511287, -0.130526192220052, 0.99144486137381,
                0.38268343236509, 0.923879532511287, 0.923879532511287, 0.38268343236509, 0.923879532511287, -0.38268343236509, 0.38268343236509, -0.923879532511287,
                -0.38268343236509, -0.923879532511287, -0.923879532511287, -0.38268343236509, -0.923879532511287, 0.38268343236509, -0.38268343236509, 0.923879532511287,
            ];

    // prettier-ignore
    _RandVecs2D = [
                -0.2700222198, -0.9628540911, 0.3863092627, -0.9223693152, 0.04444859006, -0.999011673, -0.5992523158, -0.8005602176, -0.7819280288, 0.6233687174, 0.9464672271, 0.3227999196, -0.6514146797, -0.7587218957, 0.9378472289, 0.347048376,
                -0.8497875957, -0.5271252623, -0.879042592, 0.4767432447, -0.892300288, -0.4514423508, -0.379844434, -0.9250503802, -0.9951650832, 0.0982163789, 0.7724397808, -0.6350880136, 0.7573283322, -0.6530343002, -0.9928004525, -0.119780055,
                -0.0532665713, 0.9985803285, 0.9754253726, -0.2203300762, -0.7665018163, 0.6422421394, 0.991636706, 0.1290606184, -0.994696838, 0.1028503788, -0.5379205513, -0.84299554, 0.5022815471, -0.8647041387, 0.4559821461, -0.8899889226,
                -0.8659131224, -0.5001944266, 0.0879458407, -0.9961252577, -0.5051684983, 0.8630207346, 0.7753185226, -0.6315704146, -0.6921944612, 0.7217110418, -0.5191659449, -0.8546734591, 0.8978622882, -0.4402764035, -0.1706774107, 0.9853269617,
                -0.9353430106, -0.3537420705, -0.9992404798, 0.03896746794, -0.2882064021, -0.9575683108, -0.9663811329, 0.2571137995, -0.8759714238, -0.4823630009, -0.8303123018, -0.5572983775, 0.05110133755, -0.9986934731, -0.8558373281, -0.5172450752,
                0.09887025282, 0.9951003332, 0.9189016087, 0.3944867976, -0.2439375892, -0.9697909324, -0.8121409387, -0.5834613061, -0.9910431363, 0.1335421355, 0.8492423985, -0.5280031709, -0.9717838994, -0.2358729591, 0.9949457207, 0.1004142068,
                0.6241065508, -0.7813392434, 0.662910307, 0.7486988212, -0.7197418176, 0.6942418282, -0.8143370775, -0.5803922158, 0.104521054, -0.9945226741, -0.1065926113, -0.9943027784, 0.445799684, -0.8951327509, 0.105547406, 0.9944142724,
                -0.992790267, 0.1198644477, -0.8334366408, 0.552615025, 0.9115561563, -0.4111755999, 0.8285544909, -0.5599084351, 0.7217097654, -0.6921957921, 0.4940492677, -0.8694339084, -0.3652321272, -0.9309164803, -0.9696606758, 0.2444548501,
                0.08925509731, -0.996008799, 0.5354071276, -0.8445941083, -0.1053576186, 0.9944343981, -0.9890284586, 0.1477251101, 0.004856104961, 0.9999882091, 0.9885598478, 0.1508291331, 0.9286129562, -0.3710498316, -0.5832393863, -0.8123003252,
                0.3015207509, 0.9534596146, -0.9575110528, 0.2883965738, 0.9715802154, -0.2367105511, 0.229981792, 0.9731949318, 0.955763816, -0.2941352207, 0.740956116, 0.6715534485, -0.9971513787, -0.07542630764, 0.6905710663, -0.7232645452,
                -0.290713703, -0.9568100872, 0.5912777791, -0.8064679708, -0.9454592212, -0.325740481, 0.6664455681, 0.74555369, 0.6236134912, 0.7817328275, 0.9126993851, -0.4086316587, -0.8191762011, 0.5735419353, -0.8812745759, -0.4726046147,
                0.9953313627, 0.09651672651, 0.9855650846, -0.1692969699, -0.8495980887, 0.5274306472, 0.6174853946, -0.7865823463, 0.8508156371, 0.52546432, 0.9985032451, -0.05469249926, 0.1971371563, -0.9803759185, 0.6607855748, -0.7505747292,
                -0.03097494063, 0.9995201614, -0.6731660801, 0.739491331, -0.7195018362, -0.6944905383, 0.9727511689, 0.2318515979, 0.9997059088, -0.0242506907, 0.4421787429, -0.8969269532, 0.9981350961, -0.061043673, -0.9173660799, -0.3980445648,
                -0.8150056635, -0.5794529907, -0.8789331304, 0.4769450202, 0.0158605829, 0.999874213, -0.8095464474, 0.5870558317, -0.9165898907, -0.3998286786, -0.8023542565, 0.5968480938, -0.5176737917, 0.8555780767, -0.8154407307, -0.5788405779,
                0.4022010347, -0.9155513791, -0.9052556868, -0.4248672045, 0.7317445619, 0.6815789728, -0.5647632201, -0.8252529947, -0.8403276335, -0.5420788397, -0.9314281527, 0.363925262, 0.5238198472, 0.8518290719, 0.7432803869, -0.6689800195,
                -0.985371561, -0.1704197369, 0.4601468731, 0.88784281, 0.825855404, 0.5638819483, 0.6182366099, 0.7859920446, 0.8331502863, -0.553046653, 0.1500307506, 0.9886813308, -0.662330369, -0.7492119075, -0.668598664, 0.743623444,
                0.7025606278, 0.7116238924, -0.5419389763, -0.8404178401, -0.3388616456, 0.9408362159, 0.8331530315, 0.5530425174, -0.2989720662, -0.9542618632, 0.2638522993, 0.9645630949, 0.124108739, -0.9922686234, -0.7282649308, -0.6852956957,
                0.6962500149, 0.7177993569, -0.9183535368, 0.3957610156, -0.6326102274, -0.7744703352, -0.9331891859, -0.359385508, -0.1153779357, -0.9933216659, 0.9514974788, -0.3076565421, -0.08987977445, -0.9959526224, 0.6678496916, 0.7442961705,
                0.7952400393, -0.6062947138, -0.6462007402, -0.7631674805, -0.2733598753, 0.9619118351, 0.9669590226, -0.254931851, -0.9792894595, 0.2024651934, -0.5369502995, -0.8436138784, -0.270036471, -0.9628500944, -0.6400277131, 0.7683518247,
                -0.7854537493, -0.6189203566, 0.06005905383, -0.9981948257, -0.02455770378, 0.9996984141, -0.65983623, 0.751409442, -0.6253894466, -0.7803127835, -0.6210408851, -0.7837781695, 0.8348888491, 0.5504185768, -0.1592275245, 0.9872419133,
                0.8367622488, 0.5475663786, -0.8675753916, -0.4973056806, -0.2022662628, -0.9793305667, 0.9399189937, 0.3413975472, 0.9877404807, -0.1561049093, -0.9034455656, 0.4287028224, 0.1269804218, -0.9919052235, -0.3819600854, 0.924178821,
                0.9754625894, 0.2201652486, -0.3204015856, -0.9472818081, -0.9874760884, 0.1577687387, 0.02535348474, -0.9996785487, 0.4835130794, -0.8753371362, -0.2850799925, -0.9585037287, -0.06805516006, -0.99768156, -0.7885244045, -0.6150034663,
                0.3185392127, -0.9479096845, 0.8880043089, 0.4598351306, 0.6476921488, -0.7619021462, 0.9820241299, 0.1887554194, 0.9357275128, -0.3527237187, -0.8894895414, 0.4569555293, 0.7922791302, 0.6101588153, 0.7483818261, 0.6632681526,
                -0.7288929755, -0.6846276581, 0.8729032783, -0.4878932944, 0.8288345784, 0.5594937369, 0.08074567077, 0.9967347374, 0.9799148216, -0.1994165048, -0.580730673, -0.8140957471, -0.4700049791, -0.8826637636, 0.2409492979, 0.9705377045,
                0.9437816757, -0.3305694308, -0.8927998638, -0.4504535528, -0.8069622304, 0.5906030467, 0.06258973166, 0.9980393407, -0.9312597469, 0.3643559849, 0.5777449785, 0.8162173362, -0.3360095855, -0.941858566, 0.697932075, -0.7161639607,
                -0.002008157227, -0.9999979837, -0.1827294312, -0.9831632392, -0.6523911722, 0.7578824173, -0.4302626911, -0.9027037258, -0.9985126289, -0.05452091251, -0.01028102172, -0.9999471489, -0.4946071129, 0.8691166802, -0.2999350194, 0.9539596344,
                0.8165471961, 0.5772786819, 0.2697460475, 0.962931498, -0.7306287391, -0.6827749597, -0.7590952064, -0.6509796216, -0.907053853, 0.4210146171, -0.5104861064, -0.8598860013, 0.8613350597, 0.5080373165, 0.5007881595, -0.8655698812,
                -0.654158152, 0.7563577938, -0.8382755311, -0.545246856, 0.6940070834, 0.7199681717, 0.06950936031, 0.9975812994, 0.1702942185, -0.9853932612, 0.2695973274, 0.9629731466, 0.5519612192, -0.8338697815, 0.225657487, -0.9742067022,
                0.4215262855, -0.9068161835, 0.4881873305, -0.8727388672, -0.3683854996, -0.9296731273, -0.9825390578, 0.1860564427, 0.81256471, 0.5828709909, 0.3196460933, -0.9475370046, 0.9570913859, 0.2897862643, -0.6876655497, -0.7260276109,
                -0.9988770922, -0.047376731, -0.1250179027, 0.992154486, -0.8280133617, 0.560708367, 0.9324863769, -0.3612051451, 0.6394653183, 0.7688199442, -0.01623847064, -0.9998681473, -0.9955014666, -0.09474613458, -0.81453315, 0.580117012,
                0.4037327978, -0.9148769469, 0.9944263371, 0.1054336766, -0.1624711654, 0.9867132919, -0.9949487814, -0.100383875, -0.6995302564, 0.7146029809, 0.5263414922, -0.85027327, -0.5395221479, 0.841971408, 0.6579370318, 0.7530729462,
                0.01426758847, -0.9998982128, -0.6734383991, 0.7392433447, 0.639412098, -0.7688642071, 0.9211571421, 0.3891908523, -0.146637214, -0.9891903394, -0.782318098, 0.6228791163, -0.5039610839, -0.8637263605, -0.7743120191, -0.6328039957,
            ];

    // prettier-ignore
    _Gradients3D = [
                0, 1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0,
                1, 0, 1, 0, -1, 0, 1, 0, 1, 0, -1, 0, -1, 0, -1, 0,
                1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0, 0,
                0, 1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0,
                1, 0, 1, 0, -1, 0, 1, 0, 1, 0, -1, 0, -1, 0, -1, 0,
                1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0, 0,
                0, 1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0,
                1, 0, 1, 0, -1, 0, 1, 0, 1, 0, -1, 0, -1, 0, -1, 0,
                1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0, 0,
                0, 1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0,
                1, 0, 1, 0, -1, 0, 1, 0, 1, 0, -1, 0, -1, 0, -1, 0,
                1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0, 0,
                0, 1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0,
                1, 0, 1, 0, -1, 0, 1, 0, 1, 0, -1, 0, -1, 0, -1, 0,
                1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, -1, 0, 0,
                1, 1, 0, 0, 0, -1, 1, 0, -1, 1, 0, 0, 0, -1, -1, 0
            ];

    // prettier-ignore
    _RandVecs3D = [
                -0.7292736885, -0.6618439697, 0.1735581948, 0, 0.790292081, -0.5480887466, -0.2739291014, 0, 0.7217578935, 0.6226212466, -0.3023380997, 0, 0.565683137, -0.8208298145, -0.0790000257, 0, 0.760049034, -0.5555979497, -0.3370999617, 0, 0.3713945616, 0.5011264475, 0.7816254623, 0, -0.1277062463, -0.4254438999, -0.8959289049, 0, -0.2881560924, -0.5815838982, 0.7607405838, 0,
                0.5849561111, -0.662820239, -0.4674352136, 0, 0.3307171178, 0.0391653737, 0.94291689, 0, 0.8712121778, -0.4113374369, -0.2679381538, 0, 0.580981015, 0.7021915846, 0.4115677815, 0, 0.503756873, 0.6330056931, -0.5878203852, 0, 0.4493712205, 0.601390195, 0.6606022552, 0, -0.6878403724, 0.09018890807, -0.7202371714, 0, -0.5958956522, -0.6469350577, 0.475797649, 0,
                -0.5127052122, 0.1946921978, -0.8361987284, 0, -0.9911507142, -0.05410276466, -0.1212153153, 0, -0.2149721042, 0.9720882117, -0.09397607749, 0, -0.7518650936, -0.5428057603, 0.3742469607, 0, 0.5237068895, 0.8516377189, -0.02107817834, 0, 0.6333504779, 0.1926167129, -0.7495104896, 0, -0.06788241606, 0.3998305789, 0.9140719259, 0, -0.5538628599, -0.4729896695, -0.6852128902, 0,
                -0.7261455366, -0.5911990757, 0.3509933228, 0, -0.9229274737, -0.1782808786, 0.3412049336, 0, -0.6968815002, 0.6511274338, 0.3006480328, 0, 0.9608044783, -0.2098363234, -0.1811724921, 0, 0.06817146062, -0.9743405129, 0.2145069156, 0, -0.3577285196, -0.6697087264, -0.6507845481, 0, -0.1868621131, 0.7648617052, -0.6164974636, 0, -0.6541697588, 0.3967914832, 0.6439087246, 0,
                0.6993340405, -0.6164538506, 0.3618239211, 0, -0.1546665739, 0.6291283928, 0.7617583057, 0, -0.6841612949, -0.2580482182, -0.6821542638, 0, 0.5383980957, 0.4258654885, 0.7271630328, 0, -0.5026987823, -0.7939832935, -0.3418836993, 0, 0.3202971715, 0.2834415347, 0.9039195862, 0, 0.8683227101, -0.0003762656404, -0.4959995258, 0, 0.791120031, -0.08511045745, 0.6057105799, 0,
                -0.04011016052, -0.4397248749, 0.8972364289, 0, 0.9145119872, 0.3579346169, -0.1885487608, 0, -0.9612039066, -0.2756484276, 0.01024666929, 0, 0.6510361721, -0.2877799159, -0.7023778346, 0, -0.2041786351, 0.7365237271, 0.644859585, 0, -0.7718263711, 0.3790626912, 0.5104855816, 0, -0.3060082741, -0.7692987727, 0.5608371729, 0, 0.454007341, -0.5024843065, 0.7357899537, 0,
                0.4816795475, 0.6021208291, -0.6367380315, 0, 0.6961980369, -0.3222197429, 0.641469197, 0, -0.6532160499, -0.6781148932, 0.3368515753, 0, 0.5089301236, -0.6154662304, -0.6018234363, 0, -0.1635919754, -0.9133604627, -0.372840892, 0, 0.52408019, -0.8437664109, 0.1157505864, 0, 0.5902587356, 0.4983817807, -0.6349883666, 0, 0.5863227872, 0.494764745, 0.6414307729, 0,
                0.6779335087, 0.2341345225, 0.6968408593, 0, 0.7177054546, -0.6858979348, 0.120178631, 0, -0.5328819713, -0.5205125012, 0.6671608058, 0, -0.8654874251, -0.0700727088, -0.4960053754, 0, -0.2861810166, 0.7952089234, 0.5345495242, 0, -0.04849529634, 0.9810836427, -0.1874115585, 0, -0.6358521667, 0.6058348682, 0.4781800233, 0, 0.6254794696, -0.2861619734, 0.7258696564, 0,
                -0.2585259868, 0.5061949264, -0.8227581726, 0, 0.02136306781, 0.5064016808, -0.8620330371, 0, 0.200111773, 0.8599263484, 0.4695550591, 0, 0.4743561372, 0.6014985084, -0.6427953014, 0, 0.6622993731, -0.5202474575, -0.5391679918, 0, 0.08084972818, -0.6532720452, 0.7527940996, 0, -0.6893687501, 0.0592860349, 0.7219805347, 0, -0.1121887082, -0.9673185067, 0.2273952515, 0,
                0.7344116094, 0.5979668656, -0.3210532909, 0, 0.5789393465, -0.2488849713, 0.7764570201, 0, 0.6988182827, 0.3557169806, -0.6205791146, 0, -0.8636845529, -0.2748771249, -0.4224826141, 0, -0.4247027957, -0.4640880967, 0.777335046, 0, 0.5257722489, -0.8427017621, 0.1158329937, 0, 0.9343830603, 0.316302472, -0.1639543925, 0, -0.1016836419, -0.8057303073, -0.5834887393, 0,
                -0.6529238969, 0.50602126, -0.5635892736, 0, -0.2465286165, -0.9668205684, -0.06694497494, 0, -0.9776897119, -0.2099250524, -0.007368825344, 0, 0.7736893337, 0.5734244712, 0.2694238123, 0, -0.6095087895, 0.4995678998, 0.6155736747, 0, 0.5794535482, 0.7434546771, 0.3339292269, 0, -0.8226211154, 0.08142581855, 0.5627293636, 0, -0.510385483, 0.4703667658, 0.7199039967, 0,
                -0.5764971849, -0.07231656274, -0.8138926898, 0, 0.7250628871, 0.3949971505, -0.5641463116, 0, -0.1525424005, 0.4860840828, -0.8604958341, 0, -0.5550976208, -0.4957820792, 0.667882296, 0, -0.1883614327, 0.9145869398, 0.357841725, 0, 0.7625556724, -0.5414408243, -0.3540489801, 0, -0.5870231946, -0.3226498013, -0.7424963803, 0, 0.3051124198, 0.2262544068, -0.9250488391, 0,
                0.6379576059, 0.577242424, -0.5097070502, 0, -0.5966775796, 0.1454852398, -0.7891830656, 0, -0.658330573, 0.6555487542, -0.3699414651, 0, 0.7434892426, 0.2351084581, 0.6260573129, 0, 0.5562114096, 0.8264360377, -0.0873632843, 0, -0.3028940016, -0.8251527185, 0.4768419182, 0, 0.1129343818, -0.985888439, -0.1235710781, 0, 0.5937652891, -0.5896813806, 0.5474656618, 0,
                0.6757964092, -0.5835758614, -0.4502648413, 0, 0.7242302609, -0.1152719764, 0.6798550586, 0, -0.9511914166, 0.0753623979, -0.2992580792, 0, 0.2539470961, -0.1886339355, 0.9486454084, 0, 0.571433621, -0.1679450851, -0.8032795685, 0, -0.06778234979, 0.3978269256, 0.9149531629, 0, 0.6074972649, 0.733060024, -0.3058922593, 0, -0.5435478392, 0.1675822484, 0.8224791405, 0,
                -0.5876678086, -0.3380045064, -0.7351186982, 0, -0.7967562402, 0.04097822706, -0.6029098428, 0, -0.1996350917, 0.8706294745, 0.4496111079, 0, -0.02787660336, -0.9106232682, -0.4122962022, 0, -0.7797625996, -0.6257634692, 0.01975775581, 0, -0.5211232846, 0.7401644346, -0.4249554471, 0, 0.8575424857, 0.4053272873, -0.3167501783, 0, 0.1045223322, 0.8390195772, -0.5339674439, 0,
                0.3501822831, 0.9242524096, -0.1520850155, 0, 0.1987849858, 0.07647613266, 0.9770547224, 0, 0.7845996363, 0.6066256811, -0.1280964233, 0, 0.09006737436, -0.9750989929, -0.2026569073, 0, -0.8274343547, -0.542299559, 0.1458203587, 0, -0.3485797732, -0.415802277, 0.840000362, 0, -0.2471778936, -0.7304819962, -0.6366310879, 0, -0.3700154943, 0.8577948156, 0.3567584454, 0,
                0.5913394901, -0.548311967, -0.5913303597, 0, 0.1204873514, -0.7626472379, -0.6354935001, 0, 0.616959265, 0.03079647928, 0.7863922953, 0, 0.1258156836, -0.6640829889, -0.7369967419, 0, -0.6477565124, -0.1740147258, -0.7417077429, 0, 0.6217889313, -0.7804430448, -0.06547655076, 0, 0.6589943422, -0.6096987708, 0.4404473475, 0, -0.2689837504, -0.6732403169, -0.6887635427, 0,
                -0.3849775103, 0.5676542638, 0.7277093879, 0, 0.5754444408, 0.8110471154, -0.1051963504, 0, 0.9141593684, 0.3832947817, 0.131900567, 0, -0.107925319, 0.9245493968, 0.3654593525, 0, 0.377977089, 0.3043148782, 0.8743716458, 0, -0.2142885215, -0.8259286236, 0.5214617324, 0, 0.5802544474, 0.4148098596, -0.7008834116, 0, -0.1982660881, 0.8567161266, -0.4761596756, 0,
                -0.03381553704, 0.3773180787, -0.9254661404, 0, -0.6867922841, -0.6656597827, 0.2919133642, 0, 0.7731742607, -0.2875793547, -0.5652430251, 0, -0.09655941928, 0.9193708367, -0.3813575004, 0, 0.2715702457, -0.9577909544, -0.09426605581, 0, 0.2451015704, -0.6917998565, -0.6792188003, 0, 0.977700782, -0.1753855374, 0.1155036542, 0, -0.5224739938, 0.8521606816, 0.02903615945, 0,
                -0.7734880599, -0.5261292347, 0.3534179531, 0, -0.7134492443, -0.269547243, 0.6467878011, 0, 0.1644037271, 0.5105846203, -0.8439637196, 0, 0.6494635788, 0.05585611296, 0.7583384168, 0, -0.4711970882, 0.5017280509, -0.7254255765, 0, -0.6335764307, -0.2381686273, -0.7361091029, 0, -0.9021533097, -0.270947803, -0.3357181763, 0, -0.3793711033, 0.872258117, 0.3086152025, 0,
                -0.6855598966, -0.3250143309, 0.6514394162, 0, 0.2900942212, -0.7799057743, -0.5546100667, 0, -0.2098319339, 0.85037073, 0.4825351604, 0, -0.4592603758, 0.6598504336, -0.5947077538, 0, 0.8715945488, 0.09616365406, -0.4807031248, 0, -0.6776666319, 0.7118504878, -0.1844907016, 0, 0.7044377633, 0.312427597, 0.637304036, 0, -0.7052318886, -0.2401093292, -0.6670798253, 0,
                0.081921007, -0.7207336136, -0.6883545647, 0, -0.6993680906, -0.5875763221, -0.4069869034, 0, -0.1281454481, 0.6419895885, 0.7559286424, 0, -0.6337388239, -0.6785471501, -0.3714146849, 0, 0.5565051903, -0.2168887573, -0.8020356851, 0, -0.5791554484, 0.7244372011, -0.3738578718, 0, 0.1175779076, -0.7096451073, 0.6946792478, 0, -0.6134619607, 0.1323631078, 0.7785527795, 0,
                0.6984635305, -0.02980516237, -0.715024719, 0, 0.8318082963, -0.3930171956, 0.3919597455, 0, 0.1469576422, 0.05541651717, -0.9875892167, 0, 0.708868575, -0.2690503865, 0.6520101478, 0, 0.2726053183, 0.67369766, -0.68688995, 0, -0.6591295371, 0.3035458599, -0.6880466294, 0, 0.4815131379, -0.7528270071, 0.4487723203, 0, 0.9430009463, 0.1675647412, -0.2875261255, 0,
                0.434802957, 0.7695304522, -0.4677277752, 0, 0.3931996188, 0.594473625, 0.7014236729, 0, 0.7254336655, -0.603925654, 0.3301814672, 0, 0.7590235227, -0.6506083235, 0.02433313207, 0, -0.8552768592, -0.3430042733, 0.3883935666, 0, -0.6139746835, 0.6981725247, 0.3682257648, 0, -0.7465905486, -0.5752009504, 0.3342849376, 0, 0.5730065677, 0.810555537, -0.1210916791, 0,
                -0.9225877367, -0.3475211012, -0.167514036, 0, -0.7105816789, -0.4719692027, -0.5218416899, 0, -0.08564609717, 0.3583001386, 0.929669703, 0, -0.8279697606, -0.2043157126, 0.5222271202, 0, 0.427944023, 0.278165994, 0.8599346446, 0, 0.5399079671, -0.7857120652, -0.3019204161, 0, 0.5678404253, -0.5495413974, -0.6128307303, 0, -0.9896071041, 0.1365639107, -0.04503418428, 0,
                -0.6154342638, -0.6440875597, 0.4543037336, 0, 0.1074204368, -0.7946340692, 0.5975094525, 0, -0.3595449969, -0.8885529948, 0.28495784, 0, -0.2180405296, 0.1529888965, 0.9638738118, 0, -0.7277432317, -0.6164050508, -0.3007234646, 0, 0.7249729114, -0.00669719484, 0.6887448187, 0, -0.5553659455, -0.5336586252, 0.6377908264, 0, 0.5137558015, 0.7976208196, -0.3160000073, 0,
                -0.3794024848, 0.9245608561, -0.03522751494, 0, 0.8229248658, 0.2745365933, -0.4974176556, 0, -0.5404114394, 0.6091141441, 0.5804613989, 0, 0.8036581901, -0.2703029469, 0.5301601931, 0, 0.6044318879, 0.6832968393, 0.4095943388, 0, 0.06389988817, 0.9658208605, -0.2512108074, 0, 0.1087113286, 0.7402471173, -0.6634877936, 0, -0.713427712, -0.6926784018, 0.1059128479, 0,
                0.6458897819, -0.5724548511, -0.5050958653, 0, -0.6553931414, 0.7381471625, 0.159995615, 0, 0.3910961323, 0.9188871375, -0.05186755998, 0, -0.4879022471, -0.5904376907, 0.6429111375, 0, 0.6014790094, 0.7707441366, -0.2101820095, 0, -0.5677173047, 0.7511360995, 0.3368851762, 0, 0.7858573506, 0.226674665, 0.5753666838, 0, -0.4520345543, -0.604222686, -0.6561857263, 0,
                0.002272116345, 0.4132844051, -0.9105991643, 0, -0.5815751419, -0.5162925989, 0.6286591339, 0, -0.03703704785, 0.8273785755, 0.5604221175, 0, -0.5119692504, 0.7953543429, -0.3244980058, 0, -0.2682417366, -0.9572290247, -0.1084387619, 0, -0.2322482736, -0.9679131102, -0.09594243324, 0, 0.3554328906, -0.8881505545, 0.2913006227, 0, 0.7346520519, -0.4371373164, 0.5188422971, 0,
                0.9985120116, 0.04659011161, -0.02833944577, 0, -0.3727687496, -0.9082481361, 0.1900757285, 0, 0.91737377, -0.3483642108, 0.1925298489, 0, 0.2714911074, 0.4147529736, -0.8684886582, 0, 0.5131763485, -0.7116334161, 0.4798207128, 0, -0.8737353606, 0.18886992, -0.4482350644, 0, 0.8460043821, -0.3725217914, 0.3814499973, 0, 0.8978727456, -0.1780209141, -0.4026575304, 0,
                0.2178065647, -0.9698322841, -0.1094789531, 0, -0.1518031304, -0.7788918132, -0.6085091231, 0, -0.2600384876, -0.4755398075, -0.8403819825, 0, 0.572313509, -0.7474340931, -0.3373418503, 0, -0.7174141009, 0.1699017182, -0.6756111411, 0, -0.684180784, 0.02145707593, -0.7289967412, 0, -0.2007447902, 0.06555605789, -0.9774476623, 0, -0.1148803697, -0.8044887315, 0.5827524187, 0,
                -0.7870349638, 0.03447489231, 0.6159443543, 0, -0.2015596421, 0.6859872284, 0.6991389226, 0, -0.08581082512, -0.10920836, -0.9903080513, 0, 0.5532693395, 0.7325250401, -0.396610771, 0, -0.1842489331, -0.9777375055, -0.1004076743, 0, 0.0775473789, -0.9111505856, 0.4047110257, 0, 0.1399838409, 0.7601631212, -0.6344734459, 0, 0.4484419361, -0.845289248, 0.2904925424, 0
            ];

    _PrimeX = 501125321;
    _PrimeY = 1136930381;
    _PrimeZ = 1720413743;

    /**
     * @private
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    static _Lerp(a, b, t) {
      return a + t * (b - a);
    }

    /**
     * @private
     * @param {number} t
     * @returns {number}
     */
    static _InterpHermite(t) {
      return t * t * (3 - 2 * t);
    }

    /**
     * @private
     * @param t
     * @returns {number}
     */
    static _InterpQuintic(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }

    /**
     * @private
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @param {number} t
     * @returns {number}
     */
    static _CubicLerp(a, b, c, d, t) {
      const p = d - c - (a - b);
      return t * t * t * p + t * t * (a - b - p) + t * (c - a) + b;
    }

    /**
     * @private
     * @param {number} t
     * @returns {number}
     */
    static _PingPong(t) {
      t -= Math.trunc(t * 0.5) * 2;
      return t < 1 ? t : 2 - t;
    }

    /**
     * @private
     */
    _CalculateFractalBounding() {
      let gain = Math.abs(this._Gain);
      let amp = gain;
      let ampFractal = 1.0;
      for (let i = 1; i < this._Octaves; i++) {
        ampFractal += amp;
        amp *= gain;
      }
      this._FractalBounding = 1 / ampFractal;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @returns {number}
     */
    _HashR2(seed, xPrimed, yPrimed) {
      let hash = seed ^ xPrimed ^ yPrimed;
      hash = Math.imul(hash, 0x27d4eb2d);
      return hash;
    }

    /**
     *
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @param {number} zPrimed
     * @returns {number}
     */
    _HashR3(seed, xPrimed, yPrimed, zPrimed) {
      let hash = seed ^ xPrimed ^ yPrimed ^ zPrimed;
      hash = Math.imul(hash, 0x27d4eb2d);
      return hash;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @returns {number}
     */
    _ValCoordR2(seed, xPrimed, yPrimed) {
      let hash = this._HashR2(seed, xPrimed, yPrimed);

      hash = Math.imul(hash, hash);
      hash ^= hash << 19;
      return hash * (1 / 2147483648.0);
    }

    /**
     *
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @param {number} zPrimed
     * @returns {number}
     */
    _ValCoordR3(seed, xPrimed, yPrimed, zPrimed) {
      let hash = this._HashR3(seed, xPrimed, yPrimed, zPrimed);

      hash = Math.imul(hash, hash);
      hash ^= hash << 19;
      return hash * (1 / 2147483648.0);
    }

    /**
     *
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @param {number} xd
     * @param {number} yd
     * @returns {number}
     */
    _GradCoordR2(seed, xPrimed, yPrimed, xd, yd) {
      let hash = this._HashR2(seed, xPrimed, yPrimed);
      hash ^= hash >> 15;
      hash &= 127 << 1;

      let xg = this._Gradients2D[hash];
      let yg = this._Gradients2D[hash | 1];

      return xd * xg + yd * yg;
    }

    /**
     *
     * @param {number} seed
     * @param {number} xPrimed
     * @param {number} yPrimed
     * @param {number} zPrimed
     * @param {number} xd
     * @param {number} yd
     * @param {number} zd
     * @returns {number}
     */
    _GradCoordR3(seed, xPrimed, yPrimed, zPrimed, xd, yd, zd) {
      let hash = this._HashR3(seed, xPrimed, yPrimed, zPrimed);
      hash ^= hash >> 15;
      hash &= 63 << 2;

      let xg = this._Gradients3D[hash];
      let yg = this._Gradients3D[hash | 1];
      let zg = this._Gradients3D[hash | 2];

      return xd * xg + yd * yg + zd * zg;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _GenNoiseSingleR2(seed, x, y) {
      switch (this._NoiseType) {
        case FastNoiseLite.NoiseType.OpenSimplex2:
          return this._SingleOpenSimplex2R2(seed, x, y);
        case FastNoiseLite.NoiseType.OpenSimplex2S:
          return this._SingleOpenSimplex2SR2(seed, x, y);
        case FastNoiseLite.NoiseType.Cellular:
          return this._SingleCellularR2(seed, x, y);
        case FastNoiseLite.NoiseType.Perlin:
          return this._SinglePerlinR2(seed, x, y);
        case FastNoiseLite.NoiseType.ValueCubic:
          return this._SingleValueCubicR2(seed, x, y);
        case FastNoiseLite.NoiseType.Value:
          return this._SingleValueR2(seed, x, y);
        default:
          return 0;
      }
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _GenNoiseSingleR3(seed, x, y, z) {
      switch (this._NoiseType) {
        case FastNoiseLite.NoiseType.OpenSimplex2:
          return this._SingleOpenSimplex2R3(seed, x, y, z);
        case FastNoiseLite.NoiseType.OpenSimplex2S:
          return this._SingleOpenSimplex2SR3(seed, x, y, z);
        case FastNoiseLite.NoiseType.Cellular:
          return this._SingleCellularR3(seed, x, y, z);
        case FastNoiseLite.NoiseType.Perlin:
          return this._SinglePerlinR3(seed, x, y, z);
        case FastNoiseLite.NoiseType.ValueCubic:
          return this._SingleValueCubicR3(seed, x, y, z);
        case FastNoiseLite.NoiseType.Value:
          return this._SingleValueR3(seed, x, y, z);
        default:
          return 0;
      }
    }

    /**
     * @private
     */
    _UpdateTransformType3D() {
      switch (this._RotationType3D) {
        case FastNoiseLite.RotationType3D.ImproveXYPlanes:
          this._TransformType3D = FastNoiseLite.TransformType3D.ImproveXYPlanes;
          break;
        case FastNoiseLite.RotationType3D.ImproveXZPlanes:
          this._TransformType3D = FastNoiseLite.TransformType3D.ImproveXZPlanes;
          break;
        default:
          switch (this._NoiseType) {
            case FastNoiseLite.NoiseType.OpenSimplex2:
            case FastNoiseLite.NoiseType.OpenSimplex2S:
              this._TransformType3D =
                FastNoiseLite.TransformType3D.DefaultOpenSimplex2;
              break;
            default:
              this._TransformType3D = FastNoiseLite.TransformType3D.None;
              break;
          }
          break;
      }
    }

    /**
     * @private
     */
    _UpdateWarpTransformType3D() {
      switch (this._RotationType3D) {
        case FastNoiseLite.RotationType3D.ImproveXYPlanes:
          this._WarpTransformType3D =
            FastNoiseLite.TransformType3D.ImproveXYPlanes;
          break;
        case FastNoiseLite.RotationType3D.ImproveXZPlanes:
          this._WarpTransformType3D =
            FastNoiseLite.TransformType3D.ImproveXZPlanes;
          break;
        default:
          switch (this._DomainWarpType) {
            case FastNoiseLite.DomainWarpType.OpenSimplex2:
            case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:
              this._WarpTransformType3D =
                FastNoiseLite.TransformType3D.DefaultOpenSimplex2;
              break;
            default:
              this._WarpTransformType3D = FastNoiseLite.TransformType3D.None;
              break;
          }
          break;
      }
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _GenFractalFBmR2(x, y) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = this._GenNoiseSingleR2(seed++, x, y);
        sum += noise * amp;
        amp *= FastNoiseLite._Lerp(
          1.0,
          Math.min(noise + 1, 2) * 0.5,
          this._WeightedStrength
        );

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _GenFractalFBmR3(x, y, z) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = this._GenNoiseSingleR3(seed++, x, y, z);
        sum += noise * amp;
        amp *= FastNoiseLite._Lerp(
          1.0,
          (noise + 1) * 0.5,
          this._WeightedStrength
        );

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        z *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _GenFractalRidgedR2(x, y) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = Math.abs(this._GenNoiseSingleR2(seed++, x, y));
        sum += (noise * -2 + 1) * amp;
        amp *= FastNoiseLite._Lerp(1.0, 1 - noise, this._WeightedStrength);

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _GenFractalRidgedR3(x, y, z) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = Math.abs(this._GenNoiseSingleR3(seed++, x, y, z));
        sum += (noise * -2 + 1) * amp;
        amp *= FastNoiseLite._Lerp(1.0, 1 - noise, this._WeightedStrength);

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        z *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _GenFractalPingPongR2(x, y) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = FastNoiseLite._PingPong(
          (this._GenNoiseSingleR2(seed++, x, y) + 1) * this._PingPongStrength
        );
        sum += (noise - 0.5) * 2 * amp;
        amp *= FastNoiseLite._Lerp(1.0, noise, this._WeightedStrength);

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _GenFractalPingPongR3(x, y, z) {
      let seed = this._Seed;
      let sum = 0;
      let amp = this._FractalBounding;

      for (let i = 0; i < this._Octaves; i++) {
        let noise = FastNoiseLite._PingPong(
          (this._GenNoiseSingleR3(seed++, x, y, z) + 1) * this._PingPongStrength
        );
        sum += (noise - 0.5) * 2 * amp;
        amp *= FastNoiseLite._Lerp(1.0, noise, this._WeightedStrength);

        x *= this._Lacunarity;
        y *= this._Lacunarity;
        z *= this._Lacunarity;
        amp *= this._Gain;
      }
      return sum;
    }

    /**
     *
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SingleOpenSimplex2R2(seed, x, y) {
      const SQRT3 = 1.7320508075688772;
      const G2 = (3 - SQRT3) / 6;

      let i = Math.floor(x);
      let j = Math.floor(y);
      let xi = x - i;
      let yi = y - j;

      let t = (xi + yi) * G2;
      let x0 = xi - t;
      let y0 = yi - t;

      i = Math.imul(i, this._PrimeX);
      j = Math.imul(j, this._PrimeY);

      let n0, n1, n2;

      let a = 0.5 - x0 * x0 - y0 * y0;

      if (a <= 0) {
        n0 = 0;
      } else {
        n0 = a * a * (a * a) * this._GradCoordR2(seed, i, j, x0, y0);
      }

      let c =
        2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
        (-2 * (1 - 2 * G2) * (1 - 2 * G2) + a);

      if (c <= 0) {
        n2 = 0;
      } else {
        let x2 = x0 + (2 * G2 - 1);
        let y2 = y0 + (2 * G2 - 1);
        n2 =
          c *
          c *
          (c * c) *
          this._GradCoordR2(seed, i + this._PrimeX, j + this._PrimeY, x2, y2);
      }

      if (y0 > x0) {
        let x1 = x0 + G2;
        let y1 = y0 + (G2 - 1);
        let b = 0.5 - x1 * x1 - y1 * y1;
        if (b <= 0) {
          n1 = 0;
        } else {
          n1 =
            b *
            b *
            (b * b) *
            this._GradCoordR2(seed, i, j + this._PrimeY, x1, y1);
        }
      } else {
        let x1 = x0 + (G2 - 1);
        let y1 = y0 + G2;
        let b = 0.5 - x1 * x1 - y1 * y1;
        if (b <= 0) {
          n1 = 0;
        } else {
          n1 =
            b *
            b *
            (b * b) *
            this._GradCoordR2(seed, i + this._PrimeX, j, x1, y1);
        }
      }
      return (n0 + n1 + n2) * 99.83685446303647;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SingleOpenSimplex2R3(seed, x, y, z) {
      let i = Math.round(x);
      let j = Math.round(y);
      let k = Math.round(z);
      let x0 = x - i;
      let y0 = y - j;
      let z0 = z - k;

      let yNSign = Math.trunc((-1.0 - y0) | 1);
      let xNSign = Math.trunc((-1.0 - x0) | 1);
      let zNSign = Math.trunc((-1.0 - z0) | 1);

      let ax0 = xNSign * -x0;
      let ay0 = yNSign * -y0;
      let az0 = zNSign * -z0;
      i = Math.imul(i, this._PrimeX);
      j = Math.imul(j, this._PrimeY);
      k = Math.imul(k, this._PrimeZ);

      let value = 0;
      let a = 0.6 - x0 * x0 - (y0 * y0 + z0 * z0);

      for (let l = 0; ; l++) {
        if (a > 0) {
          value +=
            a * a * (a * a) * this._GradCoordR3(seed, i, j, k, x0, y0, z0);
        }

        if (ax0 >= ay0 && ax0 >= az0) {
          let b = a + ax0 + ax0;
          if (b > 1) {
            b -= 1;
            value +=
              b *
              b *
              (b * b) *
              this._GradCoordR3(
                seed,
                i - xNSign * this._PrimeX,
                j,
                k,
                x0 + xNSign,
                y0,
                z0
              );
          }
        } else if (ay0 > ax0 && ay0 >= az0) {
          let b = a + ay0 + ay0;
          if (b > 1) {
            b -= 1;
            value +=
              b *
              b *
              (b * b) *
              this._GradCoordR3(
                seed,
                i,
                j - yNSign * this._PrimeY,
                k,
                x0,
                y0 + yNSign,
                z0
              );
          }
        } else {
          let b = a + az0 + az0;
          if (b > 1) {
            b -= 1;
            value +=
              b *
              b *
              (b * b) *
              this._GradCoordR3(
                seed,
                i,
                j,
                k - zNSign * this._PrimeZ,
                x0,
                y0,
                z0 + zNSign
              );
          }
        }

        if (l === 1) {
          break;
        }

        ax0 = 0.5 - ax0;
        ay0 = 0.5 - ay0;
        az0 = 0.5 - az0;

        x0 = xNSign * ax0;
        y0 = yNSign * ay0;
        z0 = zNSign * az0;

        a += 0.75 - ax0 - (ay0 + az0);

        i += (xNSign >> 1) & this._PrimeX;
        j += (yNSign >> 1) & this._PrimeY;
        k += (zNSign >> 1) & this._PrimeZ;

        xNSign = -xNSign;
        yNSign = -yNSign;
        zNSign = -zNSign;

        seed = ~seed;
      }
      return value * 32.69428253173828125;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SingleOpenSimplex2SR2(seed, x, y) {
      // 2D OpenSimplex2S case is a modified 2D simplex noise.

      const SQRT3 = 1.7320508075688772;
      const G2 = (3 - SQRT3) / 6;

      /*
       * --- Skew moved to TransformNoiseCoordinate method ---
       * final FNLfloat F2 = 0.5f * (SQRT3 - 1);
       * FNLfloat s = (x + y) * F2;
       * x += s; y += s;
       */

      let i = Math.floor(x);
      let j = Math.floor(y);
      let xi = x - i;
      let yi = y - j;

      i = Math.imul(i, this._PrimeX);
      j = Math.imul(j, this._PrimeY);
      let i1 = i + this._PrimeX;
      let j1 = j + this._PrimeY;

      let t = (xi + yi) * G2;
      let x0 = xi - t;
      let y0 = yi - t;

      let a0 = 2.0 / 3.0 - x0 * x0 - y0 * y0;
      let value = a0 * a0 * (a0 * a0) * this._GradCoordR2(seed, i, j, x0, y0);
      let a1 =
        2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
        (-2 * (1 - 2 * G2) * (1 - 2 * G2) + a0);
      let x1 = x0 - (1 - 2 * G2);
      let y1 = y0 - (1 - 2 * G2);
      value += a1 * a1 * (a1 * a1) * this._GradCoordR2(seed, i1, j1, x1, y1);

      // Nested conditionals were faster than compact bit logic/arithmetic.
      let xmyi = xi - yi;
      if (t > G2) {
        if (xi + xmyi > 1) {
          let x2 = x0 + (3 * G2 - 2);
          let y2 = y0 + (3 * G2 - 1);
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(
                seed,
                i + (this._PrimeX << 1),
                j + this._PrimeY,
                x2,
                y2
              );
          }
        } else {
          let x2 = x0 + G2;
          let y2 = y0 + (G2 - 1);
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(seed, i, j + this._PrimeY, x2, y2);
          }
        }

        if (yi - xmyi > 1) {
          let x3 = x0 + (3 * G2 - 1);
          let y3 = y0 + (3 * G2 - 2);
          let a3 = 2.0 / 3.0 - x3 * x3 - y3 * y3;
          if (a3 > 0) {
            value +=
              a3 *
              a3 *
              (a3 * a3) *
              this._GradCoordR2(
                seed,
                i + this._PrimeX,
                j + (this._PrimeY << 1),
                x3,
                y3
              );
          }
        } else {
          let x3 = x0 + (G2 - 1);
          let y3 = y0 + G2;
          let a3 = 2.0 / 3.0 - x3 * x3 - y3 * y3;
          if (a3 > 0) {
            value +=
              a3 *
              a3 *
              (a3 * a3) *
              this._GradCoordR2(seed, i + this._PrimeX, j, x3, y3);
          }
        }
      } else {
        if (xi + xmyi < 0) {
          let x2 = x0 + (1 - G2);
          let y2 = y0 - G2;
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(seed, i - this._PrimeX, j, x2, y2);
          }
        } else {
          let x2 = x0 + (G2 - 1);
          let y2 = y0 + G2;
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(seed, i + this._PrimeX, j, x2, y2);
          }
        }

        if (yi < xmyi) {
          let x2 = x0 - G2;
          let y2 = y0 - (G2 - 1);
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(seed, i, j - this._PrimeY, x2, y2);
          }
        } else {
          let x2 = x0 + G2;
          let y2 = y0 + (G2 - 1);
          let a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
          if (a2 > 0) {
            value +=
              a2 *
              a2 *
              (a2 * a2) *
              this._GradCoordR2(seed, i, j + this._PrimeY, x2, y2);
          }
        }
      }

      return value * 18.24196194486065;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SingleOpenSimplex2SR3(seed, x, y, z) {
      // 3D OpenSimplex2S case uses two offset rotated cube grids.

      /*
       * --- Rotation moved to TransformNoiseCoordinate method ---
       * final FNLfloat R3 = (FNLfloat)(2.0 / 3.0);
       * FNLfloat r = (x + y + z) * R3; // Rotation, not skew
       * x = r - x; y = r - y; z = r - z;
       */

      let i = Math.floor(x);
      let j = Math.floor(y);
      let k = Math.floor(z);
      let xi = x - i;
      let yi = y - j;
      let zi = z - k;

      i = Math.imul(i, this._PrimeX);
      j = Math.imul(j, this._PrimeY);
      k = Math.imul(k, this._PrimeZ);
      let seed2 = seed + 1293373;

      let xNMask = Math.trunc(-0.5 - xi);
      let yNMask = Math.trunc(-0.5 - yi);
      let zNMask = Math.trunc(-0.5 - zi);

      let x0 = xi + xNMask;
      let y0 = yi + yNMask;
      let z0 = zi + zNMask;
      let a0 = 0.75 - x0 * x0 - y0 * y0 - z0 * z0;
      let value =
        a0 *
        a0 *
        (a0 * a0) *
        this._GradCoordR3(
          seed,
          i + (xNMask & this._PrimeX),
          j + (yNMask & this._PrimeY),
          k + (zNMask & this._PrimeZ),
          x0,
          y0,
          z0
        );

      let x1 = xi - 0.5;
      let y1 = yi - 0.5;
      let z1 = zi - 0.5;
      let a1 = 0.75 - x1 * x1 - y1 * y1 - z1 * z1;
      value +=
        a1 *
        a1 *
        (a1 * a1) *
        this._GradCoordR3(
          seed2,
          i + this._PrimeX,
          j + this._PrimeY,
          k + this._PrimeZ,
          x1,
          y1,
          z1
        );

      let xAFlipMask0 = ((xNMask | 1) << 1) * x1;
      let yAFlipMask0 = ((yNMask | 1) << 1) * y1;
      let zAFlipMask0 = ((zNMask | 1) << 1) * z1;
      let xAFlipMask1 = (-2 - (xNMask << 2)) * x1 - 1.0;
      let yAFlipMask1 = (-2 - (yNMask << 2)) * y1 - 1.0;
      let zAFlipMask1 = (-2 - (zNMask << 2)) * z1 - 1.0;

      let skip5 = false;
      let a2 = xAFlipMask0 + a0;
      if (a2 > 0) {
        let x2 = x0 - (xNMask | 1);
        value +=
          a2 *
          a2 *
          (a2 * a2) *
          this._GradCoordR3(
            seed,
            i + (~xNMask & this._PrimeX),
            j + (yNMask & this._PrimeY),
            k + (zNMask & this._PrimeZ),
            x2,
            y0,
            z0
          );
      } else {
        let a3 = yAFlipMask0 + zAFlipMask0 + a0;

        if (a3 > 0) {
          let x3 = x0;
          let y3 = y0 - (yNMask | 1);
          let z3 = z0 - (zNMask | 1);
          value +=
            a3 *
            a3 *
            (a3 * a3) *
            this._GradCoordR3(
              seed,
              i + (xNMask & this._PrimeX),
              j + (~yNMask & this._PrimeY),
              k + (~zNMask & this._PrimeZ),
              x3,
              y3,
              z3
            );
        }

        let a4 = xAFlipMask1 + a1;
        if (a4 > 0) {
          let x4 = (xNMask | 1) + x1;
          value +=
            a4 *
            a4 *
            (a4 * a4) *
            this._GradCoordR3(
              seed2,
              i + (xNMask & (this._PrimeX * 2)),
              j + this._PrimeY,
              k + this._PrimeZ,
              x4,
              y1,
              z1
            );
          skip5 = true;
        }
      }

      let skip9 = false;
      let a6 = yAFlipMask0 + a0;
      if (a6 > 0) {
        let x6 = x0;
        let y6 = y0 - (yNMask | 1);
        value +=
          a6 *
          a6 *
          (a6 * a6) *
          this._GradCoordR3(
            seed,
            i + (xNMask & this._PrimeX),
            j + (~yNMask & this._PrimeY),
            k + (zNMask & this._PrimeZ),
            x6,
            y6,
            z0
          );
      } else {
        let a7 = xAFlipMask0 + zAFlipMask0 + a0;
        if (a7 > 0) {
          let x7 = x0 - (xNMask | 1);
          let y7 = y0;
          let z7 = z0 - (zNMask | 1);
          value +=
            a7 *
            a7 *
            (a7 * a7) *
            this._GradCoordR3(
              seed,
              i + (~xNMask & this._PrimeX),
              j + (yNMask & this._PrimeY),
              k + (~zNMask & this._PrimeZ),
              x7,
              y7,
              z7
            );
        }

        let a8 = yAFlipMask1 + a1;
        if (a8 > 0) {
          let x8 = x1;
          let y8 = (yNMask | 1) + y1;
          value +=
            a8 *
            a8 *
            (a8 * a8) *
            this._GradCoordR3(
              seed2,
              i + this._PrimeX,
              j + (yNMask & (this._PrimeY << 1)),
              k + this._PrimeZ,
              x8,
              y8,
              z1
            );
          skip9 = true;
        }
      }

      let skipD = false;
      let aA = zAFlipMask0 + a0;
      if (aA > 0) {
        let xA = x0;
        let yA = y0;
        let zA = z0 - (zNMask | 1);
        value +=
          aA *
          aA *
          (aA * aA) *
          this._GradCoordR3(
            seed,
            i + (xNMask & this._PrimeX),
            j + (yNMask & this._PrimeY),
            k + (~zNMask & this._PrimeZ),
            xA,
            yA,
            zA
          );
      } else {
        let aB = xAFlipMask0 + yAFlipMask0 + a0;
        if (aB > 0) {
          let xB = x0 - (xNMask | 1);
          let yB = y0 - (yNMask | 1);
          value +=
            aB *
            aB *
            (aB * aB) *
            this._GradCoordR3(
              seed,
              i + (~xNMask & this._PrimeX),
              j + (~yNMask & this._PrimeY),
              k + (zNMask & this._PrimeZ),
              xB,
              yB,
              z0
            );
        }

        let aC = zAFlipMask1 + a1;
        if (aC > 0) {
          let xC = x1;
          let yC = y1;
          let zC = (zNMask | 1) + z1;
          value +=
            aC *
            aC *
            (aC * aC) *
            this._GradCoordR3(
              seed2,
              i + this._PrimeX,
              j + this._PrimeY,
              k + (zNMask & (this._PrimeZ << 1)),
              xC,
              yC,
              zC
            );
          skipD = true;
        }
      }

      if (!skip5) {
        let a5 = yAFlipMask1 + zAFlipMask1 + a1;
        if (a5 > 0) {
          let x5 = x1;
          let y5 = (yNMask | 1) + y1;
          let z5 = (zNMask | 1) + z1;
          value +=
            a5 *
            a5 *
            (a5 * a5) *
            this._GradCoordR3(
              seed2,
              i + this._PrimeX,
              j + (yNMask & (this._PrimeY << 1)),
              k + (zNMask & (this._PrimeZ << 1)),
              x5,
              y5,
              z5
            );
        }
      }

      if (!skip9) {
        let a9 = xAFlipMask1 + zAFlipMask1 + a1;
        if (a9 > 0) {
          let x9 = (xNMask | 1) + x1;
          let y9 = y1;
          let z9 = (zNMask | 1) + z1;
          value +=
            a9 *
            a9 *
            (a9 * a9) *
            this._GradCoordR3(
              seed2,
              i + (xNMask & (this._PrimeX * 2)),
              j + this._PrimeY,
              k + (zNMask & (this._PrimeZ << 1)),
              x9,
              y9,
              z9
            );
        }
      }

      if (!skipD) {
        let aD = xAFlipMask1 + yAFlipMask1 + a1;
        if (aD > 0) {
          let xD = (xNMask | 1) + x1;
          let yD = (yNMask | 1) + y1;
          value +=
            aD *
            aD *
            (aD * aD) *
            this._GradCoordR3(
              seed2,
              i + (xNMask & (this._PrimeX << 1)),
              j + (yNMask & (this._PrimeY << 1)),
              k + this._PrimeZ,
              xD,
              yD,
              z1
            );
        }
      }

      return value * 9.046026385208288;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SingleCellularR2(seed, x, y) {
      /**
       *
       * @param {number} seed
       * @param {number} x
       * @param {number} y
       * @returns {number}
       */
      let xr = Math.round(x);
      let yr = Math.round(y);

      let distance0 = Number.MAX_VALUE;
      let distance1 = Number.MAX_VALUE;

      let closestHash = 0;

      let cellularJitter = 0.43701595 * this._CellularJitterModifier;

      let xPrimed = (xr - 1) * this._PrimeX;
      let yPrimedBase = (yr - 1) * this._PrimeY;

      switch (this._CellularDistanceFunction) {
        default:
        case FastNoiseLite.CellularDistanceFunction.Euclidean:
        case FastNoiseLite.CellularDistanceFunction.EuclideanSq:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let hash = this._HashR2(seed, xPrimed, yPrimed);
              let idx = hash & (255 << 1);

              let vecX = xi - x + this._RandVecs2D[idx] * cellularJitter;
              let vecY = yi - y + this._RandVecs2D[idx | 1] * cellularJitter;

              let newDistance = vecX * vecX + vecY * vecY;

              distance1 = Math.max(Math.min(distance1, newDistance), distance0);
              if (newDistance < distance0) {
                distance0 = newDistance;
                closestHash = hash;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
        case FastNoiseLite.CellularDistanceFunction.Manhattan:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let hash = this._HashR2(seed, xPrimed, yPrimed);
              let idx = hash & (255 << 1);

              let vecX = xi - x + this._RandVecs2D[idx] * cellularJitter;
              let vecY = yi - y + this._RandVecs2D[idx | 1] * cellularJitter;

              let newDistance = Math.abs(vecX) + Math.abs(vecY);

              distance1 = Math.max(Math.min(distance1, newDistance), distance0);
              if (newDistance < distance0) {
                distance0 = newDistance;
                closestHash = hash;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
        case FastNoiseLite.CellularDistanceFunction.Hybrid:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let hash = this._HashR2(seed, xPrimed, yPrimed);
              let idx = hash & (255 << 1);

              let vecX = xi - x + this._RandVecs2D[idx] * cellularJitter;
              let vecY = yi - y + this._RandVecs2D[idx | 1] * cellularJitter;

              let newDistance =
                Math.abs(vecX) + Math.abs(vecY) + (vecX * vecX + vecY * vecY);

              distance1 = Math.max(Math.min(distance1, newDistance), distance0);
              if (newDistance < distance0) {
                distance0 = newDistance;
                closestHash = hash;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
      }

      if (
        this._CellularDistanceFunction ===
          FastNoiseLite.CellularDistanceFunction.Euclidean &&
        this._CellularReturnType !== FastNoiseLite.CellularReturnType.CellValue
      ) {
        distance0 = Math.sqrt(distance0);

        if (
          this._CellularReturnType !==
          FastNoiseLite.CellularReturnType.CellValue
        ) {
          distance1 = Math.sqrt(distance1);
        }
      }

      switch (this._CellularReturnType) {
        case FastNoiseLite.CellularReturnType.CellValue:
          return closestHash * (1 / 2147483648.0);
        case FastNoiseLite.CellularReturnType.Distance:
          return distance0 - 1;
        case FastNoiseLite.CellularReturnType.Distance2:
          return distance1 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Add:
          return (distance1 + distance0) * 0.5 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Sub:
          return distance1 - distance0 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Mul:
          return distance1 * distance0 * 0.5 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Div:
          return distance0 / distance1 - 1;
        default:
          return 0;
      }
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SingleCellularR3(seed, x, y, z) {
      let xr = Math.round(x);
      let yr = Math.round(y);
      let zr = Math.round(z);

      let distance0 = Number.MAX_VALUE;
      let distance1 = Number.MAX_VALUE;
      let closestHash = 0;

      let cellularJitter = 0.39614353 * this._CellularJitterModifier;

      let xPrimed = (xr - 1) * this._PrimeX;
      let yPrimedBase = (yr - 1) * this._PrimeY;
      let zPrimedBase = (zr - 1) * this._PrimeZ;

      switch (this._CellularDistanceFunction) {
        case FastNoiseLite.CellularDistanceFunction.Euclidean:
        case FastNoiseLite.CellularDistanceFunction.EuclideanSq:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let zPrimed = zPrimedBase;

              for (let zi = zr - 1; zi <= zr + 1; zi++) {
                let hash = this._HashR3(seed, xPrimed, yPrimed, zPrimed);
                let idx = hash & (255 << 2);

                let vecX = xi - x + this._RandVecs3D[idx] * cellularJitter;
                let vecY = yi - y + this._RandVecs3D[idx | 1] * cellularJitter;
                let vecZ = zi - z + this._RandVecs3D[idx | 2] * cellularJitter;

                let newDistance = vecX * vecX + vecY * vecY + vecZ * vecZ;

                distance1 = Math.max(
                  Math.min(distance1, newDistance),
                  distance0
                );
                if (newDistance < distance0) {
                  distance0 = newDistance;
                  closestHash = hash;
                }
                zPrimed += this._PrimeZ;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
        case FastNoiseLite.CellularDistanceFunction.Manhattan:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let zPrimed = zPrimedBase;

              for (let zi = zr - 1; zi <= zr + 1; zi++) {
                let hash = this._HashR3(seed, xPrimed, yPrimed, zPrimed);
                let idx = hash & (255 << 2);

                let vecX = xi - x + this._RandVecs3D[idx] * cellularJitter;
                let vecY = yi - y + this._RandVecs3D[idx | 1] * cellularJitter;
                let vecZ = zi - z + this._RandVecs3D[idx | 2] * cellularJitter;

                let newDistance =
                  Math.abs(vecX) + Math.abs(vecY) + Math.abs(vecZ);

                distance1 = Math.max(
                  Math.min(distance1, newDistance),
                  distance0
                );
                if (newDistance < distance0) {
                  distance0 = newDistance;
                  closestHash = hash;
                }
                zPrimed += this._PrimeZ;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
        case FastNoiseLite.CellularDistanceFunction.Hybrid:
          for (let xi = xr - 1; xi <= xr + 1; xi++) {
            let yPrimed = yPrimedBase;

            for (let yi = yr - 1; yi <= yr + 1; yi++) {
              let zPrimed = zPrimedBase;

              for (let zi = zr - 1; zi <= zr + 1; zi++) {
                let hash = this._HashR3(seed, xPrimed, yPrimed, zPrimed);
                let idx = hash & (255 << 2);

                let vecX = xi - x + this._RandVecs3D[idx] * cellularJitter;
                let vecY = yi - y + this._RandVecs3D[idx | 1] * cellularJitter;
                let vecZ = zi - z + this._RandVecs3D[idx | 2] * cellularJitter;

                let newDistance =
                  Math.abs(vecX) +
                  Math.abs(vecY) +
                  Math.abs(vecZ) +
                  (vecX * vecX + vecY * vecY + vecZ * vecZ);

                distance1 = Math.max(
                  Math.min(distance1, newDistance),
                  distance0
                );
                if (newDistance < distance0) {
                  distance0 = newDistance;
                  closestHash = hash;
                }
                zPrimed += this._PrimeZ;
              }
              yPrimed += this._PrimeY;
            }
            xPrimed += this._PrimeX;
          }
          break;
        default:
          break;
      }

      if (
        this._CellularDistanceFunction ===
          FastNoiseLite.CellularDistanceFunction.Euclidean &&
        this._CellularReturnType !== FastNoiseLite.CellularReturnType.CellValue
      ) {
        distance0 = Math.sqrt(distance0);

        if (
          this._CellularReturnType !==
          FastNoiseLite.CellularReturnType.CellValue
        ) {
          distance1 = Math.sqrt(distance1);
        }
      }

      switch (this._CellularReturnType) {
        case FastNoiseLite.CellularReturnType.CellValue:
          return closestHash * (1 / 2147483648.0);
        case FastNoiseLite.CellularReturnType.Distance:
          return distance0 - 1;
        case FastNoiseLite.CellularReturnType.Distance2:
          return distance1 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Add:
          return (distance1 + distance0) * 0.5 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Sub:
          return distance1 - distance0 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Mul:
          return distance1 * distance0 * 0.5 - 1;
        case FastNoiseLite.CellularReturnType.Distance2Div:
          return distance0 / distance1 - 1;
        default:
          return 0;
      }
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SinglePerlinR2(seed, x, y) {
      let x0 = Math.floor(x);
      let y0 = Math.floor(y);

      let xd0 = x - x0;
      let yd0 = y - y0;
      let xd1 = xd0 - 1;
      let yd1 = yd0 - 1;

      let xs = FastNoiseLite._InterpQuintic(xd0);
      let ys = FastNoiseLite._InterpQuintic(yd0);

      x0 = Math.imul(x0, this._PrimeX);
      y0 = Math.imul(y0, this._PrimeY);
      let x1 = x0 + this._PrimeX;
      let y1 = y0 + this._PrimeY;

      let xf0 = FastNoiseLite._Lerp(
        this._GradCoordR2(seed, x0, y0, xd0, yd0),
        this._GradCoordR2(seed, x1, y0, xd1, yd0),
        xs
      );
      let xf1 = FastNoiseLite._Lerp(
        this._GradCoordR2(seed, x0, y1, xd0, yd1),
        this._GradCoordR2(seed, x1, y1, xd1, yd1),
        xs
      );

      return FastNoiseLite._Lerp(xf0, xf1, ys) * 1.4247691104677813;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SinglePerlinR3(seed, x, y, z) {
      let x0 = Math.floor(x);
      let y0 = Math.floor(y);
      let z0 = Math.floor(z);

      let xd0 = x - x0;
      let yd0 = y - y0;
      let zd0 = z - z0;
      let xd1 = xd0 - 1;
      let yd1 = yd0 - 1;
      let zd1 = zd0 - 1;

      let xs = FastNoiseLite._InterpQuintic(xd0);
      let ys = FastNoiseLite._InterpQuintic(yd0);
      let zs = FastNoiseLite._InterpQuintic(zd0);

      x0 = Math.imul(x0, this._PrimeX);
      y0 = Math.imul(y0, this._PrimeY);
      z0 = Math.imul(z0, this._PrimeZ);
      let x1 = x0 + this._PrimeX;
      let y1 = y0 + this._PrimeY;
      let z1 = z0 + this._PrimeZ;

      let xf00 = FastNoiseLite._Lerp(
        this._GradCoordR3(seed, x0, y0, z0, xd0, yd0, zd0),
        this._GradCoordR3(seed, x1, y0, z0, xd1, yd0, zd0),
        xs
      );
      let xf10 = FastNoiseLite._Lerp(
        this._GradCoordR3(seed, x0, y1, z0, xd0, yd1, zd0),
        this._GradCoordR3(seed, x1, y1, z0, xd1, yd1, zd0),
        xs
      );
      let xf01 = FastNoiseLite._Lerp(
        this._GradCoordR3(seed, x0, y0, z1, xd0, yd0, zd1),
        this._GradCoordR3(seed, x1, y0, z1, xd1, yd0, zd1),
        xs
      );
      let xf11 = FastNoiseLite._Lerp(
        this._GradCoordR3(seed, x0, y1, z1, xd0, yd1, zd1),
        this._GradCoordR3(seed, x1, y1, z1, xd1, yd1, zd1),
        xs
      );

      let yf0 = FastNoiseLite._Lerp(xf00, xf10, ys);
      let yf1 = FastNoiseLite._Lerp(xf01, xf11, ys);

      return FastNoiseLite._Lerp(yf0, yf1, zs) * 0.964921414852142333984375;
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SingleValueCubicR2(seed, x, y) {
      let x1 = Math.floor(x);
      let y1 = Math.floor(y);

      let xs = x - x1;
      let ys = y - y1;

      x1 = Math.imul(x1, this._PrimeX);
      y1 = Math.imul(y1, this._PrimeY);
      let x0 = x1 - this._PrimeX;
      let y0 = y1 - this._PrimeY;
      let x2 = x1 + this._PrimeX;
      let y2 = y1 + this._PrimeY;
      let x3 = x1 + (this._PrimeX << 1);
      let y3 = y1 + (this._PrimeY << 1);

      return (
        FastNoiseLite._CubicLerp(
          FastNoiseLite._CubicLerp(
            this._ValCoordR2(seed, x0, y0),
            this._ValCoordR2(seed, x1, y0),
            this._ValCoordR2(seed, x2, y0),
            this._ValCoordR2(seed, x3, y0),
            xs
          ),
          FastNoiseLite._CubicLerp(
            this._ValCoordR2(seed, x0, y1),
            this._ValCoordR2(seed, x1, y1),
            this._ValCoordR2(seed, x2, y1),
            this._ValCoordR2(seed, x3, y1),
            xs
          ),
          FastNoiseLite._CubicLerp(
            this._ValCoordR2(seed, x0, y2),
            this._ValCoordR2(seed, x1, y2),
            this._ValCoordR2(seed, x2, y2),
            this._ValCoordR2(seed, x3, y2),
            xs
          ),
          FastNoiseLite._CubicLerp(
            this._ValCoordR2(seed, x0, y3),
            this._ValCoordR2(seed, x1, y3),
            this._ValCoordR2(seed, x2, y3),
            this._ValCoordR2(seed, x3, y3),
            xs
          ),
          ys
        ) *
        (1 / (1.5 * 1.5))
      );
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SingleValueCubicR3(seed, x, y, z) {
      let x1 = Math.floor(x);
      let y1 = Math.floor(y);
      let z1 = Math.floor(z);

      let xs = x - x1;
      let ys = y - y1;
      let zs = z - z1;

      x1 = Math.imul(x1, this._PrimeX);
      y1 = Math.imul(y1, this._PrimeY);
      z1 = Math.imul(z1, this._PrimeZ);

      let x0 = x1 - this._PrimeX;
      let y0 = y1 - this._PrimeY;
      let z0 = z1 - this._PrimeZ;
      let x2 = x1 + this._PrimeX;
      let y2 = y1 + this._PrimeY;
      let z2 = z1 + this._PrimeZ;
      let x3 = x1 + (this._PrimeX << 1);
      let y3 = y1 + (this._PrimeY << 1);
      let z3 = z1 + (this._PrimeZ << 1);

      return (
        FastNoiseLite._CubicLerp(
          FastNoiseLite._CubicLerp(
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y0, z0),
              this._ValCoordR3(seed, x1, y0, z0),
              this._ValCoordR3(seed, x2, y0, z0),
              this._ValCoordR3(seed, x3, y0, z0),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y1, z0),
              this._ValCoordR3(seed, x1, y1, z0),
              this._ValCoordR3(seed, x2, y1, z0),
              this._ValCoordR3(seed, x3, y1, z0),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y2, z0),
              this._ValCoordR3(seed, x1, y2, z0),
              this._ValCoordR3(seed, x2, y2, z0),
              this._ValCoordR3(seed, x3, y2, z0),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y3, z0),
              this._ValCoordR3(seed, x1, y3, z0),
              this._ValCoordR3(seed, x2, y3, z0),
              this._ValCoordR3(seed, x3, y3, z0),
              xs
            ),
            ys
          ),
          FastNoiseLite._CubicLerp(
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y0, z1),
              this._ValCoordR3(seed, x1, y0, z1),
              this._ValCoordR3(seed, x2, y0, z1),
              this._ValCoordR3(seed, x3, y0, z1),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y1, z1),
              this._ValCoordR3(seed, x1, y1, z1),
              this._ValCoordR3(seed, x2, y1, z1),
              this._ValCoordR3(seed, x3, y1, z1),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y2, z1),
              this._ValCoordR3(seed, x1, y2, z1),
              this._ValCoordR3(seed, x2, y2, z1),
              this._ValCoordR3(seed, x3, y2, z1),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y3, z1),
              this._ValCoordR3(seed, x1, y3, z1),
              this._ValCoordR3(seed, x2, y3, z1),
              this._ValCoordR3(seed, x3, y3, z1),
              xs
            ),
            ys
          ),
          FastNoiseLite._CubicLerp(
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y0, z2),
              this._ValCoordR3(seed, x1, y0, z2),
              this._ValCoordR3(seed, x2, y0, z2),
              this._ValCoordR3(seed, x3, y0, z2),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y1, z2),
              this._ValCoordR3(seed, x1, y1, z2),
              this._ValCoordR3(seed, x2, y1, z2),
              this._ValCoordR3(seed, x3, y1, z2),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y2, z2),
              this._ValCoordR3(seed, x1, y2, z2),
              this._ValCoordR3(seed, x2, y2, z2),
              this._ValCoordR3(seed, x3, y2, z2),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y3, z2),
              this._ValCoordR3(seed, x1, y3, z2),
              this._ValCoordR3(seed, x2, y3, z2),
              this._ValCoordR3(seed, x3, y3, z2),
              xs
            ),
            ys
          ),
          FastNoiseLite._CubicLerp(
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y0, z3),
              this._ValCoordR3(seed, x1, y0, z3),
              this._ValCoordR3(seed, x2, y0, z3),
              this._ValCoordR3(seed, x3, y0, z3),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y1, z3),
              this._ValCoordR3(seed, x1, y1, z3),
              this._ValCoordR3(seed, x2, y1, z3),
              this._ValCoordR3(seed, x3, y1, z3),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y2, z3),
              this._ValCoordR3(seed, x1, y2, z3),
              this._ValCoordR3(seed, x2, y2, z3),
              this._ValCoordR3(seed, x3, y2, z3),
              xs
            ),
            FastNoiseLite._CubicLerp(
              this._ValCoordR3(seed, x0, y3, z3),
              this._ValCoordR3(seed, x1, y3, z3),
              this._ValCoordR3(seed, x2, y3, z3),
              this._ValCoordR3(seed, x3, y3, z3),
              xs
            ),
            ys
          ),
          zs
        ) *
        (1 / (1.5 * 1.5 * 1.5))
      );
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    _SingleValueR2(seed, x, y) {
      let x0 = Math.floor(x);
      let y0 = Math.floor(y);

      let xs = FastNoiseLite._InterpHermite(x - x0);
      let ys = FastNoiseLite._InterpHermite(y - y0);

      x0 = Math.imul(x0, this._PrimeX);
      y0 = Math.imul(y0, this._PrimeY);
      let x1 = x0 + this._PrimeX;
      let y1 = y0 + this._PrimeY;

      let xf0 = FastNoiseLite._Lerp(
        this._ValCoordR2(seed, x0, y0),
        this._ValCoordR2(seed, x1, y0),
        xs
      );
      let xf1 = FastNoiseLite._Lerp(
        this._ValCoordR2(seed, x0, y1),
        this._ValCoordR2(seed, x1, y1),
        xs
      );

      return FastNoiseLite._Lerp(xf0, xf1, ys);
    }

    /**
     * @private
     * @param {number} seed
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    _SingleValueR3(seed, x, y, z) {
      let x0 = Math.floor(x);
      let y0 = Math.floor(y);
      let z0 = Math.floor(z);

      let xs = FastNoiseLite._InterpHermite(x - x0);
      let ys = FastNoiseLite._InterpHermite(y - y0);
      let zs = FastNoiseLite._InterpHermite(z - z0);

      x0 = Math.imul(x0, this._PrimeX);
      y0 = Math.imul(y0, this._PrimeY);
      z0 = Math.imul(z0, this._PrimeZ);
      let x1 = x0 + this._PrimeX;
      let y1 = y0 + this._PrimeY;
      let z1 = z0 + this._PrimeZ;

      let xf00 = FastNoiseLite._Lerp(
        this._ValCoordR3(seed, x0, y0, z0),
        this._ValCoordR3(seed, x1, y0, z0),
        xs
      );
      let xf10 = FastNoiseLite._Lerp(
        this._ValCoordR3(seed, x0, y1, z0),
        this._ValCoordR3(seed, x1, y1, z0),
        xs
      );
      let xf01 = FastNoiseLite._Lerp(
        this._ValCoordR3(seed, x0, y0, z1),
        this._ValCoordR3(seed, x1, y0, z1),
        xs
      );
      let xf11 = FastNoiseLite._Lerp(
        this._ValCoordR3(seed, x0, y1, z1),
        this._ValCoordR3(seed, x1, y1, z1),
        xs
      );

      let yf0 = FastNoiseLite._Lerp(xf00, xf10, ys);
      let yf1 = FastNoiseLite._Lerp(xf01, xf11, ys);

      return FastNoiseLite._Lerp(yf0, yf1, zs);
    }

    /**
     * @private
     */
    _DoSingleDomainWarp() {
      /**
       *
       * @param {number} seed
       * @param {number} amp
       * @param {number} freq
       * @param {Vector2} coord
       * @param {number} x
       * @param {number} y
       */
      let R2 = (seed, amp, freq, coord, x, y) => {
        switch (this._DomainWarpType) {
          case FastNoiseLite.DomainWarpType.OpenSimplex2:
            this._SingleDomainWarpOpenSimplex2Gradient(
              seed,
              amp * 38.283687591552734375,
              freq,
              coord,
              false,
              x,
              y
            );
            break;
          case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:
            this._SingleDomainWarpOpenSimplex2Gradient(
              seed,
              amp * 16.0,
              freq,
              coord,
              true,
              x,
              y
            );
            break;
          case FastNoiseLite.DomainWarpType.BasicGrid:
            this._SingleDomainWarpBasicGrid(seed, amp, freq, coord, x, y);
            break;
        }
      };

      /**
       *
       * @param {number} seed
       * @param {number} amp
       * @param {number} freq
       * @param {Vector3} coord
       * @param {number} x
       * @param {number} y
       * @param {number} z
       */
      let R3 = (seed, amp, freq, coord, x, y, z) => {
        switch (this._DomainWarpType) {
          case FastNoiseLite.DomainWarpType.OpenSimplex2:
            this._SingleDomainWarpOpenSimplex2Gradient(
              seed,
              amp * 32.69428253173828125,
              freq,
              coord,
              false,
              x,
              y,
              z
            );
            break;
          case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced:
            this._SingleDomainWarpOpenSimplex2Gradient(
              seed,
              amp * 7.71604938271605,
              freq,
              coord,
              true,
              x,
              y,
              z
            );
            break;
          case FastNoiseLite.DomainWarpType.BasicGrid:
            this._SingleDomainWarpBasicGrid(seed, amp, freq, coord, x, y, z);
            break;
        }
      };

      if (arguments.length === 6 && arguments[3] instanceof Vector2) {
        return R2(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5]
        );
      }

      if (arguments.length === 7 && arguments[3] instanceof Vector3) {
        return R3(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6]
        );
      }
    }

    /**
     * @private
     */
    _DomainWarpSingle() {
      /**
       *
       * @param {Vector2} coord
       */
      let R2 = (coord) => {
        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;

        let xs = coord.x;
        let ys = coord.y;
        switch (this._DomainWarpType) {
          case FastNoiseLite.DomainWarpType.OpenSimplex2:
          case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced: {
            const SQRT3 = 1.7320508075688772;
            const F2 = 0.5 * (SQRT3 - 1);
            let t = (xs + ys) * F2;
            xs += t;
            ys += t;
            break;
          }
          default:
            break;
        }

        this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);
      };

      /**
       *
       * @param {Vector3} coord
       */
      let R3 = (coord) => {
        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;

        let xs = coord.x;
        let ys = coord.y;
        let zs = coord.z;
        switch (this._WarpTransformType3D) {
          case FastNoiseLite.TransformType3D.ImproveXYPlanes:
            {
              let xy = xs + ys;
              let s2 = xy * -0.211324865405187;
              zs *= 0.577350269189626;
              xs += s2 - zs;
              ys = ys + s2 - zs;
              zs += xy * 0.577350269189626;
            }
            break;

          case FastNoiseLite.TransformType3D.ImproveXZPlanes:
            {
              let xz = xs + zs;
              let s2 = xz * -0.211324865405187;
              ys *= 0.577350269189626;
              xs += s2 - ys;
              zs += s2 - ys;
              ys += xz * 0.577350269189626;
            }
            break;
          case FastNoiseLite.TransformType3D.DefaultOpenSimplex2: {
            const R3 = 2.0 / 3.0;
            let r = (xs + ys + zs) * R3; // Rotation, not skew
            xs = r - xs;
            ys = r - ys;
            zs = r - zs;
            break;
          }
          default:
            break;
        }

        this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);
      };

      if (arguments.length === 1 && arguments[0] instanceof Vector2) {
        return R2(arguments[0]);
      }

      if (arguments.length === 1 && arguments[0] instanceof Vector3) {
        return R3(arguments[0]);
      }
    }

    _DomainWarpFractalProgressive() {
      /**
       *
       * @param {Vector2} coord
       */
      let R2 = (coord) => {
        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;

        for (let i = 0; i < this._Octaves; i++) {
          let xs = coord.x;
          let ys = coord.y;
          switch (this._DomainWarpType) {
            case FastNoiseLite.DomainWarpType.OpenSimplex2:
            case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced: {
              const SQRT3 = 1.7320508075688772;
              const F2 = 0.5 * (SQRT3 - 1);
              let t = (xs + ys) * F2;
              xs += t;
              ys += t;
              break;
            }
            default:
              break;
          }

          this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);

          seed++;
          amp *= this._Gain;
          freq *= this._Lacunarity;
        }
      };

      /**
       *
       * @param {Vector3} coord
       */
      let R3 = (coord) => {
        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;

        for (let i = 0; i < this._Octaves; i++) {
          let xs = coord.x;
          let ys = coord.y;
          let zs = coord.z;
          switch (this._WarpTransformType3D) {
            case FastNoiseLite.TransformType3D.ImproveXYPlanes:
              {
                let xy = xs + ys;
                let s2 = xy * -0.211324865405187;
                zs *= 0.577350269189626;
                xs += s2 - zs;
                ys = ys + s2 - zs;
                zs += xy * 0.577350269189626;
              }
              break;
            case FastNoiseLite.TransformType3D.ImproveXZPlanes:
              {
                let xz = xs + zs;
                let s2 = xz * -0.211324865405187;
                ys *= 0.577350269189626;
                xs += s2 - ys;
                zs += s2 - ys;
                ys += xz * 0.577350269189626;
              }
              break;
            case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:
              {
                const R3 = 2.0 / 3.0;
                let r = (xs + ys + zs) * R3; // Rotation, not skew
                xs = r - xs;
                ys = r - ys;
                zs = r - zs;
              }
              break;
            default:
              break;
          }

          this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);

          seed++;
          amp *= this._Gain;
          freq *= this._Lacunarity;
        }
      };

      if (arguments.length === 1 && arguments[0] instanceof Vector2) {
        return R2(arguments[0]);
      }

      if (arguments.length === 1 && arguments[0] instanceof Vector3) {
        return R3(arguments[0]);
      }
    }

    /**
     * @private
     */
    _DomainWarpFractalIndependent() {
      /**
       *
       * @param {Vector2} coord
       */
      let R2 = (coord) => {
        let xs = coord.x;
        let ys = coord.y;
        switch (this._DomainWarpType) {
          case FastNoiseLite.DomainWarpType.OpenSimplex2:
          case FastNoiseLite.DomainWarpType.OpenSimplex2Reduced: {
            const SQRT3 = 1.7320508075688772;
            const F2 = 0.5 * (SQRT3 - 1);
            let t = (xs + ys) * F2;
            xs += t;
            ys += t;
            break;
          }
          default:
            break;
        }
        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;

        for (let i = 0; i < this._Octaves; i++) {
          this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);

          seed++;
          amp *= this._Gain;
          freq *= this._Lacunarity;
        }
      };

      /**
       *
       * @param {Vector3} coord
       */
      let R3 = (coord) => {
        let xs = coord.x;
        let ys = coord.y;
        let zs = coord.z;
        switch (this._WarpTransformType3D) {
          case FastNoiseLite.TransformType3D.ImproveXYPlanes:
            {
              let xy = xs + ys;
              let s2 = xy * -0.211324865405187;
              zs *= 0.577350269189626;
              xs += s2 - zs;
              ys = ys + s2 - zs;
              zs += xy * 0.577350269189626;
            }
            break;
          case FastNoiseLite.TransformType3D.ImproveXZPlanes:
            {
              let xz = xs + zs;
              let s2 = xz * -0.211324865405187;
              ys *= 0.577350269189626;
              xs += s2 - ys;
              zs += s2 - ys;
              ys += xz * 0.577350269189626;
            }
            break;
          case FastNoiseLite.TransformType3D.DefaultOpenSimplex2:
            {
              const R3 = 2.0 / 3.0;
              let r = (xs + ys + zs) * R3; // Rotation, not skew
              xs = r - xs;
              ys = r - ys;
              zs = r - zs;
            }
            break;
          default:
            break;
        }

        let seed = this._Seed;
        let amp = this._DomainWarpAmp * this._FractalBounding;
        let freq = this._Frequency;
        for (let i = 0; i < this._Octaves; i++) {
          this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);

          seed++;
          amp *= this._Gain;
          freq *= this._Lacunarity;
        }
      };

      if (arguments.length === 1 && arguments[0] instanceof Vector2) {
        return R2(arguments[0]);
      }

      if (arguments.length === 1 && arguments[0] instanceof Vector3) {
        return R3(arguments[0]);
      }
    }

    /**
     * @private
     */
    _SingleDomainWarpBasicGrid() {
      /**
       *
       * @param {number} seed
       * @param {number} warpAmp
       * @param {number} frequency
       * @param {Vector2} coord
       * @param {number} x
       * @param {number} y
       */

      let R2 = (seed, warpAmp, frequency, coord, x, y) => {
        let xf = x * frequency;
        let yf = y * frequency;

        let x0 = Math.floor(xf);
        let y0 = Math.floor(yf);

        let xs = FastNoiseLite._InterpHermite(xf - x0);
        let ys = FastNoiseLite._InterpHermite(yf - y0);

        x0 = Math.imul(x0, this._PrimeX);
        y0 = Math.imul(y0, this._PrimeY);
        let x1 = x0 + this._PrimeX;
        let y1 = y0 + this._PrimeY;

        let hash0 = this._HashR2(seed, x0, y0) & (255 << 1);
        let hash1 = this._HashR2(seed, x1, y0) & (255 << 1);

        let lx0x = FastNoiseLite._Lerp(
          this._RandVecs2D[hash0],
          this._RandVecs2D[hash1],
          xs
        );
        let ly0x = FastNoiseLite._Lerp(
          this._RandVecs2D[hash0 | 1],
          this._RandVecs2D[hash1 | 1],
          xs
        );

        hash0 = this._HashR2(seed, x0, y1) & (255 << 1);
        hash1 = this._HashR2(seed, x1, y1) & (255 << 1);

        let lx1x = FastNoiseLite._Lerp(
          this._RandVecs2D[hash0],
          this._RandVecs2D[hash1],
          xs
        );
        let ly1x = FastNoiseLite._Lerp(
          this._RandVecs2D[hash0 | 1],
          this._RandVecs2D[hash1 | 1],
          xs
        );

        coord.x += FastNoiseLite._Lerp(lx0x, lx1x, ys) * warpAmp;
        coord.y += FastNoiseLite._Lerp(ly0x, ly1x, ys) * warpAmp;
      };

      /**
       *
       * @param {number} seed
       * @param {number} warpAmp
       * @param {number} frequency
       * @param {Vector3} coord
       * @param {number} x
       * @param {number} y
       * @param {number} z
       */
      let R3 = (seed, warpAmp, frequency, coord, x, y, z) => {
        let xf = x * frequency;
        let yf = y * frequency;
        let zf = z * frequency;

        let x0 = Math.floor(xf);
        let y0 = Math.floor(yf);
        let z0 = Math.floor(zf);

        let xs = FastNoiseLite._InterpHermite(xf - x0);
        let ys = FastNoiseLite._InterpHermite(yf - y0);
        let zs = FastNoiseLite._InterpHermite(zf - z0);

        x0 = Math.imul(x0, this._PrimeX);
        y0 = Math.imul(y0, this._PrimeY);
        z0 = Math.imul(z0, this._PrimeZ);
        let x1 = x0 + this._PrimeX;
        let y1 = y0 + this._PrimeY;
        let z1 = z0 + this._PrimeZ;

        let hash0 = this._HashR3(seed, x0, y0, z0) & (255 << 2);
        let hash1 = this._HashR3(seed, x1, y0, z0) & (255 << 2);

        let lx0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0],
          this._RandVecs3D[hash1],
          xs
        );
        let ly0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 1],
          this._RandVecs3D[hash1 | 1],
          xs
        );
        let lz0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 2],
          this._RandVecs3D[hash1 | 2],
          xs
        );

        hash0 = this._HashR3(seed, x0, y1, z0) & (255 << 2);
        hash1 = this._HashR3(seed, x1, y1, z0) & (255 << 2);

        let lx1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0],
          this._RandVecs3D[hash1],
          xs
        );
        let ly1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 1],
          this._RandVecs3D[hash1 | 1],
          xs
        );
        let lz1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 2],
          this._RandVecs3D[hash1 | 2],
          xs
        );

        let lx0y = FastNoiseLite._Lerp(lx0x, lx1x, ys);
        let ly0y = FastNoiseLite._Lerp(ly0x, ly1x, ys);
        let lz0y = FastNoiseLite._Lerp(lz0x, lz1x, ys);

        hash0 = this._HashR3(seed, x0, y0, z1) & (255 << 2);
        hash1 = this._HashR3(seed, x1, y0, z1) & (255 << 2);

        lx0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0],
          this._RandVecs3D[hash1],
          xs
        );
        ly0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 1],
          this._RandVecs3D[hash1 | 1],
          xs
        );
        lz0x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 2],
          this._RandVecs3D[hash1 | 2],
          xs
        );

        hash0 = this._HashR3(seed, x0, y1, z1) & (255 << 2);
        hash1 = this._HashR3(seed, x1, y1, z1) & (255 << 2);

        lx1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0],
          this._RandVecs3D[hash1],
          xs
        );
        ly1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 1],
          this._RandVecs3D[hash1 | 1],
          xs
        );
        lz1x = FastNoiseLite._Lerp(
          this._RandVecs3D[hash0 | 2],
          this._RandVecs3D[hash1 | 2],
          xs
        );

        coord.x +=
          FastNoiseLite._Lerp(lx0y, FastNoiseLite._Lerp(lx0x, lx1x, ys), zs) *
          warpAmp;
        coord.y +=
          FastNoiseLite._Lerp(ly0y, FastNoiseLite._Lerp(ly0x, ly1x, ys), zs) *
          warpAmp;
        coord.z +=
          FastNoiseLite._Lerp(lz0y, FastNoiseLite._Lerp(lz0x, lz1x, ys), zs) *
          warpAmp;
      };

      if (arguments.length === 6 && arguments[3] instanceof Vector2) {
        R2(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5]
        );
      }

      if (arguments.length === 7 && arguments[3] instanceof Vector3) {
        R3(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6]
        );
      }
    }

    /**
     * @private
     */
    _SingleDomainWarpOpenSimplex2Gradient() {
      /**
       *
       * @param {number} seed
       * @param {number} warpAmp
       * @param {number} frequency
       * @param {Vector2} coord
       * @param {boolean} outGradOnly
       * @param {number} x
       * @param {number} y
       */
      let R2 = (seed, warpAmp, frequency, coord, outGradOnly, x, y) => {
        const SQRT3 = 1.7320508075688772;
        const G2 = (3 - SQRT3) / 6;

        x *= frequency;
        y *= frequency;

        let i = Math.floor(x);
        let j = Math.floor(y);
        let xi = x - i;
        let yi = y - j;

        let t = (xi + yi) * G2;
        let x0 = xi - t;
        let y0 = yi - t;

        i = Math.imul(i, this._PrimeX);
        j = Math.imul(j, this._PrimeY);

        let vx, vy;
        vx = vy = 0;

        let a = 0.5 - x0 * x0 - y0 * y0;
        if (a > 0) {
          let aaaa = a * a * (a * a);
          let xo, yo;
          if (outGradOnly) {
            let hash = this._HashR2(seed, i, j) & (255 << 1);
            xo = this._RandVecs2D[hash];
            yo = this._RandVecs2D[hash | 1];
          } else {
            let hash = this._HashR2(seed, i, j);
            let index1 = hash & (127 << 1);
            let index2 = (hash >> 7) & (255 << 1);
            let xg = this._Gradients2D[index1];
            let yg = this._Gradients2D[index1 | 1];
            let value = x0 * xg + y0 * yg;
            let xgo = this._RandVecs2D[index2];
            let ygo = this._RandVecs2D[index2 | 1];
            xo = value * xgo;
            yo = value * ygo;
          }
          vx += aaaa * xo;
          vy += aaaa * yo;
        }

        let c =
          2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
          (-2 * (1 - 2 * G2) * (1 - 2 * G2) + a);
        if (c > 0) {
          let x2 = x0 + (2 * G2 - 1);
          let y2 = y0 + (2 * G2 - 1);
          let cccc = c * c * (c * c);
          let xo, yo;
          if (outGradOnly) {
            let hash =
              this._HashR2(seed, i + this._PrimeX, j + this._PrimeY) &
              (255 << 1);
            xo = this._RandVecs2D[hash];
            yo = this._RandVecs2D[hash | 1];
          } else {
            let hash = this._HashR2(seed, i + this._PrimeX, j + this._PrimeY);
            let index1 = hash & (127 << 1);
            let index2 = (hash >> 7) & (255 << 1);
            let xg = this._Gradients2D[index1];
            let yg = this._Gradients2D[index1 | 1];
            let value = x2 * xg + y2 * yg;
            let xgo = this._RandVecs2D[index2];
            let ygo = this._RandVecs2D[index2 | 1];
            xo = value * xgo;
            yo = value * ygo;
          }
          vx += cccc * xo;
          vy += cccc * yo;
        }

        if (y0 > x0) {
          let x1 = x0 + G2;
          let y1 = y0 + (G2 - 1);
          let b = 0.5 - x1 * x1 - y1 * y1;
          if (b > 0) {
            let bbbb = b * b * (b * b);
            let xo, yo;
            if (outGradOnly) {
              let hash = this._HashR2(seed, i, j + this._PrimeY) & (255 << 1);
              xo = this._RandVecs2D[hash];
              yo = this._RandVecs2D[hash | 1];
            } else {
              let hash = this._HashR2(seed, i, j + this._PrimeY);
              let index1 = hash & (127 << 1);
              let index2 = (hash >> 7) & (255 << 1);
              let xg = this._Gradients2D[index1];
              let yg = this._Gradients2D[index1 | 1];
              let value = x1 * xg + y1 * yg;
              let xgo = this._RandVecs2D[index2];
              let ygo = this._RandVecs2D[index2 | 1];
              xo = value * xgo;
              yo = value * ygo;
            }
            vx += bbbb * xo;
            vy += bbbb * yo;
          }
        } else {
          let x1 = x0 + (G2 - 1);
          let y1 = y0 + G2;
          let b = 0.5 - x1 * x1 - y1 * y1;
          if (b > 0) {
            let bbbb = b * b * (b * b);
            let xo, yo;
            if (outGradOnly) {
              let hash = this._HashR2(seed, i + this._PrimeX, j) & (255 << 1);
              xo = this._RandVecs2D[hash];
              yo = this._RandVecs2D[hash | 1];
            } else {
              let hash = this._HashR2(seed, i + this._PrimeX, j);
              let index1 = hash & (127 << 1);
              let index2 = (hash >> 7) & (255 << 1);
              let xg = this._Gradients2D[index1];
              let yg = this._Gradients2D[index1 | 1];
              let value = x1 * xg + y1 * yg;
              let xgo = this._RandVecs2D[index2];
              let ygo = this._RandVecs2D[index2 | 1];
              xo = value * xgo;
              yo = value * ygo;
            }
            vx += bbbb * xo;
            vy += bbbb * yo;
          }
        }

        coord.x += vx * warpAmp;
        coord.y += vy * warpAmp;
      };

      /**
       *
       * @param {number} seed
       * @param {number} warpAmp
       * @param {number} frequency
       * @param {Vector3} coord
       * @param {boolean} outGradOnly
       * @param {number} x
       * @param {number} y
       * @param {number} z
       */
      let R3 = (seed, warpAmp, frequency, coord, outGradOnly, x, y, z) => {
        x *= frequency;
        y *= frequency;
        z *= frequency;

        let i = Math.round(x);
        let j = Math.round(y);
        let k = Math.round(z);
        let x0 = x - i;
        let y0 = y - j;
        let z0 = z - k;

        let xNSign = (-x0 - 1.0) | 1;
        let yNSign = (-y0 - 1.0) | 1;
        let zNSign = (-z0 - 1.0) | 1;

        let ax0 = xNSign * -x0;
        let ay0 = yNSign * -y0;
        let az0 = zNSign * -z0;

        i = Math.imul(i, this._PrimeX);
        j = Math.imul(j, this._PrimeY);
        k = Math.imul(k, this._PrimeZ);

        let vx, vy, vz;
        vx = vy = vz = 0;

        let a = 0.6 - x0 * x0 - (y0 * y0 + z0 * z0);
        for (let l = 0; ; l++) {
          if (a > 0) {
            let aaaa = a * a * (a * a);
            let xo, yo, zo;
            if (outGradOnly) {
              let hash = this._HashR3(seed, i, j, k) & (255 << 2);
              xo = this._RandVecs3D[hash];
              yo = this._RandVecs3D[hash | 1];
              zo = this._RandVecs3D[hash | 2];
            } else {
              let hash = this._HashR3(seed, i, j, k);
              let index1 = hash & (63 << 2);
              let index2 = (hash >> 6) & (255 << 2);
              let xg = this._Gradients3D[index1];
              let yg = this._Gradients3D[index1 | 1];
              let zg = this._Gradients3D[index1 | 2];
              let value = x0 * xg + y0 * yg + z0 * zg;
              let xgo = this._RandVecs3D[index2];
              let ygo = this._RandVecs3D[index2 | 1];
              let zgo = this._RandVecs3D[index2 | 2];
              xo = value * xgo;
              yo = value * ygo;
              zo = value * zgo;
            }
            vx += aaaa * xo;
            vy += aaaa * yo;
            vz += aaaa * zo;
          }

          let b = a;
          let i1 = i;
          let j1 = j;
          let k1 = k;
          let x1 = x0;
          let y1 = y0;
          let z1 = z0;

          if (ax0 >= ay0 && ax0 >= az0) {
            x1 += xNSign;
            b = b + ax0 + ax0;
            i1 -= xNSign * this._PrimeX;
          } else if (ay0 > ax0 && ay0 >= az0) {
            y1 += yNSign;
            b = b + ay0 + ay0;
            j1 -= yNSign * this._PrimeY;
          } else {
            z1 += zNSign;
            b = b + az0 + az0;
            k1 -= zNSign * this._PrimeZ;
          }

          if (b > 1) {
            b -= 1;
            let bbbb = b * b * (b * b);
            let xo, yo, zo;
            if (outGradOnly) {
              let hash = this._HashR3(seed, i1, j1, k1) & (255 << 2);
              xo = this._RandVecs3D[hash];
              yo = this._RandVecs3D[hash | 1];
              zo = this._RandVecs3D[hash | 2];
            } else {
              let hash = this._HashR3(seed, i1, j1, k1);
              let index1 = hash & (63 << 2);
              let index2 = (hash >> 6) & (255 << 2);
              let xg = this._Gradients3D[index1];
              let yg = this._Gradients3D[index1 | 1];
              let zg = this._Gradients3D[index1 | 2];
              let value = x1 * xg + y1 * yg + z1 * zg;
              let xgo = this._RandVecs3D[index2];
              let ygo = this._RandVecs3D[index2 | 1];
              let zgo = this._RandVecs3D[index2 | 2];
              xo = value * xgo;
              yo = value * ygo;
              zo = value * zgo;
            }
            vx += bbbb * xo;
            vy += bbbb * yo;
            vz += bbbb * zo;
          }

          if (l === 1) break;

          ax0 = 0.5 - ax0;
          ay0 = 0.5 - ay0;
          az0 = 0.5 - az0;

          x0 = xNSign * ax0;
          y0 = yNSign * ay0;
          z0 = zNSign * az0;

          a += 0.75 - ax0 - (ay0 + az0);

          i += (xNSign >> 1) & this._PrimeX;
          j += (yNSign >> 1) & this._PrimeY;
          k += (zNSign >> 1) & this._PrimeZ;

          xNSign = -xNSign;
          yNSign = -yNSign;
          zNSign = -zNSign;

          seed += 1293373;
        }

        coord.x += vx * warpAmp;
        coord.y += vy * warpAmp;
        coord.z += vz * warpAmp;
      };

      if (arguments.length === 7) {
        R2(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6]
        );
      }

      if (arguments.length === 8) {
        R3(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          arguments[7]
        );
      }
    }
  }

  class Vector2 {
    /**
     * 2d Vector
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  class Vector3 {
    /**
     * 3d Vector
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
>>>>>>> parent of 95e6823 (minified)

  Scratch.extensions.register(new Noise());
})(Scratch);
