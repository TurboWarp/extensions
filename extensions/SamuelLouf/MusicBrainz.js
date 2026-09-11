// Name: MusicBrainz
// ID: samuelloufmusicbrainz
// Description: Search for song, artist, instrument, or event
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>

(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = vm.renderer.canvas;

  const icon = 'data:image/png;base64,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';

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
    if (hasOwn(isoCountries, countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
  }

  function blocksLabel(text){
    return {
      blockType: Scratch.BlockType.LABEL,
      text: text
    }
  }

  const if_then_return_else_return = (condition, then_return, else_return) => {
    if (condition){
      return then_return;
    } else {
      return else_return;
    }
  }

  
  //  _________                .__                                                  
  //  \_   ___ \  ____   _____ |__| ____    ____     __________   ____   ____    /\ 
  //  /    \  \/ /  _ \ /     \|  |/    \  / ___\   /  ___/  _ \ /  _ \ /    \   \/ 
  //  \     \___(  <_> )  Y Y  \  |   |  \/ /_/  >  \___ (  <_> |  <_> )   |  \  /\ 
  //   \______  /\____/|__|_|  /__|___|  /\___  /  /____  >____/ \____/|___|  /  \/ 
  //          \/             \/        \//_____/        \/                  \/      

  
  //     ___,                                             , __  _             _          , __                           
  //    /   |     |                                 |    /|/  \| |           | |        /|/  \                          
  //   |    |   __|        __,   _  _    __   _   __|     | __/| |  __   __  | |   ,     | __/      _|__|_  __   _  _   
  //   |    |  /  |  |  |_/  |  / |/ |  /    |/  /  |     |   \|/  /  \_/    |/_) / \_   |   \|   |  |  |  /  \_/ |/ |  
  //    \__/\_/\_/|_/ \/  \_/|_/  |  |_/\___/|__/\_/|_/   |(__/|__/\__/ \___/| \_/ \/    |(__/ \_/|_/|_/|_/\__/   |  |_/
                                                                                                                  
                                                                                                                  

  class MusicBrainz {
    getInfo() {
      return {
        id: 'samuelloufmusicbrainz',
        color1: '#BA478F',
        color2: '#EB743B',
        name: 'MusicBrainz',
        menuIconURI: icon,
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
          {
            opcode: 'search_artist_life',
            blockType: Scratch.BlockType.REPORTER,
            text: '[life] of artist [name]',
            arguments: {
              life: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_artist_start',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'The Living Tombstone',
              }
            }
          },
          '---',
          {
            opcode: 'search_instrument',
            blockType: Scratch.BlockType.REPORTER,
            text: '[instrument] of instrument [name]',
            arguments: {
              instrument: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_instrument',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Piano',
              }
            }
          },
          '---',
          {
            opcode: 'search_recording',
            blockType: Scratch.BlockType.REPORTER,
            text: '[recording] of recording [name]',
            arguments: {
              recording: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_recording',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Five Nights at Freddy\'s',
              }
            }
          },
          {
            opcode: 'search_recording_credit',
            blockType: Scratch.BlockType.REPORTER,
            text: '[recording_credit] of recording [name]\'s creators',
            arguments: {
              recording_credit: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_recording_credit',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Five Nights at Freddy\'s',
              }
            }
          },
          '---',
          {
            opcode: 'search_event',
            blockType: Scratch.BlockType.REPORTER,
            text: '[event] of event [name]',
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                menu: 'search_event',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris Jazz Festival',
              }
            }
          },
          {
            opcode: 'search_event_life_span',
            blockType: Scratch.BlockType.REPORTER,
            text: 'life span [start_end] of event [name]',
            arguments: {
              start_end: {
                type: Scratch.ArgumentType.STRING,
                menu: 'start_end',
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris Jazz Festival',
              }
            }
          }
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
          },
          search_artist_start: {
            acceptReporters: true,
            items: ['start','end']
          },
          search_instrument: {
            acceptReporters: true,
            items: ['id','type','type id','score','name','tags']
          },
          search_recording: {
            acceptReporters: true,
            items: ['id','length (ms)','length (s)','score','title']
          },
          search_recording_credit: {
            acceptReporters: true,
            items: ['id(s)','name(s)','sort name(s)']
          },
          search_event: {
            acceptReporters: true,
            items: ['id','name','score','type']
          },
          start_end: {
            acceptReporters: true,
            items: ['start','end']
          }
        }
      };
    }

    // Functions

    // Search Artist

    async search_artist(args) {
      var fetched_json = JSON.parse(await search('artist', args.name, 'json'));
      args.artist = args.artist.replace(' ', '-');
      if (args.artist == 'tags'){
        return json_array_filter('name', JSON.stringify(fetched_json.artists[0].tags));
      } else if (args.artist == 'country'){
        return getCountryName(fetched_json.artists[0][args.artist]);
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

    async search_artist_life(args) {
      var fetched_json = JSON.parse(await search('artist', args.name, 'json'));
      if (args.life == 'start'){
        return fetched_json.artists[0]['life-span'].begin.replaceAll('-', '/');
      } else {
        if (fetched_json.artists[0]['life-span'].ended == null){
          return 'This artist is still producing songs';
        } else {
          return fetched_json.artists[0]['life-span'].ended.replaceAll('-', '/');
        }
      }
    }

    // Search Instrument
    
    async search_instrument(args) {
      var fetched_json = JSON.parse(await search('instrument', args.name, 'json'));
      args.instrument = args.instrument.replace(' ', '-');
      if (args.instrument == 'tags'){
        return json_array_filter('name', JSON.stringify(fetched_json.instruments[0].tags));
      } else {
        return fetched_json.instruments[0][args.instrument];
      }
    }

    // Search Recording
    
    async search_recording(args) {
      var fetched_json = JSON.parse(await search('recording', args.name, 'json'));
      if (args.recording.includes('length')){
        if (args.recording.includes('(ms)')){
          return fetched_json.recordings[0].length;
        } else {
          return (fetched_json.recordings[0].length / 1000);
        }
      } else {
        return fetched_json.recordings[0][args.recording];
      }
    }
    
    async search_recording_credit(args) {
      args.recording_credit = args.recording_credit.replace('(s)', '').replace('(es)', '');
      var fetched_json = JSON.parse(await search('recording', args.name, 'json'));
      var credits = fetched_json.recordings[0]['artist-credit'];
      if (args.recording_credit == 'name'){
        return json_array_filter(args.recording_credit, JSON.stringify(credits));
      } else {
        args.recording_credit = args.recording_credit.replace(' ', '-');
        var artist = JSON.parse(json_array_filter('artist', JSON.stringify(credits)));
        return json_array_filter(args.recording_credit, JSON.stringify(artist));
      }
    }

    // Search Event

    async search_event(args) {
      var fetched_json = JSON.parse(await search('event', args.name, 'json'));
      return fetched_json.events[0][args.event];
    }

    async search_event_life_span(args) {
      var fetched_json = JSON.parse(await search('event', args.name, 'json'));
      var life_span = fetched_json.events[0]['life-span'];
      return if_then_return_else_return(args.start_end == 'start', if_then_return_else_return(life_span.begin.includes('-'), life_span.begin.replaceAll('-', '/'), life_span.begin), if_then_return_else_return(life_span.end.includes('-'), life_span.end.replaceAll('-', '/'), life_span.end));
    }
  }
  Scratch.extensions.register(new MusicBrainz());
})(Scratch);
