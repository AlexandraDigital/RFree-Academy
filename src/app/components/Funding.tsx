import { useState } from "react";
import { Heart, DollarSign, Users, Zap, Target, TrendingUp, Gift, Award, Star, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";

export function Funding() {
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const fundingStats = {
    monthlyGoal: 50000,
    currentMonthly: 12450,
    totalRaised: 234500,
    supporters: 1247,
    monthlyBurn: 45000,
  };

  const donationTiers = [
    { amount: 5, label: "$5", perk: "Support 1 hour of free education" },
    { amount: 25, label: "$25", perk: "Fund a full lesson creation" },
    { amount: 50, label: "$50", perk: "Sponsor 10 students for a month" },
    { amount: 100, label: "$100", perk: "Enable AI features for teachers" },
    { amount: 250, label: "$250", perk: "Power the platform for a day" },
  ];

  const sponsorshipTiers = [
    {
      name: "Impact Supporter",
      price: "$500/mo",
      features: [
        "Logo on website footer",
        "Mention in monthly newsletter",
        "Access to impact reports",
        "Support 1,000+ students"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Change Maker",
      price: "$2,500/mo",
      features: [
        "Logo on homepage",
        "Featured in social media",
        "Quarterly impact call",
        "Support 5,000+ students",
        "Co-branded lesson series"
      ],
      color: "from-blue-500 to-indigo-600",
      popular: true
    },
    {
      name: "Impact Partner",
      price: "$10,000/mo",
      features: [
        "Premium logo placement",
        "Dedicated landing page",
        "Monthly strategy sessions",
        "Support 25,000+ students",
        "Custom corporate training",
        "Annual impact summit invite"
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

  const revenueStreams = [
    {
      title: "Donations",
      current: "$12.4K/mo",
      potential: "$30K/mo",
      icon: Heart,
      description: "Individual supporters who believe in free education"
    },
    {
      title: "Corporate Sponsorships",
      current: "$0/mo",
      potential: "$50K/mo",
      icon: Award,
      description: "Companies investing in workforce development"
    },
    {
      title: "Premium Tools",
      current: "$0/mo",
      potential: "$25K/mo",
      icon: Zap,
      description: "Advanced AI features and analytics for teachers"
    },
    {
      title: "Partnerships",
      current: "$0/mo",
      potential: "$20K/mo",
      icon: Users,
      description: "Organizations licensing our platform"
    }
  ];

  const expenses = [
    { category: "Infrastructure", amount: "$18K/mo", percentage: 40 },
    { category: "AI & Tools", amount: "$12K/mo", percentage: 27 },
    { category: "Team (Part-time)", amount: "$10K/mo", percentage: 22 },
    { category: "Marketing", amount: "$3K/mo", percentage: 7 },
    { category: "Operations", amount: "$2K/mo", percentage: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Fund Free Education</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us provide real-world education to millions. We're building an alternative to traditional schooling that's 100% free for learners.
        </p>
      </div>

      {/* Hero Stats */}
      <Card className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
        <CardContent className="py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold mb-1">{fundingStats.supporters.toLocaleString()}</p>
              <p className="text-purple-100">Supporters</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">${(fundingStats.totalRaised / 1000).toFixed(0)}K</p>
              <p className="text-purple-100">Total Raised</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">50K+</p>
              <p className="text-purple-100">Students Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">1,200+</p>
              <p className="text-purple-100">Free Lessons</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goal Progress */}
      <Card className="mb-12 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Monthly Funding Goal</CardTitle>
              <CardDescription>Keep the platform running and growing</CardDescription>
            </div>
            <Badge className="bg-purple-600 text-white">
              {Math.round((fundingStats.currentMonthly / fundingStats.monthlyGoal) * 100)}% funded
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-lg font-semibold mb-2">
              <span>${(fundingStats.currentMonthly / 1000).toFixed(1)}K</span>
              <span className="text-gray-500">Goal: ${(fundingStats.monthlyGoal / 1000).toFixed(0)}K</span>
            </div>
            <Progress value={(fundingStats.currentMonthly / fundingStats.monthlyGoal) * 100} className="h-4" />
          </div>
          <p className="text-sm text-gray-600">
            We need <span className="font-semibold text-purple-600">${((fundingStats.monthlyGoal - fundingStats.currentMonthly) / 1000).toFixed(1)}K more</span> to reach sustainability this month and serve 100K+ students
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* One-Time Donation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Make a Donation
            </CardTitle>
            <CardDescription>Every dollar funds free education for those who need it most</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setDonationAmount(tier.amount)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    donationAmount === tier.amount
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <p className="font-bold text-lg">{tier.label}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Custom Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setDonationAmount(null);
                  }}
                  className="pl-8"
                />
              </div>
            </div>

            {(donationAmount || customAmount) && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-purple-900 mb-2">Your Impact:</p>
                <p className="text-sm text-purple-800">
                  {donationTiers.find((t) => t.amount === donationAmount)?.perk ||
                    `Support ${Math.floor((Number(customAmount) || 0) * 2)} students with quality education`}
                </p>
              </div>
            )}

            <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg">
              <Heart className="w-5 h-5 mr-2" />
              Donate ${donationAmount || customAmount || 0}
            </Button>

            <p className="text-xs text-center text-gray-500">
              💜 100% goes to education. We're a mission-driven nonprofit.
            </p>
          </CardContent>
        </Card>

        {/* Monthly Supporter */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Star className="w-6 h-6 text-green-600" />
              Become a Monthly Supporter
            </CardTitle>
            <CardDescription className="text-green-700">
              Recurring donations create sustainable impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Exclusive monthly impact reports</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Early access to new features</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Supporter badge in community</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Priority support</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                $10/month
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                $25/month
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                $50/month
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                $100/month
              </Button>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">
              <Gift className="w-5 h-5 mr-2" />
              Start Monthly Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Corporate Sponsorships */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Corporate Sponsorships</h2>
          <p className="text-lg text-gray-600">
            Partner with us to invest in the future workforce and demonstrate your commitment to education
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sponsorshipTiers.map((tier) => (
            <Card key={tier.name} className={`relative ${tier.popular ? "border-purple-600 border-2" : ""}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className={`w-full h-3 bg-gradient-to-r ${tier.color} rounded-t-lg -mx-6 -mt-6 mb-4`} />
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <p className="text-3xl font-bold text-purple-600">{tier.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${tier.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}>
                  Become a Sponsor
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Streams */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Revenue Streams</CardTitle>
          <CardDescription>Multiple paths to sustainability while keeping education free</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {revenueStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <div key={stream.title} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{stream.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{stream.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-purple-600">{stream.current}</span>
                        <span className="text-sm text-gray-500">→ {stream.potential}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Transparency */}
      <Card className="mb-12 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            100% Transparent Budget
          </CardTitle>
          <CardDescription>See exactly where every dollar goes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{expense.category}</span>
                  <span className="text-sm text-gray-600">
                    {expense.amount} ({expense.percentage}%)
                  </span>
                </div>
                <Progress value={expense.percentage} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total Monthly Burn</span>
              <span className="text-purple-600">${(fundingStats.monthlyBurn / 1000).toFixed(0)}K/month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Ways to Help */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-2xl">Other Ways to Help</CardTitle>
          <CardDescription>Not everyone can donate, and that's okay!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Teach a Lesson</h3>
              <p className="text-sm text-gray-600 mb-3">
                Share your expertise and create free educational content
              </p>
              <Button variant="outline">Start Teaching</Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Spread the Word</h3>
              <p className="text-sm text-gray-600 mb-3">
                Share Impact Academy with people who need these skills
              </p>
              <Button variant="outline">Share Platform</Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Join a Project</h3>
              <p className="text-sm text-gray-600 mb-3">
                Contribute your skills to real-world impact projects
              </p>
              <Button variant="outline">View Projects</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
