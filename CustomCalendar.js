import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import eventsData from "./events.json";
import { Card, Title, Paragraph } from "react-native-paper";
import { Image } from "react-native";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleDateSelected = (date) => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const events = eventsData[formattedDate] || [];
    setSelectedEvents(events);
  };

  const renderEventDetails = () => {
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
  };

  const markedDatesArray = Object.keys(eventsData).map((date) => {
    return {
      date: moment(date, "YYYY-MM-DD"),
      dots: [{ color: "green" }],
    };
  });

  return (
    <View style={styles.container}>
      <CalendarStrip
        markedDates={markedDatesArray}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "white" }}
        calendarColor={"#7743CE"}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "yellow" }}
        highlightDateNameStyle={{ color: "yellow" }}
        datesWhitelist={[
          {
            start: moment(),
            end: moment().add(350, "days"),
          },
        ]}
        onDateSelected={handleDateSelected}
        iconContainer={{ flex: 0.1 }}
      />
      {renderEventDetails()}
    </View>
  );
};

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

export default MyCalendar;
