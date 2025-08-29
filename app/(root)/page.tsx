import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { dummyInterviews } from "@/constants"
import InterviewCard from "@/components/InterviewCard"

const Page = () => {
  return (
    <>
      <section className="card-cta flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-2xl font-bold">Welcome to Inter.ViewAI</h2>
          <p className="text-lg">
            Your one-stop solution for AI-powered interview simulations.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/Interview">Start the Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="Robot"
          width={500}
          height={500}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-xl font-semibold">Your Interviews</h2>
        <div className="interviews-section border rounded-lg p-4 text-gray-600">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-xl font-semibold">Take an Interview</h2>
        <div className="interviews-section border rounded-lg p-4 text-gray-600">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}

          {/* <p>You haven't taken any interviews yet</p> */}
        </div>
      </section>
    </>
  )
}

export default Page
