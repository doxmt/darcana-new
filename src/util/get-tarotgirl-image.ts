import tarotgirl0 from "../assets/tarotgirl/TarotGirl0.webp";
import tarotgirl1 from "../assets/tarotgirl/TarotGirl1.webp";
import tarotgirl2 from "../assets/tarotgirl/TarotGirl2.webp";

const tarotgirls = [tarotgirl0, tarotgirl1, tarotgirl2];

export function getTarotgirlImage(id: number) {
  return tarotgirls[id];
}
