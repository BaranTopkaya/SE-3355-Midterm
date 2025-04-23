document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target === this || e.target.parentNode === this) {
        navItems.forEach((i) => i.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  const elektronikItem = document.getElementById("elektronik")
  const modaItem = document.getElementById("moda")

  elektronikItem.addEventListener("click", function (e) {
    const dropdown = this.querySelector(".dropdown-menu")
    if (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
      } else {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.style.display = "none"
        })
        dropdown.style.display = "block"
      }
      e.stopPropagation()
    }
  })

  modaItem.addEventListener("click", function (e) {
    const dropdown = this.querySelector(".dropdown-menu")
    if (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
      } else {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.style.display = "none"
        })
        dropdown.style.display = "block"
      }
      e.stopPropagation()
    }
  })

  document.addEventListener("click", (e) => {
    if (!elektronikItem.contains(e.target)) {
      const elektronikDropdown = elektronikItem.querySelector(".dropdown-menu")
      if (elektronikDropdown) {
        elektronikDropdown.style.display = "none"
      }
    }

    if (!modaItem.contains(e.target)) {
      const modaDropdown = modaItem.querySelector(".dropdown-menu")
      if (modaDropdown) {
        modaDropdown.style.display = "none"
      }
    }
  })

  const dropdowns = document.querySelectorAll(".dropdown-menu")
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  })

  const favoriteButtons = document.querySelectorAll(".favorite-btn")

  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const icon = this.querySelector("i")
      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        icon.style.color = "#FF6A00"
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        icon.style.color = "#ccc"
      }
    })
  })

  const leftSlides = document.querySelectorAll(".left-slide")
  const leftPrevBtn = document.querySelector(".left-prev")
  const leftNextBtn = document.querySelector(".left-next")
  let leftCurrentIndex = 0

  function showLeftSlide(index) {
    leftSlides.forEach((slide) => slide.classList.remove("active"))
    leftSlides[index].classList.add("active")
    leftCurrentIndex = index
  }

  if (leftPrevBtn && leftNextBtn && leftSlides.length > 0) {
    leftPrevBtn.addEventListener("click", () => {
      let prevIndex = leftCurrentIndex - 1
      if (prevIndex < 0) prevIndex = leftSlides.length - 1
      showLeftSlide(prevIndex)
    })

    leftNextBtn.addEventListener("click", () => {
      let nextIndex = leftCurrentIndex + 1
      if (nextIndex >= leftSlides.length) nextIndex = 0
      showLeftSlide(nextIndex)
    })

    const leftSlideInterval = setInterval(() => {
      let nextIndex = leftCurrentIndex + 1
      if (nextIndex >= leftSlides.length) nextIndex = 0
      showLeftSlide(nextIndex)
    }, 5000)
  }

  const dealsSlides = document.querySelectorAll(".deals-slide")
  const dealsPrevBtn = document.querySelector(".deals-prev")
  const dealsNextBtn = document.querySelector(".deals-next")
  let dealsCurrentIndex = 0
  let dealsAutoSlideInterval

  function showDealsSlide(index) {
    dealsSlides.forEach((slide) => slide.classList.remove("active"))
    dealsSlides[index].classList.add("active")
    dealsCurrentIndex = index
  }

  function startDealsAutoSlide() {
    dealsAutoSlideInterval = setInterval(() => {
      let nextIndex = dealsCurrentIndex + 1
      if (nextIndex >= dealsSlides.length) nextIndex = 0
      showDealsSlide(nextIndex)
    }, 3000)
  }

  function stopDealsAutoSlide() {
    clearInterval(dealsAutoSlideInterval)
  }

  if (dealsPrevBtn && dealsNextBtn && dealsSlides.length > 0) {
    dealsPrevBtn.addEventListener("click", () => {
      stopDealsAutoSlide()
      let prevIndex = dealsCurrentIndex - 1
      if (prevIndex < 0) prevIndex = dealsSlides.length - 1
      showDealsSlide(prevIndex)
      startDealsAutoSlide()
    })

    dealsNextBtn.addEventListener("click", () => {
      stopDealsAutoSlide()
      let nextIndex = dealsCurrentIndex + 1
      if (nextIndex >= dealsSlides.length) nextIndex = 0
      showDealsSlide(nextIndex)
      startDealsAutoSlide()
    })

    startDealsAutoSlide()
  }

  const recContainer = document.querySelector(".rec-container")
  const recPrevBtn = document.querySelector(".rec-prev")
  const recNextBtn = document.querySelector(".rec-next")

  if (recContainer && recPrevBtn && recNextBtn) {
    recPrevBtn.addEventListener("click", () => {
      recContainer.scrollBy({ left: -220, behavior: "smooth" })
    })

    recNextBtn.addEventListener("click", () => {
      recContainer.scrollBy({ left: 220, behavior: "smooth" })
    })
  }

fetch("https://run.mocky.io/v3/b6143c71-5c1d-475d-8049-0ae14e821e7d")
.then((res) => res.json())
.then((data) => {
  const promos = data.filter(item => item.type === "promo");
  const promoCards = document.querySelectorAll(".promo-card");
  
  promoCards.forEach((card, i) => {
    if (promos[i]) {
      card.style.backgroundImage = `url('${promos[i].url}')`;
    }
  });
})
.catch((err) => console.error("Promo görselleri yüklenemedi:", err));

fetch("https://run.mocky.io/v3/52e80514-a10f-4e5d-8680-f119a1ade551")
  .then((res) => res.json())
  .then((data) => {
    const products = data.filter(item => item.type === "product");
    const productImgs = document.querySelectorAll(".deals-slide .image-placeholder img");

    productImgs.forEach((img, i) => {
      if (products[i]) {
        img.src = products[i].url;
      }
    });
  })
  .catch((err) => console.error("Elektronik fırsatlar görselleri yüklenemedi:", err));

fetch("https://run.mocky.io/v3/25409049-ec59-4f76-96f9-3445002800db")
.then((res) => res.json())
.then((data) => {
  const banners = data.filter(item => item.type === "banner");
  const bannerImgs = document.querySelectorAll(".left-slide .banner-img");

  bannerImgs.forEach((img, i) => {
    if (banners[i]) {
      img.src = banners[i].url;
    }
  });
})
.catch((err) => console.error("Banner görselleri yüklenemedi:", err));

fetch("https://run.mocky.io/v3/5020c30b-6b91-4867-9b69-f322d1d24982")
  .then((res) => res.json())
  .then((data) => {
    const recs = data.filter(item => item.type === "recommendation");
    const recImgs = document.querySelectorAll(".rec-container .image-placeholder img");

    recImgs.forEach((img, i) => {
      if (recs[i]) {
        img.src = recs[i].url;
      }
    });
  })
  .catch((err) => console.error("Size özel öneri görselleri yüklenemedi:", err));
})
