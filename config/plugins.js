export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // 2. Configuración de Email (Usando Resend vía SMTP)
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.resend.com', // Servidor de Resend
        port: 465,
        secure: true,
        auth: {
          user: 'resend',        // El usuario SIEMPRE es 'resend'
          pass: env('RESEND_API_KEY'), // Tu clave API
        },
      },
      settings: {
        defaultFrom: 'onboarding@resend.dev', // Usa este correo de prueba al principio
        defaultReplyTo: 'info@tuprimerhogar.es', // Cambia esto a tu correo de contacto
      },
    },
  },
});