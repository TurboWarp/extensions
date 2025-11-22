// Name: Lithium FS
// ID: lithiumFS
// Description: Advancement of rxFS. Blocks for interacting with an in-memory filesystem with permissions, size limits, and more.
// By: ohgodwhy2k <https://github.com/ohgodwhy2k>
// Original: 0832
// License: MIT

Scratch.translate.setup({
  de: {
    clean: "Dateisystem löschen",
    del: "Lösche [STR]",
    folder: "Setze [STR] auf [STR2]",
    folder_default: "LiFS ist gut!",
    in: "Dateisystem von [STR] importieren",
    list: "Alle Dateien unter [STR] auflisten",
    open: "Öffne [STR]",
    out: "Dateisystem exportieren",
    search: "Suche [STR]",
    start: "Erschaffe [STR]",
    sync: "Ändere die Position von [STR] zu [STR2]",
    listMenuAll: "alle",
    listMenuFiles: "dateien",
    listMenuDirs: "verzeichnisse",
    list_new: "liste [TYPE] unter [STR]",
    exists: "existiert [STR]?",
    isFile: "ist [STR] eine datei?",
    isDir: "ist [STR] ein verzeichnis?",
    copy: "kopiere [STR] nach [STR2]",
    fileName: "dateiname von [STR]",
    dirName: "verzeichnis von [STR]",
    sync_new: "benenne [STR] um in [STR2]",
    permSet: "[ACTION] [PERM] Berechtigung für [STR]",
    permAdd: "hinzufügen",
    permRemove: "entfernen",
    permCreate: "erstellen",
    permDelete: "löschen",
    permSee: "sehen",
    permRead: "lesen",
    permWrite: "schreiben",
    permList: "berechtigungen auflisten für [STR]",
    permControl: "kontrollieren",
    toggleLogging: "schalte [STATE] konsolen-logging",
    logOn: "an",
    logOff: "aus",
    setLimit: "setze größenlimit für [DIR] auf [BYTES] bytes",
    removeLimit: "entferne größenlimit für [DIR]",
    getLimit: "größenlimit von [DIR] (bytes)",
    getSize: "aktuelle größe von [DIR] (bytes)",
    getLastError: "letzter fehler",
    wasRead: "wurde gelesen?",
    wasWritten: "wurde geschrieben?",
    version: "Version",
    dateCreated: "erstellungsdatum von [STR]",
    dateModified: "änderungsdatum von [STR]",
    dateAccessed: "zugriffsdatum von [STR]",
  },
  es: {
    folder_default: "¡LiFS es bueno!",
    listMenuAll: "todo",
    listMenuFiles: "archivos",
    listMenuDirs: "directorios",
    list_new: "listar [TYPE] en [STR]",
    exists: "¿existe [STR]?",
    isFile: "¿es [STR] un archivo?",
    isDir: "¿es [STR] un directorio?",
    copy: "copiar [STR] a [STR2]",
    fileName: "nombre de archivo de [STR]",
    dirName: "directorio de [STR]",
    sync_new: "renombrar [STR] a [STR2]",
    permSet: "[ACTION] permiso de [PERM] a [STR]",
    permAdd: "añadir",
    permRemove: "quitar",
    permCreate: "crear",
    permDelete: "eliminar",
    permSee: "ver",
    permRead: "leer",
    permWrite: "escribir",
    permList: "listar permisos de [STR]",
    permControl: "controlar",
    toggleLogging: "[STATE] el registro de la consola",
    logOn: "activar",
    logOff: "desactivar",
    setLimit: "establecer límite de tamaño para [DIR] a [BYTES] bytes",
    removeLimit: "eliminar límite de tamaño para [DIR]",
    getLimit: "límite de tamaño de [DIR] (bytes)",
    getSize: "tamaño actual de [DIR] (bytes)",
    getLastError: "último error",
    wasRead: "¿fue leído?",
    wasWritten: "¿fue escrito?",
    version: "versión",
    dateCreated: "fecha de creación de [STR]",
    dateModified: "fecha de modificación de [STR]",
    dateAccessed: "fecha de acceso de [STR]",
  },
  fi: {
    clean: "tyhjennä tiedostojärjestelmä",
    del: "poista [STR]",
    folder: "aseta [STR] arvoon [STR2]",
    folder_default: "LiFS on hieno!",
    in: "tuo tiedostojärjestelmä kohteesta [STR]",
    list: "luettelo kaikista kohteessa [STR] sijaitsevista tiedostoista",
    open: "avaa [STR]",
    out: "vie tiedostojärjestelmä",
    search: "etsi [STR]",
    start: "luo [STR]",
    sync: "muuta kohteen [STR] sijainniksi [STR2]",
    listMenuAll: "kaikki",
    listMenuFiles: "tiedostot",
    listMenuDirs: "kansiot",
    list_new: "listaa [TYPE] polussa [STR]",
    exists: "onko [STR] olemassa?",
    isFile: "onko [STR] tiedosto?",
    isDir: "onko [STR] kansio?",
    copy: "kopioi [STR] kohteeseen [STR2]",
    fileName: "tiedostonimi [STR]",
    dirName: "kansio [STR]",
    sync_new: "nimeä [STR] uudelleen [STR2]",
    permSet: "[ACTION] [PERM] käyttöoikeuden kohteelle [STR]",
    permAdd: "lisää",
    permRemove: "poista",
    permCreate: "luo",
    permDelete: "poista",
    permSee: "nähdä",
    permRead: "lukea",
    permWrite: "kirjoittaa",
    permList: "listaa [STR] käyttöoikeudet",
    permControl: "hallita",
    toggleLogging: "laita [STATE] konsoliloki",
    logOn: "päälle",
    logOff: "pois päältä",
    getLastError: "viimeisin virhe",
    wasRead: "luettiinko?",
    wasWritten: "kirjoitettiinko?",
    version: "versio",
    dateCreated: "luontipäivä [STR]",
    dateModified: "muokkauspäivä [STR]",
    dateAccessed: "käyttöpäivä [STR]",
  },
  fr: {
    clean: "effacer le système de fichiers",
    del: "supprimer [STR]",
    folder: "mettre [STR] à [STR2]",
    folder_default: "LiFS est bon !",
    in: "importer le système de fichier depuis [STR]",
    list: "lister tous les fichiers sous [STR]",
    open: "ouvrir [STR]",
    out: "exporter le système de fichiers",
    search: "chercher [STR]",
    start: "créer [STR]",
    sync: "modifier l'emplacement de [STR] à [STR2]",
    listMenuAll: "tout",
    listMenuFiles: "fichiers",
    listMenuDirs: "dossiers",
    list_new: "lister [TYPE] sous [STR]",
    exists: "[STR] existe-t-il?",
    isFile: "[STR] est-il un fichier?",
    isDir: "[STR] est-il un dossier?",
    copy: "copier [STR] vers [STR2]",
    fileName: "nom de fichier de [STR]",
    dirName: "dossier de [STR]",
    sync_new: "renommer [STR] en [STR2]",
    permSet: "[ACTION] la permission [PERM] à [STR]",
    permAdd: "ajouter",
    permRemove: "supprimer",
    permCreate: "crer",
    permDelete: "supprimer",
    permSee: "voir",
    permRead: "lire",
    permWrite: "écrire",
    permList: "lister les permissions de [STR]",
    permControl: "contrôler",
    toggleLogging: "[STATE] la journalisation de la console",
    logOn: "activer",
    logOff: "désactiver",
    setLimit: "définir la limite de taille pour [DIR] à [BYTES] octets",
    removeLimit: "supprimer la limite de taille pour [DIR]",
    getLimit: "limite de taille de [DIR] (octets)",
    getSize: "taille actuelle de [DIR] (octets)",
    getLastError: "dernière erreur",
    wasRead: "lu ?",
    wasWritten: "écrit ?",
    version: "version",
    dateCreated: "date de création de [STR]",
    dateModified: "date de modification de [STR]",
    dateAccessed: "date d'accès de [STR]",
  },
  it: {
    clean: "svuota file system",
    del: "cancella [STR]",
    folder: "imposta [STR] a [STR2]",
    folder_default: "LiFS funziona!",
    in: "importa file system da [STR]",
    list: "elenca tutti i file in [STR]",
    open: "apri [STR]",
    out: "esporta file system",
    search: "cerca [STR]",
    start: "crea [STR]",
    sync: "cambia posizione di [STR] a [STR2]",
    listMenuAll: "tutti",
    listMenuFiles: "file",
    listMenuDirs: "directory",
    list_new: "elenca [TYPE] in [STR]",
    exists: "[STR] esiste?",
    isFile: "[STR] è un file?",
    isDir: "[STR] è una directory?",
    copy: "copia [STR] in [STR2]",
    fileName: "nome file di [STR]",
    dirName: "directory di [STR]",
    sync_new: "rinomina [STR] in [STR2]",
    permSet: "[ACTION] permesso [PERM] a [STR]",
    permAdd: "aggiungi",
    permRemove: "rimuovi",
    permCreate: "crea",
    permDelete: "elimina",
    permSee: "vedi",
    permRead: "leggi",
    permWrite: "scrivi",
    permList: "elenca permessi per [STR]",
    permControl: "controllare",
    toggleLogging: "[STATE] log console",
    logOn: "attiva",
    logOff: "disattiva",
    getLastError: "ultimo errore",
    wasRead: "è stato letto?",
    wasWritten: "è stato scritto?",
    version: "versione",
    dateCreated: "data creazione di [STR]",
    dateModified: "data modifica di [STR]",
    dateAccessed: "data accesso di [STR]",
  },
  ja: {
    clean: "ファイルシステムを削除する",
    del: "[STR]を削除",
    folder: "[STR]を[STR2]にセットする",
    folder_default: "LiFSは良い!",
    in: "[STR]からファイルシステムをインポートする",
    list: "[STR]直下のファイルをリスト化する",
    open: "[STR]を開く",
    out: "ファイルシステムをエクスポートする",
    search: "[STR]を検索",
    start: "[STR]を作成",
    sync: "[STR]のロケーションを[STR2]に変更する",
    listMenuAll: "すべて",
    listMenuFiles: "ファイル",
    listMenuDirs: "ディレクトリ",
    list_new: "[STR] の [TYPE] を一覧表示",
    exists: "[STR] は存在しますか？",
    isFile: "[STR] はファイルですか？",
    isDir: "[STR] はディレクトリですか？",
    copy: "[STR] を [STR2] にコピー",
    fileName: "[STR] のファイル名",
    dirName: "[STR] のディレクトリ",
    sync_new: "[STR] を [STR2] に名前変更",
    permSet: "[STR] の [PERM] 権限を [ACTION]",
    permAdd: "追加",
    permRemove: "削除",
    permCreate: "作成",
    permDelete: "削除",
    permSee: "表示",
    permRead: "読み取り",
    permWrite: "書き込み",
    permList: "[STR] の権限を一覧表示",
    permControl: "制御",
    toggleLogging: "コンソールログを [STATE] にする",
    logOn: "オン",
    logOff: "オフ",
    getLastError: "最後のエラー",
    wasRead: "読み込まれたか？",
    wasWritten: "書き込まれたか？",
    version: "バージョン",
    dateCreated: "[STR]の作成日時",
    dateModified: "[STR]の変更日時",
    dateAccessed: "[STR]のアクセス日時",
  },
  ko: {
    clean: "파일 システム 초기화하기",
    del: "[STR] 삭제하기",
    folder: "[STR]을(를) [STR2](으)로 정하기",
    folder_default: "LiFS 최고!",
    in: "[STR]에서 파일 システム 불러오기",
    list: "[STR] 안의 파일 목록",
    open: "[STR] 열기",
    out: "파일 システム 내보내기",
    search: "[STR] 검색하기",
    start: "[STR] 생성하기",
    sync: "[STR]의 경로를 [STR2](으)로 바꾸기",
    listMenuAll: "모두",
    listMenuFiles: "파일",
    listMenuDirs: "디렉터리",
    list_new: "[STR]의 [TYPE] 목록",
    exists: "[STR]이(가) 존재하나요?",
    isFile: "[STR]이(가) 파일인가요?",
    isDir: "[STR]이(가) 디렉터리인가요?",
    copy: "[STR]을(를) [STR2](으)로 복사하기",
    fileName: "[STR]의 파일 이름",
    dirName: "[STR]의 디렉터리",
    sync_new: "[STR]의 이름을 [STR2](으)로 바꾸기",
    permSet: "[STR]에 [PERM] 권한 [ACTION]",
    permAdd: "추가하기",
    permRemove: "제거하기",
    permCreate: "생성",
    permDelete: "삭제",
    permSee: "보기",
    permRead: "읽기",
    permWrite: "쓰기",
    permList: "[STR]의 권한 목록",
    permControl: "제어",
    toggleLogging: "콘솔 로깅 [STATE]",
    logOn: "켜기",
    logOff: "끄기",
    getLastError: "마지막 오류",
    wasRead: "읽었나요?",
    wasWritten: "작성했나요?",
    version: "버전",
    dateCreated: "[STR]의 생성 날짜",
    dateModified: "[STR]의 수정 날짜",
    dateAccessed: "[STR]의 접근 날짜",
  },
  nb: {
    folder_default: "LiFS er bra!",
    listMenuAll: "alle",
    listMenuFiles: "filer",
    listMenuDirs: "mapper",
    list_new: "list [TYPE] under [STR]",
    exists: "finnes [STR]?",
    isFile: "er [STR] en fil?",
    isDir: "er [STR] en mappe?",
    copy: "kopier [STR] til [STR2]",
    fileName: "filnavn til [STR]",
    dirName: "mappe til [STR]",
    sync_new: "gi [STR] nytt navn [STR2]",
    permSet: "[ACTION] [PERM] tillatelse til [STR]",
    permAdd: "legg til",
    permRemove: "fjern",
    permCreate: "opprett",
    permDelete: "slett",
    permSee: "se",
    permRead: "les",
    permWrite: "skriv",
    permList: "list tillatelser for [STR]",
    permControl: "kontroll",
    toggleLogging: "slå [STATE] konsolllogging",
    logOn: "på",
    logOff: "av",
    getLastError: "siste feil",
    wasRead: "ble lest?",
    wasWritten: "ble skrevet?",
    version: "versjon",
    dateCreated: "opprettelsesdato for [STR]",
    dateModified: "endringsdato for [STR]",
    dateAccessed: "tilgangsdato for [STR]",
  },
  nl: {
    clean: "wis het bestandssysteem",
    del: "verwijder [STR]",
    folder: "maak [STR] [STR2]",
    folder_default: "LiFS is geweldig!",
    in: "importeer bestandssysteem van [STR]",
    list: "alle bestanden onder [STR]",
    out: "exporteer bestandssysteem",
    search: "zoek [STR]",
    start: "creëer [STR]",
    sync: "verander locatie van [STR] naar [STR2]",
    listMenuAll: "alles",
    listMenuFiles: "bestanden",
    listMenuDirs: "mappen",
    list_new: "lijst [TYPE] onder [STR]",
    exists: "bestaat [STR]?",
    isFile: "is [STR] een bestand?",
    isDir: "is [STR] een map?",
    copy: "kopieer [STR] naar [STR2]",
    fileName: "bestandsnaam van [STR]",
    dirName: "map van [STR]",
    sync_new: "hernoem [STR] naar [STR2]",
    permSet: "[ACTION] [PERM] toestemming om [STR]",
    permAdd: "toevoegen",
    permRemove: "verwijderen",
    permCreate: "maken",
    permDelete: "verwijderen",
    permSee: "zien",
    permRead: "lezen",
    permWrite: "schrijven",
    permList: "lijst toestemmingen for [STR]",
    permControl: "beheren",
    toggleLogging: "zet console logging [STATE]",
    logOn: "aan",
    logOff: "uit",
    getLastError: "laatste fout",
    wasRead: "is gelezen?",
    wasWritten: "is geschreven?",
    version: "versie",
    dateCreated: "aanmaakdatum van [STR]",
    dateModified: "wijzigingsdatum van [STR]",
    dateAccessed: "toegangsdatum van [STR]",
  },
  pl: {
    del: "usuń [STR]",
    folder: "ustaw [STR] na [STR2]",
    open: "otwórz [STR]",
    search: "szukaj [STR]",
    listMenuAll: "wszystko",
    listMenuFiles: "pliki",
    listMenuDirs: "katalogi",
    list_new: "listuj [TYPE] w [STR]",
    exists: "czy [STR] istnieje?",
    isFile: "czy [STR] to plik?",
    isDir: "czy [STR] to katalog?",
    copy: "kopiej [STR] do [STR2]",
    fileName: "nazwa pliku [STR]",
    dirName: "katalog [STR]",
    sync_new: "zmień nazwę [STR] na [STR2]",
    permSet: "[ACTION] [PERM] uprawnienie do [STR]",
    permAdd: "dodaj",
    permRemove: "usuń",
    permCreate: "tworzenie",
    permDelete: "usuwanie",
    permSee: "przeglądanie",
    permRead: "czytanie",
    permWrite: "pisanie",
    permList: "listuj uprawnienia [STR]",
    permControl: "kontrola",
    toggleLogging: "włącz [STATE] logowanie konsoli",
    logOn: "włącz",
    logOff: "wyłącz",
    getLastError: "ostatni błąd",
    wasRead: "czytano?",
    wasWritten: "pisano?",
    version: "wersja",
    dateCreated: "data utworzenia [STR]",
    dateModified: "data modyfikacji [STR]",
    dateAccessed: "data dostępu [STR]",
  },
  ru: {
    clean: "очистить файловую систему",
    del: "удалить [STR]",
    folder: "задать [STR] значение [STR2]",
    folder_default: "LiFS это хорошо!",
    in: "импортировать файловую систему из [STR]",
    list: "перечислить все файлы под [STR]",
    open: "открыть [STR]",
    out: "экспортировать файловую систему",
    search: "поиск [STR]",
    start: "создать [STR]",
    sync: "изменить расположение [STR] на [STR2]",
    listMenuAll: "все",
    listMenuFiles: "файлы",
    listMenuDirs: "папки",
    list_new: "список [TYPE] в [STR]",
    exists: "[STR] существует?",
    isFile: "[STR] это файл?",
    isDir: "[STR] это папка?",
    copy: "копировать [STR] в [STR2]",
    fileName: "имя файла [STR]",
    dirName: "папка [STR]",
    sync_new: "переименовать [STR] в [STR2]",
    permSet: "[ACTION] [PERM] разрешение для [STR]",
    permAdd: "добавить",
    permRemove: "удалить",
    permCreate: "создать",
    permDelete: "удалить",
    permSee: "видеть",
    permRead: "читать",
    permWrite: "писать",
    permList: "список разрешений для [STR]",
    permControl: "управлять",
    toggleLogging: "[STATE] ведение журнала консоли",
    logOn: "включить",
    logOff: "выключить",
    getLastError: "последняя ошибка",
    wasRead: "было чтение?",
    wasWritten: "была запись?",
    version: "версия",
    dateCreated: "дата создания [STR]",
    dateModified: "дата изменения [STR]",
    dateAccessed: "дата доступа [STR]",
  },
  "zh-cn": {
    clean: "清空文件System",
    del: "删除 [STR]",
    folder: "将[STR]设为[STR2]",
    folder_default: "LiFS 好用！",
    in: "从 [STR] 导入文件System",
    list: "列出 [STR] 下的所有文件",
    open: "打开 [STR]",
    out: "导出文件 system",
    search: "搜索 [STR]",
    start: "新建 [STR]",
    sync: "将 [STR] 的位置改为 [STR2]",
    listMenuAll: "所有",
    listMenuFiles: "文件",
    listMenuDirs: "目录",
    list_new: "列出 [STR] 下的 [TYPE]",
    exists: "[STR] 是否存在？",
    isFile: "[STR] 是文件吗？",
    isDir: "[STR] 是目录吗？",
    copy: "将 [STR] 复制到 [STR2]",
    fileName: "[STR] 的文件名",
    dirName: "[STR] 的目录",
    sync_new: "将 [STR] 重命名为 [STR2]",
    permSet: "[ACTION] [STR] 的 [PERM] 权限",
    permAdd: "添加",
    permRemove: "移除",
    permCreate: "创建",
    permDelete: "删除",
    permSee: "查看",
    permRead: "读取",
    permWrite: "写入",
    permList: "列出 [STR] 的权限",
    permControl: "控制",
    toggleLogging: "[STATE]控制台日志",
    logOn: "开启",
    logOff: "关闭",
    getLastError: "上一个错误",
    wasRead: "是否读取？",
    wasWritten: "是否写入？",
    version: "版本",
    dateCreated: "[STR] 的创建日期",
    dateModified: "[STR] 的修改日期",
    dateAccessed: "[STR] 的访问日期",
  },
});
(function (Scratch) {
  "use strict";

  const defaultPerms = {
    create: true,
    delete: true,
    see: true,
    read: true,
    write: true,
    control: true,
  };

  const extensionVersion = "1.0.5";

  class LiFS {
    constructor() {
      this.fs = new Map();
      this.liFSLogEnabled = false;
      this.lastError = "";
      this.readActivity = false;
      this.writeActivity = false;

      this._log("Initializing LiFS extension...");
      this._internalClean();
    }

    getInfo() {
      return {
        id: "lithiumFS",

        name: "Lithium FS",
        color1: "#d52246",
        color2: "#a61734",
        color3: "#7f1026",

        description:
          "Advancement of rxFS. Blocks for interacting with an in-memory filesystem with permissions, size limits, and more.",
        blocks: [
          {
            opcode: "start",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "start",
              default: "create [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "folder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "folder",
              default: "set [STR] to [STR2]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  id: "folder_default",
                  default: "LiFS is good!",
                }),
              },
            },
          },
          {
            opcode: "open",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "open",
              default: "open [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "del",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "del",
              default: "delete [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "list",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "list_new",
              default: "list [TYPE] under [STR]",
            }),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LIST_TYPE_MENU",
                defaultValue: "all",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          "---",

          {
            opcode: "copy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "copy",
              default: "copy [STR] to [STR2]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/copy_of_example.txt",
              },
            },
          },
          {
            opcode: "sync",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "sync_new",
              default: "rename [STR] to [STR2]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/new_example.txt",
              },
            },
          },
          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "exists",
              default: "does [STR] exist?",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "isFile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "isFile",
              default: "is [STR] a file?",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "isDir",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "isDir",
              default: "is [STR] a directory?",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          {
            opcode: "fileName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "fileName",
              default: "file name of [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "dirName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "dirName",
              default: "directory of [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },

          {
            opcode: "dateCreated",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "dateCreated",
              default: "date created of [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "dateModified",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "dateModified",
              default: "date modified of [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          {
            opcode: "dateAccessed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "dateAccessed",
              default: "date accessed of [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/example.txt",
              },
            },
          },
          "---",

          {
            opcode: "setLimit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "setLimit",
              default: "set size limit for [DIR] to [BYTES] bytes",
            }),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
              BYTES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8192,
              },
            },
          },
          {
            opcode: "removeLimit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "removeLimit",
              default: "remove size limit for [DIR]",
            }),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          {
            opcode: "getLimit",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getLimit",
              default: "size limit of [DIR] (bytes)",
            }),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          {
            opcode: "getSize",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getSize",
              default: "current size of [DIR] (bytes)",
            }),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          {
            opcode: "setPerm",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "permSet",
              default: "[ACTION] [PERM] permission for [STR]",
            }),
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "PERM_ACTION_MENU",
                defaultValue: "remove",
              },
              PERM: {
                type: Scratch.ArgumentType.STRING,
                menu: "PERM_TYPE_MENU",
                defaultValue: "write",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          {
            opcode: "listPerms",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "permList",
              default: "list permissions for [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/LiFS/",
              },
            },
          },
          "---",

          {
            opcode: "clean",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "clean",
              default: "clear the file system",
            }),
            arguments: {},
          },
          {
            opcode: "in",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "in",
              default: "import file system from [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"version":"1.0.5","fs":{}}',
              },
            },
          },
          {
            opcode: "out",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "out",
              default: "export file system",
            }),
            arguments: {},
          },
          {
            opcode: "wasRead",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "wasRead",
              default: "was read?",
            }),
          },
          {
            opcode: "wasWritten",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "wasWritten",
              default: "was written?",
            }),
          },
          {
            opcode: "getLastError",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getLastError",
              default: "last error",
            }),
          },
          {
            opcode: "toggleLogging",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "toggleLogging",
              default: "turn [STATE] console logging",
            }),
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOG_STATE_MENU",
                defaultValue: "on",
              },
            },
          },
          {
            opcode: "getVersion",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "version",
              default: "version",
            }),
          },
        ],
        menus: {
          LIST_TYPE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  id: "listMenuAll",
                  default: "all",
                }),
                value: "all",
              },
              {
                text: Scratch.translate({
                  id: "listMenuFiles",
                  default: "files",
                }),
                value: "files",
              },
              {
                text: Scratch.translate({
                  id: "listMenuDirs",
                  default: "directories",
                }),
                value: "directories",
              },
            ],
          },
          PERM_ACTION_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  id: "permAdd",
                  default: "add",
                }),
                value: "add",
              },
              {
                text: Scratch.translate({
                  id: "permRemove",
                  default: "remove",
                }),
                value: "remove",
              },
            ],
          },
          PERM_TYPE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  id: "permCreate",
                  default: "create",
                }),
                value: "create",
              },
              {
                text: Scratch.translate({
                  id: "permDelete",
                  default: "delete",
                }),
                value: "delete",
              },
              {
                text: Scratch.translate({
                  id: "permSee",
                  default: "see",
                }),
                value: "see",
              },
              {
                text: Scratch.translate({
                  id: "permRead",
                  default: "read",
                }),
                value: "read",
              },
              {
                text: Scratch.translate({
                  id: "permWrite",
                  default: "write",
                }),
                value: "write",
              },
              {
                text: Scratch.translate({
                  id: "permControl",
                  default: "control",
                }),
                value: "control",
              },
            ],
          },
          LOG_STATE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  id: "logOn",
                  default: "on",
                }),
                value: "on",
              },
              {
                text: Scratch.translate({
                  id: "logOff",
                  default: "off",
                }),
                value: "off",
              },
            ],
          },
        },
      };
    }

    _log(message, ...args) {
      if (this.liFSLogEnabled) {
        console.log(`[LiFS] ${message}`, ...args);
      }
    }

    _warn(message, ...args) {
      if (this.liFSLogEnabled) {
        console.warn(`[LiFS] ${message}`, ...args);
      }
    }

    _setError(message, ...args) {
      this._warn(message, ...args);
      this.lastError = message;
    }

    _normalizePath(path) {
      if (typeof path !== "string" || path.length === 0) {
        return "/";
      }

      const hadTrailingSlash = path.length > 1 && path.endsWith("/");

      if (path[0] !== "/") {
        path = "/" + path;
      }

      const segments = path.split("/");
      const newSegments = [];

      for (const segment of segments) {
        if (segment === "" || segment === ".") {
          continue;
        }

        if (segment === "..") {
          if (newSegments.length > 0) {
            newSegments.pop();
          }
        } else {
          newSegments.push(segment);
        }
      }

      let newPath = "/" + newSegments.join("/");

      if (newPath === "/") {
        return "/";
      }

      if (hadTrailingSlash) {
        newPath += "/";
      }

      return newPath;
    }

    _isPathDir(path) {
      return path === "/" || path.endsWith("/");
    }

    _internalDirName(path) {
      if (path === "/") {
        return "/";
      }

      let procPath = this._isPathDir(path)
        ? path.substring(0, path.length - 1)
        : path;

      const lastSlash = procPath.lastIndexOf("/");
      if (lastSlash === 0) {
        return "/";
      }
      if (lastSlash === -1) {
        return "/";
      }

      return procPath.substring(0, lastSlash + 1);
    }

    _getStringSize(str) {
      if (str === null || str === undefined) {
        return 0;
      }

      let length = 0;
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 0x0080) {
          length += 1;
        } else if (charCode < 0x0800) {
          length += 2;
        } else if (charCode < 0xd800 || charCode > 0xdfff) {
          length += 3;
        } else {
          length += 4;
          i++;
        }
      }
      return length;
    }

    _getDirectorySize(dirPath) {
      let totalSize = 0;

      for (const [itemPath, entry] of this.fs.entries()) {
        if (
          !this._isPathDir(itemPath) &&
          itemPath.startsWith(dirPath) &&
          dirPath !== itemPath
        ) {
          totalSize += this._getStringSize(entry.content);
        }
      }
      return totalSize;
    }

    _canAccommodateChange(filePath, deltaSize) {
      if (deltaSize <= 0) {
        return true;
      }

      let currentDir = this._internalDirName(filePath);
      this._log(`Checking size change of ${deltaSize} bytes for ${filePath}`);

      while (true) {
        const entry = this.fs.get(currentDir);
        if (!entry) {
          this._warn(`Size check: Could not find parent dir ${currentDir}`);
          break;
        }

        const limit = entry.limit;
        if (limit !== -1) {
          const currentSize = this._getDirectorySize(currentDir);
          if (currentSize + deltaSize > limit) {
            this._setError(
              `Size limit exceeded for ${currentDir}: ${currentSize} + ${deltaSize} > ${limit}`
            );
            return false;
          }
        }

        if (currentDir === "/") {
          break;
        }
        currentDir = this._internalDirName(currentDir);
      }

      return true;
    }

    _internalCreate(path, content, parentDir) {
      if (this.fs.has(path)) {
        this._log("InternalCreate failed: Path already exists", path);

        return false;
      }

      if (!this.hasPermission(parentDir, "create")) {
        this._setError(`Create failed: No 'create' permission in ${parentDir}`);
        return false;
      }

      const deltaSize = this._getStringSize(content);
      if (!this._canAccommodateChange(path, deltaSize)) {
        this._log("InternalCreate failed: Size limit exceeded");
        return false;
      }

      let permsToInherit;
      const parentEntry = this.fs.get(parentDir);

      if (parentEntry) {
        permsToInherit = parentEntry.perms;
      } else if (parentDir === "/") {
        permsToInherit = this.fs.get("/").perms;
      } else {
        this._warn(
          "InternalCreate: Parent not found, using default perms",
          parentDir
        );
        permsToInherit = defaultPerms;
      }

      const now = Date.now();
      this.fs.set(path, {
        content: content,
        perms: JSON.parse(JSON.stringify(permsToInherit)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this.writeActivity = true;
      this._log("InternalCreate successful:", path);
      return true;
    }

    hasPermission(path, action) {
      const normPath = this._normalizePath(path);
      this._log("Checking permission:", action, "on", normPath);

      const entry = this.fs.get(normPath);

      if (entry) {
        const result = entry.perms[action];
        this._log("Permission result:", result);
        return result;
      }

      if (action === "create") {
        const parentDir = this._internalDirName(normPath);
        const parentEntry = this.fs.get(parentDir);

        if (!parentEntry) {
          const result = parentDir === "/";
          this._log("Permission result (parent check, root):", result);
          return result;
        }
        const result = parentEntry.perms.create;
        this._log("Permission result (parent check):", result);
        return result;
      }

      this._log("Permission result (default fail):", false);
      return false;
    }

    _internalClean() {
      this._log("Internal: Clearing file system...");
      const now = Date.now();
      this.fs.clear();
      this.fs.set("/", {
        content: null,
        perms: JSON.parse(JSON.stringify(defaultPerms)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this._log("Internal: File system reset to root.");
      this.writeActivity = true;
    }

    clean() {
      this.lastError = "";
      this._log("Block: clean");
      if (!this.hasPermission("/", "delete")) {
        return this._setError("Clean failed: No 'delete' permission on /");
      }
      this._internalClean();
    }

    sync({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      this._log("Block: rename", path1, "to", path2);

      if (!this.hasPermission(path1, "delete")) {
        return this._setError(
          `Rename failed: No 'delete' permission on ${path1}`
        );
      }
      if (this.fs.has(path2)) {
        return this._setError(
          `Rename failed: Destination ${path2} already exists`
        );
      }
      if (!this.hasPermission(path2, "create")) {
        return this._setError(
          `Rename failed: No 'create' permission for ${path2}`
        );
      }

      const entry = this.fs.get(path1);
      if (!entry) {
        return this._setError(`Rename failed: Source ${path1} not found`);
      }

      const isDir = this._isPathDir(path1);
      let deltaSize = 0;
      if (isDir) {
        deltaSize = this._getDirectorySize(path1);
      } else {
        deltaSize = this._getStringSize(entry.content);
      }

      if (!this._canAccommodateChange(path2, deltaSize)) {
        return;
      }

      const now = Date.now();

      if (isDir) {
        this._log("Renaming directory and children...");

        const toRename = [];
        for (const [key, value] of this.fs.entries()) {
          if (key.startsWith(path1)) {
            toRename.push({
              oldKey: key,
              value: value,
            });
          }
        }

        const path1Length = path1.length;
        for (const item of toRename) {
          const remainder = item.oldKey.substring(path1Length);
          const newChildPath = path2 + remainder;

          if (item.oldKey === path1) {
            item.value.modified = now;
            item.value.accessed = now;
          }

          this.fs.set(newChildPath, item.value);
          this.fs.delete(item.oldKey);

          this._log(`Renaming: ${item.oldKey} to ${newChildPath}`);
        }
      } else {
        this._log("Renaming single file...");
        entry.modified = now;
        entry.accessed = now;
        this.fs.set(path2, entry);
        this.fs.delete(path1);
        this._log("Rename successful");
      }
      this.writeActivity = true;
    }

    copy({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      this._log("Block: copy", path1, "to", path2);

      const entry = this.fs.get(path1);
      if (!entry) {
        return this._setError(`Copy failed: Source ${path1} not found`);
      }

      if (!entry.perms.read) {
        return this._setError(`Copy failed: No 'read' permission on ${path1}`);
      }
      if (this.fs.has(path2)) {
        return this._setError(
          `Copy failed: Destination ${path2} already exists`
        );
      }
      if (!this.hasPermission(path2, "create")) {
        return this._setError(
          `Copy failed: No 'create' permission for ${path2}`
        );
      }

      this.readActivity = true;
      const now = Date.now();
      entry.accessed = now;

      if (this._isPathDir(path1)) {
        const toCopy = [];
        let totalDeltaSize = 0;
        const path1Length = path1.length;

        for (const [key, value] of this.fs.entries()) {
          if (key.startsWith(path1)) {
            if (!this._isPathDir(key)) {
              totalDeltaSize += this._getStringSize(value.content);
            }
            toCopy.push({
              key,
              value,
            });
          }
        }

        if (!this._canAccommodateChange(path2, totalDeltaSize)) {
          return;
        }

        for (const item of toCopy) {
          const remainder = item.key.substring(path1Length);
          const newChildPath = path2 + remainder;

          this.fs.set(newChildPath, {
            content:
              item.value.content === null ? null : "" + item.value.content,
            perms: JSON.parse(JSON.stringify(item.value.perms)),
            limit: item.value.limit,
            created: item.value.created,
            modified: item.value.modified,
            accessed: now,
          });
          this._log(`Copied ${item.key} to ${newChildPath}`);
        }
        this.writeActivity = true;
        this._log("Recursive copy successful");
      } else {
        const content = "" + entry.content;
        const deltaSize = this._getStringSize(content);
        if (!this._canAccommodateChange(path2, deltaSize)) {
          return;
        }

        const destParentDir = this._internalDirName(path2);
        const destParentEntry = this.fs.get(destParentDir);
        let permsToInherit = defaultPerms;

        if (destParentEntry) {
          permsToInherit = destParentEntry.perms;
        } else if (destParentDir === "/") {
          permsToInherit = this.fs.get("/").perms;
        } else {
          this._log(
            `Copy: Could not find parent "${destParentDir}", using default perms.`
          );
        }

        this.fs.set(path2, {
          content: content,
          perms: JSON.parse(JSON.stringify(permsToInherit)),
          limit: -1,
          created: now,
          modified: now,
          accessed: now,
        });
        this.writeActivity = true;
        this._log("Copy successful");
      }
    }

    start({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      this._log("Block: create", path);

      if (this._isPathDir(path) && path.length > 1) {
        const fileName = path
          .substring(0, path.length - 1)
          .split("/")
          .pop();
        if (fileName.includes(".")) {
          this._warn(
            `Path "${path}" looks like a file but is being treated as a directory due to the trailing slash.`
          );
        }
      }

      if (path === "/") {
        return this._setError(
          "Create failed: Cannot create root directory '/'"
        );
      }

      if (this.fs.has(path)) {
        return this._setError(`Create failed: ${path} already exists`);
      }

      const parentDir = this._internalDirName(path);
      if (parentDir !== "/" && !this.fs.has(parentDir)) {
        this._log("Creating parent directory:", parentDir);

        if (!this.hasPermission(parentDir, "create")) {
          return this._setError(
            `Create failed: No 'create' permission in ${this._internalDirName(parentDir)}, aborting recursive create.`
          );
        }

        this.start({
          STR: parentDir,
        });

        if (this.lastError) {
          this._log(
            "Create failed: Parent creation failed (recursive call failed)."
          );

          return;
        }
        if (!this.fs.has(parentDir)) {
          return this._setError(
            "Create failed: Parent creation failed, aborting."
          );
        }
      }

      const ok = this._internalCreate(
        path,
        this._isPathDir(path) ? null : "",
        parentDir
      );

      if (!ok) {
        this._log("Create failed: _internalCreate returned false.");

        if (!this.lastError) {
          this._setError(
            `Create failed: An internal error occurred for ${path}`
          );
        }
        return;
      }
    }

    open({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: open", path);

      const entry = this.fs.get(path);
      this.readActivity = true;

      if (!entry) {
        this._log("Result: (Not found)", "");
        return "";
      }
      if (this._isPathDir(path)) {
        this._log("Result: (Is a directory)", "");
        return "";
      }

      if (!entry.perms.read) {
        this._warn(`Read permission denied for "${path}"`);
        return "";
      }

      entry.accessed = Date.now();
      const content = entry.content;
      this._log("Result:", content);
      return content;
    }

    del({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      this._log("Block: delete", path);

      if (!this.hasPermission(path, "delete")) {
        return this._setError(
          `Delete failed: No 'delete' permission on ${path}`
        );
      }

      const isDir = this._isPathDir(path);

      const toDelete = [];
      for (const currentPath of this.fs.keys()) {
        if (isDir) {
          if (currentPath.startsWith(path)) {
            toDelete.push(currentPath);
          }
        } else {
          if (currentPath === path) {
            toDelete.push(currentPath);
            break;
          }
        }
      }

      for (const key of toDelete) {
        this.fs.delete(key);
        this._log("Deleted:", key);
      }

      this.writeActivity = true;
      this._log("Delete complete");
    }

    folder({ STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      this._log("Block: set", path, "to", STR2);

      let entry = this.fs.get(path);

      if (!entry) {
        this._log("Set: File not found, attempting to create...");
        this.start({
          STR: path,
        });
        entry = this.fs.get(path);
        if (!entry) {
          this._log("Set failed: Creation also failed");

          return;
        }
      }

      if (this._isPathDir(path)) {
        return this._setError("Set failed: Cannot set content of a directory");
      }
      if (!entry.perms.write) {
        return this._setError(`Set failed: No 'write' permission on ${path}`);
      }

      const oldContent = entry.content || "";
      const deltaSize =
        this._getStringSize(STR2) - this._getStringSize(oldContent);

      if (!this._canAccommodateChange(path, deltaSize)) {
        return;
      }

      entry.content = STR2;
      const now = Date.now();
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this._log("Set successful");
    }

    list({ TYPE, STR }) {
      let path = this._normalizePath(STR);
      if (!this._isPathDir(path)) {
        path += "/";
      }

      this._log("Block: list", TYPE, "under", path);
      this.readActivity = true;
      const emptyList = [];

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("List failed: Directory not found.");
        return emptyList;
      }

      if (!this.hasPermission(path, "see")) {
        this._log("List failed: No see permission on directory");
        return emptyList;
      }

      entry.accessed = Date.now();

      let children = new Set();
      const pathLen = path.length;

      for (const itemPath of this.fs.keys()) {
        if (itemPath === path || itemPath === "/") continue;

        if (itemPath.startsWith(path)) {
          let remainder = itemPath.substring(pathLen);
          let nextSlash = remainder.indexOf("/");
          let childName = "";
          let isDir = false;

          if (nextSlash === -1) {
            childName = remainder;
            isDir = false;
          } else {
            childName = remainder.substring(0, nextSlash + 1);
            isDir = true;
          }

          if (childName === "") continue;

          const childPath = `${path}${childName}`;
          if (!this.hasPermission(childPath, "see")) {
            this._log("List: Skipping item (no see perm):", childPath);
            continue;
          }

          if (TYPE === "all") children.add(childName);
          else if (TYPE === "files" && !isDir) children.add(childName);
          else if (TYPE === "directories" && isDir) children.add(childName);
        }
      }

      const childrenArray = Array.from(children);
      this._log("List result (raw):", childrenArray);
      return childrenArray;
    }

    in({ STR }) {
      this.lastError = "";
      this._log("Block: import");
      if (!this.hasPermission("/", "delete")) {
        return this._setError("Import failed: No 'delete' permission on /");
      }
      try {
        const data = JSON.parse(STR);

        const version = data ? data.version : null;
        if (!version) {
          return this._setError(
            "Import failed: Data invalid or missing version."
          );
        }

        let migrationData = {};
        let needsMigration = false;

        if (version === "1.0.5") {
          if (
            !data.fs ||
            typeof data.fs !== "object" ||
            Array.isArray(data.fs)
          ) {
            return this._setError(
              "Import failed: v1.0.5 data is corrupt (missing 'fs' object)."
            );
          }
          migrationData = data.fs;
        } else if (
          version === "1.0.4" ||
          version === "1.0.3" ||
          version === "1.0.2"
        ) {
          this._log(`Import: Migrating v${version} save...`);
          needsMigration = true;
          if (!Array.isArray(data.sl)) {
            this._log(`... adding 'sl' array.`);
            data.sl = new Array(data.sy.length).fill(-1);
          }
          if (
            !Array.isArray(data.fi) ||
            !Array.isArray(data.sy) ||
            !Array.isArray(data.pm) ||
            !Array.isArray(data.sl) ||
            data.fi.length !== data.sy.length ||
            data.fi.length !== data.pm.length ||
            data.fi.length !== data.sl.length ||
            data.sy.indexOf("/") === -1
          ) {
            return this._setError(
              "Import failed: Old version data arrays are corrupt or mismatched."
            );
          }

          const now = Date.now();
          data.created = new Array(data.sy.length).fill(now);
          data.modified = new Array(data.sy.length).fill(now);
          data.accessed = new Array(data.sy.length).fill(now);
        } else {
          return this._setError(
            `Import failed: Incompatible version "${version}". Expected "${extensionVersion}" or older.`
          );
        }

        if (needsMigration) {
          this.fs.clear();
          for (let i = 0; i < data.sy.length; i++) {
            const perm = data.pm[i];
            const limit = data.sl[i];

            if (
              typeof data.sy[i] !== "string" ||
              typeof perm !== "object" ||
              perm === null ||
              Array.isArray(perm) ||
              typeof limit !== "number" ||
              typeof perm.create !== "boolean" ||
              typeof perm.delete !== "boolean" ||
              typeof perm.see !== "boolean" ||
              typeof perm.read !== "boolean" ||
              typeof perm.write !== "boolean" ||
              typeof perm.control !== "boolean"
            ) {
              this._setError(
                "Import failed: Corrupt data found in legacy filesystem entries."
              );
              this._internalClean();
              return;
            }
            this.fs.set(data.sy[i], {
              content: data.fi[i],
              perms: data.pm[i],
              limit: data.sl[i],
              created: data.created[i],
              modified: data.modified[i],
              accessed: data.accessed[i],
            });
          }
        } else {
          this.fs.clear();
          for (const path in data.fs) {
            if (Object.prototype.hasOwnProperty.call(data.fs, path)) {
              const entry = data.fs[path];

              if (
                !entry ||
                typeof entry.perms !== "object" ||
                typeof entry.limit !== "number" ||
                typeof entry.created !== "number" ||
                typeof entry.modified !== "number" ||
                typeof entry.accessed !== "number"
              ) {
                this._setError(
                  `Import failed: Corrupt entry for path "${path}".`
                );
                this._internalClean();
                return;
              }
              this.fs.set(path, entry);
            }
          }
          if (!this.fs.has("/")) {
            this._setError(
              "Import failed: Rebuilt filesystem is missing root '/'."
            );
            this._internalClean();
            return;
          }
        }

        this.writeActivity = true;
        this._log("Import successful");
      } catch (e) {
        this._setError(
          `Import failed: JSON parse error. File system was not changed.`
        );
      }
    }

    out() {
      this._log("Block: export");
      this.readActivity = true;

      const fsObject = {};
      for (const [path, entry] of this.fs.entries()) {
        fsObject[path] = entry;
      }

      const result = JSON.stringify({
        version: extensionVersion,
        fs: fsObject,
      });
      this._log("Export successful, size:", result.length);
      return result;
    }

    exists({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: exists", path);
      this.readActivity = true;

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }
      entry.accessed = Date.now();
      this._log("Result: true");
      return true;
    }

    isFile({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: isFile", path);
      this.readActivity = true;

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }

      entry.accessed = Date.now();
      const result = !this._isPathDir(path);
      this._log("Result:", result);
      return result;
    }

    isDir({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: isDir", path);
      this.readActivity = true;

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }

      entry.accessed = Date.now();
      const result = this._isPathDir(path);
      this._log("Result:", result);
      return result;
    }

    setPerm({ ACTION, PERM, STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      this._log("Block: setPerm", ACTION, PERM, "for", path);

      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `setPerm failed: No 'control' permission on ${path}`
        );
      }

      const newValue = ACTION === "add";
      const isDir = this._isPathDir(path);
      const now = Date.now();

      this._log("Applying changes...");
      for (const [currentPath, entry] of this.fs.entries()) {
        if ((isDir && currentPath.startsWith(path)) || currentPath === path) {
          entry.perms[PERM] = newValue;
          entry.modified = now;
          entry.accessed = now;
          this._log("Changed perm for:", currentPath);
        }
      }
      this.writeActivity = true;
      this._log("setPerm complete");
    }

    listPerms({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: listPerms", path);
      this.readActivity = true;

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: {} (not found)");
        return JSON.stringify({});
      }

      if (!entry.perms.see) {
        this._warn(`See permission denied for "${path}"`);
        return JSON.stringify({});
      }

      entry.accessed = Date.now();
      const result = JSON.stringify(entry.perms);
      this._log("Result:", result);
      return result;
    }

    fileName({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: fileName", path);
      this.readActivity = true;

      if (!this.hasPermission(path, "see")) {
        this._warn(`See permission denied for "${path}"`);
        return "";
      }

      const entry = this.fs.get(path);
      if (entry) entry.accessed = Date.now();

      if (path === "/") {
        this._log("Result: /");
        return "/";
      }

      let procPath = this._isPathDir(path)
        ? path.substring(0, path.length - 1)
        : path;

      const lastSlash = procPath.lastIndexOf("/");
      if (lastSlash === -1) {
        this._log("Result (no slash):", procPath);
        return procPath;
      }
      const file = procPath.substring(lastSlash + 1);
      this._log("Result:", file);
      return file;
    }

    dirName({ STR }) {
      const path = this._normalizePath(STR);
      this._log("Block: dirName", path);
      this.readActivity = true;

      if (!this.hasPermission(path, "see")) {
        this._warn(`See permission denied for "${path}"`);
        return "";
      }

      const entry = this.fs.get(path);
      if (entry) entry.accessed = Date.now();

      const parent = this._internalDirName(path);
      this._log("Result:", parent);
      return parent;
    }

    toggleLogging({ STATE }) {
      this.liFSLogEnabled = STATE === "on";
      this._log("Console logging turned", STATE);
    }

    setLimit({ DIR, BYTES }) {
      this.lastError = "";
      const path = this._normalizePath(DIR);
      this._log("Block: setLimit", path, "to", BYTES, "bytes");

      if (!this._isPathDir(path)) {
        return this._setError(
          "setLimit failed: Path must be a directory (end with /)"
        );
      }
      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `setLimit failed: No 'control' permission on ${path}`
        );
      }
      const entry = this.fs.get(path);
      if (!entry) {
        return this._setError(`setLimit failed: Directory ${path} not found`);
      }

      const limitInBytes = Math.max(-1, parseFloat(BYTES) || 0);

      if (limitInBytes !== -1) {
        const currentSize = this._getDirectorySize(path);
        if (currentSize > limitInBytes) {
          return this._setError(
            `setLimit failed: New limit (${limitInBytes} B) is smaller than current directory size (${currentSize} B)`
          );
        }
      }

      const now = Date.now();
      entry.limit = limitInBytes;
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this._log("setLimit successful");
    }

    removeLimit({ DIR }) {
      this.lastError = "";
      const path = this._normalizePath(DIR);
      this._log("Block: removeLimit", path);

      if (!this._isPathDir(path)) {
        return this._setError(
          "removeLimit failed: Path must be a directory (end with /)"
        );
      }
      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `removeLimit failed: No 'control' permission on ${path}`
        );
      }
      const entry = this.fs.get(path);
      if (!entry) {
        return this._setError(
          `removeLimit failed: Directory ${path} not found`
        );
      }

      const now = Date.now();
      entry.limit = -1;
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this._log("removeLimit successful");
    }

    getLimit({ DIR }) {
      const path = this._normalizePath(DIR);
      this._log("Block: getLimit", path);
      this.readActivity = true;

      if (!this._isPathDir(path)) {
        this._warn("getLimit failed: Path must be a directory (end with /)");
        return -1;
      }
      if (!this.hasPermission(path, "see")) {
        this._warn(`getLimit failed: No 'see' permission for "${path}"`);
        return -1;
      }

      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`getLimit failed: Directory ${path} not found`);
        return -1;
      }

      entry.accessed = Date.now();
      const limitInBytes = entry.limit;
      this._log("getLimit result:", limitInBytes, "bytes");
      return limitInBytes;
    }

    getSize({ DIR }) {
      const path = this._normalizePath(DIR);
      this._log("Block: getSize", path);
      this.readActivity = true;

      if (!this._isPathDir(path)) {
        this._warn("getSize failed: Path must be a directory (end with /)");
        return 0;
      }
      if (!this.hasPermission(path, "see")) {
        this._warn(`getSize failed: No 'see' permission for "${path}"`);
        return 0;
      }

      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`getSize failed: Directory ${path} not found`);
        return 0;
      }

      entry.accessed = Date.now();
      const sizeInBytes = this._getDirectorySize(path);
      this._log("getSize result:", sizeInBytes, "bytes");
      return sizeInBytes;
    }

    _getTimestamp(path, type) {
      this.readActivity = true;
      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`Timestamp check failed: ${path} not found.`);
        return "";
      }
      if (!entry.perms.see) {
        this._warn(`Timestamp check failed: No 'see' permission on ${path}.`);
        return "";
      }
      entry.accessed = Date.now();
      const timestamp = entry[type];
      return new Date(timestamp).toISOString();
    }

    dateCreated({ STR }) {
      const path = this._normalizePath(STR);
      return this._getTimestamp(path, "created");
    }

    dateModified({ STR }) {
      const path = this._normalizePath(STR);
      return this._getTimestamp(path, "modified");
    }

    dateAccessed({ STR }) {
      const path = this._normalizePath(STR);
      return this._getTimestamp(path, "accessed");
    }

    getLastError() {
      return this.lastError;
    }

    wasRead() {
      const val = this.readActivity;
      this.readActivity = false;
      return val;
    }

    wasWritten() {
      const val = this.writeActivity;
      this.writeActivity = false;
      return val;
    }

    getVersion() {
      return extensionVersion;
    }
  }

  Scratch.extensions.register(new LiFS());
})(Scratch);
