import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0747a1",  
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#0747a1",  
    flexDirection: "row",
  },
  headerCell: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 9,
    width: 100,
    maxWidth: 100,
    flexWrap: "wrap",
  },
  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    fontSize: 8,
    width: 100,
    maxWidth: 100,
    flexWrap: "wrap",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  footer: {
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    marginTop: 10,
  },
});


const formatValue = (val) => {
  if (val === null || val === undefined) return "No disponible";
  if (typeof val === "boolean") return val ? "Activo" : "Inactivo";
  if (typeof val === "object") {
    if (val.nombre && val.apellido) return `${val.nombre} ${val.apellido}`;
    return JSON.stringify(val);
  }
  return String(val);
};

const getValueByPath = (obj, path) =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

export function PDF({ title = "", data = [], columns = [] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {columns.map((col, idx) => (
              <Text key={idx} style={styles.headerCell} numberOfLines={2}>
                {col.label}
              </Text>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.tableRow,
                rowIndex % 2 === 0 ? styles.evenRow : null,
              ]}
            >
              {columns.map((col, colIndex) => (
                <Text
                  key={colIndex}
                  style={styles.cell}
                  numberOfLines={3} // controla que texto largo se corte con ...
                >
                  {formatValue(getValueByPath(row, col.key))}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          {`Informe generado el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`}
        </Text>
      </Page>
    </Document>
  );
}

export default PDF;
