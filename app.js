import fse from "fs-extra"
import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";


//* Carpeta de entrada de las imagenes a optimizar 
let inputFolder = "src";
//* Carpeta de salida ya con las imágenes optimizadas 
let outputFolder = "opt"; 
//* Ancho a la cual redimensionar las imagenes para que sean más optimas
let targetWidth = 1920; 

const processImg = async() => {
  try {
    //* Leyendo carpeta de entrada de imagenes guardando en un arreglo el nombre de las imagenes con su formato
    const files = await fse.readdir(inputFolder);

    for (const file of files) { 
      //* Ruta de entrada de cada imagen a optimizar 
      let inputPath = `${inputFolder}/${file}`;
      //* Ruta de salida de cada imagen a optimizar 
      let outputPath = `${outputFolder}/${file}`;

      //* Redimensionando cada imagen y despues guardandola ya redimensionada en su carpeta de salida 
      await sharp(inputPath).resize(targetWidth).toFile(outputPath);

      //* Minificando o comprimiento cada imagen y guardando en carpeta de salida 
      await imagemin([outputPath], {
        //* Carpeta de salida en donde se guardan las imagenes ya optimizadas 
        destination: outputFolder,
        //* Plugins para definir que tipo de imagenes optimizar 
        plugins: [
          //* Comprimir imagen JPG con calidad del 80% 
          imageminJpegtran({ quality: 80 }),
          //* Comprimir imagen PNG 
          imageminPngquant(),
          //* Comprimir imagen SVG 
          imageminSvgo(),
          //* Comprimir imagen Webp con calidad del 80% 
          imageminWebp({ quality: 80 }),
          //* Comprimir imagen SVG 
          imageminGifsicle(),
        ]
      });
      console.log(`Se ha optimizado la imagen: ${file}`);

    }
    console.log("Se ha terminado la optimización de todas tus imágenes");
  } catch (error) {
    console.error(error);
  }
}

processImg(); 