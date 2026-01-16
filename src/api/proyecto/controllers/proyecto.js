'use strict';

/**
 * proyecto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::proyecto.proyecto', ({ strapi }) => ({
  
  // Sobreescribimos el método find (GET /api/proyectos)
  async find(ctx) {
    // 1. Obtenemos el usuario que hace la petición (viene del JWT)
    const user = ctx.state.user;

    // Si no hay usuario logueado, comportamiento estándar (o podrías devolver 401)
    if (!user) {
      return super.find(ctx);
    }

    // 2. Forzamos un filtro: solo proyectos donde este usuario esté en la lista de 'inversores'
    // Asumimos que llamaste al campo de relación 'inversores' en el paso 1.
    // Si se llama diferente, cambia 'inversores' por el nombre real.
    
    ctx.query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        inversores: {
          id: {
            $eq: user.id
          }
        }
      }
    };

    // 3. Ejecutamos la búsqueda con el filtro inyectado
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Opcional: Proteger también findOne para que no adivinen IDs de otros proyectos
  async findOne(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    if (user) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          inversores: {
            id: {
              $eq: user.id
            }
          }
        }
      };
    }

    return super.findOne(ctx);
  }
}));