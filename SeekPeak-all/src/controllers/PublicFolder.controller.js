import { Router } from 'express';

export const PublicFolderController = Router();

PublicFolderController.get('/uploads/:image', (req, res) => {
  const { img } = req.params;
  try {
    res.render(img);
  } catch (err) {
    throw { message: 'File not found!' };
  }
});
