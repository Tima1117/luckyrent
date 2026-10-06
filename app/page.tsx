"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { fleet, classes, gallery, type Lang, type Text, type CarClass } from "./fleet-data";
import { reviews } from "./reviews-data";
import { WhySection, type WhyCopy } from "./why-section";
import type { HeroCopy } from "./hero-3d";

const Hero3D = dynamic(() => import("./hero-3d").then(m => m.Hero3D), { ssr: false, loading: () => <div className="h3d-skeleton" /> });

const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

const phone = "+995555562877";
const phonePretty = "+995 555 56 28 77";
const waBase = "https://wa.me/995555562877";
const instagram = "https://www.instagram.com/lucky_rentalcar/";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=LUCKY+RENT+Batumi&query_place_id=ChIJSUbyBNaHZ0ARw67OiWrl1TY";
const reviewsUrl = "https://www.google.com/maps/place/LUCKY+RENT/data=!4m7!3m6!1s0x406787d604f24649:0x36d5e56a89ceaec3!8m2!3d41.6369941!4d41.6208419!16s%2Fg%2F11zcy43tmq!19sChIJSUbyBNaHZ0ARw67OiWrl1TY";
const mapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=41.6128%2C41.6330%2C41.6288%2C41.6410&layer=mapnik&marker=41.6370%2C41.6208";

const copy = {
  en: {
    nav: ["Fleet", "Why us", "Reviews", "Gallery", "Contacts"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "CAR RENTAL · BATUMI · 24/7",
      words: ["LUCKY", "RENT"],
      headline: <>No deposit.<br /><em>Full insurance.</em><br />Delivered to you.</>,
      sub: "BMW, Mercedes, Subaru and Jeep for Batumi, the beaches and the mountain roads — with full CASCO and no deposit, brought to your hotel or the airport.",
      rating: "5.0 · 70 Google reviews",
      primary: { label: "Choose a car", href: "#fleet" },
      secondary: { label: "Write on WhatsApp", href: waBase },
      hint: "Scroll to turn the car",
      callouts: ["No deposit", "Full CASCO insurance", "Delivery 24/7"],
      colors: ["Black", "Silver", "Midnight blue"],
      loading: "Loading",
    } as HeroCopy,
    facts: [["No deposit", "Really none — guests mention it in every review"], ["Full CASCO", "Comprehensive insurance included"], ["Delivery", "Hotel, apartment, Batumi or Kutaisi airport"], ["24/7 in touch", "WhatsApp, Instagram, phone"]],
    fleetEyebrow: "THE FLEET",
    fleetTitle: "Pick your car",
    fleetLede: "Premium BMW and Mercedes, all-wheel-drive Subaru and Jeep for the mountains, a 7-seater for the whole family.",
    perDay: "/ day",
    book: "Book",
    details: "Photo",
    fleetNote: "Prices are indicative and depend on season and rental length — the final price is confirmed in chat.",
    why: {
      eyebrow: "WHY LUCKY RENT", title: "Lucky from the first message",
      route: { title: "Delivered where you land", text: "Batumi airport, your hotel lobby or an apartment on the coast — we bring the car and collect it where it suits you. Drop-off at Kutaisi airport on request.", pins: ["Airport", "Hotel", "Kutaisi"] },
      tank: { title: "Full CASCO, zero deposit", text: "Every car is fully insured, so we don't hold a deposit — you pay for the days, nothing else." },
      docs: { title: "Paperwork in 5 minutes", items: ["Passport and driving licence", "Age 21+, 2 years of experience", "Contract and payment at handover: GEL, $, €, USDT or card"] },
      chat: { title: "Always in touch", msgs: ["Hi! Is the BMW X1 free this weekend?", "Yes — we'll bring it to your hotel on Friday at 10:00, no deposit.", "Perfect, booking it!"] },
      stats: [[5.0, "", "Google rating"], [70, "", "reviews"], [98, "%", "five-star reviews"]],
      cta: { title: "Ready to go?", text: "Tell us the dates and where to bring the car — we answer within minutes.", btn: "Write on WhatsApp", href: waBase },
    } as WhyCopy,
    revEyebrow: "REVIEWS",
    revTitle: "What guests say",
    revLede: "Real reviews from Google Maps.",
    revMore: "Show more",
    revGoogle: "All 70 reviews on Google",
    galEyebrow: "ON THE ROAD",
    galTitle: "Our cars in Batumi",
    galLede: "The boulevard, Makhuntseti waterfalls, the road to the mountains — photos from the fleet and our guests.",
    conEyebrow: "CONTACTS",
    conTitle: "Book in two minutes",
    addrLabel: "Office", addr: "16 Julia Shartava St, Batumi",
    phoneLabel: "Phone", hoursLabel: "Hours", hours: "Daily 8:00 – 23:00 · online 24/7",
    directions: "Directions",
    call: "Call",
    bookTitle: "Request a car",
    bookText: "Fill in the dates — the request opens in WhatsApp and we confirm availability and the price in the chat.",
    fName: "Your name", fCar: "Car", fFrom: "Pick-up date", fTo: "Return date", fAny: "Any car — advise me",
    send: "Send via WhatsApp",
    bookNote: "No prepayment and no deposit. The booking is confirmed by our reply in WhatsApp.",
    waMsg: (car: string, from: string, to: string, name: string) => `Hello LUCKY RENT! I'd like to rent ${car} from ${from || "…"} to ${to || "…"}. My name is ${name || "…"}.`,
    waCar: (car: string) => `Hello LUCKY RENT! I'm interested in ${car}. Is it available?`,
    foot: "A concept redesign for LUCKY RENT · Batumi",
    model: "3D model: Mercedes-Benz C63 S AMG Coupé by Ddiaz Design, Sketchfab (CC BY-NC-SA)",
    photo: "Photo",
  },
  ru: {
    nav: ["Автопарк", "Почему мы", "Отзывы", "Галерея", "Контакты"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "ПРОКАТ АВТО · БАТУМИ · 24/7",
      words: ["LUCKY", "RENT"],
      headline: <>Без залога.<br /><em>Полное КАСКО.</em><br />Подача к двери.</>,
      sub: "BMW, Mercedes, Subaru и Jeep для Батуми, пляжей и горных дорог — с полным КАСКО и без залога, с подачей в отель или аэропорт.",
      rating: "5.0 · 70 отзывов в Google",
      primary: { label: "Выбрать машину", href: "#fleet" },
      secondary: { label: "Написать в WhatsApp", href: waBase },
      hint: "Листайте — машина повернётся",
      callouts: ["Без залога", "Полное КАСКО", "Подача 24/7"],
      colors: ["Чёрный", "Серебро", "Полночный синий"],
      loading: "Загрузка",
    } as HeroCopy,
    facts: [["Без залога", "Правда без — гости пишут об этом в каждом отзыве"], ["Полное КАСКО", "Страховка включена в цену"], ["Подача", "Отель, квартира, аэропорт Батуми или Кутаиси"], ["На связи 24/7", "WhatsApp, Instagram, телефон"]],
    fleetEyebrow: "АВТОПАРК",
    fleetTitle: "Выберите машину",
    fleetLede: "Премиальные BMW и Mercedes, полноприводные Subaru и Jeep для гор, семиместный для всей семьи.",
    perDay: "/ сутки",
    book: "Забронировать",
    details: "Фото",
    fleetNote: "Цены ориентировочные и зависят от сезона и срока аренды — итоговую стоимость подтверждаем в чате.",
    why: {
      eyebrow: "ПОЧЕМУ LUCKY RENT", title: "Везёт с первого сообщения",
      route: { title: "Подаём туда, где вы", text: "Аэропорт Батуми, лобби отеля или квартира у моря — привозим машину и забираем там, где вам удобно. По запросу — возврат в аэропорту Кутаиси.", pins: ["Аэропорт", "Отель", "Кутаиси"] },
      tank: { title: "Полное КАСКО, ноль залога", text: "Каждая машина застрахована полностью, поэтому залог мы не берём — вы платите только за дни." },
      docs: { title: "Оформление за 5 минут", items: ["Паспорт и водительские права", "Возраст от 21 года, стаж от 2 лет", "Договор и оплата при передаче: GEL, $, €, USDT или карта"] },
      chat: { title: "Всегда на связи", msgs: ["Здравствуйте! BMW X1 свободен на выходные?", "Да — подадим к отелю в пятницу в 10:00, без залога.", "Отлично, бронирую!"] },
      stats: [[5.0, "", "рейтинг Google"], [70, "", "отзывов"], [98, "%", "отзывов на 5 звёзд"]],
      cta: { title: "Едем?", text: "Напишите даты и куда подать машину — отвечаем в течение нескольких минут.", btn: "Написать в WhatsApp", href: waBase },
    } as WhyCopy,
    revEyebrow: "ОТЗЫВЫ",
    revTitle: "Что говорят гости",
    revLede: "Настоящие отзывы с Google Maps.",
    revMore: "Показать ещё",
    revGoogle: "Все 70 отзывов в Google",
    galEyebrow: "В ДОРОГЕ",
    galTitle: "Наши машины в Батуми",
    galLede: "Бульвар, водопад Махунцети, дорога в горы — фото из автопарка и от наших гостей.",
    conEyebrow: "КОНТАКТЫ",
    conTitle: "Бронь за две минуты",
    addrLabel: "Офис", addr: "ул. Юлии Шартава 16, Батуми",
    phoneLabel: "Телефон", hoursLabel: "Часы", hours: "Ежедневно 8:00 – 23:00 · онлайн 24/7",
    directions: "Маршрут",
    call: "Позвонить",
    bookTitle: "Заявка на машину",
    bookText: "Укажите даты — заявка откроется в WhatsApp, а наличие и цену подтвердим в чате.",
    fName: "Ваше имя", fCar: "Машина", fFrom: "Дата подачи", fTo: "Дата возврата", fAny: "Любая — посоветуйте",
    send: "Отправить в WhatsApp",
    bookNote: "Без предоплаты и без залога. Бронь подтверждается нашим ответом в WhatsApp.",
    waMsg: (car: string, from: string, to: string, name: string) => `Здравствуйте, LUCKY RENT! Хочу арендовать ${car} с ${from || "…"} по ${to || "…"}. Меня зовут ${name || "…"}.`,
    waCar: (car: string) => `Здравствуйте, LUCKY RENT! Интересует ${car}. Свободна ли машина?`,
    foot: "Демо-редизайн для LUCKY RENT · Батуми",
    model: "3D-модель: Mercedes-Benz C63 S AMG Coupé, Ddiaz Design, Sketchfab (CC BY-NC-SA)",
    photo: "Фото",
  },
  ka: {
    nav: ["ავტოპარკი", "რატომ ჩვენ", "შეფასებები", "გალერეა", "კონტაქტი"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "ავტოს გაქირავება · ბათუმი · 24/7",
      words: ["LUCKY", "RENT"],
      headline: <>დეპოზიტის გარეშე.<br /><em>სრული დაზღვევა.</em><br />მიწოდება კართან.</>,
      sub: "BMW, Mercedes, Subaru და Jeep ბათუმის, სანაპიროებისა და მთის გზებისთვის — სრული კასკოთი და დეპოზიტის გარეშე, მიწოდებით სასტუმროში ან აეროპორტში.",
      rating: "5.0 · 70 შეფასება Google-ზე",
      primary: { label: "მანქანის არჩევა", href: "#fleet" },
      secondary: { label: "მოწერა WhatsApp-ზე", href: waBase },
      hint: "ჩამოსქროლეთ — მანქანა შემობრუნდება",
      callouts: ["დეპოზიტის გარეშე", "სრული კასკო", "მიწოდება 24/7"],
      colors: ["შავი", "ვერცხლისფერი", "ღამის ლურჯი"],
      loading: "იტვირთება",
    } as HeroCopy,
    facts: [["დეპოზიტის გარეშე", "ნამდვილად — სტუმრები ყველა შეფასებაში წერენ"], ["სრული კასკო", "დაზღვევა ფასშია ჩართული"], ["მიწოდება", "სასტუმრო, ბინა, ბათუმის ან ქუთაისის აეროპორტი"], ["კავშირი 24/7", "WhatsApp, Instagram, ტელეფონი"]],
    fleetEyebrow: "ავტოპარკი",
    fleetTitle: "აირჩიეთ მანქანა",
    fleetLede: "პრემიუმ BMW და Mercedes, სრულწამყვანიანი Subaru და Jeep მთებისთვის, შვიდადგილიანი მთელი ოჯახისთვის.",
    perDay: "/ დღე",
    book: "დაჯავშნა",
    details: "ფოტო",
    fleetNote: "ფასები სავარაუდოა და დამოკიდებულია სეზონსა და ვადაზე — საბოლოო ფასს ჩატში ვადასტურებთ.",
    why: {
      eyebrow: "რატომ LUCKY RENT", title: "გაგიმართლებთ პირველი შეტყობინებიდან",
      route: { title: "მოგიტანთ იქ, სადაც ჩამოდიხართ", text: "ბათუმის აეროპორტი, სასტუმროს ლობი ან ბინა ზღვასთან — მანქანას მოგიყვანთ და წავიყვანთ იქიდან, სადაც გიხერხდებათ. მოთხოვნით — დაბრუნება ქუთაისის აეროპორტში.", pins: ["აეროპორტი", "სასტუმრო", "ქუთაისი"] },
      tank: { title: "სრული კასკო, ნულოვანი დეპოზიტი", text: "ყველა მანქანა სრულად დაზღვეულია, ამიტომ დეპოზიტს არ ვიღებთ — იხდით მხოლოდ დღეებში." },
      docs: { title: "გაფორმება 5 წუთში", items: ["პასპორტი და მართვის მოწმობა", "ასაკი 21+, გამოცდილება 2 წლიდან", "ხელშეკრულება და გადახდა გადაცემისას: GEL, $, €, USDT ან ბარათი"] },
      chat: { title: "ყოველთვის კავშირზე", msgs: ["გამარჯობა! BMW X1 თავისუფალია შაბათ-კვირას?", "დიახ — პარასკევს 10:00-ზე სასტუმროსთან მოგიყვანთ, დეპოზიტის გარეშე.", "შესანიშნავია, ვჯავშნი!"] },
      stats: [[5.0, "", "Google რეიტინგი"], [70, "", "შეფასება"], [98, "%", "ხუთვარსკვლავიანი შეფასება"]],
      cta: { title: "წავედით?", text: "მოგვწერეთ თარიღები და სად მოგიყვანოთ მანქანა — რამდენიმე წუთში გპასუხობთ.", btn: "მოწერა WhatsApp-ზე", href: waBase },
    } as WhyCopy,
    revEyebrow: "შეფასებები",
    revTitle: "რას ამბობენ სტუმრები",
    revLede: "ნამდვილი შეფასებები Google Maps-დან.",
    revMore: "მეტის ჩვენება",
    revGoogle: "ყველა 70 შეფასება Google-ზე",
    galEyebrow: "გზაში",
    galTitle: "ჩვენი მანქანები ბათუმში",
    galLede: "ბულვარი, მახუნცეთის ჩანჩქერი, გზა მთებისკენ — ფოტოები ავტოპარკიდან და ჩვენი სტუმრებისგან.",
    conEyebrow: "კონტაქტი",
    conTitle: "დაჯავშნა ორ წუთში",
    addrLabel: "ოფისი", addr: "იულია შარტავას ქ. 16, ბათუმი",
    phoneLabel: "ტელეფონი", hoursLabel: "საათები", hours: "ყოველდღე 8:00 – 23:00 · ონლაინ 24/7",
    directions: "მარშრუტი",
    call: "დარეკვა",
    bookTitle: "მანქანის მოთხოვნა",
    bookText: "მიუთითეთ თარიღები — მოთხოვნა გაიხსნება WhatsApp-ში, ხელმისაწვდომობასა და ფასს ჩატში დავადასტურებთ.",
    fName: "თქვენი სახელი", fCar: "მანქანა", fFrom: "აღების თარიღი", fTo: "დაბრუნების თარიღი", fAny: "ნებისმიერი — მირჩიეთ",
    send: "გაგზავნა WhatsApp-ით",
    bookNote: "წინასწარი გადახდისა და დეპოზიტის გარეშე. ჯავშანი დასტურდება ჩვენი პასუხით WhatsApp-ში.",
    waMsg: (car: string, from: string, to: string, name: string) => `გამარჯობა, LUCKY RENT! მინდა ვიქირაო ${car} ${from || "…"}-დან ${to || "…"}-მდე. მე მქვია ${name || "…"}.`,
    waCar: (car: string) => `გამარჯობა, LUCKY RENT! მაინტერესებს ${car}. თავისუფალია?`,
    foot: "კონცეპტუალური რედიზაინი LUCKY RENT-ისთვის · ბათუმი",
    model: "3D მოდელი: Mercedes-Benz C63 S AMG Coupé, Ddiaz Design, Sketchfab (CC BY-NC-SA)",
    photo: "ფოტო",
  },
};
type Copy = typeof copy["en"];

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;

const Ico = {
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
};

const Clover = () => (
  <svg viewBox="0 0 32 32" aria-hidden><g fill="currentColor"><circle cx="12" cy="11" r="5" /><circle cx="20" cy="11" r="5" /><circle cx="12" cy="19" r="5" /><circle cx="20" cy="19" r="5" /></g><path d="M16 15.5 L17.5 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><circle cx="16" cy="15" r="2" fill="var(--bg)" /></svg>
);

function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduce]);
  return null;
}

function Fleet({ lang, c, onPhoto }: { lang: Lang; c: Copy; onPhoto: (src: string) => void }) {
  const [cls, setCls] = useState<CarClass | "all">("all");
  const cars = cls === "all" ? fleet : fleet.filter(x => x.cls === cls);
  return (
    <section className="fleet" id="fleet">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.fleetEyebrow}</p><h2 className="section-title light">{c.fleetTitle}</h2></div>
          <p className="section-lede light">{c.fleetLede}</p>
        </div>
        <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
          {classes.map(k => <button key={k.id} role="tab" aria-selected={cls === k.id} className={`tab${cls === k.id ? " active" : ""}`} onClick={() => setCls(k.id)}>{k.label[lang]}</button>)}
        </div>
        <motion.div key={cls} className="cars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {cars.map((car, i) => (
            <motion.article key={car.id} className="car" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
              <button className="car-photo" onClick={() => onPhoto(car.photo)} aria-label={`${c.photo}: ${car.name}`}>
                {car.tag && <span className="car-tag">{car.tag[lang]}</span>}
                <Image src={car.photo} alt={car.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              </button>
              <div className="car-body">
                <div className="car-top">
                  <h3>{car.name}</h3>
                  <span className="car-price">${car.price}<small>{c.perDay}</small></span>
                </div>
                <div className="specs">
                  <span>{car.drive[lang]}</span><span>{car.gearbox[lang]}</span><span>{car.seats} 👤</span><span>{car.fuel[lang]}</span>
                </div>
                <div className="car-actions">
                  <a className="btn btn-wa" href={wa(c.waCar(car.name))} target="_blank" rel="noopener noreferrer">{Ico.wa}{c.book}</a>
                  <button className="btn btn-outline" onClick={() => onPhoto(car.photo)}>{c.details}</button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <p className="fleet-note">{c.fleetNote}</p>
      </div>
    </section>
  );
}

function Reviews({ lang, c }: { lang: Lang; c: Copy }) {
  const [n, setN] = useState(6);
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.revEyebrow}</p><h2 className="section-title light">{c.revTitle}</h2></div>
          <p className="section-lede light">{c.revLede}</p>
        </div>
        <div className="rev-grid">
          {reviews.slice(0, n).map((r, i) => (
            <motion.article key={r.author + i} className="rev" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
              <div className="rev-stars">{"★".repeat(r.stars)}</div>
              <p>{r.text[lang]}</p>
              <div className="rev-meta">
                <span className="rev-ava">{r.author.trim().charAt(0).toUpperCase()}</span>
                <div><b>{r.author}</b>{r.date[lang]} · Google</div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="rev-more">
          {n < reviews.length && <button className="btn btn-outline" onClick={() => setN(n + 6)}>{c.revMore}</button>}
          <a className="btn btn-accent" href={reviewsUrl} target="_blank" rel="noopener noreferrer">{c.revGoogle} ↗</a>
        </div>
      </div>
    </section>
  );
}

function Gallery({ lang, c, onPhoto }: { lang: Lang; c: Copy; onPhoto: (src: string) => void }) {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.galEyebrow}</p><h2 className="section-title light">{c.galTitle}</h2></div>
          <p className="section-lede light">{c.galLede}</p>
        </div>
        <div className="gal-grid">
          {gallery.map((g, i) => (
            <motion.button key={g.src} className={`gal-item ${g.cls}`} onClick={() => onPhoto(g.src)} whileHover={{ scale: 1.01 }} aria-label={`${c.photo} ${i + 1}`}>
              <Image src={g.src} alt={g.cap[lang]} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              <span className="gal-cap">{g.cap[lang]}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts({ c }: { c: Copy }) {
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const msg = c.waMsg(car || c.fAny, from, to, name);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow">{c.conEyebrow}</p>
            <h2 className="section-title light" style={{ marginBottom: 28 }}>{c.conTitle}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="strip-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><a href={`tel:${phone}`}>{phonePretty}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.ig}</span><div><b>Instagram</b><a href={instagram} target="_blank" rel="noopener noreferrer">@lucky_rentalcar</a></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-ghost" href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field full"><label htmlFor="f-car">{c.fCar}</label>
                <select id="f-car" value={car} onChange={e => setCar(e.target.value)}>
                  <option value="">{c.fAny}</option>
                  {fleet.map(x => <option key={x.id} value={x.name}>{x.name} — ${x.price}{c.perDay}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-from">{c.fFrom}</label><input id="f-from" type="date" value={from} onChange={e => setFrom(e.target.value)} /></div>
              <div className="field"><label htmlFor="f-to">{c.fTo}</label><input id="f-to" type="date" value={to} onChange={e => setTo(e.target.value)} min={from || undefined} /></div>
            </div>
            <button className="btn btn-wa" type="submit">{Ico.wa}{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="LUCKY RENT on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const c = copy[lang];
  const navIds = useMemo(() => ["fleet", "why", "reviews", "gallery", "contacts"], []);
  const factPhotos = ["/images/g-bmw-rear.webp", "/images/ig-terms.webp", "/images/g-x1-palms.webp", "/images/ig-interior.webp"];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <SmoothScroll />
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top"><i><Clover /></i>LUCKY<em>RENT</em></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}<span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top">
        <Hero3D c={c.hero} />

        <div className="strip">
          <div className="container strip-grid">
            {c.facts.map(([b, sub], i) => (
              <motion.div key={b} className="fact" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Image src={factPhotos[i]} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <div className="fact-shade" />
                <div className="fact-text"><b>{b}</b><span>{sub}</span></div>
              </motion.div>
            ))}
          </div>
        </div>

        <Fleet lang={lang} c={c} onPhoto={setLightbox} />
        <WhySection c={c.why} />
        <Reviews lang={lang} c={c} />
        <Gallery lang={lang} c={c} onPhoto={setLightbox} />
        <Contacts c={c} />
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand" href="#top"><i><Clover /></i>LUCKY<em>RENT</em></a>
          <span>{c.foot} · {c.model}</span>
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
