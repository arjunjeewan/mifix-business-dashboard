import * as htmlToImage from 'html-to-image';

const downloadImage = async (domElement) => {
    if (!domElement) return;
    console.log('domElement', domElement);
    const dataUrl = await htmlToImage.toPng(domElement);
    const link = document.createElement('a');
    link.download = 'Mifix_Report.png';
    link.href = dataUrl;
    link.click();
};

export default downloadImage;
