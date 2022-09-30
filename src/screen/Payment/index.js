import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../redux/actions/User'

function Payment(props) {
  console.log(props.route.params.result.data, '78')
  const { data } = useSelector((s) => s.user)
  const [dataBody, setDataBody] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProfile())
  }, [dispatch])
  const handlePayment = async () => {
    let token = await AsyncStorage.getItem('token')
    let id = props.route.params.result.data.id
    await axios({
      method: "PATCH",
      url: `https://backend-tickitz.vercel.app/api/v1/booking/${id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: {
        status_payment: dataBody.status_payment,
        payment_method: dataBody.payment_method,
      }
    })
      .then((res) => {
        console.log(`https://backend-tickitz.vercel.app/api/v1/booking/${id}`)
        console.log(res, 'q1q1')
        if (res.data.status === 200) {
          Alert.alert('Successful payment')
        }
      }).catch((err) => {
        console.log(`https://backend-tickitz.vercel.app/api/v1/booking/${id}`)

        console.log(err)
        Alert.alert(err.response.data.msg)
      })
  }
  const handleInput = (value) => {
    setDataBody({ status_payment: 'success', payment_method: value });
  };
  console.log(data, dataBody.payment_method, '89')
  return (
    <ScrollView>
      <View style={styles.wrapperTotalPayment}>
        <Text style={styles.textTax}>Total Payment</Text>
        <Text style={styles.tax}>$ {props.route.params.result.data.total_payment}</Text>
      </View>
      <View style={styles.wrapperPaymentMethod}>
        <Text style={styles.textPayment}>Payment Method</Text>
        <View style={styles.wrapperCardPaymentMethod}>
          <View style={styles.wrapperPaymentImg}>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('Dana')} >
              <Image source={require('../../assets/image/dana.png')} style={styles.imgPayment} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('OVO')}>
              <Image source={require('../../assets/image/ovo.png')} style={styles.imgPayment} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperPaymentImg}>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('Gopay')}>
              <Image source={require('../../assets/image/gopay.png')} style={styles.imgPayment} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('Gpay')}>
              <Image source={require('../../assets/image/gpay.png')} style={styles.imgPayment} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperPaymentImg}>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('BCA')}>
              <Image source={require('../../assets/image/bca.png')} style={styles.imgPayment} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapperImgPayment} onPress={value => handleInput('BRI')}>
              <Image source={require('../../assets/image/bri.png')} style={styles.imgPayment} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.wrapperProfile}>
        <Text style={styles.textProfile}>Personal Info</Text>
        <View style={styles.wrapperCardProfile} >
          <Text style={styles.wrapperCardProfileLabel}>Full Name</Text>
          <Text style={styles.wrapperCardProfileText}>{`${data[0]?.first_name} ${data[0]?.last_name}`}</Text>
          <Text style={styles.wrapperCardProfileLabel}>Email</Text>
          <Text style={styles.wrapperCardProfileText}>{data[0]?.email}</Text>
          <Text style={styles.wrapperCardProfileLabel}>Phone Number</Text>
          <Text style={styles.wrapperCardProfileText}>{data[0]?.phone_number}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonPayment} >
        <Text style={styles.textButtonPayment} onPress={handlePayment}>Pay Your Order</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  wrapperTotalPayment: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '6%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTax: {
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
  },
  tax: {
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    color: 'black'
  },
  wrapperPaymentMethod: {
    marginHorizontal: '5%',
    marginVertical: '8%',
  },
  textPayment: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    marginVertical: '5%'
  },
  wrapperCardPaymentMethod: {
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: 20,

  },
  wrapperPaymentImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  wrapperImgPayment: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    margin: '1%',
    // padding: '2%',
    width: '47%',
    height: '90%',

  },
  imgPayment: {
    alignSelf: 'center',
    margin: '5%'
  },
  wrapperProfile: {
    marginHorizontal: '5%',
    marginVertical: '4%',
  },
  textProfile: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    marginVertical: '5%'
  },
  wrapperCardProfile: {
    backgroundColor: 'white',
    padding: '7%',
    borderRadius: 20
  },
  wrapperCardProfileLabel: {
    marginVertical: '5%',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
  },
  wrapperCardProfileText: {
    marginVertical: '2%',
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    color: 'black',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 10,
    padding: '4%',
  },
  buttonPayment: {
    backgroundColor: '#5F2EEA',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5F2EEA',
    borderRadius: 15,
    paddingVertical: '3%',
    margin: '5%'
  },
  textButtonPayment: {
    textAlign: 'center',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    color: 'white'
  }
})

export default Payment