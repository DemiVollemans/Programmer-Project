#day 1
Het begin van het project, ik heb geen idee wat er precies verwacht wordt.
Welke data nou geschikt is en makkelijk te verkrijgen is, aangezien ik niet zo'n programmeer wonder ben.
Daarnaast zou het ook leuk zijn als het een onderwerp is wat me zou aanspreken.
Voornamelijk research gedaan op het internet en naar voorbeelden gekeken.

#day 2
Ik heb een beter idee gekregen wat de bedoeling is van de opdracht.
Een aantal onderwerpen leken me erg leuk om te doen, maar data niet beschikbaar.
Uiteindelijk gekozen om het over Franchise en sport te doen in Nederland. Door de data uit jaarverslagen te halen van interent
van de uitgekozen sportbonden. Daar een aantal variabelen uit kiezen en daat een visualisatie te maken.

#day 3
Data blijkt onvindbaar. Keuze om over te stappen naar meer internationale sporten.
Op wikipedia makkelijk verkrijgbaar. Nu nog bedenken wat hoe ik het in kaart wil brengen.

#day 4
Ontwerpen voor de eerste twee visualisaties zijn bedacht, ik zet maar niet te ambiteus in. Het zal waarschijnlijk dan alsnog een hel gaan worden, om het daadwerkelijk af te krijgen.

#day 5
Maar eens kijken hoe ik de data binnen ga halen.
Blijkt uiteindelijk nog een enorme draak van een klus te zijn. Ik ben niet handig hiermee.
Ik ga de gaten bij het scrapen hardcoden. Dat zal waarschijnlijk even lang gaan duren als wanneer ik er een code voor probeer te bedenken.

#day 7
De Daily Standups zijn eigelijk best wel handig, daar ook nog verslag voor schrijven is wel irritant.
leuk om tips te geven en mee te denken met anderen.
Zelf ook nog wel wat aangehad en heeft wat duidelijkheid gecreeërd in de chaos.

#day 8
Na de daily standup, kwam ik erachter dat het handig is nog meer variablen eraan toe te voegen.
Dus nog meer hardcoden. Beter dan zelf een code schrijven denk ik nog steeds.
#day 9
Een duidelijk beeld hoe de eerste visualisatie eruit moet komen te zien.
Voornamelijk bezig met data verzamelen en een begin maken met de repository en bestanden die ik nodig heb,
zoals, de HTML, JavaScript bestanden, en deze met elkaar verbinden.

#day 10
De data tot zover proberen te converteren naar een JSON format. Nog even goed nadenken hoe ik de data wil indelen
om het later zo makkelijk mogelijk te gebruiken en ik later niet weer code moet schrijven om er wel wat mee te doen.

#day 11
Ik heb iets mega handigs gevonden, nvd3, waarmee ik makkelijk een cummulatieve chart kan maken met interactive legenda. heel easy.
De data moet wel in een bepaalde format gezet worden, dus daar ga ik maar eens naar kijken hoe ik dat wil doen nudat alles in JSON staat.

#day 13
Het formatteren van Data blijkt dus ook niet me sterkste kant wat een hel.
Heel de dag naar gekeken.

#day 14
De data is nog steeds niet goed. Het is te druk om vragen te stellen.
dus ik ga alvast beginnen aan het initialiseren van de bubble chart.
assen en marges etc. maken.

#day 15
NOG steeds die data niet goed weten te krijgen.
Einde van de dag aan begeleiding kunnnen vragen. deed het in 2 minuten voor me.
Mega irritant.

#day 16
Ik krijg de nvd3 liberaty niet aan de praat, begeleiding snapt het ook niet.
ik moet gewoon met d3 blijven werken. Drama. Dagen voor niks naar die formattering van data zitten kijken.

#day 17
De bubblechart staat in de kinderschoenen.
Daarnaast opzoek gegaan naar een mooie CSS layout, het moet een beetje stoer en sportieve uitstraling hebben
zodat het mooi aansluit op het onderwerp van die visualisatie. Daarnaast bezig met het implementeren ervan.

#day 20
de bubblechart is nog lang niet zoals ik hem wil. ik wil maar 3 verschillende radiusen in plaats van variabel
krijg het niet voor elkaar.
Naar de line chart gewerkt.

#day 21
Ik wordt echt helemaal leip van alle kleine design dingen die ik bedacht had maar niet werkend krijg.
de radiusen zijn inmiddels goed. Legenda gemaakt.
Bezig maken met het interactief maken ervan.

#day 22
Interactiviteit van de legenda laat ik maar even voor wat het is.
Line chart gemaakt.

#day 23
Ik had bedacht een clusterd force layout te gaan maken met een hover.
zoals dit.(het lukt met niet een foto toe te voegen)
Drama om te doen ik zie er vanaf. Opzoek naar een andere optie.
Uitgekomen bij de stacked bar chart, gezien de tijd ga ik dat doen.
De data is niet handig geformatteerd dus ik ga het weer aanpassen.
Eerste beginselen zijn gemaakt voor stacked bar chart.

#day 24
Uiteindelijk bar chart ook werkend gekregen. het ziet er niet uit.
nu alles samen werkend zien te krijgen. Ben denk ik nog nooit zo gefrusteerd geweest in me leven denk ik.

<div class="row">
                <div class="col-md-4" id = "forcechart" >
                    <script src = "forcechart.js"></script>
                </div>
                <div class="col-md-4" id = "chart2" >
                    <script src="chart2.js"></script>
                </div>
                <div class="col-md-4" id = "chart1">
                    <script src="chart1.js" ></script>
                </div>
            </div>

