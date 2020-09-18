//BUSCA NOME CAMPEÕES
const league = 'http://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/champion.json'
const data = league.data
var champion = document.getElementById("champ")

fetch(league)

.then(response => response.json())
.then(data => { 
    for (prop in data.data) {        
        champion.innerHTML += "<option value='"+ prop +"'>"+ prop +"</option>"
    } 
    console.log(data);
    
}) 

// //GLOBAL
var i 
var dados
var infoObj;
var armor = 0;
var armorperlevel = 0;
var attdamage = 0 ;
var attdamegeperlevel = 0 ;
var attrange = 0 ;
var attspeed = 0 ;
var attspeedperlevel = 0 ;
var critico = 0 ;
var criticoperlevel = 0 ;
var vida = 0 ;
var vidaperlevel = 0 ;
var regVida = 0 ;
var movespeed = 0 ;
var mp = 0 ;
var mpperlevel = 0 ;
var mpregen = 0 ;
var mpregenperlevel = 0 ;
var spellblock = 0 ;
var spellblockperlevel = 0 ;
var regvidaperlevel = 0;
var mostrarSlides = false;
var obj = {}

const status = document.getElementById("status")
 

//MOSTRAR DADOS DOS CAMPEÕES

function submit(champion){
    
    
    fetch(`https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion/${champion}.json`)

    .then(response => response.json())
    .then(info => { 

        const infoObj = info.data
        i = `${champion}`
        console.log(infoObj);

        for(var i in infoObj) {
                obj = {
                    passiva: infoObj[i].passive.image.full,
                    q: infoObj[i].spells[0].image.full,
                    w: infoObj[i].spells[1].image.full,
                    e: infoObj[i].spells[2].image.full,
                    r: infoObj[i].spells[3].image.full,

                    attarmor: infoObj[i].stats.armor,
                    attarmorperlevel: infoObj[i].stats.armorperlevel,
                    attdamage: infoObj[i].stats.attackdamage,
                    attdamageperlevel: infoObj[i].stats.attackdamageperlevel,
                    attrange: infoObj[i].stats.attackrange,
                    attspeed: infoObj[i].stats.attackspeed,
                    attspeedperlevel: infoObj[i].stats.attackspeedperlevel,
                    critico: infoObj[i].stats.crit,
                    criticoperlevel: infoObj[i].stats.critperlevel,
                    vida: infoObj[i].stats.hp,
                    vidaperlevel: infoObj[i].stats.hpperlevel,
                    regVida: infoObj[i].stats.hpregen,
                    regvidaperlevel: infoObj[i].stats.hpregenpelevel,
                    movespeed: infoObj[i].stats.movespeed,
                    mp: infoObj[i].stats.mp,
                    mpperlevel: infoObj[i].stats.mpperlevel,
                    mpregen: infoObj[i].stats.mpregen,
                    mpregenperlevel: infoObj[i].stats.mpregenperlevel,
                    spellblock: infoObj[i].stats.spellblock,
                    spellblockperlevel: infoObj[i].stats.spellblockperlevel
                }
                
                atualizaStatus(1) 
                showSkins(infoObj, champion)
                mostrarSlides = true;
                showSlides(slideIndex)
                spells(champion)
            }  
    })

}
submit(champion)
    
//SKILLS
var i = 0
var hab = []
const skills = document.getElementById('skills')

  function spells(champion) {

    const xhr = new XMLHttpRequest();
    const URL = "https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion/"+ champion + ".json"
    
    xhr.open("GET", URL)
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            
            const skill = JSON.parse(this.responseText)
            skillObj = skill.data
            skills.innerHTML = "";
            info.innerHTML = "";
            
            hab = []

            
                for(j = 0; j < skillObj[champion].spells.length; j++){
                     at = {
                        name: skillObj[champion].spells[j].name,
                        description: skillObj[champion].spells[j].description,
                        img: "http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/" + skillObj[champion].spells[j].image.full
                    }

                    hab.push(at)

                    

                }
                at = {
                    name: skillObj[champion].passive.name,
                    description: skillObj[champion].passive.description,
                    img: "http://ddragon.leagueoflegends.com/cdn/10.18.1/img/passive/" + skillObj[champion].passive.image.full
                }
                hab.push(at)
                showSpells()
        }   
    }
    xhr.send();
}


//INFO SKILLS
function showSpells() {
    for (let i = 0; i < hab.length; i++) {
        skills.innerHTML += "<img src='" + hab[i].img + "' id='" + hab[i].name + "' title='" + hab[i].name + "' onclick='showInfo(this.id)' class='resultSpells' >"
        
    } 
    
}

function showInfo(a) {
    console.log(hab)
    for (let i = 0; i < hab.length; i++) {
        if (a == hab[i].name) {
            document.getElementById("info").innerHTML = "<div id='infoResultSpells'>" + "<h2>" + hab[i].name + ":</h2><br>" + "<p>" + hab[i].description + "</p>" + " </div>"
            console.log(hab[i][prop])
        }
    }
}      
//CALCULA STATUS
function level(nivel) {

        armor = ((nivel - 1) * obj.attarmorperlevel),
        attdamage = ((nivel - 1) * obj.attdamegeperlevel)
        attspeed = ((nivel - 1) * obj.attspeedperlevel)
        critico = ((nivel - 1) * obj.criticoperlevel)
        vida = ((nivel - 1) * obj.vidaperlevel)
        regVida = ((nivel -1) * obj.regvidaperlevel)
        mp = ((nivel - 1) * obj.mpperlevel)
        mpregen = ((nivel - 1) * obj.mpregenperlevel)
        spellblock = ((nivel - 1) * obj.spellblockperlevel)
        
        atualizaStatus(nivel)
}


function atualizaStatus(nivel) {
    
    status.innerHTML = "<div id='info_champ'><h4>Level: </h4><input value='" + nivel + "' type='number' min='1' max='18' id='level' onchange='level(this.value)'><br><p><b>HP: </b>"+ 
        obj.vida + "<span> + " + vida.toFixed(1) + "</span></p><p><b>Attack Damage: </b>"+ 
        obj.attdamage + "</p><p><b>Armor: </b>" + 
        obj.attarmor + "<span> + " + armor.toFixed(1) + "</span></p><p><b>Crit: </b>"+ 
        obj.critico + "<span> + " + critico.toFixed(1) + "</span></p><p><b>HP Regen: </b>"+ 
        obj.regVida + "</p><p><b>Move Speed: </b>"+ 
        obj.movespeed + "<span> + " + spellblock.toFixed(1) + "</span></p><p><b>Magic Resistance: </b>"+ 
        obj.spellblock + "<span> + "  + spellblock.toFixed(1) + "</span></p></p><b>Attack Speed: </b>"+
        obj.attspeed + "<span> + " + attspeed.toFixed(1) + "</span></p><p><b>Attack Range: </b>"+
        obj.attrange + "<span> + " + attrange.toFixed(1) + "</span></p></div>" 
    }

    


// IMAGEM DOS CAMPEÕES
var contador = 0;
var skill;
var skillObj;
var spell;
var j;
var slideIndex = 0;
var atual = {}

function showSkins(json, champion) {
    let skins = "<div class='slideshow-container'>";
    
    for(let i = 0; i < json[champion].skins.length; i++){
        let atual = { nome: json[champion].skins[i].name, 
            imagem: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+ champion +"_"+ json[champion].skins[i].num +".jpg" };
            if(i == 0) atual.nome = champion;
            skins += "<div class='mySlides fade'><div class='numbertext'>"+ (i + 1) +"/"+ (json[champion].skins.length)+"</div><img src='"+ atual.imagem +"' class='skins' width='208px'><div class='text'>"+ atual.nome +"</div></div>";
        }
        
        skins += "<a class='prev' onclick='showSlides(slideIndex += -1)'>&#10094;</a><a class='next' onclick='showSlides(slideIndex += 1)'>&#10095;</a></div>";
        
        document.getElementById("skin").innerHTML = skins
    }
    
    
    function showSlides(n){
        if(mostrarSlides== true){
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            
            if(n > slides.length) slideIndex = 1;
            if(n < 1) slideIndex = slides.length;
            
            for(i = 0; i < slides.length; i++){
                slides[i].style.display = "none";
            }
            
            for(i = 0; i < dots.length; i++){
                dots[i].className = dots[i].className.replace(" active", "");
            }
            
            slides[slideIndex-1].style.display = "block";
        }
    } 
const info = document.getElementById('info')