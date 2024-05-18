import {
  BaseDirectory,
  writeBinaryFile,
  createDir,
  exists,
} from "@tauri-apps/api/fs";
import { appConfigDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";

const uploadsPath = "uploads";
const imagePath = "images";
const audioPath = "audios";
const videoPath = "videos";
const tartilPath = "tartils";
const tarhimPath = "tarhims";
const adzanPath = "azans";

async function getBlobFromUrl(url: string): Promise<ArrayBuffer> {
  const obj = await (await fetch(url)).arrayBuffer();

  return obj;
}

export type File = {
  blobUrl: string,
  fileName: string,
}

async function saveFile(file: File, folder: string): Promise<string> {
  try {
    const blob = await getBlobFromUrl(file.blobUrl);
    const uploadPath = await join(uploadsPath, folder);

    await createDir(uploadPath, {
      dir: BaseDirectory.AppConfig,
      recursive: true,
    });

    const filePath = await join(uploadPath, file.fileName);

    await writeBinaryFile(filePath, new Uint8Array(blob), {
      dir: BaseDirectory.AppConfig,
      append: false,
    });

    return file.fileName;
  } catch (e) {
    throw e;
  }
}
export function saveImageFile(file: File): Promise<string> {
  return saveFile(file, imagePath);
}

export function saveAudioFile(file: File): Promise<string> {
  return saveFile(file, audioPath);
}

export function saveVideoFile(file: File): Promise<string> {
  return saveFile(file, videoPath);
}
export function saveTartilFile(file: File): Promise<string> {
  return saveFile(file, tartilPath);
}
export function saveTarhimFile(file: File): Promise<string> {
  return saveFile(file, tarhimPath);
}
export function saveAdzanFile(file: File): Promise<string> {
  return saveFile(file, adzanPath);
}

async function getFileFromUploads(fileName: string, folder: string): Promise<string | undefined> {
  try {
    const uploadPath = await join(uploadsPath, folder, fileName);

    if (await exists(uploadPath, { dir: BaseDirectory.AppConfig })) {
      const configDir = await appConfigDir();
      const url = await join(configDir, uploadPath);

      return convertFileSrc(url);
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function getImageFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, imagePath);
}

export function getAudioFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, audioPath);
}

export function getVideoFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, videoPath);
}
export function getTartilFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, tartilPath);
}
export function getTarhimFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, tarhimPath);
}
export function getAdzanFileFromUploads(fileName: string): Promise<string | undefined> {
  return getFileFromUploads(fileName, adzanPath);
}