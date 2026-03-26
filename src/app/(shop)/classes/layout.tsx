import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crochet Classes in Vadodara | Learn Amigurumi & Crochet for Beginners",
  description: "Join the best beginner crochet classes in Vadodara. Learn stitches, amigurumi, and handmade art with Dharita. Easy, hands-on workshops for all ages.",
  keywords: [
    "crochet classes in Vadodara",
    "learn crochet Vadodara",
    "crochet workshops Vadodara",
    "amigurumi classes India",
    "beginner crochet lessons Gujarat",
    "hobby classes Vadodara",
    "handmade crochet courses"
  ],
  alternates: {
    canonical: "/classes",
  },
};

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
