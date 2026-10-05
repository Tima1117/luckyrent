export type Lang = "en" | "ru" | "ka";
export type Text = Record<Lang, string>;
const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

export type CarClass = "suv" | "sedan" | "premium";
export type Car = {
  id: string;
  name: string;
  cls: CarClass;
  photo: string;
  drive: Text;
  gearbox: Text;
  seats: number;
  fuel: Text;
  price: number;
  tag?: Text;
};

const awd = t("AWD", "Полный привод", "სრული წამყვანი");
const fwd = t("FWD", "Передний привод", "წინა წამყვანი");
const rwd = t("RWD", "Задний привод", "უკანა წამყვანი");
const auto = t("Automatic", "Автомат", "ავტომატი");
const petrol = t("Petrol", "Бензин", "ბენზინი");

export const fleet: Car[] = [
  { id: "x1", name: "BMW X1", cls: "suv", photo: "/images/car-bmw-x1.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 70, tag: t("Guests' favourite", "Любимец гостей", "სტუმრების რჩეული") },
  { id: "forester", name: "Subaru Forester", cls: "suv", photo: "/images/car-forester.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 55, tag: t("For the mountains", "Для гор", "მთებისთვის") },
  { id: "compass", name: "Jeep Compass", cls: "suv", photo: "/images/car-compass.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 60 },
  { id: "outlander", name: "Mitsubishi Outlander", cls: "suv", photo: "/images/car-outlander.webp", drive: awd, gearbox: auto, seats: 7, fuel: petrol, price: 65, tag: t("7 seats", "7 мест", "7 ადგილი") },
  { id: "escape", name: "Ford Escape", cls: "suv", photo: "/images/car-escape.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 45 },
  { id: "bmw3", name: "BMW 3 Series", cls: "sedan", photo: "/images/car-bmw-3.webp", drive: rwd, gearbox: auto, seats: 5, fuel: petrol, price: 75 },
  { id: "sonata", name: "Hyundai Sonata", cls: "sedan", photo: "/images/car-sonata.webp", drive: fwd, gearbox: auto, seats: 5, fuel: petrol, price: 50 },
  { id: "ccoupe", name: "Mercedes-Benz C-Class Coupé", cls: "premium", photo: "/images/car-c-coupe.webp", drive: rwd, gearbox: auto, seats: 4, fuel: petrol, price: 90, tag: t("Premium", "Премиум", "პრემიუმი") },
];

export const classes: { id: CarClass | "all"; label: Text }[] = [
  { id: "all", label: t("All cars", "Все машины", "ყველა") },
  { id: "suv", label: t("SUV & 4x4", "Кроссоверы 4x4", "ჯიპები 4x4") },
  { id: "sedan", label: t("Sedans", "Седаны", "სედანები") },
  { id: "premium", label: t("Premium", "Премиум", "პრემიუმი") },
];

export const gallery = [
  { src: "/images/g-x1-palms.webp", cap: t("BMW X1 on the boulevard", "BMW X1 на бульваре", "BMW X1 ბულვარზე"), cls: "" },
  { src: "/images/g-bmw-rear.webp", cap: t("Delivered to your hotel", "Подача к отелю", "მიწოდება სასტუმროსთან"), cls: "wide" },
  { src: "/images/ig-forester.webp", cap: t("Subaru Forester", "Subaru Forester", "Subaru Forester"), cls: "" },
  { src: "/images/g-coupe-city.webp", cap: t("C-Class Coupé in the city", "C-Class Coupé в городе", "C-Class Coupé ქალაქში"), cls: "" },
  { src: "/images/ig-waterfall.webp", cap: t("Makhuntseti — 40 min from Batumi", "Махунцети — 40 минут от Батуми", "მახუნცეთი — 40 წუთი ბათუმიდან"), cls: "" },
  { src: "/images/g-compass-interior.webp", cap: t("Jeep Compass interior", "Салон Jeep Compass", "Jeep Compass-ის სალონი"), cls: "" },
  { src: "/images/car-sonata.webp", cap: t("Hyundai Sonata", "Hyundai Sonata", "Hyundai Sonata"), cls: "" },
  { src: "/images/ig-interior.webp", cap: t("Clean cabin, every time", "Чистый салон, всегда", "სუფთა სალონი, ყოველთვის"), cls: "wide" },
  { src: "/images/car-outlander.webp", cap: t("Outlander — 7 seats", "Outlander — 7 мест", "Outlander — 7 ადგილი"), cls: "" },
];
