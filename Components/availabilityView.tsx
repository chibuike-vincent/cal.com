import React, { useState } from "react";

interface Props {
  day: any;
  startTime: any;
  endTime: any;
  item: any;
  user: any;
}
function AvailabilityView(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { item, day, startTime, endTime, user } = props;
  const [availableTimes, setAvailableTime] = useState({
    day: item.day,
    start: item.start,
    end: item.end,
  });

  const handleDayTimeChange = (e: any) => {
    const { name, value } = e.target;

    setAvailableTime({
      ...availableTimes,
      [name]: value,
    });
  };

  const updateAvailability = async () => {
    if (
      availableTimes.day === "" ||
      availableTimes.start === "" ||
      availableTimes.end === ""
    ) {
      return alert("All fields are required!");
    }

    setIsLoading(true);
    const data = {
      id: item.id,
      day: availableTimes.day,
      start: availableTimes.start,
      end: availableTimes.end,
      owner: user.id,
    };

    const response: any = await fetch("/api/availability/update", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setIsLoading(false);
      alert("Updated");
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="p-5 flex justify-around">
        <div
          onChange={(e) => handleDayTimeChange(e)}
          className="p-3 ml-2 rounded-md bg-gray-200"
        >
          <p>{item.day}</p>
        </div>
      </div>

      <div className="p-5 flex justify-around">
        <select
          onChange={(e) => handleDayTimeChange(e)}
          value={availableTimes.start}
          name="start"
          className="m-1.5 ml-1 p-4 rounded-md"
        >
          <option value={item.start}>{item.start}</option>
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
          <option value={item.end}>{item.end}</option>
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
          onClick={() => updateAvailability()}
          value={isLoading ? "Processing..." : "Update"}
          className="m-5 border-none bg-red-800 cursor-pointer text-white p-4 font-bold rounded-md"
        />
      </div>
    </div>
  );
}

export default AvailabilityView;
