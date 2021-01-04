/**
 * Funkcionalni testi
 */
(async function EduGeoCache() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    // Parametri
    let aplikacijaUrl = "http://AlDente:3000/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require('axios').create({
        baseURL: "http://AlDente:3000/api",
        timeout: 5000
    });

    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(() => {
            return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
                return elementi[0];
            });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };

    try {

        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(new chrome.Options()
                    .addArguments("start-maximized")
                    .addArguments("disable-infobars")
                    .addArguments("allow-insecure-localhost")
                    .addArguments("allow-running-insecure-content")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        describe("Login page", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });
            it("login/register buttons", async () => {
                await pocakajStranNalozena(brskalnik, 10, '//h1');
                const button = await brskalnik.findElement(By.id('register-button'))
                expect(button).to.be.an('object');
            });

        });

        describe("Nadzorna plošča", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl + 'nadzorna_plosca');
            });
            it("Urnik", async () => {
                await pocakajStranNalozena(brskalnik, 10, '//h1');
                const povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'urnik')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            context("ustreznost podatkov na strani z urniki", function() {
                it("naslov strani urniki", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal("Urnik izmen");
                    });
                });
            });
            context("ustreznost podatkov na strani z rezervacijami", function() {
                it("naslov strani rezervacije", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal("Upravljanje Rezervacij");
                    });
                });
            });
            context("ustreznost podatkov na strani z menijem", function() {
                it("naslov strani meni", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("button"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal(" DODAJ");
                    });
                });
            });
            context("ustreznost podatkov na strani z zalogo", function() {
                it("naslov strani zaloga", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal("Zaloga");
                    });
                });
            });
            context("ustreznost podatkov na strani z zaslužkom", function() {
                it("naslov strani zaslužek", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal("Zasluzek");
                    });
                });
            });
            context("ustreznost podatkov na strani z zaposlenimi", function() {
                it("naslov strani zaposleni", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function(vsebina) {
                        expect(vsebina).to.be.equal("Zaposleni");
                    });
                });
            });
        });

        describe("Dodajanje sestavine", async function() {
            this.timeout(30 * 1000);
            before(async function() {
                await brskalnik.get(aplikacijaUrl + 'nadzorna_plosca/zaloga');
            });
            it('odpri modal dodaj', function () {
                // TODO
            });
        });

    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();
