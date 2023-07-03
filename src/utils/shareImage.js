import * as htmlToImage from 'html-to-image';

const shareImage = async (domElement) => {
    if (!domElement) return;

    const base64Data = await htmlToImage.toPng(domElement);
    // const imageUrl = await htmlToImage.toPng(domElement);
    if (!navigator.share) {
        return;
    }

    // // Create a Blob object from the base64 data.
    // const blob = new Blob([imageUrl], {type: 'image/png'});

    // // Create a File object from the Blob object.
    // const file = new File([blob], 'image.png');

    // Share the file with the title and text.
    // navigator.share({
    //   title:"dff",
    //   text:"dff sdf",
    //   files: [imageUrl],
    // });
    // const fileUrl = 'https://example.com/path/to/file.pdf';
    // const shareData = {
    //   title: 'Share File',
    //   text: 'Check out this file!',
    //   url: fileUrl
    // };
    // navigator.share(shareData)
    // .then(() => {
    //   console.log('Image shared successfully!');
    // })
    // .catch((error) => {
    //   alert(JSON.stringify(error))
    //   console.error('Error sharing image:', error);
    // })
    // .finally(() => {
    //   // Revoke the temporary URL after sharing
    //   alert(JSON.stringify("error"))
    //  console.log("dfdf")
    // });
    // Example base64 data
    // const base64Data = 'data:image/png;base64,iVBORw0KG...'; // Replace with your base64 data

    // Convert base64 data to a Blob
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/png' });

    // Convert Blob to Data URL
    const reader = new FileReader();
    reader.onloadend = function () {
        const dataUrl = reader.result;

        // Share using navigator.share
        if (navigator.share) {
            navigator
                .share({
                    title: 'Shared Image',
                    text: 'Check out this image!',
                    files: [
                        new File([blob], 'Mifix_Report.png', { type: 'image/png' }),
                    ],
                })
                .then(() => {
                    console.log('Successfully shared.');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                });
        } else {
            console.error('navigator.share API is not supported in this browser.');
        }
    };

    reader.readAsDataURL(blob);
};

export default shareImage;
