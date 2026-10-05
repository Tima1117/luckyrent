import type { Text } from "./fleet-data";

export type Review = { author: string; date: Text; stars: number; text: Text };

const w2: Text = { en: "2 weeks ago", ru: "2 недели назад", ka: "2 კვირის წინ" };
const w3: Text = { en: "3 weeks ago", ru: "3 недели назад", ka: "3 კვირის წინ" };
const m1: Text = { en: "a month ago", ru: "месяц назад", ka: "ერთი თვის წინ" };
const m2: Text = { en: "2 months ago", ru: "2 месяца назад", ka: "2 თვის წინ" };

export const reviews: Review[] = [
  {
    author: "Roman", date: m2, stars: 5,
    text: {
      en: "I highly recommend this rental company! We decided on Friday to rent a car for Saturday. The guys quickly sent us options and found a car that fit our budget, and prepared the documents in advance. It's convenient that you don't have to worry about deposits or additional insurance.",
      ru: "Очень рекомендую этот прокат! В пятницу решили взять машину на субботу. Ребята быстро прислали варианты, подобрали машину под наш бюджет и заранее подготовили документы. Удобно, что не нужно думать о залоге и дополнительной страховке.",
      ka: "ძალიან გირჩევთ ამ გაქირავებას! პარასკევს გადავწყვიტეთ შაბათისთვის მანქანის აღება. ბიჭებმა სწრაფად გამოგვიგზავნეს ვარიანტები, შეარჩიეს მანქანა ჩვენი ბიუჯეტისთვის და წინასწარ მოამზადეს დოკუმენტები. მოსახერხებელია, რომ დეპოზიტსა და დამატებით დაზღვევაზე ფიქრი არ გჭირდება.",
    },
  },
  {
    author: "Дмитрий Чекмарев", date: m2, stars: 5,
    text: {
      en: "We vacationed in Batumi in July and rented a BMW X1. Everything went well, the car was in good condition, no extra costs or hidden conditions, and we communicated on Instagram. The car was delivered to the hotel and picked up from there!",
      ru: "Отдыхали в Батуми в июле, брали BMW X1. Всё прошло отлично: машина в хорошем состоянии, без доплат и скрытых условий, общались в Instagram. Машину подали к отелю и там же забрали!",
      ka: "ივლისში ბათუმში ვისვენებდით და BMW X1 ვიქირავეთ. ყველაფერი კარგად ჩაიარა: მანქანა კარგ მდგომარეობაში, არანაირი დამატებითი ხარჯი და ფარული პირობა, Instagram-ით ვურთიერთობდით. მანქანა სასტუმროსთან მოგვიყვანეს და იქვე წაიყვანეს!",
    },
  },
  {
    author: "Алиса Кислая", date: m2, stars: 5,
    text: {
      en: "We rented a Subaru Legacy for a couple of days. It's a great car for trips to sandy beaches and the mountains. They delivered it to my house, everything was clean and well-maintained. The price was reasonable compared to the competition. Highly recommend!",
      ru: "Брали Subaru Legacy на пару дней. Отличная машина для поездок на песчаные пляжи и в горы. Подали прямо к дому, всё чистое и ухоженное. Цена адекватная по сравнению с конкурентами. Очень рекомендуем!",
      ka: "Subaru Legacy რამდენიმე დღით ვიქირავეთ. შესანიშნავი მანქანაა ქვიშიან სანაპიროებსა და მთებში წასასვლელად. სახლთან მოგვიყვანეს, ყველაფერი სუფთა და მოვლილი იყო. ფასი კონკურენტებთან შედარებით გონივრული. ძალიან გირჩევთ!",
    },
  },
  {
    author: "Еleventh June", date: m2, stars: 5,
    text: {
      en: "Very happy with the service! We rented a Mercedes coupé. The car was delivered on time, clean and in good condition, and the service was excellent. We'll definitely be back for a bigger car when we plan our trip around Georgia!",
      ru: "Очень довольны сервисом! Брали купе Mercedes. Машину подали вовремя, чистую и в хорошем состоянии, обслуживание отличное. Обязательно вернёмся за машиной побольше, когда поедем по Грузии!",
      ka: "სერვისით ძალიან კმაყოფილი ვართ! Mercedes-ის კუპე ვიქირავეთ. მანქანა დროულად, სუფთა და კარგ მდგომარეობაში მოგვიყვანეს, მომსახურება შესანიშნავი იყო. აუცილებლად დავბრუნდებით უფრო დიდი მანქანისთვის, როცა საქართველოში მოგზაურობას დავგეგმავთ!",
    },
  },
  {
    author: "Оковита Вера", date: w2, stars: 5,
    text: {
      en: "We rented an all-wheel-drive car for 11 days at a very reasonable price. The guys were always in touch and responded quickly. For an additional fee we could leave the car at Kutaisi Airport, which was very convenient.",
      ru: "Брали полноприводную машину на 11 дней по очень разумной цене. Ребята всегда на связи, отвечают быстро. За доплату можно было оставить машину в аэропорту Кутаиси — очень удобно.",
      ka: "11 დღით სრულწამყვანიანი მანქანა ვიქირავეთ ძალიან გონივრულ ფასად. ბიჭები ყოველთვის კავშირზე იყვნენ და სწრაფად პასუხობდნენ. დამატებითი საფასურით მანქანის ქუთაისის აეროპორტში დატოვება შეიძლებოდა — ძალიან მოსახერხებელია.",
    },
  },
  {
    author: "Артём Каркавцев", date: w3, stars: 5,
    text: {
      en: "We rented a Subaru Outback. The car was in good condition, the price was lower than at other rentals and there was no deposit. The car was delivered to our address. Very good service.",
      ru: "Брали Subaru Outback. Машина в хорошем состоянии, цена ниже, чем в других прокатах, и без залога. Подали по адресу. Очень хороший сервис.",
      ka: "Subaru Outback ვიქირავეთ. მანქანა კარგ მდგომარეობაში, ფასი სხვა გაქირავებებზე დაბალი და დეპოზიტის გარეშე. მანქანა მისამართზე მოგვიყვანეს. ძალიან კარგი სერვისი.",
    },
  },
  {
    author: "Busel", date: m2, stars: 5,
    text: {
      en: "We rented a Jeep Compass. It was a clean, well-maintained car at a reasonable price, and we really liked that there was water in the cabin.",
      ru: "Брали Jeep Compass. Чистая, ухоженная машина по разумной цене, и очень понравилось, что в салоне была вода.",
      ka: "Jeep Compass ვიქირავეთ. სუფთა, მოვლილი მანქანა გონივრულ ფასად, და ძალიან მოგვეწონა, რომ სალონში წყალი იყო.",
    },
  },
  {
    author: "Irina", date: m1, stars: 5,
    text: {
      en: "Excellent rental experience, we took a car for four days. We needed a good car, unlimited mileage and full comprehensive insurance — and we got everything. The car was in good condition and clean.",
      ru: "Отличный опыт аренды, брали машину на четыре дня. Нужна была хорошая машина, без ограничения пробега и с полным КАСКО — всё получили. Машина в хорошем состоянии, чистая.",
      ka: "შესანიშნავი გამოცდილება, მანქანა ოთხი დღით ავიღეთ. გვჭირდებოდა კარგი მანქანა, შეუზღუდავი გარბენი და სრული დაზღვევა — ყველაფერი მივიღეთ. მანქანა კარგ მდგომარეობაში და სუფთა იყო.",
    },
  },
  {
    author: "Арсен Юрко", date: w3, stars: 5,
    text: {
      en: "We rented an inexpensive Ford Escape for a trip to the mountains. Everything went perfectly — the car was delivered clean and in good condition, and we had no problems during the trip.",
      ru: "Брали недорогой Ford Escape для поездки в горы. Всё прошло идеально: машину подали чистой и в хорошем состоянии, в дороге никаких проблем.",
      ka: "მთებში წასასვლელად იაფი Ford Escape ვიქირავეთ. ყველაფერი იდეალურად ჩაიარა — მანქანა სუფთა და კარგ მდგომარეობაში მოგვიყვანეს, გზაში არანაირი პრობლემა არ გვქონია.",
    },
  },
  {
    author: "Maksim Chumakov", date: w2, stars: 5,
    text: {
      en: "We rented a BMW 3 Series and were happy with both the service and the car. We had 24/7 support.",
      ru: "Брали BMW 3 серии, довольны и сервисом, и машиной. Поддержка на связи 24/7.",
      ka: "BMW 3 სერია ვიქირავეთ და კმაყოფილი დავრჩით როგორც სერვისით, ისე მანქანით. მხარდაჭერა 24/7 გვქონდა.",
    },
  },
  {
    author: "Андрей Журавлев", date: m2, stars: 5,
    text: {
      en: "Excellent car rental service. I rented a car within one day, they delivered it to my destination, and there was a wide selection to choose from. They recommended a Sonata and it was spot on!",
      ru: "Отличный прокат. Оформил машину за один день, подали в нужное место, выбор большой. Посоветовали Sonata — и попали в точку!",
      ka: "შესანიშნავი გაქირავება. მანქანა ერთ დღეში ავიღე, დანიშნულების ადგილზე მოგვიყვანეს, არჩევანი დიდი იყო. Sonata გვირჩიეს და ზუსტად მოგვარგეს!",
    },
  },
  {
    author: "Lena Kot", date: m2, stars: 5,
    text: {
      en: "I rented a Mercedes from these guys. They had the best prices in Batumi. They delivered it quickly, the car was clean and the interior smelled nice. I recommend them!",
      ru: "Брала у ребят Mercedes. Лучшие цены в Батуми. Подали быстро, машина чистая, в салоне приятно пахнет. Рекомендую!",
      ka: "ამ ბიჭებისგან Mercedes ვიქირავე. ბათუმში საუკეთესო ფასები ჰქონდათ. სწრაფად მოიყვანეს, მანქანა სუფთა იყო და სალონში სასიამოვნო სუნი იდგა. გირჩევთ!",
    },
  },
];
