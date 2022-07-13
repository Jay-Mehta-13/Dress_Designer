let load_material_data = async (backend_url,calling_section, index) => {
    let rep = await fetch(backend_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    let materials = await rep.json();      
    // console.log(materials)

    let cards = document.getElementById(calling_section).children[0].children[0]
    // console.log(materials, "####Materials####")
    materials.forEach(material => {
      
      // console.log(material[0])
      let li = document.createElement("li");
      let a_img = document.createElement("a");
      let material_img = document.createElement("img");
      let card_overlay = document.createElement("div");
      let card_header = document.createElement("div");
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      let path = document.createElementNS('http://www.w3.org/2000/svg','path');
      let thumbnail = document.createElement("img");
      let card_header_text = document.createElement("div");
      let h3 = document.createElement("h3");
      let span = document.createElement("span")
      let p = document.createElement("p");

      
      li.id = material.id
      a_img.className = "card"
      a_img.setAttribute("onclick",('toggle_selection("' + material.id + '",' + index + ')'))
      material_img.src = material.image
      material_img.className = "card__image"
      material_img.alt = ""
      card_overlay.className = "card__overlay"
      card_header.className = "card__header"
      svg.classList.add("card__arc")
      path.setAttributeNS(null, "d", "M 40 80 c 22 0 40 -22 40 -40 v 40 Z")
      path.style.fill = "white"
      thumbnail.className = "card__thumb"
      thumbnail.src = "/resources/Wool.png"
      thumbnail.alt = ""
      card_header_text.className = "card__header-text"
      h3.className = "card__title"
      h3.innerText = material.type
      span.className = "card__status"
      span.innerText = "$$$"
      p.className = "card__description"
      p.innerText = material.info
      
      li.appendChild(a_img)
      a_img.appendChild(material_img)
      a_img.appendChild(card_overlay)
      card_overlay.appendChild(card_header)
      svg.appendChild(path)
      card_header.appendChild(svg)
      card_header.appendChild(thumbnail)
      card_header.appendChild(card_header_text)
      card_header_text.appendChild(h3)
      card_header_text.appendChild(span)
      card_overlay.appendChild(p)
      cards.appendChild(li)
    });
  }

  load_material_data('http://localhost:3000/materials', "first", 0)
  load_material_data('http://localhost:3000/patterns', "second", 1)
  load_material_data('http://localhost:3000/borders', "fourth", 3)