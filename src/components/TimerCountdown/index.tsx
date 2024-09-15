"use client";
import React, { useEffect, useState } from "react";
import { NumberBox } from "./NumberBox";

const TimerCountdown = () => {
  let time = 7;
  let [days, setDays] = useState<number | string>(0);
  let [hours, setHours] = useState<number | string>(0);
  let [minutes, setMinutes] = useState<number | string>(0);
  let [seconds, setSeconds] = useState<number | string>(0);

  let countDownDate = new Date("2024-10-26").getTime();

  useEffect(() => {
    var updateTime = setInterval(() => {
      var now = new Date().getTime();

      var difference = countDownDate - now;

      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      var newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (difference <= 0) {
        clearInterval(updateTime);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    });

    return () => {
      clearInterval(updateTime);
    };
  }, [time]);

  let daysFlip = false;
  let hoursFlip = false;
  let minutesFlip = false;
  let secondsFlip = true;

  if (
    (seconds as number) <= 0 &&
    (minutes as number) <= 0 &&
    (hours as number) <= 0 &&
    (days as number) <= 0
  ) {
    daysFlip = false;
    hoursFlip = false;
    minutesFlip = false;
    secondsFlip = false;
  }

  if (seconds == 0) {
    if (minutes != 0) {
      seconds = 59;
    }

    secondsFlip = false;
    minutesFlip = true;
  }
  if (minutes == 0) {
    if (hours != 0) {
      minutes = 59;
    }

    minutesFlip = false;
    hoursFlip = true;
  }

  if (hours == 0) {
    hoursFlip = false;
    if (days != 0) {
      daysFlip = true;
    }
  }

  if ((days as number) < 10) {
    days = "0" + days;
  }

  if ((hours as number) < 10) {
    hours = "0" + hours;
  }

  if ((minutes as number) < 10) {
    minutes = "0" + minutes;
  }

  if ((seconds as number) < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div className="rounded-xl">
      <div className="flex items-center justify-between mt-2 rounded-xl">
        <NumberBox num={days} unit="Days" flip={daysFlip} />
        <span className="hidden text-xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={hours} unit="Hours" flip={hoursFlip} />
        <span className="hidden text-xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
        <span className="hidden text-xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
      </div>
    </div>
  );
};

export default TimerCountdown;
