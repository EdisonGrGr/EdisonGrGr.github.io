// Convertir imagen a base64 cuando carga la página
window.addEventListener('load', function() {
    const img = document.querySelector('.profile-photo img');
    if (img && img.complete) {
        convertImageToBase64(img);
    } else if (img) {
        img.addEventListener('load', function() {
            convertImageToBase64(img);
        });
    }
});

function convertImageToBase64(img) {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg', 0.95);
        img.src = dataURL;
        img.removeAttribute('crossorigin');
    } catch (e) {
        console.warn('No se pudo convertir imagen a base64:', e);
    }
}

async function downloadAsImage() {
    const element = document.getElementById('cv-content');
    const buttons = document.querySelector('.download-buttons');
    
    if (!element) {
        alert('Error: No se encontró el contenido del CV.');
        return;
    }
    
    // Ocultar botones temporalmente
    if (buttons) {
        buttons.style.display = 'none';
    }
    
    try {
        // Capturar el CV como imagen
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: element.scrollWidth,
            height: element.scrollHeight
        });
        
        // Convertir a blob y descargar
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'CV-Jhon-Edison-Garcia-Garcia.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            
            // Mostrar botones nuevamente
            if (buttons) {
                buttons.style.display = 'flex';
            }
        }, 'image/png', 1.0);
        
    } catch (error) {
        console.error('Error al generar imagen:', error);
        alert('Hubo un error al generar la imagen. Por favor, intenta de nuevo.');
        
        // Mostrar botones en caso de error
        if (buttons) {
            buttons.style.display = 'flex';
        }
    }
}

// Función mejorada para PDF usando window.print
function downloadAsPDF() {
    window.print();
}
