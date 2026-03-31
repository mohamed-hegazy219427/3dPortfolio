"use client";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { testimonials as localTestimonials } from "@/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { JSONPlaceholderUser, Testimonial } from "@/types";

async function fetchRemoteTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const users: JSONPlaceholderUser[] = await res.json();
    return users.slice(0, 5).map((user) => ({
      name: user.name,
      designation: user.company.bs,
      company: user.company.name,
      testimonial: `Working with Mohamed Hegazy transformed our digital presence. His technical depth and dedication to quality set him apart — a true craftsman of the web. — ${user.address.city}`,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=915eff&color=fff&size=40`,
    }));
  } catch {
    return [];
  }
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const isStaticImage = typeof item.image !== "string";

  return (
    <Card className="bg-black-200 border-border xs:w-[360px] min-w-[320px] flex-1">
      <CardContent className="p-10">
        <p className="text-white font-black text-[48px] leading-none">&quot;</p>

        <div className="mt-1">
          <p className="text-white tracking-wider h-36 text-[18px] overflow-hidden leading-relaxed">
            {item.testimonial}
          </p>

          <div className="mt-7 flex justify-between items-center gap-1">
            <div className="flex-1 flex flex-col">
              <p className="text-white font-medium text-[16px]">
                <span className="text-blue-400">@</span> {item.name}
              </p>
              <p className="mt-1 text-secondary text-[12px]">
                {item.designation} of {item.company}
              </p>
            </div>

            {isStaticImage ? (
              <Image
                src={item.image as StaticImageData}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image as string}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function Testimonials() {
  const remoteTestimonials = await fetchRemoteTestimonials();
  const allTestimonials =
    remoteTestimonials.length > 0 ? remoteTestimonials : localTestimonials;

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className="bg-tertiary rounded-2xl sm:px-16 px-6 sm:py-16 py-10 min-h-[300px]">
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          What others say
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Testimonials.
        </h2>
      </div>
      <div className="mt-20 xs:px-4 pb-14 sm:px-16 px-6 flex flex-wrap gap-7 justify-center">
        {allTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} item={testimonial} />
        ))}
      </div>
    </div>
  );
}
