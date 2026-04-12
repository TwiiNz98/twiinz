/**
 * TWIINZ STUDIO — config.js
 * Fuente única de verdad para datos del negocio.
 * NUNCA hardcodear estos valores en otros archivos.
 */

'use strict';

window.TwiiNz = window.TwiiNz || {};

window.TwiiNz.CONFIG = {
  WA_NUMBER:    '+56950147783',
  WA_BASE_URL:  'https://wa.me/56950147783',
  EMAIL:        'joanromeroastorga98@gmail.com',
  INSTAGRAM_USER: 'twiinz_x',
  INSTAGRAM_URL:  'https://instagram.com/twiinz_x',
  GITHUB_URL:     'https://github.com',

  PRECIOS: {
    basico:  { usd: 99,  label: 'Landing Express' },
    starter: { usd: 149, label: 'Landing Profesional' },
    pro:     { usd: 399, label: 'Tienda Online' },
    elite:   { usd: 899, label: 'Sistema Web Integral' }
  },

  CONVERSION_USD_CLP: 950, // Tipo de cambio base — actualizable

  WA_MESSAGES: {
    general:  'Hola! Vi tu portfolio y quiero saber más',
    starter:  'Hola! Me interesa el plan Starter (Landing de Conversión $149)',
    pro:      'Hola! Me interesa el plan Pro (E-commerce SPA $399)',
    elite:    'Hola! Me interesa el plan Elite (Sistema Digital Completo $899)',
    contacto: 'Hola! Vi tu portfolio y quiero empezar mi proyecto'
  }
};
