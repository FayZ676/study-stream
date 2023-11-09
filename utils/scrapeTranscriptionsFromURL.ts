"use server";

const puppeteer = require("puppeteer");

export async function scrapeTranscriptions(url: String) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url);

    const transcriptList = await page.$(".transcript-list");
    if (transcriptList) {
      const transcriptItems = await transcriptList.$$("li");
      const transcriptJsonList = [];
      for (const item of transcriptItems) {
        const ariaLabel = await item.evaluate((el: HTMLElement) =>
          el.getAttribute("aria-label")
        );
        if (ariaLabel) {
          const parts = ariaLabel.split(", ");
          if (parts.length === 3) {
            const timestamp = parts[1];
            const message = parts[2];
            const transcriptJson = {
              timestamp,
              message,
            };
            transcriptJsonList.push(transcriptJson);
          }
        }
      }
      await browser.close();
      return transcriptJsonList;
    } else {
      console.log("Transcript list not found on the page");
      await browser.close();
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   page.setDefaultNavigationTimeout(60000);
//   await page.goto(
//     "https://minnstate.zoom.us/rec/play/_4rxoQOaGD-wGoADdphEx2xrr6mIL-03RBLOQVliLSfpCWnqaFw8ZsPH8S15GFf5ntMMhM-AkVvOWAxN.QqPr_5357BdzYEQ0?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fminnstate.zoom.us%2Frec%2Fshare%2FrC4xystmtS7JDVaooCAbPB02ERdEOejlUwp0FnMais6PN1cT6JdjSA3b9ALhIJsc.tA1t1VFZeRAaYE_Y"
//   );
//   const transcripts = await extractTranscriptsFromURL(page);
//   fs.writeFileSync("transcripts.json", JSON.stringify(transcripts, null, 2));
//   console.log("Transcripts exported to transcripts.json");
//   await browser.close();
// })();
