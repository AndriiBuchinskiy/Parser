const fs = require('fs');
const puppeteer = require('puppeteer');
const needle = require('needle');
let link = 'http://ipro.etm.ru/cat/catalog.html';


const parseNewsWebView = async click => {
  try{
    var cookies = {
            'session-id': '025501658318338179100292294820', // подставить реальный session-id
            '_ym_uid': '1595779084565117075', // подставить реальный ubid-main
        };

    work(cookies);
    function work(cookies){
    var options = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        cookies: cookies
    };
    let browser = await puppeteer.launch({headless: false, slowMo: 100, devtools: true});
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(link,{ waitUntil: 'domcontentloaded'});
    const selector = await page.$('div.headMenu2');

    await selector.click();
    await page.waitForSelector('div.mainTableP');
    let html = await page.evaluate(async () => {
      let res = [];
      let tr = await document.querySelectorAll('table#list_gds tbody tr');
      // console.log(tr.length);
      tr.forEach((td, i)=> {
        if(td && td.childNodes && td.childNodes.length !== 0){
          td.childNodes.forEach((t, j)=>{
           if(t && t.textContent && t.textContent !== ''){
             console.log(t.textContent);
           }
          })
          console.log(`${i}.`);
        }
      })
      // console.log(container);
      return res;
    })
  }
  catch(e){
    console.log(e);
  }
}
parseNewsWebView(0)
