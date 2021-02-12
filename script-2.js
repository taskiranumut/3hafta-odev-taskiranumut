const petsModule = (function(){
    const _data = [
        //Klavyeden ilgili tuşa basınca çalışması için object'ler içerisine "soundKey" eklendi.
        //Ekstradan iki adet daha object eklendi.
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark1",
            soundText: "Sam bark - type \"s\"",
            soundKey: "s" 
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Mellie meow - type \"m\"",
            soundKey: "m" 
        },
        { 
            image: "https://pet-uploads.adoptapet.com/5/4/4/529721765.jpg", 
            name: "Edison", 
            type: "Boxer/Labrador Retriever Mix", 
            sound: "bark2", 
            soundText: "Edison bark - type \"e\"",
            soundKey: "e"  
          },
          { 
            image: "https://pet-uploads.adoptapet.com/9/f/9/454069301.jpg", 
            name: "Reba McEntire", 
            type: "Goat", 
            sound: "bah", 
            soundText: "Reba McEntire bah - type \"r\"",
            soundKey: "r"  
          }
    ];
    const $tbodyEl = document.querySelector("tbody");
    //Default resmin yerine pet resmi atamak için gerekli DOM elemanı tanımlandı; "$mainImage"
    const $mainImage = document.querySelector("img.main-image"); 

    const getButtons = function(){
        return document.querySelectorAll("button");
    };
    //Satırların background rengini değiştirmek için gerekli DOM elemaı döndüren fonksiyon tanımlandı; "getRows"
    const getRows = function(){
        return document.querySelectorAll("tr.row-background");
      };

    const createPetElement = function(pet){
        //Satırların background rengini değiştirmek için gerekli class tanımlaması yapıldı; "class='row-background'"
        //Button kısmındaki "data-sound" kısmı kaldırıldı. [data- yapısını tam anlayamadığım için yöntemi biraz değiştirdim. "data-" yapısına daha sonra tekrar bakacağım.]
        return "<tr class='row-background'><td><img class='pet-image' src='"+pet.image+"' /></td><td>"+pet.name+"</td><td>"+pet.type+"</td><td><button>"+pet.soundText+"</button></td></tr>"
    };

    const addToTable = function(content){
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function(){
        for(let i=0; i< _data.length; i++){
            addToTable(createPetElement(_data[i]));
        }
    }

    const bindEvents = function(){
        const buttons = getButtons();
        const rowsBackground = getRows();

        for (let i=0; i<buttons.length; i++){
            //Butona tıklayınca ses dosyasını oynatan event tanımlanmıştır.
            buttons[i].addEventListener("click", function(e){
              let soundId = _data[i].sound;
              e.stopPropagation(); //Butona tıklayınca sadece ses çalar, satır background rengi değişmez. (bubbling)
              document.getElementById(soundId).play();      
            });
            //Klavyede ilgili tuşlara basınca ses dosyasını oynatan event tanımlanmıştır.
            document.addEventListener("keydown", function(event){
              let soundKeyType = _data[i].soundKey;
              let soundId = _data[i].sound;        
              if (event.key === soundKeyType){
                document.getElementById(soundId).play();
              }
            });
            //Satıra tıklayınca ilgili satırın background rengini değiştiren event tanımlanmıştır.
            rowsBackground[i].addEventListener("click", function(){
              let imageLink = _data[i].image;
              $mainImage.src = imageLink;
              rowsBackground[i].style.backgroundColor = "white";
            });
            //[Her event de for döngüsünü kullandığı için tüm eventleri tek yerde topladım. Ama ayrı ayrı fonksiyonlar şeklinde de tanımlanabilirdi.]
        };
      };

    const init = function(){
        putPetsInHtml();
        bindEvents();
    }

    return {
        init: init
    }
})();