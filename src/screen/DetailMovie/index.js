import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity, TouchableHighlight, LayoutAnimation, Pressable, FlatList, ToastAndroid, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { GetDetailMovie } from '../../redux/actions/Movie'
import { GetScheduleByMovieId } from '../../redux/actions/Schedule'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ebu from '../../assets/image/ebu.png'
import hiflix from '../../assets/image/hilix.png'
import cineone from '../../assets/image/cineone21.png'


const initialState = {
  movie_id: '',
  location: '',
  date: '',
};
function DetailMovie(props) {

  let { data, loading } = useSelector((s) => s.movie)
  let schedule = useSelector((s) => s.schedule)
  const dispatch = useDispatch()
  let [dateSchedule, setDateSchedule] = useState(new Date());
  const [querySchedule, setQuerySchedule] = useState(initialState);
  const [filter, setFilter] = useState([]);
  let { movie_id, location, date, page } = querySchedule
  querySchedule.movie_id = props.route.params.movie_id
  const [open, setOpen] = useState(false);
  const [timeSchedule, setTimeSchedule] = useState('');
  useEffect(() => {
    dispatch(GetDetailMovie(props.route.params.movie_id))
  }, [dispatch, props.route.params.movie_id])
  useEffect(() => {
    dispatch(GetScheduleByMovieId(querySchedule.movie_id, querySchedule.location, querySchedule.date, querySchedule.page))
  }, [dispatch, querySchedule.movie_id, querySchedule.location, querySchedule.date, querySchedule.page])
  const handleChooseDate = (value) => {
    let dateNow = new Date(Date.now()).toString();
    dateNow = moment(dateNow).format()
    console.log(dateNow, 'date')
    let chooseDate = new Date(Date.now(value)).toString();
    chooseDate = moment(chooseDate).format()
    if (chooseDate >= dateNow) {
      setDateSchedule(value);
    } else {
      ToastAndroid.show("You can't choose the previous date", ToastAndroid.LONG);
    }
  };
  querySchedule.date = moment(dateSchedule).format().split('T')[0]

  const handleLocation = value => {
    setQuerySchedule({ ...querySchedule, location: value, page: 1 });
  };
  const handleTime = (time, id) => {
    setTimeSchedule({
      id,
      timeSchedule: time,
    });
  };
  const passingData = {
    dataMovie: { ...data },
    dateSchedule: moment(dateSchedule).format().split('T')[0],
    timeSchedule: timeSchedule.timeSchedule,
  };
  const handleBooking = (data) => {
    if (!passingData.timeSchedule) {
      ToastAndroid.show("You must choose the time schedule", ToastAndroid.LONG)
    } else {
      props.navigation.navigate('BookingPage', { ...passingData, schedule: data });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <FlatList data={data}
        renderItem={({ item }) => {
          //console.log(item)
          return (
            <View style={styles.wrapperDetailMovie}>
              <View style={styles.wrapper}>
                <Image source={require('../../assets/image/Photo.png')} style={styles.film} />
              </View>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.genre}>{item.categories}</Text>
              <View style={styles.wrapperDetail}>
                <View style={styles.wrapperDetailLeft}>
                  <Text style={styles.textMuted}>Release date
                  </Text>
                  <Text style={styles.textActive}>{moment(item.release_date).format('MMMM DD, YYYY')}
                  </Text>
                  <Text style={styles.textMuted}>Duration
                  </Text>
                  <Text style={styles.textActive}>{item.duration}
                  </Text>
                </View>
                <View style={styles.wrapperDetailRight}>
                  <Text style={styles.textMuted}>Directed by
                  </Text>
                  <Text style={styles.textActive}>{item.director}
                  </Text>
                  <Text style={styles.textMuted}>Casts
                  </Text>
                  <Text style={styles.textActive}>{item.casts}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: '#DEDEDE', margin: '3%' }} />
              <View style={styles.wrapperSynopsis}>
                <Text style={styles.textMuted}>Synopsis
                </Text>
                <Text style={styles.textActive}>{item.synopsis}
                </Text>
              </View>
            </View>
          )
        }}
        keyExtractor={item => item.id} />
      <View style={styles.wrapperSchedule}>
        <Text style={styles.textTitle}>Showtimes and Tickets</Text>

        <View style={styles.wrapperPicker}>
          <View style={{ marginBottom: 12 }}>
            <DatePicker
              modal
              open={open}
              date={dateSchedule}
              fadeToColor="#FFFFFF"
              textColor="#000000"
              onConfirm={value => {
                setOpen(false);
                handleChooseDate(value);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <TouchableHighlight
              style={styles.buttonDate}
              onPress={() => setOpen(true)}
              underlayColor="none">
              <View>
                <Icon
                  name="calendar"
                  color="#4E4B66"
                  style={{ position: 'absolute', left: 18 }}
                  size={20}
                />
                <Text style={styles.buttonDateTitle}>
                  {dateSchedule ? (
                    new Date(dateSchedule).toISOString().split('T')[0]
                  ) : (
                    <Text>Set a Date</Text>
                  )}
                </Text>
                <Icon
                  name="chevron-down"
                  color="#4E4B66"
                  style={{ position: 'absolute', right: 18 }}
                  size={18}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View
            style={{
              backgroundColor: '#EFF0F6',
              borderRadius: 8,
            }}>
            <View>
              <Icon
                name="map-pin"
                color="#4E4B66"
                style={{ position: 'absolute', left: 18, top: 16 }}
                size={18}
              />
            </View>
            <Picker
              dropdownIconColor="#EFF0F6"
              selectedValue={querySchedule.location}
              onValueChange={value => handleLocation(value)}
              style={{
                color: '#4E4B66',
                marginLeft: 40,
              }} >
              <Picker.Item label="Set a city" enabled={false} />
              <Picker.Item label="Purwokerto" value="1" />
              <Picker.Item label="Solo" value="2" />
              <Picker.Item label="Jogja" value="3" />
            </Picker>
            <Icon
              name="chevron-down"
              color="#4E4B66"
              style={{ position: 'absolute', right: 18, top: 16 }}
              size={18}
            />
          </View>
        </View>
        {!querySchedule.location ? <Text style={styles.textMessageError}><Icon name='alert-triangle' style={{ color: '#F4B740', fontSize: 20 }} /> {schedule.error?.msg}</Text> : schedule.error?.data.length < 1 ? <Text style={styles.textMessageError}><Icon name='alert-triangle' style={{ color: '#F4B740', fontSize: 20 }} /> {schedule.error?.msg}</Text> :
          schedule.loading ?
            < ActivityIndicator size="large" color="#5F2EEA" style={{ margin: '5%' }} />
            : <FlatList data={schedule.data}
              renderItem={({ item }) => {
                return (
                  <View style={styles.wrapperCard}>
                    <View style={styles.wrapperCardHeader}>
                      <View style={styles.imageCard}>
                        <Image source={item.cinema === 'Ebu.id'
                          ? ebu
                          : item.cinema === 'Hiflix'
                            ? hiflix
                            : item.cinema === 'CineOne 21'
                              ? cineone : {
                                uri: 'https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg',
                              }} />
                      </View>
                      <Text style={styles.textCardHeader}>{item.county}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#DEDEDE', margin: '3%' }} />
                    <View style={styles.wrapperCardMain}>
                      {item.time?.map((x, index) => {
                        x = x?.slice(0, 5)
                        return (
                          <Text key={index} style={[
                            styles.timeSchedule,
                            item.id === timeSchedule.id &&
                            x === timeSchedule.timeSchedule &&
                            styles.timeScheduleActive,
                          ]}
                            onPress={() => handleTime(x, item.id)}>
                            {x >= '12:00' ? `${x} pm` : `${x} am`}
                          </Text>
                        )
                      })}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '5%' }}>
                      <Text>Price</Text>
                      <Text>$ {item.price}</Text>
                    </View>

                    <Pressable style={styles.buttonBook} >
                      <Text style={styles.buttonTextBook} onPress={() => handleBooking(item)}>Book Now</Text>
                    </Pressable>
                  </View>
                )
              }} />
        }

      </View>

    </ScrollView >
  )
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  wrapperDetailMovie: {
    padding: 20,
  }
  ,
  wrapper: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    backgroundColor: 'white',
    border: 1,
    boxSizing: 'borderBox',
    borderRadius: 9,
    alignItems: 'center',
    marginHorizontal: 85,
    marginVertical: 20
  },
  film: {
    margin: 15,
    borderRadius: 9,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5,
    color: 'black'
  },
  genre: {
    textAlign: 'center',
    fontSize: 18,
    margin: 15,

  },
  wrapperDetail: {
    flexDirection: 'row',
    padding: '3%',
    marginVertical: 15,

  },
  wrapperDetailLeft: {
    flex: 1,
  },
  wrapperDetailRight: {
    flex: 1,
  },
  textMuted: {
    fontFamily: 'mulish',
    fontSize: 18,
    letterSpacing: 0.5,
    marginBottom: '5%'
  },
  textActive: {
    color: '#121212',
    fontFamily: 'mulish',
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: '10%'

  },
  wrapperSynopsis: {
    margin: '3%'
  },
  wrapperSchedule: {
    backgroundColor: '#DEDEDE',
    padding: '5%',
    // marginVertical: '5%',

  },
  textTitle: {
    textAlign: 'center',
    margin: '5%',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    color: 'black'
  },
  wrapperPicker: {
    paddingHorizontal: '10%',
    marginBottom: '15%',
  },
  buttonDate: {
    backgroundColor: '#EFF0F7',
    paddingVertical: '5%',
    borderRadius: 8,
  },
  buttonDateTitle: {
    color: '#4E4B66',
    marginLeft: 58,
    fontSize: 15,
    marginTop: 2,
    fontWeight: '600',
  },

  textMessageError: {
    backgroundColor: '#F4B7404D',
    fontSize: 20,
    fontFamily: 'Mulish-Regular',
    textAlign: 'center',
    padding: '5%',
    marginHorizontal: '10%',
    borderRadius: 8
  },
  wrapperCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: '5%',
    margin: '3%',
  },
  wrapperCardHeader: {
    alignItems: 'center',

  },
  imageCard: {
    marginBottom: '4%',
  },
  textCardHeader: {
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    marginBottom: '4%',
  },
  wrapperCardMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  timeSchedule: {
    margin: '1%',
    padding: '1%',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
  },
  timeScheduleActive: {
    margin: '1%',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#5F2EEA',
    padding: '2%',
    borderRadius: 8

  },
  buttonBook: {
    backgroundColor: '#5F2EEA',
    padding: '3%',
    marginHorizontal: '5%',
    borderRadius: 8,
  },
  buttonTextBook: {
    color: 'white',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default DetailMovie;
