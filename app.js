const text={
  "de": {
    "skip": "Zum Inhalt",
    "navigation": "Hauptnavigation",
    "language": "Sprache",
    "navHome": "Start",
    "navProjects": "Projekte",
    "navAbout": "Über mich",
    "homeTitle": "Hachiro",
    "intro": "Meine Projekte und Links.",
    "projectsTitle": "Projekte",
    "projectsIntro": "Aktuell: Yo-kai Watch Wibble Wobble.",
    "collectionTitle": "Meine Projekte",
    "currentlyWorking": "Gerade in Arbeit",
    "community": "Community-Projekt",
    "inProgress": "In Arbeit",
    "projectDescription": "Inoffizieller Community-Fanserver für Yo-kai Watch Wibble Wobble.",
    "projectWebsite": "Zur Projektwebsite",
    "details": "Details",
    "profileTitle": "Hachiro",
    "profileText": "Owner von Yo-kai Watch Wibble Wobble.",
    "moreAbout": "Mehr über mich",
    "aroundWeb": "Links",
    "footerText": "Projekte",
    "aboutTitle": "Über mich",
    "aboutBody": "Ich bin Hachiro und Owner von Yo-kai Watch Wibble Wobble.",
    "seeProjects": "Meine Projekte ansehen",
    "myLinks": "Meine Links",
    "currentProject": "Mein aktuelles Projekt",
    "close": "Schließen",
    "dialogBody": "Ich bin Owner des inoffiziellen Community-Fanservers für Yo-kai Watch Wibble Wobble. Downloads für Android und iOS sowie Hilfe zum Spielen gibt es auf der Projektwebsite.",
    "myRole": "Meine Rolle",
    "status": "Status",
    "disclaimer": "Inoffizielles, nicht kommerzielles Fanprojekt. Kein Angebot von LEVEL-5 Inc. oder NHN PlayArt Corp. Rechte an Spiel und Originalinhalten liegen bei den jeweiligen Rechteinhabern.",
    "darkMode": "Dunklen Modus aktivieren",
    "lightMode": "Hellen Modus aktivieren"
  },
  "en": {
    "skip": "Skip to content",
    "navigation": "Main navigation",
    "language": "Language",
    "navHome": "Home",
    "navProjects": "Projects",
    "navAbout": "About me",
    "homeTitle": "Hachiro",
    "intro": "My projects and links.",
    "projectsTitle": "Projects",
    "projectsIntro": "Currently: Yo-kai Watch Wibble Wobble.",
    "collectionTitle": "My projects",
    "currentlyWorking": "Currently in progress",
    "community": "Community project",
    "inProgress": "In progress",
    "projectDescription": "Unofficial community fan server for Yo-kai Watch Wibble Wobble.",
    "projectWebsite": "Visit project website",
    "details": "Details",
    "profileTitle": "Hachiro",
    "profileText": "Owner of Yo-kai Watch Wibble Wobble.",
    "moreAbout": "More about me",
    "aroundWeb": "Links",
    "footerText": "Projects",
    "aboutTitle": "About me",
    "aboutBody": "I’m Hachiro, owner of Yo-kai Watch Wibble Wobble.",
    "seeProjects": "Explore my projects",
    "myLinks": "My links",
    "currentProject": "My current project",
    "close": "Close",
    "dialogBody": "I’m the owner of the unofficial community fan server for Yo-kai Watch Wibble Wobble. Visit the project website for Android and iOS downloads and help with playing.",
    "myRole": "My role",
    "status": "Status",
    "disclaimer": "Unofficial, non-commercial fan project. Not affiliated with LEVEL-5 Inc. or NHN PlayArt Corp. Rights to the game and original content belong to their respective owners.",
    "darkMode": "Enable dark mode",
    "lightMode": "Enable light mode"
  }
};
const page=document.body.dataset.page;
let currentLanguage='de';
function updateThemeLabel(){const dark=document.documentElement.dataset.theme==='dark';const button=document.getElementById('theme-toggle');button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',text[currentLanguage][dark?'lightMode':'darkMode']);document.querySelector('meta[name="theme-color"]').content=dark?'#1c1925':'#f8f8fc';}
function setLanguage(value,updateUrl=true){
 currentLanguage=value==='en'?'en':'de';const strings=text[currentLanguage];
 document.documentElement.lang=currentLanguage;
 document.querySelectorAll('[data-t]').forEach(element=>{element.innerHTML=strings[element.dataset.t]});
 document.querySelectorAll('[data-a]').forEach(element=>{element.setAttribute('aria-label',strings[element.dataset.a])});
 if(page==='projects'){document.querySelector('.intro h1').innerHTML=strings.projectsTitle;document.querySelector('.intro-text').textContent=strings.projectsIntro;}
 document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===currentLanguage)));
 document.querySelectorAll('[data-internal]').forEach(link=>{const target=new URL(link.getAttribute('href'),location.href);target.searchParams.set('lang',currentLanguage);link.setAttribute('href',target.pathname.split('/').pop()+target.search);});
 const logo=currentLanguage==='en'?'./assets/wibble-wobble.png':'./assets/wibble-wobble-de.png';document.getElementById('project-logo').src=logo;document.getElementById('dialog-logo').src=logo;
 const titles=currentLanguage==='en'?{home:'Projects',projects:'Projects',about:'About me'}:{home:'Projekte',projects:'Projekte',about:'Über mich'};document.title='Hachiro — '+titles[page];
 document.querySelector('meta[name="description"]').content=currentLanguage==='en'?'Hachiro’s projects and ideas. Currently working on Yo-kai Watch Wibble Wobble. In German and English.':'Hachiros Projekte und Ideen. Aktuell: Yo-kai Watch Wibble Wobble. Auf Deutsch und Englisch.';
 document.querySelector('.brand').setAttribute('aria-label','Hachiro – '+strings.navHome);updateThemeLabel();
 try{localStorage.setItem('hachiro-language',currentLanguage)}catch{}
 if(updateUrl){const url=new URL(location.href);url.searchParams.set('lang',currentLanguage);history.replaceState({},'',url)}
}
let initial='de';try{initial=localStorage.getItem('hachiro-language')||'de'}catch{}
const requested=new URLSearchParams(location.search).get('lang');setLanguage(requested==='en'||requested==='de'?requested:initial,false);
document.querySelector('[data-nav="'+page+'"]').setAttribute('aria-current','page');
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
document.getElementById('theme-toggle').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('hachiro-theme',next)}catch{}updateThemeLabel()});
window.addEventListener('popstate',()=>setLanguage(new URLSearchParams(location.search).get('lang')||'de',false));
const dialog=document.getElementById('project-dialog');document.getElementById('details-open').addEventListener('click',()=>dialog.showModal());document.getElementById('details-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}});
document.getElementById('year').textContent=new Date().getFullYear();
