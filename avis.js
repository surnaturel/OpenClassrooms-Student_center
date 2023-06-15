export function ajoutListenersAvis() {
    let previousId = null
    const piecesElements = document.querySelectorAll(".fiches article button");
    let piecesElement
    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {
        
        const id = event.target.dataset.id;
        console.log(id)
        
        if (previousId !== id) {
            if (piecesElement) {
              var elementAvis = document.querySelector(".avis");
              if (elementAvis && elementAvis.parentNode === piecesElement) {
                piecesElement.removeChild(elementAvis);
              }
            }
            piecesElement = event.target.parentElement;
          }

          
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis = await reponse.json()
        var elementAvis = document.createElement("p")
        elementAvis.classList.add('avis')
        for (let i = 0; i < avis.length; i++){
            elementAvis.innerHTML += `<strong>${avis[i].utilisateur}</strong> :  ${avis[i].commentaire} <br>`
        }
        piecesElement.appendChild(elementAvis)

        previousId = id
        console.log(previousId)
      });
    }

    
}