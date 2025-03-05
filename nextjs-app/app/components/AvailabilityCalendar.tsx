'use client'
import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import {client} from "@/sanity/lib/client"
import { getAvailabilityQuery } from "@/sanity/lib/queries"

interface DateRange {
  from: string
  to: string
  note?: string
}

interface AvailabilityData {
  title: string
  description: string
  unavailablePeriods: DateRange[]
}

function getAllDatesBetween(ranges: DateRange[]): Date[] {
  const dates: Date[] = []
  
  ranges.forEach(({ from, to }) => {
    const currentDate = new Date(from)
    const endDate = new Date(to)
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })
  
  return dates
}

export default function AvailabilityCalendar() {
  const [month, setMonth] = useState<Date>(new Date())
  const [data, setData] = useState<AvailabilityData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const result = await client.fetch<AvailabilityData>(getAvailabilityQuery)
      setData(result)
    }
    fetchData()
  }, [])

  const unavailableDates = data?.unavailablePeriods 
    ? getAllDatesBetween(data.unavailablePeriods)
    : []

  return (
    <section className="my-8 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center">{data?.title || 'Availability'}</h2>
      <div className="border rounded-lg p-4 shadow-sm">
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
          className="mx-auto"
          style={{ "--rdp-accent-color": "oklch(0.609 0.126 221.723)" } as React.CSSProperties}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center max-w-md">
        {data?.description || 'Dates marked in red are unavailable'}
      </p>
    </section>
  )
}

