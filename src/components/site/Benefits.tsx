import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, MonitorOff, Wallet } from "lucide-react";

const BenefitItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
          <Icon className="h-5 w-5" aria-label={title} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Benefits = () => {
  return (
    <section id="benefits" className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h2 className="text-3xl font-bold mb-2">Benefits of Reading</h2>
        <p className="text-muted-foreground">
          Stories spark curiosity, empathy and imagination. A shared library makes it easy and affordable to keep this habit.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <BenefitItem
          icon={BookOpenCheck}
          title="Build a daily habit"
          description="Fresh books weekly keep kids excited to read beyond screens."
        />
        <BenefitItem
          icon={MonitorOff}
          title="Reduce screen time"
          description="Encourage mindful, device-free moments with stories and pictures."
        />
        <BenefitItem
          icon={Wallet}
          title="Affordable for families"
          description="Pay a tiny weekly rent vs. buying new each time."
        />
      </div>
    </section>
  );
};

export default Benefits;
