import './renderPhotos.js';
import './validateForms.js';
import './changeEffects.js';
import { getData } from './serverData.js';
import { showErrorMessage } from './util.js';
import { createPhotoFeed } from './renderPhotos.js';

async function bootstrap() {
  try {
    const photos = await getData();
    createPhotoFeed(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

bootstrap();
