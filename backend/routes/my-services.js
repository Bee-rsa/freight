const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const Services = require('../models/services');
const { verifyToken } = require('../middleware/verifyTokens');
const { body } = require('express-validator');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Post services
router.post(
  '/',
  verifyToken,
  [
    body('businessName').notEmpty().withMessage('Business name is required'),
    body('contactPersonsName').notEmpty().withMessage('Contact person name is required'),
    body('fuelSurcharge').notEmpty().withMessage('Fuel surcharge is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Service type is required'),
    body('totalCosts')
      .notEmpty()
      .isNumeric()
      .withMessage('Total costs are required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ],
  upload.array('imageFiles', 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newServices = req.body;

      const imageUrls = await uploadImages(imageFiles);
      newServices.imageUrls = imageUrls;
      newServices.lastUpdated = new Date();
      newServices.operatorId = req.operatorId;

      const service = new Services(newServices);
      await service.save();

      res.status(201).send(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

// Get all services
router.get('/', verifyToken, async (req, res) => {
  try {
    const services = await Services.find({ operatorId: req.operatorId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Get service by ID
router.get('/:id', verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const service = await Services.findOne({ _id: id, operatorId: req.operatorId });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service' });
  }
});

// Update service
router.put(
  '/:servicesId',
  verifyToken,
  upload.array('imageFiles'),
  async (req, res) => {
    try {
      const updatedServices = req.body;
      updatedServices.lastUpdated = new Date();

      const service = await Services.findOneAndUpdate(
        { _id: req.params.servicesId, operatorId: req.operatorId },
        updatedServices,
        { new: true }
      );

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const files = req.files;
      const updatedImageUrls = await uploadImages(files);

      service.imageUrls = [...updatedImageUrls, ...(updatedServices.imageUrls || [])];

      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

// Upload images to Cloudinary
async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

module.exports = router;