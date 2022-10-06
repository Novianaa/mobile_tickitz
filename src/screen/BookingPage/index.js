import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet, TextInput, Pressable, ActivityIndicator, FlatList, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ebu from '../../assets/image/ebu.png'
import hiflix from '../../assets/image/hilix.png'
import cineone from '../../assets/image/cineone21.png'
import { useDispatch, useSelector } from 'react-redux';
// import { BookingSeat } from '../../redux/actions/Booking'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookingSeat } from '../../redux/actions/BookingSeat'


const initialState = {
  movie_id: '',
  schedule_id: '',
  date: '',
  time: '',
}
function BookingPage(props) {
  console.log(props)
  const { data } = useSelector((s) => s.seat)
  const dispatch = useDispatch()
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  let [topSideSeat, setTopSideSeat] = useState([1, 2, 3, 4, 5, 6, 7]);
  let [soldSeat, setSoldSeat] = useState([])
  const [selectedSeat, setSelectedSeat] = useState([])
  const [querySchedule, setQuerySchedule] = useState(initialState)
  querySchedule.movie_id = props.route.params.dataMovie[0].id
  querySchedule.schedule_id = props.route.params.schedule.id
  querySchedule.date = props.route.params.dateSchedule
  querySchedule.time = props.route.params.timeSchedule

  useEffect(() => {
    dispatch(BookingSeat(querySchedule.movie_id, querySchedule.schedule_id, querySchedule.date, querySchedule.time))
  }, [dispatch, querySchedule.movie_id, querySchedule.schedule_id, querySchedule.date, querySchedule.time])
  soldSeat = data
  // console.log(soldSeat, 'ccca')

  const handleSelectedSeat = (data) => {
    if (selectedSeat.includes(data)) {
      const seat = selectedSeat.filter(x => {
        return x !== data
      });
      setSelectedSeat(seat)
    } else {
      setSelectedSeat([...selectedSeat, data])
    }
  }
  const dataBooking = { ...props.route.params, seats: selectedSeat }
  const { dataMovie, schedule, dateSchedule, timeSchedule } = dataBooking
  const dataForOrder = {

  }
  const handleCheckOut = async () => {

    if (!selectedSeat.length) {
      ToastAndroid.show("You haven't chosen a seat yet", ToastAndroid.LONG)
    }
    else {
      let token = await AsyncStorage.getItem('token')
      // axios.post(`https://backend-tickitz.vercel.app/api/v1/booking`, `Bearer ${token}`, dataBooking)
      axios({
        method: "POST",
        url: `https://backend-tickitz.vercel.app/api/v1/booking`,
        headers: {
          authorization: `Bearer ${token}`
        },
        data: {
          movie_id: dataBooking.dataMovie[0].id,
          date: dataBooking.dateSchedule,
          time: dataBooking.timeSchedule,
          schedule_id: dataBooking.schedule.id,
          seat: dataBooking.seats,
        },
      })
        .then((res) => {
          const result = res.data
          props.navigation.navigate('Payment', { result })
        }).catch((err) => {
          // console.log(err)
          Alert.alert(err.response.data.msg)
        })
    }
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.textChoose}>Choose your seat</Text>
        <View style={styles.cardSeat}>
          <View style={styles.borderLine} />
          {listSeat.map((seats, index) => {
            return (
              <View style={styles.topSide} key={index}>
                {topSideSeat.map((data, index) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.seat,
                        soldSeat.includes(`${seats}${data}`)
                          ? styles.seatSold
                          : selectedSeat.includes(`${seats}${data}`)
                            ? styles.seatSelected
                            : styles.seatAvailable,
                      ]}
                      onPress={() => {
                        soldSeat.includes(`${seats}${data}`) ? null : handleSelectedSeat(`${seats}${data}`);
                      }} key={index}
                    />

                  )
                })}
              </View>
              // </View>
            )
          })}


          <View style={styles.wrapperInfoKey}>
            <Text style={styles.textSeatingKey}>Seating Key</Text>

            <View style={styles.wrapperSeatKeyText}>
              <View style={[styles.seatKeyInfoText, styles.seatKeyAbjad]}>
                <Icon
                  name="arrow-down"
                  size={20}
                  color="#14142B"
                  style={styles.icon}
                />
                <Text style={styles.keyText}>A - G</Text>
              </View>
              <View style={styles.seatKeyInfoText}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="#14142B"
                  style={styles.icon}
                />
                <Text style={styles.keyText}>1 - 7</Text>
              </View>
            </View>

            <View style={styles.boxWrapperSeat}>
              <View style={[styles.boxSeat, styles.available]}>
                <View style={styles.boxSeatAvailable} />
                <Text style={styles.textKeyAlphabet}>Available</Text>
              </View>
              <View style={styles.boxSeat}>
                <View style={styles.boxSeatSelected} />
                <Text style={styles.textKeyAlphabet}>Selected</Text>
              </View>
            </View>
            <View style={styles.boxSeat}>
              <View style={styles.boxSeatSold} />
              <Text style={styles.textKeyAlphabet}>Sold</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.textOrderInfo}>Order Info</Text>
          <View style={styles.cardOrderInfo}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={
                      (dataBooking.schedule.cinema === 'Ebu.id' && ebu) ||
                      (dataBooking.schedule.cinema === 'CineOne 21' && cineone) ||
                      (dataBooking.schedule.cinema === 'Hiflix' && hiflix)
                    }
                    style={styles.imageCinema}
                  />
                </View>
                <Text style={styles.textCinema}>{schedule.cinema}</Text>
                <Text style={styles.textMovieName}>{dataBooking.dataMovie[0].title}</Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                <View style={styles.contentWrapper}>
                  <Text style={styles.textInnerLeft}>
                    {moment(dateSchedule).format('MMMM DD, YYYY')}
                  </Text>
                  <Text style={styles.textInnerRight}>
                    {dataBooking.timeSchedule}
                  </Text>
                </View>
                <View style={styles.contentWrapper}>
                  <Text style={styles.textInnerLeft}>One ticket price</Text>
                  <Text style={styles.textInnerRight}>
                    {`$ ${dataBooking.schedule.price}`}
                  </Text>
                </View>
                <View style={styles.contentWrapper}>
                  <Text style={styles.textInnerLeft}>Seat choosed</Text>
                  <Text
                    style={
                      styles.textInnerRight}>
                    {dataBooking.seats.join(', ')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.contentWrapper, styles.morePadding]}>
              <Text style={styles.textTotal}>Total Payment</Text>
              <Text style={styles.textTotalPrice}>
                {!dataBooking.seats.length
                  ? `$ ${dataBooking.schedule.price}`
                  : `$ ${dataBooking.seats.length * dataBooking.schedule.price}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonResetSeat}
            activeOpacity={1}>
            <Text style={styles.textResetSeat}>Reset seat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCheckout}
            activeOpacity={1}>
            <Text style={styles.textCheckout} onPress={handleCheckOut}>Checkout now</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Footer /> */}
    </ScrollView >
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
    marginHorizontal: 10,


  },
  innerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  textChoose: {
    fontSize: 18,
    lineHeight: 34,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#14142B',
    marginBottom: 16,
  },
  cardSeat: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    marginBottom: 26,
    borderRadius: 6,
  },
  borderLine: {
    borderRadius: 6,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#9570FE',
    marginBottom: 16,
  },
  wrapperInfoKey: {
    marginTop: 24,
  },
  textSeatingKey: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 1,
    color: '#000000',
  },
  wrapperSeatKeyText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 67,
  },
  seatKeyInfoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  seatKeyAbjad: {
    marginRight: 73,
  },
  icon: {
    marginRight: 8,
  },
  keyText: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#4E4B66',
  },
  boxWrapperSeat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  boxSeat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  available: {
    marginRight: 40,
  },
  boxSeatAvailable: {
    width: 20,
    height: 20,
    backgroundColor: '#D6D8E7',
    borderRadius: 4,
    marginRight: 8,
  },
  boxSeatSelected: {
    width: 20,
    height: 20,
    backgroundColor: '#5F2EEA',
    borderRadius: 4,
    marginRight: 8,
  },
  boxSeatSold: {
    width: 20,
    height: 20,
    backgroundColor: '#6E7191',
    borderRadius: 4,
    marginRight: 8,
  },
  textKeyAlphabet: {
    color: '#4E4B66',
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 22,
    fontWeight: '400',
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttonResetSeat: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#5F2EEA',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 100,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  textResetSeat: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#5F2EEA',
  },
  buttonCheckout: {
    backgroundColor: '#5F2EEA',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5F2EEA',
    borderRadius: 4,
    minWidth: 150,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  textCheckout: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#ffffff',
  },
  wrapperSeats: {

  },
  topSide: {
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seat: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  seatAvailable: {
    backgroundColor: '#d6d8e7',
  },
  seatSelected: {
    backgroundColor: '#5f2eea',
  },
  seatSold: {
    backgroundColor: '#6e7191',
  },
  textOrderInfo: {
    fontSize: 18,
    lineHeight: 34,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#14142B',
    marginBottom: 16,
  },
  cardOrderInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 15,

  },
  imageWrapper: {
    width: 100,
    height: 40,
  },
  imageCinema: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textCinema: {
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: 1,
    textAlign: 'center',
    // fontWeight: '600',
    fontFamily: 'Mulish-Regular',
    color: '#14142B',
    marginVertical: 6,
  },
  textMovieName: {
    color: '#14142B',
    // fontWeight: '600',
    fontFamily: 'Mulish-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInnerLeft: {
    fontSize: 14,
    // fontWeight: '400',
    fontFamily: 'Mulish-Regular',
    lineHeight: 24,
    letterSpacing: 1,
    color: '#6b6b6b',
  },
  textInnerRight: {
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 24,
    // fontWeight: '600',
    fontFamily: 'Mulish-Regular',
    color: '#14142B',
  },
  morePadding: {
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    borderStyle: 'solid',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textTotal: {
    color: '#000000',
    fontSize: 18,
    // fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 1,
    fontFamily: 'Mulish-ExtraBold',

  },
  textTotalPrice: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: '#5F2EEA',
    fontFamily: 'Mulish-ExtraBold',

  },
})
export default BookingPage;
