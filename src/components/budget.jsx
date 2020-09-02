import React from 'react';
import {
  PDFDownloadLink,
  Page,
  Text,
  View, Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { Button } from 'antd';
import Logo from '../_assets/img/logo.png';
import { formatCurrency } from '../_utils/constats';

const styles = StyleSheet.create({
  page: {
    height: '100%',
    padding: '25px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '15%',
  },
  title: {
    width: '80%',
    fontSize: '11pt',
  },
  body: {
    paddingTop: '30px',
  },
  row: {
    flexDirection: 'row',
    flexGrow: 10,
    padding: '10px',
  },
  id: {
    textAlign: 'right',
    width: '2%',
    fontSize: '8pt',
    padding: '0 2px',
  },
  name: {
    textAlign: 'left',
    width: '53%',
    fontSize: '8pt',
    padding: '0 2px',
  },
  value: {
    textAlign: 'right',
    width: '15%',
    fontSize: '8pt',
    padding: '0 2px',
  },
  amount: {
    textAlign: 'right',
    width: '15%',
    fontSize: '8pt',
    padding: '0 2px',
  },
  total: {
    textAlign: 'right',
    width: '15%',
    fontSize: '8pt',
    padding: '0 2px',
  },
  footer: {
    marginTop: '20px',
    borderTop: '1px solid #ACACAC',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '8pt',
    textAlign: 'center',
  },
});

export default ({ items }) => (
  <PDFDownloadLink
    document={
      (
        <Document title='Budgeting' author='Budgetinf'>
          <Page style={styles.page}>
            <View style={styles.header}>
              <Image src={Logo} style={styles.logo} />
            </View>
            <View style={styles.body}>
              <View style={styles.header}>
                <Text style={{ fontSize: '11pt', padding: '5px' }}>ORÇAMENTO</Text>
              </View>
              <View style={{ ...styles.row, backgroundColor: '#8C52FF', color: '#FFFFFF' }}>
                <Text style={styles.id}>#</Text>
                <Text style={styles.name}>NOME</Text>
                <Text style={styles.value}>VALOR (R$)</Text>
                <Text style={styles.amount}>QUANT</Text>
                <Text style={styles.total}>TOTAL (R$)</Text>
              </View>
              {
                items.map((item, index) => (
                  <View key={index} style={{ ...styles.row, backgroundColor: index % 2 ? '#FFFFFF' : '#D7C3FF' }}>
                    <Text style={styles.id}>{index + 1}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.value}>{formatCurrency(item.value)}</Text>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.total}>{formatCurrency(item.value * item.amount)}</Text>
                  </View>
                ))
              }
            </View>
            <View
              style={{
                ...styles.row,
                backgroundColor: '#8C52FF',
                color: '#FFF',
                maxHeight: '30px',
              }}
            >
              <Text style={{ width: '85%', fontSize: '8pt', padding: '0 2px' }}>TOTAL</Text>
              <Text style={styles.total}>
                { formatCurrency(items.reduce((a, b) => a + (b.value * b.amount || 0), 0)) }
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Powered by Budgeting</Text>
            </View>
          </Page>
        </Document>
      )
    }
    fileName='budgeting.pdf'
  >
    {({ loading }) => <Button type='primary' size='large' icon='download' shape='round' loading={loading} disabled={loading || !items.length}>Baixar orçamento</Button>}
  </PDFDownloadLink>
);
