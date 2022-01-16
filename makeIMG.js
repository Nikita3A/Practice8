const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });
    const bar = await page.$('body > toolbar-component:nth-child(4)');
    await bar.evaluate((el) => {
        const barStyle = el;
        barStyle.style.background = '#1F54C0';
        return barStyle.style.background;
    });
    await page.screenshot({ path: 'img.png' });
    await browser.close();
})();
