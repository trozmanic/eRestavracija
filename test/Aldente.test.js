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

        describe("Resetriaj bazo", function () {
            this.timeout(30 * 1000);
            before(() => {brskalnik.get(aplikacijaUrl + "db");})
            it('resetiranje podatkovne baze', async function () {
                await pocakajStranNalozena(brskalnik, 10, '//button');
                const setDB = await brskalnik.findElement(By.id('setDB'));
                const dropDB = await brskalnik.findElement(By.id('dropDB'));
                expect(setDB).not.to.be.empty;
                expect(dropDB).not.to.be.empty;

                await dropDB.click();
                await setDB.click();

            })
        })

        describe("Ustreznost pristajalne strani za neprijavljenega uporabnika", function () {
            this.timeout(30*1000);
            before(() => {brskalnik.get(aplikacijaUrl);})
            it("Gumbi za registracijo in prijavo", async function() {
                await pocakajStranNalozena(brskalnik, 10, '//h1');
                const RegisterButton = await brskalnik.findElement(By.id('register-button'))
                const LoginButton = await brskalnik.findElement(By.id('login-button'))
                expect(RegisterButton).to.be.an('object');
                expect(LoginButton).to.be.an('object');
            } )
            it("Orodna vrstica neprijavljenega uporabnika", async function () {
                await pocakajStranNalozena(brskalnik, 10, '//h1');
                const list = await brskalnik.findElements(By.tagName('li'));
                expect(list).to.be.an('array').to.have.lengthOf(3);
            })
            it("Pravilen naslov in podnaslov", async function () {
                let naslov = await brskalnik.findElement(By.xpath("//h1[contains(text(), 'AL Dente')]"));
                let podnaslov = await brskalnik.findElement(By.xpath("//p[contains(text(), 'Where the flavor')]"));
                expect(naslov).to.not.be.empty;
                expect(podnaslov).to.not.be.empty;
            })
        });

        describe("Registracija novega uporabnika", function () {
            this.timeout(30 * 1000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            // it("izbriši uporabnika iz podatkovne baze", async function() {
            //     let dockerAtlasBrisiUporabnika = 'docker exec -i AlDente-mongoDB bash -c mongo \' \
            //     \ use AlDente; \
            //     \ db.Uporabnik.remove({email_naslov:"testic@aldente.si}); \ ';
            //     exec(dockerAtlasBrisiUporabnika).on("close", (koda) => {
            //         expect(koda).to.be.equal(0);
            //     });
            // });

            it("registracija klik", async function() {
                let povezava = await brskalnik.findElement(
                    By.xpath("//button[contains(text(), 'REGISTRACIJA')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            it("vnos podatkov uporabnika", async function() {
                await pocakajStranNalozena(brskalnik, 100,
                    "//button[contains(text(), 'REGISTRIRAJ SE')]");

                let ime = await brskalnik.findElement(By.id('InputName'));
                expect(ime).to.not.be.empty;
                ime.sendKeys("Testo Testic");

                let email = await brskalnik.findElement(
                    By.id('InputEmail'));
                expect(email).to.not.be.empty;
                email.sendKeys("testic@aldente.si");

                let telefonska_stevilka = await brskalnik.findElement(
                    By.id('InputPhoneNumber'));
                expect(telefonska_stevilka).to.not.be.empty;
                telefonska_stevilka.sendKeys("1234");

                let geslo = await brskalnik.findElement(By.id('InputPassword'));
                expect(geslo).to.not.be.empty;
                geslo.sendKeys("test");

                let ponoviGeslo = await brskalnik.findElement(By.id('InputPasswordRepeat'));
                ponoviGeslo.sendKeys("test");

                await brskalnik.findElement(
                    By.xpath("//button[contains(text(), 'REGISTRIRAJ SE')]")).click();

                const modal = await brskalnik.findElement(By.css('.swal2-confirm'))
                modal.click();
            });

            it("preveri ali je uporabnik prijavljen", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let uporabnik = await brskalnik.findElement(
                    By.xpath("//p[contains(text(), 'testic@aldente.si')]"));
                expect(uporabnik).to.not.be.empty;
            });

            /*
            it("pridobi JWT žeton", async function() {
                jwtZeton = await brskalnik.executeScript(function() {
                    return localStorage.getItem("token");
                });
                console.log(jwtZeton)
                expect(jwtZeton).to.not.be.empty;
            });

             */
        })
        describe('Dodajanje ocene', async function () {
            this.timeout(30 * 1000);
            before(async function() { await brskalnik.get(aplikacijaUrl + "meni"); });
            it('preveri ce je jed na meniju', async function () {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let jed = await brskalnik.findElements(By.className('card'))
                expect(jed).to.be.an('array').of.length(6);

                let buttons = await brskalnik.findElements(By.className('button'))
                await buttons[0].click();
            })
            it('oceni jed', async function () {
                let posljiButton = await brskalnik.findElement(By.xpath("//button[contains(text(), 'POSLJI')]"))
                await posljiButton.click();
                const modal = await brskalnik.findElement(By.css('.swal2-confirm'))
                expect(modal).to.not.be.empty;
                await modal.click();
            })
            it('preveri ce je ocena bila oddana', async function () {
                let tekst = await brskalnik.findElement(By.xpath("//h2[contains(text(), 'TO JED STE ZE OCENILI')]"))
                expect(tekst).to.not.be.empty;
            })
        })

        describe ('Odjava in prijava uporabnika', async function () {
            this.timeout(30 * 1000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

                it('odjavi uporabnika', async function () {
                    let button = await brskalnik.findElement(By.xpath("//button[contains(text(), 'ODJAVA')]"))
                    await button.click();
                    expect(button).to.not.be.empty;
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'REGISTRACIJA')]"));
                    expect(povezava).to.not.be.empty;
                })

                it('prijavi uporabnika', async function () {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'PRIJAVA')]"));
                    await povezava.click();

                    let email = await brskalnik.findElement(
                        By.id('exampleInputEmail1'));
                    expect(email).to.not.be.empty;
                    email.sendKeys("testic@aldente.si");

                    let geslo = await brskalnik.findElement(
                        By.id('exampleInputPassword1'));
                    expect(geslo).to.not.be.empty;
                    geslo.sendKeys("test");

                    let povezavaLogin = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'PRIJAVI SE')]")
                    )
                    expect(povezavaLogin).to.not.be.empty;
                    await povezavaLogin.click();
                })

                it("pridobi JWT žeton", async function() {
                jwtZeton = await brskalnik.executeScript(function() {
                    return localStorage.getItem("token");
                });
                console.log(jwtZeton)
                expect(jwtZeton).to.not.be.empty;
                });


        })

        // describe("Prijava uporabnika", function () {
        //     this.timeout(30 * 1000);
        //     before(() => {
        //         brskalnik.get(aplikacijaUrl);
        //     });
        //
        //     it('prijavi uporabnika', async function () {
        //         let povezava = await brskalnik.findElement(
        //             By.xpath("//button[contains(text(), 'PRIJAVA')]"));
        //         await povezava.click();
        //
        //         let email = await brskalnik.findElement(
        //             By.id('exampleInputEmail1'));
        //         expect(email).to.not.be.empty;
        //         email.sendKeys("admin@aldente.si");
        //
        //         let geslo = await brskalnik.findElement(
        //             By.id('exampleInputPassword1'));
        //         expect(geslo).to.not.be.empty;
        //         geslo.sendKeys("geslo1234");
        //
        //         let povezavaLogin = await brskalnik.findElement(
        //             By.xpath("//button[contains(text(), 'PRIJAVI SE')]")
        //         )
        //         expect(povezavaLogin).to.not.be.empty;
        //         await povezavaLogin.click();
        //     })
        //
        //
        //     context("ustreznost podatkov na nadzorni plošči", function() {
        //         it("naslov strani urnik", async function() {
        //             await pocakajStranNalozena(brskalnik, 10, '//h1');
        //             const povezava = await brskalnik.findElement(By.xpath('//a[@routerlink="/nadzorna_plosca/urnik"]'));
        //             expect(povezava).to.not.be.empty;
        //             await povezava.click();
        //         });
        //     });
        // })
/*
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
 */

    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();
