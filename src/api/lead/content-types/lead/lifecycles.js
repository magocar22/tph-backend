export default {
  async afterCreate(event) {
    const { result } = event;

    // --- DIAGNÓSTICO EN CONSOLA ---
    console.log(">>> DATOS RECIBIDOS EN LIFECYCLE:", result);

    // --- LÓGICA BLINDADA ---
    // Buscamos el campo 'tipo'. Si no existe, probamos variantes comunes, si no, ponemos un texto fijo.
    // Esto evita que salga "undefined" en el correo.
    const tipoPerfil = result.tipo || result.Tipo || result.perfil || result.tipo_perfil || "NO ESPECIFICADO";
    
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'info@tuprimerhogar.es', // <--- TU EMAIL DONDE QUIERES RECIBIR EL AVISO
        from: 'onboarding@resend.dev',
        subject: `Nuevo Lead Web: ${tipoPerfil.toUpperCase()}`,
        text: `
          Nuevo contacto recibido en la web:
          
          Nombre: ${result.nombre}
          Email: ${result.email}
          Teléfono: ${result.telefono}
          
          >>> PERFIL: ${tipoPerfil} <<<
          
          Mensaje:
          ${result.mensaje}
        `,
        html: `
          <h3>Nuevo contacto recibido en la web</h3>
          <ul>
            <li><strong>Nombre:</strong> ${result.nombre}</li>
            <li><strong>Email:</strong> ${result.email}</li>
            <li><strong>Teléfono:</strong> ${result.telefono}</li>
            <li><strong>Perfil:</strong> <span style="color:blue; font-weight:bold;">${tipoPerfil}</span></li>
          </ul>
          <p><strong>Mensaje:</strong></p>
          <p>${result.mensaje}</p>
        `,
      });
      console.log(`✅ Email enviado correctamente. Perfil detectado: ${tipoPerfil}`);
    } catch (err) {
      console.log('❌ Error enviando email:', err);
    }
  },
};