
(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = vm.renderer.canvas;

  async function search(type, query, format = 'xml', limit = 25){
    return await Scratch.fetch(`https://musicbrainz.org/ws/2/${type}/?query=${query}&fmt=${format}&limit=${limit}`).then((r) => r.text()).catch(() => '');
  }

  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  function json_array_filter( key, json ) {
    try {
      json = JSON.parse(json);
      return JSON.stringify(
        json.map((x) => {
          if (hasOwn(x, key)) {
            return x[key];
          }
          return null;
        })
      );
    } catch (e) {
      return '';
    }
  }

  function getCountryName(countryCode) {
    const isoCountries = {'AF':'Afghanistan','AX':'Aland Islands','AL':'Albania','DZ':'Algeria','AS':'American Samoa','AD':'Andorra','AO':'Angola','AI':'Anguilla','AQ':'Antarctica','AG':'Antigua And Barbuda','AR':'Argentina','AM':'Armenia','AW':'Aruba','AU':'Australia','AT':'Austria','AZ':'Azerbaijan','BS':'Bahamas','BH':'Bahrain','BD':'Bangladesh','BB':'Barbados','BY':'Belarus','BE':'Belgium','BZ':'Belize','BJ':'Benin','BM':'Bermuda','BT':'Bhutan','BO':'Bolivia','BA':'Bosnia And Herzegovina','BW':'Botswana','BV':'Bouvet Island','BR':'Brazil','IO':'British Indian Ocean Territory','BN':'Brunei Darussalam','BG':'Bulgaria','BF':'Burkina Faso','BI':'Burundi','KH':'Cambodia','CM':'Cameroon','CA':'Canada','CV':'Cape Verde','KY':'Cayman Islands','CF':'Central African Republic','TD':'Chad','CL':'Chile','CN':'China','CX':'Christmas Island','CC':'Cocos (Keeling) Islands','CO':'Colombia','KM':'Comoros','CG':'Congo','CD':'Congo, Democratic Republic','CK':'Cook Islands','CR':'Costa Rica','CI':'Cote D\'Ivoire','HR':'Croatia','CU':'Cuba','CY':'Cyprus','CZ':'Czech Republic','DK':'Denmark','DJ':'Djibouti','DM':'Dominica','DO':'Dominican Republic','EC':'Ecuador','EG':'Egypt','SV':'El Salvador','GQ':'Equatorial Guinea','ER':'Eritrea','EE':'Estonia','ET':'Ethiopia',
    'FK':'Falkland Islands (Malvinas)','FO':'Faroe Islands','FJ':'Fiji','FI':'Finland','FR':'France','GF':'French Guiana','PF':'French Polynesia','TF':'French Southern Territories','GA':'Gabon','GM':'Gambia','GE':'Georgia','DE':'Germany','GH':'Ghana','GI':'Gibraltar','GR':'Greece','GL':'Greenland','GD':'Grenada','GP':'Guadeloupe','GU':'Guam','GT':'Guatemala','GG':'Guernsey','GN':'Guinea','GW':'Guinea-Bissau','GY':'Guyana','HT':'Haiti','HM':'Heard Island & Mcdonald Islands','VA':'Holy See (Vatican City State)','HN':'Honduras','HK':'Hong Kong','HU':'Hungary','IS':'Iceland','IN':'India','ID':'Indonesia','IR':'Iran, Islamic Republic Of','IQ':'Iraq','IE':'Ireland','IM':'Isle Of Man','IL':'Israel','IT':'Italy','JM':'Jamaica','JP':'Japan','JE':'Jersey','JO':'Jordan','KZ':'Kazakhstan','KE':'Kenya','KI':'Kiribati','KR':'Korea','KW':'Kuwait','KG':'Kyrgyzstan','LA':'Lao People\'s Democratic Republic','LV':'Latvia','LB':'Lebanon','LS':'Lesotho','LR':'Liberia','LY':'Libyan Arab Jamahiriya','LI':'Liechtenstein','LT':'Lithuania','LU':'Luxembourg','MO':'Macao','MK':'Macedonia','MG':'Madagascar','MW':'Malawi','MY':'Malaysia','MV':'Maldives','ML':'Mali','MT':'Malta','MH':'Marshall Islands','MQ':'Martinique','MR':'Mauritania','MU':'Mauritius','YT':'Mayotte','MX':'Mexico','FM':'Micronesia, Federated States Of','MD':'Moldova','MC':'Monaco','MN':'Mongolia','ME':'Montenegro','MS':'Montserrat','MA':'Morocco','MZ':'Mozambique','MM':'Myanmar',
    'NA':'Namibia','NR':'Nauru','NP':'Nepal','NL':'Netherlands','AN':'Netherlands Antilles','NC':'New Caledonia','NZ':'New Zealand','NI':'Nicaragua','NE':'Niger','NG':'Nigeria','NU':'Niue','NF':'Norfolk Island','MP':'Northern Mariana Islands','NO':'Norway','OM':'Oman','PK':'Pakistan','PW':'Palau','PS':'Palestinian Territory, Occupied','PA':'Panama','PG':'Papua New Guinea','PY':'Paraguay','PE':'Peru','PH':'Philippines','PN':'Pitcairn','PL':'Poland','PT':'Portugal','PR':'Puerto Rico','QA':'Qatar','RE':'Reunion','RO':'Romania','RU':'Russian Federation','RW':'Rwanda','BL':'Saint Barthelemy','SH':'Saint Helena','KN':'Saint Kitts And Nevis','LC':'Saint Lucia','MF':'Saint Martin','PM':'Saint Pierre And Miquelon','VC':'Saint Vincent And Grenadines','WS':'Samoa','SM':'San Marino','ST':'Sao Tome And Principe','SA':'Saudi Arabia','SN':'Senegal','RS':'Serbia','SC':'Seychelles','SL':'Sierra Leone','SG':'Singapore','SK':'Slovakia','SI':'Slovenia','SB':'Solomon Islands','SO':'Somalia','ZA':'South Africa','GS':'South Georgia And Sandwich Isl.','ES':'Spain','LK':'Sri Lanka','SD':'Sudan','SR':'Suriname','SJ':'Svalbard And Jan Mayen','SZ':'Swaziland','SE':'Sweden','CH':'Switzerland','SY':'Syrian Arab Republic','TW':'Taiwan','TJ':'Tajikistan','TZ':'Tanzania','TH':'Thailand','TL':'Timor-Leste','TG':'Togo','TK':'Tokelau','TO':'Tonga','TT':'Trinidad And Tobago','TN':'Tunisia','TR':'Turkey','TM':'Turkmenistan','TC':'Turks And Caicos Islands','TV':'Tuvalu','UG':'Uganda','UA':'Ukraine','AE':'United Arab Emirates','GB':'United Kingdom','US':'United States','UM':'United States Outlying Islands','UY':'Uruguay','UZ':'Uzbekistan','VU':'Vanuatu','VE':'Venezuela','VN':'Viet Nam','VG':'Virgin Islands, British','VI':'Virgin Islands, U.S.','WF':'Wallis And Futuna','EH':'Western Sahara','YE':'Yemen','ZM':'Zambia','ZW':'Zimbabwe'};
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
  }

  class MusicBrainz {
    getInfo() {
      return {
        id: 'samuelloufmusicbrainz',
        color1: '#BA478F',
        color2: '#EB743B',
        name: 'MusicBrainz',
        blocks: [
          // Blocks

          // Search Artist
          {
            opcode: 'search_artist',
            blockType: Scratch.BlockType.REPORTER,
            text: '[artist] of artist [name]',
            arguments: {
              artist: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_artist',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'The Living Tombstone',
              }
            }
          },
          {
            opcode: 'search_artist_alias',
            blockType: Scratch.BlockType.REPORTER,
            text: '[alias] of artist [name]\'s [alias_area]',
            arguments: {
              alias: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_artist_alias',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'The Living Tombstone',
              },
              alias_area: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_artist_alias_area',
              }
            }
          },
          '---'
          //Missing: begin-area,life-span
        ],
        menus: {
          // Menus
          search_artist: {
            acceptReporters: true,
            items: ['id','type','type id','score','name','sort name','country','tags']
          },
          search_artist_alias: {
            acceptReporters: true,
            items: ['name','sort name','type','type id']
          },
          search_artist_alias_area: {
            acceptReporters: true,
            items: ['alias','area']
          }
        }
      };
    }

    // Functions

    async search_artist(args) {
      var fetched_json = JSON.parse(await search('artist', args.name, 'json'));
      args.artist = args.artist.replace(' ', '-');
      if (args.artist == 'tags'){
        return json_array_filter('name', JSON.stringify(fetched_json.artists[0].tags));
      } else if (args.artist == 'country'){
        return countryCode(fetched_json.artists[0][args.artist]);
      } else {
        return fetched_json.artists[0][args.artist];
      }
    }

    async search_artist_alias(args) {
      var fetched_json = JSON.parse(await search('artist', args.name, 'json'));
      args.alias = args.alias.replace(' ', '-');
      if (args.alias_area == 'alias'){
        return fetched_json.artists[0].aliases[0][args.alias];
      } else if (args.alias_area == 'area'){
        return fetched_json.artists[0].area[args.alias];
      }
    }
  }
  Scratch.extensions.register(new MusicBrainz());
})(Scratch);
