# Code Review-uppgift: Tic Tac Toe

## Introduktion

Detta är en övning i flera delmoment där tanken är att allteftersom vi förskaffar oss nya kunskaper så kommer vi att kunna bygga på vårt spel, för att i slutändan förhoppningsvis få ett fungerande Tic-Tac-Toe (tre-i-rad).
Allt efersom kommer vi att bygga på spelet genom att använda oss av grundläggande kodning, arrayer, objekt, DOM-inläsning, DOM-modifikation, händelsehantering, verifikation, felhantering med mera.

## Instruktioner

### Programmet

Programmet består av två stycken filer, index.html och script.js. Ni kan för tillfället helt bortse från index.html, men senare kommer ni att behöva använda den för att hämta input från användaren.

Det är MYCKET VIKTIGT att ni inte ändrar på någonting mellan alls i index.html.

Själva programmet i script.js innehåller ett så kallat global objekt. Detta objekt heter oGameData, och innehåller allt från båda spelarnas symboler, namn, färgval osv, till spelplanen. Tack vare att allt detta är globalt så kommer ni att kunna komma åt denna data från alla era funktioner senare under utvecklingens gång. (För att komma åt spelplanen anropar ni tex oGameData.gameField, currentPlayer blir oGameData.currentPlayer osv.).

### Första etappen - tas med till Code Review 17/1

Denna första etapp skall vi sätta era kunskaper ordentligt på prov för att se vad ni har lärt er såhär långt! Ni behöver först koda upp funktionen checkForGameOver() som kommer returnera spelets nuvarande status. checkForGameOver() kommer sedan i sin tur att anropa två andra funktioner som ni också behöver skriva: checkForWinner() som kontrollerar om vi har en vinnare, samt checkForDraw() som kontrollerar om vi har ett oavgjort resultat.

För att testa era funktioner så kan ni enkelt mata in data i arrayen oGameData.gameField som ni finner på rad 31 i koden. Testdata finner ni på rad 34-38.

#### checkForGameOver()

Denna funktion använder sig utav selektion för att avgöra reultatet på matchen. Här behöver ni kombinera selektioner med anrop till funktionerna checkForWinner() och checkForDraw(), och baserat på resultaten från dessa anrop SKALL ni returnera antingen 0, 1, 2 eller 3.

#### checkForWinner(playerIn)

Här tar vi emot en inkommande spelare, antingen 'X' eller 'O'. Tanken är att ni skall söka igenom de kombinationer på spelplanen som skulle innebära en vinst, och kontrollera om alla dessa positioner i varje kombination innehåller playerIn.
Funktionen SKALL returnera antingen true eller false.

#### checkForDraw()

Här kontrollerar ni om alla platser på spelplanen är upptagna eller inte.
Funktionen SKALL returnera antingen true eller false.
