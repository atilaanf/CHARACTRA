let perfumes = null;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('parfume.json');
        const data = await response.json();
        perfumes = data;
        console.log(perfumes); // Make sure the data is loaded
        initDetailPage(); // Only call this after songs is populated
    } catch (error) {
        console.error("Error loading parfume.json:", error);
    }
});

function initDetailPage() {

    console.log('test');
    let detail = document.querySelector('.detail-container')
    let perfumeid = new URLSearchParams(window.location.search).get('id');

    const thisPerfume = perfumes.find(p => p.parfumeId == perfumeid);
    // if there is no perfume has id= perfumeid=> return to home page
    if (!thisPerfume) {
        window.location.href = "/";
        return;
    }
    //and if has, add data to html
    detail.querySelector('.image-detail').src = thisPerfume.imageSrc;
    detail.querySelector('.perfume-name').innerText = thisPerfume.parfumeName;
    detail.querySelector('.story').innerText = thisPerfume.story;
    detail.querySelector('.perfume-desc').innerText = thisPerfume.parfumeDesc;


    // add notes
    ['top', 'middle', 'bottom'].forEach(noteType => {
        const container = document.querySelector(`.${noteType}-notes`);
        container.innerHTML = thisPerfume.notes[noteType]?.map(note =>
            `<span class="note-item">${note}</span>`
        ).join('') || '';
    });
    //characteristics
    const charsContainer = document.querySelector('.charactersitics');
    charsContainer.innerHTML = thisPerfume.charactersitics
        ? `<h5 class="d-inline me-2">Characteristics:</h5>${thisPerfume.charactersitics.split(', ').map(c =>
            `<span class="badge bg-dark text-white me-1 mb-1">${c}</span>`
        ).join('')
        }`
        : '';

    console.log('Notes data:', thisPerfume.notes);
    console.log('Characteristics:', thisPerfume.charactersitics);

}

