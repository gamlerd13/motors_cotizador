import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

interface Servicio {
  id: number;
  linkName: string;
  link: string;
  description: string;
}

export default function LandingHome() {
  const servicios: Servicio[] = [
    {
      id: 1,
      linkName: "Cotizador",
      link: "/cotizar",
      description:
        "Cree cotizaciones precisas y detalladas para sus productos y servicios. Personalice cada aspecto para satisfacer las necesidades de sus clientes. ",
    },
    {
      id: 2,
      linkName: "Cotizaciones",
      link: "/cotizaciones",
      description:
        "Administre y revise todas las cotizaciones generadas. Mantenga un registro organizado y acceda fácilmente a cada cotización en cualquier momento.",
    },
    // {
    //   id: 3,
    //   linkName: "Clientes",
    //   link: "/clientes",
    //   description:
    //     "Gestione su base de datos de clientes de manera eficiente. Acceda rápidamente a la información de contacto y el historial de cotizaciones de cada cliente.",
    // },
  ];
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="/logo"
          height={100}
          radius="sm"
          src="/logo.png"
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-md">Movento S.A.C</p>
          <p className="text-small text-default-500">Sistema de cotización</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center gap-4 flex-wrap">
          {servicios.map((servicio) => (
            <Servicios key={servicio.id} servicio={servicio} />
          ))}
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
}

function Servicios({ servicio }: { servicio: Servicio }) {
  return (
    <Card className="w-[300px]">
      <CardBody>
        <span>{servicio.description}</span>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link showAnchorIcon href={`${servicio.link}`}>
          Ir a {servicio.linkName}
        </Link>
      </CardFooter>
    </Card>
  );
}
