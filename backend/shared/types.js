/**
 * Services type definition.
 * @typedef {Object} ServicesType
 * @property {string} id - Service ID.
 * @property {any} _id - Service MongoDB ID.
 * @property {string} operatorId - Associated user ID.
 * @property {string} businessName - Business name.
 * @property {string} contactPersonsName - Contact person's name.
 * @property {number} fuelSurcharge - Fuel surcharge.
 * @property {string} businessEmailAddress - Business email.
 * @property {string} website - Business website.
 * @property {string} city - City.
 * @property {string} country - Country.
 * @property {string} description - Service description.
 * @property {string} type - Service type.
 * @property {number} kiloMeters - Adult count.
 * @property {number} kiloGrams - Child count.
 * @property {string[]} facilities - Facilities.
 * @property {number} totalCosts - Total costs.
 * @property {number} AccessorialCharges - Accessorial charges.
 * @property {string[]} imageUrls - Image URLs.
 * @property {Date} lastUpdated - Last updated date.
 * @property {BookingType[]} bookings - Bookings.
 */

/**
 * Booking type definition.
 * @typedef {Object} BookingType
 * @property {string} id - Booking ID.
 * @property {string} _id - Booking MongoDB ID.
 * @property {string} userId - Associated user ID.
 * @property {string} firstName - User first name.
 * @property {string} lastName - User last name.
 * @property {string} email - User email.
 * @property {number} adultCount - Adult count.
 * @property {number} childCount - Child count.
 * @property {Date} checkIn - Check-in date.
 * @property {Date} checkOut - Check-out date.
 * @property {number} totalCost - Total cost.
 */

/**
 * Services search response type definition.
 * @typedef {Object} ServicesSearchResponse
 * @property {ServicesType[]} data - Services data.
 * @property {Object} pagination - Pagination information.
 * @property {number} pagination.total - Total services.
 * @property {number} pagination.page - Current page.
 * @property {number} pagination.pages - Total pages.
 */

/**
 * Payment intent response type definition.
 * @typedef {Object} PaymentIntentResponse
 * @property {string} paymentIntentId - Payment intent ID.
 * @property {string} clientSecret - Client secret.
 * @property {number} totalCost - Total cost.
 */


// No exports in this file as it's for documentation purposes only.