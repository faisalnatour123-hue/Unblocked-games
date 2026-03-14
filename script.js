// Game data will be fetched from data.json
let games = [];
let filteredGames = [];
let favorites = new Set();
let recentGames = [];
let currentCategory = 'all';
let currentLanguage = 'en';

const translations = {
    en: {
        site_title: "Faisal's Unblocked Games",
        themes: "THEMES",
        warning_russian: "The game is russian in default, theres a button on top of the game to change the language!",
        search_placeholder: "Search games...",
        all_games: "ALL GAMES",
        featured_games: "FEATURED GAMES",
        favorites: "FAVORITES",
        sort: "SORT",
        sort_newest: "Newest First",
        sort_oldest: "Oldest First",
        sort_az: "A-Z",
        sort_za: "Z-A",
        no_games_found: "No games found matching",
        try_again: "TRY AGAIN",
        back: "BACK",
        controls: "CONTROLS",
        about: "About",
        settings: "SETTINGS",
        open_new_tab: "Open in New Tab",
        open_new_tab_desc: "Launch games in a separate browser tab",
        focus_mode: "Focus Mode",
        focus_mode_desc: "Hide header while playing games",
        cancel: "CANCEL",
        save: "SAVE",
        close: "CLOSE",
        description: "DESCRIPTION",
        tags: "TAGS",
        play_now: "PLAY NOW",
        more_info: "MORE INFO",
        no_favorites: "NO FAVORITES YET! CLICK THE HEART ICON TO ADD SOME.",
        no_category: "NO GAMES FOUND IN THIS CATEGORY.",
        no_games: "NO GAMES IN THIS CASTLE YET!",
        theme_featured: "Featured", theme_minecraft: "Minecraft", theme_dark_modes: "Dark Modes", theme_dark: "Dark", theme_obsidian: "Obsidian", theme_abyss: "Abyss", theme_night_modes: "Night Modes", theme_midnight: "Midnight", theme_deepspace: "Deep Space", theme_neon_night: "Neon Night", theme_mario_bros: "Mario Bros", theme_mario: "Mario", theme_luigi: "Luigi", theme_peach: "Peach", theme_bowser: "Bowser", theme_wario: "Wario", theme_anime: "Anime", theme_naruto: "Naruto", theme_onepiece: "One Piece", theme_dragon_ball: "Dragon Ball", theme_demon_slayer: "Demon Slayer", theme_bleach: "Bleach", theme_classic: "Classic", theme_classic_light: "Classic Light", theme_sports: "Sports", theme_basketball: "Basketball", theme_soccer: "Soccer", theme_tennis: "Tennis", theme_flags: "Flags", theme_usa: "USA", theme_asia: "Asia", theme_jordan: "Jordan", theme_palestine: "Palestine", theme_japan: "Japan", theme_south_korea: "South Korea"
    },
    es: {
        site_title: "Juegos Desbloqueados de Faisal",
        themes: "TEMAS",
        warning_russian: "El juego está en ruso por defecto, ¡hay un botón en la parte superior para cambiar el idioma!",
        search_placeholder: "Buscar juegos...",
        all_games: "TODOS LOS JUEGOS",
        featured_games: "JUEGOS DESTACADOS",
        favorites: "FAVORITOS",
        sort: "ORDENAR",
        sort_newest: "Más nuevos",
        sort_oldest: "Más antiguos",
        sort_az: "A-Z",
        sort_za: "Z-A",
        no_games_found: "No se encontraron juegos para",
        try_again: "INTENTAR DE NUEVO",
        back: "VOLVER",
        controls: "CONTROLES",
        about: "Acerca de",
        settings: "AJUSTES",
        open_new_tab: "Abrir en nueva pestaña",
        open_new_tab_desc: "Lanzar juegos en una pestaña separada",
        focus_mode: "Modo Enfoque",
        focus_mode_desc: "Ocultar encabezado al jugar",
        cancel: "CANCELAR",
        save: "GUARDAR",
        close: "CERRAR",
        description: "DESCRIPCIÓN",
        tags: "ETIQUETAS",
        play_now: "JUGAR AHORA",
        more_info: "MÁS INFO",
        no_favorites: "¡AÚN NO HAY FAVORITOS! HAZ CLIC EN EL CORAZÓN PARA AÑADIR.",
        no_category: "NO SE ENCONTRARON JUEGOS EN ESTA CATEGORÍA.",
        no_games: "¡AÚN NO HAY JUEGOS EN ESTE CASTILLO!",
        theme_featured: "Destacado", theme_minecraft: "Minecraft", theme_dark_modes: "Modos Oscuros", theme_dark: "Oscuro", theme_obsidian: "Obsidiana", theme_abyss: "Abismo", theme_night_modes: "Modos Nocturnos", theme_midnight: "Medianoche", theme_deepspace: "Espacio Profundo", theme_neon_night: "Noche de Neón", theme_mario_bros: "Mario Bros", theme_mario: "Mario", theme_luigi: "Luigi", theme_peach: "Peach", theme_bowser: "Bowser", theme_wario: "Wario", theme_anime: "Anime", theme_naruto: "Naruto", theme_onepiece: "One Piece", theme_dragon_ball: "Dragon Ball", theme_demon_slayer: "Demon Slayer", theme_bleach: "Bleach", theme_classic: "Clásico", theme_classic_light: "Clásico Claro", theme_sports: "Deportes", theme_basketball: "Baloncesto", theme_soccer: "Fútbol", theme_tennis: "Tenis", theme_flags: "Banderas", theme_usa: "EE. UU.", theme_asia: "Asia", theme_jordan: "Jordania", theme_palestine: "Palestina", theme_japan: "Japón", theme_south_korea: "Corea del Sur"
    },
    fr: {
        site_title: "Jeux Débloqués de Faisal",
        themes: "THÈMES",
        warning_russian: "Le jeu est en russe par défaut, il y a un bouton en haut pour changer la langue !",
        search_placeholder: "Rechercher des jeux...",
        all_games: "TOUS LES JEUX",
        featured_games: "JEUX EN VEDETTE",
        favorites: "FAVORIS",
        sort: "TRIER",
        sort_newest: "Plus récents",
        sort_oldest: "Plus anciens",
        sort_az: "A-Z",
        sort_za: "Z-A",
        no_games_found: "Aucun jeu trouvé pour",
        try_again: "RÉESSAYER",
        back: "RETOUR",
        controls: "CONTRÔLES",
        about: "À propos de",
        settings: "PARAMÈTRES",
        open_new_tab: "Ouvrir dans un nouvel onglet",
        open_new_tab_desc: "Lancer les jeux dans un onglet séparé",
        focus_mode: "Mode Focus",
        focus_mode_desc: "Masquer l'en-tête pendant le jeu",
        cancel: "ANNULER",
        save: "ENREGISTRER",
        close: "FERMER",
        description: "DESCRIPTION",
        tags: "TAGS",
        play_now: "JOUER",
        more_info: "PLUS D'INFOS",
        no_favorites: "AUCUN FAVORI ! CLIQUEZ SUR LE CŒUR POUR EN AJOUTER.",
        no_category: "AUCUN JEU TROUVÉ DANS CETTE CATÉGORIE.",
        no_games: "AUCUN JEU DANS CE CHÂTEAU POUR LE MOMENT !",
        theme_featured: "En Vedette", theme_minecraft: "Minecraft", theme_dark_modes: "Modes Sombres", theme_dark: "Sombre", theme_obsidian: "Obsidienne", theme_abyss: "Abysse", theme_night_modes: "Modes Nuit", theme_midnight: "Minuit", theme_deepspace: "Espace Profond", theme_neon_night: "Nuit Néon", theme_mario_bros: "Mario Bros", theme_mario: "Mario", theme_luigi: "Luigi", theme_peach: "Peach", theme_bowser: "Bowser", theme_wario: "Wario", theme_anime: "Anime", theme_naruto: "Naruto", theme_onepiece: "One Piece", theme_dragon_ball: "Dragon Ball", theme_demon_slayer: "Demon Slayer", theme_bleach: "Bleach", theme_classic: "Classique", theme_classic_light: "Classique Clair", theme_sports: "Sports", theme_basketball: "Basket", theme_soccer: "Football", theme_tennis: "Tennis", theme_flags: "Drapeaux", theme_usa: "États-Unis", theme_asia: "Asie", theme_jordan: "Jordanie", theme_palestine: "Palestine", theme_japan: "Japon", theme_south_korea: "Corée du Sud"
    },
    ru: {
        site_title: "Игры Фейсала",
        themes: "ТЕМЫ",
        warning_russian: "Игра по умолчанию на русском языке, наверху есть кнопка для изменения языка!",
        search_placeholder: "Поиск игр...",
        all_games: "ВСЕ ИГРЫ",
        featured_games: "РЕКОМЕНДУЕМЫЕ ИГРЫ",
        favorites: "ИЗБРАННОЕ",
        sort: "СОРТИРОВКА",
        sort_newest: "Сначала новые",
        sort_oldest: "Сначала старые",
        sort_az: "А-Я",
        sort_za: "Я-А",
        no_games_found: "Игры не найдены для",
        try_again: "ПОПРОБОВАТЬ СНОВА",
        back: "НАЗАД",
        controls: "УПРАВЛЕНИЕ",
        about: "Об игре",
        settings: "НАСТРОЙКИ",
        open_new_tab: "Открыть в новой вкладке",
        open_new_tab_desc: "Запускать игры в отдельной вкладке",
        focus_mode: "Режим фокусировки",
        focus_mode_desc: "Скрыть заголовок во время игры",
        cancel: "ОТМЕНА",
        save: "СОХРАНИТЬ",
        close: "ЗАКРЫТЬ",
        description: "ОПИСАНИЕ",
        tags: "ТЕГИ",
        play_now: "ИГРАТЬ",
        more_info: "ПОДРОБНЕЕ",
        no_favorites: "НЕТ ИЗБРАННЫХ! НАЖМИТЕ НА СЕРДЕЧКО, ЧТОБЫ ДОБАВИТЬ.",
        no_category: "В ЭТОЙ КАТЕГОРИИ ИГР НЕ НАЙДЕНО.",
        no_games: "В ЭТОМ ЗАМКЕ ПОКА НЕТ ИГР!",
        theme_featured: "Рекомендуемые", theme_minecraft: "Minecraft", theme_dark_modes: "Темные Режимы", theme_dark: "Темный", theme_obsidian: "Обсидиан", theme_abyss: "Бездна", theme_night_modes: "Ночные Режимы", theme_midnight: "Полночь", theme_deepspace: "Глубокий Космос", theme_neon_night: "Неоновая Ночь", theme_mario_bros: "Марио Брос", theme_mario: "Марио", theme_luigi: "Луиджи", theme_peach: "Пич", theme_bowser: "Боузер", theme_wario: "Варио", theme_anime: "Аниме", theme_naruto: "Наруто", theme_onepiece: "Ван Пис", theme_dragon_ball: "Драгонболл", theme_demon_slayer: "Клинок, рассекающий демонов", theme_bleach: "Блич", theme_classic: "Классика", theme_classic_light: "Классический Светлый", theme_sports: "Спорт", theme_basketball: "Баскетбол", theme_soccer: "Футбол", theme_tennis: "Теннис", theme_flags: "Флаги", theme_usa: "США", theme_asia: "Азия", theme_jordan: "Иордания", theme_palestine: "Палестина", theme_japan: "Япония", theme_south_korea: "Южная Корея"
    },
    ar: {
        site_title: "ألعاب فيصل غير المحجوبة",
        themes: "السمات",
        warning_russian: "اللعبة باللغة الروسية افتراضيًا، يوجد زر أعلى اللعبة لتغيير اللغة!",
        search_placeholder: "البحث عن ألعاب...",
        all_games: "كل الألعاب",
        featured_games: "ألعاب مميزة",
        favorites: "المفضلة",
        sort: "ترتيب",
        sort_newest: "الأحدث أولاً",
        sort_oldest: "الأقدم أولاً",
        sort_az: "أ-ي",
        sort_za: "ي-أ",
        no_games_found: "لم يتم العثور على ألعاب تطابق",
        try_again: "حاول مرة أخرى",
        back: "رجوع",
        controls: "التحكم",
        about: "حول",
        settings: "الإعدادات",
        open_new_tab: "فتح في علامة تبويب جديدة",
        open_new_tab_desc: "تشغيل الألعاب في علامة تبويب منفصلة",
        focus_mode: "وضع التركيز",
        focus_mode_desc: "إخفاء الشريط العلوي أثناء اللعب",
        cancel: "إلغاء",
        save: "حفظ",
        close: "إغلاق",
        description: "الوصف",
        tags: "العلامات",
        play_now: "العب الآن",
        more_info: "مزيد من المعلومات",
        no_favorites: "لا توجد مفضلة بعد! انقر على أيقونة القلب للإضافة.",
        no_category: "لم يتم العثور على ألعاب في هذه الفئة.",
        no_games: "لا توجد ألعاب في هذه القلعة بعد!",
        theme_featured: "مميز", theme_minecraft: "ماين كرافت", theme_dark_modes: "أوضاع داكنة", theme_dark: "داكن", theme_obsidian: "سبج", theme_abyss: "هاوية", theme_night_modes: "أوضاع ليلية", theme_midnight: "منتصف الليل", theme_deepspace: "فضاء عميق", theme_neon_night: "ليلة نيون", theme_mario_bros: "ماريو بروس", theme_mario: "ماريو", theme_luigi: "لويجي", theme_peach: "بيتش", theme_bowser: "باوزر", theme_wario: "واريو", theme_anime: "أنمي", theme_naruto: "ناروتو", theme_onepiece: "ون بيس", theme_dragon_ball: "دراغون بول", theme_demon_slayer: "قاتل الشياطين", theme_bleach: "بليتش", theme_classic: "كلاسيكي", theme_classic_light: "كلاسيكي فاتح", theme_sports: "رياضة", theme_basketball: "كرة سلة", theme_soccer: "كرة قدم", theme_tennis: "تنس", theme_flags: "أعلام", theme_usa: "الولايات المتحدة", theme_asia: "آسيا", theme_jordan: "الأردن", theme_palestine: "فلسطين", theme_japan: "اليابان", theme_south_korea: "كوريا الجنوبية"
    },
    de: {
        site_title: "Faisals Entsperrte Spiele",
        themes: "THEMEN",
        warning_russian: "Das Spiel ist standardmäßig auf Russisch, es gibt eine Schaltfläche oben, um die Sprache zu ändern!",
        search_placeholder: "Spiele suchen...",
        all_games: "ALLE SPIELE",
        featured_games: "EMPFOHLENE SPIELE",
        favorites: "FAVORITEN",
        sort: "SORTIEREN",
        sort_newest: "Neueste zuerst",
        sort_oldest: "Älteste zuerst",
        sort_az: "A-Z",
        sort_za: "Z-A",
        no_games_found: "Keine Spiele gefunden für",
        try_again: "ERNEUT VERSUCHEN",
        back: "ZURÜCK",
        controls: "STEUERUNG",
        about: "Über",
        settings: "EINSTELLUNGEN",
        open_new_tab: "In neuem Tab öffnen",
        open_new_tab_desc: "Spiele in einem separaten Browser-Tab starten",
        focus_mode: "Fokus-Modus",
        focus_mode_desc: "Kopfzeile beim Spielen ausblenden",
        cancel: "ABBRECHEN",
        save: "SPEICHERN",
        close: "SCHLIESSEN",
        description: "BESCHREIBUNG",
        tags: "TAGS",
        play_now: "JETZT SPIELEN",
        more_info: "MEHR INFO",
        no_favorites: "NOCH KEINE FAVORITEN! KLICKE AUF DAS HERZ, UM WELCHE HINZUZUFÜGEN.",
        no_category: "KEINE SPIELE IN DIESER KATEGORIE GEFUNDEN.",
        no_games: "NOCH KEINE SPIELE IN DIESEM SCHLOSS!",
        theme_featured: "Vorgestellt", theme_minecraft: "Minecraft", theme_dark_modes: "Dunkle Modi", theme_dark: "Dunkel", theme_obsidian: "Obsidian", theme_abyss: "Abgrund", theme_night_modes: "Nacht-Modi", theme_midnight: "Mitternacht", theme_deepspace: "Tiefenraum", theme_neon_night: "Neon-Nacht", theme_mario_bros: "Mario Bros", theme_mario: "Mario", theme_luigi: "Luigi", theme_peach: "Peach", theme_bowser: "Bowser", theme_wario: "Wario", theme_anime: "Anime", theme_naruto: "Naruto", theme_onepiece: "One Piece", theme_dragon_ball: "Dragon Ball", theme_demon_slayer: "Demon Slayer", theme_bleach: "Bleach", theme_classic: "Klassisch", theme_classic_light: "Klassisch Hell", theme_sports: "Sport", theme_basketball: "Basketball", theme_soccer: "Fußball", theme_tennis: "Tennis", theme_flags: "Flaggen", theme_usa: "USA", theme_asia: "Asien", theme_jordan: "Jordanien", theme_palestine: "Palästina", theme_japan: "Japan", theme_south_korea: "Südkorea"
    }
};

const tagTranslations = {
    es: { "Sports": "Deportes", "2 Player": "2 Jugadores", "Funny": "Divertido", "Arcade": "Arcade", "Skill": "Habilidad", "Horror": "Terror", "Strategy": "Estrategia", "Papa's": "Papa's", "Cooking": "Cocina", "Retro": "Retro", "Platformer": "Plataformas", "Adventure": "Aventura", "Puzzle": "Puzle", "Multiplayer": "Multijugador", "Action": "Acción", "3D": "3D", "Fighting": "Lucha", "Ragdoll": "Ragdoll", "Shooter": "Disparos", "Basketball": "Baloncesto", "Sandbox": "Sandbox", "Racing": "Carreras" },
    fr: { "Sports": "Sports", "2 Player": "2 Joueurs", "Funny": "Amusant", "Arcade": "Arcade", "Skill": "Compétence", "Horror": "Horreur", "Strategy": "Stratégie", "Papa's": "Papa's", "Cooking": "Cuisine", "Retro": "Rétro", "Platformer": "Plateforme", "Adventure": "Aventure", "Puzzle": "Puzzle", "Multiplayer": "Multijoueur", "Action": "Action", "3D": "3D", "Fighting": "Combat", "Ragdoll": "Ragdoll", "Shooter": "Tir", "Basketball": "Basket", "Sandbox": "Sandbox", "Racing": "Course" },
    ru: { "Sports": "Спорт", "2 Player": "2 Игрока", "Funny": "Смешные", "Arcade": "Аркады", "Skill": "Навык", "Horror": "Ужасы", "Strategy": "Стратегия", "Papa's": "Papa's", "Cooking": "Готовка", "Retro": "Ретро", "Platformer": "Платформер", "Adventure": "Приключения", "Puzzle": "Головоломки", "Multiplayer": "Мультиплеер", "Action": "Экшен", "3D": "3D", "Fighting": "Файтинги", "Ragdoll": "Рэгдолл", "Shooter": "Шутеры", "Basketball": "Баскетбол", "Sandbox": "Песочница", "Racing": "Гонки" },
    ar: { "Sports": "رياضة", "2 Player": "لاعبان", "Funny": "مضحك", "Arcade": "آركيد", "Skill": "مهارة", "Horror": "رعب", "Strategy": "استراتيجية", "Papa's": "باباس", "Cooking": "طبخ", "Retro": "ريترو", "Platformer": "منصات", "Adventure": "مغامرة", "Puzzle": "لغز", "Multiplayer": "متعدد اللاعبين", "Action": "أكشن", "3D": "ثلاثي الأبعاد", "Fighting": "قتال", "Ragdoll": "راغدول", "Shooter": "تصويب", "Basketball": "كرة سلة", "Sandbox": "ساندبوكس", "Racing": "سباق" },
    de: { "Sports": "Sport", "2 Player": "2 Spieler", "Funny": "Lustig", "Arcade": "Arcade", "Skill": "Geschicklichkeit", "Horror": "Horror", "Strategy": "Strategie", "Papa's": "Papa's", "Cooking": "Kochen", "Retro": "Retro", "Platformer": "Platformer", "Adventure": "Abenteuer", "Puzzle": "Puzzle", "Multiplayer": "Mehrspieler", "Action": "Aktion", "3D": "3D", "Fighting": "Kampf", "Ragdoll": "Ragdoll", "Shooter": "Shooter", "Basketball": "Basketball", "Sandbox": "Sandbox", "Racing": "Rennen" }
};

const gameTranslations = {
    "basket-random": {
        es: { desc: "Un juego de baloncesto divertido y aleatorio. ¡Anota canastas con físicas ragdoll!" },
        fr: { desc: "Un jeu de basket amusant et aléatoire. Marquez des paniers avec une physique ragdoll !" },
        ru: { desc: "Веселая и случайная баскетбольная игра. Забрасывайте мячи с физикой рэгдолл!" },
        ar: { desc: "لعبة كرة سلة مضحكة وعشوائية. سجل الأهداف بفيزياء راغدول!" },
        de: { desc: "Ein lustiges und zufälliges Basketballspiel. Wirf Körbe mit Ragdoll-Physik!" }
    },
    "rise-higher": {
        es: { desc: "¡Protege el globo mientras sube más alto en el cielo!" },
        fr: { desc: "Protégez le ballon alors qu'il monte plus haut dans le ciel !" },
        ru: { desc: "Защищайте воздушный шар, пока он поднимается все выше в небо!" },
        ar: { desc: "احمِ البالون بينما يرتفع أعلى في السماء!" },
        de: { desc: "Beschütze den Ballon, während er höher in den Himmel steigt!" }
    },
    "soccer-random": {
        es: { desc: "¡Anota goles en este divertido y aleatorio juego de fútbol con físicas ragdoll!" },
        fr: { desc: "Marquez des buts dans ce jeu de football amusant et aléatoire avec une physique ragdoll !" },
        ru: { desc: "Забивайте голы в этой веселой и случайной футбольной игре с физикой рэгдолл!" },
        ar: { desc: "سجل الأهداف في لعبة كرة القدم المضحكة والعشوائية هذه بفيزياء راغدول!" },
        de: { desc: "Schieße Tore in diesem lustigen und zufälligen Fußballspiel mit Ragdoll-Physik!" }
    },
    "fnaf-3": {
        es: { desc: "Treinta años después de que Freddy Fazbear's Pizza cerrara sus puertas, los eventos que tuvieron lugar allí se han convertido en nada más que un rumor y un recuerdo de la infancia." },
        fr: { desc: "Trente ans après la fermeture de Freddy Fazbear's Pizza, les événements qui s'y sont déroulés ne sont plus qu'une rumeur et un souvenir d'enfance." },
        ru: { desc: "Спустя тридцать лет после того, как пиццерия закрыла свои двери, события, произошедшие там, стали не более чем слухами и детскими воспоминаниями." },
        ar: { desc: "بعد ثلاثين عامًا من إغلاق بيتزا فريدي فازبير أبوابها، أصبحت الأحداث التي وقعت هناك مجرد شائعة وذكرى طفولة." },
        de: { desc: "Dreißig Jahre nachdem Freddy Fazbear's Pizza seine Türen geschlossen hat, sind die Ereignisse, die dort stattfanden, zu nichts weiter als einem Gerücht und einer Kindheitserinnerung geworden." }
    },
    "papas-pizzeria": {
        es: { desc: "¡Ayuda a Papa Louie a dirigir su pizzería! Hornea, decora y sirve pizzas a clientes hambrientos en este clásico juego de gestión de tiempo." },
        fr: { desc: "Aidez Papa Louie à gérer sa pizzeria ! Préparez, garnissez et servez des pizzas aux clients affamés dans ce jeu classique de gestion du temps." },
        ru: { desc: "Помогите Папе Луи управлять его пиццерией! Выпекайте, украшайте и подавайте пиццу голодным клиентам в этой классической игре в жанре тайм-менеджмент." },
        ar: { desc: "ساعد بابا لوي في إدارة متجر البيتزا الخاص به! اخبز وزين وقدم البيتزا للعملاء الجائعين في لعبة إدارة الوقت الكلاسيكية هذه." },
        de: { desc: "Hilf Papa Louie, seine Pizzeria zu leiten! Backe, belege und serviere Pizzen an hungrige Kunden in diesem klassischen Zeitmanagementspiel." }
    },
    "super-mario-world": {
        es: { desc: "¡La clásica aventura de SNES! Únete a Mario y Yoshi para salvar a la Princesa Toadstool de Bowser en Dinosaur Land. (Nota: Tarda unos segundos en cargar)" },
        fr: { desc: "L'aventure classique de la SNES ! Rejoignez Mario et Yoshi pour sauver la princesse Toadstool de Bowser dans Dinosaur Land. (Remarque : Prend quelques secondes à charger)" },
        ru: { desc: "Классическое приключение SNES! Присоединяйтесь к Марио и Йоши, чтобы спасти принцессу Тоадстул от Боузера в Стране Динозавров. (Примечание: Загрузка занимает несколько секунд)" },
        ar: { desc: "مغامرة SNES الكلاسيكية! انضم إلى ماريو ويوشي لإنقاذ الأميرة تودستول من باوزر في أرض الديناصورات. (ملاحظة: يستغرق التحميل بضع ثوانٍ)" },
        de: { desc: "Das klassische SNES-Abenteuer! Begleite Mario und Yoshi, um Prinzessin Toadstool vor Bowser im Dinosaurierland zu retten. (Hinweis: Das Laden dauert ein paar Sekunden)" }
    },
    "fireboy-and-watergirl": {
        es: { desc: "Ayuda a Fireboy y Watergirl a explorar el Templo del Bosque. ¡Resuelve puzles y evita peligros en este clásico juego de plataformas cooperativo!" },
        fr: { desc: "Aidez Fireboy et Watergirl à explorer le Temple de la Forêt. Résolvez des énigmes et évitez les dangers dans ce jeu de plateforme coopératif classique !" },
        ru: { desc: "Помогите Огненному мальчику и Водяной девочке исследовать Лесной храм. Решайте головоломки и избегайте опасностей в этом классическом кооперативном платформере!" },
        ar: { desc: "ساعد ولد النار وبنت الماء في استكشاف معبد الغابة. حل الألغاز وتجنب المخاطر في لعبة المنصات التعاونية الكلاسيكية هذه!" },
        de: { desc: "Hilf Fireboy und Watergirl, den Waldtempel zu erkunden. Löse Rätsel und weiche Gefahren in diesem klassischen kooperativen Platformer aus!" }
    },
    "volley-random": {
        es: { desc: "Un juego de voleibol divertido y aleatorio. ¡Anota puntos con físicas ragdoll!" },
        fr: { desc: "Un jeu de volley-ball amusant et aléatoire. Marquez des points avec une physique ragdoll !" },
        ru: { desc: "Веселая и случайная волейбольная игра. Зарабатывайте очки с физикой рэгдолл!" },
        ar: { desc: "لعبة كرة طائرة مضحكة وعشوائية. سجل النقاط بفيزياء راغدول!" },
        de: { desc: "Ein lustiges und zufälliges Volleyballspiel. Sammle Punkte mit Ragdoll-Physik!" }
    },
    "papas-wingeria": {
        es: { desc: "¡Cocina y sirve deliciosas alitas en Papa's Wingeria! Toma pedidos, fríe alitas, báñalas en salsa y colócalas en bandejas para tus clientes hambrientos." },
        fr: { desc: "Cuisinez et servez de délicieuses ailes dans Papa's Wingeria ! Prenez les commandes, faites frire les ailes, mélangez-les dans la sauce et disposez-les sur des plateaux pour vos clients affamés." },
        ru: { desc: "Готовьте и подавайте вкусные крылышки в Papa's Wingeria! Принимайте заказы, жарьте крылышки, обмакивайте их в соус и раскладывайте на тарелках для голодных клиентов." },
        ar: { desc: "اطبخ وقدم أجنحة لذيذة في بابا وينجيريا! خذ الطلبات، واقلِ الأجنحة، واغمسها في الصلصة، ورتبها على أطباق لعملائك الجائعين." },
        de: { desc: "Koche und serviere köstliche Wings in Papa's Wingeria! Nimm Bestellungen auf, frittiere Wings, schwenke sie in Soße und richte sie auf Platten für deine hungrigen Kunden an." }
    },
    "tag": {
        es: { desc: "¡Juega al clásico juego de la mancha! Corre, salta y deslízate para evitar ser el que 'la lleva' en este rápido juego multijugador." },
        fr: { desc: "Jouez au jeu classique du loup ! Courez, sautez et glissez pour éviter d'être 'le loup' dans ce jeu multijoueur rapide." },
        ru: { desc: "Сыграйте в классическую игру в салочки! Бегайте, прыгайте и скользите, чтобы не стать 'водой' в этой динамичной многопользовательской игре." },
        ar: { desc: "العب لعبة المطاردة الكلاسيكية! اركض واقفز وانزلق لتجنب أن تكون 'المطارد' في هذه اللعبة متعددة اللاعبين سريعة الوتيرة." },
        de: { desc: "Spiele das klassische Fangen-Spiel! Renne, springe und rutsche, um nicht der 'Fänger' zu sein, in diesem rasanten Mehrspielerspiel." }
    },
    "boxing-random": {
        es: { desc: "¡Lanza puñetazos en este divertido y aleatorio juego de boxeo con físicas ragdoll! Juega contra la CPU o un amigo." },
        fr: { desc: "Donnez des coups de poing dans ce jeu de boxe amusant et aléatoire avec une physique ragdoll ! Jouez contre l'ordinateur ou un ami." },
        ru: { desc: "Наносите удары в этой веселой и случайной боксерской игре с физикой рэгдолл! Играйте против компьютера или друга." },
        ar: { desc: "سدد اللكمات في لعبة الملاكمة المضحكة والعشوائية هذه بفيزياء راغدول! العب ضد الكمبيوتر أو صديق." },
        de: { desc: "Teile Schläge aus in diesem lustigen und zufälligen Boxspiel mit Ragdoll-Physik! Spiele gegen den Computer oder einen Freund." }
    },
    "sonic-cd": {
        es: { desc: "¡Viaja en el tiempo para salvar Little Planet!" },
        fr: { desc: "Voyagez dans le temps pour sauver Little Planet !" },
        ru: { desc: "Путешествуйте во времени, чтобы спасти Маленькую Планету!" },
        ar: { desc: "سافر عبر الزمن لإنقاذ الكوكب الصغير!" },
        de: { desc: "Reise durch die Zeit, um Little Planet zu retten!" }
    },
    "papas-burgeria": {
        es: { desc: "¡Asa, apila y sirve hamburguesas a todos tus locos clientes! Dirige la mejor hamburguesería de la ciudad." },
        fr: { desc: "Faites griller, empilez et servez des hamburgers à tous vos clients farfelus ! Gérez la meilleure boutique de hamburgers de la ville." },
        ru: { desc: "Жарьте, складывайте и подавайте бургеры всем вашим сумасшедшим клиентам! Управляйте лучшей бургерной в городе." },
        ar: { desc: "اشوِ، وكدس، وقدم البرغر لجميع عملائك المجانين! أدر أفضل متجر برغر في المدينة." },
        de: { desc: "Grille, staple und serviere Burger an all deine verrückten Kunden! Leite den besten Burgerladen der Stadt." }
    },
    "papas-hotdoggeria": {
        es: { desc: "¡Asa y sirve perritos calientes y otros bocadillos de estadio en Papa's Hot Doggeria! Mantén a los fans contentos con comida deliciosa." },
        fr: { desc: "Faites griller et servez des hot-dogs et autres collations de stade dans Papa's Hot Doggeria ! Gardez les fans heureux avec de la nourriture délicieuse." },
        ru: { desc: "Жарьте и подавайте хот-доги и другие стадионные закуски в Papa's Hot Doggeria! Радуйте болельщиков вкусной едой." },
        ar: { desc: "اشوِ وقدم النقانق وغيرها من وجبات الملعب الخفيفة في Papa's Hot Doggeria! حافظ على سعادة المشجعين بالطعام اللذيذ." },
        de: { desc: "Grille und serviere Hot Dogs und andere Stadion-Snacks in Papa's Hot Doggeria! Halte die Fans mit leckerem Essen bei Laune." }
    },
    "papas-donuteria": {
        es: { desc: "¡Fríe, glasea y decora deliciosas donas para tus clientes en Papa's Donuteria!" },
        fr: { desc: "Faites frire, glacer et décorer de délicieux beignets pour vos clients dans Papa's Donuteria !" },
        ru: { desc: "Жарьте, глазируйте и украшайте вкусные пончики для своих клиентов в Papa's Donuteria!" },
        ar: { desc: "اقلِ الدونات اللذيذة وزينها لعملائك في Papa's Donuteria!" },
        de: { desc: "Frittiere, glasiere und dekoriere leckere Donuts für deine Kunden in Papa's Donuteria!" }
    },
    "papas-cheeseria": {
        es: { desc: "¡Prepara sándwiches de queso a la parrilla gigantes y apila papas fritas en Papa's Cheeseria!" },
        fr: { desc: "Préparez d'énormes sandwichs au fromage grillé et empilez les frites dans Papa's Cheeseria !" },
        ru: { desc: "Готовьте огромные сэндвичи с сыром на гриле и накладывайте горы картофеля фри в Papa's Cheeseria!" },
        ar: { desc: "قم ببناء شطائر جبن مشوية ضخمة وكدس البطاطس المقلية في Papa's Cheeseria!" },
        de: { desc: "Baue riesige gegrillte Käsesandwiches und staple Pommes in Papa's Cheeseria!" }
    },
    "papas-freezeria": {
        es: { desc: "¡Mezcla y sirve refrescantes helados en la isla Calypso en Papa's Freezeria!" },
        fr: { desc: "Mélangez et servez des coupes glacées rafraîchissantes sur l'île de Calypso dans Papa's Freezeria !" },
        ru: { desc: "Смешивайте и подавайте освежающее мороженое на острове Калипсо в Papa's Freezeria!" },
        ar: { desc: "اخلط وقدم مثلجات منعشة في جزيرة كاليبسو في Papa's Freezeria!" },
        de: { desc: "Mische und serviere erfrischende Eisbecher auf Calypso Island in Papa's Freezeria!" }
    },
    "a-small-world-cup": {
        es: { desc: "Un divertido y caótico juego de fútbol basado en físicas donde controlas a un jugador ragdoll para anotar goles." },
        fr: { desc: "Un jeu de football amusant et chaotique basé sur la physique où vous contrôlez un joueur ragdoll pour marquer des buts." },
        ru: { desc: "Веселая и хаотичная футбольная игра, основанная на физике, где вы управляете игроком-рэгдоллом, чтобы забивать голы." },
        ar: { desc: "لعبة كرة قدم ممتعة وفوضوية تعتمد على الفيزياء حيث تتحكم في لاعب راغدول لتسجيل الأهداف." },
        de: { desc: "Ein lustiges und chaotisches physikbasiertes Fußballspiel, bei dem du einen Ragdoll-Spieler steuerst, um Tore zu schießen." }
    },
    "slope": {
        es: { desc: "Un juego de carrera infinita en 3D donde controlas una bola que rueda por una pendiente. ¡Evita los obstáculos y mantén la bola en la pista!" },
        fr: { desc: "Un jeu de course sans fin en 3D où vous contrôlez une balle roulant sur une pente. Évitez les obstacles et gardez la balle sur la piste !" },
        ru: { desc: "Бесконечный 3D-раннер, в котором вы управляете катящимся по склону шаром. Избегайте препятствий и удерживайте шар на трассе!" },
        ar: { desc: "لعبة ركض لا نهاية لها ثلاثية الأبعاد حيث تتحكم في كرة تتدحرج على منحدر. تجنب العقبات وأبقِ الكرة على المسار!" },
        de: { desc: "Ein 3D-Endlos-Runner-Spiel, bei dem du einen Ball steuerst, der einen Abhang hinunterrollt. Weiche Hindernissen aus und halte den Ball auf der Strecke!" }
    },
    "ragdoll-hit": {
        es: { desc: "Un divertido juego de lucha ragdoll donde te enfrentas a oponentes con combates basados en físicas." },
        fr: { desc: "Un jeu de combat ragdoll amusant où vous affrontez des adversaires avec des combats basés sur la physique." },
        ru: { desc: "Веселый файтинг с рэгдоллами, где вы сражаетесь с противниками в боях, основанных на физике." },
        ar: { desc: "لعبة قتال راغدول ممتعة حيث تقاتل الخصوم بقتال يعتمد على الفيزياء." },
        de: { desc: "Ein lustiges Ragdoll-Kampfspiel, bei dem du gegen Gegner mit physikbasierten Kämpfen antrittst." }
    },
    "gunspin": {
        es: { desc: "¡Dispara tu arma para hacerla girar y volar lo más lejos posible! Mejora tus armas y alcanza nuevas distancias." },
        fr: { desc: "Tirez avec votre arme pour la faire tourner et voler aussi loin que possible ! Améliorez vos armes et atteignez de nouvelles distances." },
        ru: { desc: "Стреляйте из пистолета, чтобы раскрутить его и улететь как можно дальше! Улучшайте свое оружие и достигайте новых дистанций." },
        ar: { desc: "أطلق النار من سلاحك لجعله يدور ويطير إلى أبعد مسافة ممكنة! قم بترقية أسلحتك والوصول إلى مسافات جديدة." },
        de: { desc: "Schieße mit deiner Waffe, um sie zu drehen und so weit wie möglich zu fliegen! Verbessere deine Waffen und erreiche neue Entfernungen." }
    },
    "basketball-stars-2026": {
        es: { desc: "¡Juega a Basketball Stars! Dribla, dispara y anota en este rápido juego de baloncesto." },
        fr: { desc: "Jouez à Basketball Stars ! Dribblez, tirez et marquez dans ce jeu de basket rapide." },
        ru: { desc: "Играйте в Basketball Stars! Ведите мяч, бросайте и забивайте в этой динамичной баскетбольной игре." },
        ar: { desc: "العب نجوم كرة السلة! راوغ وسدد وسجل في لعبة كرة السلة سريعة الوتيرة هذه." },
        de: { desc: "Spiele Basketball Stars! Dribble, wirf und punkte in diesem rasanten Basketballspiel." }
    },
    "minecraft": {
        es: { desc: "Explora mundos infinitos y construye de todo, desde las casas más simples hasta los castillos más grandiosos en este clásico juego sandbox." },
        fr: { desc: "Explorez des mondes infinis et construisez tout, des maisons les plus simples aux châteaux les plus grandioses dans ce jeu bac à sable classique." },
        ru: { desc: "Исследуйте бесконечные миры и стройте все, от самых простых домов до величайших замков в этой классической игре-песочнице." },
        ar: { desc: "استكشف عوالم لا حصر لها وابنِ كل شيء من أبسط المنازل إلى أروع القلاع في لعبة الساندبوكس الكلاسيكية هذه." },
        de: { desc: "Erkunde unendliche Welten und baue alles, von den einfachsten Häusern bis zu den großartigsten Schlössern in diesem klassischen Sandbox-Spiel." }
    },
    "race-survival-arena-king": {
        es: { desc: "¡Compite, sobrevive y domina la arena en este intenso juego de combate de coches!" },
        fr: { desc: "Faites la course, survivez et dominez l'arène dans ce jeu de combat de voitures intense !" },
        ru: { desc: "Гоняйте, выживайте и доминируйте на арене в этой напряженной игре с автомобильными боями!" },
        ar: { desc: "تسابق وابق على قيد الحياة وسيطر على الساحة في لعبة قتال السيارات المكثفة هذه!" },
        de: { desc: "Fahre Rennen, überlebe und dominiere die Arena in diesem intensiven Auto-Kampfspiel!" }
    }
};

function getTranslatedText(game, field) {
    if (currentLanguage === 'en') return game[field];
    if (field === 'description' && gameTranslations[game.id]?.[currentLanguage]?.desc) {
        return gameTranslations[game.id][currentLanguage].desc;
    }
    if (field === 'title' && gameTranslations[game.id]?.[currentLanguage]?.title) {
        return gameTranslations[game.id][currentLanguage].title;
    }
    return game[field];
}

function getTranslatedTag(tag) {
    if (currentLanguage === 'en') return tag;
    return tagTranslations[currentLanguage]?.[tag] || tag;
}

function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('hidden');
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyLanguage();
    toggleLanguageMenu();
    renderGames(); // Re-render to update translated text in cards
    renderFeaturedGames();
}

function applyLanguage() {
    const t = translations[currentLanguage] || translations['en'];
    
    // Update display
    const langDisplay = { en: '🇺🇸 EN', es: '🇪🇸 ES', fr: '🇫🇷 FR', ru: '🇷🇺 RU', ar: '🇸🇦 AR', de: '🇩🇪 DE' };
    document.getElementById('current-lang-display').textContent = langDisplay[currentLanguage] || currentLanguage.toUpperCase();
    
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Handle RTL for Arabic
    if (currentLanguage === 'ar') {
        document.body.dir = 'rtl';
    } else {
        document.body.dir = 'ltr';
    }

    // Update dynamic category buttons
    document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
        const cat = btn.dataset.category;
        if (cat !== 'all' && cat !== 'favorites') {
            btn.textContent = getTranslatedTag(cat).toUpperCase();
        }
    });
}

// DOM Elements
const gamesGrid = document.getElementById('games-grid');
const featuredGamesGrid = document.getElementById('featured-games-grid');
const featuredGamesContainer = document.getElementById('featured-games-container');
const categoryFilters = document.getElementById('category-filters');
const gameListView = document.getElementById('game-list-view');
const gamePlayerView = document.getElementById('game-player-view');
const searchInputDesktop = document.getElementById('search-input-desktop');
const searchInputMobile = document.getElementById('search-input-mobile');
const noResults = document.getElementById('no-results');
const searchTermSpan = document.getElementById('search-term');
const gameIframe = document.getElementById('game-iframe');
const gameTitle = document.getElementById('game-title');
const gameAboutTitle = document.getElementById('game-about-title');
const gameDescription = document.getElementById('game-description');
const fullscreenIcon = document.getElementById('fullscreen-icon');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    lucide.createIcons();

    // Load Favorites and Recent Games
    loadUserData();
    
    // Load Language
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLanguage = savedLang;
    }
    applyLanguage();

    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        games = await response.json();
        filteredGames = [...games];
        
        setupCategoryFilters();
        renderGames();
        renderFeaturedGames();
    } catch (error) {
        console.error('Error loading games:', error);
        gamesGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load games. Please try again later.</p>';
    }

    // Search listeners
    searchInputDesktop.addEventListener('input', handleSearch);
    searchInputMobile.addEventListener('input', handleSearch);

    // Initial render
    renderGames();
});

function toggleSortMenu() {
    const menu = document.getElementById('sort-menu');
    menu.classList.toggle('hidden');
}

function sortGames(method) {
    switch(method) {
        case 'az':
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'za':
            filteredGames.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'newest':
            // Assuming the original 'games' array order is roughly chronological (newest at bottom)
            // We need to reverse the original index order
            filteredGames.sort((a, b) => games.indexOf(b) - games.indexOf(a));
            break;
        case 'oldest':
            filteredGames.sort((a, b) => games.indexOf(a) - games.indexOf(b));
            break;
    }
    renderGames();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    // Sync inputs
    if (e.target === searchInputDesktop) {
        searchInputMobile.value = query;
    } else {
        searchInputDesktop.value = query;
    }

    // City Boy Easter Egg
    if (query === 'city boy') {
        triggerCityBoy();
        
        // Clear search
        searchInputDesktop.value = '';
        searchInputMobile.value = '';
        filteredGames = [...games];
        renderGames();
        return;
    }

    filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );

    renderGames();

    if (filteredGames.length === 0) {
        noResults.classList.remove('hidden');
        searchTermSpan.textContent = query;
    } else {
        noResults.classList.add('hidden');
    }
}

function closeCityBoy() {
    const easterEgg = document.getElementById('city-boy-easter-egg');
    if (easterEgg) {
        if (cityBoyPlayer && typeof cityBoyPlayer.stopVideo === 'function') {
            cityBoyPlayer.stopVideo();
        }
        easterEgg.classList.add('hidden');
    }
}

function clearSearch() {
    searchInputDesktop.value = '';
    searchInputMobile.value = '';
    filteredGames = [...games];
    renderGames();
    noResults.classList.add('hidden');
}

function loadUserData() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = new Set(JSON.parse(savedFavorites));
    }

    const savedRecent = localStorage.getItem('recentGames');
    if (savedRecent) {
        recentGames = JSON.parse(savedRecent);
    }
}

function saveUserData() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
}

function toggleFavorite(e, gameId) {
    e.stopPropagation(); // Prevent opening the game
    if (favorites.has(gameId)) {
        favorites.delete(gameId);
    } else {
        favorites.add(gameId);
    }
    saveUserData();
    
    // Re-render to update UI
    if (currentCategory === 'favorites') {
        filterGames('favorites');
    } else {
        renderGames();
    }
}

function addToRecent(gameId) {
    // Remove if already exists to move it to top
    recentGames = recentGames.filter(id => id !== gameId);
    // Add to front
    recentGames.unshift(gameId);
    // Keep max 4
    if (recentGames.length > 4) {
        recentGames.pop();
    }
    saveUserData();
}

function playRandomGame() {
    if (games.length > 0) {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        openGame(randomGame);
    }
}

function setupCategoryFilters() {
    const tags = new Set();
    games.forEach(game => {
        if (game.tags) {
            game.tags.forEach(tag => tags.add(tag));
        }
    });

    const sortedTags = [...tags].sort();
    
    sortedTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn px-6 py-2 bg-theme-card text-theme-card font-bold border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap';
        btn.textContent = getTranslatedTag(tag).toUpperCase();
        btn.dataset.category = tag;
        btn.onclick = () => filterGames(tag);
        categoryFilters.appendChild(btn);
    });

    // Add drag to scroll functionality
    const wrapper = document.getElementById('category-filters-wrapper');
    if (wrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            wrapper.classList.add('active');
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });
        wrapper.addEventListener('mouseleave', () => {
            isDown = false;
            wrapper.classList.remove('active');
        });
        wrapper.addEventListener('mouseup', () => {
            isDown = false;
            wrapper.classList.remove('active');
        });
        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            wrapper.scrollLeft = scrollLeft - walk;
        });

        // Prevent click if dragging
        wrapper.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { capture: true });

        // Add mouse wheel scrolling
        wrapper.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const atLeftEdge = wrapper.scrollLeft === 0 && e.deltaY < 0;
                const atRightEdge = Math.ceil(wrapper.scrollLeft) >= wrapper.scrollWidth - wrapper.clientWidth && e.deltaY > 0;
                
                if (!atLeftEdge && !atRightEdge) {
                    e.preventDefault();
                    wrapper.scrollLeft += e.deltaY;
                }
            }
        }, { passive: false });
    }
}

function filterGames(category) {
    currentCategory = category;
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (category === 'all') {
        filteredGames = [...games];
    } else if (category === 'favorites') {
        filteredGames = games.filter(game => favorites.has(game.id));
    } else {
        filteredGames = games.filter(game => game.tags && game.tags.includes(category));
    }
    
    renderGames();
}

function openGameInfo(e, gameId) {
    e.stopPropagation();
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    document.getElementById('modal-game-title').textContent = getTranslatedText(game, 'title');
    document.getElementById('modal-game-description').textContent = getTranslatedText(game, 'description');
    
    const thumb = document.getElementById('modal-game-thumbnail');
    thumb.src = game.thumbnail || `https://placehold.co/600x400?text=${encodeURIComponent(game.title).replace(/'/g, '%27')}`;
    thumb.onerror = () => {
        thumb.src = `https://placehold.co/600x400?text=${encodeURIComponent(game.title).replace(/'/g, '%27')}`;
    };

    const tagsContainer = document.getElementById('modal-game-tags');
    tagsContainer.innerHTML = '';
    if (game.tags) {
        game.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'text-xs uppercase px-2 py-1 bg-black/10 rounded border border-black/20 font-bold';
            span.textContent = getTranslatedTag(tag);
            tagsContainer.appendChild(span);
        });
    }

    // Setup Rating UI
    const starRating = document.getElementById('star-rating');
    const ratingAverage = document.getElementById('rating-average');
    const ratingCount = document.getElementById('rating-count');
    
    // Reset
    ratingAverage.textContent = '0.0';
    ratingCount.textContent = '(0)';
    Array.from(starRating.children).forEach(star => {
        star.classList.remove('text-yellow-400', 'fill-yellow-400');
        star.classList.add('text-gray-300');
    });

    if (window.currentRatingUnsubscribe) {
        window.currentRatingUnsubscribe();
    }

    if (window.getGameRatings) {
        window.currentRatingUnsubscribe = window.getGameRatings(gameId, (data) => {
            ratingAverage.textContent = data.average;
            ratingCount.textContent = `(${data.count})`;
            
            // Update stars based on user rating or average
            const displayRating = data.userRating || Math.round(data.average);
            Array.from(starRating.children).forEach((star, index) => {
                if (index < displayRating) {
                    star.classList.remove('text-gray-300');
                    star.classList.add('text-yellow-400', 'fill-yellow-400');
                } else {
                    star.classList.remove('text-yellow-400', 'fill-yellow-400');
                    star.classList.add('text-gray-300');
                }
            });
        });
    }

    // Add click listeners to stars
    Array.from(starRating.children).forEach(star => {
        star.onclick = () => {
            if (window.rateGame) {
                window.rateGame(gameId, parseInt(star.getAttribute('data-rating')));
            }
        };
    });

    const playBtn = document.getElementById('modal-play-btn');
    playBtn.onclick = () => {
        closeGameInfo();
        openGame(game);
    };

    document.getElementById('game-info-modal').classList.remove('hidden');
}

function closeGameInfo() {
    document.getElementById('game-info-modal').classList.add('hidden');
}

function createGameCard(game) {
    const isFav = favorites.has(game.id);
    const card = document.createElement('div');
    card.onclick = () => openGame(game);
    
    card.className = 'bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full mario-card relative group';
    card.innerHTML = `
        <div class="h-40 w-full bg-theme-main relative overflow-hidden border-b-4 border-black">
            <img 
                src="${game.thumbnail || `https://placehold.co/600x400?text=${encodeURIComponent(game.title).replace(/'/g, '%27')}`}" 
                alt="${game.title}"
                class="w-full h-full object-fill"
                referrerPolicy="no-referrer"
                onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(game.title).replace(/'/g, '%27')}'"
            />
            <button onclick="toggleFavorite(event, '${game.id}')" class="absolute top-2 right-2 p-2 bg-white border-2 border-black rounded-full shadow-md hover:scale-110 transition-transform z-10">
                <i data-lucide="heart" class="w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}"></i>
            </button>
        </div>
        <div class="p-4 flex-1 flex flex-col bg-theme-card transition-colors duration-300">
            <h3 class="text-lg font-bold text-theme-card mb-1 pixel-font tracking-tight leading-tight" style="color: var(--text-card)">${getTranslatedText(game, 'title')}</h3>
            ${game.tags ? `<div class="mt-2 flex flex-wrap gap-1">
                ${game.tags.slice(0, 2).map(tag => `<span class="text-[10px] uppercase px-1.5 py-0.5 bg-black/10 rounded border border-black/20">${getTranslatedTag(tag)}</span>`).join('')}
            </div>` : ''}
            <button onclick="openGameInfo(event, '${game.id}')" class="mt-3 w-full py-2 bg-blue-100 text-blue-800 border-2 border-blue-800 rounded-lg font-bold hover:bg-blue-200 transition-colors flex items-center justify-center gap-2 text-sm">
                <i data-lucide="info" class="w-4 h-4"></i> ${translations[currentLanguage]?.more_info || 'MORE INFO'}
            </button>
        </div>
    `;
    return card;
}

function renderGames() {
    gamesGrid.innerHTML = '';
    
    if (featuredGamesContainer) {
        if (currentCategory === 'all' && (!searchInputDesktop.value && !searchInputMobile.value)) {
            featuredGamesContainer.classList.remove('hidden');
        } else {
            featuredGamesContainer.classList.add('hidden');
        }
    }
    
    if (filteredGames.length === 0 && games.length > 0) {
        if (currentCategory === 'favorites') {
             gamesGrid.innerHTML = `<div class="col-span-full text-center py-12 bg-white/90 border-4 border-black rounded-xl"><p class="text-theme-card text-lg font-bold pixel-font" style="color: var(--text-card)">${translations[currentLanguage]?.no_favorites || 'NO FAVORITES YET! CLICK THE HEART ICON TO ADD SOME.'}</p></div>`;
             return;
        }
        // Handled by search logic or empty category
        if (currentCategory !== 'all') {
             gamesGrid.innerHTML = `<div class="col-span-full text-center py-12 bg-white/90 border-4 border-black rounded-xl"><p class="text-theme-card text-lg font-bold pixel-font" style="color: var(--text-card)">${translations[currentLanguage]?.no_category || 'NO GAMES FOUND IN THIS CATEGORY.'}</p></div>`;
             return;
        }
    }

    if (games.length === 0) {
        gamesGrid.innerHTML = `<div class="col-span-full text-center py-12 bg-white/90 border-4 border-black rounded-xl"><p class="text-theme-card text-lg font-bold pixel-font" style="color: var(--text-card)">${translations[currentLanguage]?.no_games || 'NO GAMES IN THIS CASTLE YET!'}</p></div>`;
        return;
    }

    filteredGames.forEach(game => {
        gamesGrid.appendChild(createGameCard(game));
    });
    lucide.createIcons();
}

function renderFeaturedGames() {
    if (!featuredGamesGrid) return;
    featuredGamesGrid.innerHTML = '';
    
    if (games.length === 0) return;

    // Use current date to seed random selection
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    let currentSeed = seed;
    const random = () => {
        let x = Math.sin(currentSeed++) * 10000;
        return x - Math.floor(x);
    };

    // Pick 4 featured games
    const numFeatured = Math.min(4, games.length);
    const shuffled = [...games];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const featured = shuffled.slice(0, numFeatured);

    featured.forEach(game => {
        featuredGamesGrid.appendChild(createGameCard(game));
    });
    lucide.createIcons();
}

// Settings Logic
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('hidden');
}

function saveSettings() {
    const openNewTab = document.getElementById('setting-new-tab').checked;
    const hideHeader = document.getElementById('setting-hide-header').checked;
    
    localStorage.setItem('settingNewTab', openNewTab);
    localStorage.setItem('settingHideHeader', hideHeader);
    
    toggleSettings();
    applySettings();
}

function applySettings() {
    const hideHeader = localStorage.getItem('settingHideHeader') === 'true';
    const header = document.querySelector('header');
    
    // Only hide header in game view if setting is enabled
    if (hideHeader && !gamePlayerView.classList.contains('hidden')) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
}

// Load Settings
document.addEventListener('DOMContentLoaded', () => {
    const newTab = localStorage.getItem('settingNewTab') === 'true';
    const hideHeader = localStorage.getItem('settingHideHeader') === 'true';
    
    const newTabCheckbox = document.getElementById('setting-new-tab');
    const hideHeaderCheckbox = document.getElementById('setting-hide-header');
    
    if (newTabCheckbox) newTabCheckbox.checked = newTab;
    if (hideHeaderCheckbox) hideHeaderCheckbox.checked = hideHeader;
    
    applySettings();
});

// YouTube Player API
let cityBoyPlayer;
// We don't need to do anything in onYouTubeIframeAPIReady if we init lazily,
// but we need to know if API is ready.
function onYouTubeIframeAPIReady() {
    // API is ready
}

function triggerCityBoy() {
    const easterEgg = document.getElementById('city-boy-easter-egg');
    if (!easterEgg) return;
    
    easterEgg.classList.remove('hidden');

    if (cityBoyPlayer) {
        // Player already exists
        cityBoyPlayer.seekTo(0);
        cityBoyPlayer.playVideo();
    } else {
        // Initialize player
        if (typeof YT === 'undefined' || !YT.Player) {
            console.log("YouTube API not ready");
            return; 
        }
        
        cityBoyPlayer = new YT.Player('city-boy-video', {
            height: '100%',
            width: '100%',
            videoId: 'WDkyggKE0E8',
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'autoplay': 1,
                'rel': 0
            },
            events: {
                'onReady': (event) => {
                    event.target.playVideo();
                },
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        closeCityBoy();
    }
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Update openGame to respect settings and show mobile controls
function openGame(game) {
    const newTab = localStorage.getItem('settingNewTab') === 'true';
    
    if (newTab) {
        window.open(game.url, '_blank');
        return;
    }

    gameListView.classList.add('hidden');
    gamePlayerView.classList.remove('hidden');
    
    // Add to recent games
    addToRecent(game.id);
    
    // Detect mobile and apply fit screen if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (window.innerWidth <= 768 && 'ontouchstart' in window);
    if (isMobile) {
        document.body.classList.add('mobile-fit-active');
    } else {
        document.body.classList.remove('mobile-fit-active');
    }
    
    applySettings(); // Re-apply settings (e.g. hide header)
    
    gameTitle.textContent = getTranslatedText(game, 'title');
    gameAboutTitle.textContent = getTranslatedText(game, 'title');
    gameDescription.textContent = getTranslatedText(game, 'description');
    gameIframe.src = game.url;

    const warningBox = document.getElementById('game-warning-message');
    const warningText = document.getElementById('game-warning-text');
    if (warningBox && warningText) {
        if (game.warningMessage) {
            warningText.textContent = translations[currentLanguage]?.warning_russian || game.warningMessage;
            warningBox.classList.remove('hidden');
            warningBox.classList.add('flex');
        } else {
            warningBox.classList.add('hidden');
            warningBox.classList.remove('flex');
        }
    }

    // Apply custom styles if present (e.g. for cropping)
    gameIframe.style.cssText = '';
    if (game.customStyle) {
        gameIframe.style.cssText = game.customStyle;
    }

    // Mobile Controls Logic
    const mobileControls = document.getElementById('mobile-controls');
    
    // Show controls only for specific games on mobile
    const gamesWithControls = ['super-mario-world', 'sonic-cd'];
    
    if (mobileControls) {
        if (isMobile && gamesWithControls.includes(game.id)) {
            mobileControls.classList.remove('hidden');
            mobileControls.classList.add('flex');
            setupMobileControls();
        } else {
            mobileControls.classList.add('hidden');
            mobileControls.classList.remove('flex');
        }
    }

    // Handle Controls
    const controlsContainer = document.getElementById('game-controls');
    const controlsList = document.getElementById('controls-list');
    
    if (game.controls && game.controls.length > 0) {
        controlsContainer.classList.remove('hidden');
        controlsList.innerHTML = game.controls.map(control => `
            <li class="flex items-center justify-between bg-white/50 p-2 rounded border-2 border-black">
                <span class="bg-black text-white px-2 py-1 rounded font-mono text-xs">${control.key}</span>
                <span class="text-theme-card text-xs uppercase tracking-wide" style="color: var(--text-card)">${control.action}</span>
            </li>
        `).join('');
    } else {
        controlsContainer.classList.add('hidden');
        controlsList.innerHTML = '';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function setupMobileControls() {
    const buttons = document.querySelectorAll('#mobile-controls button');
    const iframe = document.getElementById('game-iframe');
    
    buttons.forEach(btn => {
        const key = btn.dataset.key;
        
        const handlePress = (e) => {
            e.preventDefault();
            btn.classList.add('scale-95', 'brightness-125');
            simulateKeyEvent(iframe, key, 'keydown');
        };
        
        const handleRelease = (e) => {
            e.preventDefault();
            btn.classList.remove('scale-95', 'brightness-125');
            simulateKeyEvent(iframe, key, 'keyup');
        };

        btn.addEventListener('touchstart', handlePress, { passive: false });
        btn.addEventListener('touchend', handleRelease, { passive: false });
        btn.addEventListener('mousedown', handlePress);
        btn.addEventListener('mouseup', handleRelease);
        btn.addEventListener('mouseleave', handleRelease);
    });
}

function simulateKeyEvent(target, key, type) {
    // Mapping for specific games if needed
    let code = key;
    let keyCode = 0;
    
    switch(key) {
        case 'ArrowUp': keyCode = 38; break;
        case 'ArrowDown': keyCode = 40; break;
        case 'ArrowLeft': keyCode = 37; break;
        case 'ArrowRight': keyCode = 39; break;
        case 'Enter': keyCode = 13; code = 'Enter'; break;
        case 'z': keyCode = 90; code = 'KeyZ'; break;
        case 'x': keyCode = 88; code = 'KeyX'; break;
    }

    // Try multiple ways to dispatch the event
    const eventOptions = {
        key: key,
        code: code,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
        view: window
    };

    // 1. Dispatch to window (some emulators listen here)
    window.dispatchEvent(new KeyboardEvent(type, eventOptions));
    
    // 2. Dispatch to document
    document.dispatchEvent(new KeyboardEvent(type, eventOptions));

    // 3. Try to focus iframe and dispatch
    if (document.activeElement !== target) {
        target.focus();
    }
    
    // Note: Direct dispatch to cross-origin iframe content is blocked by security policies.
}

// Themes Logic
const themes = {
    minecraft: {
        '--bg-main': '#121212',
        '--bg-header': '#585858',
        '--bg-card': '#c6c6c6',
        '--bg-accent': '#373737',
        '--text-header': '#ffffff',
        '--text-card': '#3f3f3f',
        
        // Layer 1: Grass Block (Top 64px) - Green top, dirt sides
        // Layer 2: Dirt Layer (192px)
        // Layer 3: Bedrock Bottom (256px)
        // Layer 4: Darkness Gradient
        // Layer 5: Stone & Ores (Base)
        '--bg-image': `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect width='16' height='16' fill='%235d4037'/%3E%3Crect width='16' height='3' fill='%234caf50'/%3E%3Crect x='0' y='3' width='2' height='2' fill='%234caf50'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%234caf50'/%3E%3Crect x='5' y='3' width='2' height='3' fill='%234caf50'/%3E%3Crect x='8' y='3' width='1' height='1' fill='%234caf50'/%3E%3Crect x='10' y='3' width='2' height='2' fill='%234caf50'/%3E%3Crect x='13' y='3' width='1' height='2' fill='%234caf50'/%3E%3Crect x='15' y='3' width='1' height='1' fill='%234caf50'/%3E%3C/svg%3E"),
            
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='192' viewBox='0 0 16 48' shape-rendering='crispEdges'%3E%3Crect width='16' height='48' fill='%235d4037'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%234e342e'/%3E%3Crect x='10' y='8' width='2' height='2' fill='%234e342e'/%3E%3Crect x='4' y='20' width='2' height='2' fill='%234e342e'/%3E%3Crect x='12' y='28' width='2' height='2' fill='%234e342e'/%3E%3Crect x='2' y='36' width='2' height='2' fill='%234e342e'/%3E%3Crect x='10' y='42' width='2' height='2' fill='%234e342e'/%3E%3C/svg%3E"),
            
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='256' viewBox='0 0 16 64' shape-rendering='crispEdges'%3E%3Cdefs%3E%3Cpattern id='b' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23050505'/%3E%3Cpath d='M2 2h2v2H2zM10 4h2v2h-2zM4 10h2v2H4zM12 12h2v2h-2z' fill='%23333'/%3E%3Cpath d='M1 13h1v1H1zM14 2h1v1h-1z' fill='%23222'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='16' height='64' fill='url(%23b)'/%3E%3C/svg%3E"),

            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%),

            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 32 32' shape-rendering='crispEdges'%3E%3Cdefs%3E%3Cpattern id='s' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23757575'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23666'/%3E%3Crect x='10' y='8' width='2' height='2' fill='%23666'/%3E%3C/pattern%3E%3Cpattern id='c' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23757575'/%3E%3Crect x='4' y='4' width='2' height='2' fill='%23000'/%3E%3Crect x='8' y='10' width='2' height='2' fill='%23000'/%3E%3Crect x='12' y='2' width='2' height='2' fill='%23000'/%3E%3C/pattern%3E%3Cpattern id='i' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23757575'/%3E%3Crect x='3' y='5' width='2' height='2' fill='%23d8af97'/%3E%3Crect x='9' y='11' width='2' height='2' fill='%23d8af97'/%3E%3C/pattern%3E%3Cpattern id='g' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23757575'/%3E%3Crect x='5' y='3' width='2' height='2' fill='%23ffd700'/%3E%3Crect x='11' y='9' width='2' height='2' fill='%23ffd700'/%3E%3C/pattern%3E%3Cpattern id='d' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='16' height='16' fill='%23757575'/%3E%3Crect x='6' y='6' width='4' height='4' fill='%2300bcd4'/%3E%3Crect x='4' y='10' width='2' height='2' fill='%2300bcd4'/%3E%3Crect x='10' y='3' width='2' height='2' fill='%2300bcd4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='32' height='32' fill='url(%23s)'/%3E%3Crect x='0' y='0' width='16' height='16' fill='url(%23c)'/%3E%3Crect x='16' y='16' width='16' height='16' fill='url(%23i)'/%3E%3Crect x='16' y='0' width='16' height='16' fill='url(%23s)'/%3E%3Crect x='0' y='16' width='16' height='16' fill='url(%23g)' opacity='0.5'/%3E%3Crect x='16' y='16' width='16' height='16' fill='url(%23d)' opacity='0.5'/%3E%3C/svg%3E")
        `,
        '--bg-size': '64px 64px, 64px 192px, 64px 256px, 100% 100%, 128px 128px',
        '--bg-repeat': 'repeat-x, repeat-x, repeat-x, no-repeat, repeat',
        '--bg-position': 'top left, 0 64px, bottom left, top left, top left',
        '--bg-attachment': 'scroll, scroll, scroll, scroll, scroll'
    },
    mario: {
        '--bg-main': '#6b8cff',
        '--bg-header': '#E70012',
        '--bg-card': '#FFD700',
        '--bg-accent': '#009E49',
        '--text-header': '#ffffff',
        '--text-card': '#E70012',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    luigi: {
        '--bg-main': '#4B9CD3',
        '--bg-header': '#009E49',
        '--bg-card': '#00158F',
        '--bg-accent': '#FFD700',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    peach: {
        '--bg-main': '#FFD1DC',
        '--bg-header': '#FF69B4',
        '--bg-card': '#00FFFF',
        '--bg-accent': '#FF1493',
        '--text-header': '#ffffff',
        '--text-card': '#FF1493',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    bowser: {
        '--bg-main': '#2C2C2C',
        '--bg-header': '#000000',
        '--bg-card': '#ff4400',
        '--bg-accent': '#550000',
        '--text-header': '#ff0000',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    naruto: {
        '--bg-main': '#FF8C00',
        '--bg-header': '#1a1a1a',
        '--bg-card': '#2d2d2d',
        '--bg-accent': '#FF4500',
        '--text-header': '#FF8C00',
        '--text-card': '#FFFFFF',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/clouds.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    one_piece: {
        '--bg-main': '#00BFFF',
        '--bg-header': '#DC143C',
        '--bg-card': '#FFF8DC',
        '--bg-accent': '#FFD700',
        '--text-header': '#FFFFFF',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/nautical-leather.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    dragon_ball: {
        '--bg-main': '#FF4500',
        '--bg-header': '#00008B',
        '--bg-card': '#FFFACD',
        '--bg-accent': '#FF8C00',
        '--text-header': '#FFFF00',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    demon_slayer: {
        '--bg-main': '#1a1a1a',
        '--bg-header': '#111111',
        '--bg-card': '#F5F5F5',
        '--bg-accent': '#8B0000',
        '--text-header': '#2E8B57',
        '--text-card': '#000000',
        '--bg-image': "conic-gradient(#1a1a1a 25%, #2E8B57 25% 50%, #1a1a1a 50% 75%, #2E8B57 75%)",
        '--bg-size': '100px 100px',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'fixed'
    },
    bleach: {
        '--bg-main': '#0a0a0a',
        '--bg-header': '#000000',
        '--bg-card': '#1a1a1a',
        '--bg-accent': '#cc0000',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "linear-gradient(105deg, transparent 40%, rgba(255, 0, 0, 0.4) 42%, #cccccc 43%, #ffffff 44%, #999999 45%, #222222 45%, #0a0a0a 50%, rgba(255, 0, 0, 0.2) 52%, transparent 55%), linear-gradient(170deg, transparent 65%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.1) 70%, transparent 70%), radial-gradient(circle at 50% 50%, #1a0505 0%, #000000 100%)",
        '--bg-size': '100% 100%',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    wario: {
        '--bg-main': '#9C59D1',
        '--bg-header': '#FCD116',
        '--bg-card': '#9C59D1',
        '--bg-accent': '#000000',
        '--text-header': '#000000',
        '--text-card': '#FCD116',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    classic: {
        '--bg-main': '#ffffff',
        '--bg-header': '#1a1a1a',
        '--bg-card': '#f3f4f6',
        '--bg-accent': '#e5e7eb',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    red: {
        '--bg-main': '#fee2e2',
        '--bg-header': '#dc2626',
        '--bg-card': '#fecaca',
        '--bg-accent': '#991b1b',
        '--text-header': '#ffffff',
        '--text-card': '#7f1d1d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    green: {
        '--bg-main': '#dcfce7',
        '--bg-header': '#16a34a',
        '--bg-card': '#bbf7d0',
        '--bg-accent': '#14532d',
        '--text-header': '#ffffff',
        '--text-card': '#14532d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    blue: {
        '--bg-main': '#dbeafe',
        '--bg-header': '#2563eb',
        '--bg-card': '#bfdbfe',
        '--bg-accent': '#1e3a8a',
        '--text-header': '#ffffff',
        '--text-card': '#1e3a8a',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    dark: {
        '--bg-main': '#111827',
        '--bg-header': '#000000',
        '--bg-card': '#1f2937',
        '--bg-accent': '#374151',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    basketball: {
        '--bg-main': '#fff7ed',
        '--bg-header': '#ea580c',
        '--bg-card': '#fdba74',
        '--bg-accent': '#9a3412',
        '--text-header': '#ffffff',
        '--text-card': '#431407',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E🏀%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    soccer: {
        '--bg-main': '#f0fdf4',
        '--bg-header': '#16a34a',
        '--bg-card': '#ffffff',
        '--bg-accent': '#15803d',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E⚽%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    tennis: {
        '--bg-main': '#fefce8',
        '--bg-header': '#84cc16',
        '--bg-card': '#d9f99d',
        '--bg-accent': '#3f6212',
        '--text-header': '#ffffff',
        '--text-card': '#1a2e05',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E🎾%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    jordan: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#007a3d',
        '--bg-accent': '#ce1126',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/jo.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    palestine: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#009736',
        '--bg-accent': '#ce1126',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/ps.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    usa: {
        '--bg-main': '#f3f4f6',
        '--bg-header': '#3c3b6e',
        '--bg-card': '#ffffff',
        '--bg-accent': '#b22234',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/us.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    japan: {
        '--bg-main': '#ffffff',
        '--bg-header': '#bc002d',
        '--bg-card': '#ffffff',
        '--bg-accent': '#bc002d',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/jp.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    south_korea: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#0047a0',
        '--bg-accent': '#cd2e3a',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/kr.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    china: {
        '--bg-main': '#de2910',
        '--bg-header': '#ffde00',
        '--bg-card': '#de2910',
        '--bg-accent': '#ffde00',
        '--text-header': '#de2910',
        '--text-card': '#ffde00',
        '--bg-image': "url('https://flagcdn.com/cn.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    india: {
        '--bg-main': '#ff9933',
        '--bg-header': '#138808',
        '--bg-card': '#ffffff',
        '--bg-accent': '#000080',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/in.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    saudi_arabia: {
        '--bg-main': '#165d31',
        '--bg-header': '#165d31',
        '--bg-card': '#ffffff',
        '--bg-accent': '#165d31',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/sa.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    philippines: {
        '--bg-main': '#ffffff',
        '--bg-header': '#0038a8',
        '--bg-card': '#ce1126',
        '--bg-accent': '#fcd116',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/ph.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    vietnam: {
        '--bg-main': '#da251d',
        '--bg-header': '#ffff00',
        '--bg-card': '#da251d',
        '--bg-accent': '#ffff00',
        '--text-header': '#da251d',
        '--text-card': '#ffff00',
        '--bg-image': "url('https://flagcdn.com/vn.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    thailand: {
        '--bg-main': '#ffffff',
        '--bg-header': '#2D2A4A',
        '--bg-card': '#A51931',
        '--bg-accent': '#F4F5F8',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/th.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    indonesia: {
        '--bg-main': '#ffffff',
        '--bg-header': '#FF0000',
        '--bg-card': '#ffffff',
        '--bg-accent': '#FF0000',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/id.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    malaysia: {
        '--bg-main': '#ffffff',
        '--bg-header': '#010066',
        '--bg-card': '#CC0000',
        '--bg-accent': '#FFCC00',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/my.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    nes: {
        '--bg-main': '#202020',
        '--bg-header': '#000000',
        '--bg-card': '#E0E0E0',
        '--bg-accent': '#FF0000',
        '--text-header': '#FF0000',
        '--text-card': '#000000',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    gameboy: {
        '--bg-main': '#8BAC0F',
        '--bg-header': '#306230',
        '--bg-card': '#9BBC0F',
        '--bg-accent': '#0F380F',
        '--text-header': '#9BBC0F',
        '--text-card': '#0F380F',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    snes: {
        '--bg-main': '#B0A0C0',
        '--bg-header': '#5D3FD3',
        '--bg-card': '#E6E6E6',
        '--bg-accent': '#8A6FC4',
        '--text-header': '#FFFFFF',
        '--text-card': '#5D3FD3',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    ps1: {
        '--bg-main': '#B0B0B0',
        '--bg-header': '#003087',
        '--bg-card': '#D0D0D0',
        '--bg-accent': '#DF0024',
        '--text-header': '#FFFFFF',
        '--text-card': '#000000',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    cyberpunk: {
        '--bg-main': '#000b1e',
        '--bg-header': '#0f0f0f',
        '--bg-card': '#050505',
        '--bg-accent': '#fcee0a',
        '--text-header': '#00ff9f',
        '--text-card': '#00ff9f',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    pastel: {
        '--bg-main': '#fff0f5',
        '--bg-header': '#ffb7b2',
        '--bg-card': '#ffffff',
        '--bg-accent': '#c7ceea',
        '--text-header': '#ffffff',
        '--text-card': '#6d6d6d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/diagmonds-light.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    midnight: {
        '--bg-main': '#0a0a23',
        '--bg-header': '#191970',
        '--bg-card': '#1c1c3c',
        '--bg-accent': '#483d8b',
        '--text-header': '#e6e6fa',
        '--text-card': '#e6e6fa',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    obsidian: {
        '--bg-main': '#0b0c10',
        '--bg-header': '#1f2833',
        '--bg-card': '#1f2833',
        '--bg-accent': '#66fcf1',
        '--text-header': '#c5c6c7',
        '--text-card': '#45a29e',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    deepspace: {
        '--bg-main': '#000000',
        '--bg-header': '#0f0f2d',
        '--bg-card': '#1a1a2e',
        '--bg-accent': '#e94560',
        '--text-header': '#ffffff',
        '--text-card': '#16213e',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/twinkle-twinkle.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    abyss: {
        '--bg-main': '#050505',
        '--bg-header': '#0a0a0a',
        '--bg-card': '#141414',
        '--bg-accent': '#333333',
        '--text-header': '#a0a0a0',
        '--text-card': '#808080',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    neon_night: {
        '--bg-main': '#0d0221',
        '--bg-header': '#261447',
        '--bg-card': '#2e003e',
        '--bg-accent': '#ff00cc',
        '--text-header': '#00f7ff',
        '--text-card': '#ff00cc',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    }
};

function toggleThemeMenu() {
    const menu = document.getElementById('theme-menu');
    menu.classList.toggle('hidden');
}

function setTheme(themeName, toggleMenu = true) {
    const theme = themes[themeName];
    if (!theme) return;

    // Remove old theme class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    // Add new theme class
    document.body.classList.add(`theme-${themeName}`);

    const root = document.documentElement;
    for (const [property, value] of Object.entries(theme)) {
        root.style.setProperty(property, value);
    }
    
    // Ensure logo is always gamepad-2
    const logoContainer = document.getElementById('logo-container');
    logoContainer.innerHTML = `<i data-lucide="gamepad-2" class="text-theme-card w-8 h-8"></i>`;
    lucide.createIcons();

    localStorage.setItem('selectedTheme', themeName);
    if (toggleMenu) {
        toggleThemeMenu();
    }
}

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    const themeMenu = document.getElementById('theme-menu');
    const themeButton = document.querySelector('button[onclick="toggleThemeMenu()"]');
    
    if (themeMenu && !themeMenu.classList.contains('hidden') && !themeMenu.contains(e.target) && !themeButton.contains(e.target)) {
        themeMenu.classList.add('hidden');
    }

    const langMenu = document.getElementById('language-menu');
    const langButton = document.querySelector('button[onclick="toggleLanguageMenu()"]');
    
    if (langMenu && !langMenu.classList.contains('hidden') && !langMenu.contains(e.target) && !langButton.contains(e.target)) {
        langMenu.classList.add('hidden');
    }

    const sortMenu = document.getElementById('sort-menu');
    const sortButton = document.querySelector('button[onclick="toggleSortMenu()"]');
    
    if (sortMenu && !sortMenu.classList.contains('hidden') && !sortMenu.contains(e.target) && !sortButton.contains(e.target)) {
        sortMenu.classList.add('hidden');
    }

    const authMenu = document.getElementById('auth-menu');
    const authButton = document.getElementById('auth-btn');
    
    if (authMenu && !authMenu.classList.contains('hidden') && !authMenu.contains(e.target) && !authButton.contains(e.target)) {
        authMenu.classList.add('hidden');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme, false);
} else {
    setTheme('classic', false);
}

function showGameList() {
    gamePlayerView.classList.add('hidden');
    gameListView.classList.remove('hidden');
    document.body.classList.remove('mobile-fit-active');
    document.querySelector('header').classList.remove('hidden'); // Always show header in list view
    gameIframe.src = ''; // Stop game execution
}

function toggleFullscreen() {
    const container = document.getElementById('game-container');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        fullscreenIcon.setAttribute('data-lucide', 'minimize-2');
    } else {
        document.exitFullscreen();
        fullscreenIcon.setAttribute('data-lucide', 'maximize-2');
    }
    lucide.createIcons();
}

// Auth and Custom Theme UI Functions
function toggleAuthMenu() {
    const menu = document.getElementById('auth-menu');
    menu.classList.toggle('hidden');
}

let isSignUpMode = false;

function openAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('auth-menu').classList.add('hidden');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('auth-form').reset();
    document.getElementById('auth-error').classList.add('hidden');
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    const title = document.getElementById('auth-modal-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    
    const signinIdGroup = document.getElementById('signin-identifier-group');
    const signinIdInput = document.getElementById('signin-identifier');
    
    const signupUserGroup = document.getElementById('signup-username-group');
    const signupUserInput = document.getElementById('signup-username');
    
    const signupEmailGroup = document.getElementById('signup-email-group');
    const forgotPasswordContainer = document.getElementById('forgot-password-container');

    if (isSignUpMode) {
        title.textContent = 'Create Account';
        submitBtn.textContent = 'SIGN UP';
        toggleBtn.textContent = 'Already have an account? Sign in';
        
        signinIdGroup.classList.add('hidden');
        signinIdInput.required = false;
        
        signupUserGroup.classList.remove('hidden');
        signupUserInput.required = true;
        
        signupEmailGroup.classList.remove('hidden');
        forgotPasswordContainer.classList.add('hidden');
    } else {
        title.textContent = 'Sign In';
        submitBtn.textContent = 'SIGN IN';
        toggleBtn.textContent = 'Need an account? Sign up';
        
        signinIdGroup.classList.remove('hidden');
        signinIdInput.required = true;
        
        signupUserGroup.classList.add('hidden');
        signupUserInput.required = false;
        
        signupEmailGroup.classList.add('hidden');
        forgotPasswordContainer.classList.remove('hidden');
    }
    document.getElementById('auth-error').classList.add('hidden');
}

window.handleForgotPassword = async function() {
    const identifier = document.getElementById('signin-identifier').value;
    const errorDiv = document.getElementById('auth-error');
    errorDiv.classList.add('hidden');

    if (!identifier) {
        errorDiv.textContent = "Please enter your email or username in the field above first.";
        errorDiv.classList.remove('hidden');
        return;
    }

    try {
        if (window.resetPassword) {
            await window.resetPassword(identifier);
            errorDiv.textContent = "Password reset email sent! Check your inbox.";
            errorDiv.classList.remove('hidden');
            errorDiv.classList.replace('text-red-600', 'text-green-600');
            errorDiv.classList.replace('bg-red-100', 'bg-green-100');
            errorDiv.classList.replace('border-red-600', 'border-green-600');
            
            // Reset colors after 5 seconds
            setTimeout(() => {
                errorDiv.classList.replace('text-green-600', 'text-red-600');
                errorDiv.classList.replace('bg-green-100', 'bg-red-100');
                errorDiv.classList.replace('border-green-600', 'border-red-600');
                errorDiv.classList.add('hidden');
            }, 5000);
        }
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
    }
};

window.handleAuthSubmit = async function(e) {
    e.preventDefault();
    const password = document.getElementById('auth-password').value;
    const errorDiv = document.getElementById('auth-error');
    
    errorDiv.classList.add('hidden');
    const submitBtn = document.getElementById('auth-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'PLEASE WAIT...';
    submitBtn.disabled = true;

    try {
        if (isSignUpMode) {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            if (window.signUpWithEmail) await window.signUpWithEmail(username, email, password);
        } else {
            const identifier = document.getElementById('signin-identifier').value;
            if (window.signInWithEmail) await window.signInWithEmail(identifier, password);
        }
        closeAuthModal();
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
};

function handleAuthAction() {
    if (window.firebaseAuth && window.firebaseAuth.currentUser) {
        if (window.signOutUser) window.signOutUser();
        toggleAuthMenu();
    } else {
        openAuthModal();
    }
}

window.updateAuthUI = function(user) {
    const authIcon = document.getElementById('auth-icon');
    const authAvatar = document.getElementById('auth-avatar');
    const authUserInfo = document.getElementById('auth-user-info');
    const authUserName = document.getElementById('auth-user-name');
    const authActionText = document.getElementById('auth-action-text');
    const authActionIcon = document.getElementById('auth-action-icon');
    const customThemeBtn = document.getElementById('custom-theme-btn');
    const adminDashboardBtn = document.getElementById('admin-dashboard-btn');

    if (user) {
        if (user.photoURL) {
            authAvatar.src = user.photoURL;
            authAvatar.classList.remove('hidden');
            authIcon.classList.add('hidden');
        } else {
            const initial = (user.displayName || user.email || '?').charAt(0).toUpperCase();
            authAvatar.src = `https://placehold.co/100x100/000000/FFFFFF?text=${initial}`;
            authAvatar.classList.remove('hidden');
            authIcon.classList.add('hidden');
        }
        
        authUserInfo.classList.remove('hidden');
        authUserName.textContent = user.displayName || user.email;
        authActionText.textContent = 'Sign Out';
        authActionIcon.setAttribute('data-lucide', 'log-out');
        customThemeBtn.style.display = 'flex';
        
        if (user.email === 'faisalnatour123@gmail.com') {
            adminDashboardBtn.classList.remove('hidden');
        } else {
            adminDashboardBtn.classList.add('hidden');
        }
    } else {
        authAvatar.classList.add('hidden');
        authIcon.classList.remove('hidden');
        authUserInfo.classList.add('hidden');
        authActionText.textContent = 'Sign In';
        authActionIcon.setAttribute('data-lucide', 'log-in');
        customThemeBtn.style.display = 'none';
        adminDashboardBtn.classList.add('hidden');
    }
    lucide.createIcons();
};

window.openAdminModal = function() {
    document.getElementById('admin-modal').classList.remove('hidden');
    toggleAuthMenu();
    if (window.loadAdminUsers) window.loadAdminUsers();
};

window.closeAdminModal = function() {
    document.getElementById('admin-modal').classList.add('hidden');
};

function openCustomThemeModal() {
    document.getElementById('custom-theme-modal').classList.remove('hidden');
    toggleThemeMenu();
}

function closeCustomThemeModal() {
    document.getElementById('custom-theme-modal').classList.add('hidden');
}

function applyCustomThemePreview() {
    const themeData = {
        bgMain: document.getElementById('ct-bg-main').value,
        bgHeader: document.getElementById('ct-bg-header').value,
        bgCard: document.getElementById('ct-bg-card').value,
        bgAccent: document.getElementById('ct-bg-accent').value,
        textHeader: document.getElementById('ct-text-header').value,
        textCard: document.getElementById('ct-text-card').value,
        bgImage: document.getElementById('ct-bg-image').value
    };
    window.applyCustomTheme(themeData);
}

function saveCustomTheme() {
    const themeData = {
        bgMain: document.getElementById('ct-bg-main').value,
        bgHeader: document.getElementById('ct-bg-header').value,
        bgCard: document.getElementById('ct-bg-card').value,
        bgAccent: document.getElementById('ct-bg-accent').value,
        textHeader: document.getElementById('ct-text-header').value,
        textCard: document.getElementById('ct-text-card').value,
        bgImage: document.getElementById('ct-bg-image').value
    };
    window.applyCustomTheme(themeData);
    if (window.saveCustomThemeToDb) {
        window.saveCustomThemeToDb(themeData);
    }
    closeCustomThemeModal();
}

window.applyCustomTheme = function(themeData) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add('theme-custom');
    
    const root = document.documentElement;
    root.style.setProperty('--bg-main', themeData.bgMain);
    root.style.setProperty('--bg-header', themeData.bgHeader);
    root.style.setProperty('--bg-card', themeData.bgCard);
    root.style.setProperty('--bg-accent', themeData.bgAccent);
    root.style.setProperty('--text-header', themeData.textHeader);
    root.style.setProperty('--text-card', themeData.textCard);
    
    if (themeData.bgImage) {
        root.style.setProperty('--bg-image', `url('${themeData.bgImage}')`);
        root.style.setProperty('--bg-size', 'cover');
        root.style.setProperty('--bg-repeat', 'no-repeat');
        root.style.setProperty('--bg-position', 'center');
        root.style.setProperty('--bg-attachment', 'fixed');
    } else {
        root.style.setProperty('--bg-image', 'none');
    }
    
    // Update inputs if they exist
    const inputs = ['bg-main', 'bg-header', 'bg-card', 'bg-accent', 'text-header', 'text-card', 'bg-image'];
    inputs.forEach(id => {
        const el = document.getElementById(`ct-${id}`);
        if (el && themeData[id.replace(/-([a-z])/g, g => g[1].toUpperCase())]) {
            el.value = themeData[id.replace(/-([a-z])/g, g => g[1].toUpperCase())];
        }
    });
};

// Listen for fullscreen changes to update icon
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenIcon.setAttribute('data-lucide', 'maximize-2');
        lucide.createIcons();
    } else {
        fullscreenIcon.setAttribute('data-lucide', 'minimize-2');
        lucide.createIcons();
    }
});
