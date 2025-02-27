
'use client'
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

// Example unavailable dates (you would typically fetch these from a backend)
const unavailableDates = [
  new Date(2023, 5, 10),
  new Date(2023, 5, 11),
  new Date(2023, 5, 12),
  new Date(2023, 6, 1),
  new Date(2023, 6, 2),
  new Date(2023, 6, 3),
]

export default function AvailabilityCalendar() {
  const [month, setMonth] = useState<Date>(new Date())

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Availability</h2>
      <div className="border rounded-lg p-4 inline-block">
        <DayPicker
          mode="multiple"
          selected={unavailableDates}
          onMonthChange={setMonth}
          month={month}
          modifiers={{
            unavailable: unavailableDates,
          }}
          modifiersStyles={{
            unavailable: { textDecoration: "line-through", color: "red" },
          }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Dates marked in red are unavailable
      </p>
    </section>
  )
}

