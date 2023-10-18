import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// This Package is used for date
import moment from "moment";
// This Package is used for Calendar
import CalendarStrip from "react-native-calendar-strip";
// This Package is used for Events
import eventsData from "./events.json";
// This Package is used for That Event Content
import { Card, Title, Paragraph } from "react-native-paper";
import { Image } from "react-native";
// import { SearchBar } from "@rneui/themed";

// const dateStart = moment();

// This data for injecting events into the component it takes filtering the dates from the json data
const fetchedDates = Object.keys(eventsData);
let markedDatesArray = [];
// console.log(fetchedDates);
export default class MyCalendar extends Component {
  state = {
    selectedDate: null,
    selectedEvents: [],
  };

  //   componentDidMount() {
  //     const formattedDate = moment().format("YYYY-MM-DD");
  //     const events = eventsData[formattedDate];

  //     if (events && events.length > 0) {
  //       this.setState({ selectedEvents: events });
  //       this.setState({ selectedDate: moment() });
  //     }
  //   }

  // This is for select Date
  handleDateSelected = (date) => {
    this.setState({ selectedDate: date });
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const events = eventsData[formattedDate];

    if (events && events.length > 0) {
      this.setState({ selectedEvents: events });
    } else {
      this.setState({ selectedEvents: [] });
    }
  };

  //This is  for render events cards from the bottom
  renderEventDetails() {
    const { selectedEvents, selectedDate } = this.state;

    return (
      <View style={styles.eventDetails}>
        {selectedDate && (
          <Text style={styles.selectedDate}>
            Date: {moment(selectedDate).format("MMM DD, YYYY")}
          </Text>
        )}
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <Card>
                <Card.Content>
                  <Title style={styles.eventName}>{event.name}</Title>
                  <Paragraph>{event.description}</Paragraph>
                </Card.Content>
              </Card>
              <Image
                width={400}
                height={300}
                resizeMode="contain"
                source={{ uri: event.images }}
              />
              <Text>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available.
                Wikipedia
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>
              No events available for this date.
            </Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    // This loop for fetching dates in that variable and updating the calender for that green dot
    for (let i = 0; i < fetchedDates.length; i++) {
      markedDatesArray.push({
        date: moment(`${fetchedDates[i]}`, "YYYY-MM-DD"),
        dots: [
          {
            color: "green",
          },
        ],
      });
    }

    // const markedDatesArray = [
    //   {
    //     date: moment(),
    //     dots: [
    //       {
    //         color: "green",
    //       },
    //     ],
    //   },

    //   {
    //     date: fetchedDates,
    //     dots: [
    //       {
    //         color: "green",
    //       },
    //     ],
    //   },
    // ];

    return (
      <View style={styles.container}>
        {/* this is calender component */}

        <CalendarStrip
          markedDates={markedDatesArray}
          //   scrollable={true}
          //   scrollerPaging={true}
          //   markedDates={[eventsData]}
          //   markedDatesStyle={styles.mark}
          // headerText="Event Calendar"
          //   startingDate={dateStart}
          calendarAnimation={{ type: "sequence", duration: 100 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "white",
          }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: "white" }}
          calendarColor={"#7743CE"}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "yellow" }}
          highlightDateNameStyle={{ color: "yellow" }}
          //   selectedDate={}
          datesWhitelist={[
            {
              start: moment(),
              end: moment().add(350, "days"),
            },
          ]}
          onDateSelected={this.handleDateSelected}
          iconContainer={{ flex: 0.1 }}
        />

        {/* This is the Event Card Data Shown Place */}
        {this.renderEventDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 37.5,
    width: "100%",
  },
  eventDetails: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
  },
  event: {
    marginBottom: 10,
  },
  eventName: {
    fontWeight: "bold",
  },
  selectedDate: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  eventCard: {
    width: 400,
    height: 500,
    marginVertical: 10,
    elevation: 3,
    backgroundColor: "#FFFFF0",
    borderRadius: 5,
  },
  noEventsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  noEventsText: {
    fontSize: 18,
    color: "gray",
    fontStyle: "italic",
    textAlign: "center",
  },
});
