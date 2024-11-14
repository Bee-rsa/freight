const express = require('express');
const Services = require('../models/services');
const { param, validationResult } = require('express-validator');
const Stripe = require('stripe');
const verifyToken = require('../middleware/verifyTokens');

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const router = express.Router();

// Search services
router.get('/search', async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);
    const sortOptions = getSortOptions(req.query.sortOption);
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page || 1);
    const skip = (pageNumber - 1) * pageSize;

    const services = await Services.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Services.countDocuments(query);

    const response = {
      data: services,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get service by ID
router.get('/:id', [param('id').notEmpty().withMessage('Service ID is required')], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const service = await Services.findById(req.params.id);
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching service' });
  }
});

// Create payment intent
router.post('/:servicesId/bookings/payment-intent', verifyToken, async (req, res) => {
  const { numberOfNights } = req.body;
  const servicesId = req.params.servicesId;

  try {
    const service = await Services.findById(servicesId);
    if (!service) {
      return res.status(400).json({ message: 'Service not found' });
    }

    const totalCost = service.totalCosts * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'ZAR',
      metadata: {
        servicesId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: 'Error creating payment intent' });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Book service
router.post('/:servicesId/bookings', verifyToken, async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: 'Payment intent not found' });
    }

    if (
      paymentIntent.metadata.servicesId !== req.params.servicesId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: 'Payment intent mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: `Payment intent not succeeded. Status: ${paymentIntent.status}` });
    }

    const newBooking = {
      ...req.body,
      userId: req.userId,
    };

    const service = await Services.findOneAndUpdate(
      { _id: req.params.servicesId },
      {
        $push: { bookings: newBooking },
      },
      { new: true }
    );

    if (!service) {
      return res.status(400).json({ message: 'Service not found' });
    }

    await service.save();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Construct search query
function constructSearchQuery(queryParams) {
  const query = {};

  if (queryParams.destination) {
    query.$or = [
      { city: new RegExp(queryParams.destination, 'i') },
      { country: new RegExp(queryParams.destination, 'i') },
    ];
  }

  if (queryParams.adultCount) {
    query.adultCount = { $gte: parseInt(queryParams.adultCount) };
  }

  if (queryParams.childCount) {
    query.childCount = { $gte: parseInt(queryParams.childCount) };
  }

  if (queryParams.facilities) {
    query.facilities = {
      $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    query.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const AccessorialCharges = Array.isArray(queryParams.stars) ? queryParams.stars.map((star) => parseInt(star)) : parseInt(queryParams.stars);
    query.AccessorialCharges = { $in: AccessorialCharges };
  }

  if (queryParams.maxPrice) {
    query.baseRate = { $lte: parseInt(queryParams.maxPrice) };
  }

  return query;
}

// Get sort options
function getSortOptions(sortOption) {
  switch (sortOption) {
    case 'AccessorialCharges':
      return { AccessorialCharges: -1 };
    case 'baseRateAsc':
      return { baseRate: 1 };
    case 'baseRateDesc':
      return { baseRate: -1 };
    default:
      return {};
  }
}

module.exports = router;