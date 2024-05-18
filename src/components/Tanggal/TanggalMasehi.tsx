import { useState, useEffect } from "react";

export const TanggalMasehi = () => {

  const [date, setDate] = useState("date");
  
  
  useEffect(() => {
    let today = new Date();

    setDate(
      today.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [date]);

  return (
    <div>
      <h1>{date} M</h1>
    </div>
  );
};
