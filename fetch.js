function searchManga(event) {
    event.preventDefault();
    const title = document.getElementById('searchInput').value.toLowerCase();
    const manga = document.getElementById('mangas');
    manga.innerHTML = '';

    fetch(`https://api.mangadex.org/manga?&title=${title}&includes%5B%5D=cover_art`)
        .then(res => res.json())
        .then(data => {
            const manga_data = data.data || [];

            manga_data.forEach(mangainfo => {
                const mangaTitle = mangainfo.attributes.title.en.toLowerCase();
                console.log(data);
                if (mangaTitle.startsWith(title)) {
                    let coverart = mangainfo.relationships.find(rel => rel.type === "cover_art");
                    let imgname = coverart.attributes.fileName;
                    let mangaImage = `<img src="https://uploads.mangadex.org/covers/${mangainfo.id}/${imgname}" alt="No Image"/>`;

                    
                    
                    const displayTitle = mangainfo.attributes.title.en;
                    const displayDescription = mangainfo.attributes.description.en
                    const mangadiv = `
                        <div class="manga-entry">
                            <h1>${displayTitle}</h1>
                            ${mangaImage}
                            <p>${displayDescription}</p>
                        </div>
                    `;

                    manga.innerHTML += mangadiv;
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}

document.getElementById('searchButton').addEventListener('click', searchManga);