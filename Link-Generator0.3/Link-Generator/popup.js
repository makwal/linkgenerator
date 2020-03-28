const xhr = new XMLHttpRequest();
const url = "https://www.aargauerzeitung.ch/dossier/Coronavirus%20im%20Aargau";

//generate random number
function getRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 19) + 1;
    return randomNumber;
};

let getLinksClicked = 0;

function getLinksClickedCounter() {
    getLinksClicked +=1;
};

let articleTitles = [];
let articleLinks = [];

function getLinks() {
    const page = xhr.responseXML;
    let counter = 0;

    //choose two different articles from latest 20
    while (counter < 2) {
        const article = page.querySelectorAll("article")[getRandomNumber()];
        const articleLink = article.querySelector("a")["href"];
        const articleTitle = article.querySelector("a > div.teaser__footer > div:nth-child(2) > h3 > span").textContent;

        //control if button "Links holen" has already been clicked
        if (!articleTitles.includes(articleTitle)) {
            articleTitles.push(articleTitle);
            articleLinks.push(articleLink);
            counter += 1;
        }
    }

    //check if button "Links holen" has already been clicked...
    getLinksClickedCounter();

    //if yes, remove existing links from popup
    if (getLinksClicked > 1) {
        let uli = document.getElementById("unorderedList");
        uli.remove();
    };

    //add links to popup
    const a1 = document.createElement("a");
    const a2 = document.createElement("a");
    const a3 = document.createElement("a");
    const link1 = document.createTextNode(articleTitles[0]);
    const link2 = document.createTextNode(articleTitles[1]);
    const link3 = document.createTextNode("Aktuell informiert mit dem Aargauer Corona-Newsticker");
    a1.appendChild(link1);
    a2.appendChild(link2);
    a3.appendChild(link3);
    a1.title = articleTitles[0];
    a2.title = articleTitles[1];
    a3.title = "Aktuell informiert mit dem Aargauer Corona-Newsticker";
    a1.href = articleLinks[0];
    a2.href = articleLinks[1];
    a3.href = "https://www.aargauerzeitung.ch/aargau/version-container-136452305";
    a1.setAttribute("target", "_blank");
    a2.setAttribute("target", "_blank");
    a3.setAttribute("target", "_blank");

    const ul = document.createElement("ul");
    ul.id = "unorderedList";
    const listItem1 = document.createElement("li");
    const listItem2 = document.createElement("li");
    const listItem3 = document.createElement("li");
    listItem1.appendChild(a1);
    listItem2.appendChild(a2);
    listItem3.appendChild(a3);
    ul.appendChild(listItem1);
    ul.appendChild(listItem2);
    ul.appendChild(listItem3);
    document.getElementById("articleLinks").appendChild(ul);

    while (articleTitles.length > 0) {
        articleTitles.pop();
    }

    while (articleLinks.length > 0) {
        articleLinks.pop();
    }
};



document.querySelector("#generateLinks").addEventListener("click", getLinks);

xhr.open("GET", url);
xhr.responseType = "document";
xhr.send();

//copy links to clipboard
function onClick() {
    const link = document.querySelector('div');
    const range = document.createRange();
    range.selectNode(link);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  
    const successful = document.execCommand('copy');

  };
  
  document.querySelector('#copy').addEventListener('click', onClick);