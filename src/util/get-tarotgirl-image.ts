import tarotgirl0 from "../assets/TarotGirl0.png";
import tarotgirl1 from "../assets/TarotGirl1.png";
import tarotgirl2 from "../assets/TarotGirl2.png";

const tarotgirls = [tarotgirl0, tarotgirl1, tarotgirl2];

export function getTarotgirlImage(id: number) {
  return tarotgirls[id];
}
