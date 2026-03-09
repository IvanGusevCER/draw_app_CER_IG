const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const gallery = document.getElementById('gallery');
const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');

let isDrawing = false;

// 1. Akna suuruse järgi lõuendi seadistamine
function initCanvas() {
    // Teeme lõuendi piisavalt suureks, et oleks mugav joonistada
    canvas.width = window.innerWidth * 0.85;
    canvas.height = 500;
    
    // Täidame tausta valgega (muidu on see läbipaistev)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Joonistamise funktsioonid
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Alustab uut joont, et vältida ühendamist
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidthInput.value;
    ctx.lineCap = 'round'; // Teeb joone otsad ümaraks
    ctx.lineJoin = 'round'; // Teeb joone pööramised sujuvaks
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Sündmuste kuulajad
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);

// Lõuendi puhastamine
document.getElementById('clearCanvas').addEventListener('click', () => {
    if(confirm('Kas soovid joonistuse kustutada?')) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

// 2. Salvestamine galeriisse
document.getElementById('saveDrawing').addEventListener('click', () => {
    const imageData = canvas.toDataURL('image/png');
    
    const card = document.createElement('div');
    card.className = 'gallery-item';
    
    card.innerHTML = `
        <img src="${imageData}" alt="Joonistus">
        <button class="btn-danger small-delete">Kustuta</button>
    `;
    
    // 3. Üksiku pildi kustutamine
    card.querySelector('.small-delete').onclick = () => card.remove();
    
    gallery.prepend(card); // Lisab uue pildi algusesse
});

// Galerii täielik tühjendamine
document.getElementById('clearGallery').onclick = () => {
    if(confirm('Kas soovid tühjendada kogu galerii?')) {
        gallery.innerHTML = '';
    }
};

// Käivita algseadistus
initCanvas();