import { chromium } from 'playwright'
const base = 'http://localhost:5173'
const outDir = process.argv[2]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 430, height: 932 } })
page.on('console', (msg) => { if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text()) })
page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message))

await page.goto(`${base}/onboarding`, { waitUntil: 'load' })
await page.waitForSelector('text=Continue as guest')
await page.click('text=Continue as guest')
await page.waitForURL('**/app')
await page.waitForTimeout(400)

await page.click('nav[class*="fixed"] a[aria-label="Bible"]')
await page.waitForSelector('text=Old Testament')
await page.waitForTimeout(400)
await page.screenshot({ path: `${outDir}/bible-books-fixed.png` })

await page.click('text=Genesis')
await page.waitForSelector('text=CHAPTERS')
await page.waitForTimeout(300)
await page.screenshot({ path: `${outDir}/chapter-picker-fixed.png` })

await page.click('text=Exodus')
await page.waitForSelector('text=40 CHAPTERS')
await page.waitForTimeout(300)
await page.screenshot({ path: `${outDir}/chapter-picker-switched.png` })

console.log('done')
await browser.close()
