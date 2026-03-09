import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
        <div className="container py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm font-medium">
                  <Award className="h-4 w-4" />
                  Start Learning Today
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Unlock Your Potential with{' '}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Quality Education
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Join thousands of learners exploring courses taught by expert instructors. Build skills, earn
                certificates, and advance your career at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img
                  src="/assets/generated/hero-learning.dim_1200x600.png"
                  alt="Students learning together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl opacity-30" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EduHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert-Led Courses</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals and experienced educators who are passionate about teaching.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Study at your own pace with lifetime access to course materials and a supportive community.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with enrollment tracking and personalized course recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of learners and discover courses that will transform your future.
          </p>
          <Link to="/courses">
            <Button size="lg" variant="secondary" className="group">
              Browse All Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
