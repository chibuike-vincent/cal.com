import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import timeZones from "./timeZone.json"

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  url?: string;
  location?: string;
}

export default function Book() {
  const router = useRouter();
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState<any[]>([]);
  const [availableDAta, setAvailableData] = useState<any[]>([]);
  const [userDAta, setUserData] = useState<any>();
  const [eventDAta, setEventData] = useState<any>();
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeZone, setSelectedTimeZone] = useState("");
  const [isMoreGuest, setIsMoreGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    notes: "",
  });

  const { user, preview } = router.query;

  useEffect(() => {
    if (user !== undefined && preview !== undefined) {
      Promise.all([
        fetch(`/api/availability/getAvailabilities?id=${user}`).then((resp) =>
          resp.json()
        ),
        fetch(`/api/event/eventById?title=${preview}`).then((resp) => resp.json()),
        fetch(`/api/auth/userById?username=${user}`).then((resp) => resp.json()),
      ]).then((res) => {
        setAvailableData(res[0]);
        setEventData(res[1]);
        setUserData(res[2]);
      });
    }
  }, [user, preview]);

  const handleChange = (e: any) => {
    onChange(e);

    var oneDate = moment(new Date(e), "DD-MM-YYYY");

    var day = oneDate.format("dddd");

    for (let j = 0; j < availableDAta.length; j++) {
      if (availableDAta[j].day === day) {
        let start = moment(`${availableDAta[j].start}`, "hh:mm A").format(
          "HH:mm:ss"
        );

        let end = moment(`${availableDAta[j].end}`, "hh:mm A").format(
          "HH:mm:ss"
        );

        var startTime = moment(start, "HH:mm");
        var endTime = moment(end, "HH:mm");

        if (endTime.isBefore(startTime)) {
          endTime.add(1, "day");
        }

        var timeStops = [];

        while (startTime <= endTime) {
          timeStops.push(moment(startTime).format("HH:mm a"));
          startTime.add(eventDAta?.duration, "minutes");
        }

        setTime(timeStops);
        break;
      } else {
        setTime([]);
        setError("Unvailable");
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const setTimeZone = (e: any) => {
    setSelectedTimeZone(e);
  };

  const handleBooking = async () => {
    setIsLoading(true);

    let start = `${moment(value).format("YYYY-MM-DD")} ${
      selectedTime.split(" ")[0]
    }`;
    let duration = `0:${eventDAta.duration}`;

    let [hour, minute] = duration.split(":");

    let endtime = moment(start).add(minute, "minutes").format("hh:mm a");

    const dataObj = {
      date: value,
      title: eventDAta?.title,
      attendees: data?.userName,
      owner: userDAta?.id,
      startTime: selectedTime,
      endTime: endtime,
      ownerName: userDAta?.userName,
      ownerEmail: userDAta?.email,
      attendeeEmail: data.email,
      status: "active",
    };

    const response: any = await fetch("/api/booking/book", {
      method: "POST",
      body: JSON.stringify(dataObj),
    });

    const result = await response.json();

    if (response.status === 200) {
      setIsLoading(false);
      alert("Booking Successful");

    }
  };

  return (
    <>
      {selectedTime !== "" ? (
       <div className="w-3/5 flex justify-center  bg-white p-12 ml-80 mt-20 h-4/5">
       <div className="w-2/5">
            <h3 className="font-bold text-6xl leading-12 mb-8">{userDAta && userDAta.userName}</h3>
            <h1 className="font-bold text-3xl text-gray-600 leading-12">{eventDAta && eventDAta.title}</h1>
            <p className="font-bold text-2xl text-gray-400 leading-9">{eventDAta && eventDAta.duration} min</p>
            <p className="text-green-600 font-bold leading-9">
              {moment(value).format("dddd, MMMM Do, YYYY")} {selectedTime}
            </p>
          </div>
          <div className="w-1 bg-gray-200 m-2.5"></div>

          
          <div className="w-3/5 ml-5">
            <label className="ml-2.5 text-gray-600">Your Name</label>
            <input
              type="text"
              name="userName"
              value={data.userName}
              onChange={(e) => handleInputChange(e)}
              placeholder="John Doe"
              className="w-full m-2.5 p-5 rounded-md border-2 border-solid border-black-600"
            />
            <label className="ml-2.5 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => handleInputChange(e)}
              placeholder="me@gmail.com"
              className="w-full m-2.5 p-5 rounded-md border-2 border-solid border-black-600"
            />
            {isMoreGuest ? (
              <>
                <label className="ml-2.5 text-gray-600">Geusts </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="guest@gmail.com"
                  className="w-full m-2.5 p-5 rounded-md border-2 border-solid border-black-600"
                />
              </>
            ) : (
              <p
                className="ml-2.5 cursor-pointer text-gray-800 m-2"
                onClick={() => setIsMoreGuest(!isMoreGuest)}
              >
                + Additional Geusts{" "}
              </p>
            )}



            <label className="ml-2.5 text-gray-600">Additional Notes</label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={(e) => handleInputChange(e)}
              placeholder="Please help share anything that will help prepare for our meeting"
              className="w-full m-2.5 p-5 rounded-md border-2 border-solid border-black-600"
            />
            <div className="w-full flex">
              <input
                type="button"
                onClick={() => handleBooking()}
                value={isLoading ? "Processing..." : "Confirm"}
                className="m-5 border-none bg-red-700 cursor-pointer text-white p-4 font-bold rounded-md"
              />
              <input
                disabled={true}
                type="button"
                onClick={() => console.log("Cancel")}
                value="Cancel"
                className="m-5 border-none bg-gray-400 cursor-not-allowed text-white p-4 font-bold rounded-md"
              />
            </div>
          </div>
        </div>
      ) : userDAta && userDAta.userName ? (
        <div className="w-3/5 flex justify-center h-2/5  bg-white p-12 ml-80 mt-60">
          <div className="w-2/5">
            <h3 className="font-bold text-6xl leading-12 mb-8 ">{userDAta && userDAta.userName}</h3>
            <h1 className="font-bold text-3xl text-gray-600 leading-12">{eventDAta && eventDAta.title}</h1>
            <p className="font-bold text-2xl text-gray-400 leading-12">{eventDAta && eventDAta.duration} min</p>
            <select onChange={(e) => setTimeZone(e.target.value)} value={timeZone} className="m-1.5 p-4 rounded-sm">
                        <option  value="">Select Time Zone</option>
                        {
                            timeZones.map((t:any, i:any) => (
                                <option key={i} value={t}>{t}</option>
                            ))
                        }
                    </select>
          </div>
          <div className="w-1 bg-gray-200 m-2.5"></div>

          <Calendar
            onChange={(e: any) => handleChange(e)}
            value={value}
            minDate={new Date()}
          />

          {time.length ? (
            <div className="w-1 bg-gray-200 m-2.5"></div>
          ) : !time.length && error !== "" ? (
            <div className="w-1 bg-gray-200 m-2.5"></div>
          ) : null}

          {time.length ? (
            <div className="h-full overflow-y-scroll p-7">
              {time.length ? (
                time.map((t, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTime(t)}
                    className="p-2.5 border-solid border-2 rounded-md border-gray-400  mb-2.5 w-full hover:bg-black hover:text-white hover:border-none cursor-pointer"
                  >
                    <p>{t}</p>
                  </div>
                ))
              ) : !time.length && error !== "" ? (
                <p>{error}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className=" w-full flex justify-center self-center items-center font-bold text-1xl">
          <p >Loading... </p>
        </div>
      )}
    </>
  );
}
