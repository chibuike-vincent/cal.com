import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AvailabilityView from "./availabilityView";
import MessageBox from "./messageBox"
import {GrSchedule} from "react-icons/gr"

export async function getServerSideProps() {
  const response: any = await fetch("/api/availability/getAvailabilities", {
    method: "POST",
  });
  return {
    props: {
      availabilities: [],
    },
  };
}

interface Props {
  day: any;
  startTime: any;
  endTime: any;
}
function Availability(props: Props) {
  const { day, startTime, endTime } = props;
  const [user, setUser] = useState<any>(null);
  const [availableDAta, setAvailableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false)
  const router = useRouter();
  const [availableTimes, setAvailableTime] = useState({
    day: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    const getData = async () => {
      setIsFetching(true)
      const user: any = await localStorage.getItem("user");
      const res = JSON.parse(user);
      setUser(res);

      const response: any = await fetch(
        `/api/availability/getAvailabilities?id=${res.id}`,
        {
          method: "GET",
        }
      );
      if(response){
        const result: any = await response.json();
        setAvailableData(result);
        setIsFetching(false)
      }
    };
    getData();
  }, []);

  const handleDayTimeChange = (e: any) => {
    const { name, value } = e.target;

    console.log(value, "value");
    setAvailableTime({
      ...availableTimes,
      [name]: value,
    });
  };

  const saveAvailability = async () => {
    if (
      availableTimes.day === "" ||
      availableTimes.start === "" ||
      availableTimes.end === ""
    ) {
      return alert("All fields are required!");
    }

    setIsLoading(true);

    const data = {
      day: availableTimes.day,
      start: availableTimes.start,
      end: availableTimes.end,
      owner: user.id,
    };

    const response: any = await fetch("/api/availability/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setIsLoading(false);
      alert("Created");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Create Availabilities</h2>
      <div className="w-full flex justify-between items-center">
        <div className="p-5 flex justify-around">
          <select
            onChange={(e) => handleDayTimeChange(e)}
            value={availableTimes.day}
            name="day"
            className="m-1.5 p-4 rounded-md"
          >
            <option value="">Select Day</option>
            {day.map((t: any, i: any) => (
              <option key={t.id} value={t.day}>
                {t.day}
              </option>
            ))}
          </select>
        </div>
        <div className="p-5 flex justify-around">
          <select
            onChange={(e) => handleDayTimeChange(e)}
            value={availableTimes.start}
            name="start"
            className="m-1.5 p-4 rounded-md"
          >
            <option value="">Select start time</option>
            {startTime.map((t: any, i: any) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
          <h3 className="font-bold mt-5">-</h3>
          <select
            onChange={(e) => handleDayTimeChange(e)}
            value={availableTimes.end}
            name="end"
            className="m-1.5 p-4 rounded-md"
          >
            <option value="">Select end time</option>
            {endTime.map((t: any, i: any) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/5 flex justify-center items-end">
          <input
            type="button"
            onClick={() => saveAvailability()}
            value={isLoading ? "Processing..." : "Submit"}
            className="m-5 border-none bg-red-800 cursor-pointer text-white p-4 font-bold rounded-md"
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold">My Availabilities</h2>
      {isFetching ?  <div className=" w-full flex justify-center p-20 self-center items-center font-bold text-1xl">
          <p >Loading... </p>
        </div> : availableDAta.length ? (
        availableDAta.map((item: any) => (
          <AvailabilityView
            item={item}
            day={day}
            startTime={startTime}
            endTime={endTime}
            user={user}
          />
        ))
      ) : (
        <MessageBox message="You are yet to set your availability." icon={<GrSchedule size={60}/>}/>
      )}
    </>
  );
}

export default Availability;
