import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";

interface Props {
  booking: any;
}

function BookingsCard(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelBooking = async () => {
    setIsLoading(true);
    const response: any = await fetch(
      `/api/booking/cancelBooking?id=${props.booking.id}`,
      {
        method: "PUT",
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      setIsLoading(false);
      alert("Booking cancelled Successfully");
    }
  };

  return (
    <div className="w-4.5/5 bg-white m-5 flex justify-between rounded-md p-5">
      <div className="ml-2 w-4/5 flex">
        <div>
          <p className="font-bold">
            {moment(props.booking.date).format("dddd, MMMM Do, YYYY")}{" "}
            {props.booking.startTime}
          </p>
          <p className="font-bold leading-3 mt-4 text-gray-400">
            {props.booking.startTime} - {props.booking.endTime}
          </p>
        </div>

        <div className="ml-5 w-3/5 ">
          <p className="ml-2 ">
            {`${props.booking.title} ${props.booking.title.toLowerCase().includes("meeting") ? "" : "Meeting"} between ${props.booking.ownerName} and ${props.booking.attendees}`}{" "}
          </p>
          <p className="leading-3 mt-4 ml-2 hover:text-blue-400">
          <a  href="#">
            {props.booking.ownerEmail}
          </a>
          </p>
        </div>
      </div>
      {props.booking.status !== "active" ||
      new Date(props.booking.date) < new Date() ? null : (
        <div className="w-1/5 flex justify-center items-end">
          <button
            onClick={() => handleCancelBooking()}
            className="m-5 flex border-none bg-red-800 cursor-pointer text-white p-4 font-bold rounded-md"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <MdOutlineCancel size={20} />{" "}
                <span className="ml-4">Cancel</span>
              </>
            )}
          </button>
          <button
          disabled={true}
            onClick={() => console.log("reschedule event")}
            className="m-5 flex border-none bg-gray-400 text-white p-4 font-bold rounded-md cursor-not-allowed"
          >
            <BiTimeFive size={20} /> <span className="ml-4">Reschedule</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingsCard;
