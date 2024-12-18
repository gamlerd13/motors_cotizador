import React from "react";
import { data } from "./data";

import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { CotizacionGet } from "@/models/cotizacion";
import { getDateHour } from "@/lib/main";
import { table } from "console";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: "Roboto",
  },
  boldText: {
    fontWeight: "bold",
  },
  headerContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  startLogo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  endLogo: {
    flex: 3,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  date: {
    fontSize: 12,
    marginBottom: 2,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  companyInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Esto mantiene el espacio entre los subcontenedores
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },

  cellCompanyInfo: {
    paddingLeft: 5,
    // El contenedor ajustará su tamaño al contenido
    flexShrink: 1, // Permite que el contenedor se reduzca si es necesario
    flexGrow: 0, // Evita que crezca para ocupar más espacio que el necesario
  },
  companyInfo: {
    fontSize: 10,
  },
  clientInfoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 10,
    marginBottom: 8,
    paddingBottom: 5,
  },
  clientInfoHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
    marginBottom: 5,
  },
  clientInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellClientInfoLeft: {
    flex: 2,
    paddingLeft: 5,
  },
  cellClientInfoRight: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  termsInfoSection: {
    flexDirection: "row",
  },
  termsInfoContainer: {
    fontSize: 10,
    marginBottom: 8,
    paddingBottom: 5,
  },
  termsInfoHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
    marginBottom: 10,
  },
  termsInfo: {
    paddingLeft: 5,
    flexDirection: "column",
  },

  totalPrice: {
    flexDirection: "row",
    paddingRight: 15,
    marginBottom: 5,
    justifyContent: "flex-end",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  cellTotalPrice: {
    paddingLeft: 15,
  },
  tableFooter: {
    flexDirection: "row",
    marginBottom: 9,
    marginRight: 15,
    justifyContent: "flex-end",
    fontSize: 8,
  },
  all: {
    fontSize: 10,
  },
  table: {
    paddingBottom: 5,
  },
  tableHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  itemDescription: {
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  cellFlex: {
    textAlign: "center",
  },
});

const ReactPdfComponent = ({ cotizacion }: { cotizacion: CotizacionGet }) => {
  const {
    companyPhone,
    companyEmail,
    client,
    clientName,
    clientContact,
    clientReference,
    clientRuc,
    code,
    date,
    deliverTime,
    paymentCondition,
    offerValidity,
    warranty,
    bankAccountNumber,
    totalPrice,
    currencyType,
    items,
  } = cotizacion;

  const formattedDate = getDateHour(date);
  const formattedTotalPrice = totalPrice.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const itemsFormatted = items.map((item) => ({
    ...item,
    unitPrice: item.unitPrice.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    totalPrice: item.totalPrice.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }));
  const currencySymbol = currencyType === "SOLES" ? "S/." : "$";

  return (
    <Document style={styles.all}>
      <Page style={styles.page}>
        <View style={styles.startLogo} fixed>
          <Image src="/logo1.jpg" style={{ width: 165, height: 22 }} />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{formattedDate[0]}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, styles.boldText]}>
              COTIZACIÓN No {code}
            </Text>
          </View>
        </View>

        <View style={styles.companyInfoContainer}>
          <View style={styles.cellCompanyInfo}>
            <Text style={styles.companyInfo}>Razón social: MOVENTO S.A.C.</Text>
            <Text style={styles.companyInfo}>RUC: 20611599308</Text>
            <Text style={styles.companyInfo}>
              Calle Parque San Martin 376 - Pueblo Libre
            </Text>
          </View>
          <View
            style={[
              styles.cellCompanyInfo,
              {
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Text style={styles.companyInfo}>Telefono: {companyPhone}</Text>
            <Text style={[styles.companyInfo]}>
              Correo: <Text style={{ color: "#00109e" }}>{companyEmail}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.clientInfoContainer}>
          <Text style={styles.clientInfoHeader}>CLIENTE:</Text>
          <View style={styles.clientInfo}>
            <View style={styles.cellClientInfoLeft}>
              <Text>Razón social: {client?.name}</Text>
              <Text>Contacto: {client?.contact}</Text>
              <Text>Referencia: {client?.reference}</Text>
            </View>
            <View style={styles.cellClientInfoRight}>
              <Text>RUC: {client?.ruc}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Item
            </Text>
            <Text style={[styles.tableCell, { flex: 10 }]}>Descripción</Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Cant.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              P.U.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
              Precio total {currencySymbol}
            </Text>
          </View>
          {itemsFormatted.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.key}
              </Text>
              <View
                style={[
                  styles.tableCell,
                  { flexDirection: "column", flex: 10 },
                ]}
              >
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={{ fontSize: 8.5 }}>{item.model}</Text>
              </View>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.amount}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.unitPrice}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {item.totalPrice}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalPrice}>
          <Text style={styles.cellTotalPrice}>
            PRECIO DE VENTA TOTAL (NO INCLUYE I.G.V.){" "}
          </Text>
          <Text style={styles.cellTotalPrice}>
            {" "}
            {currencySymbol} {formattedTotalPrice}{" "}
          </Text>
        </View>

        <View style={styles.tableFooter}>
          <Text>TIEMPO DE ENTREGA: </Text>
          <Text>{deliverTime}</Text>
        </View>
        <View style={styles.termsInfoContainer}>
          <Text style={styles.termsInfoHeader}>CONDICIONES COMERCIALES:</Text>
          <View style={styles.termsInfoSection}>
            <View style={{ flex: 9 }}>
              <View style={styles.termsInfo}>
                <Text style={styles.boldText}>CONDICIÓN DE PAGO: </Text>
                <Text>{paymentCondition || "A tratar"}.</Text>
              </View>
              <View style={styles.termsInfo}>
                <Text style={styles.boldText}>VALIDEZ DE LA OFERTA: </Text>
                <Text>{offerValidity}</Text>
              </View>
              <View style={styles.termsInfo}>
                <Text style={styles.boldText}>GARANTIA: </Text>
                <Text>{warranty}</Text>
              </View>
              <Text style={[styles.termsInfo, styles.boldText]}>
                No CUENTA BANCARIA DE MOVENTO S.A.C.
              </Text>
              <Text style={[styles.termsInfo, { fontSize: 8 }]}>
                {bankAccountNumber}
              </Text>
            </View>
            <View style={styles.endLogo}>
              <Image
                src="/logo_movento_drives.png"
                style={{ width: 90, height: 115 }}
              />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReactPdfComponent;
