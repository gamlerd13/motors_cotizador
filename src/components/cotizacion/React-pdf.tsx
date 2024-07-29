import React from "react";
import { data } from "./data";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { CotizacionGet } from "@/models/cotizacion";
import { getDateHour } from "@/lib/main";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  header: {
    backgroundColor: "#1E3A8A", // bg-blue-950
    color: "#fff",
    padding: 5,
    fontWeight: "bold",
  },
  image: {
    alignSelf: "center",
    marginVertical: 10,
  },
  all: {
    fontSize: 10,
  },
});

const ReactPdfComponent = ({ cotizacion }: { cotizacion: CotizacionGet }) => {
  const {
    client,
    clientName,
    clientContact,
    clientReference,
    clientRuc,
    code,
    date,
    deliverTime,
    paymentCondition,
    totalPrice,
    items,
  } = cotizacion;

  console.log(items);

  return (
    <Document style={styles.all}>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>OFERTA TÉCNICO COMERCIAL</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.cell}>Numero de Cotización: </Text>
            <Text style={[styles.cell, { fontWeight: "medium" }]}>{code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Fecha: </Text>
            <Text style={[styles.cell, { fontWeight: "medium" }]}>
              {getDateHour(cotizacion.date)[0]} -{" "}
              {getDateHour(cotizacion.date)[1]}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={[styles.cell, { flex: 1 }]}>
              <Text>Razón social: MOVENTO S.A.C.</Text>
              <Text>RUC: 20611599308</Text>
              <Text>Calle Parque San Martin 376 - Pueblo Libre</Text>
            </View>
            <View style={[styles.cell, { flex: 1 }]}>
              <Text>Telefono: 902196904</Text>
              <Text>
                Correo:{" "}
                <Text style={{ color: "#1E3A8A" }}>
                  ventas@moventodrives.com
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Cliente:</Text>
            <Text style={styles.cell}>{client?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Ruc:</Text>
            <Text style={styles.cell}>{client?.ruc}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Refencia:</Text>
            <Text style={styles.cell}>{client?.reference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Contacto:</Text>
            <Text style={styles.cell}>{client?.contact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Item</Text>
            <Text style={styles.cell}>Descripción</Text>
            <Text style={styles.cell}>Cant.</Text>
            <Text style={styles.cell}>Precio total S/.</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.key}</Text>
              <View style={[styles.cell, { flexDirection: "column" }]}>
                <Text style={{ fontWeight: "medium" }}>{item.description}</Text>
                <Text>Modelo: {item.model}</Text>
              </View>
              <Text style={styles.cell}>{item.amount}</Text>
              <Text style={styles.cell}>{item.totalPrice}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.cell}></Text>
            <Text style={[styles.cell, { flex: 2 }]}>
              PRECIO DE VENTA TOTAL (NO INCLUYE I.G.V.)
            </Text>
            <Text style={[styles.cell, { fontWeight: "medium" }]}>
              S/. {totalPrice}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Condiciones Comerciales</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>PLAZO DE ENTREGA:</Text>
            <Text style={styles.cell}>{deliverTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>CONDICIÓN DE PAGO:</Text>
            <Text style={styles.cell}>{paymentCondition}</Text>
          </View>
        </View>

        <View style={styles.image}>
          <Image src="/logo.png" style={{ width: 100, height: 100 }} />
        </View>
      </Page>
    </Document>
  );
};

export default ReactPdfComponent;
