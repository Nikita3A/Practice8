const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

(async () => {
    const doc = new PDFDocument();
    const browser = await puppeteer.launch(/* { headless: false } */);
    const page = await browser.newPage();
    await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });

    const searchHandle = await page.$('input');
    await searchHandle.type('pdf');
    await searchHandle.press('Enter');

    await page.screenshot({ path: 'imgPDF.png' });

    await doc.pipe(fs.createWriteStream('page.pdf'));

    await doc.image('./imgPDF.png', {
        fit: [500, 400],
        align: 'center',
        valign: 'center',
    });

    await doc.end();
    await fs.unlink(
        './imgPDF.png',
        (err) => {
            if (err) throw err;
            console.log('imgPDF.png was deleted');
        },
    );
    await browser.close();
})();
