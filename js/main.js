import './validateForms.js';
import './uploadPhoto.js';
import { getData } from './serverData.js';
import { showErrorMessage, debounce } from './util.js';
import { renderGallery } from './renderPhotos.js';
import { init, getFilteredPictures} from './filterPhoto.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    const debouncedRenderGallery = debounce(renderGallery);
    init(photos, debouncedRenderGallery);
    renderGallery(getFilteredPictures());
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();
