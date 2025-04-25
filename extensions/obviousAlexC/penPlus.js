// Name: Pen Plus V7
// ID: penP
// Description: Advanced rendering capabilities.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
// License: MIT

// With permission from Sharkpool-SP to use his pen layer data uri block!
// Thanks dude!

//If you are a mod developer please hit ctrl + f and look for /* MESSAGE FOR MOD DEVELOPERS */ to find more info
//About supporting you mod.
//    --Thanks ObviousAlexC

//if you are looking for extension settings search up /* EXTENSION SETTINGS */

//7.1.8 patch notes

/*
  ? -- Changes -- ?
    ? Bug Fixes
    ? Standardized naming
*/

(function (Scratch) {
    "use strict";

    /* generated l10n code */ Scratch.translate.setup({
        ca: { _Advanced: "Avançat" },
        cs: { _Advanced: "Pokročilé" },
        de: { _Advanced: "Erweitert", _Images: "Bilder" },
        es: { _Advanced: "Avanzado" },
        fi: {
          _Advanced: "Edistykselliset",
          "_Blue Tint": "sinisen sävy",
          _Clamp: "pidä paikallaan",
          _Closest: "lähin",
          _Color: "Väri",
          _Cubemaps: "Kuutiotekstuurit",
          "_Custom Shaders": "Varjostimet",
          "_Erase Depth": "pyyhi syvyys",
          _Extras: "Lisälohkot",
          "_Green Tint": "vihreän sävy",
          _Height: "korkeus",
          _Images: "Kuvat",
          _Linear: "lineaarinen",
          "_List Based Rendering": "Listapohjainen renderöinti",
          _Mirrored: "peilikuva",
          "_Pen Properties": "Kynän ominaisuudet",
          "_Pen+ Costumes": "Kynä + -asusteet",
          "_Pen+ V7": "Kynä + V7",
          "_Pen+ version": "Kynä + -laajennuksen versio",
          "_Red Tint": "punaisen sävy",
          "_Render Textures": "Renderöintitekstuurit",
          _Repeat: "toista",
          _Rotation: "kierto",
          "_Shader Editor": "Varjostineditori",
          "_Shader Manager": "Varjostinten hallinta",
          "_Square Pen Blocks": "Neliökynän lohkot",
          _Transparency: "läpinäkyvyys",
          "_Triangle Blocks": "Kolmiolohkot",
          "_U value": "U-arvo",
          "_U-Multiplier": "U-kerroin",
          "_U-Offset": "U-siirros",
          "_V value": "V-arvo",
          "_V-Multiplier": "V-kerroin",
          "_V-Offset": "V-siirros",
          _Width: "leveys",
          "_add blank image that is [color] and the size of [width], [height] named [name] to Pen+ Library":
            "lisää [name] -niminen tyhjä kuva, joka on [color] ja kooltaan [width], [height], Kynä + -kirjastoon  ",
          "_add image named [name] from [dataURI] to Pen+ Library":
            "lisää [name] -niminen kuva osoitteesta [dataURI] Kynä + -kirjastoon",
          "_allow 'Corner Pinch < 1'": "salli 'kulman kavennus < 1'",
          "_blue tint": "sinisen sävy",
          _brightness: "kirkkaus",
          "_clamp depth value": "pidä syvyysarvo paikallaan",
          "_clear pen from [name]": "palauta kynä tekstuurista [name]",
          "_clock-wise": "myötäpäivään",
          _color: "väri",
          "_corner pinch": "reunan kavennus",
          "_counter clock-wise": "vastapäivään",
          "_create cubemap named [name] from left [left] right [right] back [back] front [front] bottom [bottom] top [top]":
            "luo [name] -niminen kuutiotekstuuri asusteilla vasen [left], oikea [right], taka [back], etu [front], ala [bottom] ja ylä [top]",
          "_create render texture named [name]":
            "luo [name] -niminen renderöintitekstuuri",
          "_create render texture named [name] of size [width] [height]":
            "luo [name] -niminen renderöintitekstuuri koolla [width] [height]",
          "_data uri of pen layer": "kynätason data uri",
          "_define solid tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3]":
            "määrittele kolmio [x1] [y1] [c1], [x2] [y2] [c2] ja [x3] [y3] [c3]",
          "_define textured tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3] with the uv's [u1] [v1], [u2] [v2] and [u3] [v3]":
            "määrittele kolmio [x1] [y1] [c1], [x2] [y2] [c2] ja [x3] [y3] [c3] uv:lla [u1] [v1], [u2] [v2] ja [u3] [v3]",
          "_depth value": "syvyysarvo",
          "_does [name] exist as a cubemap": "onko kuutiotekstuuri [name] olemassa",
          "_does [name] exist in Pen+ Library": "onko [name] Kynä + -kirjastossa",
          "_does render texture named [name] exist?":
            "onko [name] -niminen renderöintitekstuuri olemassa?",
          "_draw dot at [x] [y]": "piirrä piste sijaintiin [x] [y]",
          "_draw line from [x1] [y1] to [x2] [y2]":
            "piirrä jana pisteestä [x1] [y1] pisteeseen [x2] [y2]",
          "_draw shader triangles from list [list] using [shader]":
            "piirrä kolmioita listasta [list] varjostimella [shader]",
          "_draw solid triangles from list [list]":
            "piirrä tasavärisiä kolmioita listasta [list]",
          "_draw square using [shader]": "piirrä neliö varjostimella [shader]",
          "_draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]":
            "piirrä kolmio [x1] [y1], [x2] [y2] ja [x3] [y3] kohteen [tex] tekstuurilla",
          "_draw textured triangles from list [list] using [tex]":
            "piirrä kolmioita listasta [list] tekstuurilla [tex]",
          "_draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "piirrä kolmio pisteiden [x1] [y1], [x2] [y2] ja [x3] [y3] väliin",
          "_draw triangle using [shader] between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "piirrä kolmio varjostimella [shader] pisteiden [x1] [y1], [x2] [y2] ja [x3] [y3] väliin ",
          "_get data uri for costume [costume]": "asusteen [costume] data uri",
          "_get data uri of [costume] in the pen+ costume library":
            "asusteen [costume] data uri Kynä + -asustekirjastossa",
          "_get item [item]'s [component] value in vector 2 array [uniformName] in [shader]":
            "varjostimen [shader] vektori 2:n taulukon [uniformName] [item]. kohteen [component]-arvo",
          "_get item [item]'s [component] value in vector 3 array [uniformName] in [shader]":
            "varjostimen [shader] vektori 3:n taulukon [uniformName] [item]. kohteen [component]-arvo",
          "_get item [item]'s [component] value in vector 4 array [uniformName] in [shader]":
            "varjostimen [shader] vektori 4:n taulukon [uniformName] [item]. kohteen [component]-arvo",
          "_get item [item]'s value in number array [uniformName] in [shader]":
            "varjostimen [shader] lukutaulukon [uniformName] [item]. kohteen arvo",
          "_get pen square's [target]": "kynäneliön [target]",
          "_get pixel [x] [y]'s color in [costume]":
            "asusteen [costume] pikselin [x] [y] väri",
          "_get the [dimension] of [costume] in pen+ costume library":
            "asusteen [costume] [dimension] Kynä + -asustekirjastossa ",
          "_get the cubemap of [uniformName] in [shader]":
            "varjostimen [shader] tekstuurin [uniformName] kuutiotekstuuri",
          "_get the texture of [uniformName] in [shader]":
            "varjostimen [shader] tekstuuri [uniformName] ",
          "_get triangle point [point]'s [attribute]":
            "kolmion [point]. pisteen [attribute]",
          "_get value of [component] in vector 2 [uniformName] in [shader]":
            "varjostimen [shader] vektori 2:n [uniformName] [component]:n arvo",
          "_get value of [component] in vector 3 [uniformName] in [shader]":
            "varjostimen [shader] vektori 3:n [uniformName] [component]:n arvo",
          "_get value of [component] in vector 4 [uniformName] in [shader]":
            "varjostimen [shader] vektori 4:n [uniformName] [component]:n arvo",
          "_get value of matrix [uniformName] in [shader] as an array":
            "varjostimen [shader] matriisin [uniformName] arvo taulukkona",
          "_get value of number [uniformName] in [shader]":
            "varjostimen [shader] luku [uniformName]",
          "_green tint": "vihreän sävy",
          _height: "korkeus",
          "_hex code": "heksadesimaalikoodi",
          "_hide triangles that turn [direction]":
            "piilota [direction] kääntyvät kolmiot",
          "_hue [H] saturation [S] value [V]":
            "sävy [H] värikylläisyys [S] kirkkaus [V]",
          "_maximum depth value": "enimmäissyvyysarvo",
          "_neither way": "ei kumpaankaan suuntaan",
          _off: "pois päältä",
          _on: "päälle",
          "_pen [HSV]": "kynän [HSV]",
          "_pen is down?": "onko kynä alhaalla?",
          "_red [R] green [G] blue [B]": "punainen [R] vihreä [G] sininen [B]",
          "_red tint": "punaisen sävy",
          "_remove cubemap named [name]": "poista [name] -niminen kuutiotekstuuri",
          "_remove image named [name] from Pen+ Library":
            "poista [name] -niminen kuva Kynä + -kirjastosta",
          "_remove render texture named [name]":
            "poista [name] -niminen renderöintitekstuuri",
          "_render textures": "renderöintitekstuurit",
          "_render tris and squares to [name]":
            "renderöi kolmiot ja neliöt kohteeseen [name]",
          "_reset square Attributes": "nollaa neliön määritteet",
          "_reset triangle attributes": "nollaa kolmion määritteet",
          _saturation: "värikylläisyys",
          "_set [setting] to [value]": "aseta [setting] arvoon [value]",
          "_set cubemap [uniformName] in [shader] to [cubemap]":
            "aseta varjostimen [shader] kuutiotekstuuriksi [uniformName] [cubemap]",
          "_set imported image wrap mode to [clampMode]":
            "aseta tuodun kuvan kääretilaksi [clampMode]",
          "_set item [item] in number array [uniformName] in [shader] to [number]":
            "aseta varjostimen [shader] lukutaulukon [uniformName] kohde [item] arvoon [number]",
          "_set item [item] in vector 2 array [uniformName] in [shader] to [numberX] [numberY]":
            "aseta varjostimen [shader] vektori 2:n taulukon [uniformName] kohde [item] arvoihin [numberX] [numberY]",
          "_set item [item] in vector 3 array [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "aseta varjostimen [shader] vektori 3:n taulukon [uniformName] kohde [item] arvoihin [numberX] [numberY] [numberZ]",
          "_set item [item] in vector 4 array [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "aseta varjostimen [shader] vektori 4:n taulukon [uniformName] kohde [item] arvoihin [numberX] [numberY] [numberZ] [numberW]",
          "_set matrix [uniformName] in [shader] to [array]":
            "aseta varjostimen [shader] matriisiksi [uniformName] [array]",
          "_set matrix [uniformName] in [shader] to [list]":
            "aseta varjostimen [shader] matriisiksi [uniformName] [list]",
          "_set number [uniformName] in [shader] to [number]":
            "aseta varjostimen [shader] luvuksi [uniformName] [number]",
          "_set number attribute [attributeName] of point [pointID] in [shader] to [number]":
            "aseta varjostimen [shader] [pointID]. pisteen määrite [attributeName] arvoon [number]",
          "_set pen square's [target] to [number]":
            "aseta kynäneliön [target] arvoon [number]",
          "_set pixel [x] [y]'s color to [color] in [costume]":
            "aseta asusteen [costume] pikselin [x] [y] väriksi [color]",
          "_set texture [uniformName] in [shader] to [texture]":
            "aseta varjostimen [shader] tekstuuriksi [uniformName] [texture]",
          "_set texture filter mode to [filter]":
            "aseta tekstuurisuodattimen tilaksi [filter]",
          "_set the [attribute] of point [id] to [value] in [def]":
            "aseta määritelmän [def] [id]. pisteen [attribute] arvoon [value]",
          "_set the prefix for [prefix] to [value]":
            "aseta kohteen [prefix] etuliitteeksi [value]",
          "_set triangle point [point]'s [attribute] to [value]":
            "aseta kolmion [point]. pisteen [attribute] arvoon [value]",
          "_set triangle's [wholeAttribute] to [value]":
            "aseta kolmion [wholeAttribute] arvoon [value]",
          "_set vector 2 [uniformName] in [shader] to [numberX] [numberY]":
            "aseta varjostimen [shader] vektori 2 [uniformName] arvoihin [numberX] [numberY]",
          "_set vector 2 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY]":
            "aseta varjostimen [shader] vektori 2:n [pointID]. pisteen määrite [attributeName] arvoon [numberX] [numberY]",
          "_set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "aseta varjostimen [shader] vektori 3 [uniformName] arvoihin [numberX] [numberY] [numberZ]",
          "_set vector 3 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ]":
            "aseta varjostimen [shader] vektori 3:n [pointID]. pisteen määrite [attributeName] arvoon [numberX] [numberY] [numberZ]",
          "_set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "aseta varjostimen [shader] vektori 4 [uniformName] arvoihin [numberX] [numberY] [numberZ] [numberW]",
          "_set vector 4 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "aseta varjostimen [shader] vektori 4:n [pointID]. pisteen määrite [attributeName] arvoon [numberX] [numberY] [numberZ] [numberW]",
          "_shaders in project": "projektin varjostimet",
          _size: "koko",
          "_stamp [sprite]": "leimaa [sprite]",
          "_stamp pen square": "leimaa kynäneliö",
          "_stamp pen square with the texture of [tex]":
            "leimaa kynäneliö kohteen [tex] tekstuurillla",
          "_tint pen square to [color]": "aseta kynäneliön väriksi [color]",
          "_tint triangle point [point] to [color]":
            "aseta kolmion [point]. pisteen väriksi [color]",
          "_tint triangle to [color]": "aseta kolmion väriksi [color]",
          _transparency: "läpinäkyvyys",
          "_triangles drawn": "piirretyt kolmiot",
          "_turn advanced setting [Setting] [onOrOff]":
            "kytke edistyksellinen asetus [Setting] [onOrOff]",
          _width: "leveys",
        },
        fr: { _Advanced: "Avancé" },
        hu: { _Advanced: "Haladó" },
        it: {
          _Advanced: "Impostazioni Avanzate",
          _Images: "Immagini",
          _height: "altezza",
          _off: "disabilita",
          _on: "abilita",
          _width: "larghezza",
        },
        ja: {
          _Advanced: "詳細設定",
          _Color: "色",
          _Cubemaps: "キューブマップ",
          "_Custom Shaders": "カスタムシェーダー",
          _Height: "高さ",
          _Images: "画像",
          "_Pen+ version": "ペン+ バージョン",
          "_Shader Editor": "シェーダーエディター",
          "_Shader Manager": "シェーダーマネージャー",
          _Width: "横幅",
          _brightness: "明るさ",
          _color: "色",
          _height: "高さ",
          _off: "オフ",
          _on: "オン",
          _saturation: "彩度",
          _size: "サイズ",
          _transparency: "透明度",
          "_triangles drawn": "描画された三角形の数",
          _width: "横幅",
        },
        "ja-hira": { _Advanced: "こうどなせってい" },
        ko: {
          _Advanced: "고급 설정",
          "_Custom Shaders": "사용자 정의 셰이더",
          _Extras: "그 외",
          _Height: "높이",
          _Images: "이미지",
          "_Pen Properties": "펜 속성",
          "_Pen+ V7": "펜 플러스 V7",
          "_Pen+ version": "펜 플러스 버전",
          "_Shader Editor": "셰이더 편집기",
          "_Square Pen Blocks": "사각형 블록",
          "_Triangle Blocks": "삼각형 블록",
          _Width: "넓이",
          _brightness: "밝기",
          "_clock-wise": "시계 방향",
          _color: "색깔",
          "_counter clock-wise": "시계 반대 방향",
          "_draw dot at [x] [y]": "점 [x] [y] 그리기",
          "_draw line from [x1] [y1] to [x2] [y2]":
            "직선 [x1] [y1] 부터 [x2] [y2] 까지 그리기",
          "_draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]":
            "텍스쳐 삼각형 그리기 [x1] [y1], [x2] [y2], [x3] [y3] 텍스쳐 [tex]",
          "_draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "삼각형 그리기 [x1] [y1], [x2] [y2], [x3] [y3]",
          "_get data uri for costume [costume]": "모양 [costume]의 dataURI",
          "_get pixel [x] [y]'s color in [costume]":
            "모양 [costume]의 [x] [y] 픽셀의 색상 ",
          "_get value of [component] in vector 2 [uniformName] in [shader]":
            "[shader]의 Vector2 [uniformName]의 [component]값",
          "_get value of [component] in vector 3 [uniformName] in [shader]":
            "[shader]의 Vector3 [uniformName]의 [component]값",
          "_get value of [component] in vector 4 [uniformName] in [shader]":
            "[shader]의 Vector4 [uniformName]의 [component]값",
          "_get value of matrix [uniformName] in [shader] as an array":
            "[shader]의 행렬 [uniformName]의 배열로서 값",
          _height: "높이",
          "_hex code": "Hex코드",
          "_hue [H] saturation [S] value [V]": "Hue[H] Saturation[S] Value[V]",
          _off: "끄기",
          _on: "켜기",
          "_pen is down?": "펜을 내렸는가?",
          "_red [R] green [G] blue [B]": "Red[R] Green[G] Blue[B]",
          _saturation: "채도",
          "_set matrix [uniformName] in [shader] to [array]":
            "[shader]의 행렬 [uniformName]을(를) [array](으)로 정하기",
          "_set matrix [uniformName] in [shader] to [list]":
            "[shader]의 행렬 [uniformName]을(를) [list](으)로 정하기",
          "_set pixel [x] [y]'s color to [color] in [costume]":
            "모양 [costume]의 [x] [y] 픽셀의 색상을 [color](으)로 정하기",
          "_set texture [uniformName] in [shader] to [texture]":
            "[shader]의 텍스쳐 [uniformName]을(를) [texture](으)로 정하기",
          "_set vector 2 [uniformName] in [shader] to [numberX] [numberY]":
            "[shader]의 Vector2 [uniformName]을(를) [numberX] [numberY] (으)로 정하기",
          "_set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "[shader]의 Vector3 [uniformName]을(를) [numberX] [numberY] [numberZ] (으)로 정하기",
          "_set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "[shader]의 Vector4 [uniformName]을(를) [numberX] [numberY] [numberZ] [numberW] (으)로 정하기",
          _size: "크기",
          "_stamp [sprite]": "[sprite] 도장찍기",
          "_stamp pen square": "펜 사각형 도장찍기",
          _transparency: "투명",
          _width: "넓이",
        },
        lt: { _Advanced: "Išplėstiniai" },
        nb: {
          _Advanced: "Avansert",
          _Images: "Bilder",
          _brightness: "lysstyrke",
          _color: "farge",
          _height: "høyde",
          _off: "av",
          _on: "på",
          _width: "bredde",
        },
        nl: {
          _Advanced: "Geavanceerd",
          _Images: "Afbeeldingen",
          "_Pen Properties": "Peneigenschappen",
          "_Square Pen Blocks": "Rechthoek-pen",
          "_Triangle Blocks": "Driehoek-pen",
          _brightness: "helderheid",
          _color: "kleur",
          "_draw dot at [x] [y]": "teken stip op [x] [y]",
          "_draw line from [x1] [y1] to [x2] [y2]":
            "teken lijn van [x1] [y1] naar [x2] [y2]",
          "_get pen square's [target]": "[target] van rechthoek-pen",
          _height: "hoogte",
          _off: "uit",
          _on: "aan",
          "_pen is down?": "pen is neer?",
          "_reset square Attributes": "reset waarden van rechthoek-pen",
          _saturation: "verzadiging",
          "_set pen square's [target] to [number]":
            "zet [target] van rechthoek-pen op [number]",
          "_set triangle point [point]'s [attribute] to [value]":
            "zet [attribute] van driehoek-punt [point] op [value]",
          "_set triangle's [wholeAttribute] to [value]":
            "zet [wholeAttribute] van driehoek op [value]",
          _size: "grootte",
          "_stamp [sprite]": "stempel [sprite]",
          "_stamp pen square": "stempel rechthoek-pen",
          "_stamp pen square with the texture of [tex]":
            "stempel rechthoek-pen met textuur van [tex]",
          "_tint pen square to [color]": "maak tint van rechthoek-pen [color]",
          _transparency: "doorzichtigheid",
          _width: "breedte",
        },
        pl: {
          _Advanced: "Zaawansowane",
          _Color: "Kolor",
          _Height: "Wysokość",
          _Images: "Obrazy",
          _Width: "Szerokość",
          _brightness: "jasność",
          _color: "kolor",
          _height: "wysokość",
          _saturation: "nasycenie",
          _size: "wielkość",
          _transparency: "przezroczystość",
          _width: "szerokość",
        },
        pt: { _Advanced: "Avançado" },
        "pt-br": { _Advanced: "Avançado" },
        ro: { _Advanced: "Avansat" },
        ru: {
          _Advanced: "Дополнительно",
          _Color: "Цвет",
          _Cubemaps: "Кубические карты",
          "_Custom Shaders": "Пользовательские Шейдеры",
          _Images: "Картинки",
          "_List Based Rendering": "Рендеринг на Основе Списка",
          "_Pen Properties": "Свойства Пера",
          "_Pen+ V7": "Перо+ V7",
          "_Render Textures": "Рендер Текстур",
          "_Shader Editor": "Редактор Шейдеров",
          "_Shader Manager": "Менеджер Шейдеров",
          "_Square Pen Blocks": "Квадратные Блоки Пера",
          "_Triangle Blocks": "Треугольные Блоки",
          "_add blank image that is [color] and the size of [width], [height] named [name] to Pen+ Library":
            "добавить пустое изображение с цветом [color] и размером [width], [height] названное [name] в библиотеку Pen+",
          "_add image named [name] from [dataURI] to Pen+ Library":
            "добавить изображение названное [name] из [dataURI] в библиотеку Pen+",
          _brightness: "яркость",
          _color: "цвет",
          "_create cubemap named [name] from left [left] right [right] back [back] front [front] bottom [bottom] top [top]":
            "создать кубическую карту названная [name] из лева [left] право [right] назад [back] перед [front] низ [bottom] верх [top]",
          "_create render texture named [name]":
            "создать рендер текстур названный [name]",
          "_create render texture named [name] of size [width] [height]":
            "создать рендер текстур названный [name] с размером [width] [height]",
          "_define solid tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3]":
            "определить сплошные треугольники [x1] [y1] [c1], [x2] [y2] [c2] и [x3] [y3] [c3]",
          "_define textured tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3] with the uv's [u1] [v1], [u2] [v2] and [u3] [v3]":
            "определить сплошные треугольники [x1] [y1] [c1], [x2] [y2] [c2] и [x3] [y3] [c3] с uv [u1] [v1],[u2] [v2] и [u3] [v3] ",
          "_does [name] exist as a cubemap": "[name] существует как кубическая карта",
          "_does [name] exist in Pen+ Library": "[name] существует в библиотеке Pen+",
          "_does render texture named [name] exist?":
            "рендер текстур названный [name] существует?",
          "_draw dot at [x] [y]": "нарисовать точку на [x] [y]",
          "_draw line from [x1] [y1] to [x2] [y2]":
            "нарисовать линию с [x1] [y1] до [x2] [y2]",
          "_draw shader triangles from list [list] using [shader]":
            "нарисовать шейдорированные треугольники из списка [list] используя [shader]",
          "_draw solid triangles from list [list]":
            "нарисовать сплошные треугольники из списка [list]",
          "_draw square using [shader]": "нарисовать квадрат используя [shader]",
          "_draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]":
            "нарисовать текстурированный треугольник между [x1] [y1], [x2] [y2] и [x3] [y3] с текстурой [tex]",
          "_draw textured triangles from list [list] using [tex]":
            "нарисовать текстурированные треугольниками из списка [list] используя [tex]",
          "_draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "нарисовать треугольник между [x1] [y1], [x2] [y2] и [x3] [y3]",
          "_draw triangle using [shader] between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "нарисовать треугольник используя [shader] между [x1] [y1], [x2] [y2] и [x3] [y3]",
          "_get data uri for costume [costume]":
            "получить uri данные для костюма [costume]",
          "_get data uri of [costume] in the pen+ costume library":
            "получить uri данные [costume] в библиотеке костюмов pen+",
          "_get item [item]'s [component] value in vector 2 array [uniformName] in [shader]":
            "получить #[item] значение [component] в [uniformName] матрицы вектора 2 в [shader]",
          "_get item [item]'s [component] value in vector 3 array [uniformName] in [shader]":
            "получить #[item] значение [component] в [uniformName] матрицы вектора 3 в [shader]",
          "_get item [item]'s [component] value in vector 4 array [uniformName] in [shader]":
            "получить #[item] значение [component] в [uniformName] матрицы вектора 4 в [shader]",
          "_get item [item]'s value in number array [uniformName] in [shader]":
            "получить значение #[item] в числе [uniformName] матрицы в [shader]",
          "_get pen square's [target]": "получить [target] квадрат пера",
          "_get pixel [x] [y]'s color in [costume]":
            "получить цвет пикселя [x] [y] в [costume]",
          "_get the [dimension] of [costume] in pen+ costume library":
            "получить [dimension] [costume] в библиотеке костюмов pen+",
          "_get the cubemap of [uniformName] in [shader]":
            "получить [uniformName] кубическая карта в [shader]",
          "_get the texture of [uniformName] in [shader]":
            "получить [uniformName] текстуру в [shader]",
          "_get triangle point [point]'s [attribute]":
            "взять [point] треугольный точки [attribute]",
          "_get value of [component] in vector 2 [uniformName] in [shader]":
            "получить значение [component] в [uniformName] вектора 2 в [shader]",
          "_get value of [component] in vector 3 [uniformName] in [shader]":
            "получить значение [component] в [uniformName] вектора 3 в [shader]",
          "_get value of [component] in vector 4 [uniformName] in [shader]":
            "получить значение [component] в [uniformName] вектора 4 в [shader] ",
          "_get value of matrix [uniformName] in [shader] as an array":
            "получить значение [uniformName] матрикса в [shader] как матрица",
          "_get value of number [uniformName] in [shader]":
            "получить значение [uniformName] числа в [shader]",
          _height: "высота",
          "_hue [H] saturation [S] value [V]":
            "оттенок [H] насыщенность [S] ценность [V]",
          _off: "выключить",
          _on: "включить",
          "_pen [HSV]": "перо [HSV]",
          "_pen is down?": "перо опущено?",
          "_red [R] green [G] blue [B]": "красный [R] зелёный [G] синий [B]",
          "_remove cubemap named [name]": "удалить кубическую карту названной [name]",
          "_remove image named [name] from Pen+ Library":
            "удалить изображение названное [name] из библиотеки Pen+",
          "_remove render texture named [name]":
            "удалить рендер текстур названный [name]",
          "_render textures": "рендер текстур",
          "_reset square Attributes": "сбросить Атрибуты квадрата",
          "_reset triangle attributes": "сбросить атрибуты треугольника",
          _saturation: "насыщенный",
          "_set cubemap [uniformName] in [shader] to [cubemap]":
            "задать [uniformName] кубическая карта на [кубическая карта] в [shader]",
          "_set imported image wrap mode to [clampMode]":
            "задать режим переноса импортированного изображения на [clampMode]",
          "_set item [item] in number array [uniformName] in [shader] to [number]":
            "задать #[item] в числе [uniformName] матрицы на [number] в [shader]",
          "_set item [item] in vector 2 array [uniformName] in [shader] to [numberX] [numberY]":
            "задать #[item] в [uniformName] вектора 2 на [numberX] [numberY] в [shader]",
          "_set item [item] in vector 3 array [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "задать #[item] в [uniformName] вектора 3 на [numberX] [numberY] [numberZ] в [shader]",
          "_set item [item] in vector 4 array [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "задать #[item] в [uniformName] вектора 4 на [numberX] [numberY] [numberZ] [numberW] в [shader]",
          "_set matrix [uniformName] in [shader] to [array]":
            "задать [uniformName] матрикса на [array] в [shader]",
          "_set matrix [uniformName] in [shader] to [list]":
            "задать [uniformName] матрикса на [list] в [shader] ",
          "_set number [uniformName] in [shader] to [number]":
            "задать [uniformName] число на [number] в [shader]",
          "_set number attribute [attributeName] of point [pointID] in [shader] to [number]":
            "задать число [attributeName] атрибута точки [pointID] на [number] в [shader]",
          "_set pen square's [target] to [number]":
            "задать [target] на [number] квадрата пера",
          "_set pixel [x] [y]'s color to [color] in [costume]":
            "задать пикселю [x] [y] цвет [color] в [costume]",
          "_set texture [uniformName] in [shader] to [texture]":
            "задать текстуру [uniformName] на [texture] в [shader]",
          "_set the [attribute] of point [id] to [value] in [def]":
            "задать [attribute] точки [id] на [value] в [def]",
          "_set triangle point [point]'s [attribute] to [value]":
            "задать [point] точку треугольника [attribute] на [value]",
          "_set triangle's [wholeAttribute] to [value]":
            "задать треугольнику [wholeAttribute] на [value]",
          "_set vector 2 [uniformName] in [shader] to [numberX] [numberY]":
            "задать [uniformName] вектора 2 на [numberX] [numberY] в [shader]",
          "_set vector 2 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY]":
            "задать [attributeName] атрибута вектора 2 точки [pointID] на [numberX] [numberY] в [shader]",
          "_set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "задать [uniformName] вектора 3 на [numberX] [numberY] [numberZ] в [shader]",
          "_set vector 3 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ]":
            "задать [attributeName] атрибута вектора 3 точки [pointID] на [numberX] [numberY] [numberZ] в [shader]",
          "_set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "задать [uniformName] вектора 4 на [numberX] [numberY] [numberZ] [numberW] в [shader]",
          "_set vector 4 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "задать [attributeName] атрибута вектора 4 точки [pointID] на [numberX] [numberY] [numberZ] [numberW] в [shader]",
          "_shaders in project": "шейдеры в проекте",
          _size: "размер",
          "_stamp [sprite]": "печать [sprite]",
          "_stamp pen square": "печать квадрата пером",
          "_stamp pen square with the texture of [tex]":
            "печать с текстурой [tex] квадрат пера",
          "_tint pen square to [color]": "покрасить квадрат пера в [color]",
          "_tint triangle point [point] to [color]":
            "покрасить треугольную точку [point] в [color]",
          "_tint triangle to [color]": "покрасить треугольную точку на [color]",
          _transparency: "прозрачность",
          _width: "ширина",
        },
        sl: { _Advanced: "Napredno" },
        sr: { _Advanced: "Напредно" },
        sv: { _Advanced: "Avancerat" },
        tr: { _Advanced: "Gelişmiş" },
        uk: {
          _Images: "Зображення",
          _brightness: "яскравість",
          _color: "колір",
          _height: "висота",
          _off: "вимкнути",
          _on: "увімкнути",
          _width: "ширина",
        },
        vi: { _Advanced: "Nâng cao" },
        "zh-cn": {
          _Advanced: "高级",
          "_Blue Tint": "蓝色色调",
          _Clamp: "裁剪",
          _Closest: "最近邻",
          _Color: "颜色",
          _Cubemaps: "立方体贴图",
          "_Custom Shaders": "自定义着色器",
          "_Erase Depth": "擦除深度",
          _Extras: "更多",
          "_Green Tint": "绿色色调",
          _Height: "高",
          _Images: "图片",
          _Linear: "线性",
          "_List Based Rendering": "基于列表的渲染",
          _Mirrored: "镜像",
          "_Pen Properties": "画笔属性",
          "_Pen+ Costumes": "画笔+ 造型",
          "_Pen+ V7": "画笔+ V7",
          "_Pen+ version": "画笔+ 版本",
          "_Red Tint": "红色色调",
          "_Render Textures": "渲染纹理",
          _Repeat: "重复",
          _Rotation: "旋转",
          "_Shader Editor": "着色器编辑器",
          "_Shader Manager": "着色器管理",
          "_Square Pen Blocks": "方形画笔",
          _Transparency: "透明度",
          "_Triangle Blocks": "三角形绘制",
          "_U value": "U值",
          "_U-Multiplier": "U乘数",
          "_U-Offset": "U偏移",
          "_V value": "V值",
          "_V-Multiplier": "V乘数",
          "_V-Offset": "V偏移",
          _Width: "宽",
          "_add blank image that is [color] and the size of [width], [height] named [name] to Pen+ Library":
            "将大小[width],[height]颜色[color]的空图片命名为[name]加入“画笔+”库",
          "_add image named [name] from [dataURI] to Pen+ Library":
            "将图片[dataURI]命名为[name]加入“画笔+”库",
          "_allow 'Corner Pinch < 1'": "允许'Corner Pinch < 1'",
          "_blue tint": "蓝色色调",
          _brightness: "亮度",
          "_clamp depth value": "裁剪深度值",
          "_clear pen from [name]": "从[name]清空画笔",
          "_clock-wise": "顺时针",
          _color: "颜色",
          "_corner pinch": "拐角收缩",
          "_counter clock-wise": "逆时针",
          "_create cubemap named [name] from left [left] right [right] back [back] front [front] bottom [bottom] top [top]":
            "创建名为[name]的立方体贴图，上[top]下[bottom]左[left]右[right]前[front]后[back]",
          "_create render texture named [name]": "创建名为[name]的渲染纹理",
          "_create render texture named [name] of size [width] [height]":
            "创建名为[name]大小[width][height]的渲染纹理",
          "_data uri of pen layer": "画笔层的数据uri",
          "_define solid tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3]":
            "定义实心三角形 [x1] [y1] [c1], [x2] [y2] [c2], [x3] [y3] [c3]",
          "_define textured tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3] with the uv's [u1] [v1], [u2] [v2] and [u3] [v3]":
            "定义纹理三角形 [x1] [y1] [c1], [x2] [y2] [c2], [x3] [y3] [c3]纹理坐标 [u1] [v1], [u2] [v2], [u3] [v3]",
          "_depth value": "深度值",
          "_does [name] exist as a cubemap": "存在立方体贴图[name]",
          "_does [name] exist in Pen+ Library": "“画笔+”库中存在[name]",
          "_does render texture named [name] exist?": "存在名为[name]的渲染纹理？",
          "_draw dot at [x] [y]": "在[x][y]画点",
          "_draw line from [x1] [y1] to [x2] [y2]": "绘制从[x1][y1]到[x2][y2]的线段",
          "_draw shader triangles from list [list] using [shader]":
            "根据列表[list]使用着色器[shader]绘制三角形",
          "_draw solid triangles from list [list]": "根据列表[list]绘制实心三角形",
          "_draw square using [shader]": "使用[shader]绘制方块",
          "_draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]":
            "以材质[tex]绘制三角形于[x1][y1],[x2][y2],[x3][y3]",
          "_draw textured triangles from list [list] using [tex]":
            "根据列表[list]使用纹理[tex]绘制三角形",
          "_draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "绘制三角形于[x1][y1],[x2][y2],[x3][y3]",
          "_draw triangle using [shader] between [x1] [y1], [x2] [y2] and [x3] [y3]":
            "使用[shader]绘制三角形于 [x1] [y1], [x2] [y2],[x3] [y3]",
          "_get data uri for costume [costume]": "获取造型[costume]的数据uri",
          "_get data uri of [costume] in the pen+ costume library":
            "获取“画笔+”造型库中[costume]的数据uri",
          "_get item [item]'s [component] value in vector 2 array [uniformName] in [shader]":
            "[shader]中的2维向量数组[uniformName]的第[item]项的[component]",
          "_get item [item]'s [component] value in vector 3 array [uniformName] in [shader]":
            "[shader]中的3维向量数组[uniformName]的第[item]项的[component]",
          "_get item [item]'s [component] value in vector 4 array [uniformName] in [shader]":
            "[shader]中的4维向量数组[uniformName]的第[item]项的[component]",
          "_get item [item]'s value in number array [uniformName] in [shader]":
            "[shader]中的数字数组[uniformName]的第[item]项",
          "_get pen square's [target]": "获取方形画笔的[target]",
          "_get pixel [x] [y]'s color in [costume]": "[costume]中像素[x][y]的颜色",
          "_get the [dimension] of [costume] in pen+ costume library":
            "获取“画笔+”造型库中[costume]的[dimension]",
          "_get the cubemap of [uniformName] in [shader]":
            "[shader]中的立方体贴图[uniformName]",
          "_get the texture of [uniformName] in [shader]":
            "[shader]中的纹理[uniformName]",
          "_get triangle point [point]'s [attribute]":
            "获取三角形点[point]的[attribute]",
          "_get value of [component] in vector 2 [uniformName] in [shader]":
            "[shader]中的2维向量[uniformName]的[component]",
          "_get value of [component] in vector 3 [uniformName] in [shader]":
            "[shader]中的3维向量[uniformName]的[component]",
          "_get value of [component] in vector 4 [uniformName] in [shader]":
            "[shader]中的4维向量[uniformName]的[component]",
          "_get value of matrix [uniformName] in [shader] as an array":
            "[shader]中的矩阵[uniformName]",
          "_get value of number [uniformName] in [shader]":
            "[shader]中的数字[uniformName]值",
          "_green tint": "绿色色调",
          _height: "高度",
          "_hex code": "hex代码",
          "_hide triangles that turn [direction]":
            "隐藏旋转方向为[direction]的三角形",
          "_hue [H] saturation [S] value [V]": "色调[H]饱和度[S]亮度[V]",
          "_maximum depth value": "最大深度值",
          "_neither way": "不旋转",
          _off: "关闭",
          _on: "打开",
          "_pen [HSV]": "画笔[HSV]",
          "_pen is down?": "画笔落下？",
          "_red [R] green [G] blue [B]": "红[R]绿[G]蓝[B]",
          "_red tint": "红色色调",
          "_remove cubemap named [name]": "移除名为[name]的立方体贴图",
          "_remove image named [name] from Pen+ Library":
            "从“画笔+”库中移除名为[name]的图片",
          "_remove render texture named [name]": "移除名为[name]的渲染纹理",
          "_render textures": "所有渲染纹理",
          "_render tris and squares to [name]": "渲染三角形和方块到[name]",
          "_reset square Attributes": "重置方形画笔属性",
          "_reset triangle attributes": "重置三角形属性",
          _saturation: "饱和度",
          "_set [setting] to [value]": "设置[setting]为[value]",
          "_set cubemap [uniformName] in [shader] to [cubemap]":
            "将[shader]中的立方体贴图[uniformName]设为[cubemap]",
          "_set imported image wrap mode to [clampMode]":
            "设置导入图片的环绕模式为[clampMode]",
          "_set item [item] in number array [uniformName] in [shader] to [number]":
            "将[shader]中的数字数组[uniformName]的第[item]项设为[number]",
          "_set item [item] in vector 2 array [uniformName] in [shader] to [numberX] [numberY]":
            "将[shader]中的2维向量数组[uniformName]的第[item]项设为[numberX][numberY]",
          "_set item [item] in vector 3 array [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "将[shader]中的3维向量数组[uniformName]的第[item]项设为[numberX][numberY][numberZ]",
          "_set item [item] in vector 4 array [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "将[shader]中的4维向量数组[uniformName]的第[item]项设为[numberX][numberY][numberZ][numberW]",
          "_set matrix [uniformName] in [shader] to [array]":
            "将[shader]中的矩阵[uniformName]设为[array]",
          "_set matrix [uniformName] in [shader] to [list]":
            "将[shader]中的矩阵[uniformName]设为[list]",
          "_set number [uniformName] in [shader] to [number]":
            "将[shader]中的数字[uniformName]设为[number]",
          "_set number attribute [attributeName] of point [pointID] in [shader] to [number]":
            "将[shader]的点[pointID]的数字属性[attributeName]设为[number]",
          "_set pen square's [target] to [number]":
            "将方形画笔的[target]设为[number]",
          "_set pixel [x] [y]'s color to [color] in [costume]":
            "将造型[costume]中像素[x][y]的颜色设为[color]",
          "_set texture [uniformName] in [shader] to [texture]":
            "将[shader]中的纹理[uniformName]设为[texture]",
          "_set texture filter mode to [filter]": "设置纹理过滤模式为[filter]",
          "_set the [attribute] of point [id] to [value] in [def]":
            "将[def]中的点[id]的[attribute]设为[value]",
          "_set the prefix for [prefix] to [value]": "设置[prefix]的前缀为[value]",
          "_set triangle point [point]'s [attribute] to [value]":
            "设置三角形点[point]的[attribute]为[value]",
          "_set triangle's [wholeAttribute] to [value]":
            "设置三角形的[wholeAttribute]为[value]",
          "_set vector 2 [uniformName] in [shader] to [numberX] [numberY]":
            "将[shader]中的2维向量[uniformName]设[numberX][numberY]",
          "_set vector 2 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY]":
            "将[shader]的点[pointID]的2维向量属性[attributeName]设为[numberX][numberY]",
          "_set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]":
            "将[shader]中的3维向量[uniformName]设[numberX][numberY][numberZ]",
          "_set vector 3 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ]":
            "将[shader]的点[pointID]的3维向量属性[attributeName]设为[numberX][numberY][numberZ]",
          "_set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "将[shader]中的4维向量[uniformName]设[numberX][numberY][numberZ][numberW]",
          "_set vector 4 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ] [numberW]":
            "将[shader]的点[pointID]的4维向量属性[attributeName]设为[numberX][numberY][numberZ][numberW]",
          "_shaders in project": "作品中的着色器",
          _size: "大小",
          "_stamp [sprite]": "图章[sprite]",
          "_stamp pen square": "打印方形画笔",
          "_stamp pen square with the texture of [tex]": "以[tex]的材质打印方形画笔",
          "_tint pen square to [color]": "将方形画笔染色[color]",
          "_tint triangle point [point] to [color]": "将三角形点[point]染色为[color]",
          "_tint triangle to [color]": "将三角形染色[color]",
          _transparency: "透明度",
          "_triangles drawn": "绘制的三角形数量",
          "_turn advanced setting [Setting] [onOrOff]": "高级设置[Setting][onOrOff]",
          _width: "宽度",
        },
        "zh-tw": { _Advanced: "個別更改" },
      });
      /* end generated l10n code */ 
  
    if (!Scratch.extensions.unsandboxed) {
      //for those who use the version from pen-group's site
      alert("Pen+ must be ran unsandboxed!");
      throw new Error("Pen+ must run unsandboxed");
    }
  
    //?some smaller optimizations just store the multiplacation for later
    const d2r = 0.0174533;
  
    //?Declare most of the main repo's we are going to use around the scratch vm
    const vm = Scratch.vm;
    const runtime = vm.runtime;
    const renderer = runtime.renderer;
    const twgl = renderer.exports.twgl;
  
    const canvas = renderer.canvas;
    const gl = renderer._gl;
    let currentFilter = gl.NEAREST;
  
    let nativeSize = renderer.useHighQualityRender
      ? [canvas.width, canvas.height]
      : renderer._nativeSize;
  
    //?create the depth buffer's texture
    const triBufferAttachments = [
      {
        format: gl.RGBA,
        type: gl.UNSIGNED_BYTE,
        min: gl.LINEAR,
        wrap: gl.CLAMP_TO_EDGE,
        premultiplyAlpha: true,
      },
      { format: gl.DEPTH_STENCIL },
    ];
    const triBufferInfo = twgl.createFramebufferInfo(gl, triBufferAttachments);
  
    let lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  
    //?Neato uniform for universally transforming triangles to fit the screen
    let transform_Matrix = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
    //?Buffer handling and pen loading
    {
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
  
      const updateCanvasSize = () => {
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
  
        transform_Matrix[0] = 2 / renderer._nativeSize[0];
        transform_Matrix[1] = -2 / renderer._nativeSize[1];
        let lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        twgl.resizeFramebufferInfo(
          gl,
          triBufferInfo,
          triBufferAttachments,
          Scratch.Cast.toNumber(nativeSize[0]),
          Scratch.Cast.toNumber(nativeSize[1])
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
      };
  
      //?Call it to have it consistant
      updateCanvasSize();
  
      //?Call every frame because I don't know of a way to detect when the stage is resized through window resizing (2/7/24) thought I should clarify
  
      window.addEventListener("resize", updateCanvasSize);
      canvas.addEventListener("resize", updateCanvasSize);
      vm.runtime.on("STAGE_SIZE_CHANGED", () => {
        updateCanvasSize();
      });
  
      let lastCanvasSize = [canvas.clientWidth, canvas.clientHeight];
      vm.runtime.on("BEFORE_EXECUTE", () => {
        if (
          lastCanvasSize[0] != canvas.clientWidth ||
          lastCanvasSize[1] != canvas.clientHeight
        ) {
          lastCanvasSize = [canvas.clientWidth, canvas.clientHeight];
          updateCanvasSize();
        }
      });
  
      //?Make sure pen is loaded!
      if (!Scratch.vm.extensionManager.isExtensionLoaded("pen")) {
        runtime.extensionManager.loadExtensionIdSync("pen");
      }
    }
  
    const checkForPen = (util) => {
      const curTarget = util.target;
      const customState = curTarget["_customState"];
      if (!customState["Scratch.pen"]) {
        customState["Scratch.pen"] = {
          penDown: false,
          color: 66.66,
          saturation: 100,
          brightness: 100,
          transparency: 0,
          _shade: 50,
          penAttributes: {
            color4f: [0, 0, 1, 1],
            diameter: 1,
          },
        };
      }
    };
  
    //?Get Shaders
    const penPlusShaders = {
      untextured: {
        Shaders: {
          vert: `
                        attribute highp vec4 a_position;
                        attribute highp vec4 a_color;
                        varying highp vec4 v_color;
    
                        uniform highp mat4 u_transform;
    
                        highp vec4 rotation(highp vec4 invec4) {
                          return vec4(
                            (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],
                            (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],
                            invec4.zw
                          );
                        }
    
                        void main()
                        {
                            v_color = a_color;
                            gl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],1,1) - vec4(0,0,1,0);
                        }
                    `,
          frag: `
                        varying highp vec4 v_color;
    
                        void main()
                        {
                          gl_FragColor = v_color;
                          gl_FragColor.rgb *= gl_FragColor.a;
                          if (gl_FragColor.a == 0.0) {
                            discard;
                          }
                        }
                    `,
        },
        ProgramInf: null,
      },
      textured: {
        Shaders: {
          vert: `
                        attribute highp vec4 a_position;
                        attribute highp vec4 a_color;
                        attribute highp vec2 a_texCoord;
    
                        varying highp vec4 v_color;
                        varying highp vec2 v_texCoord;
    
                        uniform highp mat4 u_transform;
    
                        highp vec4 rotation(highp vec4 invec4) {
                          return vec4(
                            (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],
                            (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],
                            invec4.zw
                          );
                        }
    
                        void main()
                        {
                            v_color = a_color;
                            v_texCoord = a_texCoord;
                            gl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],1,1) - vec4(0,0,1,0);
                        }
                    `,
          frag: `
                        uniform sampler2D u_texture;
    
                        varying highp vec2 v_texCoord;
                        varying highp vec4 v_color;
    
                        void main()
                        {
                            gl_FragColor = texture2D(u_texture, mod(v_texCoord,1.0)) * v_color;
                            gl_FragColor.rgb *= gl_FragColor.a;
                            if (gl_FragColor.a == 0.0) {
                              discard;
                            }
                        }
                    `,
        },
        ProgramInf: null,
      },
      draw: {
        Shaders: {
          vert: `
                        attribute highp vec4 a_position;
    
                        varying highp vec2 v_texCoord;
                        attribute highp vec2 a_texCoord;
    
                        void main()
                        {
                            gl_Position = a_position * vec4(a_position.w,a_position.w,0,1);
                            v_texCoord = (a_position.xy / 2.0) + vec2(0.5,0.5);
                        }
                    `,
          frag: `
                        varying highp vec2 v_texCoord;
    
                        uniform sampler2D u_drawTex;
    
                        void main()
                        {
                          gl_FragColor = texture2D(u_drawTex, v_texCoord);
                          gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + 1e-3), 0.0, 1.0);
                        }
                    `,
        },
        ProgramInf: null,
      },
      createAndCompileShaders: (vert, frag) => {
        //? compile vertex Shader
        const vertShader = gl.createShader(gl.VERTEX_SHADER);
        try {
          gl.shaderSource(vertShader, vert.trim());
          gl.compileShader(vertShader);
          if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(vertShader);
          }
        } catch (error) {
          console.error(error);
        }
  
        //? compile fragment Shader
        const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        try {
          gl.shaderSource(fragShader, frag.trim());
          gl.compileShader(fragShader);
          if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(fragShader);
          }
        } catch (error) {
          console.error(error);
        }
  
        //? compile program
        const program = gl.createProgram();
        try {
          gl.attachShader(program, vertShader);
          gl.attachShader(program, fragShader);
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(program);
          }
  
          gl.validateProgram(program);
          if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            throw gl.getProgramInfoLog(program);
          }
        } catch (error) {
          console.error(error);
        }
  
        return {
          program: program,
          vert: vertShader,
          frag: fragShader,
        };
      },
    };
  
    //Used for the popup animation
    const animationKeyframes = {
      open: {
        IFRAME: [{ top: "100%", easing: "ease-out" }, { top: "10%" }],
        BG: [
          { filter: "opacity(0%)", easing: "ease-out" },
          { filter: "opacity(100%)" },
        ],
      },
      close: {
        IFRAME: [{ top: "10%", easing: "ease-in" }, { top: "-100%" }],
        BG: [
          { filter: "opacity(100%)", easing: "ease-in" },
          { filter: "opacity(0%)" },
        ],
      },
    };
  
    //? Create program info
    {
      penPlusShaders.untextured.ProgramInf = twgl.createProgramInfo(gl, [
        penPlusShaders.untextured.Shaders.vert,
        penPlusShaders.untextured.Shaders.frag,
      ]);
      penPlusShaders.textured.ProgramInf = twgl.createProgramInfo(gl, [
        penPlusShaders.textured.Shaders.vert,
        penPlusShaders.textured.Shaders.frag,
      ]);
  
      //Only used on the draw buffer! for when stuff is drawn to the canvas!
      penPlusShaders.draw.ProgramInf = twgl.createProgramInfo(gl, [
        penPlusShaders.draw.Shaders.vert,
        penPlusShaders.draw.Shaders.frag,
      ]);
    }
  
    let bufferInfo = twgl.createBufferInfoFromArrays(gl, {
      a_color: { numComponents: 4, data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
      a_position: {
        numComponents: 4,
        data: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
      },
      a_texCoord: { numComponents: 2, data: [0, 0, 1, 0, 1, 1] },
    });
  
    //Just for our eyes sakes
    // prettier-ignore
    let reRenderInfo = twgl.createBufferInfoFromArrays(gl, {
        a_position: {
          numComponents: 4, data: [
            -1, -1, 0, 1,
            1, -1, 0, 1,
            1, 1, 0, 1,
            -1, -1, 0, 1,
            1, 1, 0, 1,
            -1, 1, 0, 1
          ]
        },
        a_texCoord: {
          numComponents: 2, data: [
            0, 1,
            0, 0,
            1, 0,
            0, 1,
            0, 0,
            1, 0
          ]
        }
      });
  
    twgl.setBuffersAndAttributes(
      gl,
      penPlusShaders.draw.ProgramInf,
      reRenderInfo
    );
  
    let parentExtension = null;
  
    //?Override pen Clear with pen+
    renderer.penClear = (penSkinID) => {
      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      //Pen+ Overrides default pen Clearing
      gl.bindFramebuffer(gl.FRAMEBUFFER, triBufferInfo.framebuffer);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  
      gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
      gl.clearColor(
        renderer._backgroundColor4f[0],
        renderer._backgroundColor4f[1],
        renderer._backgroundColor4f[2],
        renderer._backgroundColor4f[3]
      );
  
      //Old clearing
      renderer.dirty = true;
      const skin = /** @type {PenSkin} */ renderer._allSkins[penSkinID];
      skin.clear();
    };
  
    class extension {
      /* EXTENSION SETTINGS */
  
      //?Shader editor settings
      //?These are used when initilizing the shader editor!
      isExperimental = false;
      urlHandleTypes = {
        //github... we handle github differently.
        github: {
          handle: (url) => {
            //Remember github uses the [username].github.io/[reponame];
            let githubURL = url.split("/");
            return githubURL.length > 4
              ? url.split("/")[3]
              : url.split("/")[2].split(".")[0];
          },
        },
        //those .app domains
        vercel: {
          handle: 0,
        },
        netlify: {
          handle: 0,
        },
        web: {
          handle: 0,
        },
        js: {
          handle: 0,
        },
      };
  
      extensionVersion = "7.1.8";
  
      //?Stores our attributes
      triangleAttributesOfAllSprites = {};
      squareAttributesOfAllSprites = {};
  
      penPlusCostumeLibrary = {};
      penPlusCubemap = {};
  
      listCache = {};
  
      attributeEditors = {
        triangle: (targetId, attribute, value, wholeTri, offset) => {
          offset = offset + attribute || attribute;
          let valuetoSet = 0;
          switch (attribute) {
            //U
            case 0:
              valuetoSet = value;
              break;
            //V
            case 1:
              valuetoSet = value;
              break;
  
            //100 since that is what scratch users are accustomed to.
            //R
            case 2:
              valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
              break;
            //G
            case 3:
              valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
              break;
            //B
            case 4:
              valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
              break;
  
            //Clamp to 0 so we can't go behind the stage.
            //Z
            case 5:
              if (this.AdvancedSettings._ClampZ) {
                if (value < 0) {
                  valuetoSet = 0;
                  break;
                }
                //convert to depth space for best accuracy
                valuetoSet = value;
                break;
              }
              //convert to depth space for best accuracy
              valuetoSet = value;
              break;
  
            //Clamp to 1 so we don't accidentally clip.
            //W
            case 6:
              if (this.AdvancedSettings.wValueUnderFlow == true) {
                valuetoSet = value;
              } else {
                valuetoSet = Math.max(value, 1);
              }
              break;
            //Transparency
            //Same story as color
            case 7:
              valuetoSet = Math.min(Math.max(value, 0), 1000) * 0.01;
              break;
  
            //Just break if value isn't valid
            default:
              break;
          }
          //Check if the index even exists.
          if (attribute >= 0 && attribute <= 7) {
            if (wholeTri) {
              this.triangleAttributesOfAllSprites[targetId][attribute] =
                valuetoSet;
              this.triangleAttributesOfAllSprites[targetId][attribute + 8] =
                valuetoSet;
              this.triangleAttributesOfAllSprites[targetId][attribute + 16] =
                valuetoSet;
            } else {
              this.triangleAttributesOfAllSprites[targetId][offset] = valuetoSet;
            }
          }
        },
      };
  
      //?Our functions that allow for extra rendering things.
      renderFunctions = {
        drawTri: (x1, y1, x2, y2, x3, y3, penColor, targetID) => {
          // prettier-ignore
          if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
          this.trianglesDrawn += 1;
          //? get triangle attributes for current sprite.
          const triAttribs = this.triangleAttributesOfAllSprites[targetID];
  
          let inputInfo = {};
  
          if (triAttribs) {
            //Just for our eyes sakes
            // prettier-ignore
            inputInfo = {
                a_position: new Float32Array([
                  x1, y1, triAttribs[5], triAttribs[6],
                  x2, y2, triAttribs[13], triAttribs[14],
                  x3, y3, triAttribs[21], triAttribs[22]
                ]),
                a_color: new Float32Array([
                  penColor[0] * triAttribs[2], penColor[1] * triAttribs[3], penColor[2] * triAttribs[4], penColor[3] * triAttribs[7],
                  penColor[0] * triAttribs[10], penColor[1] * triAttribs[11], penColor[2] * triAttribs[12], penColor[3] * triAttribs[15],
                  penColor[0] * triAttribs[18], penColor[1] * triAttribs[19], penColor[2] * triAttribs[20], penColor[3] * triAttribs[23]
                ])
              };
          } else {
            //Just for our eyes sakes
            // prettier-ignore
            inputInfo = {
                a_position: new Float32Array([
                  x1, y1, 1, 1,
                  x2, y2, 1, 1,
                  x3, y3, 1, 1
                ]),
                a_color: new Float32Array([
                  penColor[0], penColor[1], penColor[2], penColor[3],
                  penColor[0], penColor[1], penColor[2], penColor[3],
                  penColor[0], penColor[1], penColor[2], penColor[3]
                ])
              };
          }
  
          bufferInfo.numElements = 3;
  
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_position, gl.DYNAMIC_DRAW);
  
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_color, gl.DYNAMIC_DRAW);
  
          //? Bind Positional Data
          twgl.setBuffersAndAttributes(
            gl,
            penPlusShaders.untextured.ProgramInf,
            bufferInfo
          );
          gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
          gl.useProgram(penPlusShaders.untextured.ProgramInf.program);
  
          twgl.setUniforms(penPlusShaders.untextured.ProgramInf, {
            u_transform: transform_Matrix,
          });
          twgl.drawBufferInfo(gl, bufferInfo);
        },
  
        drawTextTri: (x1, y1, x2, y2, x3, y3, targetID, texture) => {
          // prettier-ignore
          if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
          this.trianglesDrawn += 1;
  
          //? get triangle attributes for current sprite.
          const triAttribs = this.triangleAttributesOfAllSprites[targetID];
  
          let inputInfo = {};
  
          if (triAttribs) {
            //Just for our eyes sakes
            // prettier-ignore
            inputInfo = {
                a_position: new Float32Array([
                  x1, y1, triAttribs[5], triAttribs[6],
                  x2, y2, triAttribs[13], triAttribs[14],
                  x3, y3, triAttribs[21], triAttribs[22]
                ]),
                a_color: new Float32Array([
                  triAttribs[2], triAttribs[3], triAttribs[4], triAttribs[7],
                  triAttribs[10], triAttribs[11], triAttribs[12], triAttribs[15],
                  triAttribs[18], triAttribs[19], triAttribs[20], triAttribs[23]
                ]),
                a_texCoord: new Float32Array([
                  triAttribs[0], triAttribs[1],
                  triAttribs[8], triAttribs[9],
                  triAttribs[16], triAttribs[17]
                ])
              };
          } else {
            //Just for our eyes sakes
            // prettier-ignore
            inputInfo = {
                a_position: new Float32Array([
                  x1, y1, 1, 1,
                  x2, y2, 1, 1,
                  x3, y3, 1, 1
                ]),
                a_color: new Float32Array([
                  1, 1, 1, 1,
                  1, 1, 1, 1,
                  1, 1, 1, 1
                ]),
                a_texCoord: new Float32Array([
                  0, 0,
                  0, 1,
                  1, 1
                ])
              };
          }
  
          bufferInfo.numElements = 3;
  
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_position, gl.DYNAMIC_DRAW);
  
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_color, gl.DYNAMIC_DRAW);
  
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texCoord.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_texCoord, gl.DYNAMIC_DRAW);
  
          gl.useProgram(penPlusShaders.textured.ProgramInf.program);
  
          //? Bind Positional Data
          twgl.setBuffersAndAttributes(
            gl,
            penPlusShaders.textured.ProgramInf,
            bufferInfo
          );
  
          gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
          twgl.setUniforms(penPlusShaders.textured.ProgramInf, {
            u_texture: texture,
            u_transform: transform_Matrix,
          });
  
          twgl.drawBufferInfo(gl, bufferInfo);
        },
  
        //? this is so I don't have to go through the hassle of replacing default scratch shaders
        //? many of curse words where exchanged between me and a pillow while writing this extension
        //? but I have previaled!
        reRenderPenLayer: () => {
          gl.useProgram(penPlusShaders.draw.ProgramInf.program);
  
          twgl.setBuffersAndAttributes(
            gl,
            penPlusShaders.draw.ProgramInf,
            reRenderInfo
          );
  
          twgl.setUniforms(penPlusShaders.draw.ProgramInf, {
            u_drawTex: triBufferInfo.attachments[0],
          });
  
          twgl.drawBufferInfo(gl, reRenderInfo);
        },
      };
  
      //?The Draw region! extra cool!
      penPlusDrawRegion = {
        enter: () => {
          if (this.culling) {
            gl.enable(gl.CULL_FACE);
          }
          this.trianglesDrawn = 0;
          this.inDrawRegion = true;
          if (this.currentRenderTexture != triBufferInfo) {
            if (
              this.currentRenderTexture.resizing &&
              (this.currentRenderTexture.width != nativeSize[0] ||
                this.currentRenderTexture.height != nativeSize[1])
            ) {
              twgl.resizeFramebufferInfo(
                gl,
                this.currentRenderTexture,
                triBufferAttachments,
                Scratch.Cast.toNumber(nativeSize[0]),
                Scratch.Cast.toNumber(nativeSize[1])
              );
              transform_Matrix[0] = 2 / renderer._nativeSize[0];
              transform_Matrix[1] = -2 / renderer._nativeSize[1];
            } else {
              transform_Matrix[0] = 2 / this.currentRenderTexture.width;
              transform_Matrix[1] = -2 / this.currentRenderTexture.height;
            }
            //Resize our variables to be viewport accurate
            gl.viewport(
              0,
              0,
              this.currentRenderTexture.width,
              this.currentRenderTexture.height
            );
          } else {
            gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
            transform_Matrix[0] = 2 / renderer._nativeSize[0];
            transform_Matrix[1] = -2 / renderer._nativeSize[1];
          }
          gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            this.currentRenderTexture.framebuffer
          );
          renderer.dirty = true;
        },
        exit: () => {
          if (this.culling) {
            gl.disable(gl.CULL_FACE);
          }
          this.inDrawRegion = false;
          gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            renderer._allSkins[renderer._penSkinId]._framebuffer.framebuffer
          );
  
          this.renderFunctions.reRenderPenLayer();
  
          //Quick clear the pen+ frame buffer
          gl.clearColor(0, 0, 0, 0);
          gl.bindFramebuffer(gl.FRAMEBUFFER, triBufferInfo.framebuffer);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.clearColor(
            renderer._backgroundColor4f[0],
            renderer._backgroundColor4f[1],
            renderer._backgroundColor4f[2],
            renderer._backgroundColor4f[3]
          );
  
          /*gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);
    
            gl.bindFramebuffer(
              gl.FRAMEBUFFER,
              renderer._allSkins[renderer._penSkinId]._framebuffer.framebuffer
            );
    
            gl.useProgram(penPlusShaders.pen.program);*/
        },
      };
  
      //?The neat color library I made
      colorLib = {
        hexToRgb: (hex) => {
          if (typeof hex == "string") {
            const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
              hex
            );
            return {
              r: parseInt(splitHex[1], 16),
              g: parseInt(splitHex[2], 16),
              b: parseInt(splitHex[3], 16),
            };
          }
          hex = Scratch.Cast.toNumber(hex);
          return {
            r: Math.floor(hex / 65536),
            g: Math.floor(hex / 256) % 256,
            b: hex % 256,
          };
        },
  
        rgbtoSColor: ({ R, G, B }) => {
          R = Math.min(Math.max(R, 0), 100) * 2.55;
          G = Math.min(Math.max(G, 0), 100) * 2.55;
          B = Math.min(Math.max(B, 0), 100) * 2.55;
          return (Math.ceil(R) * 256 + Math.ceil(G)) * 256 + Math.ceil(B);
        },
      };
  
      //?Just some advanced settings
      AdvancedSettings = {
        wValueUnderFlow: false,
        useDepthBuffer: true,
        _ClampZ: false,
        _maxDepth: 1000,
      };
  
      textureFunctions = {
        createBlankPenPlusTextureInfo: function (width, height, color, name) {
          const texture = parentExtension.penPlusCostumeLibrary[name]
            ? parentExtension.penPlusCostumeLibrary[name].texture
            : gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          // Fill the texture with a 1x1 blue pixel.
  
          const pixelData = new Uint8Array(width * height * 4);
  
          const decodedColor = Scratch.Cast.toRgbColorObject(color);
  
          for (let pixelID = 0; pixelID < pixelData.length / 4; pixelID++) {
            pixelData[pixelID * 4] = decodedColor.r;
            pixelData[pixelID * 4 + 1] = decodedColor.g;
            pixelData[pixelID * 4 + 2] = decodedColor.b;
            pixelData[pixelID * 4 + 3] = 255;
          }
  
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixelData
          );
  
          parentExtension.penPlusCostumeLibrary[name] = {
            texture: texture,
            width: width,
            height: height,
          };
        },
        createPenPlusTextureInfo: function (url, name) {
          const texture = parentExtension.penPlusCostumeLibrary[name]
            ? parentExtension.penPlusCostumeLibrary[name].texture
            : gl.createTexture();
  
          gl.bindTexture(gl.TEXTURE_2D, texture);
          // Fill the texture with a 1x1 blue pixel.
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255])
          );
  
          // Let's assume all images are not a power of 2
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          return new Promise((resolve, reject) => {
            Scratch.canFetch(url).then((allowed) => {
              if (!allowed) {
                reject(false);
                return;
              }
              // Permission is checked earlier.
              // eslint-disable-next-line no-restricted-syntax
              const image = new Image();
              image.onload = function () {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(
                  gl.TEXTURE_2D,
                  0,
                  gl.RGBA,
                  gl.RGBA,
                  gl.UNSIGNED_BYTE,
                  image
                );
                parentExtension.penPlusCostumeLibrary[name] = {
                  texture: texture,
                  width: image.width,
                  height: image.height,
                };
                resolve(texture);
              };
              image.crossOrigin = "anonymous";
              image.src = url;
            });
          });
        },
  
        getTextureData: (texture, width, height) => {
          //?Initilize the temp framebuffer and assign it
          const readBuffer = gl.createFramebuffer();
  
          lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  
          gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer);
  
          gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
          );
  
          //?make sure to unbind the framebuffer and delete it!
          const removeBuffer = () => {
            gl.deleteFramebuffer(readBuffer);
          };
  
          //?if sucessful read
          if (
            gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE
          ) {
            //?Make an array to write the pixels onto
            let dataArray = new Uint8Array(width * height * 4);
            gl.readPixels(
              0,
              0,
              width,
              height,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              dataArray
            );
  
            //?Remove Buffer data and return data
            removeBuffer();
            return dataArray;
          }
  
          //?If not return undefined
          removeBuffer();
          return undefined;
        },
  
        getTextureAsURI: (texture, width, height) => {
          //?Initilize the temp framebuffer and assign it
          const readBuffer = gl.createFramebuffer();
  
          lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  
          gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer);
  
          gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
          );
  
          //?make sure to unbind the framebuffer and delete it!
          const removeBuffer = () => {
            gl.deleteFramebuffer(readBuffer);
          };
  
          //?if sucessful read
          if (
            gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE
          ) {
            //?Make an array to write the pixels onto
            let dataArray = new Uint8Array(width * height * 4);
            gl.readPixels(
              0,
              0,
              width,
              height,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              dataArray
            );
  
            //Make an invisible canvas
            const dataURICanvas = document.createElement("canvas");
            dataURICanvas.width = width;
            dataURICanvas.height = height;
            const dataURIContext = dataURICanvas.getContext("2d");
  
            // Copy the pixels to a 2D canvas
            const imageData = dataURIContext.createImageData(width, height);
            imageData.data.set(dataArray);
            dataURIContext.putImageData(imageData, 0, 0);
  
            //?Remove Buffer data and return data
            removeBuffer();
            return dataURICanvas.toDataURL();
          }
  
          //?If not return undefined
          removeBuffer();
          return undefined;
        },
      };
  
      events = {
        shaderSaved: [],
        editorClosed: [],
      };
  
      //Statistical Stuff
      trianglesDrawn = 0;
      inDrawRegion = false;
  
      IFrame = undefined;
  
      culling = false;
      cullMode = 0;
  
      shaders = Object.create(null);
      programs = Object.create(null);
  
      prefixes = {
        penPlusTextures: "",
        renderTextures: "",
      };
  
      addonTextureFunctions = [];
  
      renderTextures = Object.create(null);
      currentRenderTexture = triBufferInfo;
  
      blockIcons = {
        undo: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS40NDU0NCIgaGVpZ2h0PSIxMC42MzM1MSIgdmlld0JveD0iMCwwLDE5LjQ0NTQ0LDEwLjYzMzUxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMxLjE1NDU0LC0xNzMuNTc1OTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjMyLjIxNTIsMTc0LjMxYzAuNjM2NCwtMC4yMTIxMyAxLjM0MzUsLTAuMDcwNzEgMS43Njc3NywwLjM1MzU1bDEuMTMxMzcsMS4xMzEzN2MwLjk4OTk1LC0wLjg0ODUzIDIuMTIxMzIsLTEuNDE0MjEgMy4zMjM0LC0xLjc2Nzc3YzEuODM4NDgsLTAuNTY1NjkgMy44ODkwOSwtMC42MzY0IDUuNzk4MjgsMGMxLjgzODQ4LDAuNTY1NjkgMy4zOTQxMSwxLjY5NzA2IDQuNTI1NDgsMy4yNTI2OWMxLjA2MDY2LDEuNDg0OTIgMS42OTcwNiwzLjI1MjY5IDEuODM4NDgsNS4wOTExN2MwLDAuOTg5OTUgLTAuODQ4NTMsMS44Mzg0OCAtMS44Mzg0OCwxLjgzODQ4Yy0wLjg0ODUzLDAgLTEuNjI2MzUsLTAuNjM2NCAtMS43Njc3NywtMS40ODQ5MmwtMC4wNzA3MSwtMC4wNzA3MWMtMC4yMTIxMywtMS4wNjA2NiAtMC43MDcxMSwtMS45Nzk5IC0xLjQxNDIxLC0yLjY4NzAxYy0wLjcwNzExLC0wLjcwNzExIC0xLjU1NTYzLC0xLjEzMTM3IC0yLjU0NTU4LC0xLjI3Mjc5Yy0xLjM0MzUsLTAuMjEyMTMgLTIuNzU3NzIsMC4yMTIxMyAtMy43NDc2NywxLjIwMjA4bDEuMDYwNjYsMS4wNjA2NmMwLjYzNjQsMC42MzY0IDAuNzA3MTEsMS42OTcwNiAwLDIuNDA0MTZjLTAuMjgyODQsMC4yODI4NCAtMC43Nzc4MiwwLjQ5NDk3IC0xLjIwMjA4LDAuNDk0OTdsLTYuMjIyNTQsMGMtMC45MTkyNCwtMC4wNzA3MSAtMS42MjYzNSwtMC43Nzc4MiAtMS42OTcwNiwtMS42OTcwNmwwLC02LjM2Mzk2YzAsLTAuNzA3MTEgMC40MjQyNiwtMS4yNzI3OSAxLjA2MDY2LC0xLjQ4NDkyeiIgZmlsbC1vcGFjaXR5PSIwLjM3MjU1IiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTIzMy4yNzU4NSwxNzUuMzcwNjVsMS44Mzg0OCwxLjgzODQ4YzEuMDYwNjYsLTEuMDYwNjYgMi4yNjI3NCwtMS44Mzg0OCAzLjY3Njk2LC0yLjI2Mjc0YzEuNjk3MDYsLTAuNTY1NjkgMy40NjQ4MiwtMC40OTQ5NyA1LjE2MTg4LDAuMDcwNzFjMS42MjYzNSwwLjQ5NDk3IDMuMTExMjcsMS41NTU2MyA0LjAzMDUxLDIuODk5MTRjMC45ODk5NSwxLjI3Mjc5IDEuNTU1NjMsMi45Njk4NSAxLjYyNjM1LDQuNTk2MTljMC4wNzA3MSwwLjQ5NDk3IC0wLjM1MzU1LDAuOTE5MjQgLTAuNzc3ODIsMC45MTkyNGMtMC40OTQ5NywwLjA3MDcxIC0wLjkxOTI0LC0wLjM1MzU1IC0wLjkxOTI0LC0wLjc3NzgydjBjLTAuMjEyMTMsLTEuMjAyMDggLTAuNzc3ODIsLTIuMzMzNDUgLTEuNjI2MzUsLTMuMTgxOThjLTAuODQ4NTMsLTAuODQ4NTMgLTEuODM4NDgsLTEuNDE0MjEgLTMuMDQwNTYsLTEuNjI2MzVjLTEuMDYwNjYsLTAuMjEyMTMgLTIuMTkyMDMsLTAuMDcwNzEgLTMuMjUyNjksMC40MjQyNmMtMC44NDg1MywwLjQyNDI2IC0xLjU1NTYzLDAuOTg5OTUgLTIuMTIxMzIsMS44Mzg0OGwxLjY5NzA2LDEuNjk3MDZjMC4yODI4NCwwLjI4Mjg0IDAuMjgyODQsMC43MDcxMSAwLDAuOTg5OTVjLTAuMTQxNDIsMC4xNDE0MiAtMC4yODI4NCwwLjE0MTQyIC0wLjQyNDI2LDAuMTQxNDJsLTYuMjIyNTQsMGMtMC40MjQyNiwwIC0wLjcwNzExLC0wLjI4Mjg0IC0wLjYzNjQsLTAuNjM2NGwwLC02LjIyMjU0YzAsLTAuNDI0MjYgMC4xNDE0MiwtMC43MDcxMSAwLjQyNDI2LC0wLjg0ODUzYzAuMjgyODQsLTAuMTQxNDIgMC40MjQyNiwwIDAuNTY1NjksMC4xNDE0MnoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo4Ljg0NTQ2Mzg5MDkwNTQ3ODo2LjQyNDAxMjQ0MTg5NTI4Ni0tPg==",
        redo: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS40NDU0NCIgaGVpZ2h0PSIxMC42MzM1MSIgdmlld0JveD0iMCwwLDE5LjQ0NTQ0LDEwLjYzMzUxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMxLjE1NDU0LC0xNzMuNTc1OTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjQ5LjUzOTMyLDE3NC4zMDk5OWMwLjYzNjQsMC4yMTIxMyAxLjA2MDY2LDAuNzc3ODEgMS4wNjA2NiwxLjQ4NDkydjYuMzYzOTZjLTAuMDcwNzEsMC45MTkyNCAtMC43Nzc4MiwxLjYyNjM1IC0xLjY5NzA2LDEuNjk3MDZoLTYuMjIyNTRjLTAuNDI0MjYsMCAtMC45MTkyNCwtMC4yMTIxMyAtMS4yMDIwOCwtMC40OTQ5N2MtMC43MDcxMSwtMC43MDcxIC0wLjYzNjQsLTEuNzY3NzYgMCwtMi40MDQxNmwxLjA2MDY2LC0xLjA2MDY2Yy0wLjk4OTk1LC0wLjk4OTk1IC0yLjQwNDE3LC0xLjQxNDIxIC0zLjc0NzY3LC0xLjIwMjA4Yy0wLjk4OTk1LDAuMTQxNDIgLTEuODM4NDcsMC41NjU2OCAtMi41NDU1OCwxLjI3Mjc5Yy0wLjcwNzEsMC43MDcxMSAtMS4yMDIwOCwxLjYyNjM1IC0xLjQxNDIxLDIuNjg3MDFsLTAuMDcwNzEsMC4wNzA3MWMtMC4xNDE0MiwwLjg0ODUyIC0wLjkxOTI0LDEuNDg0OTIgLTEuNzY3NzcsMS40ODQ5MmMtMC45ODk5NSwwIC0xLjgzODQ4LC0wLjg0ODUzIC0xLjgzODQ4LC0xLjgzODQ4YzAuMTQxNDIsLTEuODM4NDggMC43Nzc4MiwtMy42MDYyNSAxLjgzODQ4LC01LjA5MTE3YzEuMTMxMzcsLTEuNTU1NjMgMi42ODcsLTIuNjg3IDQuNTI1NDgsLTMuMjUyNjljMS45MDkxOSwtMC42MzY0IDMuOTU5OCwtMC41NjU2OSA1Ljc5ODI4LDBjMS4yMDIwOCwwLjM1MzU2IDIuMzMzNDUsMC45MTkyNCAzLjMyMzQsMS43Njc3N2wxLjEzMTM3LC0xLjEzMTM3YzAuNDI0MjcsLTAuNDI0MjYgMS4xMzEzNywtMC41NjU2OCAxLjc2Nzc3LC0wLjM1MzU1eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGwtb3BhY2l0eT0iMC4zNzI1NSIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Ik0yNDguNDc4NjYsMTc1LjM3MDY0YzAuMTQxNDMsLTAuMTQxNDIgMC4yODI4NSwtMC4yODI4NCAwLjU2NTY5LC0wLjE0MTQyYzAuMjgyODQsMC4xNDE0MiAwLjQyNDI2LDAuNDI0MjcgMC40MjQyNiwwLjg0ODUzdjYuMjIyNTRjMC4wNzA3MSwwLjM1MzU2IC0wLjIxMjE0LDAuNjM2NCAtMC42MzY0LDAuNjM2NGgtNi4yMjI1NGMtMC4xNDE0MiwwIC0wLjI4Mjg0LDAgLTAuNDI0MjYsLTAuMTQxNDJjLTAuMjgyODQsLTAuMjgyODQgLTAuMjgyODQsLTAuNzA3MTEgMCwtMC45ODk5NWwxLjY5NzA2LC0xLjY5NzA2Yy0wLjU2NTY5LC0wLjg0ODUzIC0xLjI3Mjc5LC0xLjQxNDIyIC0yLjEyMTMyLC0xLjgzODQ4Yy0xLjA2MDY2LC0wLjQ5NDk3IC0yLjE5MjAzLC0wLjYzNjM5IC0zLjI1MjY5LC0wLjQyNDI2Yy0xLjIwMjA4LDAuMjEyMTQgLTIuMTkyMDMsMC43Nzc4MiAtMy4wNDA1NiwxLjYyNjM1Yy0wLjg0ODUzLDAuODQ4NTMgLTEuNDE0MjIsMS45Nzk5IC0xLjYyNjM1LDMuMTgxOTh2MGMwLDAuNDI0MjcgLTAuNDI0MjcsMC44NDg1MyAtMC45MTkyNCwwLjc3NzgyYy0wLjQyNDI3LDAgLTAuODQ4NTMsLTAuNDI0MjcgLTAuNzc3ODIsLTAuOTE5MjRjMC4wNzA3MiwtMS42MjYzNCAwLjYzNjQsLTMuMzIzNCAxLjYyNjM1LC00LjU5NjE5YzAuOTE5MjQsLTEuMzQzNTEgMi40MDQxNiwtMi40MDQxNyA0LjAzMDUxLC0yLjg5OTE0YzEuNjk3MDYsLTAuNTY1NjggMy40NjQ4MiwtMC42MzY0IDUuMTYxODgsLTAuMDcwNzFjMS40MTQyMiwwLjQyNDI2IDIuNjE2MywxLjIwMjA4IDMuNjc2OTYsMi4yNjI3NGwxLjgzODQ4LC0xLjgzODQ4eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo4Ljg0NTQ2Mzg5MDkwNTQyMTo2LjQyNDAyNTQ1ODI2MTQ2OC0tPg==",
      };
  
      constructor() {
        window.addEventListener("message", (event) => {
          let eventType = event.data.type;
  
          if (!eventType) return;
  
          switch (eventType) {
            case "EDITOR_CLOSE":
              this.IFrame.closeIframe();
              this.dispatchEvent("editorClosed");
              break;
  
            case "DATA_SEND":
              this.openShaderManager("save");
              this.savingData = {
                projectData: event.data.projectData,
                fragShader: event.data.fragShader,
                vertShader: event.data.vertShader,
              };
              break;
  
            case "DATA_REQUEST":
              this.openShaderManager("load");
              break;
  
            default:
              break;
          }
        });
  
        parentExtension = this;
  
        //For addon development. Just something fun I plan to do in the future.
        //Others are allowed to join!
        vm.runtime.ext_obviousalexc_penPlus = this;
  
        vm.runtime.on("PROJECT_LOADED", this._setupExtensionStorage);
  
        //Remove clone data from cache;
        vm.runtime.on("targetWasRemoved", (clone) => {
          const cloneID = clone.id;
          Object.keys(clone.variables).forEach((key) => {
            //Yeah this is me. You are probably wondering how I got here?
            //Welp it all started on 3DGAS
            if (this.listCache[key + cloneID]) {
              delete this.listCache[key + cloneID];
            }
          });
        });
  
        this._setupExtensionStorage();
  
        this._setupTheme();
      }
  
      _createAttributedatForShader(shaderName) {
        const shaderDat = this.programs[shaderName];
        //Make sure required info exists
        if (!shaderDat) return;
        if (!shaderDat.info) return;
        if (!shaderDat.info.attribSetters) return;
        //Store info
        const attributeDat = shaderDat.info.attribSetters;
        const attributes = Object.keys(attributeDat);
  
        const bufferInitilizer = {};
  
        //Loop through every attribute and add the appropriate data.
        attributes.forEach((attributeKey) => {
          //Create the array
          this.programs[shaderName].attribDat[attributeKey] = {
            type: "unknown",
            data: [],
          };
  
          //Search using regex
          const regexSearcher = new RegExp(`.*${attributeKey}.*\n?`);
          let searchResult =
            this.shaders[shaderName].projectData.vertShader.match(
              regexSearcher
            )[0];
  
          //Remove whitespace at the beginning for easy extraction
          while (searchResult.charAt(0) == " ") {
            searchResult = searchResult.replace(" ", "");
          }
  
          //determine the length of the array through type
          const split = searchResult.split(" ");
          const type = split.length < 4 ? split[1] : split[2];
          if (split && (split[1] || split[2])) {
            let length = 3;
            this.programs[shaderName].attribDat[attributeKey].type = type;
  
            switch (type) {
              case "vec2":
                length = 6;
                break;
  
              case "vec3":
                length = 9;
                break;
  
              case "vec4":
                length = 12;
                break;
  
              default:
                break;
            }
  
            //Add data to data array.
            for (let i = 0; i < length; i++) {
              this.programs[shaderName].attribDat[attributeKey].data.push(0);
            }
  
            //Add the data to our buffer initilizer.
            bufferInitilizer[attributeKey] = {
              numComponents: Math.floor(length / 3),
              data: this.programs[shaderName].attribDat[attributeKey].data,
            };
          }
        });
  
        this.programs[shaderName].buffer = twgl.createBufferInfoFromArrays(
          gl,
          bufferInitilizer
        );
  
        this.programs[shaderName];
        //Make sure required info exists
        if (!shaderDat) return;
        if (!shaderDat.info) return;
        if (!shaderDat.info.uniformSetters) return;
        //Store info
        const uniformDat = shaderDat.info.uniformSetters;
        const uniforms = Object.keys(uniformDat);
  
        //Set this to our program
        gl.useProgram(this.programs[shaderName].info.program);
  
        //Loop through every uniforms and add the appropriate data.
        uniforms.forEach((uniformKey) => {
          //Create the data
          this.programs[shaderName].uniformDec[uniformKey] = {
            type: "unknown",
            isArray: false,
            arrayLength: 0,
            arrayData: [],
          };
  
          //Search using regex
          const regexSearcher = new RegExp(`uniform.*${uniformKey}.*;?`);
          let searchResult =
            this.shaders[shaderName].projectData.vertShader.match(
              regexSearcher
            )[0];
  
          //Remove whitespace at the beginning for easy extraction
          while (searchResult.charAt(0) == " ") {
            searchResult = searchResult.replace(" ", "");
          }
  
          //determine the type of the uniform
          const split = searchResult.split(" ");
          const type = split.length < 4 ? split[1] : split[2];
          if (split && (split[2] || split[3])) {
            //Try to extract array data
            const arrayLength = Scratch.Cast.toNumber(
              (split.length < 4 ? split[2] : split[3])
                .replace(uniformKey, "")
                .replaceAll(/[[\];]/g, "")
            );
  
            this.programs[shaderName].uniformDec[uniformKey].type = type;
            //Add data for array stuff
            this.programs[shaderName].uniformDec[uniformKey].arrayLength =
              arrayLength;
            this.programs[shaderName].uniformDec[uniformKey].isArray =
              arrayLength > 0;
  
            if (arrayLength == 0) return;
  
            const createArray = (lengthMul) => {
              return Array.apply(null, Array(arrayLength * lengthMul)).map(() => {
                return 0;
              });
            };
  
            switch (type) {
              case "float":
                this.programs[shaderName].uniformDec[uniformKey].arrayData =
                  createArray(1);
                break;
  
              case "int":
                this.programs[shaderName].uniformDec[uniformKey].arrayData =
                  createArray(1);
                break;
  
              case "vec2":
                this.programs[shaderName].uniformDec[uniformKey].arrayData =
                  createArray(2);
                break;
  
              case "vec3":
                this.programs[shaderName].uniformDec[uniformKey].arrayData =
                  createArray(3);
                break;
  
              case "vec4":
                this.programs[shaderName].uniformDec[uniformKey].arrayData =
                  createArray(4);
                break;
  
              default:
                break;
            }
  
            //Data that will be sent to the GPU to initilize the array
            //But we will keep it in the declaration
            this.programs[shaderName].uniformDat[uniformKey] =
              this.programs[shaderName].uniformDec[uniformKey].arrayData;
          }
        });
      }
  
      _parseProjectShaders() {
        Object.keys(this.shaders).forEach((shaderKey) => {
          let shader = this.shaders[shaderKey];
          this.programs[shaderKey] = {
            info: twgl.createProgramInfo(gl, [
              shader.projectData.vertShader,
              shader.projectData.fragShader,
            ]),
            uniformDat: {},
            uniformDec: {},
            attribDat: {},
          };
  
          this._createAttributedatForShader(shaderKey);
        });
      }
  
      //So I can track and fix potentially extension breaking problems
      _updateRelevantInfo(oldInfo) {
        //pre 7.0.0B1 detection
        if (oldInfo.version == "6.5.3" || !oldInfo.version) {
          this.prefixes.penPlusTextures = "!";
          if (!Scratch.extensions.isPenguinMod)
            runtime.extensionStorage["penP"].prefixes = this.prefixes;
          console.log("Loaded patch for pre Version 7.0.0B1 texture prefixes");
        }
      }
  
      //Stolen from lily :3
      _setupExtensionStorage() {
        runtime.ext_pen._getPenLayerID();
        //Penguinmod saving support
        if (Scratch.extensions.isPenguinMod) {
          parentExtension.serialize = () => {
            return JSON.stringify({
              shaders: parentExtension.shaders,
              version: parentExtension.extensionVersion,
              prefixes: parentExtension.prefixes,
            });
          };
  
          parentExtension.deserialize = (serialized) => {
            let deserializedData = JSON.parse(serialized);
            this.programs = {};
            if (deserializedData.version) {
              parentExtension.shaders = deserializedData.shaders;
              parentExtension.prefixes = deserializedData.prefixes;
  
              if (parentExtension.extensionVersion != deserializedData.version) {
                parentExtension._updateRelevantInfo(deserializedData);
              }
            } else {
              parentExtension.shaders = deserializedData || {};
              parentExtension._updateRelevantInfo(deserializedData);
            }
            parentExtension._parseProjectShaders();
          };
  
          //Doing this to remedy the janky turbowarp saving system.
          parentExtension.getShaders = () => {
            return parentExtension.shaders;
          };
        } else {
          this.programs = {};
          let oldVersion = "6.5.3";
          if (!runtime.extensionStorage["penP"]) {
            runtime.extensionStorage["penP"] = Object.create(null);
            runtime.extensionStorage["penP"].shaders = Object.create(null);
            runtime.extensionStorage["penP"].version = oldVersion;
            runtime.extensionStorage["penP"].prefixes = parentExtension.prefixes;
          }
  
          if (
            parentExtension.extensionVersion !=
            runtime.extensionStorage["penP"].version
          ) {
            parentExtension._updateRelevantInfo(runtime.extensionStorage["penP"]);
            runtime.extensionStorage["penP"].version =
              parentExtension.extensionVersion;
          }
  
          //For some reason tw saving just doesn't work lol
          parentExtension.shaders = runtime.extensionStorage["penP"].shaders;
          parentExtension.prefixes = runtime.extensionStorage["penP"].prefixes;
  
          //Remedy for the turbowarp saving system being jank.
          parentExtension.getShaders = () => {
            parentExtension.shaders = runtime.extensionStorage["penP"].shaders;
            return runtime.extensionStorage["penP"].shaders;
          };
          //seems inconsistant. Should check on behavior of desired trait.
          parentExtension._parseProjectShaders();
        }
  
        parentExtension.savingData = {
          projectData: undefined,
          fragShader: undefined,
          vertShader: undefined,
        };
      }
  
      saveShader(name, data) {
        //Create data in the json object
        this.shaders[name] = {
          projectData: data,
          modifyDate: Date.now(),
        };
  
        this.programs[name] = {
          info: twgl.createProgramInfo(gl, [data.vertShader, data.fragShader]),
          uniformDat: {},
          uniformDec: {},
          attribDat: {},
        };
  
        //Dispatch events for addons to catch.
        this.dispatchEvent("shaderSaved", {
          projectData: data,
          vertexShader: data.vertShader,
          fragmentShader: data.fragShader,
          name: name,
        });
  
        this._createAttributedatForShader(name);
      }
  
      dispatchEvent(eventName, data) {
        if (!this.events[eventName]) return;
        this.events[eventName].forEach((eventFunction) => {
          eventFunction(data || {});
        });
      }
  
      //For custom events
      addEventListener(eventName, eventFunction) {
        if (!this.events[eventName]) return;
        this.events[eventName].push(eventFunction);
      }
  
      deleteShader(name) {
        //Create data in the json object
        delete this.shaders[name];
        delete this.programs[name];
      }
  
      getInfo() {
        return {
          blocks: [
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Pen Properties"),
            },
            {
              disableMonitor: true,
              opcode: "isPenDown",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("pen is down?"),
              arguments: {},
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "getPenHSV",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("pen [HSV]"),
              arguments: {
                HSV: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "color",
                  menu: "hsvMenu",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "drawDot",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("draw dot at [x] [y]"),
              arguments: {
                x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "drawLine",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("draw line from [x1] [y1] to [x2] [y2]"),
              arguments: {
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "stampSprite",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("stamp [sprite]"),
              arguments: {
                sprite: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "spriteMenu",
                },
              },
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Square Pen Blocks"),
            },
            {
              disableMonitor: true,
              opcode: "squareDown",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("stamp pen square"),
              arguments: {},
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "squareTexDown",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "stamp pen square with the texture of [tex]"
              ),
              arguments: {
                tex: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "setStampAttribute",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set pen square's [target] to [number]"),
              arguments: {
                target: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0,
                  menu: "stampSquare",
                },
                number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "getStampAttribute",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("get pen square's [target]"),
              arguments: {
                target: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0,
                  menu: "stampSquare",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "tintSquare",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("tint pen square to [color]"),
              arguments: {
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#0000ff",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "resetSquareAttributes",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("reset square Attributes"),
              arguments: {},
              filter: "sprite",
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Triangle Blocks"),
            },
            {
              disableMonitor: true,
              opcode: "setTrianglePointAttribute",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set triangle point [point]'s [attribute] to [value]"
              ),
              arguments: {
                point: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                attribute: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "2",
                  menu: "triAttribute",
                },
                value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "setWholeTrianglePointAttribute",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set triangle's [wholeAttribute] to [value]"
              ),
              arguments: {
                wholeAttribute: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "2",
                  menu: "wholeTriAttribute",
                },
                value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "tintTriPoint",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("tint triangle point [point] to [color]"),
              arguments: {
                point: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#0000ff",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "tintTri",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("tint triangle to [color]"),
              arguments: {
                point: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#0000ff",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "getTrianglePointAttribute",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("get triangle point [point]'s [attribute]"),
              arguments: {
                point: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                attribute: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 2,
                  menu: "triAttribute",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "resetWholeTriangleAttributes",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("reset triangle attributes"),
              arguments: {},
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "drawSolidTri",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]"
              ),
              arguments: {
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "drawTexTri",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]"
              ),
              arguments: {
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                tex: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
              },
              filter: "sprite",
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Color"),
            },
            {
              disableMonitor: true,
              opcode: "RGB2HEX",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("red [R] green [G] blue [B]"),
              arguments: {
                R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              },
            },
            {
              disableMonitor: true,
              opcode: "HSV2RGB",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("hue [H] saturation [S] value [V]"),
              arguments: {
                H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                V: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Images"),
            },
            //Useless block keep for compat
            {
              disableMonitor: true,
              opcode: "setDURIclampmode",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set imported image wrap mode to [clampMode]"
              ),
              hideFromPalette: true,
              arguments: {
                clampMode: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "33071",
                  menu: "wrapType",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "addBlankIMG",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "add blank image that is [color] and the size of [width], [height] named [name] to Pen+ Library"
              ),
              arguments: {
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#ffffff",
                },
                width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
                height: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "addIMGfromDURI",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "add image named [name] from [dataURI] to Pen+ Library"
              ),
              arguments: {
                dataURI: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "https://extensions.turbowarp.org/dango.png",
                },
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
            },
            "---",
            {
              disableMonitor: true,
              opcode: "removeIMGfromDURI",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "remove image named [name] from Pen+ Library"
              ),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "doesIMGexist",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("does [name] exist in Pen+ Library"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
              filter: "sprite",
            },
            "---",
            {
              disableMonitor: true,
              opcode: "getCostumeDataURI",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("get data uri for costume [costume]"),
              arguments: {
                costume: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "getCostumeDataURI_costume_Menu",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "getDimensionOf",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get the [dimension] of [costume] in pen+ costume library"
              ),
              arguments: {
                dimension: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "getDimensionOf_dimension_Menu",
                },
                costume: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusCostumes",
                },
              },
              filter: "sprite",
            },
            "---",
            {
              disableMonitor: true,
              opcode: "setpixelcolor",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set pixel [x] [y]'s color to [color] in [costume]"
              ),
              arguments: {
                x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#0000ff",
                },
                costume: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusCostumes",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "getpixelcolor",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("get pixel [x] [y]'s color in [costume]"),
              arguments: {
                x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                costume: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusCostumes",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "getPenPlusCostumeURI",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get data uri of [costume] in the pen+ costume library"
              ),
              arguments: {
                costume: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusCostumes",
                },
              },
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Advanced"),
            },
  
            //Custom Shader Blocks
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Custom Shaders"),
            },
            {
              blockType: Scratch.BlockType.BUTTON,
              func: "openShaderEditor",
              text: Scratch.translate("Shader Editor"),
            },
            {
              blockType: Scratch.BlockType.BUTTON,
              func: "openShaderManager",
              text: Scratch.translate("Shader Manager"),
            },
            {
              blockType: Scratch.BlockType.REPORTER,
              opcode: "getAllShaders",
              text: Scratch.translate("shaders in project"),
            },
            {
              disableMonitor: true,
              opcode: "drawShaderTri",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "draw triangle using [shader] between [x1] [y1], [x2] [y2] and [x3] [y3]"
              ),
              arguments: {
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "drawShaderSquare",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("draw square using [shader]"),
              arguments: {
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
              filter: "sprite",
            },
            "---",
            {
              opcode: "setTextureInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set texture [uniformName] in [shader] to [texture]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                texture: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "costumeMenu",
                },
              },
            },
            {
              opcode: "setNumberInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set number [uniformName] in [shader] to [number]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setVec2InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 2 [uniformName] in [shader] to [numberX] [numberY]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setVec3InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setVec4InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setMatrixInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set matrix [uniformName] in [shader] to [list]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                list: { type: Scratch.ArgumentType.STRING, menu: "listMenu" },
              },
            },
            {
              opcode: "setMatrixInShaderArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set matrix [uniformName] in [shader] to [array]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                array: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "[0,0,0,0]",
                },
              },
            },
            {
              opcode: "setCubeInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set cubemap [uniformName] in [shader] to [cubemap]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                cubemap: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusCubemaps",
                },
              },
            },
            {
              opcode: "getNumberInShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get value of number [uniformName] in [shader]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getVec2InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get value of [component] in vector 2 [uniformName] in [shader]"
              ),
              arguments: {
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec2Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getVec3InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get value of [component] in vector 3 [uniformName] in [shader]"
              ),
              arguments: {
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec3Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getVec4InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get value of [component] in vector 4 [uniformName] in [shader]"
              ),
              arguments: {
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec4Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getMatrixInShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get value of matrix [uniformName] in [shader] as an array"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getTextureInShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get the texture of [uniformName] in [shader]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getCubemapInShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get the cubemap of [uniformName] in [shader]"
              ),
              arguments: {
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            "---",
            {
              opcode: "setArrayNumberInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set item [item] in number array [uniformName] in [shader] to [number]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setArrayVec2InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set item [item] in vector 2 array [uniformName] in [shader] to [numberX] [numberY]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setArrayVec3InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set item [item] in vector 3 array [uniformName] in [shader] to [numberX] [numberY] [numberZ]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "setArrayVec4InShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set item [item] in vector 4 array [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                numberW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              },
            },
            {
              opcode: "getArrayNumberInShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get item [item]'s value in number array [uniformName] in [shader]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getArrayVec2InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get item [item]'s [component] value in vector 2 array [uniformName] in [shader]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec2Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getArrayVec3InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get item [item]'s [component] value in vector 3 array [uniformName] in [shader]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec3Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            {
              opcode: "getArrayVec4InShader",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "get item [item]'s [component] value in vector 4 array [uniformName] in [shader]"
              ),
              arguments: {
                item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                component: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "vec4Component",
                },
                uniformName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Uniform",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
            },
            "---",
            {
              opcode: "setNumberAttributeInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set number attribute [attributeName] of point [pointID] in [shader] to [number]"
              ),
              arguments: {
                attributeName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "attribute",
                },
                pointID: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
            },
            {
              opcode: "setVec2AttributeInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 2 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY]"
              ),
              arguments: {
                attributeName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "attribute",
                },
                pointID: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
            },
            {
              opcode: "setVec3AttributeInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 3 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ]"
              ),
              arguments: {
                attributeName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "attribute",
                },
                pointID: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
            },
            {
              opcode: "setVec4AttributeInShader",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set vector 4 attribute [attributeName] of point [pointID] in [shader] to [numberX] [numberY] [numberZ] [numberW]"
              ),
              arguments: {
                attributeName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "attribute",
                },
                pointID: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
                numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                numberW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Cubemaps"),
            },
            {
              opcode: "createCubemap",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "create cubemap named [name] from left [left] right [right] back [back] front [front] bottom [bottom] top [top]"
              ),
              arguments: {
                name: { type: Scratch.ArgumentType.STRING, defaultValue: "Name" },
                left: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
                right: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
                back: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
                front: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
                bottom: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "costumeMenu",
                },
                top: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "doesCubemapexist",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("does [name] exist as a cubemap"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
              filter: "sprite",
            },
            {
              disableMonitor: true,
              opcode: "removeCubemapfromDURI",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("remove cubemap named [name]"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Image",
                },
              },
              filter: "sprite",
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("List Based Rendering"),
            },
            {
              opcode: "renderSolidTrisFromList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("draw solid triangles from list [list]"),
              arguments: {
                list: { type: Scratch.ArgumentType.STRING, menu: "listMenu" },
              },
              filter: "sprite",
            },
            {
              opcode: "renderTexturedTrisFromList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "draw textured triangles from list [list] using [tex]"
              ),
              arguments: {
                list: { type: Scratch.ArgumentType.STRING, menu: "listMenu" },
                tex: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
              },
              filter: "sprite",
            },
            {
              opcode: "renderShaderTrisFromList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "draw shader triangles from list [list] using [shader]"
              ),
              arguments: {
                list: { type: Scratch.ArgumentType.STRING, menu: "listMenu" },
                shader: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "penPlusShaders",
                },
              },
              filter: "sprite",
            },
            "---",
            {
              opcode: "solidTriDef",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "define solid tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3]"
              ),
              arguments: {
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                c1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                c2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                c3: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
              },
              filter: "sprite",
            },
            {
              opcode: "texTriDef",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "define textured tri [x1] [y1] [c1], [x2] [y2] [c2] and [x3] [y3] [c3] with the uv's [u1] [v1], [u2] [v2] and [u3] [v3]"
              ),
              arguments: {
                x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                c1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
                x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                c2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
                x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                c3: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
  
                u1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                v1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                u2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                v2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                u3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                v3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              },
              filter: "sprite",
            },
            "---",
  
            {
              opcode: "editTriDef",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate(
                "set the [attribute] of point [id] to [value] in [def]"
              ),
              arguments: {
                attribute: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "depth value",
                  menu: "defAttribMenu",
                },
                id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1",
                  menu: "pointMenu",
                },
                value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                def: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "tri definition here",
                },
              },
              filter: "sprite",
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Render Textures"),
            },
            {
              opcode: "createRenderTexture",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("create render texture named [name]"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "render texture",
                },
              },
            },
            {
              opcode: "createRenderTextureOfSize",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "create render texture named [name] of size [width] [height]"
              ),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "render texture",
                },
                width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
                height: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
              },
            },
            {
              opcode: "removeRenderTexture",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("remove render texture named [name]"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "render texture",
                },
              },
            },
            {
              opcode: "doesRenderTextureExist",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("does render texture named [name] exist?"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "render texture",
                },
              },
            },
            {
              opcode: "getRenderTextures",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("render textures"),
            },
            "---",
            {
              opcode: "targetRenderTexture",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("render tris and squares to [name]"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "renderTextures",
                },
              },
            },
            {
              opcode: "clearRenderTexture",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("clear pen from [name]"),
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "renderTexturesOnly",
                },
              },
            },
  
            {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate("Extras"),
            },
            {
              opcode: "getPenPVersion",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("Pen+ version"),
              disableMonitor: true,
            },
            {
              opcode: "getTrianglesDrawn",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("triangles drawn"),
              disableMonitor: true,
            },
            {
              opcode: "getPenRenderLayer",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("data uri of pen layer"),
              disableMonitor: true,
            },
            "---",
            {
              opcode: "setCullMode",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("hide triangles that turn [direction]"),
              arguments: {
                direction: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "cullMode",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "setTriangleFilterMode",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set texture filter mode to [filter]"),
              arguments: {
                filter: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 9728,
                  menu: "filterType",
                },
              },
              filter: "sprite",
            },
            "---",
            {
              opcode: "turnAdvancedSettingOff",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "turn advanced setting [Setting] [onOrOff]"
              ),
              arguments: {
                Setting: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "advancedSettingsMenu",
                },
                onOrOff: { type: Scratch.ArgumentType.STRING, menu: "onOffMenu" },
              },
            },
            {
              opcode: "clearDepth",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("Erase Depth"),
            },
            {
              hideFromPalette: true,
              opcode: "setAdvancedOptionValueTo",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [setting] to [value]"),
              arguments: {
                setting: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "advancedSettingValuesMenu",
                },
                value: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "1000",
                },
              },
            },
            {
              opcode: "setPrefix",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set the prefix for [prefix] to [value]"),
              arguments: {
                prefix: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "prefixTypes",
                },
                value: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "!",
                },
              },
            },
          ],
          menus: {
            hsvMenu: {
              items: [
                {
                  text: Scratch.translate("color"),
                  value: "color",
                },
                {
                  text: Scratch.translate("saturation"),
                  value: "saturation",
                },
                {
                  text: Scratch.translate("brightness"),
                  value: "brightness",
                },
                {
                  text: Scratch.translate("opacity"),
                  value: "transparency",
                },
                {
                  text: Scratch.translate("hex code"),
                  value: "hex code",
                },
                {
                  text: Scratch.translate("size"),
                  value: "size",
                },
              ],
              acceptReporters: true,
            },
            stampSquare: {
              items: [
                { text: Scratch.translate("width"), value: "0" },
                { text: Scratch.translate("height"), value: "1" },
                { text: Scratch.translate("rotation"), value: "2" },
                { text: Scratch.translate("U-Multiplier"), value: "3" },
                { text: Scratch.translate("U-Offset"), value: "4" },
                { text: Scratch.translate("V-Multiplier"), value: "5" },
                { text: Scratch.translate("V-Offset"), value: "6" },
                { text: Scratch.translate("red Tint"), value: "7" },
                { text: Scratch.translate("green Tint"), value: "8" },
                { text: Scratch.translate("blue Tint"), value: "9" },
                { text: Scratch.translate("opacity"), value: "10" },
                { text: Scratch.translate("depth value"), value: "11" },
              ],
              acceptReporters: true,
            },
            triAttribute: {
              items: [
                { text: Scratch.translate("U value"), value: "0" },
                { text: Scratch.translate("V value"), value: "1" },
                { text: Scratch.translate("red tint"), value: "2" },
                { text: Scratch.translate("green tint"), value: "3" },
                { text: Scratch.translate("blue tint"), value: "4" },
                { text: Scratch.translate("opacity"), value: "7" },
                { text: Scratch.translate("corner pinch"), value: "6" },
                { text: Scratch.translate("depth value"), value: "5" },
              ],
              acceptReporters: true,
            },
            wholeTriAttribute: {
              items: [
                { text: Scratch.translate("red tint"), value: "2" },
                { text: Scratch.translate("green tint"), value: "3" },
                { text: Scratch.translate("blue tint"), value: "4" },
                { text: Scratch.translate("opacity"), value: "7" },
                { text: Scratch.translate("depth value"), value: "5" },
              ],
              acceptReporters: true,
            },
            filterType: {
              items: [
                { text: Scratch.translate("closest"), value: "9728" },
                { text: Scratch.translate("linear"), value: "9729" },
              ],
              acceptReporters: true,
            },
            wrapType: {
              items: [
                { text: Scratch.translate("clamp"), value: "33071" },
                { text: Scratch.translate("repeat"), value: "10497" },
                { text: Scratch.translate("mirrored"), value: "33648" },
              ],
              acceptReporters: true,
            },
            pointMenu: { items: ["1", "2", "3"], acceptReporters: true },
            onOffMenu: {
              items: [
                {
                  text: Scratch.translate("on"),
                  value: "on",
                },
                {
                  text: Scratch.translate("off"),
                  value: "off",
                },
              ],
              acceptReporters: true,
            },
            costumeMenu: { items: "costumeMenuFunction", acceptReporters: true },
            penPlusCostumes: {
              items: "penPlusCostumesFunction",
              acceptReporters: true,
            },
            renderTextures: {
              items: "getRenderTexturesAndStage",
              acceptReporters: true,
            },
            renderTexturesOnly: {
              items: "getRenderTexturesWarning",
              acceptReporters: true,
            },
            penPlusShaders: {
              items: "shaderMenu",
              acceptReporters: true,
            },
            advancedSettingsMenu: {
              items: [
                {
                  text: Scratch.translate("allow 'Corner Pinch < 1'"),
                  value: "wValueUnderFlow",
                },
                {
                  text: Scratch.translate("clamp depth value"),
                  value: "_ClampZ",
                },
              ],
              acceptReporters: true,
            },
            advancedSettingValuesMenu: {
              items: [
                {
                  text: Scratch.translate("maximum depth value"),
                  value: "depthMax",
                },
              ],
              acceptReporters: false,
            },
            getCostumeDataURI_costume_Menu: {
              items: "getCostumeDataURI_costume_MenuFunction",
              acceptReporters: true,
            },
            getDimensionOf_dimension_Menu: {
              items: [
                {
                  text: Scratch.translate("width"),
                  value: "width",
                },
                {
                  text: Scratch.translate("height"),
                  value: "height",
                },
              ],
              acceptReporters: true,
            },
            listMenu: {
              acceptReporters: true,
              items: "_getLists",
            },
            penPlusCubemaps: {
              acceptReporters: true,
              items: "_getCubemaps",
            },
            vec2Component: {
              items: [
                { text: "x", value: "0" },
                { text: "y", value: "1" },
              ],
              acceptReporters: true,
            },
            vec3Component: {
              items: [
                { text: "x", value: "0" },
                { text: "y", value: "1" },
                { text: "z", value: "2" },
              ],
              acceptReporters: true,
            },
            vec4Component: {
              items: [
                { text: "x", value: "0" },
                { text: "y", value: "1" },
                { text: "z", value: "2" },
                { text: "w", value: "3" },
              ],
              acceptReporters: true,
            },
            cullMode: {
              items: [
                { text: Scratch.translate("neither way"), value: "0" },
                { text: Scratch.translate("clock-wise"), value: "1028" },
                { text: Scratch.translate("counter clock-wise"), value: "1029" },
              ],
              acceptReporters: true,
            },
            spriteMenu: {
              items: "getSprites",
              acceptReporters: true,
            },
            prefixTypes: {
              items: [
                {
                  text: Scratch.translate("Pen+ Costumes"),
                  value: "penPlusTextures",
                },
                {
                  text: Scratch.translate("Render Textures"),
                  value: "renderTextures",
                },
              ],
              acceptReporters: true,
            },
            defAttribMenu: {
              items: [
                {
                  text: Scratch.translate("x"),
                  value: "x",
                },
                {
                  text: Scratch.translate("y"),
                  value: "y",
                },
                {
                  text: Scratch.translate("depth value"),
                  value: "depth value",
                },
                {
                  text: Scratch.translate("corner pinch"),
                  value: "corner pinch",
                },
                {
                  text: Scratch.translate("U value"),
                  value: "U value",
                },
                {
                  text: Scratch.translate("V value"),
                  value: "V value",
                },
                {
                  text: Scratch.translate("red tint"),
                  value: "red tint",
                },
                {
                  text: Scratch.translate("green tint"),
                  value: "green tint",
                },
                {
                  text: Scratch.translate("blue tint"),
                  value: "blue tint",
                },
                {
                  text: Scratch.translate("transparency"),
                  value: "transparency",
                },
              ],
              acceptReporters: true,
            },
          },
          name: Scratch.translate("Pen+ V7"),
          id: "penP",
          docsURI:
            "https://pen-group.github.io/docs/?page=extensions%2FpenPlus%2Fmain",
          menuIconURI:
            "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi45OTk3MiIgaGVpZ2h0PSIzMi44ODIwNyIgdmlld0JveD0iMCwwLDMyLjk5OTcyLDMyLjg4MjA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI0LC0xNjMuOTk5OTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyOC43NTMsMTk0LjYwMmwtNC4yNSwxLjc4bDEuNzgzLC00LjIzN2MxLjIxOCwtMi44OTIgMi45MDcsLTUuNDIzIDUuMDMsLTcuNTM4bDE5Ljc1LC0xOS42NzdjMC44NDYsLTAuODQyIDIuNjUsLTAuNDEgNC4wMzIsMC45NjdjMS4zOCwxLjM3NSAxLjgxNiwzLjE3MyAwLjk3LDQuMDE1bC0xOS43NSwxOS42NzhjLTIuMTIzLDIuMTE2IC00LjY2NCwzLjggLTcuNTY1LDUuMDEyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIzNi44NTgsMTczLjQyOGMwLDAgMi42MTYsMi4yMiA0LjM1LC0xLjU0NmMzLjc1MiwtOC4xNSA4LjIwMiwtNS43NzIgOC4yMDIsLTUuNzcyIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI1Ni40MiwxNjguODI1YzAsMC40NjMgLTAuMTQsMC44NzMgLTAuNDMyLDEuMTY0bC05LjMzNSw5LjNjMC4yODIsLTAuMjkgMC40MSwtMC42NjggMC40MSwtMS4xMmMwLC0wLjg3NCAtMC41MDcsLTEuOTYzIC0xLjQwNiwtMi44NjhjLTEuMzYyLC0xLjM1OCAtMy4xNDcsLTEuOCAtNC4wMDIsLTAuOTlsOS4zMzUsLTkuMzAxYzAuODQ0LC0wLjg0IDIuNjUsLTAuNDEgNC4wMzUsMC45NmMwLjg5OCwwLjkwNCAxLjM5NiwxLjk4MiAxLjM5NiwyLjg1NU0yMzAuNTE1LDE5My43NzRjLTAuNTczLDAuMzAyIC0xLjE1NywwLjU3IC0xLjc2NCwwLjgzbC00LjI1MSwxLjc3OGwxLjc4NiwtNC4yMzVjMC4yNTgsLTAuNjA0IDAuNTMsLTEuMTg2IDAuODMzLC0xLjc1N2MwLjY5LDAuMTgzIDEuNDQ4LDAuNjI1IDIuMTA4LDEuMjgyYzAuNjYsMC42NTggMS4xMDIsMS40MTIgMS4yODcsMi4xMDIiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU2LjQ5OCwxNjguNzQ4YzAsMC40NjQgLTAuMTQsMC44NzQgLTAuNDMzLDEuMTY1bC0xOS43NDIsMTkuNjhjLTIuMTMsMi4xMSAtNC42NzMsMy43OTMgLTcuNTcyLDUuMDFsLTQuMjUxLDEuNzc3bDAuOTc0LC0yLjMxNmwxLjkyNSwtMC44MDhjMi44OTgsLTEuMjE4IDUuNDQsLTIuOSA3LjU3LC01LjAxbDE5Ljc0MywtMTkuNjhjMC4yOTIsLTAuMjkyIDAuNDMyLC0wLjcwMiAwLjQzMiwtMS4xNjVjMCwtMC42NDYgLTAuMjcsLTEuNCAtMC43OCwtMi4xMjJjMC4yNSwwLjE3MiAwLjUsMC4zNzcgMC43MzcsMC42MTRjMC44OTgsMC45MDUgMS4zOTYsMS45ODMgMS4zOTYsMi44NTYiIGZpbGw9IiM1NzVlNzUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIG9wYWNpdHk9IjAuMTUiLz48cGF0aCBkPSJNMjM4LjQ1LDE3Mi44M2MwLDAuNSAtMC40MDQsMC45MDUgLTAuOTA0LDAuOTA1Yy0wLjUsMCAtMC45MDUsLTAuNDA1IC0wLjkwNSwtMC45MDRjMCwtMC41IDAuNDA3LC0wLjkwMyAwLjkwNiwtMC45MDNjMC41LDAgMC45MDQsMC40MDQgMC45MDQsMC45MDR6IiBmaWxsPSIjNTc1ZTc1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0NC45OTgwNywxODcuMDUyOThoOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI0OS43NTY4OSwxOTEuODExOHYtOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTY6MTYuMDAwMDY5MjMwODQyMTQzLS0+",
          blockIconURI:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==",
        };
      }
      //Menus
      costumeMenuFunction() {
        if (!runtime) return ["no costumes?"];
        if (!runtime._editingTarget) return ["no costumes?"];
        if (!runtime._editingTarget.sprite) return ["no costumes?"];
  
        const myCostumes = runtime._editingTarget.sprite.costumes;
  
        let readCostumes = [];
        for (
          let curCostumeID = 0;
          curCostumeID < myCostumes.length;
          curCostumeID++
        ) {
          const currentCostume = myCostumes[curCostumeID].name;
          readCostumes.push(currentCostume);
        }
  
        let penPlusCostumes = this.penPlusCostumesFunction();
  
        if (penPlusCostumes[0] != "no pen+ costumes!") {
          readCostumes = readCostumes.concat(penPlusCostumes);
        }
  
        let penplusRenderTextures = this.getRenderTexturesMenu();
  
        if (penplusRenderTextures.length > 0) {
          readCostumes = readCostumes.concat(penplusRenderTextures);
        }
  
        //For custom addons to be able to add their own texture lists.
        this.addonTextureFunctions.forEach((func) => {
          let functionTextures = func();
          if (functionTextures.length > 0) {
            readCostumes = readCostumes.concat(functionTextures);
          }
        });
  
        return readCostumes;
      }
  
      penPlusCostumesFunction() {
        const keys = Object.keys(this.penPlusCostumeLibrary);
        if (keys.length > 0) {
          return keys;
        }
  
        return ["no pen+ costumes!"];
      }
  
      shaderMenu() {
        //!Pain.json
        return Object.keys(this.shaders).length == 0
          ? ["none yet"]
          : Object.keys(this.shaders);
      }
      getCostumeDataURI_costume_MenuFunction() {
        if (!runtime) return ["No costumes?"];
        if (!runtime._editingTarget) return ["No costumes?"];
  
        const myCostumes = runtime._editingTarget.sprite.costumes;
  
        let readCostumes = [];
        for (
          let curCostumeID = 0;
          curCostumeID < myCostumes.length;
          curCostumeID++
        ) {
          const currentCostume = myCostumes[curCostumeID].name;
          readCostumes.push(currentCostume);
        }
  
        return readCostumes;
      }
      _getCubemaps() {
        if (Object.keys(this.penPlusCubemap).length == 0)
          return ["No cubemaps yet!"];
        return Object.keys(this.penPlusCubemap);
      }
      getRenderTexturesMenu() {
        return Object.keys(this.renderTextures);
      }
      getRenderTexturesWarning() {
        return Object.keys(this.renderTextures).length > 0
          ? Object.keys(this.renderTextures)
          : ["No Render Textures Yet!"];
      }
      getRenderTexturesAndStage() {
        let renderTextures = ["Scratch Stage"];
        renderTextures.push(...Object.keys(this.renderTextures));
        return renderTextures;
      }
      getSprites() {
        const sprites = [];
        for (const target of vm.runtime.targets) {
          if (target.isOriginal && !target.isStage) {
            sprites.push(target.getName());
          }
        }
        if (sprites.length === 0) {
          return [
            {
              text: "No sprites exist!",
              value: " ",
            },
          ];
        }
        return sprites;
      }
      //From lily's list tools... With permission of course.
      _getLists() {
        const lists =
          typeof Blockly === "undefined"
            ? []
            : Blockly.getMainWorkspace()
                .getVariableMap()
                .getVariablesOfType("list")
                .map((model) => model.name);
        if (lists.length > 0) {
          return lists;
        } else {
          return [""];
        }
      }
      //And the associated helper function
      _getVarObjectFromName(name, util, type) {
        const stageTarget = runtime.getTargetForStage();
        const target = util.target;
        let listObject = Object.create(null);
  
        listObject = stageTarget.lookupVariableByNameAndType(name, type);
        if (listObject) return listObject;
        listObject = target.lookupVariableByNameAndType(name, type);
        if (listObject) return listObject;
      }
      _deleteFramebuffer(fbi) {
        for (const attachment of fbi.attachments) {
          if (attachment instanceof WebGLTexture) {
            gl.deleteTexture(attachment);
          } else {
            gl.deleteRenderbuffer(attachment);
          }
        }
        gl.deleteFramebuffer(fbi.framebuffer);
      }
  
      _locateTextureObject(name, util) {
        //Get the current target
        const curTarget = util.target;
  
        //Set current texture to null
        let currentTexture = null;
  
        //Look for it in the pen+ costume library
        if (this.penPlusCostumeLibrary[name]) {
          currentTexture = this.penPlusCostumeLibrary[name].texture;
        }
  
        //Look for it in render textures
        else if (
          this.renderTextures[name] &&
          name != this.currentRenderTexture.name
        ) {
          currentTexture = this.renderTextures[name].attachments[0];
        }
  
        //Hopefully it is in the costumes
        else {
          const costIndex = curTarget.getCostumeIndexByName(
            Scratch.Cast.toString(name)
          );
          if (costIndex >= 0) {
            const curCostume = curTarget.sprite.costumes[costIndex];
  
            if (costIndex != curTarget.currentCostume) {
              curTarget.setCostume(costIndex);
            }
  
            currentTexture = renderer._allSkins[curCostume.skinId]._texture;
  
            if (!currentTexture)
              currentTexture = renderer._allSkins[curCostume.skinId].getTexture();
          }
        }
  
        //If so edit the attributes of said texture.
        if (currentTexture) {
          //Set the filter mode
          gl.bindTexture(gl.TEXTURE_2D, currentTexture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, currentFilter);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, currentFilter);
        }
  
        return currentTexture;
      }
  
      //?Default pen helpers
      isPenDown(args, util) {
        checkForPen(util);
        const curTarget = util.target;
        return curTarget["_customState"]["Scratch.pen"].penDown;
      }
      getPenHSV({ HSV }, util) {
        checkForPen(util);
        const curTarget = util.target;
        switch (HSV) {
          case "size":
            return curTarget["_customState"]["Scratch.pen"].penAttributes
              .diameter;
  
          case "hex code": {
            //convert the rgb to hex
            let r = Math.floor(
              curTarget["_customState"]["Scratch.pen"].penAttributes.color4f[0] *
                255
            ).toString(16);
            r = r.length == 1 ? "0" + r : r;
            let g = Math.floor(
              curTarget["_customState"]["Scratch.pen"].penAttributes.color4f[1] *
                255
            ).toString(16);
            g = g.length == 1 ? "0" + g : g;
            let b = Math.floor(
              curTarget["_customState"]["Scratch.pen"].penAttributes.color4f[2] *
                255
            ).toString(16);
            b = b.length == 1 ? "0" + b : b;
            let a = Math.floor(
              curTarget["_customState"]["Scratch.pen"].penAttributes.color4f[3] *
                255
            ).toString(16);
            a = a.length == 1 ? "0" + a : a;
  
            return `#${r}${g}${b}${a}`;
          }
  
          default:
            return curTarget["_customState"]["Scratch.pen"][HSV];
        }
      }
      drawDot({ x, y }, util) {
        checkForPen(util);
        const curTarget = util.target;
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
        Scratch.vm.renderer.penPoint(
          Scratch.vm.renderer._penSkinId,
          attrib,
          x,
          y
        );
      }
      drawLine({ x1, y1, x2, y2 }, util) {
        checkForPen(util);
        const curTarget = util.target;
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
  
        Scratch.vm.renderer.penLine(
          Scratch.vm.renderer._penSkinId,
          attrib,
          x1,
          y1,
          x2,
          y2
        );
      }
      stampSprite({ sprite }) {
        const originalTarget = vm.runtime.getSpriteTargetByName(sprite);
        if (!originalTarget) {
          return;
        }
        runtime.ext_pen._stamp(originalTarget);
      }
  
      _getDefaultTriAttributes() {
        return [
          // U V  TINT R G B  Z W transparency U V  TINT R G B  Z W transparency U V  TINT R G B  Z W transparency
          0,
          0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
          1, 1,
        ];
      }
  
      _getDefaultSquareAttributes() {
        return [
          // width* height*  rotation  u-mul u     v-mul   v    r g b transparency
          1, 1, 90, 1, 0, 1, 0, 1, 1, 1, 1, 1,
        ];
      }
  
      //!Useless square blocks
      squareDown(arg, util) {
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
        checkForPen(util);
  
        //Make sure we have the triangle data updating accordingly
        bufferInfo.numElements = 6;
        this.trianglesDrawn += 2;
  
        const curTarget = util.target;
  
        //Get triangle attributes
        if (
          typeof this.squareAttributesOfAllSprites[curTarget.id] == "undefined"
        ) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        const myAttributes = this.squareAttributesOfAllSprites[curTarget.id];
  
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
        const penColor = attrib.color4f;
  
        //? get triangle attributes for current sprite.
        const spritex = curTarget.x;
        const spritey = curTarget.y;
  
        const width = attrib.diameter * myAttributes[0];
        const height = attrib.diameter * myAttributes[1];
  
        let inputInfo = {
          a_position: new Float32Array([
            width * -0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
          ]),
          a_color: new Float32Array([
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
  
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
          ]),
        };
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_position, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_color, gl.DYNAMIC_DRAW);
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(
          gl,
          penPlusShaders.untextured.ProgramInf,
          bufferInfo
        );
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
        gl.useProgram(penPlusShaders.untextured.ProgramInf.program);
  
        transform_Matrix[2] = spritex;
        transform_Matrix[3] = spritey;
  
        transform_Matrix[4] = Math.cos(myAttributes[2] * d2r);
        transform_Matrix[5] = Math.sin(myAttributes[2] * d2r);
  
        twgl.setUniforms(penPlusShaders.untextured.ProgramInf, {
          u_transform: transform_Matrix,
        });
  
        transform_Matrix[2] = 0;
        transform_Matrix[3] = 0;
  
        transform_Matrix[4] = 0;
        transform_Matrix[5] = 1;
  
        twgl.drawBufferInfo(gl, bufferInfo);
  
        bufferInfo.numElements = 3;
      }
      squareTexDown({ tex }, util) {
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
        checkForPen(util);
  
        //Make sure we have the triangle data updating accordingly
        bufferInfo.numElements = 6;
        this.trianglesDrawn += 2;
  
        const curTarget = util.target;
  
        //Get triangle attributes
        if (
          typeof this.squareAttributesOfAllSprites[curTarget.id] == "undefined"
        ) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        const myAttributes = this.squareAttributesOfAllSprites[curTarget.id];
  
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
  
        let currentTexture = this._locateTextureObject(tex, util);
        if (!currentTexture) return;
  
        //? get triangle attributes for current sprite.
        const spritex = curTarget.x;
        const spritey = curTarget.y;
  
        const width = attrib.diameter * myAttributes[0];
        const height = attrib.diameter * myAttributes[1];
  
        let inputInfo = {
          a_position: new Float32Array([
            width * -0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
          ]),
          a_color: new Float32Array([
            //Wow that was very cool
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
  
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
            myAttributes[7],
            myAttributes[8],
            myAttributes[9],
            myAttributes[10],
          ]),
          a_texCoord: new Float32Array([
            myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[6],
  
            myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[4],
            myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[6],
          ]),
        };
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_position, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_color, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texCoord.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_texCoord, gl.DYNAMIC_DRAW);
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(
          gl,
          penPlusShaders.textured.ProgramInf,
          bufferInfo
        );
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
        gl.useProgram(penPlusShaders.textured.ProgramInf.program);
  
        transform_Matrix[2] = spritex;
        transform_Matrix[3] = spritey;
  
        transform_Matrix[4] = Math.cos(myAttributes[2] * d2r);
        transform_Matrix[5] = Math.sin(myAttributes[2] * d2r);
  
        twgl.setUniforms(penPlusShaders.textured.ProgramInf, {
          u_transform: transform_Matrix,
          u_texture: currentTexture,
        });
  
        transform_Matrix[2] = 0;
        transform_Matrix[3] = 0;
  
        transform_Matrix[4] = 0;
        transform_Matrix[5] = 1;
  
        twgl.drawBufferInfo(gl, bufferInfo);
  
        bufferInfo.numElements = 3;
      }
      setStampAttribute({ target, number }, util) {
        const curTarget = util.target;
        if (!this.squareAttributesOfAllSprites[curTarget.id]) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        let valuetoSet = Scratch.Cast.toNumber(number);
  
        const attributeNum = Math.min(
          Math.max(Scratch.Cast.toNumber(target), 0),
          11
        );
  
        //Prevent it from setting the z to a color value;
        if (attributeNum >= 7 && attributeNum != 11) {
          this.squareAttributesOfAllSprites[curTarget.id][attributeNum] =
            Math.min(Math.max(valuetoSet, 0), 100) * 0.01;
          return;
        }
  
        this.squareAttributesOfAllSprites[curTarget.id][attributeNum] =
          valuetoSet;
      }
      getStampAttribute({ target }, util) {
        const curTarget = util.target;
        if (!this.squareAttributesOfAllSprites[curTarget.id]) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        return this.squareAttributesOfAllSprites[curTarget.id][
          Scratch.Cast.toNumber(target)
        ];
      }
      tintSquare({ color }, util) {
        const curTarget = util.target;
  
        if (!this.squareAttributesOfAllSprites[curTarget.id]) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        const calcColor = Scratch.Cast.toRgbColorObject(color);
  
        this.squareAttributesOfAllSprites[curTarget.id][7] = calcColor.r / 255;
        this.squareAttributesOfAllSprites[curTarget.id][8] = calcColor.g / 255;
        this.squareAttributesOfAllSprites[curTarget.id][9] = calcColor.b / 255;
      }
      resetSquareAttributes(args, util) {
        const curTarget = util.target;
        this.squareAttributesOfAllSprites[curTarget.id] =
          this._getDefaultSquareAttributes();
      }
  
      //?Triangle stuffs
      setTriangleFilterMode({ filter }) {
        currentFilter = filter;
      }
      setTrianglePointAttribute({ point, attribute, value }, util) {
        const trianglePointStart = (point - 1) * 8;
  
        const targetId = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetId]) {
          this.triangleAttributesOfAllSprites[targetId] =
            this._getDefaultTriAttributes();
        }
        this.attributeEditors.triangle(
          targetId,
          Scratch.Cast.toNumber(attribute),
          value,
          false,
          trianglePointStart
        );
      }
      setWholeTrianglePointAttribute({ wholeAttribute, value }, util) {
        const targetId = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetId]) {
          this.triangleAttributesOfAllSprites[targetId] =
            this._getDefaultTriAttributes();
        }
        this.attributeEditors.triangle(
          targetId,
          Scratch.Cast.toNumber(wholeAttribute),
          value,
          true,
          0
        );
      }
      tintTriPoint({ point, color }, util) {
        const trianglePointStart = (point - 1) * 8;
  
        const targetId = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetId]) {
          this.triangleAttributesOfAllSprites[targetId] =
            this._getDefaultTriAttributes();
        }
  
        const calcColor = Scratch.Cast.toRgbColorObject(color);
  
        this.attributeEditors.triangle(
          targetId,
          2,
          calcColor.r / 2.55,
          false,
          trianglePointStart
        );
  
        this.attributeEditors.triangle(
          targetId,
          3,
          calcColor.g / 2.55,
          false,
          trianglePointStart
        );
  
        this.attributeEditors.triangle(
          targetId,
          4,
          calcColor.b / 2.55,
          false,
          trianglePointStart
        );
      }
      tintTri({ point, color }, util) {
        const trianglePointStart = (point - 1) * 8;
  
        const targetId = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetId]) {
          this.triangleAttributesOfAllSprites[targetId] =
            this._getDefaultTriAttributes();
        }
  
        const calcColor = Scratch.Cast.toRgbColorObject(color);
  
        this.attributeEditors.triangle(
          targetId,
          2,
          calcColor.r / 2.55,
          true,
          trianglePointStart
        );
  
        this.attributeEditors.triangle(
          targetId,
          3,
          calcColor.g / 2.55,
          true,
          trianglePointStart
        );
  
        this.attributeEditors.triangle(
          targetId,
          4,
          calcColor.b / 2.55,
          true,
          trianglePointStart
        );
      }
      getTrianglePointAttribute({ point, attribute }, util) {
        const trianglePointStart = (point - 1) * 8;
  
        const targetId = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetId]) {
          this.triangleAttributesOfAllSprites[targetId] =
            this._getDefaultTriAttributes();
        }
        let value =
          this.triangleAttributesOfAllSprites[targetId][
            trianglePointStart + attribute
          ];
  
        if ((attribute >= 2 && attribute <= 4) || attribute == 7) {
          value *= 100;
        }
        return value;
      }
      resetWholeTriangleAttributes(args, util) {
        const targetId = util.target.id;
        this.triangleAttributesOfAllSprites[targetId] = [
          0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1,
          1, 1, 1,
        ];
      }
      drawSolidTri({ x1, y1, x2, y2, x3, y3 }, util) {
        const curTarget = util.target;
        checkForPen(util);
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
  
        if (!this.triangleAttributesOfAllSprites[curTarget.id]) {
          this.triangleAttributesOfAllSprites[curTarget.id] =
            this._getDefaultTriAttributes();
        }
  
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
  
        //if (this.triangleAttributesOfAllSprites[curTarget.id]) {
        //  this.triangleAttributesOfAllSprites[curTarget.id][5] = 1;
        //  this.triangleAttributesOfAllSprites[curTarget.id][13] = 1;
        //  this.triangleAttributesOfAllSprites[curTarget.id][21] = 1;
        //}
  
        //?Renderer Freaks out if we don't do this so do it.
  
        //Paratheses because I know some obscure browser will screw this up.
        x1 = Scratch.Cast.toNumber(x1);
        x2 = Scratch.Cast.toNumber(x2);
        x3 = Scratch.Cast.toNumber(x3);
  
        y1 = Scratch.Cast.toNumber(y1);
        y2 = Scratch.Cast.toNumber(y2);
        y3 = Scratch.Cast.toNumber(y3);
  
        this.renderFunctions.drawTri(
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          attrib.color4f,
          curTarget.id
        );
      }
      drawTexTri({ x1, y1, x2, y2, x3, y3, tex }, util) {
        const curTarget = util.target;
        let currentTexture = this._locateTextureObject(tex, util);
  
        //Triangle attributes
        if (!this.triangleAttributesOfAllSprites[curTarget.id]) {
          this.triangleAttributesOfAllSprites[curTarget.id] =
            this._getDefaultTriAttributes();
        }
  
        //Get the resolution
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
  
        //?Renderer Freaks out if we don't do this so do it.
  
        //Paratheses because I know some obscure browser will screw this up.
        x1 = Scratch.Cast.toNumber(x1);
        x2 = Scratch.Cast.toNumber(x2);
        x3 = Scratch.Cast.toNumber(x3);
  
        y1 = Scratch.Cast.toNumber(y1);
        y2 = Scratch.Cast.toNumber(y2);
        y3 = Scratch.Cast.toNumber(y3);
  
        if (currentTexture != null && typeof currentTexture != "undefined") {
          this.renderFunctions.drawTextTri(
            x1,
            y1,
            x2,
            y2,
            x3,
            y3,
            curTarget.id,
            currentTexture
          );
        }
      }
  
      //?Color Stuff
      RGB2HEX({ R, G, B }) {
        return this.colorLib.rgbtoSColor({ R: R, G: G, B: B });
      }
  
      HSV2RGB({ H, S, V }) {
        S = S / 100;
        V = V / 100;
        S = Math.min(Math.max(S, 0), 1);
        V = Math.min(Math.max(V, 0), 1);
        H = H % 360;
        const C = V * S;
        const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
        const M = V - C;
        let Primes = [0, 0, 0];
        if (H >= 0 && H < 60) {
          Primes[0] = C;
          Primes[1] = X;
        } else if (H >= 60 && H < 120) {
          Primes[0] = X;
          Primes[1] = C;
        } else if (H >= 120 && H < 180) {
          Primes[1] = C;
          Primes[2] = X;
        } else if (H >= 180 && H < 240) {
          Primes[1] = X;
          Primes[2] = C;
        } else if (H >= 240 && H < 300) {
          Primes[0] = X;
          Primes[2] = C;
        }
        if (H >= 300 && H < 360) {
          Primes[0] = C;
          Primes[2] = X;
        }
        Primes[0] = (Primes[0] + M) * 255;
        Primes[1] = (Primes[1] + M) * 255;
        Primes[2] = (Primes[2] + M) * 255;
        return this.colorLib.rgbtoSColor({
          R: Primes[0] / 2.55,
          G: Primes[1] / 2.55,
          B: Primes[2] / 2.55,
        });
      }
  
      //?Image/costume Api
      //? this block broke. Thus why it no longer has functionality.
      setDURIclampmode({ clampMode }) {
        return;
      }
  
      addBlankIMG({ color, width, height, name }) {
        //Just a simple thing to allow for pen drawing
        this.textureFunctions.createBlankPenPlusTextureInfo(
          width,
          height,
          color,
          this.prefixes.penPlusTextures + name
        );
      }
  
      addIMGfromDURI({ dataURI, name }) {
        //Just a simple thing to allow for pen drawing
        this.textureFunctions.createPenPlusTextureInfo(
          dataURI,
          this.prefixes.penPlusTextures + name
        );
      }
  
      removeIMGfromDURI({ name }, util) {
        //Just a simple thing to allow for pen drawing
        if (this.penPlusCostumeLibrary[this.prefixes.penPlusTextures + name]) {
          delete this.penPlusCostumeLibrary[this.prefixes.penPlusTextures + name];
        }
      }
  
      doesIMGexist({ name }, util) {
        //Just a simple thing to allow for pen drawing
        return (
          typeof this.penPlusCostumeLibrary[
            this.prefixes.penPlusTextures + name
          ] != "undefined"
        );
      }
  
      getCostumeDataURI({ costume }, util) {
        //Just a simple thing to allow for pen drawing
        const curTarget = util.target;
        const costIndex = curTarget.getCostumeIndexByName(
          Scratch.Cast.toString(costume)
        );
        if (costIndex >= 0) {
          const curCostume =
            curTarget.sprite.costumes[costIndex].asset.encodeDataURI();
          return curCostume || 0;
        }
      }
  
      getDimensionOf({ dimension, costume }, util) {
        //Just a simple thing to allow for pen drawing
        const costIndex = this.penPlusCostumeLibrary[costume];
        if (costIndex) {
          return costIndex[dimension] || "";
        }
      }
  
      setpixelcolor({ x, y, color, costume }) {
        const curCostume = this.penPlusCostumeLibrary[costume];
        if (curCostume) {
          const textureData = this.textureFunctions.getTextureData(
            curCostume.texture,
            curCostume.width,
            curCostume.height
          );
          if (textureData) {
            x = Math.floor(x - 1);
            y = Math.floor(y - 1);
            const colorIndex = (y * curCostume.width + x) * 4;
            if (
              textureData[colorIndex] != undefined &&
              x < curCostume.width &&
              x >= 0
            ) {
              const retColor = Scratch.Cast.toRgbColorObject(color);
              textureData[colorIndex] = retColor.r;
              textureData[colorIndex + 1] = retColor.g;
              textureData[colorIndex + 2] = retColor.b;
              textureData[colorIndex + 3] = 255;
  
              gl.bindTexture(gl.TEXTURE_2D, curCostume.texture);
              gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                curCostume.width,
                curCostume.height,
                0,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                textureData
              );
            }
          }
        }
      }
  
      getpixelcolor({ x, y, costume }) {
        const curCostume = this.penPlusCostumeLibrary[costume];
        if (curCostume) {
          const textureData = this.textureFunctions.getTextureData(
            curCostume.texture,
            curCostume.width,
            curCostume.height
          );
          if (textureData) {
            x = Math.floor(x - 1);
            y = Math.floor(y - 1);
            const colorIndex = (y * curCostume.width + x) * 4;
            if (textureData[colorIndex] && x < curCostume.width && x >= 0) {
              return (
                this.colorLib.rgbtoSColor({
                  R: textureData[colorIndex] / 2.55,
                  G: textureData[colorIndex + 1] / 2.55,
                  B: textureData[colorIndex + 2] / 2.55,
                }) || "0"
              );
            }
            return this.colorLib.rgbtoSColor({ R: 100, G: 100, B: 100 });
          }
        }
      }
  
      getPenPlusCostumeURI({ costume }) {
        const curCostume = this.penPlusCostumeLibrary[costume];
        if (curCostume) {
          const textureData = this.textureFunctions.getTextureAsURI(
            curCostume.texture,
            curCostume.width,
            curCostume.height
          );
          if (textureData) {
            return textureData || "";
          }
          return "";
        }
      }
  
      //?Neato
      clearDepth() {
        lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        //Pen+ Overrides default pen Clearing
        gl.bindFramebuffer(gl.FRAMEBUFFER, triBufferInfo.framebuffer);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
        renderer.dirty = true;
      }
  
      getPenPVersion() {
        return this.extensionVersion;
      }
  
      getTrianglesDrawn() {
        return this.trianglesDrawn;
      }
  
      turnAdvancedSettingOff({ Setting, onOrOff }) {
        if (onOrOff == "on") {
          this.AdvancedSettings[Setting] = true;
          return;
        }
        this.AdvancedSettings[Setting] = false;
      }
  
      setAdvancedOptionValueTo({ setting, value }) {
        switch (setting) {
          case "depthMax":
            this.AdvancedSettings._maxDepth = Math.max(value, 100);
            break;
  
          default:
            break;
        }
      }
  
      setPrefix({ prefix, value }) {
        //That simple
        this.prefixes[prefix] = value;
      }
  
      //People went crazy in the pen+ project forum. So here I am...
      //Please people don't do this again...
      __determineHostName() {
        let returnedURL = "project";
        const splitURL = window.location.hostname.split(".");
        if (splitURL.length > 2) {
          returnedURL = splitURL[1].toLowerCase();
          if (this.urlHandleTypes[returnedURL]) {
            //IF WE DO HAVE TO DO SOME SPECIAL HANDLING!
            const handleType = this.urlHandleTypes[returnedURL].handle;
            switch (typeof handleType) {
              //If it is a number we get the split number.
              case "number":
                returnedURL = splitURL[handleType];
                break;
  
              //If it is a string use the string
              case "string":
                returnedURL = handleType;
                break;
  
              //If it is a function we run the function.
              case "function":
                returnedURL = handleType(window.location.href);
                break;
            }
          }
        } else {
          returnedURL = splitURL[0];
        }
  
        return returnedURL;
      }
  
      //?Custom Shaders
      async openShaderEditor() {
        //Handle experimental versions
        const frameSource =
          "https://pen-group.github.io/penPlus-shader-editor/Source/" +
          (this.isExperimental ? "?experimental=true" : "");
  
        if (!(await Scratch.canEmbed(frameSource))) {
          return;
        }
  
        //Styling the background and IFrame
        const bgFade = document.createElement("div");
        bgFade.style.width = "100%";
        bgFade.style.height = "100%";
  
        bgFade.style.position = "absolute";
        bgFade.style.left = "0px";
        bgFade.style.top = "0px";
  
        bgFade.style.backgroundColor = this.fade;
        bgFade.style.filter = "opacity(100%)";
  
        bgFade.style.zIndex = "10000";
  
        document.body.appendChild(bgFade);
  
        this.IFrame = document.createElement("iframe");
        this.IFrame.style.backgroundColor = this._menuBarBackground;
        this.IFrame.style.width = "80%";
        this.IFrame.style.height = "80%";
        this.IFrame.style.borderRadius = "8px";
        this.IFrame.style.borderColor = this._shadowBorder;
        this.IFrame.style.borderWidth = "4px";
        this.IFrame.style.borderStyle = "solid";
  
        this.IFrame.style.position = "absolute";
        this.IFrame.style.left = "10%";
        this.IFrame.style.top = "10%";
  
        this.IFrame.style.zIndex = "10001";
  
        //Determine the Set up the initial variables
        this.IFrame.onload = () => {
          let hostname = this.__determineHostName();
  
          this.IFrame.contentWindow.postMessage(
            {
              type: "REGISTER_PARENT",
              exitButton: true,
              importText: `Import from ${hostname.replace(
                /\w\S*/g,
                function (txt) {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                }
              )}`,
              exportText: `Export to ${hostname.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              })}`,
            },
            //Target URL
            this.IFrame.src
          );
        };
  
        this.IFrame.closeIframe = () => {
          document.body.style.overflowY = "hidden";
  
          this.IFrame.animate(animationKeyframes.close.IFRAME, 1000);
          bgFade.animate(animationKeyframes.close.BG, 1000);
  
          //Can't get animationend to work.
          setTimeout(() => {
            document.body.removeChild(this.IFrame);
            document.body.removeChild(bgFade);
          }, 1000);
        };
  
        this.IFrame.src = frameSource;
  
        //Popup animation
        document.body.style.overflowY = "hidden";
        this.IFrame.animate(animationKeyframes.open.IFRAME, 1000);
        bgFade.animate(animationKeyframes.open.BG, 1000);
  
        //Add the IFrame to the body
        document.body.appendChild(this.IFrame);
      }
  
      //?Shader blocks
      drawShaderTri({ shader, x1, y1, x2, y2, x3, y3 }, util) {
        if (!this.programs[shader]) return;
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
        //Safe to assume they have a buffer;
        const buffer = this.programs[shader].buffer;
  
        this.trianglesDrawn += 1;
  
        const targetID = util.target.id;
  
        if (!this.triangleAttributesOfAllSprites[targetID]) {
          this.triangleAttributesOfAllSprites[targetID] =
            this._getDefaultTriAttributes();
        }
  
        //? get triangle attributes for current sprite.
        const triAttribs = this.triangleAttributesOfAllSprites[targetID];
  
        let inputInfo = JSON.parse(
          JSON.stringify(this.programs[shader].attribDat)
        );
  
        if (triAttribs) {
          //Just for our eyes sakes
          // prettier-ignore
          inputInfo.a_position = {
              data: [
                x1, -y1, triAttribs[5], triAttribs[6],
                x2, -y2, triAttribs[13], triAttribs[14],
                x3, -y3, triAttribs[21], triAttribs[22]
              ]
            }
          // prettier-ignore
          inputInfo.a_color = {
              data: [
                triAttribs[2], triAttribs[3], triAttribs[4], triAttribs[7],
                triAttribs[10], triAttribs[11], triAttribs[12], triAttribs[15],
                triAttribs[18], triAttribs[19], triAttribs[20], triAttribs[23]
              ]
            }
          // prettier-ignore
          inputInfo.a_texCoord = {
              data: [
                triAttribs[0], triAttribs[1],
                triAttribs[8], triAttribs[9],
                triAttribs[16], triAttribs[17]
              ]
            }
        } else {
          //Just for our eyes sakes
          // prettier-ignore
          inputInfo.a_position = {
              data: [
                x1, y1, 1, 1,
                x2, y2, 1, 1,
                x3, y3, 1, 1
              ]
            }
          // prettier-ignore
          inputInfo.a_color = {
              data: [
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1
              ]
            }
          // prettier-ignore
          inputInfo.a_texCoord = {
              data: [
                0, 0,
                0, 1,
                1, 1
              ]
            }
        }
  
        const keys = Object.keys(inputInfo);
  
        keys.forEach((key) => {
          if (!buffer.attribs[key]) return;
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer.attribs[key].buffer);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(inputInfo[key].data),
            gl.DYNAMIC_DRAW
          );
        });
  
        gl.useProgram(this.programs[shader].info.program);
  
        //Just use the real scratch timer.
        this.programs[shader].uniformDat.u_timer =
          runtime.ioDevices.clock.projectTimer();
        this.programs[shader].uniformDat.u_transform = transform_Matrix;
        this.programs[shader].uniformDat.u_res = [
          this.currentRenderTexture.width,
          this.currentRenderTexture.height,
        ];
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(gl, this.programs[shader].info, buffer);
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        twgl.setUniforms(
          this.programs[shader].info,
          this.programs[shader].uniformDat
        );
  
        twgl.drawBufferInfo(gl, bufferInfo);
      }
  
      drawShaderSquare({ shader }, util) {
        if (!this.programs[shader]) return;
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
        checkForPen(util);
  
        //Safe to assume they have a buffer;
        const buffer = this.programs[shader].buffer;
  
        //Make sure we have the triangle data updating accordingly
        buffer.numElements = 6;
        this.trianglesDrawn += 2;
  
        const curTarget = util.target;
  
        //Get triangle attributes
        if (
          typeof this.squareAttributesOfAllSprites[curTarget.id] == "undefined"
        ) {
          this.squareAttributesOfAllSprites[curTarget.id] =
            this._getDefaultSquareAttributes();
        }
  
        const myAttributes = this.squareAttributesOfAllSprites[curTarget.id];
  
        const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
        const penColor = attrib.color4f;
  
        //? get triangle attributes for current sprite.
        const spritex = curTarget.x;
        const spritey = curTarget.y;
  
        const width = attrib.diameter * myAttributes[0];
        const height = attrib.diameter * myAttributes[1];
  
        let inputInfo = {
          a_position: new Float32Array([
            width * -0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * 0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * -0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
  
            width * 0.5,
            height * -0.5,
            myAttributes[11],
            myAttributes[11],
          ]),
          a_color: new Float32Array([
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
  
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
            penColor[0] * myAttributes[7],
            penColor[1] * myAttributes[8],
            penColor[2] * myAttributes[9],
            penColor[3] * myAttributes[10],
          ]),
          a_texCoord: new Float32Array([
            myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[6],
  
            myAttributes[4],
            myAttributes[5] + myAttributes[6],
            myAttributes[4],
            myAttributes[6],
            myAttributes[3] + myAttributes[4],
            myAttributes[6],
          ]),
        };
  
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.attribs.a_position.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_position, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.attribs.a_color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_color, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.attribs.a_texCoord.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, inputInfo.a_texCoord, gl.DYNAMIC_DRAW);
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.useProgram(this.programs[shader].info.program);
  
        //Just use the real scratch timer.
        this.programs[shader].uniformDat.u_timer =
          runtime.ioDevices.clock.projectTimer();
        this.programs[shader].uniformDat.u_transform = transform_Matrix;
        this.programs[shader].uniformDat.u_res = [
          this.currentRenderTexture.width,
          this.currentRenderTexture.height,
        ];
  
        transform_Matrix[2] = spritex;
        transform_Matrix[3] = spritey;
  
        transform_Matrix[4] = Math.cos(myAttributes[2] * d2r);
        transform_Matrix[5] = Math.sin(myAttributes[2] * d2r);
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(gl, this.programs[shader].info, buffer);
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        twgl.setUniforms(
          this.programs[shader].info,
          this.programs[shader].uniformDat
        );
  
        transform_Matrix[2] = 0;
        transform_Matrix[3] = 0;
  
        transform_Matrix[4] = 0;
        transform_Matrix[5] = 1;
  
        twgl.drawBufferInfo(gl, buffer);
  
        buffer.numElements = 3;
      }
  
      setTextureInShader({ uniformName, shader, texture }, util) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
  
        let curCostume = this._locateTextureObject(texture, util);
        if (!curCostume) return;
  
        this.programs[shader].uniformDat[uniformName] = curCostume;
      }
  
      setNumberInShader({ uniformName, shader, number }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        this.programs[shader].uniformDat[uniformName] = number;
      }
  
      setVec2InShader({ uniformName, shader, numberX, numberY }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        this.programs[shader].uniformDat[uniformName] = [numberX, numberY];
      }
  
      setVec3InShader({ uniformName, shader, numberX, numberY, numberZ }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        this.programs[shader].uniformDat[uniformName] = [
          numberX,
          numberY,
          numberZ,
        ];
      }
  
      setVec4InShader({
        uniformName,
        shader,
        numberX,
        numberY,
        numberZ,
        numberW,
      }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        this.programs[shader].uniformDat[uniformName] = [
          numberX,
          numberY,
          numberZ,
          numberW,
        ];
      }
  
      setMatrixInShader({ uniformName, shader, list }, util) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        let listOBJ = this._getVarObjectFromName(list, util, "list").value;
        let converted = listOBJ.map(function (str) {
          return parseFloat(str);
        });
  
        this.programs[shader].uniformDat[uniformName] = converted;
      }
  
      setMatrixInShaderArray({ uniformName, shader, array }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        let converted = JSON.parse(array);
        //Make sure its an array
        if (!Array.isArray(converted)) return;
        converted = converted.map(function (str) {
          return parseInt(str);
        });
  
        this.programs[shader].uniformDat[uniformName] = converted;
      }
  
      setCubeInShader({ uniformName, shader, cubemap }) {
        if (!this.programs[shader]) return;
        if (this._isUniformArray(shader, uniformName)) return;
        if (!this.penPlusCubemap[cubemap]) return;
        this.programs[shader].uniformDat[uniformName] =
          this.penPlusCubemap[cubemap];
      }
  
      getNumberInShader({ uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (this._isUniformArray(shader, uniformName)) return 0;
        if (!this.programs[shader].uniformDat[uniformName]) return 0;
        return this.programs[shader].uniformDat[uniformName];
      }
  
      getVec2InShader({ component, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (this._isUniformArray(shader, uniformName)) return 0;
        if (!this.programs[shader].uniformDat[uniformName]) return 0;
        if (!this.programs[shader].uniformDat[uniformName][component]) return 0;
        return this.programs[shader].uniformDat[uniformName][component];
      }
  
      getVec3InShader({ component, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (this._isUniformArray(shader, uniformName)) return 0;
        if (!this.programs[shader].uniformDat[uniformName]) return 0;
        if (!this.programs[shader].uniformDat[uniformName][component]) return 0;
        return this.programs[shader].uniformDat[uniformName][component];
      }
  
      getVec4InShader({ component, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (this._isUniformArray(shader, uniformName)) return 0;
        if (!this.programs[shader].uniformDat[uniformName]) return 0;
        if (!this.programs[shader].uniformDat[uniformName][component]) return 0;
        return this.programs[shader].uniformDat[uniformName][component];
      }
  
      getMatrixInShader({ uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (this._isUniformArray(shader, uniformName)) return 0;
        if (!this.programs[shader].uniformDat[uniformName]) return 0;
        return JSON.stringify(this.programs[shader].uniformDat[uniformName]);
      }
  
      getTextureInShader({ uniformName, shader }, util) {
        if (!this.programs[shader]) return "";
        if (this._isUniformArray(shader, uniformName)) return "";
        if (!this.programs[shader].uniformDat[uniformName]) return "";
        const text = this.programs[shader].uniformDat[uniformName];
        let foundValue = Object.keys(this.penPlusCostumeLibrary).find(
          (key) => this.penPlusCostumeLibrary[key] === text
        );
        //if we cannot find it in the pen+ library look for it in the scratch costume library
        if (!foundValue) {
          const curCostumes = util.target.sprite.costumes;
          if (!curCostumes) return "";
          for (let costumeID = 0; costumeID < curCostumes.length; costumeID++) {
            const costume = curCostumes[costumeID];
  
            if (costume != util.target.currentCostume) {
              util.target.setCostume(costume);
            }
  
            const texture = renderer._allSkins[costume.skinId].getTexture();
  
            if (texture !== text) return costume.name;
          }
        }
        return foundValue;
      }
  
      getCubemapInShader({ uniformName, shader }) {
        if (!this.programs[shader]) return "";
        if (this._isUniformArray(shader, uniformName)) return "";
        if (!this.programs[shader].uniformDat[uniformName]) return "";
        const text = this.programs[shader].uniformDat[uniformName];
        return Object.keys(this.penPlusCubemap).find(
          (key) => this.penPlusCubemap[key] === text
        );
      }
  
      _isUniformArray(shader, uniformName) {
        if (!this.programs[shader]) return false;
        if (!this.programs[shader].uniformDec[uniformName]) return false;
        if (!this.programs[shader].uniformDec[uniformName].isArray) return false;
        return true;
      }
  
      //For arrays!
      setArrayNumberInShader({ item, uniformName, shader, number }) {
        if (!this.programs[shader]) return;
        if (!this._isUniformArray(shader, uniformName)) return;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return;
        item = item - 1;
        this.programs[shader].uniformDat[uniformName][item] = number;
      }
  
      setArrayVec2InShader({ item, uniformName, shader, numberX, numberY }) {
        if (!this.programs[shader]) return;
        if (!this._isUniformArray(shader, uniformName)) return;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return;
        item -= (item - 1) * 2;
        this.programs[shader].uniformDat[uniformName][item] = numberX;
        this.programs[shader].uniformDat[uniformName][item + 1] = numberY;
      }
  
      setArrayVec3InShader({
        item,
        uniformName,
        shader,
        numberX,
        numberY,
        numberZ,
      }) {
        if (!this.programs[shader]) return;
        if (!this._isUniformArray(shader, uniformName)) return;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return;
        item = (item - 1) * 3;
        this.programs[shader].uniformDat[uniformName][item] = numberX;
        this.programs[shader].uniformDat[uniformName][item + 1] = numberY;
        this.programs[shader].uniformDat[uniformName][item + 2] = numberZ;
      }
  
      setArrayVec4InShader({
        item,
        uniformName,
        shader,
        numberX,
        numberY,
        numberZ,
        numberW,
      }) {
        if (!this.programs[shader]) return;
        if (!this._isUniformArray(shader, uniformName)) return;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return;
        item = (item - 1) * 4;
        this.programs[shader].uniformDat[uniformName][item] = numberX;
        this.programs[shader].uniformDat[uniformName][item + 1] = numberY;
        this.programs[shader].uniformDat[uniformName][item + 2] = numberZ;
        this.programs[shader].uniformDat[uniformName][item + 3] = numberW;
      }
  
      getArrayNumberInShader({ item, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (!this._isUniformArray(shader, uniformName)) return 0;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return "";
        item -= 1;
        return this.programs[shader].uniformDat[uniformName][item];
      }
  
      getArrayVec2InShader({ item, component, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (!this._isUniformArray(shader, uniformName)) return 0;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return "";
        item = (item - 1) * 2;
        return (
          this.programs[shader].uniformDat[uniformName][item + component] || 0
        );
      }
  
      getArrayVec3InShader({ item, component, uniformName, shader }) {
        if (!this.programs[shader]) return 0;
        if (!this._isUniformArray(shader, uniformName)) return 0;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return "";
        item = (item - 1) * 3;
        return (
          this.programs[shader].uniformDat[uniformName][item + component] || 0
        );
      }
  
      getArrayVec4InShader({ item, component, uniformName, shader }) {
        if (!this.programs[shader]) return;
        if (!this._isUniformArray(shader, uniformName)) return 0;
        if (
          item < 1 ||
          item > this.programs[shader].uniformDec[uniformName].arrayLength
        )
          return "";
        item = (item - 1) * 4;
        return (
          this.programs[shader].uniformDat[uniformName][item + component] || 0
        );
      }
  
      //Attributes
      setNumberAttributeInShader({ attributeName, pointID, shader, number }) {
        if (!this.programs[shader]) return;
        if (!this.programs[shader].attribDat[attributeName]) return;
  
        //Get the type and make sure its the desired one
        let type = this.programs[shader].attribDat[attributeName].type;
        if (!(type == "int" || type == "float")) return;
  
        //If the attribute is an integer force it to be one
        if (type == "int") number = Math.floor(number);
  
        //Set the data in the array
        this.programs[shader].attribDat[attributeName].data[pointID - 1] = number;
      }
  
      setVec2AttributeInShader({
        attributeName,
        pointID,
        shader,
        numberX,
        numberY,
      }) {
        if (!this.programs[shader]) return;
        if (!this.programs[shader].attribDat[attributeName]) return;
  
        //Get the type and make sure its the desired one
        let type = this.programs[shader].attribDat[attributeName].type;
        if (!(type == "vec2")) return;
  
        pointID -= 1;
        pointID *= 2;
  
        //Set the data in the array
        this.programs[shader].attribDat[attributeName].data[pointID] = numberX;
        this.programs[shader].attribDat[attributeName].data[pointID + 1] =
          numberY;
      }
  
      setVec3AttributeInShader({
        attributeName,
        pointID,
        shader,
        numberX,
        numberY,
        numberZ,
      }) {
        if (!this.programs[shader]) return;
        if (!this.programs[shader].attribDat[attributeName]) return;
  
        //Get the type and make sure its the desired one
        let type = this.programs[shader].attribDat[attributeName].type;
        if (!(type == "vec3")) return;
  
        pointID -= 1;
        pointID *= 3;
  
        //Set the data in the array
        this.programs[shader].attribDat[attributeName].data[pointID] = numberX;
        this.programs[shader].attribDat[attributeName].data[pointID + 1] =
          numberY;
        this.programs[shader].attribDat[attributeName].data[pointID + 2] =
          numberZ;
      }
  
      setVec4AttributeInShader({
        attributeName,
        pointID,
        shader,
        numberX,
        numberY,
        numberZ,
        numberW,
      }) {
        if (!this.programs[shader]) return;
        if (!this.programs[shader].attribDat[attributeName]) return;
  
        //Get the type and make sure its the desired one
        let type = this.programs[shader].attribDat[attributeName].type;
        if (!(type == "vec4")) return;
  
        pointID -= 1;
        pointID *= 4;
  
        //Set the data in the array
        this.programs[shader].attribDat[attributeName].data[pointID] = numberX;
        this.programs[shader].attribDat[attributeName].data[pointID + 1] =
          numberY;
        this.programs[shader].attribDat[attributeName].data[pointID + 2] =
          numberZ;
        this.programs[shader].attribDat[attributeName].data[pointID + 3] =
          numberW;
      }
  
      /* MESSAGE FOR MOD DEVELOPERS */
      //Doing this just because the penguinmod UI doesn't have this sort of stuff and I'm feeling nice today.
      //Don't bother me with this stuff in the future.
      //I cannot support every mod under the sun.
      //if you want support in the future make a couple of variables
      // --ui-modal-overlay --> your menu overlay color including transparency
      // --menu-bar-background --> your menu colors
      _handlePMvsEM(variableName) {
        switch (variableName) {
          case "--menu-bar-background":
            return Scratch.extensions.isElectraMod
              ? "var(--menu-bar-background, hsla(244, 23%, 48%, 1))"
              : "var(--menu-bar-background, #009CCC)";
  
          case "--ui-modal-overlay":
            return Scratch.extensions.isElectraMod
              ? "var(--ui-modal-overlay, hsla(244, 23%, 48%, 0.9))"
              : "var(--ui-modal-overlay, hsla(194, 100%, 65%, 0.9))";
  
          default:
            break;
        }
      }
  
      //! HEED THY WARNING LOTS OF JAVASCRIPT BASED HTML AHEAD !//
      //Modal themes
      _setupTheme() {
        //Use a predefined pen+ theme if packaged
        if (typeof scaffolding !== "undefined") {
          this._menuBarBackground = "#0FBD8C";
          this._defaultBackgroundColor = "white";
          this._textColor = "black";
          this._buttonShadow = "hsla(0, 0%, 0%, 0.15)";
          this.fade = "#0FBD8CDD";
          this._shadowBorder = "hsla(0, 100%, 100%, 0.25)";
          return;
        }
  
        //Also if this looks bad it's due to prettier
        //I support friendly competition!
        this._menuBarBackground = Scratch.extensions.isPenguinMod
          ? //This is penguinmod blue
            this._handlePMvsEM("--menu-bar-background")
          : //Turbowarp
            "var(--menu-bar-background)";
  
        //Of course due to the GUI version differences I need to conduct some checks on these
        this._defaultBackgroundColor = Scratch.extensions.isPenguinMod
          ? //Wierd old turbowarp vm thingy right here
            document.body.getAttribute("theme") == "dark"
            ? "var(--ui-primary)"
            : "white"
          : //New accent stuff me likey.
            "var(--ui-modal-background)";
  
        //But in general its fine
        this._textColor = Scratch.extensions.isPenguinMod
          ? document.body.getAttribute("theme") == "dark"
            ? "white"
            : "black"
          : //Again with the accents. Me likey
            "var(--ui-modal-foreground)";
  
        this._buttonShadow = Scratch.extensions.isPenguinMod
          ? "hsla(0, 0%, 0%, 0.15)"
          : "var(--ui-black-transparent)";
  
        this.fade = this._handlePMvsEM("--ui-modal-overlay");
  
        this._shadowBorder = Scratch.extensions.isPenguinMod
          ? "hsla(0, 100%, 100%, 0.25)"
          : "var(--ui-white-transparent)";
      }
  
      //Just a helper function so the main one isn't too cluttered
      _shaderManagerModal() {
        const bgFade = document.createElement("div");
        bgFade.style.width = "100%";
        bgFade.style.height = "100%";
  
        bgFade.style.position = "absolute";
        bgFade.style.left = "0px";
        bgFade.style.top = "0px";
  
        bgFade.style.backgroundColor = this.fade;
  
        bgFade.style.zIndex = "10001";
  
        document.body.appendChild(bgFade);
  
        /*
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⢀⡔⣻⠁⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢀⣾⠳⢶⣦⠤⣀⠀⠀⠀⠀⠀⠀⠀⣾⢀⡇⡴⠋⣀⠴⣊⣩⣤⠶⠞⢹⣄⠀⠀⠀
    ⠀⠀⠀⠀⢸⠀⠀⢠⠈⠙⠢⣙⠲⢤⠤⠤⠀⠒⠳⡄⣿⢀⠾⠓⢋⠅⠛⠉⠉⠝⠀⠼⠀⠀⠀
    ⠀⠀⠀⠀⢸⠀⢰⡀⠁⠀⠀⠈⠑⠦⡀⠀⠀⠀⠀⠈⠺⢿⣂⠀⠉⠐⠲⡤⣄⢉⠝⢸⠀⠀⠀
    ⠀⠀⠀⠀⢸⠀⢀⡹⠆⠀⠀⠀⠀⡠⠃⠀⠀⠀⠀⠀⠀⠀⠉⠙⠲⣄⠀⠀⠙⣷⡄⢸⠀⠀⠀
    ⠀⠀⠀⠀⢸⡀⠙⠂⢠⠀⠀⡠⠊⠀⠀⠀⠀⢠⠀⠀⠀⠀⠘⠄⠀⠀⠑⢦⣔⠀⢡⡸⠀⠀⠀
    ⠀⠀⠀⠀⢀⣧⠀⢀⡧⣴⠯⡀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⢸⡠⠔⠈⠁⠙⡗⡤⣷⡀⠀⠀
    ⠀⠀⠀⠀⡜⠈⠚⠁⣬⠓⠒⢼⠅⠀⠀⠀⣠⡇⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⡀⢹⠀⠸⡄⠀⠀
    ⠀⠀⠀⡸⠀⠀⠀⠘⢸⢀⠐⢃⠀⠀⠀⡰⠋⡇⠀⠀⠀⢠⠀⠀⡿⣆⠀⠀⣧⡈⡇⠆⢻⠀⠀
    ⠀⠀⢰⠃⠀⠀⢀⡇⠼⠉⠀⢸⡤⠤⣶⡖⠒⠺⢄⡀⢀⠎⡆⣸⣥⠬⠧⢴⣿⠉⠁⠸⡀⣇⠀
    ⠀⠀⠇⠀⠀⠀⢸⠀⠀⠀⣰⠋⠀⢸⣿⣿⠀⠀⠀⠙⢧⡴⢹⣿⣿⠀⠀⠀⠈⣆⠀⠀⢧⢹⡄
    ⠀⣸⠀⢠⠀⠀⢸⡀⠀⠀⢻⡀⠀⢸⣿⣿⠀⠀⠀⠀⡼⣇⢸⣿⣿⠀⠀⠀⢀⠏⠀⠀⢸⠀⠇
    ⠀⠓⠈⢃⠀⠀⠀⡇⠀⠀⠀⣗⠦⣀⣿⡇⠀⣀⠤⠊⠀⠈⠺⢿⣃⣀⠤⠔⢸⠀⠀⠀⣼⠑⢼
    ⠀⠀⠀⢸⡀⣀⣾⣷⡀⠀⢸⣯⣦⡀⠀⠀⠀⢇⣀⣀⠐⠦⣀⠘⠀⠀⢀⣰⣿⣄⠀⠀⡟⠀⠀
    ⠀⠀⠀⠀⠛⠁⣿⣿⣧⠀⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⣿⡿⠈⠢⣼⡇⠀⠀           Bryunyeuuuuuu
    ⠀⠀⠀⠀⠀⠀⠈⠁⠈⠻⠈⢻⡿⠉⣿⠿⠛⡇⠒⠒⢲⠺⢿⣿⣿⠉⠻⡿⠁⠀⠀⠈⠁⠀⠀          Smooth criminal
    ⢀⠤⠒⠦⡀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠉⠆⠀⠀⠉⠉⠉⠀⠀⡝⣍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⡎⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⡰⠋⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⢡⠈⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⡇⠀⠀⠸⠁⠀⠀⠀⠀⢀⠜⠁⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠘⡄⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀
    ⡇⠀⠀⢠⠀⠀⠀⠀⠠⣯⣀⠀⠀⠀⡰⡇⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⢀⡦⠤⢄⡀⠀⠀⠀⠀
    ⢱⡀⠀⠈⠳⢤⣠⠖⠋⠛⠛⢷⣄⢠⣷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⡾⢳⠃⠀⠀⠘⢇⠀⠀⠀
    ⠀⠙⢦⡀⠀⢠⠁⠀⠀⠀⠀⠀⠙⣿⣏⣀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣧⡃⠀⠀⠀⠀⣸⠀⠀⠀
    ⠀⠀⠀⠈⠉⢺⣄⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⣤⣀⣠⡾⠃⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠣⢅⡤⣀⣀⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠉⠉⠉⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠀⠉⣿⣿⣿⣿⣿⡿⠻⣿⣿⣿⣿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠀⠀⠀⠀⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣟⠀⠀⢠⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⠀⠀⢸⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡏⠀⠀⢸⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠀⠀⠀⢺⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠈⠉⠻⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀
          */
        const shaderManager = document.createElement("div");
  
        //Create our menu modal
        shaderManager.style.backgroundColor = this._menuBarBackground;
        shaderManager.style.width = "50%";
        shaderManager.style.height = "50%";
        shaderManager.style.position = "relative";
        shaderManager.style.top = "50%";
        shaderManager.style.left = "50%";
        shaderManager.style.borderRadius = "8px";
        shaderManager.style.borderColor = this._shadowBorder;
        shaderManager.style.borderWidth = "4px";
        shaderManager.style.borderStyle = "solid";
        shaderManager.style.aspectRatio = "5/3";
        shaderManager.style.transform = "translate(-50%,25%)";
        shaderManager.style.zIndex = "10002";
  
        //!DONT FORGET THIS IS HERE
        shaderManager.style.textAlign = "center";
  
        shaderManager.style.color = "#ffffff";
  
        document.body.appendChild(shaderManager);
  
        //This is the text that shows up on-top of the modal
        const topText = document.createElement("div");
  
        topText.style.width = "100%";
        topText.style.height = "48px";
        topText.style.top = "0px";
        topText.style.left = "0px";
        topText.style.position = "absolute";
        topText.style.transform = "translate(0%,12px)";
  
        topText.style.fontSize = "24px";
  
        topText.textContent = "Shader Manager";
  
        shaderManager.appendChild(topText);
  
        //Then we have the inner panel. Where most of the ui goes
        const shaderPanel = document.createElement("div");
  
        shaderPanel.style.backgroundColor = this._defaultBackgroundColor;
        shaderPanel.style.width = "100%";
        shaderPanel.style.height = "calc(100% - 48px)";
        shaderPanel.style.position = "absolute";
        shaderPanel.style.top = "48px";
        shaderPanel.style.left = "0%";
        shaderPanel.style.borderBottomLeftRadius = "4px";
        shaderPanel.style.borderBottomRightRadius = "4px";
  
        shaderManager.appendChild(shaderPanel);
  
        //The actual container no filter to avoid buggy things
        const closeMenu = document.createElement("div");
  
        closeMenu.style.width = "1.75rem";
        closeMenu.style.height = "1.75rem";
        closeMenu.style.backgroundColor = this._buttonShadow;
        closeMenu.style.position = "absolute";
        closeMenu.style.left = "calc(100% - 2rem)";
        closeMenu.style.top = "0.25rem";
        closeMenu.style.borderRadius = "50%";
        closeMenu.style.alignItems = "center";
        closeMenu.style.justifyContent = "center";
        closeMenu.style.display = "flex";
        closeMenu.style.cursor = "pointer";
        closeMenu.style.transition = "all 0.15s ease-out";
        closeMenu.style.transform = "translate(-50%,25%)";
  
        //Animation stuffs
        closeMenu.onmouseenter = () => {
          closeMenu.style.transform = "translate(-50%,25%) scale(1.1,1.1)";
        };
  
        //More animation
        closeMenu.onmouseleave = () => {
          closeMenu.style.transform = "translate(-50%,25%) scale(1,1)";
        };
  
        //Just the close button
        closeMenu.onclick = () => {
          document.body.removeChild(bgFade);
          document.body.removeChild(shaderManager);
        };
  
        shaderManager.appendChild(closeMenu);
  
        //The close button for the menu
        const xImage = document.createElement("img");
        xImage.src =
          "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==";
  
        xImage.style.width = "0.75rem";
        xImage.style.height = "0.75rem";
        xImage.style.margin = "0.25rem";
        xImage.style.transform = "rotate(45deg)";
  
        closeMenu.appendChild(xImage);
  
        return {
          shaderPanel: shaderPanel,
          closeFunc: () => {
            document.body.removeChild(bgFade);
            document.body.removeChild(shaderManager);
          },
          resizeFunc: (width, height) => {
            shaderManager.style.aspectRatio = width + "/" + height;
            shaderManager.style.width = width > height ? "auto" : width + "%";
            shaderManager.style.height = height >= width ? "auto" : height + "%";
          },
          nameFunc: (name) => {
            topText.textContent = name;
          },
        };
      }
  
      //Then this decides the contents of said modal while gathering some info
      openShaderManager(reason) {
        const { shaderPanel, closeFunc, resizeFunc } = this._shaderManagerModal();
  
        //If we don't have a reason assign a default value
        reason = reason || "manager";
  
        //penguin one liner support
        //for some reason it sends the entire workspace when a button is clicked?
        if (Scratch.extensions.isPenguinMod && typeof reason != "string")
          reason = "manager";
  
        //Since I'm using a switch we do this.
        let menuSpecificVars = {};
  
        switch (reason) {
          case "save":
            //The neat background color. Using a filter to limit the amount of colouring operations
            menuSpecificVars.savePanel = document.createElement("div");
  
            menuSpecificVars.savePanel.style.width = "60%";
            menuSpecificVars.savePanel.style.height = "100%";
            menuSpecificVars.savePanel.style.backgroundColor =
              this._menuBarBackground;
            menuSpecificVars.savePanel.style.filter = "opacity(50%)";
            menuSpecificVars.savePanel.style.position = "absolute";
  
            shaderPanel.appendChild(menuSpecificVars.savePanel);
  
            //The actual container no filter to avoid buggy things
            menuSpecificVars.saveStuffHolder = document.createElement("div");
  
            menuSpecificVars.saveStuffHolder.style.width = "60%";
            menuSpecificVars.saveStuffHolder.style.height = "100%";
            menuSpecificVars.saveStuffHolder.style.backgroundColor = "#00000000";
            menuSpecificVars.saveStuffHolder.style.position = "absolute";
  
            shaderPanel.appendChild(menuSpecificVars.saveStuffHolder);
  
            //A whole lotta hub jubba for the input box. Though I want it to be supported natively even in a non GUI enviornment
            menuSpecificVars.shadername = document.createElement("input");
            menuSpecificVars.shadername.type = "text";
            menuSpecificVars.shadername.style.backgroundColor =
              this._defaultBackgroundColor;
            menuSpecificVars.shadername.style.fontSize = "1rem";
            menuSpecificVars.shadername.style.fontWeight = "bold";
            menuSpecificVars.shadername.style.borderRadius = "4px";
            menuSpecificVars.shadername.style.borderWidth = "1px";
            menuSpecificVars.shadername.style.borderStyle = "solid";
            menuSpecificVars.shadername.style.borderColor = "#404040";
            menuSpecificVars.shadername.style.color = "#ffffff";
            menuSpecificVars.shadername.style.position = "absolute";
            menuSpecificVars.shadername.style.top = "10%";
            menuSpecificVars.shadername.style.left = "50%";
            menuSpecificVars.shadername.style.transform = "translate(-50%,0%)";
            menuSpecificVars.shadername.style.height = "2rem";
            menuSpecificVars.shadername.style.color = this._textColor;
            menuSpecificVars.shadername.style.zIndex = "10005";
            menuSpecificVars.shadername.maxLength = 20;
  
            menuSpecificVars.shadername.placeholder = "Shader Name";
  
            //I dunno why prettier feels the need to do this. I feel like it makes it more unreadable.
            menuSpecificVars.saveStuffHolder.appendChild(
              menuSpecificVars.shadername
            );
  
            //Save Button
            menuSpecificVars.saveButton = document.createElement("button");
  
            menuSpecificVars.saveButton.innerText = "Save";
            menuSpecificVars.saveButton.style.cursor = "pointer";
            menuSpecificVars.saveButton.style.padding = "0.75rem 1rem";
            menuSpecificVars.saveButton.style.borderRadius = "0.25rem";
            menuSpecificVars.saveButton.style.boxSizing = "border-box";
            menuSpecificVars.saveButton.style.borderStyle = "solid";
            menuSpecificVars.saveButton.style.borderWidth = "0px";
            menuSpecificVars.saveButton.style.position = "absolute";
            menuSpecificVars.saveButton.style.top = "20%";
            menuSpecificVars.saveButton.style.left = "50%";
            menuSpecificVars.saveButton.style.backgroundColor =
              this._menuBarBackground;
            menuSpecificVars.saveButton.style.transform = "translate(-50%,0%)";
  
            menuSpecificVars.saveButton.onclick = () => {
              if (menuSpecificVars.shadername.value.length == 0) return;
              this.saveShader(menuSpecificVars.shadername.value, this.savingData);
              closeFunc();
            };
  
            menuSpecificVars.saveStuffHolder.appendChild(
              menuSpecificVars.saveButton
            );
  
            //A container containing already existing shaders and some text to accompony them.
            menuSpecificVars.existingShaderHolder = document.createElement("div");
  
            menuSpecificVars.existingShaderHolder.style.width = "40%";
            menuSpecificVars.existingShaderHolder.style.height = "100%";
            menuSpecificVars.existingShaderHolder.style.left = "60%";
            menuSpecificVars.existingShaderHolder.style.backgroundColor =
              "#00000000";
            menuSpecificVars.existingShaderHolder.style.position = "absolute";
  
            shaderPanel.appendChild(menuSpecificVars.existingShaderHolder);
  
            menuSpecificVars.existingText = document.createElement("div");
  
            menuSpecificVars.existingText.style.width = "100%";
            menuSpecificVars.existingText.style.height = "48px";
            menuSpecificVars.existingText.style.top = "0px";
            menuSpecificVars.existingText.style.left = "0px";
            menuSpecificVars.existingText.style.position = "absolute";
            menuSpecificVars.existingText.style.transform = "translate(0%,8px)";
            menuSpecificVars.existingText.style.color = this._textColor;
  
            menuSpecificVars.existingText.style.fontSize = "16px";
  
            menuSpecificVars.existingText.textContent = "Project Shaders";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingText
            );
  
            //The background for existing shaders
            menuSpecificVars.existingDivBackground =
              document.createElement("div");
  
            menuSpecificVars.existingDivBackground.style.backgroundColor =
              this._menuBarBackground;
            menuSpecificVars.existingDivBackground.style.width = "100%";
            menuSpecificVars.existingDivBackground.style.height =
              "calc(100% - 32px)";
            menuSpecificVars.existingDivBackground.style.position = "absolute";
            menuSpecificVars.existingDivBackground.style.top = "32px";
            menuSpecificVars.existingDivBackground.style.left = "0%";
            menuSpecificVars.existingDivBackground.style.filter = "opacity(25%)";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDivBackground
            );
  
            //The container for existing shaders
            menuSpecificVars.existingDiv = document.createElement("div");
  
            menuSpecificVars.existingDiv.style.backgroundColor = "#00000000";
            menuSpecificVars.existingDiv.style.width = "100%";
            menuSpecificVars.existingDiv.style.height = "calc(100% - 32px)";
            menuSpecificVars.existingDiv.style.position = "absolute";
            menuSpecificVars.existingDiv.style.top = "32px";
            menuSpecificVars.existingDiv.style.left = "0%";
            menuSpecificVars.existingDiv.style.overflowY = "auto";
            menuSpecificVars.existingDiv.style.overflowX = "hidden";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDiv
            );
  
            Object.keys(this.shaders).forEach((shader) => {
              const shaderDiv = document.createElement("div");
              shaderDiv.style.width = "100%";
              shaderDiv.style.height = "48px";
              shaderDiv.style.color = "#ffffff";
              shaderDiv.style.marginBottom = "2px";
              shaderDiv.style.backgroundColor = this._menuBarBackground;
  
              shaderDiv.style.cursor = "pointer";
  
              shaderDiv.onclick = () => {
                this.saveShader(shader, this.savingData);
                closeFunc();
              };
  
              menuSpecificVars.existingDiv.appendChild(shaderDiv);
  
              const modifyDate = new Date(this.shaders[shader].modifyDate);
  
              const nameDiv = document.createElement("div");
              nameDiv.style.position = "absolute";
              nameDiv.style.width = "100%";
              nameDiv.style.height = "48px";
              nameDiv.style.transform = "translate(5%,5%)";
              nameDiv.style.textAlign = "left";
              nameDiv.innerText = `${shader}\nModified: ${modifyDate.getDate()}/${modifyDate.getMonth() + 1}/${modifyDate.getFullYear()} ${modifyDate.getHours() % 12 == 0 ? 12 : modifyDate.getHours() % 12}:${modifyDate.getMinutes()} ${modifyDate.getHours() > 11 ? "PM" : "AM"}`;
  
              shaderDiv.appendChild(nameDiv);
            });
            break;
  
          case "manager":
            //Resize this manager to fit better
            resizeFunc(25, 30);
            //A container containing already existing shaders and some text to accompony them.
            menuSpecificVars.existingShaderHolder = document.createElement("div");
  
            menuSpecificVars.existingShaderHolder.style.width = "100%";
            menuSpecificVars.existingShaderHolder.style.height = "100%";
            menuSpecificVars.existingShaderHolder.style.left = "0%";
            menuSpecificVars.existingShaderHolder.style.backgroundColor =
              "#00000000";
            menuSpecificVars.existingShaderHolder.style.position = "absolute";
  
            shaderPanel.appendChild(menuSpecificVars.existingShaderHolder);
  
            menuSpecificVars.existingText = document.createElement("div");
  
            menuSpecificVars.existingText.style.width = "100%";
            menuSpecificVars.existingText.style.height = "48px";
            menuSpecificVars.existingText.style.top = "0px";
            menuSpecificVars.existingText.style.left = "0px";
            menuSpecificVars.existingText.style.position = "absolute";
            menuSpecificVars.existingText.style.transform = "translate(0%,8px)";
            menuSpecificVars.existingText.style.color = this._textColor;
  
            menuSpecificVars.existingText.style.fontSize = "16px";
  
            menuSpecificVars.existingText.textContent = "Project Shaders";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingText
            );
  
            //The background for existing shaders
            menuSpecificVars.existingDivBackground =
              document.createElement("div");
  
            menuSpecificVars.existingDivBackground.style.backgroundColor =
              this._menuBarBackground;
            menuSpecificVars.existingDivBackground.style.width = "100%";
            menuSpecificVars.existingDivBackground.style.height =
              "calc(100% - 32px)";
            menuSpecificVars.existingDivBackground.style.position = "absolute";
            menuSpecificVars.existingDivBackground.style.top = "32px";
            menuSpecificVars.existingDivBackground.style.left = "0%";
            menuSpecificVars.existingDivBackground.style.filter = "opacity(25%)";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDivBackground
            );
  
            //The container for existing shaders
            menuSpecificVars.existingDiv = document.createElement("div");
  
            menuSpecificVars.existingDiv.style.backgroundColor = "#00000000";
            menuSpecificVars.existingDiv.style.width = "100%";
            menuSpecificVars.existingDiv.style.height = "calc(100% - 32px)";
            menuSpecificVars.existingDiv.style.position = "absolute";
            menuSpecificVars.existingDiv.style.top = "32px";
            menuSpecificVars.existingDiv.style.left = "0%";
            menuSpecificVars.existingDiv.style.overflowY = "auto";
            menuSpecificVars.existingDiv.style.overflowX = "hidden";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDiv
            );
  
            Object.keys(this.shaders).forEach((shader) => {
              const shaderDiv = document.createElement("div");
              shaderDiv.style.width = "100%";
              shaderDiv.style.height = "48px";
              shaderDiv.style.color = "#ffffff";
              shaderDiv.style.marginBottom = "2px";
              shaderDiv.style.backgroundColor = this._menuBarBackground;
  
              shaderDiv.style.cursor = "pointer";
  
              menuSpecificVars.existingDiv.appendChild(shaderDiv);
  
              const modifyDate = new Date(this.shaders[shader].modifyDate);
  
              const nameDiv = document.createElement("div");
              nameDiv.style.position = "relative";
              nameDiv.style.width = "100%";
              nameDiv.style.height = "48px";
              nameDiv.style.top = "0px";
              nameDiv.style.left = "0px";
              nameDiv.style.transform = "translate(5%,5%)";
              nameDiv.style.textAlign = "left";
              nameDiv.innerText = `${shader}\nModified: ${modifyDate.getDate()}/${modifyDate.getMonth() + 1}/${modifyDate.getFullYear()} ${modifyDate.getHours() % 12 == 0 ? 12 : modifyDate.getHours() % 12}:${modifyDate.getMinutes()} ${modifyDate.getHours() > 11 ? "PM" : "AM"}`;
  
              shaderDiv.appendChild(nameDiv);
  
              //The actual container no filter to avoid buggy things
              const closeMenu = document.createElement("div");
  
              closeMenu.style.width = "1.75rem";
              closeMenu.style.height = "1.75rem";
              closeMenu.style.backgroundColor = this._buttonShadow;
              closeMenu.style.position = "absolute";
              closeMenu.style.left = "calc(100% - 2rem)";
              closeMenu.style.borderRadius = "50%";
              closeMenu.style.alignItems = "center";
              closeMenu.style.justifyContent = "center";
              closeMenu.style.display = "flex";
              closeMenu.style.cursor = "pointer";
              closeMenu.style.transition = "all 0.15s ease-out";
              closeMenu.style.transform = "translate(-50%,-135%)";
  
              //Animation stuffs
              closeMenu.onmouseenter = () => {
                closeMenu.style.transform =
                  "translate(-50%,-135%) scale(1.1,1.1)";
              };
  
              //More animation
              closeMenu.onmouseleave = () => {
                closeMenu.style.transform = "translate(-50%,-135%) scale(1,1)";
              };
  
              //Just the close button
              closeMenu.onclick = () => {
                menuSpecificVars.existingDiv.removeChild(shaderDiv);
                this.deleteShader(shader);
              };
  
              shaderDiv.appendChild(closeMenu);
  
              //The close button for the menu
              const xImage = document.createElement("img");
              xImage.src =
                "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==";
  
              xImage.style.width = "0.75rem";
              xImage.style.height = "0.75rem";
              xImage.style.margin = "0.25rem";
              xImage.style.transform = "rotate(45deg)";
  
              closeMenu.appendChild(xImage);
            });
            break;
  
          case "load":
            //Resize this manager to fit better
            resizeFunc(25, 30);
            //A container containing already existing shaders and some text to accompony them.
            menuSpecificVars.existingShaderHolder = document.createElement("div");
  
            menuSpecificVars.existingShaderHolder.style.width = "100%";
            menuSpecificVars.existingShaderHolder.style.height = "100%";
            menuSpecificVars.existingShaderHolder.style.left = "0%";
            menuSpecificVars.existingShaderHolder.style.backgroundColor =
              "#00000000";
            menuSpecificVars.existingShaderHolder.style.position = "absolute";
  
            shaderPanel.appendChild(menuSpecificVars.existingShaderHolder);
  
            menuSpecificVars.existingText = document.createElement("div");
  
            menuSpecificVars.existingText.style.width = "100%";
            menuSpecificVars.existingText.style.height = "48px";
            menuSpecificVars.existingText.style.top = "0px";
            menuSpecificVars.existingText.style.left = "0px";
            menuSpecificVars.existingText.style.position = "absolute";
            menuSpecificVars.existingText.style.transform = "translate(0%,8px)";
            menuSpecificVars.existingText.style.color = this._textColor;
  
            menuSpecificVars.existingText.style.fontSize = "16px";
  
            menuSpecificVars.existingText.textContent = "Project Shaders";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingText
            );
  
            //The background for existing shaders
            menuSpecificVars.existingDivBackground =
              document.createElement("div");
  
            menuSpecificVars.existingDivBackground.style.backgroundColor =
              this._menuBarBackground;
            menuSpecificVars.existingDivBackground.style.width = "100%";
            menuSpecificVars.existingDivBackground.style.height =
              "calc(100% - 32px)";
            menuSpecificVars.existingDivBackground.style.position = "absolute";
            menuSpecificVars.existingDivBackground.style.top = "32px";
            menuSpecificVars.existingDivBackground.style.left = "0%";
            menuSpecificVars.existingDivBackground.style.filter = "opacity(25%)";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDivBackground
            );
  
            //The container for existing shaders
            menuSpecificVars.existingDiv = document.createElement("div");
  
            menuSpecificVars.existingDiv.style.backgroundColor = "#00000000";
            menuSpecificVars.existingDiv.style.width = "100%";
            menuSpecificVars.existingDiv.style.height = "calc(100% - 32px)";
            menuSpecificVars.existingDiv.style.position = "absolute";
            menuSpecificVars.existingDiv.style.top = "32px";
            menuSpecificVars.existingDiv.style.left = "0%";
            menuSpecificVars.existingDiv.style.overflowY = "auto";
            menuSpecificVars.existingDiv.style.overflowX = "hidden";
  
            menuSpecificVars.existingShaderHolder.appendChild(
              menuSpecificVars.existingDiv
            );
  
            Object.keys(this.shaders).forEach((shader) => {
              const shaderDiv = document.createElement("div");
              shaderDiv.style.width = "100%";
              shaderDiv.style.height = "48px";
              shaderDiv.style.color = "#ffffff";
              shaderDiv.style.marginBottom = "2px";
              shaderDiv.style.backgroundColor = this._menuBarBackground;
  
              shaderDiv.style.cursor = "pointer";
  
              shaderDiv.onclick = () => {
                this.IFrame.contentWindow.postMessage(
                  {
                    type: "DATA_LOAD",
                    projectData: this.shaders[shader].projectData.projectData,
                  },
                  this.IFrame.src
                );
                closeFunc();
              };
  
              menuSpecificVars.existingDiv.appendChild(shaderDiv);
  
              const modifyDate = new Date(this.shaders[shader].modifyDate);
  
              const nameDiv = document.createElement("div");
              nameDiv.style.position = "relative";
              nameDiv.style.width = "100%";
              nameDiv.style.height = "48px";
              nameDiv.style.top = "0px";
              nameDiv.style.left = "0px";
              nameDiv.style.transform = "translate(5%,5%)";
              nameDiv.style.textAlign = "left";
              nameDiv.innerText = `${shader}\nModified: ${modifyDate.getDate()}/${modifyDate.getMonth() + 1}/${modifyDate.getFullYear()} ${modifyDate.getHours() % 12 == 0 ? 12 : modifyDate.getHours() % 12}:${modifyDate.getMinutes()} ${modifyDate.getHours() > 11 ? "PM" : "AM"}`;
  
              shaderDiv.appendChild(nameDiv);
            });
            break;
  
          default:
            break;
        }
      }
  
      getAllShaders() {
        return JSON.stringify(this.shaderMenu());
      }
  
      //?Cubemaps
      createCubemap({ left, right, back, front, bottom, top, name }, util) {
        const cubemapSetup = [
          {
            texture: left,
            side: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
          },
          {
            texture: right,
            side: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
          },
          {
            texture: back,
            side: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
          },
          {
            texture: front,
            side: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
          },
          {
            texture: bottom,
            side: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
          },
          {
            texture: top,
            side: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
          },
        ];
  
        //? Bind texture
        this.penPlusCubemap[name] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.penPlusCubemap[name]);
  
        //Loop through faces in face array.
        for (let faceID = 0; faceID < 6; faceID++) {
          const curTarget = util.target;
          const curCostume =
            this.penPlusCostumeLibrary[cubemapSetup[faceID].texture] ||
            curTarget.getCostumeIndexByName(
              Scratch.Cast.toString(cubemapSetup[faceID].texture)
            );
  
          if (this.penPlusCostumeLibrary[cubemapSetup[faceID].texture]) {
            const textureData = this.textureFunctions.getTextureData(
              curCostume.texture,
              curCostume.width,
              curCostume.height
            );
  
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.penPlusCubemap[name]);
            gl.texImage2D(
              cubemapSetup[faceID].texture.side,
              0,
              gl.RGBA,
              curCostume.width,
              curCostume.height,
              0,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              textureData
            );
  
            gl.texParameteri(
              gl.TEXTURE_CUBE_MAP,
              gl.TEXTURE_MIN_FILTER,
              currentFilter
            );
            gl.texParameteri(
              gl.TEXTURE_CUBE_MAP,
              gl.TEXTURE_MAG_FILTER,
              currentFilter
            );
          } else {
            if (curCostume >= 0) {
              const costumeURI =
                curTarget.sprite.costumes[curCostume].asset.encodeDataURI();
  
              //Only used for images we got permission to fetch before. Don't need this.
              // eslint-disable-next-line
              const image = new Image();
              image.onload = () => {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.penPlusCubemap[name]);
                gl.texImage2D(
                  cubemapSetup[faceID].texture.side,
                  0,
                  gl.RGBA,
                  gl.RGBA,
                  gl.UNSIGNED_BYTE,
                  image
                );
  
                gl.texParameteri(
                  gl.TEXTURE_CUBE_MAP,
                  gl.TEXTURE_MIN_FILTER,
                  currentFilter
                );
                gl.texParameteri(
                  gl.TEXTURE_CUBE_MAP,
                  gl.TEXTURE_MAG_FILTER,
                  currentFilter
                );
              };
  
              image.src = costumeURI;
            }
          }
        }
      }
      doesCubemapexist({ name }, util) {
        return typeof this.penPlusCubemap[name] != "undefined";
      }
      removeCubemapfromDURI({ name }, util) {
        if (this.penPlusCubemap[name]) {
          delete this.penPlusCubemap[name];
        }
      }
  
      _getTriDataFromList(list, util) {
        //Might be bad code? I dunno
        const listREF = this._getVarObjectFromName(list, util, "list");
        if (!listREF) return { successful: false };
        const refinedID = listREF.id + util.target.id;
  
        this.listCache[refinedID] = this.listCache[refinedID] || {};
  
        const listOBJ = listREF.value;
        if (!listOBJ) return { successful: false };
        let merged = {};
  
        if (this.listCache[refinedID].prev != JSON.stringify(listOBJ)) {
          console.log("reparse");
          //Map the list object if we can't find something
          listOBJ.map(function (str) {
            const obj = JSON.parse(str);
            //Check through each object
            Object.keys(obj).forEach((key) => {
              //Merge the keys if possible
              //!!No built in function for this to my knowledge!!
              if (!merged[key]) {
                merged[key] = obj[key];
              } else {
                merged[key].push(...obj[key]);
              }
            });
          });
  
          //Parse these into F32 arrays for performance.
          const keys = Object.keys(merged);
          keys.forEach((key) => {
            merged[key] = new Float32Array(merged[key]);
          });
  
          this.listCache[refinedID] = {
            prev: JSON.stringify([...listREF.value]),
            dat: merged,
            keys: keys,
          };
        }
        return {
          triData: this.listCache[refinedID].dat,
          listLength: listOBJ.length,
          keys: this.listCache[refinedID].keys,
          successful: true,
        };
      }
  
      //?List based rendering
      renderSolidTrisFromList({ list }, util) {
        const { triData, listLength, successful } = this._getTriDataFromList(
          list,
          util
        );
        if (!successful) return;
  
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
        if (!triData.a_position || !triData.a_color) return;
  
        //Make sure we have the triangle data updating accordingly
        this.trianglesDrawn += listLength;
        bufferInfo.numElements = listLength * 3;
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, triData.a_position, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, triData.a_color, gl.DYNAMIC_DRAW);
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(
          gl,
          penPlusShaders.untextured.ProgramInf,
          bufferInfo
        );
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
        gl.useProgram(penPlusShaders.untextured.ProgramInf.program);
  
        twgl.setUniforms(penPlusShaders.untextured.ProgramInf, {
          u_transform: transform_Matrix,
        });
  
        twgl.drawBufferInfo(gl, bufferInfo);
  
        bufferInfo.numElements = 3;
      }
  
      solidTriDef({ x1, y1, c1, x2, y2, c2, x3, y3, c3 }) {
        c1 = Scratch.Cast.toRgbColorObject(c1);
        c2 = Scratch.Cast.toRgbColorObject(c2);
        c3 = Scratch.Cast.toRgbColorObject(c3);
        return JSON.stringify({
          a_position: [x1, y1, 0, 1, x2, y2, 0, 1, x3, y3, 0, 1],
          a_color: [
            c1.r / 255,
            c1.g / 255,
            c1.b / 255,
            1,
            c2.r / 255,
            c2.g / 255,
            c2.b / 255,
            1,
            c3.r / 255,
            c3.g / 255,
            c3.b / 255,
            1,
          ],
        });
      }
  
      renderTexturedTrisFromList({ list, tex }, util) {
        const { triData, listLength, successful } = this._getTriDataFromList(
          list,
          util
        );
        if (!successful) return;
  
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
        if (!triData.a_position || !triData.a_color || !triData.a_texCoord)
          return;
  
        let currentTexture = this._locateTextureObject(tex, util);
        if (!currentTexture) return;
  
        //Make sure we have the triangle data updating accordingly
        this.trianglesDrawn += listLength;
        bufferInfo.numElements = listLength * 3;
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, triData.a_position, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_color.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, triData.a_color, gl.DYNAMIC_DRAW);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texCoord.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, triData.a_texCoord, gl.DYNAMIC_DRAW);
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(
          gl,
          penPlusShaders.textured.ProgramInf,
          bufferInfo
        );
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
        gl.useProgram(penPlusShaders.textured.ProgramInf.program);
  
        twgl.setUniforms(penPlusShaders.textured.ProgramInf, {
          u_transform: transform_Matrix,
          u_texture: currentTexture,
        });
  
        twgl.drawBufferInfo(gl, bufferInfo);
  
        bufferInfo.numElements = 3;
      }
  
      texTriDef({ x1, y1, c1, x2, y2, c2, x3, y3, c3, u1, v1, u2, v2, u3, v3 }) {
        c1 = Scratch.Cast.toRgbColorObject(c1);
        c2 = Scratch.Cast.toRgbColorObject(c2);
        c3 = Scratch.Cast.toRgbColorObject(c3);
        return JSON.stringify({
          a_position: [x1, y1, 0, 1, x2, y2, 0, 1, x3, y3, 0, 1],
          a_color: [
            c1.r / 255,
            c1.g / 255,
            c1.b / 255,
            1,
            c2.r / 255,
            c2.g / 255,
            c2.b / 255,
            1,
            c3.r / 255,
            c3.g / 255,
            c3.b / 255,
            1,
          ],
          a_texCoord: [u1, v1, u2, v2, u3, v3],
        });
      }
  
      renderShaderTrisFromList({ list, shader }, util) {
        const { triData, listLength, successful, keys } =
          this._getTriDataFromList(list, util);
        if (!successful) return;
  
        // prettier-ignore
        if (!this.inDrawRegion) renderer.enterDrawRegion(this.penPlusDrawRegion);
  
        const buffer = this.programs[shader].buffer;
  
        if (!this.programs[shader]) return;
  
        //Make sure we have the triangle data updating accordingly
        this.trianglesDrawn += listLength;
        buffer.numElements = listLength * 3;
  
        // prettier-ignore
        keys.forEach(key => {
            //Check to see if the key exists here
            if (!buffer.attribs[key]) return;
            //Then use the key in the shader
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.attribs[key].buffer);
            gl.bufferData(gl.ARRAY_BUFFER, triData[key], gl.DYNAMIC_DRAW);
          });
  
        //? Bind Positional Data
        twgl.setBuffersAndAttributes(gl, this.programs[shader].info, buffer);
  
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  
        //Just use the real scratch timer.
        this.programs[shader].uniformDat.u_timer =
          runtime.ext_scratch3_sensing.getTimer({}, util);
        this.programs[shader].uniformDat.u_transform = transform_Matrix;
        this.programs[shader].uniformDat.u_res = [
          this.currentRenderTexture.width,
          this.currentRenderTexture.height,
        ];
  
        gl.useProgram(this.programs[shader].info.program);
  
        twgl.setUniforms(
          this.programs[shader].info,
          this.programs[shader].uniformDat
        );
  
        twgl.drawBufferInfo(gl, buffer);
  
        buffer.numElements = 3;
      }
  
      editTriDef({ attribute, id, value, def }) {
        id = Scratch.Cast.toNumber(id);
        value = Scratch.Cast.toNumber(value);
  
        //Ignore reductive values
        if (!(id > 0 && id <= 3)) return def;
        if (typeof value == "undefined") return def;
  
        //Parse it
        let parsed = JSON.parse(def);
        if (!parsed) return def;
        id -= 1;
  
        //handleAttributes
        switch (attribute) {
          case "x":
            if (!parsed["a_position"]) break;
            parsed["a_position"][id * 4] = value;
            break;
  
          case "y":
            if (!parsed["a_position"]) break;
            parsed["a_position"][id * 4 + 1] = value;
            break;
  
          case "depth value":
            if (!parsed["a_position"]) break;
            parsed["a_position"][id * 4 + 2] = value;
            break;
  
          case "corner pinch":
            if (!parsed["a_position"]) break;
            parsed["a_position"][id * 4 + 3] = value;
            break;
  
          case "red tint":
            if (!parsed["a_color"]) break;
            parsed["a_color"][id * 4] = value / 100;
            break;
  
          case "green tint":
            if (!parsed["a_color"]) break;
            parsed["a_color"][id * 4 + 1] = value / 100;
            break;
  
          case "blue tint":
            if (!parsed["a_color"]) break;
            parsed["a_color"][id * 4 + 2] = value / 100;
            break;
  
          case "transparency":
            if (!parsed["a_color"]) break;
            parsed["a_color"][id * 4 + 3] = value / 100;
            break;
  
          case "U value":
            if (!parsed["a_texCoord"]) break;
            parsed["a_texCoord"][id * 2] = value;
            break;
  
          case "V value":
            if (!parsed["a_texCoord"]) break;
            parsed["a_texCoord"][id * 2 + 1] = value;
            break;
  
          default:
            break;
        }
  
        return JSON.stringify(parsed);
      }
  
      setCullMode({ direction }) {
        if (direction == 0) {
          this.culling = false;
          if (this.inDrawRegion) {
            gl.disable(gl.CULL_FACE);
          }
          return;
        }
        this.culling = true;
        this.cullMode = direction;
        gl.cullFace(this.cullMode);
        if (this.inDrawRegion) {
          gl.enable(gl.CULL_FACE);
        }
      }
  
      getRenderTextures() {
        return JSON.stringify(Object.keys(this.renderTextures));
      }
  
      createRenderTexture({ name }) {
        //If it is named scratch stage get that stuff out of here
        if (name == "Scratch Stage") return;
  
        //if the render texture exists delete it
        if (this.renderTextures[this.prefixes.renderTextures + name]) {
          this._deleteFramebuffer(
            this.renderTextures[this.prefixes.renderTextures + name]
          );
        }
  
        //Add it
        this.renderTextures[this.prefixes.renderTextures + name] =
          twgl.createFramebufferInfo(gl, triBufferAttachments);
        this.renderTextures[this.prefixes.renderTextures + name].resizing = true;
        this.renderTextures[this.prefixes.renderTextures + name].name = name;
      }
  
      createRenderTextureOfSize({ name, width, height }) {
        //If it is named scratch stage get that stuff out of here
        if (name == "Scratch Stage") return;
  
        //if the render texture exists delete it
        if (this.renderTextures[this.prefixes.renderTextures + name]) {
          this._deleteFramebuffer(
            this.renderTextures[this.prefixes.renderTextures + name]
          );
        }
  
        //Add it
        this.renderTextures[this.prefixes.renderTextures + name] =
          twgl.createFramebufferInfo(gl, triBufferAttachments);
        twgl.resizeFramebufferInfo(
          gl,
          this.renderTextures[this.prefixes.renderTextures + name],
          triBufferAttachments,
          width,
          height
        );
        this.renderTextures[this.prefixes.renderTextures + name].resizing = false;
        this.renderTextures[this.prefixes.renderTextures + name].name = name;
      }
  
      clearRenderTexture({ name }) {
        if (this.renderTextures[name]) {
          this.currentRenderTexture = this.renderTextures[name];
  
          gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            this.currentRenderTexture.framebuffer
          );
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          gl.clearColor(
            renderer._backgroundColor4f[0],
            renderer._backgroundColor4f[1],
            renderer._backgroundColor4f[2],
            renderer._backgroundColor4f[3]
          );
        }
      }
  
      removeRenderTexture({ name }) {
        if (name == "Scratch Stage") return;
        if (this.renderTextures[name]) {
          //If we are deleting the one we are on failsafe to the default stage buffer
          if (this.currentRenderTexture.name == name) {
            this.currentRenderTexture = triBufferInfo;
            gl.bindFramebuffer(
              gl.FRAMEBUFFER,
              this.currentRenderTexture.framebuffer
            );
          }
          //Delete the framebuffer
          this._deleteFramebuffer(this.renderTextures[name]);
          delete this.renderTextures[name];
        }
      }
  
      doesRenderTextureExist({ name }) {
        if (name == "Scratch Stage") return true;
        return typeof this.renderTextures[name] != "undefined";
      }
  
      targetRenderTexture({ name }) {
        //Check for the scratch stage
        if (name == "Scratch Stage") {
          this.currentRenderTexture = triBufferInfo;
        }
        //Check for the render texture inside of the list
        else if (this.renderTextures[name]) {
          this.currentRenderTexture = this.renderTextures[name];
  
          //if we detect that ANY I MEAN ANY shader has THIS texture destroy it.
          Object.keys(this.programs).forEach((programKey) => {
            const program = this.programs[programKey];
            if (program && program.uniformDat) {
              Object.keys(program.uniformDat).forEach((uniformKey) => {
                if (
                  program.uniformDat[uniformKey] ==
                  this.currentRenderTexture.attachments[0]
                ) {
                  //This should show em!
                  this.programs[programKey].uniformDat[uniformKey] = null;
                }
              });
            }
          });
        }
        //if all else fails use the tri buffer render texture.
        else {
          this.currentRenderTexture = triBufferInfo;
        }
  
        //Do some fixes if we are already in the pen+ draw region!
        if (this.inDrawRegion) {
          gl.viewport(
            0,
            0,
            this.currentRenderTexture.width,
            this.currentRenderTexture.height
          );
  
          if (
            name == "Scratch Stage" ||
            (this.currentRenderTexture.resizing &&
              (this.currentRenderTexture.width != nativeSize[0] ||
                this.currentRenderTexture.height != nativeSize[1]))
          ) {
            twgl.resizeFramebufferInfo(
              gl,
              this.currentRenderTexture,
              triBufferAttachments,
              Scratch.Cast.toNumber(nativeSize[0]),
              Scratch.Cast.toNumber(nativeSize[1])
            );
            transform_Matrix[0] = 2 / renderer._nativeSize[0];
            transform_Matrix[1] = -2 / renderer._nativeSize[1];
          } else {
            transform_Matrix[0] = 2 / this.currentRenderTexture.width;
            transform_Matrix[1] = -2 / this.currentRenderTexture.height;
          }
  
          gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            this.currentRenderTexture.framebuffer
          );
        }
      }
  
      //By Sharkpool-SP commented by Alex
      getPenRenderLayer() {
        //Grabbing the drawable for the pen layer
        const penID = vm.runtime.ext_pen?._penDrawableId;
        if (!penID) return "";
  
        //If we can grab it create a canvas and parse the image data into a data uri
        const imageData =
          vm.runtime.renderer.extractDrawableScreenSpace(penID).imageData;
        var canvas = document.createElement("canvas");
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        canvas.getContext("2d").putImageData(imageData, 0, 0);
  
        //Return it as a png? Why png specifically I dunno.
        return canvas.toDataURL("image/png");
      }
    }
  
    //? A small hack to stop the renderer from immediatly dying. And to allow for immediate use
    Scratch.extensions.register(new extension());
  })(Scratch);
  
