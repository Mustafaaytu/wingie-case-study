"use client";
import Link from "next/link";
import { useState } from "react";

export default function Activities() {
  const [data, setData] = useState([{ id: 2, baslik: "Activities 1" }]);

  return (
    <div>
      <h1>Activites</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link href={`/activities/${item.id}`}>{item.baslik}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
