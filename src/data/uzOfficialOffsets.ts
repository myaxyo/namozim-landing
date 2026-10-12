/**
 * Official minute offsets from the Tashkent timetable, per location.
 *
 * The Muslim Board of Uzbekistan publishes one timetable for Tashkent and a
 * fixed "difference from Tashkent" for every city and district; all six times
 * shift by the same number of minutes all year. Positive = later than Tashkent.
 *
 * Source: per-location offsets published on namoz-vaqti.uz (which follows the
 * Board's annual hijri calendar), collected 2026-10-12.
 * Keys: city slug, or "<citySlug>/<districtSlug>" for districts.
 */
export const UZ_OFFSET_FROM_TASHKENT: Record<string, number> = {
  // Cities
  "toshkent": 0, "chirchiq": 0, "olmaliq": 0, "angren": 0, "bekobod": 0, "ohangaron": 0, "nurafshon": 0,
  "yangiyol": 0, "andijon": -12, "xonobod": -12, "asaka": -12, "shahrixon": -12, "buxoro": 19, "kogon": 19,
  "gijduvon": 19, "fargona": -10, "qoqon": -7, "margilon": -10, "quvasoy": -11, "rishton": -10, "quva": -10,
  "jizzax": 6, "namangan": -10, "chust": -10, "pop": -10, "kosonsoy": -10, "chortoq": -10, "navoiy": 15,
  "zarafshon": 20, "uchquduq": 23, "qarshi": 14, "shahrisabz": 10, "kitob": 14, "muborak": 14, "guzor": 14,
  "samarqand": 9, "kattaqorgon": 12, "urgut": 9, "guliston": 2, "yangiyer": 2, "shirin": 3, "termiz": 8,
  "denov": 8, "sherobod": 8, "urganch": 34, "xiva": 35, "nukus": 39, "qonggirot": 36, "moynoq": 41,
  "tortqol": 32, "beruniy": 36, "taxiatosh": 39,
  // Districts
  "andijon/oltinkol": -12, "andijon/baliqchi": -12, "andijon/boz": -12, "andijon/buloqboshi": -12,
  "andijon/jalaquduq": -12, "andijon/izboskan": -12, "andijon/ulugnor": -12, "andijon/qorgontepa": -12,
  "andijon/asaka-t": -12, "andijon/marxamat": -12, "andijon/shahrixon-t": -12, "andijon/paxtaobod": -12,
  "andijon/xojaobod": -12, "buxoro/olot": 19, "buxoro/buxoro-t": 19, "buxoro/vobkent": 19,
  "buxoro/gijduvon-t": 19, "buxoro/qorakol": 19, "buxoro/qorovulbozor": 19, "buxoro/peshku": 19,
  "buxoro/romitan": 19, "buxoro/jondor": 19, "buxoro/shofirkon": 19, "fargona/oltiariq": -10,
  "fargona/qoshtepa": -10, "fargona/bogdod": -10, "fargona/buvayda": -10, "fargona/beshariq": -10,
  "fargona/quva-t": -10, "fargona/uchkoprik": -10, "fargona/rishton-t": -10, "fargona/sox": -10,
  "fargona/toshloq": -10, "fargona/uzbekiston-t": -10, "fargona/fargona-t": -10, "fargona/dangara": -10,
  "fargona/furqat": -10, "fargona/yozyovon": -10, "jizzax/arnasoy": 6, "jizzax/baxmal": 6,
  "jizzax/gallaorol": 6, "jizzax/dostlik": 6, "jizzax/zomin": 6, "jizzax/zarbdor": 6, "jizzax/mirzachol": 6,
  "jizzax/zafarobod": 6, "jizzax/paxtakor": 6, "jizzax/forish": 6, "jizzax/yangiobod": 6,
  "namangan/mingbuloq": -10, "namangan/kosonsoy-t": -10, "namangan/namangan-t": -10, "namangan/norin": -10,
  "namangan/pop-t": -10, "namangan/toraqorgon": -10, "namangan/uychi": -10, "namangan/uchqorgon": -10,
  "namangan/chortoq-t": -10, "namangan/chust-t": -10, "namangan/yangiqorgon": -10, "navoiy/konimex": 15,
  "navoiy/qiziltepa": 15, "navoiy/navbahor": 15, "navoiy/karmana": 15, "navoiy/nurota": 15,
  "navoiy/tomdi": 15, "navoiy/xatirchi": 15, "qarshi/guzor-t": 14, "qarshi/dehqonobod": 14,
  "qarshi/qamashi": 14, "qarshi/koson": 14, "qarshi/mirishkor": 14, "qarshi/muborak-t": 14,
  "qarshi/nishon": 14, "qarshi/kasbi": 14, "qarshi/chiroqchi": 14, "qarshi/yakkabog": 14,
  "samarqand/oqdaryo": 9, "samarqand/bulungur": 9, "samarqand/jomboy": 9, "samarqand/ishtixon": 9,
  "samarqand/kattaqorgon-t": 9, "samarqand/qoshrabot": 9, "samarqand/narpay": 9, "samarqand/payariq": 9,
  "samarqand/pastdargom": 9, "samarqand/paxtachi": 9, "samarqand/nurobod": 9, "samarqand/urgut-t": 9,
  "samarqand/tayloq": 9, "termiz/oltinsoy": 8, "termiz/angor": 8, "termiz/boysun": 8, "termiz/muzrabot": 8,
  "termiz/denov-t": 8, "termiz/jarqorgon": 8, "termiz/qumqorgon": 8, "termiz/qiziriq": 8,
  "termiz/sariosiyo": 8, "termiz/uzun": 8, "termiz/sherobod-t": 8, "termiz/shorchi": 8,
  "toshkent/oqqorgon": 0, "toshkent/ohangaron-t": 0, "toshkent/bekobod-t": 0, "toshkent/bostonliq": 0,
  "toshkent/boka": 0, "toshkent/zangiota": 0, "toshkent/yuqorichirchiq": 0, "toshkent/qibray": 0,
  "toshkent/parkent": 0, "toshkent/piskent": 0, "toshkent/ortachirchiq": 0, "toshkent/chinoz": 0,
  "toshkent/yangiyol-t": 0, "guliston/oqoltin": 2, "guliston/boyovut": 2, "guliston/sayxunobod": 2,
  "guliston/guliston-t": 2, "guliston/sardoba": 2, "guliston/mirzaobod": 2, "guliston/sirdaryo-t": 2,
  "guliston/xovos": 2, "urganch/bogot": 35, "urganch/gurlan": 35, "urganch/qoshkopir": 34,
  "urganch/urganch-t": 34, "urganch/xazorasp": 32, "urganch/xonqa": 34, "urganch/shovot": 34,
  "urganch/yangiariq": 34, "urganch/yangibozor": 34, "nukus/amudaryo": 36, "nukus/beruniy-t": 36,
  "nukus/qoraozak": 28, "nukus/kegeyli": 36, "nukus/qanlikol": 36, "nukus/moynoq-t": 41, "nukus/nukus-t": 36,
  "nukus/taxiatosh-t": 39, "nukus/taxtakopir": 35, "nukus/tortkol-t": 32, "nukus/xojayli": 36,
  "nukus/chimboy": 36, "nukus/shumanay": 36, "nukus/ellikqala": 36,
};
