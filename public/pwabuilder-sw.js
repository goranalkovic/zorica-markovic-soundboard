// This is the service worker with the Cache-first network

const CACHE = "pwabuilder-precache";
const precacheFiles = [
  /* Add an array of files to precache for your app */
  "./audio/ahaaa-ahaaa.m4a",
  "./audio/ako-te-pljunem-zardjat-ces.m4a",
  "./audio/al-ne-vredi-ne-moze-ti-si-kurva-u-mozgu.m4a",
  "./audio/alo-ja-nisam-sluzavka-nicija-ovo-je-cisto-moja-dobra-volja.m4a",
  "./audio/alo-ja-nisam-sluzavka-nicija.m4a",
  "./audio/bolje-da-si-se-za-trofaznu-struju-uhvatila-nego-za-mene.m4a",
  "./audio/cao-bednice.m4a",
  "./audio/cao-cao-cao-cao-cao.m4a",
  "./audio/cgr-dgr-obr-1997.m4a",
  "./audio/cgr-dgr-obr-fakju.m4a",
  "./audio/cgr-dgr-obr.m4a",
  "./audio/cuti-bre-zavezi-bre.m4a",
  "./audio/da-bi-videla-s-kim-zivim-ne-bi-ti-bilo-dobro-mucenice.m4a",
  "./audio/da-da.m4a",
  "./audio/da-sire-noge-to-znaju-za-to-su-razradjene-mesaj-udri.m4a",
  "./audio/dodji-vamo-da-te-sastavim-sa-crnom-zemljom-picko-jedna-pijana-bre.m4a",
  "./audio/dokad-vise-bre-dokad.m4a",
  "./audio/dokad-vise-bre.m4a",
  "./audio/e-muko-jedna.m4a",
  "./audio/e-onda-ces-biti-jebena-i-prebijena-jebem-li-ti-mamu-kurvinu.m4a",
  "./audio/e-sad-cu-ja-njemu-na-grbacu-da-se-nakacim.m4a",
  "./audio/e-sad-stvarno-pusite-kurac.m4a",
  "./audio/ehehehe.m4a",
  "./audio/ej-jadnice-pa-ti-se-raspadas-nisi-ni-svesna.m4a",
  "./audio/evo-sacu-ja-da-mu-kazem-ko-ga-je-doveo-i-ko-ga-drzi-i-ko-ga-ceka-napolju.m4a",
  "./audio/fizionomiju-cu-ti-izmijeniti-zapamti.m4a",
  "./audio/glumis-nesto-deres-se-ovde-picka-ti-materina-bre-ne-sme-niko-nista-da-kaze.m4a",
  "./audio/gora-si-od-picajzle-skini-mi-se-s-kicme.m4a",
  "./audio/ha-ha-ha-ha-ha.m4a",
  "./audio/hoces-meni.m4a",
  "./audio/ima-neki-stav-ko-da-je-popio-sav-mozak-ovog-sveta.m4a",
  "./audio/imas-da-crknes-kad-si-pokvaren.m4a",
  "./audio/imas-facu-kao-pikinezer.m4a",
  "./audio/izlazi-napolje-bre-mrs-picko-pijana.m4a",
  "./audio/ja-imam-komplekse-jebem-te-u-usta-razbicu-te-sad-ko-picku.m4a",
  "./audio/ja-kad-ne-bi-srala-ti-ne-bi-imao-sta-da-jedes.m4a",
  "./audio/ja-necu-da-je-ostavim-na-miru-usracu-joj-se-u-zivot.m4a",
  "./audio/ja-nemam-nameru-da-budem-sudopera-nego-lider.m4a",
  "./audio/ja-sam-najgora-ja-sam-najpodlija-ja-sam-djubre-ja-sam-raspali-olos-ja-sam-ljudski-odron.m4a",
  "./audio/ja-sam-ovde-totalno-neutralna.m4a",
  "./audio/ja-sam-zena-majka-kraljica-domacica-sve.m4a",
  "./audio/jadna-kuca-gde-one-dodju.m4a",
  "./audio/jao-boze-gospode-ja-nisam-normalna.m4a",
  "./audio/jao-zivote-jebem-ti-mater-u-picku-ti-jebem-zivote.m4a",
  "./audio/jebem-li-ti-familiju-celu.m4a",
  "./audio/jebem-li-ti-mamu-familiju-poreklo-genetiku-seme-sve-ti-jebem.m4a",
  "./audio/jebem-li-ti-mamu-u-picku-kurvinu.m4a",
  "./audio/jebem-li-ti-seme-koje-nosis.m4a",
  "./audio/jebem-ti-sedam-kolena-i-unapred-i-unazad.m4a",
  "./audio/jedi-govna-bre-majmune.m4a",
  "./audio/jedi-govna-i-ti-i-zajedno-s-ugovorom.m4a",
  "./audio/kakav-komentar-na-celu-situaciju-i-pitanje-da-si-sve-pojeo.m4a",
  "./audio/kako-cu-ti-se-usrati-u-zivot-kurvo.m4a",
  "./audio/kako-sam-dosla-seo-mi-na-kicmu-nikad-mu-nista-nisam-rekla.m4a",
  "./audio/lizes-picke-jebu-te-za-pare.m4a",
  "./audio/ma-hladno-je-kurac.m4a",
  "./audio/ma-sacu-da-se-poserem-ovde-sacu-da-joj-se-poserem-na-krevet.m4a",
  "./audio/ma-sacu-da-se-poserem-ovde-sacu-da-joj-se-poserem-na-krevet-extended.m4a",
  "./audio/mamu-ti-jebem-kurvetino.m4a",
  "./audio/marija-za-koliko-smo-ja-i-ti-celu-kuhinju-sredili.m4a",
  "./audio/mhm-da-da-da-da.m4a",
  "./audio/misliti-srati-cvece-brati-nikad-nije-bilo-isto.m4a",
  "./audio/mnogo-mi-je-zao-sto-sam-pozitivnu-energiju-potrosila-uz-vetar.m4a",
  "./audio/momentalno-da-se-pocisti-soba-produzena-verzija.m4a",
  "./audio/momentalno-da-se-pocisti-soba.m4a",
  "./audio/mrs-u-picku-materinu.glumis-mi-mafiozu-ovde-ti-neku.m4a",
  "./audio/na-koga-da-budem-ljubomorna-ovde.m4a",
  "./audio/na-prstima-hodam-jesam-li-ikog-probudila.m4a",
  "./audio/ne-deri-se-na-mene.m4a",
  "./audio/ne-mogu-da-se-odlucim-al-sve-bi-ih-potamanila.m4a",
  "./audio/ne-pominji-mene-vise-jel-ti-jasno-zavezi.m4a",
  "./audio/ne-seri-govno-jedno-otrcano-matoro-nemoj-da-me-vredjas.m4a",
  "./audio/nemoj-da-se-deres-ti-na-mene-zavezi-bre.m4a",
  "./audio/obrisacu-farmu-s-tobom.m4a",
  "./audio/od-sad-u-sirokom-luku-me-obilazi.m4a",
  "./audio/od-sada-ja-cu-prati-sudove.m4a",
  "./audio/od-sada-nadalje-neces-imati-mira-od-mene-oko-hrane-i-svega.m4a",
  "./audio/odi-me-poljubi-u-stiklu-kada-ugazim-u-govno.m4a",
  "./audio/ohohoho-jao-jadnice.m4a",
  "./audio/pa-gde-sam-ja-dosla-da-zivim-u-stenaru.m4a",
  "./audio/pa-ja-sam-taman-videla-da-neki-brisu-ovako-nakon-oralnog-sexa-ko-da-svi-jedu-burek.m4a",
  "./audio/pa-pogledaj-fuxo-na-sta-licis.m4a",
  "./audio/picka-ti-materina-bre-nistacka.m4a",
  "./audio/pijandura-jedna-picketina-jedna-pijana.m4a",
  "./audio/poklone-i-uvrede-ne-primam-od-svakoga.m4a",
  "./audio/polako-bez-svadje-bez-frke-bez-dranja-i-bez-gestikulacije-majmunske.m4a",
  "./audio/posle-svakog-kupanja-pokupim-vodu-ova-vice-klozetarka.m4a",
  "./audio/posteljina.m4a",
  "./audio/problem-je-sto-si-glupa-poseres-pa-polizes.m4a",
  "./audio/profitarole.m4a",
  "./audio/prostitutko-najplacenija-kurvo.m4a",
  "./audio/puj-nisi-ni-pljuvacke-moje-vrijedna.m4a",
  "./audio/puj-olosu-jedan-za-pijacu.m4a",
  "./audio/sad-cu-ja-picki-da-pokazem.m4a",
  "./audio/samnom-se-niko-nece-zajebavat.m4a",
  "./audio/seme-ti-jebem-krvavo.m4a",
  "./audio/sta-me-gledas-a-mislis-da-te-se-bojim.m4a",
  "./audio/sta-sam-dosla-jebem-ti-mamu-u-picku-ti-jebem.m4a",
  "./audio/sta-si-me-pito-kad-si-uso-u-sobu.m4a",
  "./audio/sta-si-pevacica-jebacica-koje-je-tvoje-zvanje.m4a",
  "./audio/sto-lazes-jebem-li-te-u-usta-mala.m4a",
  "./audio/strasno-mi-po-mozgu-ides.m4a",
  "./audio/strvino-pacovska-jebem-te-u-usta-zvaljava.m4a",
  "./audio/sujetni-jadni-ograniceni-ja-sam-mislila-da-je-ona-kudikamo-inteligentnija.m4a",
  "./audio/ti-nisi-drugo-nego-pralja-idi-pa-peri.m4a",
  "./audio/ti-postajes-merna-jedinica-za-glupocu.m4a",
  "./audio/ti-rascipam-glavu-dzogerom-pa-cu-ti-kazem-ko-je-sta-mamu-ti-jebem.m4a",
  "./audio/ti-si-mnogo-bitna-u-picku-materinu.m4a",
  "./audio/ti-volis-picku-na-plejbek.m4a",
  "./audio/to-takvi-olosi-zavladali.m4a",
  "./audio/uhvatila-si-se-za-trofaznu-struju-pazi-da-ne-nastradas-od-nje.m4a",
  "./audio/usracu-joj-se-u-zivot-odsad-do-kraja.m4a",
  "./audio/usracu-ti-se-u-zivot-da-ces-pamtiti-do-kraja-zivota.m4a",
  "./audio/usracu-ti-se-u-zivot-zapamti.m4a",
  "./audio/vidimo-se-na-sudu-cao-zdravo-dovidjenja.m4a",
  "./audio/zabagovala-sam-malo.m4a",
  "./audio/zavezi-jebem-ti-genetiku-poreklo-i-porodicu.m4a",
  "./audio/znas-sta-lakse-ti-je-u-dupe-uterati-nego-u-glavu.m4a",
  "./audio/zoka-vic-majstor.m4a",
  "./audio/zorka-ce-te-razvaliti.m4a"
];

self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Caching pages during install");
      return cache.addAll(precacheFiles);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            console.log("[PWA Builder] Network request failed and no cache." + error);
          });
      }
    )
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
