/*
 * WoW Forever – Talentrechner
 * Datenbasis: WoW Classic Era (Annäherung), bis offizielle Forever-Daten vorliegen.
 *
 * Jedes Talent kann optional ein "icon" (Wowhead/zamimg Icon-Slug, ohne Dateiendung)
 * bekommen, z.B. "ability_warrior_savageblow" für Vernichtender Schlag.
 * Ist keins gesetzt, zeigt die Oberfläche nur Name/Rang (kein Platzhalterbild),
 * damit nie ein kaputtes Bild erscheint. So kannst du nach und nach echte
 * Icon-Slugs von https://www.wowhead.com/classic/ ergänzen.
 */

function T(tier, col, max, name, desc, icon){
  return { tier: tier, col: col, max: max, name: name, desc: desc, icon: icon || null };
}

var RAW_CLASSES = {
  warrior:{label:"Krieger", key:"warrior", color:"#C79C6E", trees:[
    {name:"Waffen",talents:[
      T(0,0,3,"Verbesserter Heldenhafter Schlag","Erhöht die Trefferchance von Heldenhaftem Schlag."),
      T(0,1,5,"Ablenkung","Erhöht die Parierchance."),
      T(1,0,2,"Verbessertes Aufschlitzen","Erhöht den periodischen Schaden von Aufschlitzen."),
      T(1,1,5,"Taktische Meisterschaft","Verringert den Wutverlust beim Wechsel der Kampfhaltung."),
      T(2,0,3,"Tiefe Wunden","Fügt bei kritischen Treffern zusätzlichen Blutungsschaden zu."),
      T(2,1,5,"Zweihandwaffen-Spezialisierung","Erhöht den Schaden von Zweihandwaffen."),
      T(3,0,2,"Aufspießen","Erhöht den kritischen Trefferschaden."),
      T(3,1,5,"Axtspezialisierung","Erhöht die Trefferchance mit Äxten."),
      T(4,0,1,"Wirbelhiebe","Der nächste Angriff trifft einen zusätzlichen nahen Gegner."),
      T(4,1,2,"Waffenmeisterschaft","Verringert die Rüstung des Ziels bei Waffentreffern."),
      T(6,0,1,"Vernichtender Schlag","Ein mächtiger Waffenschlag, der Heileffekte auf das Ziel verringert.","ability_warrior_savageblow")
    ]},
    {name:"Furor",talents:[
      T(0,0,5,"Kampfgebrüll","Verlängert die Dauer von Kampfrufen."),
      T(0,1,5,"Grausamkeit","Erhöht die kritische Trefferchance."),
      T(1,0,5,"Verbesserter Demoralisierender Schrei","Erhöht die Wirkung von Demoralisierendem Schrei."),
      T(1,1,5,"Ungezügelter Zorn","Erhöht die Wutgenerierung."),
      T(2,0,1,"Durchdringendes Heulen","Ein Schrei, der nahe Gegner verlangsamt."),
      T(2,1,3,"Blutrausch","Chance, nach einem Treffer Leben zu regenerieren."),
      T(3,0,2,"Verbesserte Hinrichtung","Verringert die Wutkosten von Hinrichtung."),
      T(3,1,5,"Beidhändiger Kampf","Erhöht die Trefferchance der Nebenhandwaffe."),
      T(4,0,1,"Todeswunsch","Erhöht den Schaden für kurze Zeit erheblich."),
      T(4,1,2,"Verbesserter Wirbelangriff","Erhöht den Schaden von Wirbelangriff."),
      T(5,0,5,"Raserei","Erhöht die Angriffsgeschwindigkeit nach kritischen Treffern."),
      T(6,0,1,"Bluthunger","Ein wuchtiger Nahkampfschlag mit sofortigem Schaden.","spell_nature_bloodlust")
    ]},
    {name:"Schutz",talents:[
      T(0,0,5,"Schildspezialisierung","Erhöht den Blockwert von Schilden."),
      T(0,1,5,"Vorahnung","Erhöht die Ausweichchance."),
      T(1,0,2,"Verbesserter Wutrausch","Erhöht die Wut durch Wutrausch."),
      T(1,1,5,"Zähigkeit","Erhöht die Rüstung durch Ausrüstung."),
      T(2,0,3,"Verbessertes Rüstung brechen","Erhöht die Dauer von Rüstung brechen."),
      T(2,1,5,"Trotz","Erhöht die Bedrohung durch Verteidigungsfähigkeiten."),
      T(3,0,2,"Verbessertes Entwaffnen","Verringert die Abklingzeit von Entwaffnen."),
      T(3,1,2,"Verbesserter Spott","Verringert die Abklingzeit von Spott."),
      T(4,0,2,"Verbesserter Schildblock","Verringert die Abklingzeit von Schildblock."),
      T(4,1,3,"Verbesserte Vergeltung","Erhöht die Trefferchance von Vergeltung."),
      T(5,0,1,"Letztes Gefecht","Erhöht die maximalen Lebenspunkte drastisch für kurze Zeit."),
      T(6,0,1,"Schildhieb","Schlägt mit dem Schild zu und verursacht Schaden.")
    ]}
  ]},
  paladin:{label:"Paladin", key:"paladin", color:"#F58CBA", trees:[
    {name:"Heilig",talents:[
      T(0,0,5,"Geistesheilung","Erhöht die Menge an zurückerhaltenem Mana."),
      T(0,1,5,"Verbesserter Segen der Weisheit","Erhöht die Wirkung von Segen der Weisheit."),
      T(1,0,5,"Heilige Spezialisierung","Erhöht die kritische Trefferchance heiliger Zauber."),
      T(1,1,3,"Verbesserte Heilung","Verringert die Zauberzeit von Heilung."),
      T(2,0,5,"Erleuchtung","Verringert die Manakosten heiliger Zauber."),
      T(2,1,1,"Heilige Reinheit","Erhöht die Resistenz gegen Entwürdigungseffekte."),
      T(3,0,3,"Segensfülle","Erhöht die Dauer von Segnungen."),
      T(3,1,5,"Göttliche Gunst","Der nächste Heilzauber wird sofort gewirkt."),
      T(4,0,3,"Heilige Konzentration","Chance, nach Zaubern nicht unterbrochen zu werden."),
      T(6,0,1,"Heiliger Schock","Wirkt sofort Schaden am Gegner oder Heilung am Verbündeten.","spell_holy_searinglight")
    ]},
    {name:"Schutz",talents:[
      T(0,0,5,"Verbesserte Rechtschaffenheit","Erhöht die Bedrohung von Siegel der Rechtschaffenheit."),
      T(0,1,5,"Zähigkeit","Erhöht die Rüstung durch Ausrüstung."),
      T(1,0,2,"Nachwirkung","Erhöht die Reichweite von Aurafähigkeiten."),
      T(1,1,5,"Beharrlichkeit","Erhöht die Ausweichchance."),
      T(2,0,3,"Verbessertes Handauflegen","Verringert die Abklingzeit von Handauflegen."),
      T(2,1,5,"Heilige Schutzhülle","Erhöht die Rüstung durch Aura."),
      T(3,0,1,"Standhaftigkeit","Verringert erlittenen Schaden nach kritischem Treffer."),
      T(3,1,3,"Verbessertes Segen des Schutzes","Verringert die Abklingzeit von Segen des Schutzes."),
      T(4,0,3,"Widerstandsfähigkeit","Erhöht die maximale Gesundheit."),
      T(5,0,1,"Segen der Zuflucht","Blockierte Angriffe verringern die Rüstung der Angreifer."),
      T(6,0,1,"Segen der Kathedrale","Erhöht Rüstung und Blockwert der ganzen Gruppe deutlich.")
    ]},
    {name:"Vergeltung",talents:[
      T(0,0,5,"Feuereifer","Erhöht die kritische Trefferchance mit Waffen."),
      T(0,1,5,"Verbesserte Berufung des Zorns","Erhöht die Bedrohung von Berufungen."),
      T(1,0,5,"Verfolgung","Erhöht die Angriffsgeschwindigkeit nach Verwundbarkeit."),
      T(1,1,2,"Vergeltung","Chance, nach einem Block einen Gegenangriff zu starten."),
      T(2,0,3,"Verbesserte Weihe","Erhöht den Schaden von Weihe."),
      T(2,1,1,"Rechtschaffener Zorn","Erhöht den Schaden von Urteil."),
      T(3,0,5,"Waffenkunde","Erhöht den Nahkampfschaden."),
      T(3,1,2,"Verbesserte Berufung der Gerechtigkeit","Verringert die Abklingzeit von Berufungen."),
      T(5,0,3,"Zorn des Gerechten","Erhöht Schaden basierend auf fehlendem Leben des Ziels."),
      T(6,0,1,"Siegel des Befehls","Fügt bei kritischen Treffern zusätzlichen heiligen Schaden zu.","spell_holy_sealofmight")
    ]}
  ]},
  hunter:{label:"Jäger", key:"hunter", color:"#ABD473", trees:[
    {name:"Tierherrschaft",talents:[
      T(0,0,5,"Verbessertes Zähmen von Tieren","Verringert die Zeit zum Zähmen eines Tieres."),
      T(0,1,3,"Tiere der Wildnis","Erhöht die Angriffskraft des Begleiters."),
      T(1,0,5,"Ausdauer der Bestie","Erhöht die Gesundheit des Begleiters."),
      T(1,1,3,"Verbesserte Wilde Zähigkeit","Erhöht Angriffskraft und Rüstung des Begleiters."),
      T(2,0,3,"Bestialität","Der Begleiter verursacht mehr Schaden."),
      T(2,1,1,"Tierischer Zorn","Der Begleiter erhält einen Wutrausch."),
      T(3,0,5,"Verbesserte Tierische Wut","Erhöht die Wirkungsdauer von Tierischer Wut."),
      T(3,1,1,"Furchtlosigkeit","Der Begleiter ist immun gegen Furchteffekte."),
      T(5,0,3,"Ferozität","Erhöht die kritische Trefferchance des Begleiters."),
      T(6,0,1,"Bestialischer Zorn","Der Begleiter wird für kurze Zeit extrem wütend und schadensstark.","ability_druid_ferociousbite")
    ]},
    {name:"Treffsicherheit",talents:[
      T(0,0,5,"Verbesserter Gezielter Schuss","Erhöht die Trefferchance mit Fernkampfwaffen."),
      T(0,1,5,"Effizienz","Verringert die Fokuskosten von Schüssen."),
      T(1,0,3,"Verbesserter Verletzender Schuss","Erhöht den Schaden von Verletzendem Schuss."),
      T(1,1,5,"Rasche Schüsse","Erhöht die Angriffsgeschwindigkeit für kurze Zeit."),
      T(2,0,5,"Tödliche Schüsse","Erhöht die kritische Trefferchance mit Fernkampfwaffen."),
      T(2,1,3,"Feuerkonzentration","Verringert die Fehlschlagchance von Zaubern."),
      T(3,0,1,"Rasende Vernichtung","Erhöht den Schaden von Vernichtungsschuss."),
      T(3,1,5,"Verbesserter Hetzender Schuss","Verringert die Abklingzeit von Hetzendem Schuss."),
      T(5,0,3,"Zielfernrohr","Erhöht die Reichweite von Fernkampfangriffen."),
      T(6,0,1,"Tödliche Absicht","Aura, die die kritische Trefferchance der Gruppe erhöht.")
    ]},
    {name:"Überleben",talents:[
      T(0,0,5,"Sich verteidigen","Erhöht die Ausweichchance."),
      T(0,1,3,"Fallenmeister","Erhöht den Schaden von Fallen."),
      T(1,0,2,"Kontern","Erhöht die Parierchance."),
      T(1,1,5,"Schwerpunkt","Verringert die Fokuskosten von Sofortzaubern."),
      T(2,0,3,"Todesbringer","Erhöht den Schaden gegen Ziele mit wenig Leben."),
      T(2,1,1,"Abhärtung","Ein defensives Manöver gegen Nahkämpfer."),
      T(3,0,5,"Verbesserte Wildnisüberlebenskunst","Erhöht Fernkampfschaden und Rüstungsdurchdringung."),
      T(3,1,1,"Überlebenskünstler","Erhöht die Widerstandsfähigkeit in der Wildnis."),
      T(5,0,2,"Kaltblütigkeit","Der nächste Angriff trifft garantiert kritisch."),
      T(6,0,1,"Gegenangriff","Ein sofortiger Konter nach erfolgreichem Ausweichen oder Parieren.")
    ]}
  ]},
  rogue:{label:"Schurke", key:"rogue", color:"#FFF569", trees:[
    {name:"Meucheln",talents:[
      T(0,0,5,"Verbesserter Gifthieb","Erhöht die Wirkung von Gifthieb."),
      T(0,1,5,"Ruchlosigkeit","Erhöht die kritische Trefferchance mit Dolchen."),
      T(1,0,5,"Tödliche Gifte","Erhöht die Wirksamkeit von Giften."),
      T(1,1,2,"Vergeltung","Erhöht den Schaden von Hinterhalt."),
      T(2,0,3,"Verbessertes Wirbeln","Verringert die Abklingzeit von Wirbeln."),
      T(2,1,1,"Kaltblütig","Der nächste Angriff trifft garantiert kritisch."),
      T(3,0,5,"Verbesserter Meuchelmord","Erhöht den Schaden von Meuchelmord."),
      T(3,1,3,"Skrupellosigkeit","Erhöht den Bonusschaden von Kombopunkten."),
      T(5,0,1,"Blutungsspezialisierung","Verzehrendes Gift kann sich stärker stapeln."),
      T(6,0,1,"Verstümmeln","Ein präziser Doppelangriff, der Ziele stark blutend zurücklässt und Kombopunkte gewährt.")
    ]},
    {name:"Kampf",talents:[
      T(0,0,5,"Verbesserte Klingenwirbel","Erhöht den Schaden von Klingenwirbel."),
      T(0,1,5,"Präzision","Erhöht die Trefferchance."),
      T(1,0,3,"Rücksichtslosigkeit","Erhöht die kritische Trefferchance nach Finte."),
      T(1,1,5,"Zähes Fell","Verringert erlittenen Schaden."),
      T(2,0,2,"Klingensturm-Vorbereitung","Verringert die Abklingzeit von Klingensturm."),
      T(2,1,5,"Waffenspezialisierung","Erhöht die Trefferchance mit Einhandwaffen."),
      T(3,0,1,"Klingensturm","Verursacht Schaden an allen nahen Gegnern."),
      T(3,1,3,"Aggression","Erhöht die Angriffskraft."),
      T(5,0,3,"Tödliche Anmut","Erhöht die kritische Trefferchance mit Einhandwaffen."),
      T(6,0,1,"Adrenalinschub","Erhöht die Energieregeneration erheblich für kurze Zeit.")
    ]},
    {name:"Täuschung",talents:[
      T(0,0,5,"Heimlichkeit","Erhöht die Bewegungsgeschwindigkeit im Schleichen."),
      T(0,1,5,"Verbesserte Rückwärtsrolle","Erhöht die Rüstungsdurchdringung nach Verstohlenheit."),
      T(1,0,3,"Elusivität","Erhöht die Ausweichchance."),
      T(1,1,2,"Verbesserter Sprint","Verringert die Abklingzeit von Sprint."),
      T(2,0,3,"Verbesserte Verstohlenheit","Erhöht die Dauer der Verstohlenheit."),
      T(2,1,1,"Ablenkungsmanöver","Verringert die Bedrohung."),
      T(3,0,5,"Meisterhafte Täuschung","Erhöht den Schaden von Meuchelangriffen."),
      T(3,1,1,"Vorbereitung","Setzt mehrere Abklingzeiten sofort zurück."),
      T(5,0,3,"Heimtücke","Erhöht die kritische Trefferchance aus der Verstohlenheit."),
      T(6,0,1,"Vorbedacht","Gewährt dem Ziel sofort zwei Kombopunkte.")
    ]}
  ]},
  priest:{label:"Priester", key:"priest", color:"#FFFFFF", trees:[
    {name:"Disziplin",talents:[
      T(0,0,5,"Heilende Konzentration","Verringert die Unterbrechungschance von Heilzaubern."),
      T(0,1,5,"Verbessertes Machtwort: Schild","Verstärkt das Schild."),
      T(1,0,3,"Verbesserte Heilige Nova","Erhöht den Schaden von Heiliger Nova."),
      T(1,1,5,"Schnelligkeit im Gebet","Verringert die Zauberzeit von Gebeten."),
      T(2,0,2,"Wortmacht","Verringert die Manakosten von Machtwort-Zaubern."),
      T(2,1,3,"Innerer Fokus","Der nächste Zauber kostet kein Mana."),
      T(3,0,5,"Meditation","Erhöht die Manaregeneration während des Zauberns."),
      T(4,0,3,"Bindung der Seelen","Erhöht die Wirksamkeit von Machtwort: Schild."),
      T(6,0,1,"Machtinfusion","Erhöht die Zaubergeschwindigkeit des Ziels erheblich.","spell_holy_powerinfusion")
    ]},
    {name:"Heilig",talents:[
      T(0,0,5,"Heilende Gaben","Erhöht die maximale Gesundheit."),
      T(0,1,5,"Verbesserte Heilung","Verringert die Zauberzeit von Heilung."),
      T(1,0,3,"Heiliger Fokus","Verringert die Unterbrechungschance."),
      T(1,1,5,"Heilige Spezialisierung","Erhöht die kritische Trefferchance heiliger Zauber."),
      T(2,0,3,"Segen der Erlösten","Erhöht Heilung nach kritischen Heilungen."),
      T(2,1,1,"Heiliger Zorn","Betäubt Untote und Dämonen kurzzeitig."),
      T(3,0,5,"Verbessertes Gedankenschild","Verstärkt Gedankenschild."),
      T(4,0,2,"Segensreiche Erscheinung","Erhöht Heilung durch Gebet der Heilung."),
      T(6,0,1,"Geist der Erlösung","Wandelt sich nach dem Tod für kurze Zeit in Geistform.","spell_holy_spiritofredemption")
    ]},
    {name:"Schatten",talents:[
      T(0,0,5,"Schattenaffinität","Verringert die Bedrohung von Schattenzaubern."),
      T(0,1,5,"Verbesserter Psychischer Schrei","Erhöht die Wirkung von Psychischem Schrei."),
      T(1,0,5,"Schattenfokus","Erhöht die Trefferchance von Schattenzaubern."),
      T(1,1,2,"Verzehrender Schatten","Erhöht den Schaden von Verfall."),
      T(2,0,3,"Dunkle Gedanken","Erhöht die kritische Trefferchance von Schattenzaubern."),
      T(2,1,1,"Vampirische Umarmung","Heilt die Gruppe bei Schadenszaubern."),
      T(3,0,3,"Verzweiflung","Erhöht den Schaden gegen Ziele mit wenig Leben."),
      T(4,0,3,"Schattenzuflucht","Verringert die Abklingzeit von Schattenschutz-Zaubern."),
      T(6,0,1,"Schattenform","Verwandelt den Priester in eine Schattengestalt.","spell_shadow_shadowform")
    ]}
  ]},
  shaman:{label:"Schamane", key:"shaman", color:"#0070DE", trees:[
    {name:"Elementar",talents:[
      T(0,0,5,"Konzentration","Verringert die Unterbrechungschance von Zaubern."),
      T(0,1,5,"Verbesserter Blitzschlag","Verringert die Zauberzeit von Blitzschlag."),
      T(1,0,3,"Elementarfokus","Nach kritischen Treffern werden Zauber günstiger."),
      T(1,1,2,"Verbesserter Erdschock","Verringert die Abklingzeit von Erdschock."),
      T(2,0,5,"Sturm des Zorns","Erhöht die kritische Trefferchance von Naturzaubern."),
      T(2,1,3,"Elementarschlag","Erhöht Naturschaden."),
      T(3,0,1,"Elementare Meisterschaft","Der nächste Zauber wirkt sofort und garantiert kritisch.","spell_nature_wispsplode"),
      T(4,0,5,"Herr der Elemente","Erhöht den Schaden aller Elementarzauber."),
      T(6,0,1,"Elementarfurie","Erhöht die kritische Trefferwirkung von Naturzaubern erheblich.")
    ]},
    {name:"Verstärkung",talents:[
      T(0,0,5,"Verbesserung des Erdschildes","Verstärkt das Erdschild-Totem."),
      T(0,1,5,"Verbesserter Schockzauber","Verringert die Manakosten von Schocks."),
      T(1,0,2,"Zähigkeit","Erhöht die maximale Gesundheit."),
      T(1,1,3,"Beharrlichkeit","Erhöht die Ausweichchance."),
      T(2,0,5,"Waffenkunde","Erhöht den Nahkampfschaden."),
      T(2,1,1,"Sturmangriff","Erhöht den Schaden des nächsten Nahkampfangriffs."),
      T(3,0,3,"Verbessertes Steinhauttotem","Erhöht die Rüstung durch Steinhauttotem."),
      T(4,0,1,"Stärke der Erde","Erhöht die Angriffskraft der Gruppe."),
      T(6,0,1,"Sturmschlag","Ein wuchtiger Doppelschlag mit Naturschadenbonus.","ability_shaman_stormstrike")
    ]},
    {name:"Wiederherstellung",talents:[
      T(0,0,5,"Heilende Konzentration","Erhöht die Wirkung von Heilwelle."),
      T(0,1,5,"Verbesserte Reinigung","Verringert die Manakosten von Reinigung."),
      T(1,0,3,"Totemisches Zurückschlagen","Erhöht die Reichweite von Totems."),
      T(1,1,5,"Verbesserte Heilwelle","Verringert die Zauberzeit von Heilwelle."),
      T(2,0,2,"Naturgeist","Erhöht die Manaregeneration."),
      T(2,1,3,"Meisterhafte Heilung","Erhöht die kritische Trefferchance von Heilzaubern."),
      T(3,0,3,"Naturheilkunst","Verringert die Manakosten von Heilzaubern."),
      T(4,0,1,"Manaflut-Totem","Ein Totem, das die Manaregeneration der Gruppe erhöht.","spell_nature_manaregentotem"),
      T(6,0,1,"Manaquelle","Erstattet einen Teil des verbrauchten Manas bei Heilzaubern.")
    ]}
  ]},
  mage:{label:"Magier", key:"mage", color:"#69CCF0", trees:[
    {name:"Arkan",talents:[
      T(0,0,5,"Arkane Konzentration","Erhöht die Chance auf sofortige Zauberkraft nach Zaubern."),
      T(0,1,5,"Arkane Subtilität","Verringert die Bedrohung arkaner Zauber."),
      T(1,0,3,"Arkaner Fokus","Verringert die Manakosten von arkanen Zaubern."),
      T(1,1,2,"Verbesserte Arkane Explosion","Erhöht den Schaden von Arkaner Explosion."),
      T(2,0,5,"Arkane Meisterschaft","Erhöht den Schaden arkaner Zauber."),
      T(2,1,1,"Verzauberte Konzentration","Verringert die Unterbrechungschance."),
      T(3,0,3,"Klarheit des Geistes","Verringert die Manakosten aller Zauber."),
      T(4,0,1,"Vorbereitung","Setzt die Abklingzeiten mehrerer Zauber sofort zurück."),
      T(6,0,1,"Arkane Macht","Erhöht den Zauberschaden für kurze Zeit erheblich.","spell_nature_lightning")
    ]},
    {name:"Feuer",talents:[
      T(0,0,5,"Verbrennung","Erhöht Feuerschaden gegen Ziele mit wenig Leben."),
      T(0,1,5,"Verbesserter Feuerball","Verringert die Zauberzeit von Feuerball."),
      T(1,0,3,"Zündung","Zusätzlicher Schaden nach kritischen Feuertreffern."),
      T(1,1,2,"Verbesserte Feuerschlagseite","Erhöht den Schaden von Feuerschlagseite."),
      T(2,0,5,"Feuerkraft","Erhöht Feuerschaden."),
      T(2,1,3,"Kritische Masse","Erhöht die kritische Trefferchance von Feuerzaubern."),
      T(3,0,5,"Meister der Elemente","Erstattet Mana bei kritischen Elementartreffern."),
      T(4,0,1,"Verheerung","Ein verzögerter Feuerschaden-Zauber mit großer Reichweite."),
      T(6,0,1,"Verbrennung (Combustion)","Erhöht die kritische Trefferchance von Feuerzaubern für kurze Zeit.","spell_fire_sealoffire")
    ]},
    {name:"Frost",talents:[
      T(0,0,5,"Frostwarnung","Verringert die Unterbrechungschance."),
      T(0,1,5,"Verbesserter Frostblitz","Verringert die Zauberzeit von Frostblitz."),
      T(1,0,3,"Elementare Präzision","Erhöht die Trefferchance elementarer Zauber."),
      T(1,1,2,"Verbessertes Frostnova","Verringert die Abklingzeit von Frostnova."),
      T(2,0,5,"Eisige Herrschaft","Erhöht Frostschaden."),
      T(2,1,3,"Scharfsinn","Erhöht die Zauberkraft basierend auf Intelligenz."),
      T(3,0,5,"Wintermacht","Erhöht kritischen Schaden gegen eingefrorene Ziele."),
      T(4,0,1,"Eisbarriere","Ein Schild, das eingehenden Schaden absorbiert.","spell_ice_lament"),
      T(6,0,1,"Eisblock","Macht den Magier kurzzeitig immun gegen jeden Schaden.","spell_frost_frost")
    ]}
  ]},
  warlock:{label:"Hexenmeister", key:"warlock", color:"#9482C9", trees:[
    {name:"Gebrechen",talents:[
      T(0,0,5,"Verbesserter Fluch der Schwäche","Erhöht die Wirkung von Fluch der Schwäche."),
      T(0,1,5,"Suppression","Erhöht die Rüstungsdurchdringung von Schattenzaubern."),
      T(1,0,3,"Verbesserte Verderbnis","Erhöht den Schaden von Verderbnis."),
      T(1,1,2,"Verbesserte Lebensentzug","Verringert die Zauberzeit von Lebensentzug."),
      T(2,0,5,"Nervengift","Erhöht Schattenschaden."),
      T(2,1,1,"Grausame Gelüste","Erhöht kritischen Schaden gegen betäubte Ziele."),
      T(3,0,3,"Verbesserter Fluch der Erschöpfung","Erhöht die Verlangsamung des Fluchs."),
      T(4,0,1,"Instabile Fäulnis","Explodiert bei Entfernung und fügt zusätzlichen Schaden zu."),
      T(6,0,1,"Unstete Bedrängnis","Ein starker, schwer entfernbarer Schadenszauber über Zeit.","spell_shadow_unstableaffliction_3")
    ]},
    {name:"Dämonologie",talents:[
      T(0,0,5,"Verbesserter Gesundheitsstein","Erhöht die Heilung des Gesundheitssteins."),
      T(0,1,5,"Dämonenkunde","Erhöht Angriffskraft und Zauberkraft der Diener."),
      T(1,0,3,"Verbesserter Imp","Erhöht das Feuerschild des Imps."),
      T(1,1,2,"Verbesserte Sukkubus","Erhöht den Schaden der Sukkubus."),
      T(2,0,3,"Dämonische Umarmung","Erhöht die kritische Trefferchance basierend auf Ausdauer."),
      T(2,1,1,"Meister-Dämonologe","Verbessert alle aktiven Dämonenfähigkeiten."),
      T(3,0,3,"Unerbittliche Willenskraft","Verringert den Widerstand gegen Furchteffekte."),
      T(4,0,1,"Felguard beschwören","Beschwört einen mächtigen, kampfstarken Dämon-Wächter.","spell_shadow_summonfelguard"),
      T(6,0,1,"Dämonische Gunst","Erhöht Schaden und Rüstung des aktiven Dieners erheblich.")
    ]},
    {name:"Zerstörung",talents:[
      T(0,0,5,"Verbesserter Schattenblitz","Verringert die Zauberzeit von Schattenblitz."),
      T(0,1,5,"Kabale","Erhöht die kritische Trefferchance gegen betäubte Ziele."),
      T(1,0,3,"Verbesserter Feuerregen","Erhöht den Schaden von Feuerregen."),
      T(1,1,2,"Dämonische Verbrennung","Erhöht Feuerschaden."),
      T(2,0,5,"Zerstörungskraft","Erhöht Feuer- und Schattenschaden."),
      T(2,1,1,"Verbesserte Höllenfeuer","Verringert erlittenen Schaden während der Kanalisierung."),
      T(3,0,3,"Konflagration","Erhöht den Explosionsschaden von Feuerzaubern."),
      T(4,0,1,"Ruin","Verdoppelt den Schadensbonus kritischer Treffer."),
      T(6,0,1,"Shadowburn","Ein sofortiger Schattenschaden-Zauber, der ein sterbendes Ziel exekutiert.","spell_shadow_scourgebuild")
    ]}
  ]},
  druid:{label:"Druide", key:"druid", color:"#FF7D0A", trees:[
    {name:"Gleichgewicht",talents:[
      T(0,0,5,"Verbesserter Mondfeuerzauber","Erhöht den Schaden von Mondfeuer."),
      T(0,1,5,"Naturkraft","Verringert die Zauberzeit von Naturzaubern."),
      T(1,0,3,"Verbessertes Sternenfeuer","Verringert die Zauberzeit von Sternenfeuer."),
      T(1,1,2,"Dornenmalus","Erhöht den Naturschaden gegen das Ziel."),
      T(2,0,5,"Mondwut","Erhöht die kritische Trefferchance von arkanen und Naturzaubern."),
      T(2,1,1,"Sonnenfeuer","Verringert die Rüstung des Ziels."),
      T(3,0,3,"Verbesserte Mondkin-Form","Erhöht die Angriffskraft der Gruppe."),
      T(4,0,1,"Mondkin-Gestalt","Verwandelt den Druiden in eine mächtige Mondkin-Gestalt.","spell_nature_forceofnature"),
      T(6,0,1,"Wucht der Natur","Beschwört Elementare, die den Feind mit Naturmagie angreifen.")
    ]},
    {name:"Wildniskampf",talents:[
      T(0,0,5,"Klauenhieb-Effizienz","Verringert Wut- bzw. Energiekosten."),
      T(0,1,5,"Ausdauer der Wildnis","Erhöht die maximale Gesundheit in Tierform."),
      T(1,0,3,"Verbessertes Reißen","Erhöht den Schaden von Reißen."),
      T(1,1,2,"Verbesserte Katzenform","Erhöht die kritische Trefferchance in Katzenform."),
      T(2,0,5,"Wilde Wut","Erhöht die Angriffskraft in Tierformen."),
      T(2,1,1,"Blutdurst","Chance auf zusätzliche Wutgenerierung bei Treffern."),
      T(3,0,3,"Verbesserte Bärenumarmung","Erhöht die Bedrohung in Bärenform."),
      T(4,0,1,"Angriffslust der Wildnis","Erhöht den Schaden für kurze Zeit erheblich."),
      T(6,0,1,"Verheerender Angriff","Ein brutaler Angriff, der die Rüstung des Ziels stark verringert.")
    ]},
    {name:"Wiederherstellung",talents:[
      T(0,0,5,"Nachwachsen-Spezialisierung","Erhöht die Heilung von Nachwachsen."),
      T(0,1,5,"Verbesserte Verjüngung","Erhöht die Heilung von Verjüngung."),
      T(1,0,3,"Naturliebe","Verringert die Zauberzeit von Heilzaubern."),
      T(1,1,2,"Verbessertes Mal der Wildnis","Erhöht die Rüstung durch Mal der Wildnis."),
      T(2,0,5,"Nachsinnen","Erhöht die Manaregeneration während des Zauberns."),
      T(2,1,1,"Verjüngungskraft","Erhöht die kritische Trefferchance von Heilzaubern."),
      T(3,0,3,"Naturs Gunst","Erhöht die Heilung basierend auf Zaubermacht."),
      T(4,0,1,"Manaflut","Ein Totem-ähnlicher Effekt, der Mana über Zeit regeneriert."),
      T(6,0,1,"Seelenruhe","Eine mächtige Flächenheilung, die über Zeit wirkt.","spell_nature_tranquility")
    ]}
  ]}
};
