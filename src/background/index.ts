import { webRequest } from "webextension-polyfill";
import { hosts } from "../../hosts";

class Background {
  // _port: number;
  constructor() {
    this.init();
  }

  init = () => {
    webRequest.onBeforeRequest.addListener(
      (_details) => {
        return { cancel: true };
      },
      {
        urls: [...hosts],
      }
    );
  };
}

export const background = new Background();
