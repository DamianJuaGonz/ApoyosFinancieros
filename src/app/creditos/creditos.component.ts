import { Component, Input } from '@angular/core';
import { Creditosp1Component } from '../creditosp1/creditosp1.component';
import { Creditosp2Component } from '../creditosp2/creditosp2.component';
import { Creditosp3Component } from '../creditosp3/creditosp3.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creditos',
  imports: [Creditosp1Component,Creditosp2Component,Creditosp3Component],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
  /*
bannerData = {
  title: "Soluciones Financieras",
  description: "Encuentra las mejores opciones crediticias para tus necesidades personales y empresariales",
  aquaBoxText: "Nuevo",
  navyBoxText: "Oferta 2023",
  whiteSectionText: "Nuestro equipo de asesores está listo para ayudarte a encontrar el producto financiero que mejor se adapte a tus necesidades. Contáctanos para una consulta gratuita y sin compromiso.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
};
sectionData = {
  title: "Nuestros Valores",
  backgroundImage: "assets/images/team-background.jpg",
  leftBox: {
    title: "Compromiso",
    items: [
      "Excelencia en servicio",
      "Soporte 24/7",
      "Soluciones personalizadas"
    ]
  },
  rightBox: {
    title: "Ventajas",
    items: [
      "Tasas competitivas",
      "Proceso rápido",
      "Asesoría especializada"
    ]
  }
};

blockData = {
  grayText: "Este es el contenido del bloque gris centrado. Puede incluir cualquier texto descriptivo.",
  blueText: "Este es el contenido del bloque azul. El color ayuda a destacar información importante.",
  spaceSize: "120px" // Tamaño personalizado para los espacios
};
*/

private datosCreditos = {
    grupal: {
      bannerData : {
  title: "Plan de credito grupal",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Un crédito diseñado para apoyar a grupos de personas (de 6 a 10 integrantes) que desean financiar sus actividades productivas en conjunto.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)", 
      "Comprobante domiciliario no mayor a 3 meses de actualización.", 
      "Deposito en garantia.", 
      "Internamente se debe realizar todo el procedimiento que se lleva a cabo para autorizar los créditos en trámite."
    ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Tener negocio propio o actividad laboral comprobable.", 
      "Ser verificada en domicilio y actividad.", 
      "Tener compromiso de ahorrar cada semana para favorecer el incremento del monto de su préstamo, monto mínimo de 20 pesos en adelante.",
       "El número de integrantes permitido es de 6 a máximo 10 integrantes."
    ]
  }
},

blockData : {
  grayText: "Nota: En este préstamo se avalan entre todas las solicitantes, firmando una hoja compromiso de pagare grupal, donde todas se comprometen a pagar en caso de que alguna quede mal.",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


}
,
    personal: {
      bannerData : {
  title: "Plan de credito personal",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Ideal para quienes buscan cubrir necesidades como educación, salud, mejoras en el hogar, adquisición de bienes o imprevistos, con pagos cómodos y atención personalizada.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)",
      "Comprobante domiciliario no mayor a 3 meses de actualización.",
      "Aval y referencia personal."
        ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Actividad laboral comprobable.",
      "Ser verificada en domicilio y actividad.",
      "Antiguedad laboral de un año."
    ]
  }
},

blockData : {
  grayText: "",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


},
 

      flujo: {
      bannerData : {
  title: "Plan de credito de Nomina",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Un crédito diseñado para trabajadores que reciben su salario a través de una cuenta bancaria, permitiéndoles acceder a financiamiento de forma sencilla, con descuentos automáticos vía nómina y sin necesidad de aval.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)",
      "Comprobante via nomina de los ultimos dos meses.",
      "Comprobante de domicilio."
    ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Tener negocio propio o actividad laboral comprobable.", 
      "Ser verificada en domicilio y actividad.",
      "Antiguedad laboral de un año."
    ]
  }
},

blockData : {
  grayText: "",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


},
   

      incremento: {
      bannerData : {
  title: "Plan de credito para incremento",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Un financiamiento dirigido a clientes con buen historial que desean aumentar su monto de crédito para continuar impulsando sus proyectos o necesidades personales.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)",
       "Comprobante domiciliario no mayor a 3 meses de actualización.",
        "Antiguedad laboral de un año."
    ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Tener negocio propio o actividad laboral comprobable.", "Ser verificada en domicilio y actividad."
    ]
  }
},

blockData : {
  grayText: "",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


},
  


      comercial: {
      bannerData : {
  title: "Plan de credito comercial",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Un crédito diseñado para negocios y empresas que buscan impulsar su crecimiento, adquirir inventario, mejorar infraestructura o cubrir necesidades operativas, con plazos y montos adaptados a su capacidad financiera.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)",
      "Comprobante domiciliario no mayor a 3 meses de actualización.",
      "Aval y referencia personal."
    ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Actividad laboral comprobable.",
      "Ser verificada en domicilio y actividad.",
      "Antiguedad laboral de un año "
    ]
  }
},

blockData : {
  grayText: "",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


},
   

      consumo: {
      bannerData : {
  title: "Plan de credito al consumo",
  description: "Haz realidad tus metas con nuestro crédito fácil y rápido",
  aquaBoxText: "Facil y rapido",
  navyBoxText: "En linea!",
  whiteSectionText: "Pensado para quienes desean comprar electrodomésticos, muebles, ropa, tecnología o cubrir gastos personales, con plazos flexibles y aprobación rápida.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
},
    sectionData : {
  title: "Conoce mas sobre este credito",
  backgroundImage: "img/image55.png",
  leftBox: {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)",
      "Comprobante domiciliario no mayor a 3 meses de actualización.",
      "Antiguedad laboral de un año.",
      "Aval y referencia personal."
    ]
  },
  rightBox: {
    title: "Condiciones",
    items: [
      "Actividad laboral comprobable.",
      "Ser verificada en domicilio y actividad.",
      "Antiguedad laboral de un año"
    ]
  }
},

blockData : {
  grayText: "",
  blueText: "Rellena la solicitud en linea",
  spaceSize: "120px" // Tamaño personalizado para los espacios
}


}
  };

 bannerData: any;
  sectionData: any;
  blockData: any;

  constructor(private route: ActivatedRoute) {
    // Obtener el tipo de crédito desde "data"
    const tipo = this.route.snapshot.data['tipo'] as keyof typeof this.datosCreditos;;
    
    // Cargar los datos correspondientes
    const datos = this.datosCreditos[tipo];
    this.bannerData = datos.bannerData;
    this.sectionData = datos.sectionData;
    this.blockData = datos.blockData;
  }

}
