function downloadPDF() {
    const element = document.querySelector('.container-lg');
    const opt = {
        margin:       0,
        filename:     'portafolio-Jhon-Edison-Garcia.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, scrollY: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
}