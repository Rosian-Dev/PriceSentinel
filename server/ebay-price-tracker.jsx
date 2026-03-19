import { useState, useEffect, useMemo } from "react";

const ROSIANSELLS_LISTINGS = [{"itemId":"205455545149","title":"VCARD Rising Stars 1st Edition Full Set QR Code Cards 9/9","price":8.0,"qty":"25","condition":"Ungraded","category":"Trading Card Singles","watchers":15,"sold":7},{"itemId":"205605254069","title":"Gamersupps VCARD Rising Stars 1st Ed Numi Nihmune Artist Series Box Topper","price":225.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":13,"sold":0},{"itemId":"205695496437","title":"GamerSupps - Vcard Awakened Worlds - 1st Edition Foil Kokonuts 10","price":13.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":1},{"itemId":"205697109992","title":"VCard Awakened Worlds: First Edition - Cyyu 10 Ultra Rare Holo","price":14.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":1},{"itemId":"205697183912","title":"VCard Awakened Worlds puzzle piece 6/9 Middle Right","price":5.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":2},{"itemId":"205697194735","title":"Vcard Awakened Worlds Bricky Box Topper 1st Edition- NM","price":11.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":0},{"itemId":"205697198867","title":"Vcard TCG Awakened Worlds Artist Box Topper 1st Edition Cyanide & Happiness","price":8.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":4,"sold":0},{"itemId":"205698857835","title":"Gamersupps VCard Awakened Worlds First Edition Box Topper - SwaggerSouls","price":6.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205698858572","title":"VCard Awakened Worlds: JSchlatt Box Topper","price":7.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":0},{"itemId":"205698860273","title":"VCard Awakened Worlds - First Edition Box Topper - Anime Men","price":7.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205740901095","title":"VCard Awakened Worlds - 1st Edition - 10 arielle","price":19.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205740904139","title":"VCard Awakened Worlds - 1st Edition - 10 saruei","price":19.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"205740915956","title":"Gamersupps Vcard Awakened Worlds 1st Edition - Critical Condition - Box Topper","price":39.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205740942427","title":"Vcard TCG Awakened Worlds Box Topper 1st Edition Bricky","price":7.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205740943744","title":"VCard Awakened Worlds - 1st Edition - Cyanide & Happiness - Box Topper","price":4.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205741976325","title":"VCard Awakened Worlds: First Edition - secret rare pretty Privilege","price":4.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205742339049","title":"VCard Awakened Worlds: First Edition - secret rare massive legend","price":3.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205742359057","title":"Gamersupps VCard Awakened Worlds: First Edition Critical Condition Secret Rare","price":3.5,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744078931","title":"Vcard TCG Awakened Worlds Gamersupps Secret Rare Gassing Up 1st Edition 271/250","price":5.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744086751","title":"VCard Awakened Worlds: First Edition - secret rare splash damage","price":4.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744088130","title":"VCard Awakened Worlds: First Edition - secret rare soaked in happiness","price":4.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744097079","title":"VCard Awakened Worlds: First Edition - secret rare brick by brick","price":5.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744101894","title":"VCard Awakened Worlds: First Edition - secret rare world premiere","price":6.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744375702","title":"VCard Awakened Worlds: First Edition - holo 9 rainhoe","price":5.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744394068","title":"VCard Awakened Worlds: First Edition - holo 9 fream","price":2.5,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744408932","title":"VCard Awakened Worlds: First Edition - holo 9 cyyu","price":2.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":1},{"itemId":"205744586280","title":"VCard Awakened Worlds: First Edition - holo 9 spite","price":4.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744587922","title":"VCard Awakened Worlds: First Edition - holo 9 poseidon","price":2.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744591069","title":"VCard Awakened Worlds: First Edition - holo 9 captain hannah","price":2.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744606904","title":"VCard Awakened Worlds: First Edition - holo 9 yuzu","price":4.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744608856","title":"VCard Awakened Worlds: First Edition - holo 9 yenko","price":2.48,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":2},{"itemId":"205744639152","title":"VCard Awakened Worlds: First Edition - holo 9 ein","price":2.5,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744643417","title":"VCard Awakened Worlds: First Edition - holo 9 aicandii","price":1.98,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744647960","title":"VCard Awakened Worlds: First Edition - holo 9 numi","price":8.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":0},{"itemId":"205744733940","title":"VCard Awakened Worlds: First Edition - holo 9 nyanners","price":7.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744736051","title":"VCard Awakened Worlds: First Edition - holo 9 lord aethelstan","price":1.98,"qty":"1","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744739655","title":"VCard Awakened Worlds: First Edition - holo 9 amalee","price":5.5,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":5,"sold":0},{"itemId":"205744750720","title":"VCard Awakened Worlds: First Edition - holo 9 crowki","price":2.5,"qty":"5","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744752386","title":"VCard Awakened Worlds: First Edition - holo 9 vienna","price":4.5,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744754813","title":"VCard Awakened Worlds: First Edition - holo 9 trickywi","price":2.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744756156","title":"VCard Awakened Worlds: First Edition - holo 9 egg","price":2.5,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744758061","title":"VCard Awakened Worlds: First Edition - holo 9 kokonuts","price":2.5,"qty":"2","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744759213","title":"VCard Awakened Worlds: First Edition - holo 9 deme","price":5.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744760892","title":"VCard Awakened Worlds: First Edition - holo 9 heavenly","price":2.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744763068","title":"VCard Awakened Worlds: First Edition - holo 9 squchan","price":5.5,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744764887","title":"VCard Awakened Worlds: First Edition - holo 9 obkatiekat","price":4.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744766712","title":"VCard Awakened Worlds: First Edition - holo 9 spring bao","price":8.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"205744768717","title":"VCard Awakened Worlds: First Edition - holo 9 sansin","price":2.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":1},{"itemId":"205744769530","title":"VCard Awakened Worlds: First Edition - holo 9 sky","price":4.5,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"205744779946","title":"VCard Awakened Worlds: First Edition - holo 9 porcelainmaid","price":2.5,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":1},{"itemId":"205807146733","title":"Gamersupps Vcard elemental CottontailVa Cottontail Card Sleeves","price":23.0,"qty":"1","condition":"New","category":"CCG Card Sleeves","watchers":1,"sold":0},{"itemId":"206083414842","title":"Gamersupps Vcard Sinder #34, Rising Stars, 1st Edition Box Topper","price":290.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":6,"sold":0},{"itemId":"206118377447","title":"VCard Divine Chaos First Edition - 10 - Fefe","price":40.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118378693","title":"VCard Divine Chaos First Edition - 10 - Bikini Ikumi","price":40.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118381024","title":"VCard Divine Chaos First Edition - 10 - Aquwa","price":24.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118384926","title":"VCard Divine Chaos First Edition - 10 - Heavenly","price":7.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":1},{"itemId":"206118386277","title":"VCard Divine Chaos First Edition - 10 - Kairyu Crocodile","price":29.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":1},{"itemId":"206118390963","title":"VCard Divine Chaos First Edition - 10 - SmugAlana","price":49.99,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":3,"sold":0},{"itemId":"206118395734","title":"VCard Divine Chaos First Edition - 10 - Spite","price":40.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118400704","title":"VCard Divine Chaos First Edition - 10 - Fream","price":17.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118402465","title":"VCard Divine Chaos First Edition - 10 - Froggyloch","price":18.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118403826","title":"VCard Divine Chaos First Edition - 10 - Bao the Whale","price":64.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":1},{"itemId":"206118407868","title":"VCard Divine Chaos First Edition - 10 - Diamond Heist Elly","price":18.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":1},{"itemId":"206118413168","title":"VCard Divine Chaos First Edition - 10 - Shylily","price":90.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118449597","title":"VCard Divine Chaos First Edition - 10 - Saiiren","price":17.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":1},{"itemId":"206118450763","title":"VCard Divine Chaos First Edition - 10 - Camila","price":22.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118452770","title":"VCard Divine Chaos First Edition - 10 - Vexoria the Sun Eater","price":18.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118467238","title":"VCard Divine Chaos First Edition - 10 - Numi Nihmune","price":72.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118468370","title":"VCard Divine Chaos First Edition - 10 - Nyannie","price":30.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118469131","title":"VCard Divine Chaos First Edition - 10 - Laimu","price":28.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118471125","title":"VCard Divine Chaos First Edition - 10 - Nanoless Maiden in Heaven","price":32.0,"qty":"2","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118472653","title":"VCard Divine Chaos First Edition - 10 - Yuzu","price":43.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118477435","title":"VCard Divine Chaos First Edition - 10 - Cyyu Cyfy","price":19.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118480682","title":"VCard Divine Chaos First Edition - 10 - Lord Aethelstan","price":18.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118483645","title":"VCard Divine Chaos First Edition - 10 - Shiabun","price":9.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118491607","title":"VCard Divine Chaos First Edition - Box Topper - Kairyu Crocodile","price":60.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118495187","title":"VCard Divine Chaos First Edition - Box Topper - Alluux","price":45.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118498934","title":"VCard Divine Chaos First Edition - Box Topper - Heavenly","price":29.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118501382","title":"VCard Divine Chaos First Edition - Secret Rare - Shift D","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118506187","title":"VCard Divine Chaos First Edition - Secret Rare - Lucky Pull","price":9.0,"qty":"6","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118506930","title":"VCard Divine Chaos First Edition - Secret Rare - Medicinal Herbs","price":9.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118508713","title":"VCard Divine Chaos First Edition - Secret Rare - Narrator","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118509764","title":"VCard Divine Chaos First Edition - Secret Rare - For the Alliance","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118510386","title":"VCard Divine Chaos First Edition - Secret Rare - The Pass","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118512131","title":"VCard Divine Chaos First Edition - Secret Rare - Bard's Favor","price":9.0,"qty":"4","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118513434","title":"VCard Divine Chaos First Edition - Secret Rare - Lesson Learned","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118518751","title":"VCard Divine Chaos First Edition - Secret Rare - Dreamscape","price":10.0,"qty":"5","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118523720","title":"VCard Divine Chaos First Edition - Secret Rare - Two Faced","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118526917","title":"VCard Divine Chaos First Edition - Secret Rare - Chaos Guardian","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118528883","title":"VCard Divine Chaos First Edition - Secret Rare - Secret Recipe","price":10.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118529512","title":"VCard Divine Chaos First Edition - Secret Rare - Frouge Ambush","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118530025","title":"VCard Divine Chaos First Edition - Secret Rare - Storyboard","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118530785","title":"VCard Divine Chaos First Edition - Secret Rare - Divine Guardian","price":9.0,"qty":"1","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118531298","title":"VCard Divine Chaos First Edition - Secret Rare - Looking Respectfully","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118535650","title":"VCard Divine Chaos First Edition - Puzzle Piece - Bottom Right 9/9","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118536118","title":"VCard Divine Chaos First Edition - Puzzle Piece - Bottom Middle 8/9","price":9.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118536817","title":"VCard Divine Chaos First Edition - Puzzle Piece - Bottom Left 7/9","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118539571","title":"VCard Divine Chaos First Edition - Puzzle Piece -Middle Right 6/9","price":9.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118542061","title":"VCard Divine Chaos First Edition - Puzzle Piece -Middle 5/9","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118543429","title":"VCard Divine Chaos First Edition - Puzzle Piece - Top Middle 2/9","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118550476","title":"VCard Divine Chaos First Edition - Puzzle Piece - Top Right 3/9","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118554042","title":"VCard Divine Chaos First Edition - Box Topper - Lucky Pull Clooless","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118555526","title":"VCard Divine Chaos First Edition - Box Topper - Narrator Ray","price":15.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118556721","title":"VCard Divine Chaos First Edition - Box Topper - TheRussianBadger Shift D","price":14.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118564834","title":"VCard Divine Chaos First Edition Box Topper - Looking Respectfully Jeremy Dooley","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118571941","title":"VCard Divine Chaos First Edition Box Topper - JaidenAnimations Storyboard","price":19.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118579087","title":"VCard Divine Chaos First Edition Box Topper - Two Faced Paroro momodeary","price":39.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118588550","title":"VCard Divine Chaos First Edition Box Topper - Bryceup The Pass","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118676346","title":"VCard Divine Chaos First Edition - Holo 9 - Wet Fefe","price":7.0,"qty":"5","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118676824","title":"VCard Divine Chaos First Edition - Holo 9 - Aquwa","price":11.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118677341","title":"VCard Divine Chaos First Edition - Holo 9 - Suto","price":11.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118677842","title":"VCard Divine Chaos First Edition - Holo 9 - Bikini Ikumi","price":12.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118678844","title":"VCard Divine Chaos First Edition - Holo 9 - Kairyu Crocodile","price":11.0,"qty":"5","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118679527","title":"VCard Divine Chaos First Edition - Holo 9 - Sykkuno","price":8.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118682430","title":"VCard Divine Chaos First Edition - Holo 9 - Alluux","price":9.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118685227","title":"VCard Divine Chaos First Edition - Holo 9 - Rosedoodle","price":13.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118689764","title":"VCard Divine Chaos First Edition - Holo 9 - Heavenly","price":5.5,"qty":"2","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118693330","title":"VCard Divine Chaos First Edition - Holo 9 - Spite","price":14.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118695188","title":"VCard Divine Chaos First Edition - Holo 9 - Froggyloch","price":9.0,"qty":"5","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118696767","title":"VCard Divine Chaos First Edition - Holo 9 - K9Kuro","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118697496","title":"VCard Divine Chaos First Edition - Holo 9 - SmugAlana","price":15.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118698194","title":"VCard Divine Chaos First Edition - Holo 9 - Fream","price":13.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118699311","title":"VCard Divine Chaos First Edition - Holo 9 - Tob","price":9.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118700747","title":"VCard Divine Chaos First Edition - Holo 9 - Diamond Heist Elly","price":13.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118701289","title":"VCard Divine Chaos First Edition - Holo 9 - GX Aura","price":7.5,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118702483","title":"VCard Divine Chaos First Edition - Holo 9 - Zentreya","price":15.0,"qty":"7","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":1},{"itemId":"206118705885","title":"VCard Divine Chaos First Edition - Holo 9 - Bao the Whale","price":14.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118710959","title":"VCard Divine Chaos First Edition - Holo 9 - Giwi","price":9.0,"qty":"2","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118712492","title":"VCard Divine Chaos First Edition - Holo 9 - Vexoria the Sun Eater","price":15.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118713650","title":"VCard Divine Chaos First Edition - Holo 9 - Dokibird","price":12.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118719436","title":"VCard Divine Chaos First Edition - Holo 9 - Numi Nihume","price":19.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118724450","title":"VCard Divine Chaos First Edition - Holo 9 - CottontailVA","price":19.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118728546","title":"VCard Divine Chaos First Edition - Holo 9 - Crimson Bloom","price":14.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118729342","title":"VCard Divine Chaos First Edition - Holo 9 - Camila","price":12.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":1},{"itemId":"206118729649","title":"VCard Divine Chaos First Edition - Holo 9 - Rainhoe","price":13.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118730865","title":"VCard Divine Chaos First Edition - Holo 9 - Clumsy Totless","price":10.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118731649","title":"VCard Divine Chaos First Edition - Holo 9 - Nyanners","price":14.0,"qty":"2","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118732165","title":"VCard Divine Chaos First Edition - Holo 9 - Silvervale","price":15.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118733036","title":"VCard Divine Chaos First Edition - Holo 9 - Chibidoki","price":14.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118733926","title":"VCard Divine Chaos First Edition - Holo 9 - Laimu","price":15.0,"qty":"4","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118734704","title":"VCard Divine Chaos First Edition - Holo 9 - Lord Aethelstan","price":7.5,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118735651","title":"VCard Divine Chaos First Edition - Holo 9 - Reine of the Sacred Light","price":4.5,"qty":"3","condition":"VERY_GOOD","category":"CCG Individual Cards","watchers":2,"sold":1},{"itemId":"206118736290","title":"VCard Divine Chaos First Edition - Holo 9 - Luciel Lucy Pyre","price":15.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206118736635","title":"VCard Divine Chaos First Edition - Holo 9 - Vei","price":13.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":2,"sold":0},{"itemId":"206118736810","title":"VCard Divine Chaos First Edition - Holo 9 - Nyannie","price":10.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118737089","title":"VCard Divine Chaos First Edition - Holo 9 - Cyfy","price":9.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118738059","title":"VCard Divine Chaos First Edition - Holo 9 - Golden Hour DyaRikku Rikku","price":11.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118738535","title":"VCard Divine Chaos First Edition - Holo 9 - Squchan","price":14.0,"qty":"2","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118747103","title":"VCard Divine Chaos First Edition - Holo 9 - Amalee","price":14.0,"qty":"3","condition":"Ungraded","category":"CCG Individual Cards","watchers":0,"sold":0},{"itemId":"206118752054","title":"VCard Divine Chaos First Edition - 10 - Squchan","price":29.0,"qty":"1","condition":"Ungraded","category":"CCG Individual Cards","watchers":1,"sold":0},{"itemId":"206119360210","title":"VCard Divine Chaos Booster Box Bulk","price":30.0,"qty":"23","condition":"Used","category":"CCG Mixed Card Lots","watchers":0,"sold":0}];

const ebaySearchUrl = (title) =>
  `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(title)}&_sop=15&LH_BIN=1`;
const ebayItemUrl = (id) => `https://www.ebay.com/itm/${id}`;
const ebayEditUrl = (id) => `https://www.ebay.com/lstng?mode=ReviseItem&itemId=${id}&sr=wn`;

function buildItem(listing) {
  return {
    ...listing,
    checked: false,
    checkedAt: null,
  };
}

const CATS = ["All", ...Array.from(new Set(ROSIANSELLS_LISTINGS.map(l => l.category)))];

// ── Storage helpers ───────────────────────────────────────────────────────────
const STORAGE_KEY = "sentinel:state:v1";

async function loadPersistedState() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    if (result && result.value) return JSON.parse(result.value);
  } catch (_) {}
  return null;
}

async function persistState(items) {
  try {
    const toSave = items.map(({ itemId, checked, checkedAt }) => ({
      itemId, checked,
      checkedAt: checkedAt ? new Date(checkedAt).toISOString() : null,
    }));
    await window.storage.set(STORAGE_KEY, JSON.stringify(toSave));
  } catch (_) {}
}

function mergePersistedIntoItems(baseItems, saved) {
  if (!saved) return baseItems;
  const map = {};
  for (const s of saved) map[s.itemId] = s;
  return baseItems.map(item => {
    const s = map[item.itemId];
    if (!s) return item;
    return {
      ...item,
      checked:   s.checked   ?? false,
      checkedAt: s.checkedAt ? new Date(s.checkedAt) : null,
    };
  });
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function PriceSentinel() {
  const [items, setItems]           = useState(() => ROSIANSELLS_LISTINGS.map(buildItem));
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [apiStatus, setApiStatus]   = useState("idle"); // idle | loading | live | error
  const [tab, setTab]               = useState("dashboard");
  const [search, setSearch]         = useState("");
  const [cat, setCat]               = useState("All");
  const [sort, setSort]             = useState("price_desc");
  const [expanded, setExpanded]     = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Load persisted state on mount, then try live API
  useEffect(() => {
    loadPersistedState().then(saved => {
      if (saved) {
        setItems(prev => mergePersistedIntoItems(prev, saved));
      }
      setStorageLoaded(true);
    });

    // Fetch live listings from local server
    setApiStatus("loading");
    fetch("https://localhost:3001/listings")
      .then(r => { if (!r.ok) throw new Error("Server error"); return r.json(); })
      .then(liveData => {
        if (!Array.isArray(liveData) || liveData.length === 0) throw new Error("Empty response");
        setItems(prev => {
          // Merge live prices/qty/watchers/sold into existing items, preserve checked state
          const liveMap = Object.fromEntries(liveData.map(l => [l.itemId, l]));
          // Build fresh from live data, re-apply checked state from prev
          const prevMap = Object.fromEntries(prev.map(i => [i.itemId, i]));
          return liveData.map(l => ({
            ...buildItem(l),
            checked:   prevMap[l.itemId]?.checked   ?? false,
            checkedAt: prevMap[l.itemId]?.checkedAt ?? null,
          }));
        });
        setApiStatus("live");
      })
      .catch(() => setApiStatus("error"));
  }, []);

  // Persist whenever items change (after initial load)
  useEffect(() => {
    if (!storageLoaded) return;
    persistState(items);
  }, [items, storageLoaded]);

  const copyToClipboard = (text, itemId) => {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }
    setCopiedId(itemId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleChecked = (e, itemId) => {
    e.stopPropagation();
    setItems(prev => prev.map(i =>
      i.itemId !== itemId ? i : {
        ...i,
        checked: !i.checked,
        checkedAt: !i.checked ? new Date() : null,
      }
    ));
    setExpanded(null);
  };

  const resetAllChecked = () => {
    setItems(prev => prev.map(i => ({ ...i, checked: false, checkedAt: null })));
    setShowResetConfirm(false);
  };

  const clearAllStorage = async () => {
    try { await window.storage.delete(STORAGE_KEY); } catch (_) {}
    setItems(ROSIANSELLS_LISTINGS.map(buildItem));
    setShowResetConfirm(false);
  };

  const filtered = useMemo(() => {
    let list = items.filter(i => !i.checked);
    if (search) list = list.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.itemId.includes(search));
    if (cat !== "All") list = list.filter(i => i.category === cat);
    return [...list].sort((a, b) =>
      sort === "price_desc" ? b.price - a.price :
      sort === "price_asc"  ? a.price - b.price :
      sort === "watchers"   ? b.watchers - a.watchers :
      a.title.localeCompare(b.title)
    );
  }, [items, search, cat, sort]);

  const checkedItems = useMemo(() =>
    [...items.filter(i => i.checked)].sort((a, b) =>
      (b.checkedAt || 0) - (a.checkedAt || 0)
    ), [items]);

  const stats = useMemo(() => ({
    total:    items.filter(i => !i.checked).length,
    checked:  items.filter(i => i.checked).length,
  }), [items]);

  if (!storageLoaded) {
    return (
      <div style={{ minHeight:"100vh",background:"#08080f",fontFamily:"'Courier New',monospace",color:"#d0d0e0",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12 }}>
        <span style={{ color:"#00ff9d",animation:"pulse 1s infinite",letterSpacing:3,fontSize:10 }}>LOADING SAVED STATE…</span>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh",background:"#08080f",fontFamily:"'Courier New',monospace",color:"#d0d0e0",fontSize:13 }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        .row{transition:background 0.15s;cursor:pointer}
        .row:hover{background:#12121e!important}
        .lnk{color:#3a3a6a;font-size:9px;letter-spacing:1px;text-decoration:none;padding:4px 9px;border:1px solid #1e1e30;display:inline-flex;align-items:center;gap:4px;transition:all 0.15s;white-space:nowrap;cursor:pointer}
        .lnk:hover{color:#8888cc;border-color:#3a3a5a;background:rgba(80,80,160,0.05)}
        .lnk.grn:hover{color:#00ff9d;border-color:#1a5a30;background:rgba(0,255,100,0.04)}
        .check-btn{background:none;border:1px solid #1a2a1a;color:#1a3a1a;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all 0.2s;flex-shrink:0;border-radius:2px}
        .check-btn:hover{border-color:#00ff9d;color:#00ff9d;background:rgba(0,255,157,0.08)}
        input,select{background:#0c0c18;border:1px solid #1e1e30;color:#d0d0e0;font-family:'Courier New',monospace;font-size:12px;padding:7px 11px;outline:none}
        input:focus,select:focus{border-color:#00ff9d}
        .tb{background:none;border:none;border-bottom:2px solid transparent;color:#444;font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;padding:12px 18px;cursor:pointer;text-transform:uppercase;transition:all 0.2s}
        .tb.on{color:#00ff9d;border-bottom-color:#00ff9d}
        .tb:hover:not(.on){color:#888}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#08080f}::-webkit-scrollbar-thumb{background:#1e1e30}
      `}</style>

      {/* Header */}
      <div style={{ borderBottom:"1px solid #141422",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",height:56 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ color:"#00ff9d",letterSpacing:4,fontSize:11,fontWeight:700 }}>PRICE SENTINEL</span>
          <span style={{ color:"#333" }}>·</span>
          <span style={{ color:"#555",fontSize:10,letterSpacing:1 }}>rosiansells</span>
          <span style={{ width:7,height:7,borderRadius:"50%",background:"#00ff9d",animation:"pulse 2s infinite",display:"inline-block",marginLeft:4 }}></span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <div style={{ color:"#2a2a40",fontSize:10,letterSpacing:1 }}>
            {stats.total} LISTINGS
          </div>
          {apiStatus === "loading" && (
            <div title="Fetching live data from eBay…" style={{ display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#555",letterSpacing:1 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:"#555",animation:"pulse 1s infinite",display:"inline-block" }}></span>
              SYNCING
            </div>
          )}
          {apiStatus === "live" && (
            <div title="Live data from eBay API" style={{ display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#00ff9d",letterSpacing:1 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:"#00ff9d",animation:"pulse 2s infinite",display:"inline-block" }}></span>
              LIVE
            </div>
          )}
          {apiStatus === "error" && (
            <div title="Could not reach local server — showing cached data" style={{ display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#ff4444",letterSpacing:1 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:"#ff4444",display:"inline-block" }}></span>
              OFFLINE
            </div>
          )}
          <div title="State auto-saved to browser storage" style={{ display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#1a3a1a",letterSpacing:1 }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:"#00ff9d",opacity:0.5,display:"inline-block" }}></span>
            SAVED
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom:"1px solid #141422",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex" }}>
          <button className={`tb ${tab==="dashboard"?"on":""}`} onClick={()=>setTab("dashboard")}>
            Dashboard {stats.total < 153 && <span style={{color:"#555",marginLeft:4}}>({stats.total})</span>}
          </button>
          <button className={`tb ${tab==="checked"?"on":""}`} onClick={()=>setTab("checked")} style={{position:"relative"}}>
            Checked
            {stats.checked > 0 && <span style={{background:"#00ff9d",color:"#0a0a0f",fontSize:9,padding:"1px 6px",borderRadius:10,marginLeft:6,fontWeight:700}}>{stats.checked}</span>}
          </button>
        </div>
        {stats.checked > 0 && (
          <div style={{ paddingRight:4 }}>
            {showResetConfirm ? (
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:10,color:"#666",letterSpacing:1 }}>RESET CHECKED?</span>
                <button onClick={resetAllChecked}
                  style={{ background:"#ff4d6d",color:"#fff",border:"none",padding:"5px 12px",fontFamily:"'Courier New',monospace",fontSize:10,fontWeight:700,cursor:"pointer",letterSpacing:1 }}>
                  CHECKED ONLY
                </button>
                <button onClick={clearAllStorage}
                  style={{ background:"none",border:"1px solid #5a2020",color:"#9a4040",padding:"5px 10px",fontFamily:"'Courier New',monospace",fontSize:10,cursor:"pointer",letterSpacing:1 }}
                  title="Wipes all checked state">
                  ALL DATA
                </button>
                <button onClick={()=>setShowResetConfirm(false)}
                  style={{ background:"none",border:"1px solid #222",color:"#555",padding:"5px 10px",fontFamily:"'Courier New',monospace",fontSize:10,cursor:"pointer" }}>
                  NO
                </button>
              </div>
            ) : (
              <button onClick={()=>setShowResetConfirm(true)}
                style={{ background:"none",border:"1px solid #1e1e30",color:"#444",padding:"6px 14px",fontFamily:"'Courier New',monospace",fontSize:10,cursor:"pointer",letterSpacing:1,transition:"all 0.15s" }}
                onMouseOver={e=>{e.target.style.borderColor="#ff4d6d";e.target.style.color="#ff4d6d"}}
                onMouseOut={e=>{e.target.style.borderColor="#1e1e30";e.target.style.color="#444"}}>
                ↺ RESET DAY
              </button>
            )}
          </div>
        )}
      </div>

      <div style={{ padding:"20px 28px" }}>

        {tab==="dashboard" && <>
          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20 }}>
            {[
              {v:stats.total,   l:"REMAINING",    c:"#d0d0e0"},
              {v:stats.checked, l:"CHECKED TODAY", c:"#00ff9d"},
            ].map(s=>(
              <div key={s.l} style={{ background:"#0e0e1a",border:"1px solid #1a1a2a",padding:"14px 18px",animation:"fi 0.4s ease" }}>
                <div style={{ fontSize:26,fontWeight:700,color:s.c,letterSpacing:-1 }}>{s.v}</div>
                <div style={{ fontSize:9,color:"#333",letterSpacing:2,marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display:"flex",gap:8,marginBottom:12,flexWrap:"wrap" }}>
            <input placeholder="Search title or item ID..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,minWidth:180 }} />
            <select value={cat} onChange={e=>setCat(e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select>
            <select value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="price_desc">Price ↓</option>
              <option value="price_asc">Price ↑</option>
              <option value="watchers">Watchers</option>
              <option value="title">Title A-Z</option>
            </select>
            <div style={{ color:"#2a2a40",fontSize:10,display:"flex",alignItems:"center",padding:"0 6px" }}>{filtered.length} results</div>
          </div>

          {/* Column headers */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 82px 56px 44px 56px",gap:8,padding:"5px 14px",borderBottom:"1px solid #101020",marginBottom:1 }}>
            {["TITLE","PRICE","WATCH","QTY",""].map(h=>(
              <div key={h} style={{ fontSize:9,color:"#2a2a40",letterSpacing:2 }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          <div style={{ maxHeight:"calc(100vh - 300px)",overflowY:"auto" }}>
            {filtered.map(item => {
              const isExp = expanded === item.itemId;
              return (
                <div key={item.itemId} style={{ animation:"fi 0.3s ease" }}>
                  <div className="row" onClick={()=>setExpanded(isExp?null:item.itemId)}
                    style={{ display:"grid",gridTemplateColumns:"1fr 82px 56px 44px 56px",gap:8,padding:"9px 14px",borderBottom:"1px solid #0d0d1a",alignItems:"start" }}>
                    <div>
                      <div style={{ color:"#bbbbd0",fontSize:12,wordBreak:"break-word" }}>{item.title}</div>
                      <div style={{ fontSize:9,color:"#202038",marginTop:1 }}>{item.itemId}</div>
                    </div>
                    <div style={{ color:"#d0d0e0",fontWeight:700,paddingTop:2 }}>${item.price.toFixed(2)}</div>
                    <div style={{ color:"#444",paddingTop:2 }}>{item.watchers>0?<span style={{ color:item.watchers>5?"#ffd60a":"#666" }}>👁 {item.watchers}</span>:"—"}</div>
                    <div style={{ color:"#333",paddingTop:2 }}>×{item.qty}</div>
                    <div style={{ display:"flex",gap:4,justifyContent:"flex-end" }} onClick={e=>e.stopPropagation()}>
                      <button className="check-btn" title="Mark as checked"
                        onClick={e=>toggleChecked(e,item.itemId)}>
                        ✓
                      </button>
                    </div>
                  </div>

                  {/* Expanded panel */}
                  {isExp && (
                    <div style={{ background:"#0b0b16",borderBottom:"1px solid #141422",padding:"14px 26px 16px",animation:"fi 0.2s ease" }}>
                      <div style={{ display:"flex",gap:8,flexWrap:"wrap",alignItems:"center" }}>
                        <a href={ebaySearchUrl(item.title)} target="_blank" rel="noopener noreferrer" className="lnk">
                          🔍 SEARCH EBAY
                        </a>
                        <a href={ebayItemUrl(item.itemId)} target="_blank" rel="noopener noreferrer" className="lnk grn">
                          📦 YOUR LISTING
                        </a>
                        <a href={ebayEditUrl(item.itemId)} target="_blank" rel="noopener noreferrer" className="lnk grn">
                          ✏ EDIT LISTING
                        </a>
                        <button className="lnk" onClick={e=>{e.stopPropagation();copyToClipboard(item.title, item.itemId);}}>
                          {copiedId===item.itemId ? "✓ COPIED" : "⎘ COPY TITLE"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>}

        {tab==="checked" && (
          <div>
            {checkedItems.length === 0 ? (
              <div style={{ textAlign:"center",padding:"80px 0",color:"#1a1a2a" }}>
                <div style={{ fontSize:30,marginBottom:12 }}>✓</div>
                <div style={{ fontSize:10,letterSpacing:3 }}>NOTHING CHECKED YET</div>
                <div style={{ fontSize:10,marginTop:8,color:"#1a1a2a" }}>Hit ✓ on any listing to mark it as reviewed for the day</div>
              </div>
            ) : (
              <>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                  <div style={{ fontSize:10,color:"#2a4a2a",letterSpacing:2 }}>
                    {checkedItems.length} / 151 CHECKED · {151 - checkedItems.length} REMAINING
                  </div>
                  <div style={{ flex:1,margin:"0 20px",height:3,background:"#111",borderRadius:2 }}>
                    <div style={{ width:`${(checkedItems.length/151)*100}%`,height:"100%",background:"#00ff9d",borderRadius:2,transition:"width 0.4s ease" }}></div>
                  </div>
                  <div style={{ fontSize:10,color:"#2a4a2a",letterSpacing:1 }}>
                    {Math.round((checkedItems.length/151)*100)}%
                  </div>
                </div>

                {/* Column headers */}
                <div style={{ display:"grid",gridTemplateColumns:"1fr 82px 80px 60px",gap:8,padding:"5px 14px",borderBottom:"1px solid #101020",marginBottom:1 }}>
                  {["TITLE","PRICE","CHECKED AT",""].map(h=>(
                    <div key={h} style={{ fontSize:9,color:"#2a2a40",letterSpacing:2 }}>{h}</div>
                  ))}
                </div>

                <div style={{ maxHeight:"calc(100vh - 260px)",overflowY:"auto" }}>
                  {checkedItems.map(item => (
                    <div key={item.itemId}
                      style={{ display:"grid",gridTemplateColumns:"1fr 82px 80px 60px",gap:8,padding:"8px 14px",borderBottom:"1px solid #0a0a12",alignItems:"start",opacity:0.7 }}>
                      <div>
                        <div style={{ color:"#888",fontSize:12,textDecoration:"line-through",textDecorationColor:"#2a2a2a",wordBreak:"break-word" }}>{item.title}</div>
                        <div style={{ fontSize:9,color:"#1a1a28",marginTop:1 }}>{item.itemId}</div>
                      </div>
                      <div style={{ color:"#666",fontWeight:700,paddingTop:2 }}>${item.price.toFixed(2)}</div>
                      <div style={{ fontSize:9,color:"#2a3a2a",letterSpacing:0.5,paddingTop:3 }}>
                        {item.checkedAt ? item.checkedAt.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) : "—"}
                      </div>
                      <div style={{ display:"flex",justifyContent:"flex-end" }}>
                        <button title="Uncheck — move back to dashboard"
                          onClick={e=>toggleChecked(e,item.itemId)}
                          style={{ background:"none",border:"1px solid #1a2a1a",color:"#2a4a2a",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:11,transition:"all 0.15s",borderRadius:2 }}
                          onMouseOver={e=>{e.currentTarget.style.borderColor="#ff4d6d";e.currentTarget.style.color="#ff4d6d"}}
                          onMouseOut={e=>{e.currentTarget.style.borderColor="#1a2a1a";e.currentTarget.style.color="#2a4a2a"}}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div style={{ marginTop:20,paddingTop:12,borderTop:"1px solid #0d0d1a",display:"flex",justifyContent:"space-between" }}>
          <div style={{ fontSize:9,color:"#181828",letterSpacing:1 }}>151 LISTINGS · rosiansells · MAR 12 2026</div>
        </div>
      </div>
    </div>
  );
}
