const GalleryApp = {
    categories: [],
    init(){
        fetch("images.json")
        .then(response => response.json())
        .then(data => {
            this.categories = [ ...new Set(data.map(img => img.category)) ];
            this.renderImages(data);
            this.renderCategoryButtons();
        });

        document.getElementById("image-modal").addEventListener("click", function(){
            this.style.display = "none";
        });
    },

    renderImages(images){
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = images.map(
            image => `<img src="${image.url}" alt="${image.category}" data-category="${image.category}">`
        ).join("");

        document.querySelectorAll("#gallery img").forEach(img => {
            img.addEventListener("click", function(){
                const modal = document.getElementById("image-modal");
                const modalImg = document.getElementById("modal-image");
                modalImg.src = this.src;
                modal.style.display = "flex";
            });
        });
    },

    renderCategoryButtons(){
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = `<button data-category="all">All</button>` 
        + this.categories.map(
            category => `<button data-category="${category}">${category}</button>`
        ).join("");

        navbar.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", this.filterImages);
        });
    },

    filterImages(event){
        const category = event.target.dataset.category;
        const images = document.querySelectorAll("#gallery img");
        images.forEach(img => {
            if(category === "all" || img.dataset.category === category)
            {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    }
};

GalleryApp.init();